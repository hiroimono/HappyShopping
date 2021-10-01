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

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case constants.SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case constants.SINGLE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        case constants.SINGLE_PRODUCT_RESET:
            return {}
        default:
            return state;
    }
}

export const productNewAddReducer = (state = { productAdded: null }, action) => {
    switch (action.type) {
        case constants.PRODUCT_NEW_ADD_REQUEST:
            return { ...state, loading: true }
        case constants.PRODUCT_NEW_ADD_SUCCESS:
            return { ...state, loading: false, productAdded: action.payload }
        case constants.PRODUCT_NEW_ADD_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const productEditReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_EDIT_REQUEST:
            return { ...state, loading: true }
        case constants.PRODUCT_EDIT_SUCCESS:
            return { ...state, loading: false, success: true }
        case constants.PRODUCT_EDIT_FAIL:
            return { ...state, loading: false, error: action.payload }
        case constants.PRODUCT_EDIT_RESET:
            return {}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.DELETE_SINGLE_PRODUCT_REQUEST:
            return { ...state }
        case constants.DELETE_SINGLE_PRODUCT_SUCCESS:
            return { success: true, deletedProduct: action.payload }
        case constants.DELETE_SINGLE_PRODUCT_FAILED:
            return { error: action.payload }
        case constants.DELETE_SINGLE_PRODUCT_RESET:
            return { deletedProduct: null }
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