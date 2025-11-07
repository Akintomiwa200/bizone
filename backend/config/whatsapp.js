import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// WhatsApp Business API Configuration
const whatsappConfig = {
  apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'bizone_verify_token',
  webhookUrl: process.env.WHATSAPP_WEBHOOK_URL || `${process.env.FRONTEND_URL}/api/webhooks/whatsapp`,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  appId: process.env.WHATSAPP_APP_ID,
  appSecret: process.env.WHATSAPP_APP_SECRET,
};

// Create axios instance for WhatsApp API
const whatsappApiClient = axios.create({
  baseURL: whatsappConfig.apiUrl,
  headers: {
    'Authorization': `Bearer ${whatsappConfig.accessToken}`,
    'Content-Type': 'application/json',
  },
});

export { whatsappConfig, whatsappApiClient };
export default whatsappConfig;

