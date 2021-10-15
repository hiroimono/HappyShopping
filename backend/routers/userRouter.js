import express from 'express';
import { authUser, getUserProfile, registerNewUser, registerNewVisitor, updateUserProfile, getUsers, getUserById, updateUserById, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/').get(protect, admin, getUsers)
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
userRouter.route('/register').post(registerNewUser)
userRouter.route('/register/visitor').post(registerNewVisitor)
userRouter.route('/login').post(authUser)
userRouter.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUserById)

export default userRouter;