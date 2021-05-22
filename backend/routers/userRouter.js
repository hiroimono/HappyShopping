import express from 'express';
import { authUser, getUserProfile, registerNewUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/new').post(registerNewUser);
userRouter.route('/login').post(authUser);
userRouter.route('/profile').get(protect, getUserProfile);

export default userRouter;