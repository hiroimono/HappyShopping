import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'

// bootstrap
import { Table, Button, Modal } from 'react-bootstrap'

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';

// Actions
import { getUserList, deleteUser } from '../actions/userActions.js';

// Constants for action types
import { constants } from '../constants/constant.js';

/** i18n */
import { useTranslation, Trans } from 'react-i18next'

const AdminUserListScreen = ({ history }) => {
    const { t } = useTranslation();

    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(state => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);
    const { deletedUser, loading: loadingDeleted, error: errorDeleted } = useSelector(state => state.userDelete);
    const { success, error: errorEdit } = useSelector(state => state.userEdit);

    useEffect(() => {

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else if (userInfo?.isAdmin) {
            dispatch(getUserList())
        }

        if (success) {
            setShowSuccess(true)
        } else if (errorEdit) {
            setShowSuccess(false)
        }

        return () => {
            (success || errorEdit) && dispatch({ type: constants.USER_EDIT_RESET });
        }
    }, [dispatch, userInfo, history, success, errorEdit])

    useEffect(() => {
        if (userInfo?.isAdmin && deletedUser) {
            dispatch(getUserList())
        }
    }, [dispatch, userInfo, deletedUser])

    const [show, setShow] = useState(false);
    const [userForDelete, setUserForDelete] = useState(null);

    const deleteHandlerShow = (user) => {
        setUserForDelete(user);
        setShow(true)
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            dispatch(deleteUser(userForDelete._id));
        }
        setShow(false)
    };

    return loading || loadingDeleted ?
        <Loader /> :
        error || errorDeleted ?
            <Message variant='danger'>{error || errorDeleted}</Message> :
            <>
                <h3 className="mb-2">{t('my-orders')}:</h3>
                {showSuccess && <Message variant="success">{t('user-edited-successfully')}.</Message>}
                {
                    deletedUser && (
                        <Message variant="success">
                            <Trans i18nKey="success-deleted-user">
                                User {deletedUser?.name} with id: {deletedUser?._id} was successfully deleted.
                            </Trans>
                        </Message>
                    )
                }
                {
                    !users?.length ? (
                        <Message variant="info">
                            {t('there-is-no-user-yet')}.
                            <LinkContainer to='/'>
                                <Button className="btn-sm ml-3" variant='outline-info'>
                                    <i className="fas fa-home pr-1"></i> Home
                                </Button>
                            </LinkContainer>
                        </Message>
                    ) : (
                        <Table striped bordered responsive hover className="table-sm">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Id</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Name</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Email</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Admin</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{user._id}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{user.name}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                <a href={`mailto:${user.email}`}>{user.email}</a>
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                {user.isAdmin ? <i className="fas fa-check ml-2 text-success"></i> : <i className="fas fa-times text-danger"></i>}
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                <LinkContainer to={`/admin/useredit/${user._id}/edit`}>
                                                    <Button className="btn-sm mr-2" variant='outline-info'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button className="btn-sm mr-2" variant='danger' onClick={() => deleteHandlerShow(user)} data-toggle="confirmation">
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }

                <Modal show={show} size={'lg'} onHide={() => handleConfirm(false)}>
                    <Modal.Body>
                        <h3> {t('would-you-really-want-to-remove-the-user')}? </h3>

                        <Table striped bordered responsive hover className="table-sm mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Id</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Name</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Email</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{userForDelete?._id}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{userForDelete?.name}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                        <a href={`mailto:${userForDelete?.email}`}>{userForDelete?.email}</a>
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                        {userForDelete?.isAdmin ? <i className="fas fa-check ml-2 text-success"></i> : <i className="fas fa-times text-danger"></i>}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleConfirm(false)}>
                            {t('no')}
                        </Button>
                        <Button variant="primary" onClick={() => handleConfirm(true)}>
                            {t('yes')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
}

export default AdminUserListScreen
