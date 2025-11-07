import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackAPI
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Local authentication
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.post('/google/callback', googleAuthCallbackAPI);

export default router;

