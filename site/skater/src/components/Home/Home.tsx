import React from "react";
import styles from "./styles.module.css";
import { Container, Row, Col } from "react-bootstrap";
import HeroBackground from "../../assets/herolands.jpg";
import SkateboardBackground from "../../assets/skateboardback.jpg";
import SkatesBackground from "../../assets/skates.jpg";
import ShoesBackground from "../../assets/skateshoes.jpg";
import ApparelBackground from "../../assets/apparel.jpg";
import AccessoriesBackground from "../../assets/accessories.jpg";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const gotoProducts = (urlStub: string) => {
    navigate(`/${urlStub}`);
  };

  return (
    <>
      <Container
        fluid
        className={`${styles.heroSection}`}
        style={{ backgroundImage: `url("${HeroBackground}")` }}
      >
        <Row className="justify-content-center align-items-center text-center">
          <Col lg={8}>
            <h1 className={styles.heroTitle}>Unleash Your Skating Potential</h1>
            <p className={styles.heroSubtitle}>
              The ultimate collection of apparel, skateboards, and accessories
            </p>
          </Col>
        </Row>
      </Container>

      <div className={styles.productGrid}>
        <div
          className={styles.productBanner}
          style={{ backgroundImage: `url("${SkateboardBackground}")` }}
          onClick={() => gotoProducts("skateboards")}
        >
          <h2>Skateboards</h2>
          <p>Explore our wide range of skateboards for all skill levels.</p>
        </div>

        <div
          className={styles.productBanner}
          style={{ backgroundImage: `url("${SkatesBackground}")` }}
          onClick={() => gotoProducts("skates")}
        >
          <h2>Skates</h2>
          <p>Check out our collection of skates for every style.</p>
        </div>

        <div
          className={styles.productBanner}
          style={{ backgroundImage: `url("${ShoesBackground}")` }}
          onClick={() => gotoProducts("shoes")}
        >
          <h2>Shoes</h2>
          <p>Find the perfect pair of shoes for skating and beyond.</p>
        </div>

        <div
          className={styles.productBanner}
          style={{ backgroundImage: `url("${ApparelBackground}")` }}
          onClick={() => gotoProducts("apparel")}
        >
          <h2>Apparel</h2>
          <p>Discover the latest trends in skate apparel.</p>
        </div>

        <div
          className={styles.productBanner}
          style={{ backgroundImage: `url("${AccessoriesBackground}")` }}
          onClick={() => gotoProducts("accessories")}
        >
          <h2>Accessories</h2>
          <p>Shop essential accessories for your skating experience.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
