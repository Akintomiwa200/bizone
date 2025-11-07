import express from 'express';
import {
  requestDelivery,
  trackDelivery,
  updateDeliveryStatus,
  findAvailableRiders,
  assignRider
} from '../controllers/deliveryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/request', protect, requestDelivery);
router.get('/:deliveryId/track', trackDelivery);
router.patch('/:deliveryId/status', protect, updateDeliveryStatus);
router.get('/riders', protect, findAvailableRiders);
router.post('/:deliveryId/assign', protect, assignRider);

export default router;

