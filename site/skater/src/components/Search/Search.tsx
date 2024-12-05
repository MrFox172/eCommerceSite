import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.css";
import img from '../../assets/img-placeholder.svg';
import { useEffect } from "react";
import { Product as IProduct } from "../../interfaces/products";

const Search = () => {

    const navigate = useNavigate();
    const {keyword} = useParams();

    useEffect(() => {
        console.log("Search page loaded");
        if(keyword){
            console.log(`Searching for ${keyword}`);
        } else {
            const currentUrl = window.location.href;
            navigate(currentUrl);
        }
    }, [keyword, navigate]); 

    console.log(keyword);

    const {data, isPending, error} = useFetch(`/product/search?keyword=${keyword}`);

    return(
        <>
            <Container className="my-5">
                <Row>
                    <Col md={3} className="border h-75">
                        <h2>Filters</h2>
                    </Col>
                    <Col md={9}>
                        <h4>Results...</h4>
                        <p className="muted">Check each product page for other buying options. Price and other details may vary based on product size and color.</p>
                        <hr />
                        <div className={styles.grid}>
                        {isPending && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {data && data.map((product: IProduct) => (
                            <Card className="p-2" key={product.id}>
                                <Card.Img variant="top" className={styles.image_holder} src={img}/>
                                <hr />
                                <Card.Body className="p-2">
                                    <div>
                                        <strong>{product.brand}</strong><br />
                                        {product.name}<br /><br />
                                        {product.description}
                                        <br />
                                        <strong><h2 className="my-3">${product.price}</h2></strong>
                                        <Button variant="warning" size="sm">Add to cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Search;