import React from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../CartProvider/CartProvider";

const ProductSalesCard: React.FC<Product> = (product) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const cart = useCart();

  const getSalePercentage = () => {
    return ((1 - product.salePrice / product.price) * 100).toFixed(0);
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
                  <Card.Img
                    variant="top"
                    className={styles.image_holder}
                    src={img}
                  />
                </>
              )}
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
                      <del>${product.price.toFixed(2)}</del>
                    </span>
                  </strong>
                </p>
                <p>
                  {product.salePrice > 0 ? (
                    <>
                      Now:
                      <strong>
                        <span className="my-3">
                          ${product.salePrice.toFixed(2)}
                        </span>
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

                <Button
                  variant="warning"
                  size="sm"
                  className={styles.primaryButton}
                  onClick={() => cart.addProduct(product, 1)}
                >
                  Add to Cart
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
