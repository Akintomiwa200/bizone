import express from 'express';
import {
  initializePayment,
  verifyPayment,
  paymentWebhook
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initialize', initializePayment);
router.post('/verify', verifyPayment);
router.post('/webhook', paymentWebhook);

export default router;

