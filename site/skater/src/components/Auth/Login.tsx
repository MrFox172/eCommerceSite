import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChangeEvent, useState} from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";

const Login = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (props.localUser !== "") {
            navigate("/");
        }
    }, [props.localUser, navigate]);

    const [userLogin, setUserLogin] = useState({
            email: "", 
            password: ""
    });

    const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value: (typeof userLogin)[keyof typeof userLogin] = event.target.value;
     
        setUserLogin({ ...userLogin, [event.target.id]: value });
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        console.log(userLogin);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post("https://www.thelowerorbit.com:8080/api/account/login", {
            emailaddress: userLogin.email,
            password: userLogin.password
        }).then((response) => {
            console.log("Login successful");
            console.log(response.data);

            if(response.data === null || response.data === "") {
                console.log("Invalid login credentials");
                return;
            }
            props.setLocalUser(JSON.stringify(response.data));
            navigate("/");

        }).catch((error) => {
            console.log(error);
        });

    };
  return (
    <>
        <Container className="p-5 text-auto me-auto justify-content-center">
            <Row className="justify-content-center text-center">
                <Col lg={6} className="text-center">
                    <h1 className="fw-bold text-secondary-emphasis">SKATER.COM</h1>
                    <Card className="round">
                        <Card.Header className="text-center bg-dark bg-gradient text-white p-3">
                            <h4>Welcome Back</h4>
                        </Card.Header>
                        <Card.Body>
                        
                        <p>Sign in to access your account</p>

                        <p>Save on the best products for all your skating needs</p>

                        <Form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Email" id="email" className="form-control mb-2" onChange={onFieldChange} required/>
                            <input type="password" placeholder="Password" id="password" className="form-control mb-2" onChange={onFieldChange} required/>
                            <Button variant="success" type="submit">
                                Sign In
                            </Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
            <Row className="justify-content-center text-center">
                <Col md={6} className="text-center mt-3">
                    <p>Don't have an account?
                        <span className="badge text-bg-secondary text-wrap mx-2">
                            <a href="/register">Create Account</a>
                        </span>
                    </p>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default Login;