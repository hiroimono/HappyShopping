import {
    combineReducers
} from 'redux';

import {
    productsReducer,
    productReducer,
    productDeleteReducer,
    productEditReducer,
    productNewAddReducer
} from './productReducer.js';

import {
    cartReducer
} from './cartReducer.js';

import {
    userLoginReducer,
    userAsGuestReducer,
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
    myOrdersReducer,
    ordersReducer
} from './orderReducer.js'

import {
    paypalClientIdReducer
} from './configReducer.js'

export const combinedReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    productNewAdd: productNewAddReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userAsGuest: userAsGuestReducer,
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
    orders: ordersReducer,
    orderPay: orderPayReducer,

    paypalClientId: paypalClientIdReducer
});