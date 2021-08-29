import { constants } from '../constants/constant.js';

export const paypalClientIdReducer = (state = { paypalClientId: null }, action) => {
    switch (action.type) {
        case constants.PAYPAL_CLIENT_ID_REQUEST:
            return {
                ...state,
                success: false
            }
        case constants.PAYPAL_CLIENT_ID_SUCCESS:
            return {
                success: true,
                paypalClientId: action.payload
            }
        case constants.PAYPAL_CLIENT_ID_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload
            }

        default:
            return state
    }
}