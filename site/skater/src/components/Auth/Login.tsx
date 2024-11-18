import React from "react";
import axios from "axios";
import { createRef, useState, FormEvent } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";

const Login: React.FC = () => {

    const [userCreds, setUserCreds] = useState(
        {
            email: "", 
            password: ""
        }
    );

    //const onChange = e => {};

    const onSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        const data = new FormData(e.target);
        console.log("Form submitted");
        console.log(data);
        console.log(data.get('emailaddress'));
        console.log(data.get('password'));

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post("http://localhost:8080/api/account/login", {
            emailaddress: data.get('emailaddress'),
            password: data.get('password')
        }).then((response) => {
            console.log(response);
            console.log("Login successful");
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

        //console.log(e.target.value);

        //setUserCreds({email: e.target.name.email.value, password: e.target.password.value});
        //console.log(password);
    };
  return (
    <>
        <Container className="p-3 text-auto me-auto justify-content-center">
            <Row className="justify-content-center text-center">
                <Col lg={6} className="text-center">
                    <h1>SKATER.COM</h1>
                    <h4>Welcome Back</h4>
                    <Card className="round">
                        <Card.Body>
                        
                        <p>Sign in to access your account</p>

                        <p>Save on the best products for all your skating needs</p>

                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Email" name="emailaddress" className="form-control mb-2" />
                            <input type="password" placeholder="Password" name="password" className="form-control mb-2" />
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </form>
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
            <Row className="justify-content-center text-center">
                <Col md={6} className="text-center mt-3">
                    <p>Don't have an account? <a href="/register">Create Account</a></p>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default Login;