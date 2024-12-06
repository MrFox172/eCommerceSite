import { Col, Row, Form, Button } from "react-bootstrap";
import { Account as IAccount } from "../../interfaces/user";
import { useState } from "react";
import axios from "axios";

const Password = (props: {
  account: IAccount;
  setAccount: React.Dispatch<React.SetStateAction<IAccount>>;
}) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [submitMsg, setSubmitMsg] = useState<string>("");
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  const handleNewPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
  };

  const handleOldPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMsg("");
    setPasswordLoading(true);
    axios
      .put(`https://www.thelowerorbit.com:8080/api/account/${props.account.id}/password`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        props.setAccount(res.data);
        setSubmitMsg("Password updated successfully!");
      })
      .catch((err) => {
        if (err.response.data.message === "Old password does not match!!") {
          setSubmitMsg("Old password does not match!!");
          return;
        }
        setSubmitMsg("Error updating password!");
      })
      .finally(() => {
        setPasswordLoading(false);
        setNewPassword("");
        setOldPassword("");
      });
  };

  return (
    <>
      <h4 className="mt-5">Security</h4>
      <hr />
      <div className="alert alert-warning my-3 p-5" role="alert">
        You can change your password here. Please make sure to use a strong
        password.
      </div>
      <Form onSubmit={handlePasswordSubmit} className="border rounded p-4">
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={handleOldPasswordOnChange}
              value={oldPassword || ""}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={handleNewPasswordOnChange}
              value={newPassword || ""}
            />
          </Form.Group>
        </Row>
        <Row className="border-top mt-5">
          <Col className="justify-content-end text-end">
            <p className="msg text-warning py-2">{submitMsg}</p>
            <Button variant="success" type="submit" size="sm">
              {passwordLoading ? (
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
    </>
  );
};

export default Password;
