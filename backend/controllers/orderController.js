import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Visitor from '../models/visitorModel.js';

/**
 * @description Create new order
 * @route POST api/orders
 * @access private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
    const { cartItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!cartItems?.length) {
        res.status(400);
        throw new Error('No order items')
    } else if (!req?.user?._id) {
        res.status(400);
        throw new Error('User did not found!')
    }

    const order = new Order({
        cartItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

/**
 * @description Create new order by visitor
 * @route POST api/orders/visitor-order
 * @access public
 */
export const addVisitorOrderItems = asyncHandler(async (req, res) => {
    const { visitor, cartItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    let visitorFound = await Visitor.findOne({ "email": visitor.email })
    let order;

    if (!cartItems?.length) {
        res.status(400);
        throw new Error('No order items')
    } else if (visitorFound?._id) {
        await visitorFound.updateOne({ "name": visitor.name })
        let visitorUpdated = await Visitor.findOne({ "email": visitor.email })

        order = new Order({
            cartItems, visitor: visitorUpdated._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    } else {
        const newVisitor = await Visitor.create({
            "name": visitor.name,
            "email": visitor.email
        });

        order = new Order({
            cartItems, visitor: newVisitor._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

/**
 * @description Delete an order
 * @route DELETE api/orders/:id
 * @access private
 */
export const removeOrderItems = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: 'Order removed', removedOrder: order })
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/**
 * @description get Order By Id
 * @route GET api/orders/:id
 * @access private
 */
export const getOrderById = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

/**
 * @description get Visitor Order By Id
 * @route GET api/orders/visitor-order/:id 
 * @access public
 */
export const getVisitorOrderById = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id).populate('visitor', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

/**
 * @description get User's Orders
 * @route GET api/orders/myorders
 * @access private
 */
export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
})

/**
 * @description get All Orders
 * @route GET api/orders/
 * @access private/admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    const userOrders = await Order.find({ 'user': { $exists: true } }).populate('user', 'id name email');
    const visitorOrders = await Order.find({ 'visitor': { $exists: true } }).populate('visitor', 'id name email');

    res.json({ userOrders, visitorOrders });
})

/**
 * @description update Order to be paid
 * @route GET api/orders/:id/pay
 * @access public
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
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

/**
 * @description update Order to be paid by Admin
 * @route GET api/orders/:id/pay-admin
 * @access private/admin
 */
export const updateOrderToPaidAdmin = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentByAdmin = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

/**
 * @description update Order to be NOT paid by Admin
 * @route GET api/orders/:id/pay-admin-not
 * @access private/admin
 */
export const updateOrderToNotPaidAdmin = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = false;
        order.paidAt = Date.now();
        order.paymentByAdmin = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

/**
 * @description update Order to be delivered
 * @route GET api/orders/:id/deliver
 * @access private/admin
 */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})

/**
 * @description update Order to be not delivered
 * @route GET api/orders/:id/not-deliver
 * @access private/admin
 */
export const updateOrderToNotDelivered = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = false;
        order.deliveredAt = null;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
})