import express from 'express';
import {
  createBusiness,
  getMyBusiness,
  updateBusiness,
  getBusinessAnalytics,
  getNearbyBusinesses
} from '../controllers/businessController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBusiness);
router.get('/my-business', protect, getMyBusiness);
router.put('/:id', protect, updateBusiness);
router.get('/:id/analytics', protect, getBusinessAnalytics);
router.get('/nearby', getNearbyBusinesses);

export default router;

