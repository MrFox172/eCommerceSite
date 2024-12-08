import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import { Product } from "../../interfaces/products";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import defaultImage from "../../assets/img-placeholder.svg";
import styles from "./styles.module.css";
import AddressCard from "../Account/AddressCard";

const CheckoutPage: React.FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  // const { data, isPending, error } = useFetch();

  useEffect(() => {
    if (cart.getTotalItems() === 0) {
      console.log("No items in cart, redirecting to cart page");
      navigate("/cart");
    }
  }, [cart, navigate]);

  return (
    <Container className="mt-5">
      <Row>
        <h1>Checkout</h1>
      </Row>
      <Row>
        <Col md={5} className="border-end">
          <h4>Order</h4>
          <ul className={styles.alternating}>
            {cart.cart.map((item) => (
              <li key={item.product.id} className={styles.liSplit}>
                <div>
                  Name: {item.product.name}
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Price: ${item.product.salePrice.toFixed(2)}
                </div>
                <div>
                  {item.product.productImages &&
                  item.product.productImages.length > 0 ? (
                    <>
                      <img
                        src={item.product.productImages[0].imageUrl}
                        alt={item.product.name}
                      />
                    </>
                  ) : (
                    <>
                      <img src={defaultImage} alt={item.product.name} />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <h4>Checkout Information</h4>
          <AddressCard />
        </Col>
      </Row>
    </Container>
  );
  return <div>CheckoutPage</div>;
};

export default CheckoutPage;
