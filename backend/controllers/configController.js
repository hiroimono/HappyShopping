import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/**
 * @description get paypal-client-id stored in backend .env
 * @route GET api/config/paypal-client-id
 * // @access private
 * @access public
 */
const getPaypalClientId = asyncHandler(async (req, res) => {
    if (process.env.PAYPAL_CLIENT_ID) {
        res.json(process.env.PAYPAL_CLIENT_ID);
    } else {
        res.status(404);
        throw new Error('Paypal account not found.');
    }
})

export { getPaypalClientId }