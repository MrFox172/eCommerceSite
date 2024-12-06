import React from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.css";

const ProductCard: React.FC<Product> = (product) => {
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
            <Button variant="warning" size="sm">
              Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
