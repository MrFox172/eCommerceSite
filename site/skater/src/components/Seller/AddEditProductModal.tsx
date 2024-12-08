import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  Button,
  Card,
  Modal,
  Alert,
  Stack,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Product as IProduct,
  Category as ICategory,
  ProductImage,
} from "../../interfaces/products";

const AddEditProductModal = ({
  show,
  setShow,
  product,
  setProduct,
  sellerAccount,
  sellerProducts,
  setSellerProducts,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveMsg, setSaveMsg] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    axios
      .get("https://www.thelowerorbit.com:8080/api/product/categories/list")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleProductModalClose = () => {
    setShow(false);
    setSaveMsg("");
    setProduct({} as IProduct);
  };

  const handleProductSubmit = (e: React.SyntheticEvent) => {
    console.log("Product Submitted");
    e.preventDefault();

    console.log("Product Name: ", product);
    console.log("Seller Account: ", sellerAccount);

    axios
      .post("https://www.thelowerorbit.com:8080/api/product", {
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        salePercent: product.salePercent,
        stockOnHand: product.stockOnHand,
        categoryId: product.category.id,
        tags: product.tags,
        sellerAccountId: sellerAccount.id,
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

  const handleOnChangeSelect = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;

    const category = categories.find((category) => {
      return category.name === target.value ? category : null;
    });

    setProduct({ ...product, [target.id]: category });
    return;
  };

  const handleOnChangeInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    const value: (typeof product)[keyof typeof product] = target.value;

    if (target.id === "salePercent") {

      const salePrice = product.price - (product.price * (value / 100));  
      setProduct({
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        salePrice: Number(salePrice).toFixed(2),
        salePercent: value,
        stockOnHand: product.stockOnHand,
        category: product.category,
        tags: product.tags,
        productImages: product.productImages,
      })
      return; 
    }

    setProduct({ ...product, [target.id]: value });
  };

  const handleProductUpdateSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Product Name: ", product);

    axios
      .put(`https://www.thelowerorbit.com:8080/api/product/${product.id}`, {
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        salePercent: product.salePercent,
        stockOnHand: product.stockOnHand,
        categoryId: product.category.id,
        tags: product.tags,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts(
            sellerProducts.map((p: IProduct) => {
              return p.id === response.data.id ? response.data : p;
            })
          );
          setProduct(response.data);
        }
        setSaveMsg("Product updated successfully...");
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error updating product...");
      });
  };

  const handleProductImageUploadSubmit = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLFormElement;
    e.preventDefault();
    setSaveMsg("");
    setIsLoading(true);
    console.log("Product Name: ", product);

    if (target.formFile.files.length === 0) {
      setSaveMsg("No image selected...");
      setIsLoading(false);
      return;
    }

    if (target.formFile.files[0].size > 5000000) {
      setSaveMsg("Image size too large...");
      setIsLoading(false);
      return;
    }

    if (
      target.formFile.files[0].type !== "image/jpeg" &&
      target.formFile.files[0].type !== "image/png" &&
      target.formFile.files[0].type !== "image/jpg" &&
      target.formFile.files[0].type !== "image/webp"
    ) {
      setSaveMsg("Invalid image format..., image must be jpeg, jpg or png");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("file", target.formFile.files[0]);
    formData.set("productId", product.id.toString());

    axios
      .post("https://www.thelowerorbit.com:8080/api/product/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSaveMsg("Image uploaded successfully...");

          setSellerProducts(
            sellerProducts.map((p: IProduct) => {
              if (p.id === response.data.id) {
                return {
                  ...p,
                  productImages: response.data.productImages,
                };
              } else {
                return p;
              }
            })
          );
          target.formFile.value = null;
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

  const handleImageOnClickButton = (e) => {
    console.log("Image ID: ", e.target.id);

    const confirmBox = window.confirm(
      "Do you really want to delete this Image?"
    );

    if (confirmBox === false) {
      return;
    }

    axios
      .delete(
        `https://www.thelowerorbit.com:8080/api/product/images/${e.target.id}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setSellerProducts(
            sellerProducts.map((p: IProduct) => {
              if (p.id === response.data.id) {
                return {
                  ...p,
                  productImages: response.data.productImages,
                };
              } else {
                return p;
              }
            })
          );
          setProduct(response.data);
        }
        setSaveMsg("Image deleted successfully...");
      })
      .catch((error) => {
        console.log(error);
        setSaveMsg("Error deleting image...");
      });
  };

  return (
    <Modal show={show} onHide={handleProductModalClose} size="lg" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title as="h5">Add / Edit your store Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        {saveMsg && <Alert variant="info">{saveMsg}</Alert>}
        <Form
          onSubmit={
            product?.id === undefined || product?.id === null || product?.id === 0
              ? handleProductSubmit
              : handleProductUpdateSubmit
          }
        >
          <input type="hidden" id="id" value={product.id} />
          <Row className="my-4">
            <FormGroup>
              <Form.Label>Product Brand:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                id="brand"
                onChange={handleOnChangeInput}
                value={product?.brand || ""}
                required
                size="sm"
              />
            </FormGroup>
          </Row>
          <Row className="my-4">
            <FormGroup>
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                id="name"
                onChange={handleOnChangeInput}
                value={product?.name || ""}
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
                onChange={handleOnChangeInput}
                value={product?.description || ""}
                required
                size="sm"
              />
            </FormGroup>
          </Row>
          <Row className="my-4">
            <FormGroup as={Col} md="3">
              <Form.Label>Base Price (USD):</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="99.99"
                  id="price"
                  onChange={handleOnChangeInput}
                  value={product?.price || ""}
                  required
                  size="sm"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col} md="3">
              <Form.Label>Sale %</Form.Label>
              <InputGroup size="sm">
                <Form.Control
                  type="text"
                  id="salePercent"
                  onChange={handleOnChangeInput}
                  value={product?.salePercent || ""}
                  required
                  size="sm"
                />
                <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col} md="3">
              <Form.Label>Sale Price (USD)</Form.Label>
              <InputGroup size="sm">
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                <Form.Control
                  type="text"
                  id="salePrice"
                  onChange={handleOnChangeInput}
                  value={Number(product?.salePrice).toFixed(2) || ""}
                  required
                  disabled
                  size="sm"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup as={Col} md="3">
              <Form.Label>Stock on Hand:</Form.Label>
              <Form.Control
                type="text"
                id="stockOnHand"
                onChange={handleOnChangeInput}
                value={product?.stockOnHand || ""}
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
                onChange={handleOnChangeSelect}
                size="sm"
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.name || "Select Category"}
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
                onChange={handleOnChangeInput}
                value={product?.tags || ""}
                size="sm"
              />
              <Form.Text id="fileUploadHelp" muted>
                Enter tags separated by a comma.
              </Form.Text>
            </FormGroup>
          </Row>
          <hr />
          <Row className="my-4">
            <Col xs="4">
              {product?.id === undefined || product.id === null || product.id === 0 ? (
                <Button variant="success" type="submit" size="sm">
                  Add Product
                </Button>
              ) : (
                <Button variant="success" type="submit" size="sm">
                  Update Product Info
                </Button>
              )}
            </Col>
          </Row>
        </Form>
        {product?.id === undefined || product.id === null || product.id === 0 ? (
          <div></div>
        ) : (
          <Form onSubmit={handleProductImageUploadSubmit}>
            <hr />
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload pictures for your product</Form.Label>
                <Form.Control type="file" size="sm" />
                <Form.Text id="fileUploadHelp" muted>
                  Upload up to 5 images, each image must be no larger than 5MB.
                  Supported formats are jpeg, jpg, and png.
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
                    product?.productImages.map((image: ProductImage) => (
                      <Card
                        style={{ width: "8rem", height: "8rem" }}
                        key={image.id}
                        className="border-0"
                      >
                        <Card.Img variant="top" src={image.imageUrl} />
                        <Card.Footer className="text-center">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            id={image.id.toString()}
                            onClick={handleImageOnClickButton}
                          >
                            x
                          </Button>
                        </Card.Footer>
                      </Card>
                    ))}
                </Stack>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleProductModalClose} size="sm">
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditProductModal;
