import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getPaypalClientId } from '../controllers/configController.js'


const configRouter = express.Router();
configRouter.route('/paypal-client-id').get(getPaypalClientId);

export default configRouter;