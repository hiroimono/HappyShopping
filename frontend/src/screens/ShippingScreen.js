import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Col, Card } from 'react-bootstrap';

// Components
// import Message from '../components/Message';
// import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// Actions
import { saveShippingAddress, savePaymentMethod } from '../actions/cartActions.js';
import { userAsGuest } from '../actions/userActions';

const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.userLogin);
    const { guestInfo: guest } = useSelector(state => state.userAsGuest);

    const [name, setName] = useState(guest?.name ? guest.name : '');
    const [email, setEmail] = useState(guest?.email ? guest.email : '');
    const [street, setStreet] = useState(shippingAddress?.street ? shippingAddress.street : '');
    const [number, setNumber] = useState(shippingAddress?.number ? shippingAddress.number : '');
    const [zipcode, setZipcode] = useState(shippingAddress?.zipcode ? shippingAddress.zipcode : '');
    const [city, setCity] = useState(shippingAddress?.city ? shippingAddress.city : '');
    const [country, setCountry] = useState(shippingAddress?.country ? shippingAddress.country : '');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        !userInfo && dispatch(userAsGuest({ name, email }));
        dispatch(saveShippingAddress({ street, number, zipcode, city, country }));
        dispatch(savePaymentMethod('PayPal'));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <Form onSubmit={submitHandler}>
                {
                    !userInfo && (
                        <Card className="mb-3">
                            <Card.Header>
                                <h5>Guest Info</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} lg={8} controlId='name'>
                                        <Form.Label>Name and Surname*</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='name'
                                            placeholder='Enter your name'
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} lg={4} controlId='email'>
                                        <Form.Label>Email Address*</Form.Label>
                                        <Form.Control
                                            type='email'
                                            name='email'
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
                    )
                }


                <Card className="mb-3">
                    <Card.Header>
                        <h5>Shipping Address</h5>
                    </Card.Header>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} sm={6} lg={8} controlId='street'>
                                <Form.Label>Street*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='street'
                                    placeholder='Enter street'
                                    value={street}
                                    required
                                    onChange={(e) => setStreet(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} lg={4} controlId='number'>
                                <Form.Label>House Number*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='number'
                                    placeholder='Enter number'
                                    value={number}
                                    required
                                    onChange={(e) => setNumber(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={4} lg={4} controlId="zipcode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='zipcode'
                                    placeholder='Enter zipcode'
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={4} lg={4} controlId="city">
                                <Form.Label>City*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='city'
                                    placeholder='Enter city'
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={4} lg={4} controlId="country">
                                <Form.Label>Country*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='country'
                                    placeholder='Enter country'
                                    value={country}
                                    required
                                    onChange={(e) => setCountry(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button type='submit' variant='primary'>Continue</Button>
                    </Card.Body>
                </Card>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
