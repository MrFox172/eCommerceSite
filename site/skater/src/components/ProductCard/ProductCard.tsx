import React from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<Product> = (product) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="p-2" key={product.id}>
        <Card.Img variant="top" className={styles.image_holder} src={img} />
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
            <strong>
              <h2 className="my-3">${product.price}</h2>
            </strong>
            <div className={styles.buttonSplit}>
              <Button
                variant="warning"
                size="sm"
                className={styles.primaryButton}
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
