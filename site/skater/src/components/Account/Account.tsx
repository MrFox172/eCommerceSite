import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { AccountMenu } from "./AccountMenu";
import SellerAccountModal from "../Seller/SellerAccountModal";
import { useFetch } from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";

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

const Account = (props) => {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useLocalStorage("user", "");
  const [activeTab, setActiveTab] = useState("");
  const [account, setAccount] = useState<Account>();
  const [showSellerOptions, setShowSellerOptions] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (localUser === "") {
      navigate("/login");
    }
    setUrl(`/account/${JSON.parse(localUser).id}`)
  }, [localUser, navigate]);

  const { data, isPending, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setAccount(data);
    }
  }, [data]);

  return (
    <>
      <Container className="px-4 mb-5 h-100">
        <Row className="">
          <Col lg={4} className="bg-light py-4">
            <AccountMenu
              setActiveTab={setActiveTab}
              account={account}
              handleShow={handleShow}
              showSellerOptions={showSellerOptions}
              setShowSellerOptions={setShowSellerOptions}
            />
          </Col>
          <Col>
            <Row>
              <Col className="py-4">
                <h4>{activeTab}</h4>
                <hr />
                <div className="alert alert-info mx-4 p-5" role="alert">
                  This page is for changing account details, payment methods,
                  and other account settings.
                </div>
              </Col>
            </Row>
            <Row className="px-4">
              <Col>
                <Outlet context={account} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <SellerAccountModal
        account={account}
        setShowSellerOptions={setShowSellerOptions}
        show={show}
        setShow={setShow}
        handleShow={handleShow}
      />
    </>
  );
};

export default Account;
