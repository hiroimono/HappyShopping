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
        case constants.ORDER_CREATE_RESET:
            return {
                loading: false
            }

        default:
            return state
    }
}

export const orderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_CANCEL_REQUEST:
            return {
                loading: true
            }
        case constants.ORDER_CANCEL_SUCCESS:
            return {
                loading: false,
                success: true,
                cancelledOrder: action?.payload?.removedOrder
            }
        case constants.ORDER_CANCEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case constants.ORDER_CANCEL_RESET:
            return {}

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

export const myOrdersReducer = (state = { myOrders: [] }, action) => {
    switch (action.type) {
        case constants.MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                myOrders: action.payload
            }
        case constants.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case constants.MY_ORDERS_RESET:
            return {
                myOrder: []
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

export const orderPayAdminReducer = (state = { loading: false, success: false }, action) => {
    switch (action.type) {
        case constants.ORDER_PAY_ADMIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.ORDER_PAY_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case constants.ORDER_PAY_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case constants.ORDER_PAY_ADMIN_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        default:
            return state
    }
}

export const orderDeliverReducer = (state = { loading: false, success: false }, action) => {
    switch (action.type) {
        case constants.ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case constants.ORDER_DELIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case constants.ORDER_DELIVER_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        default:
            return state
    }
}

export const orderNotDeliverReducer = (state = { loading: false, success: false }, action) => {
    switch (action.type) {
        case constants.ORDER_NOT_DELIVER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.ORDER_NOT_DELIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case constants.ORDER_NOT_DELIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case constants.ORDER_NOT_DELIVER_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        default:
            return state
    }
}

export const ordersReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case constants.ORDER_LIST_REQUEST:
            return { ...state, loading: true }
        case constants.ORDER_LIST_SUCCESS:
            return { ...state, loading: false, orders: action.payload }
        case constants.ORDER_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}