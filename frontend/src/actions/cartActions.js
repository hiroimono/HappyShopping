import axios from 'axios'
import { constants } from '../constants/constant.js'

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

        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));

    } catch (error) {
        // dispatch({
        //     type: constants.PRODUCT_LIST_FAILED,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message
        // })
    }
}