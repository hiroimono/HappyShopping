import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

/** actions */
import { userLogout } from '../actions/userActions.js'

/** Styles */
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

// Custom Hooks
import useBreakpoint from '../customHooks/useBreakpoint';

const Header = ({ history }) => {
    const dispatch = useDispatch();
    const { width } = useBreakpoint();
    const { userInfo } = useSelector(state => state.userLogin);
    const { cartItems } = useSelector(state => state.cart)

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

                {
                    userInfo?.isAdmin && width >= 768 && (
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

                <Navbar.Toggle aria-controls="collapse" />

                <Navbar.Collapse id="collapse">
                    <Nav className="ml-auto">
                        {isLoggedIn ? (
                            <>
                                {
                                    userInfo?.isAdmin && width < 768 && (
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
                                    <Button variant="outline-light border-0" size="sm">
                                        <i className="fas fa-user mr-2"></i> Log In
                                    </Button>
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <Button variant="outline-light border-0" size="sm" className="position-relative">
                                    <i className="fas fa-shopping-cart"></i>
                                    {
                                        cartItems?.length !== 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-warning text-dark">
                                                {cartItems.length}
                                            </span>
                                        )
                                    }
                                    <span className={cartItems?.length !== 0 ? 'ml-3' : 'ml-2'}>Shopping Cart</span>
                                </Button>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header

