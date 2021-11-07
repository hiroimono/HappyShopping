import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

/** actions */
import { userLogout } from '../actions/userActions.js'

/** Styles */
import { Navbar, Nav, NavDropdown, Button, ButtonGroup } from 'react-bootstrap';

/** Custom Hooks */
import useBreakpoint from '../customHooks/useBreakpoint';

/** i18n */
import { useTranslation } from 'react-i18next'

const Header = ({ history }) => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [lang, setLang] = useState('de')

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
        setLang(e.target.value)
    }

    const dispatch = useDispatch();
    const { width } = useBreakpoint();
    const { userInfo } = useSelector(state => state.userLogin);
    const { cartItems } = useSelector(state => state.cart)

    const isLoggedIn = userInfo ? true : false;

    // useEffect(() => {
    //     const main = document.getElementById('main');
    //     main.addEventListener('click', toggle)
    //     return () => main.removeEventListener('click', toggle)
    // }, [])

    // const toggle = () => {
    //     const toggler = document.querySelector('button.navbar-toggler');
    //     const navbar = document.querySelector('div#collapse');
    //     if (navbar.classList.contains('show') && !toggler.classList.contains('collapsed')) {
    //         toggler.classList.add('collapsed');
    //         navbar.classList.remove('show')
    //         navbar.classList.remove('collapse')
    //         navbar.classList.add('collapsing');
    //         setTimeout(() => {
    //             navbar.classList.remove('collapsing');
    //             navbar.classList.add('collapse');
    //         }, 100);
    //     }
    // }

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
                        <NavDropdown title={t('admin-menu')} id='adminmenu' className="d-md-flex flex-column justify-content-md-center">
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>{t('users')}</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Divider />

                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>{t('products')}</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Divider />

                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>{t('orders')}</NavDropdown.Item>
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
                                        <NavDropdown title={t('admin-menu')} id='adminmenu' className="d-md-flex flex-column justify-content-md-center">
                                            <LinkContainer to='/admin/userlist'>
                                                <NavDropdown.Item>{t('users')}</NavDropdown.Item>
                                            </LinkContainer>

                                            <NavDropdown.Divider />

                                            <LinkContainer to='/admin/productlist'>
                                                <NavDropdown.Item>{t('products')}</NavDropdown.Item>
                                            </LinkContainer>

                                            <NavDropdown.Divider />

                                            <LinkContainer to='/admin/orderlist'>
                                                <NavDropdown.Item>{t('orders')}</NavDropdown.Item>
                                            </LinkContainer>
                                        </NavDropdown>
                                    )
                                }

                                <NavDropdown title={userInfo.name} id='username' className="d-md-flex flex-column justify-content-md-center">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>{t('profile')}</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Divider />

                                    <LinkContainer to='/my-orders'>
                                        <NavDropdown.Item>{t('my-orders')}</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item onClick={logoutHandler}>{t('logout')}</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <Button variant="outline-light border-0" size="sm">
                                        <i className="fas fa-user mr-2"></i> {t('login')}
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
                                    <span className={cartItems?.length !== 0 ? 'ml-3' : 'ml-2'}>{t('shopping-cart')}</span>
                                </Button>
                            </Nav.Link>
                        </LinkContainer>

                        <div className="d-flex align-items-center">
                            <ButtonGroup style={{ height: '30px' }}>
                                <Button className={lang === 'de' ? 'border-0 bg-warning d-flex align-items-center' : 'border-0 bg-secondary d-flex align-items-center'} onClick={changeLanguage} value='de'>De</Button>
                                <Button className={lang === 'en' ? 'border-0 bg-warning d-flex align-items-center' : 'border-0 bg-secondary d-flex align-items-center'} onClick={changeLanguage} value='en'>En</Button>
                            </ButtonGroup>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header

