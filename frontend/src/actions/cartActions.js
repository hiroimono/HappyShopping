import axios from 'axios';
import { constants } from '../constants/constant.js';
import { setLocal } from '../localStorage.js';

export const addProductToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: constants.CART_ADD_ITEM,
            payload: {
                _id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        setLocal('cartItems', getState().cart.cartItems);
    } catch (error) {
        // dispatch({
        //     type: constants.PRODUCT_LIST_FAILED,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message
        // })
    }
}

export const removeProductFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: constants.CART_REMOVE_ITEM,
        payload: {
            id: id
        }
    })
    setLocal('cartItems', getState().cart.cartItems);
}

export const saveShippingAddress = (shippingData) => async (dispatch) => {
    dispatch({
        type: constants.CART_SAVE_USER_SHIPPING_ADDRESS,
        payload: shippingData
    });

    localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({
        type: constants.CART_SAVE_USER_PAYMENT_METHOD,
        payload: paymentMethod
    });

    // localStorage.setItem('userPaymentMethod', JSON.stringify(paymentMethod))
}