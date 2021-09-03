import axios from 'axios'
import { constants } from '../constants/constant.js'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.ORDER_CREATE_REQUEST,
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

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: constants.ORDER_CREATE_SUCCESS,
            payload: data,
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

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: constants.ORDER_DETAILS_BY_ID_SUCCESS,
            payload: data,
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

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
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