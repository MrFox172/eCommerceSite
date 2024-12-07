import React from "react";
import styles from "./styles.module.css";
import { Container } from "react-bootstrap";
import HeroBackground from "../../assets/skateboard_crew_front.png";
import SkateboardBackground from "../../assets/SkateboardCarouselBackdrop.png";
import SkatesBackground from "../../assets/SkatesCarouselBackdrop.png";
import ShoesBackground from "../../assets/ShoesCarouselBackdrop.png";
import ApparelBackground from "../../assets/ApparelCarouselBackdrop.png";
import AccessoriesBackground from "../../assets/AccessoriesCarouselBackdrop.png";
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
        className={`text-white text-center mh-75 ${styles.home}`}
        style={{
          backgroundImage: `url("${HeroBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1>Shop Apparel, Skateboards, and Accessories</h1>
        <p>
          Top brands and the latest styles in clothing, skateboards, and skating
          accessories
        </p>
      </Container>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.clickableBanner}`}
        style={{
          backgroundImage: `url("${SkateboardBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => gotoProducts("skateboards")}
      >
        <h1>Skateboards</h1>
        <p>Explore our wide range of skateboards for all skill levels.</p>
      </Container>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.clickableBanner}`}
        style={{
          backgroundImage: `url("${SkatesBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => gotoProducts("skates")}
      >
        <h1>Skates</h1>
        <p>
          Check out our collection of skates for every style and preference.
        </p>
      </Container>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.clickableBanner}`}
        style={{
          backgroundImage: `url("${ShoesBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => gotoProducts("shoes")}
      >
        <h1>Shoes</h1>
        <p>Find the perfect pair of shoes for skating and everyday wear.</p>
      </Container>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.clickableBanner}`}
        style={{
          backgroundImage: `url("${ApparelBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => gotoProducts("apparel")}
      >
        <h1>Apparel</h1>
        <p>Discover the latest trends in skate apparel and streetwear.</p>
      </Container>
      <Container
        fluid
        className={`text-white text-center mh-75 ${styles.clickableBanner}`}
        style={{
          backgroundImage: `url("${AccessoriesBackground}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => gotoProducts("accessories")}
      >
        <h1>Accessories</h1>
        <p>
          Shop for essential accessories to complete your skating experience.
        </p>
      </Container>
    </>
  );
};

export default Home;
