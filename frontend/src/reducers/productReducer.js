import { productConstants } from '../constants/productConstant.js';

export const productReducer = (state = { products: [] }, action) => {
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