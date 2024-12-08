import { Row, Form, Col} from "react-bootstrap";
import { Address as IAddress } from "../../interfaces/user";
import { useEffect, useState } from "react";
import axios from "axios";

const AddressCard = ({
  accountId,
  existingAddress,
  setShow,
  setAddressList,
}) => {
  const [address, setAddress] = useState<IAddress>({} as IAddress);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  useEffect(() => {
    if (existingAddress) {
      setAddress(existingAddress);
    }
  }, [existingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the address
    axios
      .post(`https://www.thelowerorbit.com:8080/api/account/address`, {
        ...address,
        accountId: accountId,
      })
      .then((res) => {
        setAddressList(res.data.addresses);
        setShow(false);
        setAddress({} as IAddress);
      })
      .catch((err) => {
        console.log(err);
      });    
  };

  const handleDeleteOnClick = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");  
    if (!confirmDelete) {
      return;
    }
    axios
      .delete(`https://www.thelowerorbit.com:8080/api/account/${accountId}/address/${address.id}`)
      .then((res) => {
        setAddressList(res.data.addresses);
        setShow(false);
        setAddress({} as IAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form className="border p-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your recipient name"
            value={address?.recipientName || ""}
            required
            disabled={address.id ? true : false}
            onChange={(e) =>
              setAddress({ ...address, recipientName: e.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address?.street || ""}
            required
            disabled={address.id ? true : false}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
        </Form.Group>
      </Row>
      <Row className="mt-2">
        <Form.Group as={Col} md={4}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={address?.city || ""}
            required
            disabled={address.id ? true : false}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <Form.Label>State</Form.Label>
          <Form.Select
            as="select"
            value={address?.state || ""}
            required
            disabled={address.id ? true : false}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          >
            <option value="">Select your state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your zip code"
            value={address?.zip || ""}
            required
            disabled={address.id ? true : false}
            onChange={(e) =>
              setAddress({ ...address, zip: e.target.value })
            }
          />
        </Form.Group>
      </Row>
      {!address.id ? (
        <Row className="mt-2">
          <Col className="justify-content-end text-end">
            <p className="msg text-warning"></p>
            <button className="btn btn-outline-success btn-sm rounded-5" type="submit">
              Save
            </button>
          </Col>
        </Row>
      ) : (
        <Row className="mt-2">
          <Col className="justify-content-end text-end">
            <p className="msg text-warning"></p>
            <button className="btn btn-outline-danger btn-sm rounded-5" onClick={handleDeleteOnClick}>
              Delete
            </button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default AddressCard;
