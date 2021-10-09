import { constants } from '../constants/constant.js';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
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
            return { ...state, cartItems: [...state.cartItems.filter(cartItem => cartItem._id !== action.payload.id)] }

        case constants.CART_ITEMS_RESET:
            localStorage.removeItem('cartItems');
            return { ...state, cartItems: [] }

        case constants.CART_SAVE_USER_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: { ...action.payload } }

        case constants.CART_SAVE_USER_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }

        default:
            return state;
    }
}