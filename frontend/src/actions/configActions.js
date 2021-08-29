import axios from 'axios';
import { constants } from '../constants/constant.js';

export const getPayPalScript = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: constants.PAYPAL_CLIENT_ID_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get('/api/config/paypal-client-id', config);

        dispatch({
            type: constants.PAYPAL_CLIENT_ID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: constants.PAYPAL_CLIENT_ID_FAIL,
            payload: message,
        })
    }
}