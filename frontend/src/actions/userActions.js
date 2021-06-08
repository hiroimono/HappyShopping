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

export const userLogin = (loginData) => async (dispatch) => {
    try {
        dispatch({ type: constants.USER_LOGIN_REQUEST });
        const config = { headers: { 'Content-Type': 'Application/json' } };
        const { data } = await axios.post(`/api/users/login`, loginData, config);
        console.log('user: ', data);
        dispatch({
            type: constants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
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
    dispatch({ type: constants.USER_LOGOUT });
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