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
import { savePaymentMethod } from '../actions/cartActions.js';

/** i18n */
import { useTranslation } from 'react-i18next'

const PaymentMethodScreen = ({ history }) => {
    const { t } = useTranslation();

    const { shippingAddress } = useSelector(state => state.cart);

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));

        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <h3>{t('payment-method')}</h3>

            <Card>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label as="legend">{t('select-method')}:</Form.Label>
                            <Col>
                                <Form.Check type='radio' label='PayPal or Debit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                            </Col>

                            <Col>
                                <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                            </Col>
                        </Form.Group>

                        <Button type='submit' variant='primary'>{t('continue')}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default PaymentMethodScreen
