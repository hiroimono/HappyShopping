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

const LoginScreen = ({ location, history }) => {
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
        e.preventDefault();
        dispatch(userLogin({ email, password }));
    }

    return (
        <FormContainer>
            <h3>Sign in</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Card>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Sign In</Button>

                        <Row className="py-3">
                            <Col className="text-left">
                                {
                                    cartItems?.length ? (
                                        <Link to={`/shipping`}>
                                            Continue as a Guest
                                            <i className="fas fa-walking pl-1"></i>
                                        </Link>
                                    ) : (
                                        <Link to={`/`}>
                                            <Button variant="link" size="sm" onClick={() => guestHandler()}>
                                                Continue as a Guest
                                                <i className="fas fa-walking pl-1"></i>
                                            </Button>
                                        </Link>
                                    )
                                }
                            </Col>
                            <Col className="text-right">
                                New Customer ? {' '}
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    Register
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