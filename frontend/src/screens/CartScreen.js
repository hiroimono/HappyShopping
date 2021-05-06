import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addProductToCart, removeProductFromCart } from '../actions/cartActions.js';

// Components
import Message from '../components/Message.js';

// Bootstrap
import { Row, Col, Container, ListGroup, Image, Form, Button } from 'react-bootstrap';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id ? match.params.id : null;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer);

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

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h1>Shopping Cart:</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message>
                                Your cart is empty. <Link to='/'>Go back</Link>
                            </Message>
                        ) : (
                            <Col md={8} className="px-0">
                                <ListGroup variant='flush'>
                                    {cartItems.map((cartItem) => (
                                        <ListGroup.Item key={cartItem._id} className="my-2 px-3 py-2" style={{ backgroundColor: 'ghostwhite' }}>
                                            <Row className="align-items-center m-0">
                                                <Col md={2} className='px-0'>
                                                    <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                                                </Col>

                                                <Col md={5}>
                                                    <Link to={`/products/${cartItem._id}`}>
                                                        {cartItem.name}
                                                    </Link>
                                                </Col>

                                                <Col md={2}>
                                                    €{cartItem.price}
                                                </Col>

                                                <Col md={2}>
                                                    <Form.Control as='select' value={cartItem.qty} onChange={(e) => setQty(cartItem._id, e.target.value)}>
                                                        {[...Array(cartItem.countInStock).keys()].map((num) =>
                                                            <option key={num}>{num + 1}</option>
                                                        )}
                                                    </Form.Control>
                                                </Col>

                                                <Col md={1}>
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem._id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
