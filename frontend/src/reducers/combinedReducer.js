import {
    combineReducers
} from 'redux';

import {
    productsReducer,
    productReducer
} from './productReducer.js';

import {
    cartReducer
} from './cartReducer.js';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userProfileUpdateReducer,
    userListReducer,
    userDeleteReducer,
    userEditReducer
} from './userReducer.js';

import {
    orderCreateReducer,
    orderCancelReducer,
    orderDetailsByIdReducer,
    orderPayReducer,
    myOrdersReducer
} from './orderReducer.js'

import {
    paypalClientIdReducer
} from './configReducer.js'

export const combinedReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    userList: userListReducer,
    userEdit: userEditReducer,
    orderCreate: orderCreateReducer,
    orderCancel: orderCancelReducer,
    orderDetailsById: orderDetailsByIdReducer,
    myOrders: myOrdersReducer,
    orderPay: orderPayReducer,
    paypalClientId: paypalClientIdReducer
});