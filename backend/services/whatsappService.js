import { whatsappConfig, whatsappApiClient } from '../config/whatsapp.js';
import Chat from '../models/Chat.js';
import Business from '../models/Business.js';

export const whatsappService = {
  // Send text message
  async sendTextMessage(to, text, businessId) {
    try {
      const response = await whatsappApiClient.post(
        `/${whatsappConfig.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''), // Remove non-digits
          type: 'text',
          text: {
            body: text
          }
        }
      );

      // Save message to chat
      if (response.data.messages && response.data.messages[0]) {
        const messageId = response.data.messages[0].id;
        await this.saveMessage(businessId, to, {
          messageId,
          from: whatsappConfig.phoneNumberId,
          to,
          type: 'text',
          content: text,
          direction: 'outbound',
          status: 'sent'
        });
      }

      return {
        success: true,
        messageId: response.data.messages?.[0]?.id,
        status: 'sent'
      };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error.response?.data || error.message);
      throw new Error(`Failed to send message: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Send template message
  async sendTemplateMessage(to, templateName, languageCode = 'en', parameters = [], businessId) {
    try {
      const components = [];
      
      if (parameters.length > 0) {
        components.push({
          type: 'body',
          parameters: parameters.map(param => ({
            type: 'text',
            text: param
          }))
        });
      }

      const response = await whatsappApiClient.post(
        `/${whatsappConfig.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''),
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: languageCode
            },
            ...(components.length > 0 && { components })
          }
        }
      );

      // Save message to chat
      if (response.data.messages && response.data.messages[0]) {
        const messageId = response.data.messages[0].id;
        await this.saveMessage(businessId, to, {
          messageId,
          from: whatsappConfig.phoneNumberId,
          to,
          type: 'template',
          content: templateName,
          direction: 'outbound',
          status: 'sent',
          metadata: {
            templateName,
            templateParameters: parameters
          }
        });
      }

      return {
        success: true,
        messageId: response.data.messages?.[0]?.id,
        status: 'sent'
      };
    } catch (error) {
      console.error('Error sending WhatsApp template:', error.response?.data || error.message);
      throw new Error(`Failed to send template: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Send media message
  async sendMediaMessage(to, mediaUrl, mediaType, caption, businessId) {
    try {
      const typeMap = {
        image: 'image',
        video: 'video',
        document: 'document',
        audio: 'audio'
      };

      const payload = {
        messaging_product: 'whatsapp',
        to: to.replace(/\D/g, ''),
        type: typeMap[mediaType] || 'image',
        [typeMap[mediaType] || 'image']: {
          link: mediaUrl,
          ...(caption && { caption })
        }
      };

      const response = await whatsappApiClient.post(
        `/${whatsappConfig.phoneNumberId}/messages`,
        payload
      );

      // Save message to chat
      if (response.data.messages && response.data.messages[0]) {
        const messageId = response.data.messages[0].id;
        await this.saveMessage(businessId, to, {
          messageId,
          from: whatsappConfig.phoneNumberId,
          to,
          type: mediaType,
          content: caption || mediaUrl,
          mediaUrl,
          direction: 'outbound',
          status: 'sent'
        });
      }

      return {
        success: true,
        messageId: response.data.messages?.[0]?.id,
        status: 'sent'
      };
    } catch (error) {
      console.error('Error sending WhatsApp media:', error.response?.data || error.message);
      throw new Error(`Failed to send media: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Get business profile
  async getBusinessProfile() {
    try {
      const response = await whatsappApiClient.get(
        `/${whatsappConfig.phoneNumberId}`
      );

      // Get profile info separately
      const profileResponse = await whatsappApiClient.get(
        `/${whatsappConfig.phoneNumberId}?fields=about,address,description,email,profile_picture_url,websites,vertical`
      );

      return {
        phoneNumber: response.data.display_phone_number,
        phoneNumberId: response.data.id,
        ...profileResponse.data
      };
    } catch (error) {
      console.error('Error getting business profile:', error.response?.data || error.message);
      throw new Error(`Failed to get profile: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Update business profile
  async updateBusinessProfile(profileData) {
    try {
      // WhatsApp API doesn't support updating profile via API directly
      // This would typically require Facebook Business Manager
      // For now, we'll return a success message
      console.log('Profile update requested:', profileData);
      return {
        success: true,
        message: 'Profile update requires Facebook Business Manager access'
      };
    } catch (error) {
      console.error('Error updating business profile:', error);
      throw new Error('Failed to update profile');
    }
  },

  // Get message templates
  async getTemplates() {
    try {
      const response = await whatsappApiClient.get(
        `/${whatsappConfig.phoneNumberId}/message_templates`
      );

      return response.data.data || [];
    } catch (error) {
      console.error('Error getting templates:', error.response?.data || error.message);
      throw new Error(`Failed to get templates: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Create message template (requires WABA business account)
  async createTemplate(templateData) {
    try {
      const response = await whatsappApiClient.post(
        `/${whatsappConfig.businessAccountId}/message_templates`,
        templateData
      );

      return response.data;
    } catch (error) {
      console.error('Error creating template:', error.response?.data || error.message);
      throw new Error(`Failed to create template: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Delete message template
  async deleteTemplate(templateName) {
    try {
      const response = await whatsappApiClient.delete(
        `/${whatsappConfig.phoneNumberId}/message_templates?name=${templateName}`
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting template:', error.response?.data || error.message);
      throw new Error(`Failed to delete template: ${error.response?.data?.error?.message || error.message}`);
    }
  },

  // Save message to database
  async saveMessage(businessId, phoneNumber, messageData) {
    try {
      const chat = await Chat.getOrCreateChat(businessId, phoneNumber);
      await chat.addMessage(messageData);
      return chat;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },

  // Get chat sessions for a business
  async getChats(businessId, options = {}) {
    try {
      const { status = 'active', limit = 50, page = 1 } = options;
      
      const query = { business: businessId, status };
      const skip = (page - 1) * limit;

      const chats = await Chat.find(query)
        .sort({ lastMessageAt: -1 })
        .limit(limit)
        .skip(skip)
        .select('-messages'); // Don't load all messages initially

      const total = await Chat.countDocuments(query);

      return {
        chats,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error getting chats:', error);
      throw error;
    }
  },

  // Get messages for a specific chat
  async getMessages(businessId, phoneNumber, options = {}) {
    try {
      const { limit = 50, page = 1 } = options;
      const skip = (page - 1) * limit;

      const chat = await Chat.findOne({
        business: businessId,
        'contact.phone': phoneNumber
      });

      if (!chat) {
        return {
          messages: [],
          pagination: {
            page,
            limit,
            total: 0,
            pages: 0
          }
        };
      }

      // Get messages with pagination
      const totalMessages = chat.messages.length;
      const messages = chat.messages
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(skip, skip + limit)
        .reverse(); // Return in chronological order

      return {
        messages,
        contact: chat.contact,
        pagination: {
          page,
          limit,
          total: totalMessages,
          pages: Math.ceil(totalMessages / limit)
        }
      };
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  // Get contacts for a business
  async getContacts(businessId) {
    try {
      const chats = await Chat.find({ business: businessId })
        .sort({ lastMessageAt: -1 })
        .select('contact lastMessageAt unreadCount');

      return chats.map(chat => ({
        phone: chat.contact.phone,
        name: chat.contact.name,
        isBusiness: chat.contact.isBusiness,
        lastMessageAt: chat.lastMessageAt,
        unreadCount: chat.unreadCount
      }));
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  },

  // Mark chat as read
  async markAsRead(businessId, phoneNumber) {
    try {
      const chat = await Chat.findOne({
        business: businessId,
        'contact.phone': phoneNumber
      });

      if (chat) {
        await chat.markAsRead();
      }

      return { success: true };
    } catch (error) {
      console.error('Error marking as read:', error);
      throw error;
    }
  },

  // Process incoming webhook
  async processWebhook(webhookData) {
    try {
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value) {
        return { processed: false };
      }

      // Handle messages
      if (value.messages) {
        for (const message of value.messages) {
          await this.handleIncomingMessage(message, value.contacts?.[0]);
        }
      }

      // Handle status updates
      if (value.statuses) {
        for (const status of value.statuses) {
          await this.handleStatusUpdate(status);
        }
      }

      return { processed: true };
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  },

  // Handle incoming message
  async handleIncomingMessage(message, contact) {
    try {
      // Find business by phone number ID
      const business = await Business.findOne({
        'contact.phone': message.to
      });

      if (!business) {
        console.log('Business not found for incoming message');
        return;
      }

      const from = message.from;
      const messageContent = message.text?.body || 
                            message.image?.caption || 
                            message.document?.caption || 
                            'Media message';

      // Save incoming message
      await this.saveMessage(business._id, from, {
        messageId: message.id,
        from,
        to: message.to,
        type: message.type || 'text',
        content: messageContent,
        mediaUrl: message.image?.id || message.document?.id || message.video?.id,
        direction: 'inbound',
        status: 'delivered'
      });

      // Update contact info if available
      if (contact) {
        await Chat.updateOne(
          { business: business._id, 'contact.phone': from },
          {
            $set: {
              'contact.name': contact.profile?.name,
              'contact.isBusiness': contact.wa_id ? true : false
            }
          }
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error handling incoming message:', error);
      throw error;
    }
  },

  // Handle status update
  async handleStatusUpdate(status) {
    try {
      // Update message status in database
      await Chat.updateOne(
        { 'messages.messageId': status.id },
        {
          $set: {
            'messages.$.status': status.status
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error handling status update:', error);
      throw error;
    }
  },

  // Verify webhook (for initial setup)
  verifyWebhook(mode, token, challenge) {
    if (mode === 'subscribe' && token === whatsappConfig.verifyToken) {
      return challenge;
    }
    return null;
  }
};

export default whatsappService;

