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

/** i18n */
import { useTranslation } from 'react-i18next'

const ShippingScreen = ({ history }) => {
    const { t } = useTranslation();

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
                            <Card.Header className="p-2">
                                <h5>{t('guest-info')}</h5>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} lg={8} controlId='name'>
                                        <Form.Label>{t('name-and-surname')}*</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='name'
                                            placeholder={t('enter-your-name-and-surname')}
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} lg={4} controlId='email'>
                                        <Form.Label>{t('email-address')}*</Form.Label>
                                        <Form.Control
                                            type='email'
                                            name='email'
                                            placeholder={t('enter-email')}
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
                    <Card.Header className="p-2">
                        <h5>{t('shipping-address')}</h5>
                    </Card.Header>
                    <Card.Body className="p-2">
                        <Form.Row>
                            <Form.Group as={Col} sm={6} lg={8} controlId='street'>
                                <Form.Label>{t('street')}*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='street'
                                    placeholder={t('enter-street')}
                                    value={street}
                                    required
                                    onChange={(e) => setStreet(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} lg={4} controlId='number'>
                                <Form.Label>{t('number')}*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='number'
                                    placeholder={t('enter-number')}
                                    value={number}
                                    required
                                    onChange={(e) => setNumber(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={4} lg={4} controlId="zipcode">
                                <Form.Label>{t('zip-code')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='zipcode'
                                    placeholder={t('enter-zip-code')}
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={4} lg={4} controlId="city">
                                <Form.Label>{t('city')}*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='city'
                                    placeholder={t('enter-city')}
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={4} lg={4} controlId="country">
                                <Form.Label>{t('country')}*</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='country'
                                    placeholder={t('enter-country')}
                                    value={country}
                                    required
                                    onChange={(e) => setCountry(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button type='submit' className="btn-block" variant='primary'>{t('continue')}</Button>
                    </Card.Body>
                </Card>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
