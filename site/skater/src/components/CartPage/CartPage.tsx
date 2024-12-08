import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import { Button } from "react-bootstrap";
import { Product, Category, ProductImage } from "../../interfaces/products";
import { CartItem } from "../../interfaces/cartManager";
import defaultImage from "../../assets/img-placeholder.svg";
import { useNavigate, useNavigationType } from "react-router-dom";

const CartPage: React.FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const cartItems = cart.cart;

  const getSalePercentage = (product: Product) => {
    return ((1 - product.salePrice / product.price) * 100).toFixed(0);
  };

  return (
    <div className="container mt-5">
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item: CartItem) => (
            <div className="row mb-3" key={item.product.id}>
              <div className="col-md-4">
                {item.product.productImages &&
                item.product.productImages.length > 0 ? (
                  <>
                    <img
                      src={item.product.productImages[0].imageUrl}
                      alt={item.product.name}
                      className="img-fluid"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={defaultImage}
                      alt={item.product.name}
                      className="img-fluid"
                    />
                  </>
                )}
              </div>
              <div className="col-md-8">
                <h5>{item.product.name}</h5>
                <p>{item.product.description}</p>
                <p>Quantity: {item.quantity}</p>
                {item.product.onSale ? (
                  <>
                    <p>
                      Price: ${item.product.salePrice.toFixed(2)} -{" "}
                      <em>{getSalePercentage(item.product)}% off!</em>
                    </p>
                  </>
                ) : (
                  <>
                    <p>Price: ${item.product.price.toFixed(2)}</p>
                  </>
                )}
                <Button variant="primary" onClick={()=>cart.updateProductQuantity(item.product,item.quantity+1)}>Add</Button>
                <Button variant="secondary" onClick={()=>cart.updateProductQuantity(item.product,item.quantity-1)}>Remove</Button>
                <Button variant="danger" onClick={()=>cart.removeProduct(item.product)}>Remove All</Button>
              </div>
            </div>
          ))}
            <h3>Sub Total: ${cart.getTotalPrice().toFixed(2)}</h3>
          <Button variant="danger" onClick={cart.clearCart}>Clear Cart</Button>
          <Button variant="success" onClick={()=>navigate("/")}>Checkout</Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
