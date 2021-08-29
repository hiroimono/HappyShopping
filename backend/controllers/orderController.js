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

/**
 * @description updatw Order to be paid
 * @route GET api/orders/:id/pay
 * @access private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        console.log('req.body: ', req.body);
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

export { addOrderItems, getOrderById, updateOrderToPaid }