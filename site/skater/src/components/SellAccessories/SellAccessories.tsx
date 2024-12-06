import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import shoppingCart from "../../assets/shoppingCart.png";
import shoppingCartFilled from "../../assets/shoppingCartFilled.png";
import Kickflip from "../../assets/Kickflip.webp";
import AccessoriesBackdrop from "../../assets/AccessoriesCarouselBackdrop.png";

const SellAccessories: React.FC = () => {
  return (
    <>
      <Carousel
        images={[shoppingCart, shoppingCartFilled, Kickflip]}
        background={AccessoriesBackdrop}
      />
    </>
  );
};

export default SellAccessories;
