import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.css";
import { Product as IProduct } from "../../interfaces/products";
import ProductCard from "../ProductCard/ProductCard";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [filters, setFilters] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    console.log("Search page loaded");
    if (keyword) {
      console.log(`Searching for ${keyword}`);
    } else {
      const currentUrl = window.location.href;
      navigate(currentUrl);
    }
  }, [keyword, navigate]);

  const { data, isPending, error } = useFetch(
    `/product/search?keyword=${keyword}`
  );

  useEffect(() => {
    if (data && data !== null) {
      // Extract unique tags from the products
      const allTags: string[] = data
        .map((product: IProduct) =>
          product.tags.split(",").map((tag) => tag.trim())
        )
        .flat();
      setTags(Array.from(new Set(allTags.filter(Boolean))).sort());
    }
  }, [data]);

  const toggleFilter = (tag: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(tag)
        ? prevFilters.filter((filter) => filter !== tag)
        : [...prevFilters, tag]
    );
  };

  const filteredProducts = data
    ? data.filter((product: IProduct) => {
        const productTags = product.tags.split(",");
        return (
          filters.length === 0 ||
          filters.some((tag) => productTags.includes(tag))
        );
      })
    : [];

  return (
    <Container className="my-5">
      <Row>
        <Col md={3} className="border h-75">
          <h2>Filters</h2>
          <p>Filter by category, price, brand, and more...</p>
          <div>
            <h4>Tags</h4>
            <ul>
              {tags &&
                tags.map((tag: string) => (
                  <li key={tag}>
                    <label>
                      <input
                        type="checkbox"
                        value={tag}
                        onChange={() => toggleFilter(tag)}
                        checked={filters.includes(tag)}
                      />
                      &nbsp;{tag}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h4>Results...</h4>
          <p className="muted">
            Check each product page for other buying options. Price and other
            details may vary based on product size and color.
          </p>
          <hr />
          <div className={styles.grid}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: IProduct) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
