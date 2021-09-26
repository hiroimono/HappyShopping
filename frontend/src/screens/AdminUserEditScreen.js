import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Constants for action types
import { constants } from '../constants/constant.js';

// actions
import { getUserDetails, editUser } from '../actions/userActions';

const AdminUserEditScreen = ({ match, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.userDetails);

    const { userInfo } = useSelector(state => state.userLogin);
    const { success, error: errorEdit } = useSelector(state => state.userEdit);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails(match?.params.id))
            } else if (success) {
                history.push('/admin/userlist')
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        return () => {
            (success || errorEdit) && dispatch({ type: constants.USER_DETAILS_RESET });
        }
    }, [dispatch, history, userInfo, success, user, match?.params.id, errorEdit])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editUser({ id: user._id, name, email, isAdmin }));
    }

    return (
        <FormContainer>
            <h2>Edit User</h2>
            {loading ? (
                <Loader />
            ) : error || errorEdit ? (
                <Message variant='danger'>{error || errorEdit}</Message>
            ) : (
                <Card>
                    <Card.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="isAdmin">
                                <Form.Label>Permission Level</Form.Label>
                                <Form.Check type="checkbox" label='Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                                <Form.Check type="checkbox" label='User' checked={!isAdmin} onChange={e => setIsAdmin(!e.target.checked)} />
                            </Form.Group>

                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </FormContainer>
    )
}

export default AdminUserEditScreen
