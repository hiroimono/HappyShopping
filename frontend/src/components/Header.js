import React from 'react';

/** Styles */
import { Navbar, Nav } from 'react-bootstrap';

/** Styles */
// import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Navbar.Brand href="/">HappyShopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart">
                            <i className="fas fa-shopping-cart mx-2"></i>
                            Shopping Cart
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <i className="fas fa-user mx-2"></i>
                            Log In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header

