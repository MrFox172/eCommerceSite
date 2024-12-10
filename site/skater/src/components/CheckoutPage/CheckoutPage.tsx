import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  StripeOrder,
} from "../../interfaces/orders";
import { ShippingOption } from "../../interfaces/shipments";

import axios from "axios";

const CheckoutPage: React.FC<string> = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState<Account | null>(null);
  const [localUser, setLocalUser] = useLocalStorage("user", "");
  const [verified, setCartVerified] = useState(false);
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState<number>(3);
  const [verifiedCartProducts, setVerifiedCartProducts] = useState<
    OrderedProduct[]
  >([]);
  const [shippingPrices, setShippingPrices] = useState<number[]>([
    19.99, 34.99, 5.99,
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (cart.getTotalItems() === 0) {
      console.log("No items in cart, redirecting to cart page");
      navigate("/cart");
    } else {
      //verifying the cart.
      verifyCart();
    }
  }, [cart.cart, navigate]);

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

  useEffect(() => {
    if (verified) {
      getSessionUrl();
    }
  }, [
    verified,
    verifiedCartProducts,
    selectedShipping,
    selectedAddress,
    errorMessage,
  ]);

  const verifyCart = () => {
    let order: OrderVerification = { orderedProducts: [] };
    cart.cart.forEach((item) => {
      const orderedProduct: OrderedProduct = {
        productId: item.product.id,
        expectedQuantity: item.quantity,
        expectedPrice: item.product.salePrice,
      };
      order.orderedProducts.push(orderedProduct);
    });
    console.log("Order to Verify", order);
    axios
      .post("https://thelowerorbit.com:8080/api/order/cart/check", order)
      .then((res) => {
        setCartVerified(true);
        setVerifiedCartProducts(order.orderedProducts);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "There was an issue verifying your cart:" + err.response.data
        );
      });
  };

  const getSessionUrl = () => {
    let order: StripeOrder = {
      accountId: user.id,
      paymentMethodId: 0,
      shippingMethodId: selectedShipping,
      addressId: user.addresses[selectedAddress].id,
      orderedProducts: verifiedCartProducts,
      expectedOrderTotal: cart.getTotalPrice(),
    };
    console.log("Order to send to Stripe", order);
  };

  const payWithStripe = () => {
    if (!verified || sessionUrl === null) {
      return;
    }
  };

  return (
    <Container className="mt-5">
      {errorMessage !== null && (
        <Row>
          <Col>
            <h4 className="text-danger">{errorMessage}</h4>
            <Button className="btn-warning" onClick={() => navigate("/cart")}>
              Return to Cart
            </Button>
          </Col>
        </Row>
      )}
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
          <p className="text-dark">
            <strong>Sub Total: </strong>${cart.getTotalPrice().toFixed(2)}
          </p>
          <p className="text-dark">
            <strong>Tax USD: </strong>$
            {(cart.getTotalPrice() * 0.06).toFixed(2)}
          </p>
          <p className="text-dark">
            <strong>Total USD: </strong>$
            {(cart.getTotalPrice() * 1.06).toFixed(2)}
          </p>
        </Col>
        <Col>
          <h4>Checkout Information</h4>
          {user && user.addresses && user.addresses.length > 0 ? (
            <>
              <h5>Shipping Address</h5>
              {user.addresses.map((address, index) => (
                <Button
                  key={index}
                  variant={selectedAddress === index ? "primary" : "secondary"}
                  onClick={() => setSelectedAddress(index)}
                  className="mb-2"
                >
                  Address {index + 1}
                </Button>
              ))}
              <AddressCard
                accountId={user.id}
                existingAddress={user.addresses[selectedAddress]}
                setShow={true}
                setAddressList={user.addresses}
                showButton={false}
              />
              <h5>Shipping Options</h5>
              <Button
                variant={selectedShipping === 3 ? "primary" : "secondary"}
                onClick={() => setSelectedShipping(3)}
                className="mb-2 mr-5"
              >
                Express: 2-Day Shipping
              </Button>
              <Button
                variant={selectedShipping === 4 ? "primary" : "secondary"}
                onClick={() => setSelectedShipping(4)}
                className="mb-2 mr-2"
              >
                Next Day Shipping
              </Button>
              <Button
                variant={selectedShipping === 5 ? "primary" : "secondary"}
                onClick={() => setSelectedShipping(5)}
                className="mb-2 mr-2"
              >
                Standard: 3-5 Day Shipping
              </Button>
              <p className="text-dark">
                Estimated Shipping Cost: ${shippingPrices[selectedShipping - 3]}
              </p>
              <br />
              <Button
                className={verified ? "btn-primary" : "btn-warning"}
                onClick={payWithStripe}
              >
                {verified ? <>Proceed to Payment</> : <>Verifying Cart</>}
              </Button>
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
