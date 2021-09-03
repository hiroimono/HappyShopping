import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// bootstrap
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

// actions
import { getSingleProduct } from '../actions/productActions.js'
import { addProductToCart, removeProductFromCart } from '../actions/cartActions.js';

/** Components */
import Ratings from '../components/Ratings';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.product)
    const { cartItems } = useSelector(state => state.cart)
    const initial = cartItems.filter(item => item._id === match.params.id).length ? true : false;
    const [isInCart, setIsInCart] = useState(initial);

    /** If state is in Basic Version */
    // const { loading, error, product } = useSelector(state => state)

    useEffect(() => {
        dispatch(getSingleProduct(match.params.id));
    }, [dispatch, match.params.id, qty])

    const addToCartHandler = () => {
        // history.push(`/cart/${match.params.id}?qty=${qty}`);
        dispatch(addProductToCart(match.params.id, qty))
        setIsInCart(true)
    }

    const removeFromCartHandler = () => {
        dispatch(removeProductFromCart(match.params.id));
        setIsInCart(false)
    }
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return (
        <>
            {loading ?
                <Loader>Loading</Loader> :
                error ?
                    <Message variant='danger' messageText={error}></Message> :
                    (
                        <>
                            <Link to='/' className='btn btn-dark'>Go Back</Link>
                            <Row className='my-3'>

                                <Col md={12} lg={5} className="d-flex no-gutter justify-content-center align-items-center my-3">
                                    <Image src={product?.image} fluid className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                </Col>

                                <Col md={7} lg={4}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item className='px-0'>
                                            <h3>{product?.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>

                                            <Ratings rating={product?.rating} numReviews={product?.numReviews} color='gold'></Ratings>

                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            Price: {currency(product?.price)}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            Descripton: {product?.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={5} lg={3} className="my-3">
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price: </Col>
                                                    <Col><strong>{currency(product?.price)}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status: </Col>
                                                    <Col>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col className="d-flex align-items-center">Quantity: </Col>
                                                    <Col>
                                                        {product?.countInStock > 0 && (
                                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map((num) =>
                                                                    <option key={num}>{num + 1}</option>
                                                                )}
                                                            </Form.Control>
                                                        )}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    {isInCart ? (
                                                        <Button type='button' className="btn btn-block"
                                                            disabled={product?.countInStock <= 0 ? true : false}
                                                            onClick={removeFromCartHandler}>
                                                            Remove from cart
                                                        </Button>
                                                    ) : (
                                                        <Button type='button' className="btn btn-block"
                                                            disabled={product?.countInStock <= 0 ? true : false}
                                                            onClick={addToCartHandler}>
                                                            Add to cart
                                                        </Button>
                                                    )}
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </>
    )
}

export default ProductScreen;