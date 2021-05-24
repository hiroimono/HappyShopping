import { combineReducers } from 'redux';
import { productsReducer, productReducer } from './productReducer.js';
import { cartReducer } from './cartReducer.js';
import { userLoginReducer } from './userReducer.js';

export const combinedReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});