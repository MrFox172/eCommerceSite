import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account as IAccount } from "../../interfaces/user";
import { Col, Row, Container, Table } from "react-bootstrap";
import axios from "axios";

interface Orders {
  orderNumber: string
  orderTotal: number
  orderStatus: string
  createdate: string
  shipment: {
    trackingNumber: string
    shipmentDate: string
  }
}

const Orders = () => {
  const [user, setUser] = useState<IAccount>();
  const context: IAccount = useOutletContext();
  const [orders, setOrders] = useState<Orders[]>([]);

  console.log("Context:", context);

  useEffect(() => {
    setUser(context);
  }, [context]);

  useEffect(() => {
    if(!user) return;
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.get(`https://www.thelowerorbit.com:8080/api/order/account/${user?.id}`)
        .then((res) => {
            console.log(res);
            setOrders(res.data);
        }
        , (err) => {
            console.log(err);
        });
  }, [user]);



  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4>Orders</h4>
          </Col>
        </Row>
      </Container>
      {orders.filter((x) => x.orderStatus == "COMPLETED").length === 0 ? ( <h3>No orders found</h3> ) : (

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Total</th>
          <th>Order Date</th>
          <th>Expected Delivery Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.filter((x) => x.orderStatus == "COMPLETED").map((order) => (
          <tr key={order.orderNumber}>
            <td>{order.orderNumber}</td>
            <td>{order.orderTotal}</td>
            <td>{new Date(order.createdate).toLocaleString()}</td>
            <td>{order.shipment.shipmentDate}</td>
          </tr>
        ))}        
      </tbody>
    </Table>
      )}
    </>
  );
};

export default Orders;
