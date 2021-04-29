import express from 'express'
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router()

/**
 * @description Fetch all products
 * @route GET api/products
 * @access public
 */
productRouter.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('Products not found.');
    }
}))

/**
 * @description Fetch single products
 * @route GET api/products/:id
 * @access public
 */
productRouter.get('/:id', asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
}))

export default productRouter;