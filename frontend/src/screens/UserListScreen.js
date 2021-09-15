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

const UserListScreen = ({ history }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(state => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);
    const { deletedUser, loading: loadingDeleted, error: errorDeleted } = useSelector(state => state.userDelete);
    const { success, error: errorEdit } = useSelector(state => state.userEdit);
    console.log('success: ', success);
    console.log('errorEdit: ', errorEdit);

    useEffect(() => {
        if (userInfo?.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push('/login')
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
                <h3>My Orders:</h3>
                {showSuccess && <Message variant="success">User edited successfully.</Message>}
                {
                    deletedUser && <Message variant="success">User <span>{deletedUser?.name}</span> (id: <span>{deletedUser?._id}</span>) was successfully deleted.</Message>
                }
                {
                    !users?.length ? (
                        <Message variant="info">
                            There is no user yet.
                            <LinkContainer to='/'>
                                <Button className="btn-sm ml-3" variant='outline-info'>
                                    <i className="fas fa-home pr-1"></i> Go to Home
                                </Button>
                            </LinkContainer>
                        </Message>
                    ) : (
                        <Table striped bordered responsive hover className="table-sm">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>NAME</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>EMAIL</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ADMIN</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}></th>
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
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
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
                        <h3> Would you really want to remove the user? </h3>

                        <Table striped bordered responsive hover className="table-sm mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>NAME</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>EMAIL</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ADMIN</th>
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
                            No
                        </Button>
                        <Button variant="primary" onClick={() => handleConfirm(true)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
}

export default UserListScreen
