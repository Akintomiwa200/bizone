import express from 'express';
import {
  createOrder,
  getBusinessOrders,
  updateOrderStatus,
  getOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/business/:businessId', protect, getBusinessOrders);
router.get('/:orderId', protect, getOrder);
router.patch('/:orderId/status', protect, updateOrderStatus);

export default router;

