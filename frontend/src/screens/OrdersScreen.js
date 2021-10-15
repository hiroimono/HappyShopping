import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// bootstrap
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

// Paypal Button
// import { loadScript } from "@paypal/paypal-js";
import { PayPalButton } from 'react-paypal-button-v2';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';

// Actions
import { getOrderDetailsById, payOrder, cancelOrder } from '../actions/orderActions.js';
import { getPayPalScript } from '../actions/configActions.js';
import { constants } from '../constants/constant.js'

const OrdersScreen = ({ match, history }) => {
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    const { order, loading, error } = useSelector(state => state.orderDetailsById);
    const { loading: loadingPay, success: successPay, error: errorPay } = useSelector((state) => state.orderPay);
    const { success: successCancel, error: errorCancel } = useSelector((state) => state.orderCancel);
    const { paypalClientId } = useSelector((state) => state.paypalClientId);

    // Calculator
    if (!loading && !loadingPay) {
        const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2)
        order.itemsPrice = addDecimals(order.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
    }

    useEffect(() => {
        const removeScript = async () => {
            const script = document.getElementById('script')
            script && script.remove();
        }

        if (!order || successPay || order?._id !== orderId) {
            removeScript()
            dispatch({ type: constants.ORDER_PAY_RESET })
            dispatch(getOrderDetailsById(orderId))
        }
    }, [dispatch, orderId, successPay, order])

    useEffect(() => {
        const addPayPalScript = async (clientId) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.id = 'paypalScript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&buyer-country=DE&currency=EUR&locale=de_DE`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (order && !order.isPaid) {
            if (!window.paypal) {
                dispatch(getPayPalScript())

                if (paypalClientId) {
                    addPayPalScript(paypalClientId)
                    console.log('paypalClientId: ', paypalClientId);
                    // loadScript({ "client-id": paypalClientId })
                    //     .then(() => {
                    //         setSdkReady(true)
                    //     })
                    //     .catch(e => console.log('e: ', e));
                }
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, sdkReady, paypalClientId])

    useEffect(() => {
        if (successCancel) {
            history.push('/cart')
        }

        return () => {
            if (successCancel || errorCancel) {
                dispatch({ type: constants.ORDER_CANCEL_RESET })
            };
        }
    }, [dispatch, history, successCancel, errorCancel])

    const successPaymentHandler = (paymentResult, data) => {
        console.log('order.user: ', order.user);
        console.log('order.visitor: ', order.visitor);
        console.log('paymentResult: ', paymentResult);
        console.log('data: ', data);
        dispatch(payOrder(orderId, paymentResult))
        dispatch({ type: constants.CART_ITEMS_RESET })
    }

    const paypalErrorHandler = (e) => {
        console.log('error: ', e);
    }

    const removeOrder = (id) => dispatch(cancelOrder(id))

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'full' })
    const showTime = (str) => new Date(str).toLocaleTimeString('de-DE', { timeStyle: 'short' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return loading || loadingPay ?
        <Loader /> :
        error || errorPay ?
            <Message variant='danger'>{error || errorPay}</Message> :
            <>
                <Row>
                    <Col lg={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="px-0">
                                <h3>Shipping</h3>
                                {
                                    (order?.user?.name || order?.visitor?.name) && (
                                        <Row>
                                            <Col md={2} className='mb-0'>
                                                <strong>Name: </strong>
                                            </Col>
                                            <Col className='mb-0'>
                                                <span>
                                                    {order.user ? order.user.name : (order.visitor && order.visitor.name)}
                                                </span>
                                            </Col>
                                        </Row>
                                    )
                                }

                                {
                                    (order?.user?.email || order?.visitor?.email) && (
                                        <Row>
                                            <Col md={2} className='mb-0'>
                                                <strong>Email: </strong>
                                            </Col>
                                            <Col className='mb-0'>
                                                <span>
                                                    {
                                                        order.user ? (
                                                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                                        ) : (
                                                            order.visitor && (
                                                                <a href={`mailto:${order.visitor.email}`}>{order.visitor.email}</a>
                                                            )
                                                        )
                                                    }
                                                </span>
                                            </Col>
                                        </Row>
                                    )
                                }
                                <Row>
                                    <Col md={2}>
                                        <p className='mb-0'>
                                            <strong>Address: </strong>
                                        </p>
                                    </Col>
                                    <Col>
                                        <span className='mb-0'>
                                            {(order?.shippingAddress?.street && order?.shippingAddress?.number) &&
                                                `${order.shippingAddress.street} ${order.shippingAddress.number}`}
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
                                <Row>
                                    <Col className='col-12 mt-2'>
                                        {
                                            order?.isDelivered ?
                                                <Message variant='success'>Paid on {showDate(order?.deliveredAt)}</Message> :
                                                <Message variant='danger'>Not delivered yet.</Message>
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='px-0'>
                                <h3>Payment:</h3>
                                {/* <Row>
                                    <Col md={2}>
                                        <p className='mb-0'>
                                            <strong>Method:</strong>
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='mb-0'>
                                            {order?.paymentMethod && `${order.paymentMethod}`}
                                        </p>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col className='col-12 mt-2'>
                                        {
                                            order?.isPaid ?
                                                <Message variant='success'>Paid on {showDate(order?.paidAt)} at {showTime(order?.paidAt)}</Message> :
                                                <Message variant='danger'>Not paid yet.</Message>
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='px-0'>
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
                                                        {item.qty} x {currency(item.price)} = {currency(Number(Number(item.qty) * Number(item.price)).toFixed(2))}
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

                    <Col lg={4} className="mb-5 pl-lg-4 col-lg-4">
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='px-0'>
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
                                                    <strong>Items:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.itemsPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <strong>Shipping:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.shippingPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <strong>Tax:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.taxPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <h5><strong>Total:</strong></h5>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    <h5><strong>{currency(order.totalPrice)}</strong></h5>
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

                            {
                                !order.isPaid && (
                                    <>
                                        <ListGroup.Item className='p-0'>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    currency="EUR"
                                                    onSuccess={successPaymentHandler}
                                                    shippingPreference="NO_SHIPPING"
                                                    catchError={paypalErrorHandler}
                                                />
                                            )}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='p-0'>
                                            <Button className="btn-sm w-100 mr-2" variant='outline-danger' onClick={() => removeOrder(order._id)}>Cancel Order</Button>
                                        </ListGroup.Item>
                                    </>
                                )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </>
}

export default OrdersScreen
