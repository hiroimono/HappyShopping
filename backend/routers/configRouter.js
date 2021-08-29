import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPaypalClientId } from '../controllers/configController.js'


const configRouter = express.Router();
configRouter.route('/paypal-client-id').get(protect, getPaypalClientId);

export default configRouter;