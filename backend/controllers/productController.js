import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @description Fetch all products
 * @route GET api/products
 * @access public
 */
export const getProducts = asyncHandler(async (req, res) => {
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
export const getProductById = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
})

/**
 * @description Delete a product
 * @route DELETE /api/products/delete/:id
 * @access Private/Admin
 */
export const deleteSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const deletedProduct = await product.remove();
    if (deletedProduct) {
        res.json(deletedProduct)
    } else {
        res.status(404);
        throw new Error('Product was not deleted!');
    }
})

/**
 * @description Update Product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
export const updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.image = req.body.image || product.image;

        const updatedUser = await product.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            description: updatedUser.description,
            brand: updatedUser.brand,
            category: updatedUser.category,
            price: updatedUser.price,
            countInStock: updatedUser.countInStock,
            image: updatedUser.image
        })
    } else {
        res.status(404);
        throw new Error('Product not updated!');
    }
})