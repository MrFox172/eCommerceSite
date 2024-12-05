import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Terms from "./Terms";
import { Account as IAccount } from "../../interfaces/user";

const SellerAccountModal = (props: {account: IAccount | null, setShowSellerOptions, setShow, show, handleShow }) => {

  const handleAgreeClose = () => {
    createSellerAccount(props.account, props.setShowSellerOptions);
    props.setShow(false);
  };

  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal show={props.show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Enable Seller Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <h4>So you want to be a seller for our site?</h4>
          <br />
          Agree to the terms and conditions to enable your seller account.
          <br />
          <br />
          <Terms />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Naw, not for me
          </Button>
          <Button variant="success" onClick={handleAgreeClose}>
            I Agree 👍
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SellerAccountModal;

const createSellerAccount = (
  account: IAccount | null,
  setShowSellerOptions: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (account !== null) {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(`https://www.thelowerorbit.com:8080/api/seller/account`, {
        accountId: account?.id,
        companyName: `${account?.firstname} ${account?.lastname}`,
      })
      .then((response) => {
        console.log(response.data);
        setShowSellerOptions(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
