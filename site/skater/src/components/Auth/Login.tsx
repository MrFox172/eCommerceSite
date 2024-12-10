import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import logoImage from "../../assets/SKATERLogoSmall.png";
import loginImage from "../../assets/LoginSkates.jpg"; // Import the image

const Login = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.localUser !== "") {
      navigate("/");
    }
  }, [props.localUser, navigate]);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [needVerification, setNeedVerification] = useState(false);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: (typeof userLogin)[keyof typeof userLogin] = event.target.value;

    setUserLogin({ ...userLogin, [event.target.id]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalidLogin(false);
    setNeedVerification(false);

    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post("https://www.thelowerorbit.com:8080/api/account/login", {
        emailaddress: userLogin.email,
        password: userLogin.password,
      })
      .then((response) => {
        props.setLocalUser(JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setInvalidLogin(true);
          return;
        }

        if (error.response.status === 400) {
          console.log("Server error");
          setNeedVerification(true);
          return;
        }
      });
  };

  return (
    <>
      <Container className="p-5">
        <Row className="align-items-center">
          {/* Left Column with Image */}
          <Col md={6} className="d-none d-md-block">
            <img
              src={loginImage}
              alt="Login Skates"
              className="img-fluid rounded-start"
              style={{ height: "100vh", objectFit: "cover" }}
            />
          </Col>

          {/* Right Column with Login Form */}
          <Col md={6} className="d-flex justify-content-center">
            <div style={{ width: "80%", maxWidth: "450px", marginRight: "20px" }}>
              <h1 className="fw-bold text-secondary-emphasis text-center mb-4">
                <img src={logoImage} className={styles.icon} alt="Logo" />
                KATER.COM
              </h1>
              <Card className="round shadow-lg">
                <Card.Header className="text-center bg-dark bg-gradient text-white p-4">
                  <h4>Welcome Back</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  {invalidLogin && (
                    <div className="alert alert-danger" role="alert">
                      Invalid login credentials
                    </div>
                  )}
                  {needVerification && (
                    <div className="alert alert-warning" role="alert">
                      Please check your email and verify your account!
                    </div>
                  )}
                  <p className="text-center">Sign in to access your account</p>
                  <p className="text-center">Save on the best products for all your skating needs</p>

                  <Form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      className="form-control form-control-lg mb-3"
                      onChange={onFieldChange}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      className="form-control form-control-lg mb-3"
                      onChange={onFieldChange}
                      required
                    />
                    <Button variant="success" type="submit" size="lg" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <p className="mt-4 text-center">
                Don't have an account?
                <span className="badge text-bg-primary text-wrap mx-2">
                  <a href="/register" className="text-white text-decoration-none">Create Account</a>
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
