import { ListGroup, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Account as IAccount } from "../../interfaces/user";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";

export const AccountMenu = (props: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  account: IAccount | null;
  showSellerOptions: boolean;
  setShowSellerOptions: React.Dispatch<React.SetStateAction<boolean>>;
  handleShow: () => void;
}) => {
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  const navigate = useNavigate();
  const accountMenuList = ["Profile", "Orders", "Payments"];
  const [url, setUrl] = React.useState<string>("");

  useEffect(() => {
    if (props.account) {
      setUrl(`/seller/account/${props.account?.id}`);
    } else {
      setUrl("");
    }
  }, [props.account]);

  const { data } = useFetch(url);

  useEffect(() => {
    if (data) {
      props.setShowSellerOptions(true);
    } else {
      props.setShowSellerOptions(false);
    }
  }, [data]);

  const handleOnClick = (e: React.SyntheticEvent, tab: string) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    props.setActiveTab(tab);

    console.log(target.href)

    target.classList.add("active");

    window.location.href = target.href;
  };

  return (
    <>
      <div className="my-2 mb-5 px-3">
        <h5>
          <Link to={`/account/${props.account?.id}`}>Welcome Back, {props.account?.firstname}</Link>{" "}
        </h5>
        <hr />
        <h4 className="text-center justify-content-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="350"
            height="250"
            fill="currentColor"
            className="bi bi-people text-center me-auto"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
        </h4>
        <ListGroup variant="flush">
          {accountMenuList.map((setting) => (
            <ListGroup.Item
              action
              variant="light"
              key={setting}
              href={`/account/${props.account?.id}/${setting.toLowerCase()}`}
              onClick={(e) => props.setActiveTab(setting)}
            >
              {setting}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="my-2 px-3">
        <h5>Seller Zone</h5>
        <hr />
        {!props.showSellerOptions && (
          <div>
            <p>
              Want to sell your products on our site? Enable your seller account
              now.
            </p>
            <Button variant="success" onClick={props.handleShow}>
              Enable Seller Account
            </Button>
          </div>
        )}
        {props.showSellerOptions && (
          <ListGroup variant="flush">
            <ListGroup.Item
              action
              variant="light"
              href={`/account/${props.account?.id}/seller`}
              onClick={(e) => handleOnClick(e, "Products")}
            >
              Products
            </ListGroup.Item>
            <ListGroup.Item
              action
              variant="light"
              href="#Sales"
              onClick={(e) => handleOnClick(e, "Sales")}
            >
              Sales
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </>
  );
};
