import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

// bootstrap
import { Row, Table, Button, Modal, Col } from 'react-bootstrap'

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';

// Actions
import { getOrders, cancelOrder as deleteSingleOrder } from '../actions/orderActions.js';

// Custom Hooks
// import useBreakpoint from '../customHooks/useBreakpoint';

// Constants for action types
// import { constants } from '../constants/constant.js';

const AdminOrderListScreen = ({ history, match }) => {
    // const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    // const { width } = useBreakpoint();

    const { orders, loading, error } = useSelector(state => state.orders);
    const { userInfo } = useSelector(state => state.userLogin);
    const { cancelledOrder: deletedOrder, loading: loadingDeleted, error: errorDeleted } = useSelector(state => state.orderCancel);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else if (userInfo?.isAdmin) {
            dispatch(getOrders())
        }
    }, [dispatch, userInfo, history])

    useEffect(() => {
        if (userInfo?.isAdmin && deletedOrder) {
            dispatch(getOrders())
        }
    }, [dispatch, userInfo, deletedOrder])

    const [show, setShow] = useState(false);
    const [orderForDelete, setOrderForDelete] = useState(null);

    const deleteHandlerShow = (user) => {
        setOrderForDelete(user);
        setShow(true)
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            dispatch(deleteSingleOrder(orderForDelete._id));
        }
        setShow(false)
    };

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'medium' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)


    console.log('orders: ', orders);
    console.log('deletedOrder: ', deletedOrder);

    return loading || loadingDeleted ?
        <Loader /> :
        error || errorDeleted ?
            <Message variant='danger'>{error || errorDeleted}</Message> :
            <>
                {/* {showSuccess && <Message variant="success">Order edited successfully.</Message>} */}
                {
                    deletedOrder && <Message variant="success">Order (id: <span>{deletedOrder?._id}</span>) was successfully deleted.</Message>
                }
                <Row>
                    <Col>
                        <h3>Orders By Users:</h3>
                    </Col>
                </Row>
                {
                    !orders?.userOrders?.length ? (
                        <Message variant="info">
                            There is no order yet.
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
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>#</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                    {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER ID</th> */}
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>USER NAME</th>
                                    {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER EMAIL</th> */}
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DATE</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>TOTAL</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>PAID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DELIVERED</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.userOrders?.map((order, index) => (
                                        <tr key={order?._id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?._id}</td>
                                            {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?.user?._id}</td> */}
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?.user?.name}</td>
                                            {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?.user?.email}</td> */}
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{showDate(order?.createdAt)}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{currency(order?.totalPrice)}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                {
                                                    order.isPaid ? (
                                                        <>
                                                            <span>{showDate(order.paidAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                {
                                                    order.isDelivered ? (
                                                        <>
                                                            <span>{showDate(order.deliveredAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                <Button className="btn-sm mr-2" variant='danger' onClick={() => deleteHandlerShow(order)} data-toggle="confirmation">
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
                        <h3> Would you really want to cancel this order? </h3>

                        <Table striped bordered responsive hover className="table-sm mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                    {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER ID</th> */}
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>USER NAME</th>
                                    {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER EMAIL</th> */}
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DATE</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>TOTAL</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>PAID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?._id}</td>
                                    {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?.user?._id}</td> */}
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?.user?.name}</td>
                                    {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?.user?.email}</td> */}
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{showDate(orderForDelete?.createdAt)}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{currency(orderForDelete?.totalPrice)}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                        {
                                            orderForDelete?.isPaid ? (
                                                <>
                                                    <span>{showDate(orderForDelete?.paidAt)}</span>
                                                    <i className="fas fa-check ml-2 text-success"></i>
                                                </>
                                            ) : <i className="fas fa-times text-danger"></i>
                                        }
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                        {
                                            orderForDelete?.isDelivered ? (
                                                <>
                                                    <span>{showDate(orderForDelete?.deliveredAt)}</span>
                                                    <i className="fas fa-check ml-2 text-success"></i>
                                                </>
                                            ) : <i className="fas fa-times text-danger"></i>
                                        }
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

export default AdminOrderListScreen
