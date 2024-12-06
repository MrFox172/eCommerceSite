import React, { ChangeEvent, useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/SKATERLogoSmall.png";
import styles from "./styles.module.css";

const Register = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.localUser !== "") {
        navigate("/");
    }
}, [props.localUser, navigate]);

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: (typeof state)[keyof typeof state] = event.target.value;

    setState({ ...state, [event.target.id]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalidEmail(false);
    setRegistrationComplete(false);
    setIsLoading(true);

    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post("https://www.thelowerorbit.com:8080/api/account/register", {
        firstname: state.firstname,
        lastname: state.lastname,
        emailaddress: state.email,
        phonenumber: state.phone,
        password: state.password,
      })
      .then((response) => {

        setRegistrationComplete(true);
        setFirstname(response.data.firstname);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          console.log("Email already exists!!");
          setInvalidEmail(true);
          return;
        }
        setInvalidEmail(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Container className="p-5 text-auto me-auto justify-content-center">
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <h1 className="fw-bold text-secondary-emphasis"><img src={logoImage} className={styles.icon}/>KATER.COM</h1>
            {!registrationComplete && (
            <Card className="round text-start">
              <Card.Header className="text-center bg-dark bg-gradient text-white p-3">
                <h4>Register Account</h4>
              </Card.Header>
              <Card.Body>
                <Alert variant={'info'}>
                Welcome to Skater.com! 🛹 <br /><br />
                Join the ultimate skateboarding community. Register now to access exclusive gear, insider deals, and the latest skate trends.
                <br /><br />
                Why Sign Up?<br />
                  •	Fast and secure checkout<br />
                  •	Track your orders easily<br />
                  •	Get access to special offers<br />
                  •	Stay up to date on the latest skate trends<br />
                
                  <br />
                Ready to shred? Create your account in seconds! 🤘
                </Alert>
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
                    {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Register"
              )}
                  </Button>
                  {invalidEmail && (
                    <div className="alert alert-danger mt-3" role="alert">
                      Email already exists!!! Please try again.
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
            )}
            {registrationComplete && (
              <Alert variant={'info'}>
                <h2>Thanks {firstname}!</h2> <br />
                <h4>Your Registration is now Complete</h4>
                <p>
                  Your account has been successfully created. 
                  <br />
                  Please check your email for a confirmation link.
                </p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
