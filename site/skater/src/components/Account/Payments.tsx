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

const Payments = () => {

    const [account, setAccount] = useState<Account>();
    const context: Account = useOutletContext();
    console.log(account);

    useEffect(() => {
        setAccount(context);
    }, [context]);

    return (
        <h1>Payments</h1>
    );
};

export default Payments;