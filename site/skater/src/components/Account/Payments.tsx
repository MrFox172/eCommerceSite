import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";

const Payments = () => {

    const [account, setAccount] = useState<IAccount>();
    const context: IAccount = useOutletContext();
    console.log(account);

    useEffect(() => {
        setAccount(context);
    }, [context]);

    return (
        <h1>Payments</h1>
    );
};

export default Payments;