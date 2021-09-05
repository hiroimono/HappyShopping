import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'

// bootstrap
import { Table, Button } from 'react-bootstrap'

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';

// Actions
import { getUserList, deleteUser } from '../actions/userActions.js';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector(state => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);
    const { deletedUser, loading: loadingDeleted, error: errorDeleted } = useSelector(state => state.userDelete);
    console.log('userDeleted: ', deletedUser);

    useEffect(() => {
        if (userInfo?.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history])

    useEffect(() => {
        if (userInfo?.isAdmin && deletedUser) {
            dispatch(getUserList())
        }
    }, [dispatch, userInfo, deletedUser])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id));
    }

    return loading || loadingDeleted ?
        <Loader /> :
        error || errorDeleted ?
            <Message variant='danger'>{error || errorDeleted}</Message> :
            <>
                <h3>My Orders:</h3>
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
                                                <LinkContainer to={`/user/${user._id}/edit`}>
                                                    <Button className="btn-sm mr-2" variant='outline-info'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button className="btn-sm mr-2" variant='danger' onClick={() => deleteHandler(user._id)}>
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
            </>
}

export default UserListScreen
