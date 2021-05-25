import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

/** actions */
import { userLogout } from '../actions/userActions.js'

/** Styles */
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = ({ history }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin);
    const isLoggedIn = userInfo ? true : false;

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <Navbar bg="dark" fixed="top" variant="dark" expand="md" collapseOnSelect>
                <LinkContainer to='/'>
                    <Navbar.Brand>HappyShopping</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className="fas fa-shopping-cart mx-2"></i>Shopping Cart
                            </Nav.Link>
                        </LinkContainer>

                        {isLoggedIn ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fas fa-user mx-2"></i> Log In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header

