import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";

const Address = (props: {account: IAccount, setAccount}) => {
  const [user, setUser] = useState<IAccount>({});
  const context: IAccount = useOutletContext();
  //const context = null;
  //console.log(context);
  console.log("Context:", context);

  useEffect(() => {
    setUser(context);
  }, [context]);

  return (
    <>
      <h4 className="mt-5">Address</h4>
      <hr />
    </>
  );
};

export default Address;
