import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";
import { Button } from "react-bootstrap";
import { Address as IAddress } from "../../interfaces/user";
import { useFetch } from "../../hooks/useFetch";
import AddressCard from "./AddressCard";

const Address = (props: { account: IAccount; setAccount }) => {
  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const { data } = useFetch(`/account/${props.account.id}/address`);

  useEffect(() => {
    if (data) {
      setAddressList(data);
    }
  }, [data]);

  return (
    <>
      <h4 className="mt-5">Address</h4>
      <Button size="sm" variant="outline-primary" onClick={() => setShow(true)}>
        {" "}
        +{" "}
      </Button>
      <hr />
      {addressList.map((address) => (
        <AddressCard
          key={address.id}
          accountId={props.account.id}
          existingAddress={address}
          setShow={setShow}
          setAddressList={setAddressList}
        />
      ))}
      <div className={show ? "d-inline" : "d-none"}>
        <AddressCard
          accountId={props.account.id}
          existingAddress={null}
          setShow={setShow}
          setAddressList={setAddressList}
        />
      </div>
    </>
  );
};

export default Address;
