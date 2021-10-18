import axios from 'axios'
import { constants } from '../constants/constant.js'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.ORDER_CREATE_REQUEST,
        })

        let orderData;

        const {
            userAsGuest: { guestInfo },
        } = getState()

        if (!(guestInfo && order?.visitor)) {
            const {
                userLogin: { userInfo },
            } = getState()

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            const { data } = await axios.post(`/api/orders`, order, config)
            orderData = data;
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(`/api/orders/visitor-order`, order, config)
            orderData = data;
        }


        dispatch({
            type: constants.ORDER_CREATE_SUCCESS,
            payload: orderData,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const cancelOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.ORDER_CANCEL_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.delete(`/api/orders/${id}`, config)

        dispatch({
            type: constants.ORDER_CANCEL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.ORDER_CANCEL_FAIL,
            payload: message,
        })
    }
}

export const getOrderDetailsById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.ORDER_DETAILS_BY_ID_REQUEST,
        })

        let orderDetails;

        const {
            userLogin: { userInfo },
        } = getState()

        if (userInfo) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            const { data } = await axios.get(`/api/orders/${id}`, config)
            orderDetails = data;
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.get(`/api/orders/visitor-order/${id}`, config)
            orderDetails = data;
        }

        dispatch({
            type: constants.ORDER_DETAILS_BY_ID_SUCCESS,
            payload: orderDetails,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.MY_ORDERS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: constants.MY_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.MY_ORDERS_FAIL,
            payload: message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.ORDER_PAY_REQUEST,
        })

        // const {
        //     userLogin: { userInfo },
        // } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        console.log('data: ', data);

        dispatch({
            type: constants.ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get('/api/orders', config);
        console.log('data: ', data);

        dispatch({
            type: constants.ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.ORDER_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}