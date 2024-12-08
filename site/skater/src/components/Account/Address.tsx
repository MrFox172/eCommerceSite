import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";
import { Button } from "react-bootstrap";
import { Address as IAddress } from "../../interfaces/user";
import { useFetch } from "../../hooks/useFetch";
import AddressCard from "./AddressCard";

const Address = ({ accountId }) => {
  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const { data } = useFetch(`/account/${accountId}/address`);

  useEffect(() => {
    if (data) {
      setAddressList(data);
    }
  }, [data]);

  return (
    <>
      <h4 className="mt-5">Address</h4>
      <Button size="sm" className="" variant="outline-primary rounded-5" title="Add new Address" onClick={() => setShow(true)}>
        {" "}
        Add new address{" "}
      </Button>
      <hr />
      {addressList.map((address) => (
        <AddressCard
          key={address.id}
          accountId={accountId}
          existingAddress={address}
          setShow={setShow}
          setAddressList={setAddressList}
        />
      ))}
      <div className={show ? "d-inline mt-3" : "d-none mt-3"}>
        <AddressCard
          accountId={accountId}
          existingAddress={null}
          setShow={setShow}
          setAddressList={setAddressList}
        />
      </div>
    </>
  );
};

export default Address;
