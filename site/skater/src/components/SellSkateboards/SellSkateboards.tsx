import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import shoppingCart from "../../assets/shoppingCart.png";
import shoppingCartFilled from "../../assets/shoppingCartFilled.png";
import Kickflip from "../../assets/Kickflip.webp";
import FixedSearch from "../FixedSearch/FixedSearch";

const SellSkateboards: React.FC = () => {
  return (
    <>
      <Carousel images={[shoppingCart, shoppingCartFilled, Kickflip]} />
      <FixedSearch searchTerm="Skateboard" />
    </>
  );
};

export default SellSkateboards;
