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

/** i18n */
import { useTranslation } from 'react-i18next'

const MyOrdersScreen = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { myOrders, loading, error } = useSelector(state => state.myOrders)
    console.log('myOrders: ', myOrders);
    const { loading: loadingCancel, success: successCancel, error: errorCancel } = useSelector(state => state.orderCancel)

    useEffect(() => {
        if (successCancel) {
            dispatch(getMyOrders())
            dispatch({ type: constants.ORDER_CREATE_RESET })
        } else dispatch(getMyOrders())


        return () => {
            if (successCancel || errorCancel) {
                dispatch({ type: constants.ORDER_CANCEL_RESET })
            };
        }
    }, [dispatch, errorCancel, successCancel])

    const removeOrder = (id) => dispatch(cancelOrder(id))

    const showDate = (str) => new Date(str).toLocaleDateString('de-DE', { dateStyle: 'medium' })
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return loading || loadingCancel ?
        <Loader /> :
        error || errorCancel ?
            <Message variant='danger'>{error || errorCancel}</Message> :
            <>
                <h3 className="mb-2">{t('my-orders')}:</h3>
                {
                    !myOrders?.length ? (
                        <Message variant="info">
                            {t('you-dont-have-any-orders-yet')}.
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
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>ID</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('date')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('total')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('paid')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('delivered')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('details')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('cancel')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{order._id}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{showDate(order.createdAt)}</td>
                                            <td className="text-right px-2" style={{ verticalAlign: 'middle' }}>{currency(order.totalPrice)}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                {
                                                    order?.isPaid ? (
                                                        <>
                                                            <span>{showDate(order?.paidAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                {
                                                    order?.isDelivered ? (
                                                        <>
                                                            <span>{showDate(order?.deliveredAt)}</span>
                                                            <i className="fas fa-check ml-2 text-success"></i>
                                                        </>
                                                    ) : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                <LinkContainer to={`/orders/${order._id}`}>
                                                    <Button className="btn-sm w-100 mr-2" variant='outline-info'>
                                                        {t('details')}
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                {
                                                    !order?.isPaid ? (
                                                        <Button className="btn-sm mr-2" variant='outline-danger' onClick={() => removeOrder(order._id)}>
                                                            {t('cancel')}
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