import express from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid, getUserOrders, removeOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/myorders').get(protect, getUserOrders);
userRouter.route('/:id/pay').put(protect, updateOrderToPaid);
userRouter.route('/:id').get(protect, getOrderById);
userRouter.route('/:id').delete(protect, removeOrderItems);
userRouter.route('/').post(protect, addOrderItems);

export default userRouter;