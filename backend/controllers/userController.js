import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Visitor from '../models/visitorModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description Register a new user
 * @route POST /api/users/register
 * @access Public
 */
export const registerNewUser = asyncHandler(async (req, res) => {
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
 * @description Register a new visitor
 * @route POST /api/users/register/visitor
 * @access Public
 */
export const registerNewVisitor = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const isVisitorExists = await Visitor.findOne({ email });

    if (isVisitorExists) {
        try {
            await isVisitorExists.updateOne({
                name,
                email
            })

            const visitor = await Visitor.findOne({ email });

            res.status(201).json({
                _id: visitor._id,
                name: visitor.name,
                email: visitor.email
            });
        } catch (error) {
            res.status(400);
            throw new Error('Visitor didn\'t be updated successfully!');
        }
    } else {
        try {
            const visitor = await Visitor.create({
                name,
                email
            });

            res.status(201).json({
                _id: visitor._id,
                name: visitor.name,
                email: visitor.email
            });
        } catch (error) {
            res.status(400);
            throw new Error('Visitor didn\'t be registered successfully!');
        }
    }
})

/**
 * @description Auth User & Get Token
 * @route POST /api/users/login
 * @access public
 */
export const authUser = asyncHandler(async (req, res) => {
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
export const getUserProfile = asyncHandler(async (req, res) => {
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

/**
 * @description Update User's Profile
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        req.body.password ? user.password = req.body.password : null;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

/**
 * @description Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.json(users)
    } else {
        res.status(404);
        throw new Error('Users could not get!');
    }
})

/**
 * @description Get User Details By Id
 * @route GET /api/users/:id
 * @access Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error('Users could not get!');
    }
})

/**
 * @description Delete a user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const deletedUser = await user.remove();
    if (deletedUser) {
        res.json(deletedUser)
    } else {
        res.status(404);
        throw new Error('User was not found!');
    }
})

/**
 * @description Update User
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})