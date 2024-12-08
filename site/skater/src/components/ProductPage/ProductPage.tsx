import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Product } from "../../interfaces/products";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import defaultImage from "../../assets/img-placeholder.svg";

function ProductPage() {
  const [currentImage, setCurrentImage] = useState<string>(defaultImage);
  const [allImages, setAllImages] = useState<string[]>([defaultImage]);
  const { id } = useParams();
  const { data, isPending, error } = useFetch(`/product/${id}`);
  const [product, setProduct] = useState<Product | null>(null);

  const changeCurrentImage = (event: React.MouseEvent<HTMLImageElement>) => {
    setCurrentImage(event.currentTarget.src);
  };

  //Use effect is split here to avoid unnecessary re-renders
  useEffect(() => {
    if (data && data !== null) {
      setProduct(data);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      //truthy once data is set
      console.log(product);
    }
  }, [product]);

  const getSimilarProducts = () => {};
  return (
    <>
      <main className={styles.main}>
        <aside className={styles.allImages}>
          {allImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Product"
              onClick={changeCurrentImage}
            />
          ))}
        </aside>
        <div className={styles.productPage}>
          <div className={styles.productImage}>
            <img src={currentImage} alt="Product" />
          </div>
          <div className={styles.productDetails}>
            <h2>Product Name</h2>
            <p>Product Description</p>
            <p>Price: $0.00</p>
            <button>Add to Cart</button>
          </div>
        </div>
        <div className={styles.cart}>
          <h2>Cart</h2>
          <p>Product Name</p>
          <p>Price: $0.00</p>
          <p>Quantity: 1</p>
          <button>Remove</button>
        </div>
      </main>
      <div className={styles.similarProducts}>
        <h2>Similar Products</h2>
        <div className={styles.similarProductsList}>
          <div className={styles.similarProduct}>
            <img src="https://via.placeholder.com/150" alt="Product" />
            <h3>Product Name</h3>
            <p>Price: $0.00</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
