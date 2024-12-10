import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Fallthrough() {
  const navigate = useNavigate();
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (count === 0) {
      navigate("/home");
    }
    setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  return (
    <Container className="mt-3 mb-5">
      <h1>Uh oh! You've McTwisted Out of the Park!</h1>
      <p>You will be redirected to the homepage shortly.</p>
      <p>
        Redirecting in{" "}
        <strong>
          <em>{count}</em>
        </strong>
        ...
      </p>
    </Container>
  );
}

export default Fallthrough;
