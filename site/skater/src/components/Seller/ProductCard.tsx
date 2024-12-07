import { Col, Row, Button, Card, Stack, Badge } from "react-bootstrap";
import { Product as IProduct } from "../../interfaces/products";
import styles from "./styles.module.css";

const SellerProductCard = ({
  sellerProduct,
  setShow,
  setProduct,
  handleProductDelete
}) => {
  const handleEdit = () => {
    setShow(true);
    setProduct(sellerProduct);
  };

  return (
    <div>
      <Card bg={"light"} className="border-success rounded-0">
        <Card.Header as="h5" className="bg-transparent border-success">
          {sellerProduct.name}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>
                <strong>Description:</strong> {sellerProduct.description}
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Card.Text className="my-1">
                <strong>SKU:</strong> {sellerProduct.id}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Price:</strong> ${sellerProduct.price}
              </Card.Text>
              {sellerProduct.salePrice && (
              <Card.Text className="my-1">
                <strong>Sale Price:</strong> ${sellerProduct.salePrice}
              </Card.Text>
              )}
              <Card.Text className="my-1">
                <strong>Stock on Hand:</strong>{" "}
                {sellerProduct.stockOnHand}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Category:</strong> {sellerProduct.category.name}
              </Card.Text>
            </Col>
            <Col md={3}>
              <strong>Tags:</strong>
              <ul>
                {sellerProduct.tags.split(",").map((tag: string) => (
                  <li key={tag}>
                    <Badge pill bg="warning text-black">
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Col>
            <Col>
              <div className={styles.grid}>
                {sellerProduct.productImages &&
                  sellerProduct.productImages.map((image) => (
                    <img
                      style={{ width: "6rem", height: "6rem" }}
                      key={image.id}
                      src={image.imageUrl}
                      alt={image.name}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="justify-content-end text-end">
          <Row>
            <Col className="justify-content-start text-start">
              <Card.Text>
                <strong>Created:</strong>{" "}
                {new Date(sellerProduct.createdate).toLocaleString()}
              </Card.Text>
            </Col>
            <Col>
              <Button
                variant="secondary"
                className="mx-2"
                size="sm"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="mx-2"
                size="sm"
                id={`${sellerProduct.id}`}
                onClick={handleProductDelete}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SellerProductCard;
