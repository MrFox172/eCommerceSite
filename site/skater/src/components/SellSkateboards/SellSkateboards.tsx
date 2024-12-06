import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import shoppingCart from "../../assets/shoppingCart.png";
import shoppingCartFilled from "../../assets/shoppingCartFilled.png";
import Kickflip from "../../assets/Kickflip.webp";

const SellSkateboards: React.FC = () => {
  return (
    <>
      <Carousel images={[shoppingCart, shoppingCartFilled, Kickflip]} />
    </>
  );
};

export default SellSkateboards;
