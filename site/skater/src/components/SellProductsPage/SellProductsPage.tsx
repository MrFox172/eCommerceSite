import React from "react";
import Carousel from "../ImageCarousel/ImageCarousel";
import FixedSearch from "../FixedSearch/FixedSearch";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/products";
import { useFetch } from "../../hooks/useFetch";

interface SellProductsPageProps {
  searchTerm: string;
  background: string;
}

const SellApparel: React.FC<SellProductsPageProps> = ({
  searchTerm,
  background,
}) => {
  const [productSales, setProductSales] = useState<Product[]>([]);
  const { data, isPending, error } = useFetch(
    `/product/category/name/${searchTerm}/sale`
  );

  useEffect(() => {
    if (data != null) {
      console.log("Sales: ", data);
      setProductSales(data);
    }
  }, [data]);

  return (
    <>
      <Carousel products={productSales} background={background} />
      <FixedSearch searchTerm={searchTerm} />
    </>
  );
};

export default SellApparel;
