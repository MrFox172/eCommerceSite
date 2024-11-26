import { Col, Container, Row, ListGroup, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import axios from "axios";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [accountMenuList, setAccountMenuList] = useState([
    "Profile",
    "Orders",
    "Address",
    "Payment Methods",
    "Sellers",
  ]);
  const [activeTab, setActiveTab] = useState("Profile");
  const [account, setAccount] = useState({
    id: 0,
    firstname: "Mark",
    lastname: "Otto",
    emailaddress: "mark.otto@test.com",
    phonenumber: "123-456-7890",
    createdate: "12-12-2021",
  });

  const component: Record<string, JSX.Element> = {
    Profile: <Profile pageName={activeTab} account={account} />,
    Orders: <h1>Orders</h1>,
    Address: <h1>Address</h1>,
    "Payment Methods": <h1>Payment Methods</h1>,
    Sellers: <h1>Sellers</h1>,
  };

  const getLoggedUser = () => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser === null) {
      console.log("User not logged in");
      navigate("/login");
    } else {
      const userLogin = JSON.parse(loggedUser);
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
        .get(`https://www.thelowerorbit.com:8080/api/account/${userLogin.id}`)
        .then((response) => {
          console.log(response.data);
          const account = response.data;
          setAccount(account);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <Tab.Container defaultActiveKey={`#${activeTab}`}>
      <Container className="px-4">
        <Row>
          <Col lg={4} className="bg-light pt-4">
            <div className="my-2 mb-5 px-3">
              <h5>Account Settings</h5>
              <hr />
              <h4 className="text-center justify-content-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="350"
                  height="250"
                  fill="currentColor"
                  className="bi bi-people text-center me-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </svg>
              </h4>
              <ListGroup>
                {accountMenuList.map((setting) => (
                  <ListGroup.Item
                    action
                    variant="light"
                    key={setting}
                    href={`#${setting}`}
                    onClick={() => setActiveTab(setting)}
                  >
                    {setting}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="my-2 px-3">
              <h5>Seller Zone</h5>
              <hr />
              <ListGroup>
                <ListGroup.Item>Profile</ListGroup.Item>
                <ListGroup.Item>Sales</ListGroup.Item>
                <ListGroup.Item>Products</ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col>
            <Row>
              <Col className="pt-4">
                <h4>{activeTab}</h4>
                <hr />
                <div className="alert alert-info mx-4 p-5" role="alert">
                  This page is for changing account details, payment methods,
                  and other account settings.
                </div>
              </Col>
            </Row>
            <Row className="px-4">
              <Tab.Content>
                {accountMenuList.map((setting) => (
                  <Tab.Pane eventKey={`#${setting}`} key={setting}>
                    {component[setting]}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Row>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
};

export default Account;
