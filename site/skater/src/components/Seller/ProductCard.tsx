import { Col, Row, Button, Card, Stack, Badge } from "react-bootstrap";
import { Product as IProduct } from "../../interfaces/products";

const SellerProductCard = (props: {
  sellerProduct: IProduct;
  setShow;
  setProduct;
  handleProductDelete;
}) => {
  const handleEdit = () => {
    props.setShow(true);
    props.setProduct(props.sellerProduct);
  };

  return (
    <div>
      <Card bg={"light"} className="">
        <Card.Header as="h5" className="bg-dark bg-gradient text-white">
          {props.sellerProduct.name}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>
                <strong>Description:</strong> {props.sellerProduct.description}
              </Card.Text>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Card.Text className="my-1">
                <strong>SKU:</strong> {props.sellerProduct.id}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Price:</strong> ${props.sellerProduct.price}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Sale Price:</strong> ${props.sellerProduct.salePrice}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Stock on Hand:</strong>{" "}
                {props.sellerProduct.stockOnHand}
              </Card.Text>
              <Card.Text className="my-1">
                <strong>Category:</strong> {props.sellerProduct.category.name}
              </Card.Text>
            </Col>
            <Col>
              <strong>Tags:</strong>
              <ul>
                {props.sellerProduct.tags.split(",").map((tag: string) => (
                  <li key={tag}>
                    <Badge pill bg="secondary">
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <Stack direction="horizontal" gap={3}>
                {props.sellerProduct.productImages &&
                  props.sellerProduct.productImages.map((image) => (
                    <Card.Img
                      style={{ width: "6rem", height: "6rem" }}
                      variant="top"
                      key={image.id}
                      src={image.imageUrl}
                      alt={image.name}
                    />
                  ))}
              </Stack>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="justify-content-end text-end">
          <Row>
            <Col className="justify-content-start text-start">
              <Card.Text>
                <strong>Created:</strong>{" "}
                {new Date(props.sellerProduct.createdate).toLocaleString()}
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
                id={`${props.sellerProduct.id}`}
                onClick={props.handleProductDelete}
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
