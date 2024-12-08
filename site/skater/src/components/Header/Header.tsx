import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IAccount } from "../../interfaces/user";

import { useEffect } from "react";
import { useState } from "react";

import logoImage from "../../assets/SKATERLogoSmall.png";

const Header = (props: { localUser: string; setLocalUser: () => void }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (props.localUser !== "") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [props.localUser]);

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search === "") return;
    navigate(`/search/${search}`);
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid className="px-5">
          <Navbar.Brand href="/" className="fw-bold">
            <img src={logoImage} className={styles.icon}/>
            KATER.COM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/skateboards">Skateboards</Nav.Link>
              <Nav.Link href="/skates">Skates</Nav.Link>
              <Nav.Link href="/shoes">Shoes</Nav.Link>
              <Nav.Link href="/apparel">Apparel</Nav.Link>
              <Nav.Link href="/accessories">Accessories</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Form className="d-flex mx-4 w-100" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search for products"
                  className="rounded-0 w-100"
                  aria-label="Search"
                  id="searchkeyword"
                  value={search}
                  onChange={handleSearchOnChange}
                />
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="m-0 px-3 rounded-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Button>
              </Form>
              {isLogged ? (
                <>
                  <Nav.Link href={`/account/${JSON.parse(props.localUser).id}`}>Account</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              <Nav.Link eventKey={2} href="#memes">
                Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
