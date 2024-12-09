import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface AdminMetrics {
  accountCount: number;
  productCount: number;
  orderCount: number;
  sellerCount: number;
}

interface AdminRevenue {
  soldCount: number;
  totalRevenue: number;
  revenue: number;
}

const Admin = () => {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [revenue, setRevenue] = useState<AdminRevenue | null>(null);

  useEffect(() => {
    axios
      .get("https://www.thelowerorbit.com:8080/api/admin/metrics")
      .then((response) => {
        console.log(response.data);
        setMetrics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://www.thelowerorbit.com:8080/api/admin/revenue")
      .then((response) => {
        console.log(response.data);
        setRevenue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cardClasses = `${styles.card} text-bg-dark rounded-0 shadow`;
  const headerClasses = `h1`;
  const bodyClasses = `fw-bold text-warning ${styles.cardbody}`;

  return (
    <Container className="text-center p-3">
      <Row className="mt-5">
        <Col>
          <h1 className="fw-bold">Admin Center</h1>
        </Col>
      </Row>
      <hr />
      <Row className="my-5">
        <Col md={12} className="justify-content-center">
          <div className={styles.grid}>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Total Accounts</Card.Header>
              <Card.Body className={bodyClasses}>
                {metrics?.accountCount && <div>{metrics?.accountCount}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Total Sellers</Card.Header>
              <Card.Body className={bodyClasses}>
                {metrics?.sellerCount && <div>{metrics?.sellerCount}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Total Products</Card.Header>
              <Card.Body className={bodyClasses}>
                {metrics?.productCount && <div>{metrics?.productCount}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Total Orders</Card.Header>
              <Card.Body className={bodyClasses}>
                {metrics?.orderCount && <div>{metrics?.orderCount}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Total Sold</Card.Header>
              <Card.Body className={bodyClasses}>
                {revenue?.soldCount && <div>{revenue?.soldCount}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Site Total Sales</Card.Header>
              <Card.Body className={bodyClasses}>
                {revenue?.totalRevenue && <div>${revenue?.totalRevenue.toFixed(2)}</div>}
              </Card.Body>
            </Card>
            <Card className={cardClasses}>
              <Card.Header className={headerClasses}>Site Commission 15%</Card.Header>
              <Card.Body className={bodyClasses}>
                {revenue?.revenue && <div>${revenue?.revenue.toFixed(2)}</div>}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
