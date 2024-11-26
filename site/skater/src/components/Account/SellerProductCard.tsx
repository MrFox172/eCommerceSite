import { Col, Row, Form, InputGroup, Button, Card } from "react-bootstrap";

interface SellerProductCardProps {
    sellerProduct: {
        id: number;
        name: string;
        description: string;
        price: number;
        maxQuantity: number;
        category: string;
        tags: string
        createdate: string;
    };
};

const SellerProductCard = (props: SellerProductCardProps) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{props.sellerProduct.name}</Card.Title>
          <hr />
          <Row>
            <Col>
              <Card.Text>
                {props.sellerProduct.description}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Price:</strong> ${props.sellerProduct.price}
              </Card.Text>
              <Card.Text>
                <strong>Quantity:</strong> {props.sellerProduct.maxQuantity}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Category:</strong> Skateboards
              </Card.Text>
              <Card.Text>
                <strong>Created:</strong> {props.sellerProduct.createdate}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="justify-content-end text-end">
          <Button variant="secondary" className="mx-2" size="sm">Edit</Button>
          <Button variant="danger" className="mx-2" size="sm">Delete</Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SellerProductCard;