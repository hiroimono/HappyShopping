import express from 'express';
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/:id').get(protect, getOrderById);
userRouter.route('/').post(protect, addOrderItems);

export default userRouter;