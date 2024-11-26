import {
  Col,
  Row,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";

interface ProfileProps {
    pageName: string;
    account: {
        id: number;
        firstname: string;
        lastname: string;
        emailaddress: string;
        phonenumber: string;
        createdate: string;
    };
}

const Profile = (props: ProfileProps) => {

    const rowStyle = "mb-5";
  return (
    <>
      <Form className="">
        <Row className={rowStyle}>
            <Form.Group as={Col} md="4">
                <Form.Label>ID:</Form.Label>
                <Form.Control type="text" value={props.account.id} disabled/>
            </Form.Group>
        </Row>
        <Row className={rowStyle}>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={props.account.firstname}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={props.account.lastname}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={rowStyle}>
            <Form.Group as={Col} md="6" controlId="validationCustomEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Email Address"
                    aria-describedby="inputGroupPrepend"
                    value={props.account.emailaddress}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a email address.
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    aria-describedby="inputGroupPrepend"
                    value={props.account.phonenumber}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a phone number.
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </Row>
        <Row className={rowStyle}>
            <Form.Group as={Col} md="6">
                User Created At: {props.account.createdate}
            </Form.Group>
        </Row>
        <Button variant="success" type="submit" className="w-25">
            Update Details
        </Button>
      </Form>
      <div className="pt-5">
        <h4>Security</h4>
        <hr />
        <Form>
            <Row>
                <div className="alert alert-warning mx-3 p-5" role="alert">
                  You can change your password here. Please make sure to use a strong password.
                </div>
                <Form.Group as={Col} md="6">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" required/>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required/>
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
