
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const Verify = () => {
  const { token } = useParams<{ token: string}>();
  const { id } = useParams<{ id: string }>();
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://www.thelowerorbit.com:8080/api/account/${id}/verify/${token}`)
      .then((res) => {
        setVerified(true);
        setTimeout(() => {
            navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [token, id]);

  return (
        <Container>
            <Row>
                <Col className="text-center mt-5">
                    <h1>Verify Account</h1>
                    {verified ? (
                        <Alert variant={'success'}>
                            Your account has been verified! <br /><br />

                            Redirecting to login page...
                        </Alert>
                    ) : (
                        <>
                        {error ? (
                            <Alert variant={'danger'}>There was an error verifying your account...</Alert>
                        ) : (
                            <Alert variant={'info'}>Verifying your account...</Alert>
                        )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Verify;