import React, { useEffect } from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductCard: React.FC<Product> = (product) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      console.log("Value changed to 0");
      setCount(0);
    } else {
      console.log("Value changed to " + e.target.value);
      setCount(parseInt(e.target.value));
    }
  };

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
            <p>
              <strong>Tags: </strong>
              {product.tags.split(",").join(", ")}
            </p>
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
              <Button onClick={decrement}>-</Button>
              <input
                className={styles.input}
                type="text"
                value={count}
                onChange={changeCount}
              />
              <Button onClick={increment}>+</Button>
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
