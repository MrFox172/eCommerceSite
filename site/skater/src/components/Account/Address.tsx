import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";


const Address = () => {

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
      <h1>Address</h1>
      <h1>{user?.firstname}</h1>
    </>
    );
};

export default Address;
