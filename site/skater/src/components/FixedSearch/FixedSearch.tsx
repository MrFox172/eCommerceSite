import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { Product as IProduct } from "../../interfaces/products";
import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";

interface FixedSearchProps {
  searchTerm: string;
}

const FixedSearch: React.FC<FixedSearchProps> = ({ searchTerm }) => {
  const keyword = searchTerm;
  const [filters, setFilters] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const { data, isPending, error } = useFetch(
    `/product/search?keyword=${keyword}`
  );

  useEffect(() => {
    if (keyword) {
      console.log(`Searching for ${keyword}`);
    }
    if (data && data !== null) {
      let tags: string = "";
      for (let i = 0; i < data.length; i++) {
        tags += data[i].tags;
      }
      setTags(Array.from(new Set(tags.split(",").filter(Boolean))));
      console.log(Array.from(new Set(tags.split(",").filter(Boolean))));
    }
  }, [keyword, data]);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={3} className="border h-75">
            <h2>Filters</h2>
            <p>Filter by category, price, brand, and more...</p>
            <div>
              <h4>Tags</h4>
              <ul></ul>
              {tags &&
                tags.map((tag: string) => (
                  <label key={tag}>
                    <input type="checkbox" value={tag} checked />
                    {tag}
                  </label>
                ))}
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
                {data &&
                data
                  .filter((product: IProduct) =>
                  tags.every((tag) => !product.tags.includes(tag))
                  )
                  .map((product: IProduct) => (
                  <ProductCard key={product.id} {...product} />
                  ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FixedSearch;
