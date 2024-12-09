import React, { useEffect } from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartProvider/CartProvider";

const ProductCard: React.FC<Product> = (product) => {
  const cart = useCart();

  const navigate = useNavigate();

  return (
    <>
      <Card className="p-2" key={product.id}>
        {product.productImages && product.productImages.length > 0 ? (
          <>
            <Card.Img
              variant="top"
              className={styles.image_holder}
              src={product.productImages[0].imageUrl}
            />
          </>
        ) : (
          <>
            <Card.Img variant="top" className={styles.image_holder} src={img} />
          </>
        )}
        <hr />
        <Card.Body className="p-2">
          <div>
            <strong>{product.brand}</strong>
            <br />
            {product.name}
            <br />
            <br />
            {product.description}
            <br />
            <p>
              <strong>Tags: </strong>
              {product.tags.split(",").join(", ")}
            </p>
            <strong>
              {product.onSale ? (
                <>
                  <h4 className="my-3">
                    <del>${product.price.toFixed(2)}</del>
                  </h4>
                  <h4 className="my-3 text-danger">
                    <em>On Sale!</em> ${product.salePrice.toFixed(2)}
                  </h4>
                </>
              ) : (
                <>
                  <h4 className="my-3">${product.price.toFixed(2)}</h4>
                </>
              )}
            </strong>
            <div className={styles.buttonSplit}>
              <Button
                variant="warning"
                size="sm"
                className={styles.primaryButton}
                onClick={() => cart.addProduct(product, 1)}
              >
                Add to cart
              </Button>

              <Button
                variant="outline-secondary"
                size="sm"
                className={styles.secondButton}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Product
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
