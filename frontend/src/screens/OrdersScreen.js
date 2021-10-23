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
import { getOrderDetailsById, payOrder, deliverOrder, deliverNotOrder, cancelOrder, payOrderAdmin } from '../actions/orderActions.js';
import { getPayPalScript } from '../actions/configActions.js';
import { constants } from '../constants/constant.js'

/** i18n */
import { useTranslation, Trans } from 'react-i18next'

const OrdersScreen = ({ match, history }) => {
    const { t } = useTranslation();

    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLogin);
    const { order, loading, error } = useSelector(state => state.orderDetailsById);
    const { loading: loadingPay, success: successPay, error: errorPay } = useSelector((state) => state.orderPay);
    const { loading: loadingPayAdmin, success: successPayAdmin, error: errorPayAdmin } = useSelector((state) => state.orderPayAdmin);
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = useSelector((state) => state.orderDeliver);
    const { loading: loadingNotDeliver, success: successNotDeliver, error: errorNotDeliver } = useSelector((state) => state.orderNotDeliver);
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

        if (!order || successPay || successPayAdmin || successDeliver || successNotDeliver || order?._id !== orderId) {
            removeScript()
            dispatch({ type: constants.ORDER_PAY_RESET })
            dispatch({ type: constants.ORDER_PAY_ADMIN_RESET })
            dispatch({ type: constants.ORDER_DELIVER_RESET })
            dispatch({ type: constants.ORDER_NOT_DELIVER_RESET })
            dispatch(getOrderDetailsById(orderId))
        }
    }, [dispatch, orderId, successPay, order, successDeliver, successNotDeliver, successPayAdmin])

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

        if (order && order.user) {
            if (!userInfo) {
                history.push('/login')
            }
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
    }, [dispatch, order, sdkReady, paypalClientId, userInfo, history])

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
        dispatch(payOrder(orderId, paymentResult))
        dispatch({ type: constants.CART_ITEMS_RESET })
    }

    const successAdminPaymentHandler = () => {
        if (userInfo?.isAdmin) {
            const paymentByAdmin = {
                id: userInfo._id,
                status: !order?.isPaid ? "MARKED AS PAID BY ADMIN" : "MARKED AS NOT PAID BY ADMIN",
                update_time: Date.now(),
                email_address: userInfo.email
            }
            dispatch(payOrderAdmin(order, paymentByAdmin))
        }
    }

    const successDeliverHandler = () => {
        if (!order.isDelivered) {
            dispatch(deliverOrder(orderId))
        } else {
            dispatch(deliverNotOrder(orderId))
        }
    }

    const paypalErrorHandler = (e) => {
        console.log('error: ', e);
    }

    const removeOrder = (id) => dispatch(cancelOrder(id))

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'full' })
    const showTime = (str) => new Date(str).toLocaleTimeString('de-DE', { timeStyle: 'short' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    console.log('order: ', order);

    return loading || loadingPay || loadingPayAdmin || loadingDeliver || loadingNotDeliver ?
        <Loader /> :
        error || errorPay || errorPayAdmin || errorDeliver || errorNotDeliver ?
            <Message variant='danger'>{error || errorPay || errorPayAdmin || errorDeliver || errorNotDeliver}</Message> :
            <>
                <Row>
                    <Col lg={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='px-0'>
                                <h3>{t('payment')}:</h3>
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
                                            order?.isPaid ? (
                                                <Message variant='success'>
                                                    <Trans i18nKey='paid-message'>
                                                        Paid on {showDate(order?.paidAt)} at {showTime(order?.paidAt)}
                                                    </Trans>
                                                </Message>
                                            ) : (
                                                <Message variant='danger'>{t('not-paid-yet')}.</Message>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="px-0">
                                <h3>{t('shipping')}</h3>
                                {
                                    (order?.user?.name || order?.visitor?.name) && (
                                        <Row>
                                            <Col md={4} className='mb-0'>
                                                <strong>{t('name-and-surname')}: </strong>
                                            </Col>
                                            <Col md={8} className='mb-0'>
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
                                            <Col md={4} className='mb-0'>
                                                <strong>Email: </strong>
                                            </Col>
                                            <Col md={8} className='mb-0'>
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
                                    <Col md={4}>
                                        <p className='mb-0'>
                                            <strong>{t('address')}: </strong>
                                        </p>
                                    </Col>
                                    <Col md={8}>
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
                                                <Message variant='success'>
                                                    <Trans i18nKey='delivered-message'>
                                                        Delivered at {showDate(order?.deliveredAt)}
                                                    </Trans>
                                                </Message> :
                                                <Message variant='danger'>{t('not-delivered-yet')}.</Message>
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='px-0'>
                                <h3>{t('order-items')}:</h3>
                                {!order?.cartItems?.length ? (
                                    <Message>{t('your-order-is-empty')}.</Message>
                                ) : (
                                    <ListGroup variant=''>
                                        {order?.cartItems && order.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index} className="my-2 px-3 py-2" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                                                <Row className="align-items-center m-0">
                                                    <Col xs={2} lg={1} className='px-0'>
                                                        <Image src={item.image[0].path} alt={item.name} fluid rounded />
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
                                            <h5 className="mb-0 text-center">
                                                {t('order-summary')}
                                            </h5>
                                        </Card.Header>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <strong>{t('items')}:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.itemsPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <strong>{t('shipping')}:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.shippingPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <strong>{t('tax')}:</strong>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    {currency(order.taxPrice)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={2} lg={4} className='px-1'>
                                                    <h5><strong>{t('total')}:</strong></h5>
                                                </Col>
                                                <Col xs={10} lg={8} className='pr-4 text-right'>
                                                    <h5><strong>{currency(order.totalPrice)}</strong></h5>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    </ListGroup>

                                    {
                                        userInfo?.isAdmin &&
                                        <Card.Footer className="p-2">
                                            {
                                                order?.isPaid ? (
                                                    <>
                                                        <Button className="btn btn-block bg-danger" onClick={successAdminPaymentHandler}>{t('mark-as-not-paid')}</Button>
                                                        {
                                                            order?.isDelivered ? (
                                                                <Button className="btn btn-block bg-danger" onClick={successDeliverHandler}>{t('mark-as-not-delivered')}</Button>
                                                            ) : (
                                                                <Button className="btn btn-block bg-info" onClick={successDeliverHandler}>{t('mark-as-delivered')}</Button>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button className="btn btn-block bg-success" onClick={successAdminPaymentHandler}>{t('mark-as-paid')}</Button>
                                                        {
                                                            order?.isDelivered ? (
                                                                <Button className="btn btn-block bg-danger" onClick={successDeliverHandler}>{t('mark-as-not-delivered')}</Button>
                                                            ) : (
                                                                <Button className="btn btn-block bg-info" onClick={successDeliverHandler}>{t('mark-as-delivered')}</Button>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </Card.Footer>
                                    }

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
                                            <Button className="btn-sm w-100 mr-2" variant='outline-danger' onClick={() => removeOrder(order._id)}>{t('cancel-order')}</Button>
                                        </ListGroup.Item>
                                    </>
                                )
                            }
                        </ListGroup>
                    </Col>
                </Row >
            </>
}

export default OrdersScreen
