import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @description Fetch all products
 * @route GET api/products
 * @access public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('Products not found.');
    }
})

/**
 * @description Fetch single products
 * @route GET api/products/:id
 * @access public
 */
const getProductById = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
})

export { getProductById, getProducts };