import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useCart } from "../CartProvider/CartProvider";
import { useEffect, useState } from "react";
import { ShippingOrderDetails } from "../../interfaces/shipments";
import axios from "axios";

const ConfirmationPage: React.FC = () => {
  const api = "https://thelowerorbit.com:8080/api";
  const navigate = useNavigate();
  const cart = useCart();
  const [id, setId] = useState<string>(useParams().id);
  const [order, setOrder] = useState<ShippingOrderDetails>(null);

  const validId = (id: string) => {
    return !isNaN(Number(id));
  };

  const getOrder = async (id: string) => {
    console.log("Getting order with id: ", id);
    axios
      .get(`${api}/order/confirm/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
        cart.clearCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (validId) {
      getOrder(id);
    }
  }, [id]);

  return (
    <div>
      <Container className={`mt-3 mb-5 ${styles.main}`}>
        {!validId(id) ? (
          <>
            <h5>Invalid Id</h5>
            <p>
              If you believe this was in error, please double check your
              account.
            </p>
          </>
        ) : (
          <>
            <h1>Thank you for your purchase!</h1>
            <p>
              Your order #{id} has been confirmed and will be shipped shortly.
              {order && (
                <>
                  <p>
                    Your order total was: ${order.orderTotal.toFixed(2)} and
                    will be shipped to:
                  </p>
                  <p>
                    {order.shipment.address.street},{" "}
                    {order.shipment.address.city},{" "}
                    {order.shipment.address.state}, {order.shipment.address.zip}
                  </p>
                  <p>
                    Tracking Number: {order.shipment.trackingNumber}
                    <br />
                    Order Status: {order.orderStatus}
                    <br />
                    {"Estimated Delivery: "}
                    {order.shipment.daysToDeliver} days
                  </p>
                </>
              )}
            </p>
          </>
        )}
      </Container>
    </div>
  );
};

export default ConfirmationPage;
