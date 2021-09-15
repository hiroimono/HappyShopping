import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';

// bootstrap
import { Table, Button } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';

// Actions
import { getMyOrders, cancelOrder } from '../actions/orderActions.js';
import { constants } from '../constants/constant';

const MyOrdersScreen = () => {
    const dispatch = useDispatch();
    const { myOrders, loading, error } = useSelector(state => state.myOrders)
    console.log('myOrders: ', myOrders);
    const { loading: loadingCancel, success: successCancel, error: errorCancel } = useSelector(state => state.orderCancel)

    useEffect(() => {
        if (successCancel) {
            dispatch(getMyOrders())
            dispatch({ type: constants.ORDER_CREATE_RESET })
        } else dispatch(getMyOrders())
    }, [dispatch, successCancel])

    const removeOrder = (id) => dispatch(cancelOrder(id))

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'medium' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return loading || loadingCancel ?
        <Loader /> :
        error || errorCancel ?
            <Message variant='danger'>{error || errorCancel}</Message> :
            <>
                <h3>My Orders:</h3>
                {
                    !myOrders?.length ? (
                        <Message variant="info">
                            You don't have any orders yet.
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
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DATE</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>TOTAL</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>PAID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DELIVERED</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>DETAILS</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle' }}>CANCEL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order._id}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{showDate(order.createdAt)}</td>
                                            <td className="text-right px-2" style={{ verticalAlign: 'middle' }}>{currency(order.totalPrice)}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                {
                                                    order.isPaid ? (
                                                        <>
                                                            <span>{showDate(order.paidAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                {
                                                    order.isDelivered ? (
                                                        <>
                                                            <span>{showDate(order.deliveredAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                <LinkContainer to={`/orders/${order._id}`}>
                                                    <Button className="btn-sm w-100 mr-2" variant='outline-info'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                {
                                                    !order?.isPaid ? (
                                                        <Button className="btn-sm mr-2" variant='outline-danger' onClick={() => removeOrder(order._id)}>
                                                            Cancel
                                                        </Button>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
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

export default MyOrdersScreen

                // <Row>
                //     <Col lg={12}>
                //         <ListGroup variant='flush'>
                //             <ListGroup.Item className='px-0'>
                //                 <h3>My Orders:</h3>
                //                 {!myOrders?.length ? (
                //                     <Message>You've ordered nothing yet.</Message>
                //                 ) : (
                //                     myOrders?.map((order, index) => (
                //                         <Card key={index}>
                //                             <Card.Body>
                //                                 <Card.Title>
                //                                     <h4>Items: </h4>
                //                                 </Card.Title>
                //                                 <ListGroup variant='flush'>
                //                                     {
                //                                         order?.cartItems?.map((item, index) => (
                //                                             <ListGroup.Item key={index} className="my-2 p-2" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                //                                                 <Row className="align-items-center m-0">
                //                                                     <Col xs={2} lg={1} className='px-0'>
                //                                                         <Image src={item.image} alt={item.name} fluid rounded />
                //                                                     </Col>

                //                                                     <Col xs={6} lg={7} className="px-0 p-2">
                //                                                         <Link to={`/products/${item._id}`}>
                //                                                             {item.name}
                //                                                         </Link>
                //                                                     </Col>

                //                                                     <Col xs={4} className="px-0">
                //                                                         {item.qty} x €{item.price} = €{Number(Number(item.qty) * Number(item.price)).toFixed(2)}
                //                                                     </Col>
                //                                                 </Row>
                //                                                 {/* <Row>
                //                                                 <Col className='col-12 mt-2'>
                //                                                     {
                //                                                         item?.isDelivered ?
                //                                                             <Message variant='success'>Paid on {item?.deliveredAt}</Message> :
                //                                                             <Message variant='danger'>Not delivered yet.</Message>
                //                                                     }
                //                                                 </Col>
                //                                                 </Row> */}
                //                                             </ListGroup.Item>
                //                                         ))
                //                                     }
                //                                 </ListGroup>
                //                             </Card.Body>
                //                         </Card>
                //                     )
                //                     )
                //                 )}
                //             </ListGroup.Item>
                //         </ListGroup>
                //     </Col>
                // </Row>