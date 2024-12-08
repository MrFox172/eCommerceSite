import React from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductSalesCard: React.FC<Product> = (product) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const getSalePercentage = () => {
    return ((1 - product.salePrice / product.price) * 100).toFixed(0);
  };

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

  return (
    <>
      <Card className="p-2" key={product.id}>
        <Card.Header>
          <strong>SALE: {getSalePercentage()}% Off!</strong>
        </Card.Header>
        <Card.Body className="p-2">
          <Row>
            <Col className="border p-0" md={4}>
              <img className={styles.image_holder} src={img} />
            </Col>
            <Col className="border">
              <div>
                <h3>
                  {product.brand} - {product.name}
                </h3>
                <p>{product.description}</p>
                <p>
                  <strong>Tags: </strong>
                  {product.tags.split(",").join(", ")}
                </p>
                <p>
                  Originally:
                  <strong>
                    <span className="my-3">
                      <del>${product.price}</del>
                    </span>
                  </strong>
                </p>
                <p>
                  {product.salePrice > 0 ? (
                    <>
                      Now:
                      <strong>
                        <span className="my-3">${product.salePrice}</span>
                      </strong>
                    </>
                  ) : (
                    <>
                      Now:{" "}
                      <strong>
                        <span className="my-3">Free for a Limited Time!</span>
                      </strong>
                    </>
                  )}
                </p>

                <Button variant="warning" size="sm">
                  Add to cart
                </Button>
                <br />
                <Button onClick={decrement} className={styles.countButton}>
                  -
                </Button>
                <input
                  className={styles.input}
                  type="text"
                  value={count}
                  onChange={changeCount}
                />
                <Button onClick={increment} className={styles.countButton}>
                  +
                </Button>
                <br />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Product
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductSalesCard;
