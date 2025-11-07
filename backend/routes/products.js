import express from 'express';
import {
  getBusinessProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/business/:businessId', getBusinessProducts);
router.get('/:productId', getProduct);
router.post('/', protect, createProduct);
router.put('/:productId', protect, updateProduct);
router.delete('/:productId', protect, deleteProduct);

export default router;

