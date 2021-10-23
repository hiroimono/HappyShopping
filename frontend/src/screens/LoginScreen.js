import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// actions
import { userLogin } from '../actions/userActions';

// bootstrap
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

/** i18n */
import { useTranslation } from 'react-i18next'

const LoginScreen = ({ location, history }) => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(state => state.userLogin);
    const { cartItems } = useSelector(state => state.cart);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin({ email, password }));
    }

    const guestHandler = (e) => {
        e?.preventDefault();
        console.log('redirect: ', redirect);
        redirect ? history.push(redirect) : history.push('/')
    }

    return (
        <FormContainer>
            <h3>{t('login')}</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Card>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>{t('email-address')}</Form.Label>
                            <Form.Control type='email' placeholder={t('enter-email')} value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control type='password' placeholder={t('enter-password')} value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>{t('login')}</Button>

                        <Row className="py-3">
                            <Col className="text-left">
                                {
                                    cartItems?.length ? (
                                        <Link to={`/shipping`}>
                                            {t('continue-as-a-guest')}
                                            <i className="fas fa-walking pl-1"></i>
                                        </Link>
                                    ) : (
                                        <Link to={`/`}>
                                            <Button variant="link" size="sm" onClick={() => guestHandler()}>
                                                {t('continue-as-a-guest')}
                                                <i className="fas fa-walking pl-1"></i>
                                            </Button>
                                        </Link>
                                    )
                                }
                            </Col>
                            <Col className="text-right">
                                {t('new-customer')} ? {' '}
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    {t('register')}
                                    <i className="fas fa-sign-in-alt pl-1"></i>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>


        </FormContainer>
    )
}

export default LoginScreen;