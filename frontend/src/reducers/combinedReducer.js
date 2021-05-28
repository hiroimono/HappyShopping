import { combineReducers } from 'redux';
import { productsReducer, productReducer } from './productReducer.js';
import { cartReducer } from './cartReducer.js';
import {
    userLoginReducer,
    userRegisterReducer,
} from './userReducer.js';

export const combinedReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});