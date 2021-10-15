import express from 'express';
import { addOrderItems, addVisitorOrderItems, getOrderById, getVisitorOrderById, updateOrderToPaid, getUserOrders, removeOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').post(protect, addOrderItems);
userRouter.route('/visitor-order').post(addVisitorOrderItems);
userRouter.route('/visitor-order/:id').get(getVisitorOrderById);
userRouter.route('/myorders').get(protect, getUserOrders);
userRouter.route('/:id/pay').put(updateOrderToPaid);
userRouter.route('/:id').get(protect, getOrderById);
userRouter.route('/:id').delete(protect, removeOrderItems);

export default userRouter;