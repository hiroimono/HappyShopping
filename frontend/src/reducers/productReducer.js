import { constants } from '../constants/constant.js';

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case constants.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case constants.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case constants.SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case constants.SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case constants.SINGLE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

/* For Basic Version State */
export const reducer = (state, action) => {
    switch (action.type) {
        case constants.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case constants.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case constants.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }

        case constants.SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case constants.SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case constants.SINGLE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}