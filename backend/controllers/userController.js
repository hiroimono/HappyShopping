import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const registerNewUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
        res.status(400);
        throw new Error('Account already exists! \nPlease try to login if you have already an account.');
    } else {
        try {
            const user = await User.create({
                name,
                email,
                password
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } catch (error) {
            res.status(400);
            throw new Error('User didn\'t be registered successfully!');
        }
    }
})

/**
 * @description Auth User & Get Token
 * @route POST /api/users/login
 * @access public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const isCorrectPassword = await user.matchPassword(password);
        if (isCorrectPassword) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401);
            throw new Error('Invalid email or password!');
        }
    } else {
        res.status(401);
        throw new Error('There isn\'t any user with this email!');
    }
})

/**
 * @description Get User's Profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    console.log('req.user._id: ', req.user);
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

export { authUser, getUserProfile, registerNewUser }