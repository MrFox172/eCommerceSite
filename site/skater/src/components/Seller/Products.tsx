import {
  Col,
  Row,
  Button,
  ListGroup
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import SellerProductCard from "./ProductCard";
import { useFetch } from "../../hooks/useFetch";
import { Account as IAccount, SellerAccount } from "../../interfaces/user";
import { Product as IProduct} from "../../interfaces/products";
import ProductPagination from "./ProductPagination";
import AddEditProductModal from "./AddEditProductModal";

const Products = () => {

  const context: IAccount = useOutletContext();
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [sellerProducts, setSellerProducts] = useState<Array<IProduct>>([]);
  const [sellerAccount, setSellerAccount] = useState<SellerAccount>({} as SellerAccount);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [pageable, setPageable] = useState({
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [page, setPage] = useState<number>(0);

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

  const { data } = useFetch(`/seller/account/${context?.id}`);

  useEffect(() => {
    if(data) {
      setSellerAccount(data);
    }
  }, [data, context]);

  useEffect(() => {
    setIsPending(true);
    if (sellerAccount && sellerAccount.id) {
      axios
        .get(`https://www.thelowerorbit.com:8080/api/product/seller/${sellerAccount?.id}/page?page=${page}`)
        .then((response) => {
          setSellerProducts(response.data.content);
          setPageable({
            pageNumber: response.data.pageable.pageNumber,
            pageSize: response.data.pageable.pageSize,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsPending(false);
        });;
    }
  }, [data, sellerAccount, page]);

  const [show, setShow] = useState(false);

  const handleProductModalShow = () => {
    setShow(true);
  };

  const handleProductDelete = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;

    const confirmBox = window.confirm("Do you really want to delete this Product?");

    if (confirmBox === false) {
      return;
    }

    axios
      .delete(`https://www.thelowerorbit.com:8080/api/product/${target.id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts(sellerProducts.filter((product) => product.id !== Number(target.id)));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <Button variant="success" onClick={handleProductModalShow} size="sm">
            Add Product
          </Button>
        </Col>
      </Row>
      <hr />
      <ProductPagination page={page} setPage={setPage} pageable={pageable} />
      <Row>
        <Col>
          {isPending && (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          )}
          <ListGroup className="p-0">
            {sellerProducts &&
              sellerProducts.map((product) => (
                <ListGroup.Item key={product.id} className="border-0 p-0 my-3">
                  <SellerProductCard
                    sellerProduct={product}
                    setShow={setShow}
                    setProduct={setProduct}
                    handleProductDelete={handleProductDelete}
                  />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
      <ProductPagination page={page} setPage={setPage} pageable={pageable} />
      <h5>Total Products: {pageable.totalElements}</h5>
      <AddEditProductModal 
        show={show} 
        setShow={setShow} 
        product={product} 
        setProduct={setProduct} 
        sellerAccount={sellerAccount}
        sellerProducts={sellerProducts}
        setSellerProducts={setSellerProducts}
        />
    </>
  );
};

export default Products;
