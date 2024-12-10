import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const ConfirmationPage: React.FC = () => {
    const navigate = useNavigate();
    const details = useParams().confirmation;
    return (
    <div>
      <Container className={`mt-3 mb-5 ${styles.main}`}>
        <h1>Thank you for your purchase!</h1>
        <p>
          Your order has been confirmed and will be shipped shortly to your
          primary address.
        </p>
      </Container>
    </div>
  );
};

export default ConfirmationPage;
