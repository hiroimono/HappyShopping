import axios from 'axios'
import { constants } from '../constants/constant.js'
import { userLogout } from './userActions.js'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: constants.PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products');

        dispatch({
            type: constants.PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getSingleProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: constants.SINGLE_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: constants.SINGLE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.SINGLE_PRODUCT_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteSingleProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.DELETE_SINGLE_PRODUCT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: constants.DELETE_SINGLE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.DELETE_SINGLE_PRODUCT_FAILED,
            payload: message
        })
    }
}

export const editSingleProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.PRODUCT_EDIT_REQUEST,
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

        await axios.put(`/api/products/${product.id}`, product, config)

        dispatch({
            type: constants.PRODUCT_EDIT_SUCCESS
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(userLogout())
        }

        dispatch({
            type: constants.PRODUCT_EDIT_FAIL,
            payload: message,
        })
    }
}