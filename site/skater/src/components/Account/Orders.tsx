import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";
import { Col, Row, Container, Table } from "react-bootstrap";

const Orders = () => {
  const [user, setUser] = useState<IAccount>();
  const context: IAccount = useOutletContext();

  console.log("Context:", context);

  useEffect(() => {
    setUser(context);
  }, [context]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Orders</h1>
          </Col>
        </Row>
      </Container>
      <h1>Orders</h1>
      <h1>{user?.firstname}</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </>
  );
};

export default Orders;
