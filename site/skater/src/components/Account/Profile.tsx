import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";
import axios from "axios";
import Password from "./Password";
import Address from "./Address";

const Profile = () => {
  const rowStyle = "mb-3";
  const [account, setAccount] = useState<IAccount>({} as IAccount);
  const [profileMsg, setProfileMsg] = useState<string>("");
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const context: IAccount = useOutletContext();

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    setAccount(context);
  }, [context]);

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileLoading(true);

    axios
      .put(`https://www.thelowerorbit.com:8080/api/account/${account.id}`, {
        id: account.id,
        firstname: account.firstname,
        lastname: account.lastname,
        emailaddress: account.emailaddress,
        phonenumber: account.phonenumber,
      })
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
        setProfileMsg("Profile updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        setProfileMsg("Profile update failed!!");
      })
      .finally(() => {
        setProfileLoading(false);
      });
  };

  return (
    <>
      <Form className="border rounded p-4" onSubmit={handleProfileSubmit}>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="4">
            <Form.Label>ID:</Form.Label>
            <Form.Control
              type="text"
              value={account?.id || ""}
              disabled
              readOnly={true}
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
              value={account?.firstname || ""}
              onChange={(e) =>
                setAccount({ ...account, firstname: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={account?.lastname || ""}
              onChange={(e) =>
                setAccount({ ...account, lastname: e.target.value })
              }
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
                value={account?.emailaddress || ""}
                required
                onChange={(e) =>
                  setAccount({ ...account, emailaddress: e.target.value })
                }
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              aria-describedby="inputGroupPrepend"
              value={account?.phonenumber || ""}
              required
              onChange={(e) =>
                setAccount({ ...account, phonenumber: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="6">
            User Created At: {new Date(account?.createdate).toLocaleString()}
          </Form.Group>
        </Row>
        <Row className="justify-content-end border-top">
          <Col md={6} className="justify-content-end text-end">
            <p className="msg text-danger py-2">{profileMsg}</p>
            <Button variant="success" type="submit" size="sm">
              {profileLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Save"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <Address account={account} setAccount={setAccount} />
      <Password account={account} setAccount={setAccount} />
    </>
  );
};

export default Profile;
