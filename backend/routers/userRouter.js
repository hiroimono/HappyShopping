import express from 'express';
import { authUser, getUserProfile, registerNewUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/register').post(registerNewUser);
userRouter.route('/login').post(authUser);
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default userRouter;