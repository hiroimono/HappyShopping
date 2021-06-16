import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// bootstrap
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';
// import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// Actions
// import { savePaymentMethod } from '../actions/cartActions.js';

const OrdersScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    console.log('cart: ', cart);

    // Calculator
    cart.itemsPrice = cart.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    cart.shippingPrice = cart.itemsPrice > 100 ? Number(0).toFixed(2) : Number(10).toFixed(2);
    cart.taxPrice = Number(.19 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    // if (!shippingAddress) {
    //     history.push('/shipping');
    // }

    // const [paymentMethod, setPaymentMethod] = useState('PayPal');

    // const dispatch = useDispatch();

    const checkoutHandler = (e) => {
        e.preventDefault();
        // dispatch(savePaymentMethod(paymentMethod));
        // history.push('/placeorder');
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

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
                                        {(cart.shippingAddress?.street && cart.shippingAddress?.number) &&
                                            `${cart.shippingAddress.street} ${cart.shippingAddress.number}`}.
                                    </span>
                                    <span className='mb-0'>
                                        {cart.shippingAddress?.zipcode &&
                                            ` ${cart.shippingAddress?.zipcode}`},
                                        {cart.shippingAddress?.city &&
                                            ` ${cart.shippingAddress?.city}`},
                                        {cart.shippingAddress?.country &&
                                            ` ${cart.shippingAddress?.country}`}
                                    </span>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method:</h3>
                            <Row>
                                <Col md={2}>
                                    <p className='mb-0'>
                                        Method:                                     </p>
                                </Col>
                                <Col>
                                    <p className='mb-0'>
                                        {cart?.paymentMethod && `${cart?.paymentMethod}`}
                                    </p>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order items:</h3>
                            {cart.cartItems.lenght ? (
                                <Message>Your cart is empty.</Message>
                            ) : (
                                <ListGroup variant=''>
                                    {cart.cartItems.map((cartItem, index) => (
                                        <ListGroup.Item key={index} className="my-2 px-3 py-2" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                                            <Row className="align-items-center m-0">
                                                <Col xs={2} lg={1} className='px-0'>
                                                    <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                                                </Col>

                                                <Col xs={6} lg={7} className="px-0 px-md-2 py-2">
                                                    <Link to={`/products/${cartItem._id}`}>
                                                        {cartItem.name}
                                                    </Link>
                                                </Col>

                                                <Col xs={4} className="px-0">
                                                    {cartItem.qty} x €{cartItem.price} = €{Number(Number(cartItem.qty) * Number(cartItem.price)).toFixed(2)}
                                                </Col>

                                                {/* <Col md={1} className="col-2 col-md-1 pr-0 text-right">
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem._id)}>
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
                                                {cart.itemsPrice}€
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={2} lg={4} className='px-1'>
                                                Shipping:
                                            </Col>
                                            <Col xs={10} lg={8} className='pr-4 text-right'>
                                                {cart.shippingPrice}€
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={2} lg={4} className='px-1'>
                                                Tax:
                                            </Col>
                                            <Col xs={10} lg={8} className='pr-4 text-right'>
                                                {cart.taxPrice}€
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={2} lg={4} className='px-1'>
                                                <h5><strong>Total:</strong></h5>
                                            </Col>
                                            <Col xs={10} lg={8} className='pr-4 text-right'>
                                                <h5><strong>{cart.totalPrice}€</strong></h5>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Card>

                            <Button type='button' className='btn btn-success btn-block'
                                disabled={!cart.cartItems.length}
                                onClick={checkoutHandler}>
                                Place order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default OrdersScreen
