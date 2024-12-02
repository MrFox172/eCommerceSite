import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

interface Account {
  id: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  phonenumber: string;
  createdate: string;
  sellerAccount: {
    id: number;
    accountId: number;
    companyName: string;
    createdate: string;
  };
}

const Profile = () => {
  const rowStyle = "mb-3";
  const [account, setAccount] = useState<Account>({
    id: 0,
    firstname: "",
    lastname: "",
    emailaddress: "",
    phonenumber: "",
    createdate: "",
    sellerAccount: {
      id: 0,
      accountId: 0,
      companyName: "",
      createdate: "",
    },
  });
  const context: Account = useOutletContext();
  
  useEffect(() => {
    setAccount(context);
  }, [context]);

  return (
    <>
      <Form className="border rounded p-4">
        <Row className={rowStyle}>
          <Form.Group as={Col} md="4">
            <Form.Label>ID:</Form.Label>
            <Form.Control
              type="text"
              value={account?.id}
              disabled
              onChange={(e) => {
                return e.target.value;
              }}
            />
          </Form.Group>
        </Row>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="6">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={account?.firstname}
              onChange={(e) => {
                return e.target.value;
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={account?.lastname}
              onChange={(e) => {
                return e.target.value;
              }}
            />
          </Form.Group>
        </Row>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="6">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email Address"
                aria-describedby="inputGroupPrepend"
                value={account?.emailaddress}
                required
                onChange={(e) => {
                  return e.target.value;
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                aria-describedby="inputGroupPrepend"
                value={account?.phonenumber}
                required
                onChange={(e) => {
                  return e.target.value;
                }}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="6">
            User Created At: {account?.createdate}
          </Form.Group>
        </Row>
        <Row className="justify-content-end">
        <Col md={4} className="justify-content-end text-end">
        <Button variant="success" type="submit" size="sm">
          Save
        </Button>
        </Col>
        </Row>
      </Form>
      <div className="pt-5">
        <h4>Security</h4>
        <hr />
        <Form>
          <Row>
            <div className="alert alert-warning mx-3 p-5" role="alert">
              You can change your password here. Please make sure to use a
              strong password.
            </div>
            <Form.Group as={Col} md="6">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-5 m-3 w-25">
              Change Password
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Profile;
