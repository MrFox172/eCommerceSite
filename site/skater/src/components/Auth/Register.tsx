import React, { ChangeEvent, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: (typeof state)[keyof typeof state] = event.target.value;

    setState({ ...state, [event.target.id]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);

    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post("https://thelowerorbit.com:8080/api/account/register", {
        firstname: state.firstname,
        lastname: state.lastname,
        emailaddress: state.email,
        phonenumber: state.phone,
        password: state.password,
      })
      .then((response) => {
        console.log("Registration successful");
        console.log(response.data);
        if (response.data === null || response.data === "") {
          console.log("Invalid registration credentials");
          return;
        }
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container className="p-5 text-auto me-auto justify-content-center">
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <h1 className="fw-bold text-secondary-emphasis">SKATER.COM</h1>
            <Card className="round text-start">
              <Card.Header className="text-center bg-dark bg-gradient text-white p-3">
                <h4>Register Account</h4>
              </Card.Header>
              <Card.Body>
                <Form className="text-left" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="firstname"
                      onChange={onFieldChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="lastname"
                      onChange={onFieldChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      id="phone"
                      pattern="[0-9]{10}"
                      onChange={onFieldChange}
                      required
                    />
                    <Form.Text id="phoneHelpBlock" muted>
                      Your phone number must be in the format 1234567890.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      onChange={onFieldChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      onChange={onFieldChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
