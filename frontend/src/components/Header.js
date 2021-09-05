import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

/** actions */
import { userLogout } from '../actions/userActions.js'

/** Styles */
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin);
    const isLoggedIn = userInfo ? true : false;
    console.log('userInfo: ', userInfo);

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <Navbar bg="dark" fixed="top" variant="dark" expand="md" collapseOnSelect>
                <LinkContainer to='/'>
                    <Navbar.Brand>HappyShopping</Navbar.Brand>
                </LinkContainer>

                {
                    userInfo?.isAdmin && (
                        <NavDropdown title='ADMIN MENU' id='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )
                }

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {isLoggedIn ? (
                            <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/my-orders'>
                                        <NavDropdown.Item>My Orders</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fas fa-user mx-2"></i> Log In
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className="fas fa-shopping-cart mx-2"></i>Shopping Cart
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header

