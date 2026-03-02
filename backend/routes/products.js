import express from 'express';
import multer from 'multer';
import {
  getBusinessProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  uploadProductImage
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/business/:businessId', getBusinessProducts);
router.get('/:productId', getProduct);
router.post('/upload', protect, upload.single('image'), uploadProductImage);
router.post('/', protect, createProduct);
router.put('/:productId', protect, updateProduct);
router.delete('/:productId', protect, deleteProduct);

export default router;
