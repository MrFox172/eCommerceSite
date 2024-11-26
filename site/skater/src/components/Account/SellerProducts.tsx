import { Col, Row, Form, InputGroup, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import SellerProductCard from "./SellerProductCard";

interface ProductsProps {
  sellerAccount: {
    id: number;
    accountId: number;
    companyName: string;
    createdate: string;
  };
}

const Products = (props: ProductsProps) => {

  const [sellerProducts, setSellerProducts] = useState([
    {
      id: null,
      sellerAccount: {
        id: null,
        accountId: null,
        companyName: null,
        createdate: null,
      },
      name: null,
      description: null,
      price: null,
      maxQuantity: null,
      category: {
        id: null,
        name: null,
        createdate: null,
      },
      tags: null,
      createdate: null,
    },
  ]);

  useEffect(() => {
    axios.get(`https://www.thelowerorbit.com:8080/api/product/seller/${props.sellerAccount.id}`)
      .then((response) => {
        setSellerProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const listProducts = (product) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      maxQuantity: product.maxQuantity,
      category: product.category,
      tags: product.tags,
      createdate: product.createdate
    };
    return (<SellerProductCard sellerProduct={newProduct}/>);
  }

  return (
    <>
      <Button variant="success">Add Product</Button>
      <br /><br />
      {sellerProducts.map((product) => ( listProducts(product) ))}
    </>
  );
};

export default Products;
