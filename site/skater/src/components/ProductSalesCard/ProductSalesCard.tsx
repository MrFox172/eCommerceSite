import React from "react";
import { Product } from "../../interfaces/products";
import img from "../../assets/img-placeholder.svg";
import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const ProductSalesCard: React.FC<Product> = (product) => {
  const navigate = useNavigate();
  const getSalePercentage = () => {
    return (
      (1 - parseFloat(product.salePrice) / parseFloat(product.price)) *
      100
    ).toFixed(0);
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
                <p>Originally: 
                <strong>
                  <span className="my-3"><del>${product.price}</del></span>
                </strong>
                </p>
                <p>
                  Now: 
                  <strong>
                    <span className="my-3">${product.salePrice}</span>
                  </strong>
                </p>
                
                <Button variant="warning" size="sm">
                  Add to cart
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
