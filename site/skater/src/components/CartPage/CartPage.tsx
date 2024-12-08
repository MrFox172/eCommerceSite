import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import { Button } from "react-bootstrap";
import { Product, Category, ProductImage } from "../../interfaces/products";
import { CartItem } from "../../interfaces/cartManager";
import defaultImage from "../../assets/img-placeholder.svg";
import { useNavigate, useNavigationType } from "react-router-dom";
import styles from "./styles.module.css";

const CartPage: React.FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const cartItems = cart.cart;

  const getSalePercentage = (product: Product) => {
    return ((1 - product.salePrice / product.price) * 100).toFixed(0);
  };

  return (
    <div className={`mt-5 ${styles.container}`}>
    {cartItems.length === 0 ? (
      <p className={styles.emptyMessage}>Your cart is empty</p>
    ) : (
      <>
        {cartItems.map((item: CartItem) => (
          <div className={`row mb-3 ${styles.row}`} key={item.product.id}>
            <div className="col-md-4">
              <img
                src={
                  item.product.productImages &&
                  item.product.productImages.length > 0
                    ? item.product.productImages[0].imageUrl
                    : defaultImage
                }
                alt={item.product.name}
                className={`img-fluid ${styles.imgFluid}`}
              />
            </div>
            <div className="col-md-8">
              <h5>{item.product.name}</h5>
              <p>{item.product.description}</p>
              <p>Quantity: {item.quantity}</p>
              {item.product.onSale ? (
                <p>
                  Price: ${item.product.salePrice.toFixed(2)} -{" "}
                  <em>{getSalePercentage(item.product)}% off!</em>
                </p>
              ) : (
                <p>Price: ${item.product.price.toFixed(2)}</p>
              )}
              <Button
                variant="primary"
                onClick={() =>
                  cart.updateProductQuantity(item.product, item.quantity + 1)
                }
              >
                Add
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  cart.updateProductQuantity(item.product, item.quantity - 1)
                }
              >
                Remove
              </Button>
              <Button
                variant="danger"
                onClick={() => cart.removeProduct(item.product)}
              >
                Remove All
              </Button>
            </div>
          </div>
        ))}
        <h3 className={styles.subTotal}>
          Sub Total: ${cart.getTotalPrice().toFixed(2)}
        </h3>
        <Button variant="danger" onClick={cart.clearCart}>
          Clear Cart
        </Button>
        <Button variant="success" onClick={() => navigate("/checkout")}>
          Checkout
        </Button>
      </>
    )}
  </div>
  
  );
};

export default CartPage;
