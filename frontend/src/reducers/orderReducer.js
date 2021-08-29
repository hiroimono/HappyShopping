import { constants } from '../constants/constant.js';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case constants.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case constants.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderDetailsByIdReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case constants.ORDER_DETAILS_BY_ID_REQUEST:
            return {
                loading: true
            }
        case constants.ORDER_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case constants.ORDER_DETAILS_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderPayReducer = (state = { loading: false, success: false }, action) => {
    switch (action.type) {
        case constants.ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case constants.ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case constants.ORDER_PAY_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        default:
            return state
    }
}