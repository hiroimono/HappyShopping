import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// actions
import { userRegister, removeUserRegisterErrors } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordOK, setIsPasswordOK] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(state => state.userRegister);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const checkPassword = password => {
        let isEmpty = (password.trim().length && confirmPassword.trim().length) ? true : false;
        setIsPasswordEmpty(isEmpty);
        if (!isPasswordEmpty) {
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if (password.match(passw)) {
                setIsPasswordOK(true);
            } else {
                setIsPasswordOK(false);
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords don\'t match!')
        } else if (!isPasswordOK) {
            setMessage('Password should be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.');
        } else if (!(name && email)) {
            setMessage('Name or Email is missing!');
        } else {
            dispatch(userRegister({ name, email, password }));
        }
    }

    const redirectTo = () => {
        dispatch(removeUserRegisterErrors());
        history.push(redirect ? `/login?redirect=${redirect}` : '/login');
    }

    return (
        <FormContainer>
            <h3>Sign up</h3>
            { message && <Message variant='danger'>{message}</Message>}
            { error && <Message variant='danger'>{error}</Message>}
            { loading && <Loader />}

            <Card>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                </Col>
                                <Col xs="auto" className='d-flex align-items-center'>
                                    {!isPasswordEmpty && (password && (isPasswordOK ? (
                                        <Badge pill variant="success">
                                            <i className="fas fa-thumbs-up text-white"></i>
                                        </Badge>
                                    ) : (
                                        <Badge pill variant="secondary">
                                            <i className="fas fa-thumbs-down text-white"></i>
                                        </Badge>
                                    )))}
                                </Col>
                            </Form.Row>
                            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => { setPassword(e.target.value); checkPassword(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Confirm Password</Form.Label>
                                </Col>
                                <Col xs="auto" className='d-flex align-items-center'>
                                    {!isPasswordEmpty && (confirmPassword && ((password === confirmPassword) ? (
                                        <Badge pill variant="success">
                                            <i className="fas fa-thumbs-up text-white"></i>
                                        </Badge>
                                    ) : (
                                        <Badge pill variant="secondary">
                                            <i className="fas fa-thumbs-down text-white"></i>
                                        </Badge>
                                    )))}
                                </Col>
                            </Form.Row>
                            <Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                            <div>
                                {!isPasswordEmpty && (confirmPassword && ((password === confirmPassword) ? (
                                    <Badge variant='success'>
                                        <i className="fas fa-check mr-1"></i>
                                        Match
                                    </Badge>
                                ) : (
                                    <Badge variant='secondary'>
                                        <i className="fas fa-times mr-1"></i>
                                        Not match
                                    </Badge>
                                )))}
                            </div>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Register</Button>

                        <Row className="py-3">
                            <Col className="text-right">
                                Already have an account ? {' '}
                                <span onClick={redirectTo} style={{ cursor: 'pointer', color: '#e95420' }}>
                                    Login
                                    <i className="fas fa-sign-in-alt pl-1"></i>
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default RegisterScreen
