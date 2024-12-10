import React from "react";
import { Container } from "react-bootstrap";

const ConfirmationPage: React.FC = () => {
  return (
    <div>
      <Container className="mt-3 mb-5">
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
