import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

interface Account {
    id: number;
    firstname: string;
    lastname: string;
    emailaddress: string;
    phonenumber: string;
    createdate: string;
    sellerAccount: {
      id: number;
      accountId: number;
      companyName: string;
      createdate: string;
    };
  }

const Address = () => {

    const [user, setUser] = useState<Account>();
    const context: Account = useOutletContext();
    //const context = null;
    //console.log(context);
    console.log("Context:", context);

    useEffect(() => {
        setUser(context);
      }, [context]);

    return (
        <>
      <h1>Address</h1>
      <h1>{user?.firstname}</h1>
    </>
    );
};

export default Address;
