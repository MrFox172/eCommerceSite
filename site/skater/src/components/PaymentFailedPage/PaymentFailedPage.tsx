import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PaymentFailedPage: React.FC = () => {
  const navigate = useNavigate();
  const error = useParams().error;
  return (
    <Container className="mt-3 mb-5">
      <h1>Stripe Payment Failed:</h1>
      <br />
      <p>Reason:{error}</p>
      <Button variant="primary" onClick={() => navigate("/checkout")}>
        Go back to checkout
      </Button>
    </Container>
  );
};

export default PaymentFailedPage;
