import React from "react";
import styles from "./styles.module.css";
import { Container } from "react-bootstrap";
import Background from "../../assets/skateboard_crew_front.png";

const Home: React.FC = () => {
  return (
    <>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.home}`}
        style={{
          backgroundImage: `url("${Background}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1>Shop Apparel, Skateboards, and Accessories</h1>
        <p>
          Top brands and the latest styles in clothing, skateboards, and skating accessories
        </p>
      </Container>
    </>
  );
};

export default Home;
