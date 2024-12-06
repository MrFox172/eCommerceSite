import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import shoppingCart from "../../assets/shoppingCart.png";
import shoppingCartFilled from "../../assets/shoppingCartFilled.png";
import Kickflip from "../../assets/Kickflip.webp";
import ShoesBackdrop from "../../assets/ShoesCarouselBackdrop.png";

const SellShoes: React.FC = () => {
  return (
    <>
      <Carousel
        images={[shoppingCart, shoppingCartFilled, Kickflip]}
        background={ShoesBackdrop}
      />
    </>
  );
};

export default SellShoes;
