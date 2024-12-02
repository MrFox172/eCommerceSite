import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useEffect } from "react";
import { useState } from "react";

const Header = (props: {localUser: string, setLocalUser: (() => void) }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (props.localUser !== "") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [props.localUser]);

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid className="px-5">
          <Navbar.Brand href="/" className="fw-bold">
            SKATER.COM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/skateboards">Skateboards</Nav.Link>
              <Nav.Link href="/skates">Skates</Nav.Link>
              <Nav.Link href="/shoes">Shoes</Nav.Link>
              <Nav.Link href="/apperal">Apperal</Nav.Link>
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
              {(isLogged) ? (
                <>
                  <Nav.Link href="/account">Account</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </>
              ): (
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
