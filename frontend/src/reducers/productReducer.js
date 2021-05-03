import { productConstants } from '../constants/productConstant.js';

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case productConstants.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case productConstants.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case productConstants.SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case productConstants.SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case productConstants.SINGLE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

/* For Basic Version State */
export const reducer = (state, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case productConstants.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case productConstants.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }

        case productConstants.SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case productConstants.SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case productConstants.SINGLE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}