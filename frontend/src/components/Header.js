import React from 'react';
import { Link } from 'react-router-dom';

/** Styles */
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" fixed="top" variant="dark" expand="md" collapseOnSelect>
                <Navbar.Brand as={Link} to="/">HappyShopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/cart">
                            <i className="fas fa-shopping-cart mx-2"></i>
                            Shopping Cart
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
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

