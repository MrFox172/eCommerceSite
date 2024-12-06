import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import shoppingCart from "../../assets/shoppingCart.png";
import shoppingCartFilled from "../../assets/shoppingCartFilled.png";
import Kickflip from "../../assets/Kickflip.webp";
import ApparelBackdrop from "../../assets/ApparelCarouselBackdrop.png";
import FixedSearch from "../FixedSearch/FixedSearch";

const SellApparel: React.FC = () => {
  return (
    <>
      <Carousel
        images={[shoppingCart, shoppingCartFilled, Kickflip]}
        background={ApparelBackdrop}
      />
      <FixedSearch searchTerm="Apperal" />
    </>
  );
};

export default SellApparel;
