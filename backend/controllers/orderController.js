import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/**
 * @description Create new order
 * @route POST api/orders
 * @access private
 */
const addOrderItems = asyncHandler(async (req, res) => {
    const { cartItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!cartItems?.length) {
        res.status(400);
        throw new Error('NO order items')
    } else {
        const order = new Order({
            cartItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

/**
 * @description get Order By Id
 * @route GET api/orders/:id
 * @access private
 */
const getOrderById = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

export { addOrderItems, getOrderById }