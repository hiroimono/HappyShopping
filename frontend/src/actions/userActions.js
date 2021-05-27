import axios from 'axios'
import { constants } from '../constants/constant.js'

export const userRegister = (userRegisterInfo) => async (dispatch) => {
    try {
        dispatch({ type: constants.USER_REGISTER_REQUEST });
        const config = { headers: { 'Content-Type': 'Application/json' } };
        const { data } = await axios.post(`/api/users/register`, userRegisterInfo, config);
        console.log('data: ', data);
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