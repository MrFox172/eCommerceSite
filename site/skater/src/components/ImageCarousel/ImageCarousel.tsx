import React from "react";
import styles from "./styles.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProductSalesCard from "../ProductSalesCard/ProductSalesCard";

interface Product {
  name: string;
  price: string;
  description?: string;
}

interface CarouselProps {
  products: Product[]; // Array of products corresponding to images
  background?: string; // Background image URL
}

const Carousel: React.FC<CarouselProps> = ({ products, background }) => {
  const carouselStyle = background
    ? { backgroundImage: `url(${background})`, backgroundSize: "cover" }
    : {};

  return (
    <div
      id="carouselExampleAutoplaying"
      className={`carousel slide ${styles.carousel}`}
      data-bs-ride="carousel"
      style={carouselStyle}
    >
      <div className={`carousel-inner ${styles.carouselInner}`}>
        {products.map((product, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} ${
              styles.carouselItem
            }`}
            key={index}
          >

            <div className={styles.fixedCardSize}>
              <ProductSalesCard {...product} />
            </div>
          </div>
        ))}
      </div>
      <button
        className={`carousel-control-prev ${styles.crazyBtn}`}
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span
          className={`carousel-control-prev-icon ${styles.crazyIcon}`}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className={`carousel-control-next ${styles.crazyBtn}`}
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span
          className={`carousel-control-next-icon ${styles.crazyIcon}`}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
