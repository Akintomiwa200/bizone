import express from 'express';
import {
  sendMessage,
  getMessages,
  getContacts,
  getTemplates,
  createTemplate,
  deleteTemplate,
  getBusinessProfile,
  updateBusinessProfile,
  verifyWebhook,
  handleWebhook,
  markAsRead
} from '../controllers/whatsappController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Webhook routes (public)
router.get('/webhook', verifyWebhook);
router.post('/webhook', handleWebhook);

// Protected routes
router.post('/messages', protect, sendMessage);
router.get('/messages', protect, getMessages);
router.get('/contacts', protect, getContacts);
router.get('/templates', protect, getTemplates);
router.post('/templates', protect, createTemplate);
router.delete('/templates/:templateName', protect, deleteTemplate);
router.get('/business-profile', protect, getBusinessProfile);
router.patch('/business-profile', protect, updateBusinessProfile);
router.post('/chats/:phone/read', protect, markAsRead);

export default router;

