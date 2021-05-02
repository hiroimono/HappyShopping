import axios from 'axios'
import { productConstants } from '../constants/productConstant.js'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: productConstants.PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products');

        dispatch({
            type: productConstants.PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}