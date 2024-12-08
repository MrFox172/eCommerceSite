import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Product, ProductImage } from "../../interfaces/products";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import defaultImage from "../../assets/img-placeholder.svg";
import { useCart } from "../../contexts/CartContext";
import { Card, Button } from "react-bootstrap";

function ProductPage() {
  const [currentImage, setCurrentImage] = useState<ProductImage>({
    id: -1,
    name: "No Image Available",
    imageUrl: defaultImage,
    createdate: "",
  });
  const [allImages, setAllImages] = useState<ProductImage[]>([currentImage]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const { id } = useParams();
  const { data, isPending, error } = useFetch(`/product/${id}`);
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      console.log("Value changed to 0");
      setCount(0);
    } else {
      console.log("Value changed to " + e.target.value);
      setCount(parseInt(e.target.value));
    }
  };

  const changeCurrentImage = (index: number) => {
    setCurrentImage(allImages[index]);
  };

  //Use effect is split here to avoid unnecessary re-renders
  useEffect(() => {
    if (data && data !== null) {
      console.log(data);
      setProduct(data);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      //first time the product is loaded in, we set the images
      if (product.productImages.length > 0) {
        setAllImages(product.productImages);
        setCurrentImage(product.productImages[0]);
      }
      console.log(product);
    }
  }, [product]);

  const getSimilarProducts = () => {};
  return (
    <>
      <main className={styles.outer}>
        <div className={styles.main}>
          <div className={styles.imagesContainer}>
            <aside className={styles.allAsideImages}>
              {allImages.map((image: ProductImage, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={image.name}
                  onClick={() => changeCurrentImage(index)}
                />
              ))}
            </aside>
            <div className={styles.productImage}>
              <img src={currentImage.imageUrl} alt="Product" />
              Image:{currentImage.name}
            </div>
          </div>
          <div className={styles.productDetails}>
            {product ? (
              <>
                <h2>{product.name}</h2>
                <h3>{product.brand}</h3>
                <p>Description</p>
                <p>{product.description}</p>
                <p>Tags: {product.tags}</p>
                {product.onSale ? (
                  <>
                    <h2>
                      <del>${product.price.toFixed(2)}</del>
                    </h2>
                    <h2>
                      <em>On Sale!</em> ${product.salePrice.toFixed(2)}
                    </h2>
                  </>
                ) : (
                  <>
                    <h2>${product.price.toFixed(2)}</h2>
                  </>
                )}
              </>
            ) : (
              <>
                <h2>Loading...</h2>
              </>
            )}
          </div>
          <div className={styles.cart}>
            <h2>Cart</h2>
            <Button onClick={decrement}>-</Button>
            <input
              className={styles.input}
              type="text"
              value={count}
              onChange={changeCount}
            />
            <Button onClick={increment}>+</Button>
          </div>
        </div>
        {/*end of div "main"*/}
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
      </main>
    </>
  );
}

export default ProductPage;
