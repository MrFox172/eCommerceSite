import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import { Product } from "../../interfaces/products";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Container, Row, Col, Button } from "react-bootstrap";
import defaultImage from "../../assets/img-placeholder.svg";
import styles from "./styles.module.css";
import AddressCard from "../Account/AddressCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useState } from "react";
import { Account } from "../../interfaces/user";
import {
  OrderVerification,
  OrderedProduct,
  Order,
} from "../../interfaces/orders";

import axios from "axios";

const CheckoutPage: React.FC<string> = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState<Account | null>(null);
  const [localUser, setLocalUser] = useLocalStorage("user", "");

  // const { data, isPending, error } = useFetch();

  useEffect(() => {
    if (cart.getTotalItems() === 0) {
      console.log("No items in cart, redirecting to cart page");
      navigate("/cart");
    } else {
      //verifying the cart.
      verifyCart();
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (localUser !== "" && localUser !== null) {
      console.log("User is logged in");
      console.log(JSON.parse(localUser));
      setUser(JSON.parse(localUser));
    } else {
      console.log("User is not logged in");
      //navigate("/login");
    }
  }, [localUser]);

  const verifyCart = () => {
    let order: OrderVerification = { orderedProducts: [] };
    cart.cart.forEach((item) => {
      const orderedProduct: OrderedProduct = {
        productId: item.product.id,
        expectedQuantity: item.quantity,
        expectedPrice: item.product.salePrice * item.quantity,
      };
      order.orderedProducts.push(orderedProduct);
    });
    console.log("Order to Verify", order);
    axios
      .post("https://thelowerorbit.com:8080/api/order/cart/check", order)
      .then((res) => {
        alert("Verification Okay");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          {user && user.addresses && user.addresses.length > 0 ? (
            <>
              <AddressCard
                accountId={user.id}
                existingAddress={user.addresses[0]}
                setShow={true}
                setAddressList={user.addresses}
              />
            </>
          ) : (
            <>
              {user ? (
                <>
                  <h5>No address found</h5>
                  <Button
                    onClick={() => navigate(`/account/${user.id}`)}
                    variant="primary"
                    size="sm"
                  >
                    Add Address
                  </Button>
                </>
              ) : (
                <>
                  <h5>To Finish Ordering Create an Account</h5>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="primary"
                    size="sm"
                  >
                    Log In
                  </Button>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
  return <div>CheckoutPage</div>;
};

export default CheckoutPage;
