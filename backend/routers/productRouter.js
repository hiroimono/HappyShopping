import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, getProductById, deleteSingleProduct, updateProductById } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.route('/').get(getProducts);
productRouter.route('/:id').get(getProductById).delete(protect, admin, deleteSingleProduct).put(protect, admin, updateProductById)

export default productRouter;