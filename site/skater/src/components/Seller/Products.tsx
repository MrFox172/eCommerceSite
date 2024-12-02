import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  Button,
  Card,
  ListGroupItem,
  ListGroup,
  Modal,
  Alert,
  Stack,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import SellerProductCard from "./ProductCard";
import { useFetch } from "../../hooks/useFetch";

interface iProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  stockOnHand: number;
  category: {
    id: number;
    name: string;
    createdate: string;
  };
  productImages: [
    {
      id: number;
      name: string;
      imageUrl: string;
      createdate: string;
    }
  ];
  tags: string;
  createdate: string;
}

interface Account {
  id: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  phonenumber: string;
  createdate: string;
  sellerAccount: {
    id: number;
    accountId: number;
    companyName: string;
    createdate: string;
  };
}

interface iCategory {
  id: number;
  name: string;
  createdate: string;
}

const Products = () => {
  const [user, setUser] = useState<Account>({
    id: 0,
    firstname: "",
    lastname: "",
    emailaddress: "",
    phonenumber: "",
    createdate: "",
    sellerAccount: {
      id: 0,
      accountId: 0,
      companyName: "",
      createdate: "",
    },
  });
  const defaultProduct: iProduct = {
    id: 0,
    name: "",
    description: "",
    price: "",
    stockOnHand: 0,
    category: {
      id: 0,
      name: "",
      createdate: "",
    },
    productImages: [
      {
        id: 0,
        name: "",
        imageUrl: "",
        createdate: "",
      },
    ],
    tags: "",
    createdate: "",
  };
  const context: Account = useOutletContext();
  const [product, setProduct] = useState<iProduct>(defaultProduct);
  const [saveMsg, setSaveMsg] = useState<string>("");
  const [sellerProducts, setSellerProducts] = useState<Array<iProduct>>([]);
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  console.log("Context Poducts:", context);

  useEffect(() => {
    setUser(context);
    setUrl(`/product/seller/${context?.sellerAccount.id}`);
  }, [context]);

  const { data, isPending, error } = useFetch(url);

  //const [ cdata, cisPending, cerror ] = useFetch(`/product/categories`);

  useEffect(() => {
    console.log("Data: ", data);
    if (data) {
      //console.log("Data: ", data);
      setSellerProducts(data);
    }
  }, [data]);

  useEffect(() => {
    axios
      .get("https://www.thelowerorbit.com:8080/api/product/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [show, setShow] = useState(false);

  const handleProductModalClose = () => {
    //setShowProductModal(false);
    setShow(false);
    setSaveMsg("");
  };

  const handleProductModalShow = () => {
    //setShowProductModal(true);
    setProduct(defaultProduct);
    setShow(true);
  };

  const handleProductSubmit = (e) => {
    console.log("Product Submitted");
    e.preventDefault();

    console.log("Product Name: ", product);

    axios
      .post("http://localhost:8080/api/product", {
        name: product.name,
        description: product.description,
        price: product.price,
        stockOnHand: product.stockOnHand,
        categoryId: product.category.id,
        tags: product.tags,
        sellerAccountId: user.sellerAccount.id,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts([...sellerProducts, response.data]);
          setProduct(response.data);
        }
        setSaveMsg("Product saved successfully...");
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error saving product...");
      });
  };

  const handleProductInput = (e) => {
    const value: (typeof product)[keyof typeof product] = e.target.value;

    if (e.target.id === "category" && e.target.value !== "Select Category") {
      const category = categories.find((category) => {
        return category.name === e.target.value ? category : null;
      });
      setProduct({ ...product, [e.target.id]: category });
      return;
    }
    setProduct({ ...product, [e.target.id]: value });
  };

  const handleProductUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Product Name: ", product);

    axios.put(`http://localhost:8080/api/product/${product.id}`,{
      name: product.name,
      description: product.description,
      price: product.price,
      stockOnHand: product.stockOnHand,
      categoryId: product.category.id,
      tags: product.tags
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts(sellerProducts.map((product) => {
            return product.id === response.data.id ? response.data : product;
          }));
          setProduct(response.data);
        }
        setSaveMsg("Product updated successfully...");
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error updating product...");
      });
  };

  const handleProductDelete = (e) => {

    const confirmBox = window.confirm("Do you really want to delete this Product?");

    if (confirmBox === false) {
      return;
    }

    axios
      .delete(`http://localhost:8080/api/product/${e.target.id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts(sellerProducts.filter((product) => product.id !== e.target.id));
        }
        setSaveMsg("Product deleted successfully...");
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error deleting product...");
      });

  };

  const handleProductImageUploadSubmit = (e) => {
    e.preventDefault();
    setSaveMsg("");
    setIsLoading(true);
    console.log("Product Name: ", product);

    if (e.target.formFile.files.length === 0) {
      setSaveMsg("No image selected...");
      setIsLoading(false);
      return;
    }

    if (e.target.formFile.files[0].size > 5000000) {
      setSaveMsg("Image size too large...");
      setIsLoading(false);
      return;
    }

    if (
      e.target.formFile.files[0].type !== "image/jpeg" &&
      e.target.formFile.files[0].type !== "image/png" &&
      e.target.formFile.files[0].type !== "image/jpg"
    ) {
      setSaveMsg("Invalid image format..., image must be jpeg, jpg or png");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("file", e.target.formFile.files[0]);
    formData.set("productId", product.id.toString());

    axios
      .post("http://localhost:8080/api/product/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSaveMsg("Image uploaded successfully...");

          setSellerProducts(sellerProducts.map((product) => {

            if (product.id === response.data.id) {
              return { ...product, productImages: response.data.productImages };
            } else {
              return product;
            }
          }));
          e.target.formFile.value = null;
          setProduct(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error uploading image...");
      })
      .finally(() => {
        setIsLoading(false);
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
      <Row>
        <Col>
          <ListGroup className="mt-2 p-0">
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
      <Modal show={show} onHide={handleProductModalClose} size="lg" centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title as="h5">Add / Edit your store Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          {saveMsg && <Alert variant="info">{saveMsg}</Alert>}
          <Form
            onSubmit={
              product.id === null || product.id === 0
                ? handleProductSubmit
                : handleProductUpdateSubmit
            }
          >
            <input type="hidden" id="id" value={product.id} />
            <Row className="my-4">
              <FormGroup>
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  id="name"
                  onChange={handleProductInput}
                  value={product?.name}
                  required
                  size="sm"
                />
              </FormGroup>
            </Row>
            <Row className="my-4">
              <FormGroup>
                <Form.Label>Product Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  id="description"
                  onChange={handleProductInput}
                  value={product?.description}
                  required
                  size="sm"
                />
              </FormGroup>
            </Row>
            <Row className="my-4">
              <FormGroup as={Col} md="4">
                <Form.Label>Sale Price (USD):</Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text id="inputGroupPrepend" size="sm">
                    $
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="99.99"
                    id="price"
                    onChange={handleProductInput}
                    value={product?.price}
                    required
                    size="sm"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup as={Col} md="4">
                <Form.Label>Stock on Hand:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="00000000"
                  id="stockOnHand"
                  onChange={handleProductInput}
                  value={product?.stockOnHand}
                  required
                  size="sm"
                />
              </FormGroup>
            </Row>
            <Row className="my-4">
              <FormGroup as={Col} md="4">
                <Form.Label>Category:</Form.Label>
                <Form.Select
                  aria-label="Select Category"
                  id="category"
                  required
                  onChange={handleProductInput}
                  size="sm"
                >
                  <option>Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.name}
                      selected={
                        product?.category?.name === category.name ? true : false
                      }
                    >
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
              <FormGroup as={Col}>
                <Form.Label>Tags:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tag1, tag2"
                  id="tags"
                  onChange={handleProductInput}
                  value={product?.tags}
                  size="sm"
                />
                <Form.Text id="fileUploadHelp" muted>
                  Enter tags separated by a comma.
                </Form.Text>
              </FormGroup>
            </Row>
            <Row className="my-4">
              <Col xs="4">
                {product.id === null || product.id === 0 ? (
                  <Button
                    variant="success"
                    type="submit"
                    onChange={handleProductInput}
                    size="sm"
                  >
                    Add Product
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    type="submit"
                    onChange={handleProductInput}
                    size="sm"
                  >
                    Update Product Info
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
          {product.id === null || product.id === 0 ? (
            <div></div>
          ) : (
            <Form onSubmit={handleProductImageUploadSubmit}>
              <hr />
              <Row>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload pictures for your product</Form.Label>
                  <Form.Control type="file" size="sm" />
                  <Form.Text id="fileUploadHelp" muted>
                    Upload up to 5 images, each image must be no larger than 5MB. Supported formats are jpeg, jpg, and png.
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  {isLoading ? (
                    <Button variant="primary" size="sm" disabled>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit" size="sm">
                      Upload
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Stack direction="horizontal" gap={3}>
                    {product?.productImages &&
                      product?.productImages.map((image) => (
                        <Card
                          style={{ width: "8rem", height: "8rem" }}
                          key={image.id}
                          className="border-0"
                        >
                          <Card.Img variant="top" src={image.imageUrl} />
                        </Card>
                      ))}
                  </Stack>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleProductModalClose}
            size="sm"
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
