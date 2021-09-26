import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Card, Col, Badge } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Constants for action types
import { constants } from '../constants/constant.js';

// actions
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordOK, setIsPasswordOK] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.userDetails);
    console.log('user: ', user);
    const { userInfo } = useSelector(state => state.userLogin);
    console.log('userInfo: ', userInfo);
    const { success } = useSelector(state => state.userProfileUpdate);
    console.log('success: ', success);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: constants.USER_PROFILE_UPDATE_REQUEST })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

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
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    }

    return (
        <FormContainer>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
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

                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </FormContainer>
    )
}

export default ProfileScreen
