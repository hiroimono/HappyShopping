import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// bootstrap
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';

// Actions
import { getOrderDetailsById } from '../actions/orderActions.js';

const OrdersScreen = ({ match }) => {
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const orderDetails = useSelector(state => state.orderDetailsById);
    console.log('orderDetails: ', orderDetails);
    const { order, loading, error } = orderDetails;

    const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2)

    // Calculator
    if (!loading) {
        order.itemsPrice = addDecimals(order.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
    }

    useEffect(() => {
        dispatch(getOrderDetailsById(orderId))
    }, [dispatch, orderId])

    return loading ?
        <Loader /> :
        error ?
            <Message variant='danger'>{error}</Message> :
            <>
                <Row>
                    <Col lg={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <Row>
                                    <Col md={2}>
                                        <p className='mb-0'>
                                            Address:
                                        </p>
                                    </Col>
                                    <Col>
                                        <span className='mb-0'>
                                            {(order?.shippingAddress?.street && order?.shippingAddress?.number) &&
                                                `${order.shippingAddress.street} ${order.shippingAddress.number}`}.
                                        </span>
                                        <span className='mb-0'>
                                            {order?.shippingAddress?.zipcode &&
                                                ` ${order.shippingAddress.zipcode}`},
                                            {order?.shippingAddress?.city &&
                                                ` ${order.shippingAddress.city}`},
                                            {order?.shippingAddress?.country &&
                                                ` ${order.shippingAddress.country}`}
                                        </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Payment Method:</h3>
                                <Row>
                                    <Col md={2}>
                                        <p className='mb-0'>
                                            Method:
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='mb-0'>
                                            {order?.paymentMethod && `${order.paymentMethod}`}
                                        </p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Order items:</h3>
                                {!order?.cartItems?.length ? (
                                    <Message>Your Order is empty.</Message>
                                ) : (
                                    <ListGroup variant=''>
                                        {order?.cartItems && order.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index} className="my-2 px-3 py-2" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                                                <Row className="align-items-center m-0">
                                                    <Col xs={2} lg={1} className='px-0'>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col xs={6} lg={7} className="px-0 px-md-2 py-2">
                                                        <Link to={`/products/${item._id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>

                                                    <Col xs={4} className="px-0">
                                                        {item.qty} x €{item.price} = €{Number(Number(item.qty) * Number(item.price)).toFixed(2)}
                                                    </Col>

                                                    {/* <Col md={1} className="col-2 col-md-1 pr-0 text-right">
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(orderItem._id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col> */}
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col lg={4} className="mb-5 px-0 pl-md-4">
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Card className="my-2 text-right">
                                    <ListGroup variant='flush'>
                                        <Card.Header className="p-3 text-right">
                                            <h3 className="mb-0 text-center">
                                                Order Summary
                                            </h3>
                                        </Card.Header>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    Items:
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {order.itemsPrice}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    Shipping:
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {order.shippingPrice}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    Tax:
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {order.taxPrice}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <h5><strong>Total:</strong></h5>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    <h5><strong>{order.totalPrice}€</strong></h5>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Card>


                                {
                                    error &&
                                    <Message variant='danger'>
                                        {error}
                                    </Message>
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
}

export default OrdersScreen
