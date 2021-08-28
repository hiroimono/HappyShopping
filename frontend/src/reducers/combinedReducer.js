import { combineReducers } from 'redux';
import { productsReducer, productReducer } from './productReducer.js';
import { cartReducer } from './cartReducer.js';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userProfileUpdateReducer
} from './userReducer.js';
import { orderCreateReducer, orderDetailsByIdReducer } from './orderReducer.js'

export const combinedReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetailsById: orderDetailsByIdReducer
});