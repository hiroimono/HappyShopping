import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addProductToCart, removeProductFromCart } from '../actions/cartActions.js';

// Components
import Message from '../components/Message.js';

// Bootstrap
import { Row, Col, Container, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

/** i18n */
import { useTranslation } from 'react-i18next'

const CartScreen = ({ match, location, history }) => {
    const { t } = useTranslation();

    const productId = match.params.id ? match.params.id : null;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (productId) {
            dispatch(addProductToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const setQty = (id, value) => {
        dispatch(addProductToCart(id, Number(value)))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeProductFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h2 className="mb-2">{t('shopping-cart')}:</h2>
                    {
                        cartItems.length === 0 ? (
                            <Message>
                                {t('your-cart-is-empty')}.
                                <Link to='/'>
                                    <Button className="btn-sm ml-3" variant='outline-info'>
                                        <i className="fas fa-home pr-1"></i> Home
                                    </Button>
                                </Link>
                            </Message>
                        ) : (
                            <Row>
                                <Col md={8} className="px-0">
                                    <ListGroup variant=''>
                                        {cartItems.map((cartItem) => (
                                            <ListGroup.Item key={cartItem._id} className="my-2 px-2 py-2" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                                                <Row className="align-items-center m-0">
                                                    <Col xs={3} md={2} className='px-0'>
                                                        <Image src={cartItem.image[0].path} alt={cartItem.name} fluid rounded />
                                                    </Col>

                                                    <Col md={4} lg={5} className="d-none d-md-block fs-14 px-2 px-md-2 py-2">
                                                        <Link to={`/products/${cartItem._id}`}>
                                                            {cartItem.name}
                                                        </Link>
                                                    </Col>

                                                    <Col md={2} className="d-none d-md-block px-0">
                                                        {currency(cartItem.price)}
                                                    </Col>

                                                    <Col md={2} className="d-none d-md-block px-0">
                                                        <Form.Control as='select' value={cartItem.qty} onChange={(e) => setQty(cartItem._id, e.target.value)}>
                                                            {[...Array(cartItem.countInStock).keys()].map((num) =>
                                                                <option key={num}>{num + 1}</option>
                                                            )}
                                                        </Form.Control>
                                                    </Col>

                                                    <Col md={1} className="d-none d-md-block pr-0 text-right">
                                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem._id)}>
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </Col>

                                                    <Col xs={9} className="d-md-none align-items-stretch">
                                                        <Row className="justify-content-around align-items-center">
                                                            <Col className="d-flex-start fs-14 py-2">
                                                                <Link to={`/products/${cartItem._id}`}>
                                                                    {cartItem.name}
                                                                </Link>
                                                            </Col>
                                                        </Row>

                                                        <Row className="justify-content-around align-items-center">
                                                            <Col xs={5} className="d-flex-start">
                                                                {currency(cartItem.price)}
                                                            </Col>

                                                            <Col xs={4} className="text-right px-1">
                                                                <Form.Control as='select' value={cartItem.qty} onChange={(e) => setQty(cartItem._id, e.target.value)}>
                                                                    {[...Array(cartItem.countInStock).keys()].map((num) =>
                                                                        <option key={num}>{num + 1}</option>
                                                                    )}
                                                                </Form.Control>
                                                            </Col>

                                                            <Col xs={3} className="text-right px-0">
                                                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem._id)}>
                                                                    <i className='fas fa-trash'></i>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>

                                <Col md={4} className="mb-5 px-0 pl-md-4">
                                    <Card className="my-2 text-right">
                                        <ListGroup variant='flush'>
                                            <Card.Header className="p-3 text-right">
                                                <h5 className="mb-0">
                                                    {t('subtotal')}: <span className="text-nowrap">{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} item</span>
                                                </h5>
                                            </Card.Header>

                                            <ListGroup.Item>
                                                <h4> {currency(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2))}</h4>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>

                                    <Button type='button' className='btn btn-success btn-block'
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}>
                                        {t('proceed-checkout')}
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
