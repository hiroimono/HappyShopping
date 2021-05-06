import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { addProductToCart } from '../actions/cartActions.js';

// Components
import Message from '../components/Message.js';

// Bootstrap
import { Row, Col, Container, ListGroup } from 'react-bootstrap';

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
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                    {cartItems.map((cartItem) => (
                                        <ListGroup.Item key={cartItem._id}>
                                            {cartItem.name}
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
