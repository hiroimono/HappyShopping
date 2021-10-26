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

/** i18n */
import { useTranslation } from 'react-i18next'

const AdminUserEditScreen = ({ match, history }) => {
    const { t } = useTranslation();

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
        }
    }, [history, userInfo])

    useEffect(() => {
        dispatch({ type: constants.USER_DETAILS_RESET })
    }, [dispatch])

    useEffect(() => {
        if (!user || !user.name) {
            dispatch(getUserDetails(match?.params.id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, match?.params.id, user])

    useEffect(() => {
        if (success) {
            history.push('/admin/userlist')
        }
        return () => {
            (success || errorEdit) && dispatch({ type: constants.USER_DETAILS_RESET });
        }
    }, [dispatch, errorEdit, history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editUser({ id: user._id, name, email, isAdmin }));
    }

    return (
        <FormContainer>
            <h3 className="mb-2">{t('edit-user')}</h3>
            {loading ? (
                <Loader />
            ) : error || errorEdit ? (
                <Message variant='danger'>{error || errorEdit}</Message>
            ) : (
                <Card>
                    <Card.Body className="p-2">
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>{t('name-and-surname')}</Form.Label>
                                <Form.Control type='text' placeholder={t('enter-your-name-and-surname')} value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>{t('email-address')}</Form.Label>
                                <Form.Control type='email' placeholder={t('enter-email')} value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="isAdmin">
                                <Form.Label>{t('permission-level')}</Form.Label>
                                <Form.Check type="checkbox" label='Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                                <Form.Check type="checkbox" label={t('user')} checked={!isAdmin} onChange={e => setIsAdmin(!e.target.checked)} />
                            </Form.Group>

                            <Button type='submit' variant='primary' className="btn-block">{t('update')}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </FormContainer>
    )
}

export default AdminUserEditScreen
