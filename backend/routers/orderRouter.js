import express from 'express';
import { addOrderItems, addVisitorOrderItems, getOrderById, getVisitorOrderById, updateOrderToPaid, updateOrderToPaidAdmin, updateOrderToNotPaidAdmin, updateOrderToDelivered, updateOrderToNotDelivered, getUserOrders, removeOrderItems, getAllOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').get(protect, admin, getAllOrders).post(protect, addOrderItems);
userRouter.route('/visitor-order').post(addVisitorOrderItems);
userRouter.route('/visitor-order/:id').get(getVisitorOrderById);
userRouter.route('/myorders').get(protect, getUserOrders);
userRouter.route('/:id/pay').put(updateOrderToPaid);
userRouter.route('/:id/pay-admin').put(protect, admin, updateOrderToPaidAdmin);
userRouter.route('/:id/pay-admin-not').put(protect, admin, updateOrderToNotPaidAdmin);
userRouter.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
userRouter.route('/:id/not-deliver').put(protect, admin, updateOrderToNotDelivered);
userRouter.route('/:id').get(protect, getOrderById);
userRouter.route('/:id').delete(protect, removeOrderItems);

export default userRouter;