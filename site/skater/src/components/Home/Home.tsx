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
        <h1>Welcome to the Home Page</h1>
        <p>
          This is a simple React application that uses React Router to navigate
          between pages. The application is created using create-react-app and
          uses TypeScript for type checking.
        </p>
      </Container>
    </>
  );
};

export default Home;
