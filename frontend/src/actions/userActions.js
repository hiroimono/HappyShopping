import axios from 'axios'
import { constants } from '../constants/constant.js'

export const userRegister = (registerData) => async (dispatch) => {
    try {
        dispatch({ type: constants.USER_REGISTER_REQUEST });
        const config = { headers: { 'Content-Type': 'Application/json' } };
        const { data } = await axios.post(`/api/users/register`, registerData, config);
        dispatch({
            type: constants.USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: constants.USER_REGISTER_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userLogin = (loginData, asGuest) => async (dispatch) => {
    try {
        if (!asGuest) {
            dispatch({ type: constants.USER_LOGIN_REQUEST });
            const config = { headers: { 'Content-Type': 'Application/json' } };
            const { data } = await axios.post(`/api/users/login`, loginData, config);
            dispatch({
                type: constants.USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data));
        } else {

        }
    } catch (error) {
        dispatch({
            type: constants.USER_LOGIN_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userLogout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('userPaymentMethod');
    dispatch({ type: constants.USER_LOGOUT });
    dispatch({ type: constants.USER_DETAILS_RESET });
    dispatch({ type: constants.MY_ORDERS_RESET });
    dispatch({ type: constants.USER_LIST_RESET });
    document.location.href = '/login'
}

export const removeUserRegisterErrors = () => (dispatch) => {
    dispatch({ type: constants.REMOVE_USER_REGISTER_ERRORS });
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: constants.USER_DETAILS_SUCCESS,
            payload: data,
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
            type: constants.USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_PROFILE_UPDATE_REQUEST,
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

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: constants.USER_DETAILS_SUCCESS,
            payload: data,
        })
        dispatch({
            type: constants.USER_PROFILE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(userLogout())
        }
        dispatch({
            type: constants.USER_PROFILE_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch({
            type: constants.USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.USER_LIST_FAILED,
            payload: message,
        })
    }
}

export const getUserList_NoLoading = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_LIST_REQUEST_NO_LOADING,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch({
            type: constants.USER_LIST_SUCCESS_NO_LOADING,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.USER_LIST_FAILED_NO_LOADING,
            payload: message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.delete(`/api/users/${id}`, config)

        dispatch({
            type: constants.USER_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.USER_DELETE_FAILED,
            payload: message,
        })
    }
}

export const editUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.USER_EDIT_REQUEST,
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

        await axios.put(`/api/users/${user.id}`, user, config)

        dispatch({
            type: constants.USER_EDIT_SUCCESS
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
            type: constants.USER_EDIT_FAIL,
            payload: message,
        })
    }
}