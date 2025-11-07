import { whatsappService } from '../services/whatsappService.js';
import Business from '../models/Business.js';

// @desc    Send WhatsApp message
// @route   POST /api/whatsapp/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { to, type, content, mediaUrl, templateName, templateParameters } = req.body;
    const businessId = req.user.business || req.user._id;

    // Get user's business
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    let result;

    switch (type) {
      case 'text':
        result = await whatsappService.sendTextMessage(to, content, business._id);
        break;
      case 'template':
        if (!templateName) {
          return res.status(400).json({
            success: false,
            message: 'Template name is required for template messages'
          });
        }
        result = await whatsappService.sendTemplateMessage(
          to,
          templateName,
          'en',
          templateParameters || [],
          business._id
        );
        break;
      case 'image':
      case 'video':
      case 'document':
      case 'audio':
        if (!mediaUrl) {
          return res.status(400).json({
            success: false,
            message: 'Media URL is required for media messages'
          });
        }
        result = await whatsappService.sendMediaMessage(to, mediaUrl, type, content, business._id);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid message type'
        });
    }

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// @desc    Get WhatsApp messages
// @route   GET /api/whatsapp/messages
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { contact, page = 1, limit = 50 } = req.query;
    const businessId = req.user.business || req.user._id;

    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    if (contact) {
      // Get messages for specific contact
      const result = await whatsappService.getMessages(
        business._id,
        contact,
        { page: parseInt(page), limit: parseInt(limit) }
      );
      res.json({
        success: true,
        data: result
      });
    } else {
      // Get all chats
      const result = await whatsappService.getChats(
        business._id,
        { page: parseInt(page), limit: parseInt(limit) }
      );
      res.json({
        success: true,
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// @desc    Get WhatsApp contacts
// @route   GET /api/whatsapp/contacts
// @access  Private
export const getContacts = async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const contacts = await whatsappService.getContacts(business._id);

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// @desc    Get WhatsApp templates
// @route   GET /api/whatsapp/templates
// @access  Private
export const getTemplates = async (req, res) => {
  try {
    const templates = await whatsappService.getTemplates();

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching templates',
      error: error.message
    });
  }
};

// @desc    Create WhatsApp template
// @route   POST /api/whatsapp/templates
// @access  Private
export const createTemplate = async (req, res) => {
  try {
    const template = await whatsappService.createTemplate(req.body);

    res.json({
      success: true,
      message: 'Template created successfully',
      data: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating template',
      error: error.message
    });
  }
};

// @desc    Delete WhatsApp template
// @route   DELETE /api/whatsapp/templates/:templateName
// @access  Private
export const deleteTemplate = async (req, res) => {
  try {
    const { templateName } = req.params;
    await whatsappService.deleteTemplate(templateName);

    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting template',
      error: error.message
    });
  }
};

// @desc    Get business profile
// @route   GET /api/whatsapp/business-profile
// @access  Private
export const getBusinessProfile = async (req, res) => {
  try {
    const profile = await whatsappService.getBusinessProfile();

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching business profile',
      error: error.message
    });
  }
};

// @desc    Update business profile
// @route   PATCH /api/whatsapp/business-profile
// @access  Private
export const updateBusinessProfile = async (req, res) => {
  try {
    const result = await whatsappService.updateBusinessProfile(req.body);

    res.json({
      success: true,
      message: 'Profile update requested',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating business profile',
      error: error.message
    });
  }
};

// @desc    Webhook verification
// @route   GET /api/whatsapp/webhook
// @access  Public
export const verifyWebhook = async (req, res) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const result = whatsappService.verifyWebhook(mode, token, challenge);

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying webhook',
      error: error.message
    });
  }
};

// @desc    Handle webhook events
// @route   POST /api/whatsapp/webhook
// @access  Public
export const handleWebhook = async (req, res) => {
  try {
    // Acknowledge webhook immediately
    res.status(200).send('OK');

    // Process webhook asynchronously
    whatsappService.processWebhook(req.body).catch(error => {
      console.error('Error processing webhook:', error);
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing webhook'
    });
  }
};

// @desc    Mark chat as read
// @route   POST /api/whatsapp/chats/:phone/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const { phone } = req.params;
    const business = await Business.findOne({ owner: req.user._id });
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    await whatsappService.markAsRead(business._id, phone);

    res.json({
      success: true,
      message: 'Chat marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking chat as read',
      error: error.message
    });
  }
};

