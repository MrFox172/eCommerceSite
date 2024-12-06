import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import FixedSearch from "../FixedSearch/FixedSearch";

interface SellProductsPageProps {
    searchTerm: string;
    background: string;
}

const SellApparel: React.FC<SellProductsPageProps> = ({searchTerm, background}) => {
  return (
    <>
      <Carousel
        images={[]}
        background={background}
      />
      <FixedSearch searchTerm={searchTerm} />
    </>
  );
};

export default SellApparel;
