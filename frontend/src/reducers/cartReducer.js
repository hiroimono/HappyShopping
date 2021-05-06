import { constants } from '../constants/constant.js';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case constants.CART_ADD_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);

            if (existingItem) {
                return { ...state, cartItems: state.cartItems.map(cartItem => cartItem._id === existingItem._id ? item : cartItem) }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case constants.CART_REMOVE_ITEM:
            return { ...state, loading: false, products: action.payload }
        default:
            return state;
    }
}