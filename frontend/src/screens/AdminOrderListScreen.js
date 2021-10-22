import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

// bootstrap
import { Table, Button, Modal, OverlayTrigger, Popover, Accordion, Card, Pagination, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap'

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
    const [step0, setStep0] = useState(15);
    const [total0, setTotal0] = useState('');
    const [numArr0, setNumArr0] = useState([]);
    const [index0, setIndex0] = useState(0);
    const [step1, setStep1] = useState(15);
    const [total1, setTotal1] = useState('');
    const [numArr1, setNumArr1] = useState([]);
    const [index1, setIndex1] = useState(0);

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([1, 0]);
    const [orderForDelete, setOrderForDelete] = useState(null);

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

    useEffect(() => {
        if (orders) {
            if (orders?.userOrders) {
                setTotal0(orders?.userOrders?.length);
                setNumArr0(builtPaginatorNumArr(orders?.userOrders?.length, step0))
            }
            if (orders?.visitorOrders) {
                setTotal1(orders?.visitorOrders?.length);
                setNumArr1(builtPaginatorNumArr(orders?.visitorOrders?.length, step1))
            }
        }
    }, [orders, step0, step1])

    const builtPaginatorNumArr = (num, step) => {
        let arr = []
        for (let i = 1; i <= num; i++) {
            if (i >= step) {
                if (!(i % step)) {
                    arr.push(i)
                    if (num - i < step) {
                        if (num - i) {
                            arr.push(i + step);
                            return arr
                        } else {
                            return arr
                        }
                    }
                }
            } else {
                if (num === i) {
                    arr.push(step)
                    return arr
                }
            }
        }
    }

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

    const selectedTabHandler = (index) => {
        setSelected(selected => selected.map((tab, i) => i === index ? 1 : 0))
    }

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'medium' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return loading || loadingDeleted ?
        <Loader /> :
        error || errorDeleted ?
            <Message variant='danger'>{error || errorDeleted}</Message> :
            <>
                {/* {showSuccess && <Message variant="success">Order edited successfully.</Message>} */}
                {
                    deletedOrder && <Message variant="success">Order (id: <span>{deletedOrder?._id}</span>) was successfully deleted.</Message>
                }

                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header className="border-0 d-flex p-0 m-0">
                            <Accordion.Toggle eventKey="0" className="flex-grow-1 border-0 p-3 w-100" onClick={() => selectedTabHandler(0)} style={{
                                backgroundColor: selected[0] ? '#cccccc' : '#eeeeee'
                            }}>
                                <h4 className="mb-0">Orders By Users:</h4>
                            </Accordion.Toggle>

                            <Accordion.Toggle eventKey="1" className="flex-grow-1 border-0 p-3 w-100" onClick={() => selectedTabHandler(1)} style={{
                                backgroundColor: selected[1] ? '#cccccc' : '#eeeeee'
                            }}>
                                <h4 className="mb-0">Orders By Guests:</h4>
                            </Accordion.Toggle>
                            {/* <h4 className="mb-0">Orders By Users:</h4> */}
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="m-0 p-0 border-0">

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
                                        <>
                                            {
                                                step0 > 15 && (
                                                    <Row>
                                                        <Col className="col d-flex justify-content-center my-3 py-0">

                                                            <Pagination size="sm" className="mb-0">
                                                                <Pagination.First onClick={() => setIndex0(0)} />
                                                                <Pagination.Prev onClick={() => setIndex0(index0 > 0 ? index0 - 1 : index0)} />
                                                                {
                                                                    numArr0?.map((num, i) => <Pagination.Item key={i} active={i === index0 ? true : false} onClick={() => setIndex0(i)}>{i + 1}</Pagination.Item>)
                                                                }
                                                                <Pagination.Next onClick={() => setIndex0((index0 < Number.parseInt(total0 / step0) && (total0 % step0)) ? index0 + 1 : index0)} />
                                                                <Pagination.Last onClick={() => setIndex0((total0 % step0) ? Number.parseInt(total0 / step0) : Number.parseInt(total0 / step0) - 1)} />
                                                                {/* <Pagination.Ellipsis /> */}
                                                            </Pagination>

                                                            <DropdownButton size="sm" id="dropdown-basic-button" className="mx-1" variant="info" title={step0}>
                                                                {
                                                                    builtPaginatorNumArr(total0, 5) && builtPaginatorNumArr(total0, 5).map(step => (
                                                                        <Dropdown.Item key={step} onClick={(e) => { setStep0(step); setIndex0(0) }}>
                                                                            {step}
                                                                        </Dropdown.Item>
                                                                    ))
                                                                }
                                                            </DropdownButton>

                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                            <Table striped bordered responsive hover className="table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>#</th>
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                                        {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER ID</th> */}
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>USER</th>
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

                                                            (step0 * index0 <= index && index < step0 * (index0 + 1)) &&
                                                            <tr key={order?._id}>
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?._id}</td>
                                                                {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?.user?._id}</td> */}
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={
                                                                        <Popover id="popover-basic">
                                                                            <Popover.Title as="h3">Info</Popover.Title>
                                                                            <Popover.Content>
                                                                                <table>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            {order?.user?._id && <th className="text-bold pr-2">ID:</th>}
                                                                                            {order?.user?._id && <td>{order.user._id}</td>}
                                                                                        </tr>
                                                                                        <tr>
                                                                                            {order?.user?.name && <th className="text-bold pr-2">Name:</th>}
                                                                                            {order?.user?.name && <td>{order.user.name}</td>}
                                                                                        </tr>
                                                                                        <tr>
                                                                                            {order?.user?.email && <th className="text-bold pr-2">Email:</th>}
                                                                                            {order?.user?.email && <td>{order.user.email}</td>}
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </Popover.Content>
                                                                        </Popover>
                                                                    }>
                                                                        <LinkContainer to={`/admin/useredit/${order?.user?._id}/edit`}>
                                                                            <Button className="btn-sm border-0 w-100 mr-2" variant='outline-info'>
                                                                                {order?.user?.name}
                                                                            </Button>
                                                                        </LinkContainer>
                                                                    </OverlayTrigger>
                                                                </td>
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
                                                                    <LinkContainer to={`/orders/${order._id}`}>
                                                                        <Button className="btn-sm mr-2" variant='outline-info'>
                                                                            <i className='fas fa-edit'></i>
                                                                        </Button>
                                                                    </LinkContainer>
                                                                    <Button className="btn-sm" variant='danger' onClick={() => deleteHandlerShow(order)} data-toggle="confirmation">
                                                                        <i className='fas fa-trash'></i>
                                                                    </Button>
                                                                </td>
                                                            </tr>

                                                        ))
                                                    }
                                                </tbody>
                                            </Table >

                                            <Row>
                                                <Col className="col d-flex justify-content-center my-3 py-0">

                                                    <Pagination size="sm" className="mb-0">
                                                        <Pagination.First onClick={() => setIndex0(0)} />
                                                        <Pagination.Prev onClick={() => setIndex0(index0 > 0 ? index0 - 1 : index0)} />
                                                        {
                                                            numArr0?.map((num, i) => <Pagination.Item key={i} active={i === index0 ? true : false} onClick={() => setIndex0(i)}>{i + 1}</Pagination.Item>)
                                                        }
                                                        <Pagination.Next onClick={() => setIndex0((index0 < Number.parseInt(total0 / step0) && (total0 % step0)) ? index0 + 1 : index0)} />
                                                        <Pagination.Last onClick={() => setIndex0((total0 % step0) ? Number.parseInt(total0 / step0) : Number.parseInt(total0 / step0) - 1)} />
                                                        {/* <Pagination.Ellipsis /> */}
                                                    </Pagination>

                                                    <DropdownButton size="sm" id="dropdown-basic-button" className="mx-1" variant="info" title={step0}>
                                                        {
                                                            builtPaginatorNumArr(total0, 5) && builtPaginatorNumArr(total0, 5).map(step => (
                                                                <Dropdown.Item key={step} onClick={(e) => setStep0(step)}>
                                                                    {step}
                                                                </Dropdown.Item>
                                                            ))
                                                        }
                                                    </DropdownButton>

                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body className="m-0 p-0 border-0">

                                {
                                    !orders?.visitorOrders?.length ? (
                                        <Message variant="info">
                                            There is no order yet.
                                            <LinkContainer to='/'>
                                                <Button className="btn-sm ml-3" variant='outline-info'>
                                                    <i className="fas fa-home pr-1"></i> Home
                                                </Button>
                                            </LinkContainer>
                                        </Message>
                                    ) : (
                                        <>
                                            {
                                                step1 > 15 && (
                                                    <Row>
                                                        <Col className="col d-flex justify-content-center my-3 py-0">
                                                            <Pagination size="sm" className="mb-0">
                                                                <Pagination.First onClick={() => setIndex1(0)} />
                                                                <Pagination.Prev onClick={() => setIndex1(index1 > 0 ? index1 - 1 : index1)} />
                                                                {
                                                                    numArr1?.map((num, i) => <Pagination.Item key={i} active={i === index1 ? true : false} onClick={() => setIndex1(i)}>{i + 1}</Pagination.Item>)
                                                                }
                                                                <Pagination.Next onClick={() => setIndex0((index1 < Number.parseInt(total1 / step1) && (total1 % step1)) ? index1 + 1 : index1)} />
                                                                <Pagination.Last onClick={() => setIndex0((total1 % step1) ? Number.parseInt(total1 / step1) : Number.parseInt(total1 / step1) - 1)} />
                                                                {/* <Pagination.Ellipsis /> */}
                                                            </Pagination>

                                                            <DropdownButton size="sm" id="dropdown-basic-button" className="px-1" variant="info" title={step1}>
                                                                {
                                                                    builtPaginatorNumArr(total1, 5) && builtPaginatorNumArr(total1, 5).map(step => (
                                                                        <Dropdown.Item key={step} onClick={(e) => { setStep1(step); setIndex1(0) }}>
                                                                            {step}
                                                                        </Dropdown.Item>
                                                                    ))
                                                                }
                                                            </DropdownButton>
                                                        </Col>
                                                    </Row>
                                                )
                                            }

                                            <Table striped bordered responsive hover className="table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>#</th>
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>ID</th>
                                                        {/* <th className="text-center" style={{ verticalAlign: 'middle' }}>USER ID</th> */}
                                                        <th className="text-center" style={{ verticalAlign: 'middle' }}>GUEST</th>
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
                                                        orders?.visitorOrders?.map((order, index) => (
                                                            (step1 * index1 <= index && index < step1 * (index1 + 1)) &&
                                                            <tr key={order?._id}>
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?._id}</td>
                                                                {/* <td className="text-center" style={{ verticalAlign: 'middle' }}>{order?.user?._id}</td> */}
                                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={
                                                                        <Popover id="popover-basic">
                                                                            <Popover.Title as="h3">Info</Popover.Title>
                                                                            <Popover.Content>
                                                                                <table>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            {order?.visitor?._id && <th className="text-bold pr-2">ID:</th>}
                                                                                            {order?.visitor?._id && <td>{order.visitor._id}</td>}
                                                                                        </tr>
                                                                                        <tr>
                                                                                            {order?.visitor?.name && <th className="text-bold pr-2">Name:</th>}
                                                                                            {order?.visitor?.name && <td>{order.visitor.name}</td>}
                                                                                        </tr>
                                                                                        <tr>
                                                                                            {order?.visitor?.email && <th className="text-bold pr-2">Email:</th>}
                                                                                            {order?.visitor?.email && <td>{order.visitor.email}</td>}
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </Popover.Content>
                                                                        </Popover>
                                                                    }>
                                                                        <LinkContainer to={`/admin/useredit/${order?.visitor?._id}/edit`}>
                                                                            <Button className="btn-sm w-100 mr-2" variant='outline-info'>{order?.visitor?.name}</Button>
                                                                        </LinkContainer>
                                                                    </OverlayTrigger>
                                                                </td>
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
                                                                    <LinkContainer to={`/orders/${order._id}`}>
                                                                        <Button className="btn-sm mr-2" variant='outline-info'>
                                                                            <i className='fas fa-edit'></i>
                                                                        </Button>
                                                                    </LinkContainer>
                                                                    <Button className="btn-sm mr-2" variant='danger' onClick={() => deleteHandlerShow(order)} data-toggle="confirmation">
                                                                        <i className='fas fa-trash'></i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table >

                                            <Row>
                                                <Col className="col d-flex justify-content-center my-3 py-0">
                                                    <Pagination size="sm" className="mb-0">
                                                        <Pagination.First onClick={() => setIndex1(0)} />
                                                        <Pagination.Prev onClick={() => setIndex1(index1 > 0 ? index1 - 1 : index1)} />
                                                        {
                                                            numArr1?.map((num, i) => <Pagination.Item key={i} active={i === index1 ? true : false} onClick={() => setIndex1(i)}>{i + 1}</Pagination.Item>)
                                                        }
                                                        <Pagination.Next onClick={() => setIndex0((index1 < Number.parseInt(total1 / step1) && (total1 % step1)) ? index1 + 1 : index1)} />
                                                        <Pagination.Last onClick={() => setIndex0((total1 % step1) ? Number.parseInt(total1 / step1) : Number.parseInt(total1 / step1) - 1)} />
                                                        {/* <Pagination.Ellipsis /> */}
                                                    </Pagination>

                                                    <DropdownButton size="sm" id="dropdown-basic-button" className="px-1" variant="info" title={step1}>
                                                        {
                                                            builtPaginatorNumArr(total1, 5) && builtPaginatorNumArr(total1, 5).map(step => (
                                                                <Dropdown.Item key={step} onClick={(e) => setStep1(step)}>
                                                                    {step}
                                                                </Dropdown.Item>
                                                            ))
                                                        }
                                                    </DropdownButton>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

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
                                    {orderForDelete?.user && <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?.user?.name}</td>}
                                    {orderForDelete?.visitor && <td className="text-center" style={{ verticalAlign: 'middle' }}>{orderForDelete?.visitor?.name}</td>}
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