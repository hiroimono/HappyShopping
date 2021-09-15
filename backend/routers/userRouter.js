import express from 'express';
import { authUser, getUserProfile, registerNewUser, updateUserProfile, getUsers, getUserById, updateUserById, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').get(protect, admin, getUsers)
userRouter.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUserById)
userRouter.route('/register').post(registerNewUser)
userRouter.route('/login').post(authUser)
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default userRouter;