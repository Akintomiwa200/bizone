import { apiClient } from './client';

export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  type: 'text' | 'image' | 'document' | 'template';
  content: string;
  mediaUrl?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  direction: 'inbound' | 'outbound';
}

export interface WhatsAppTemplate {
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  components: any[];
}

export interface SendMessageData {
  to: string;
  type: 'text' | 'image' | 'template';
  content: string;
  mediaUrl?: string;
  templateName?: string;
  templateParameters?: string[];
}

export interface WhatsAppContact {
  phone: string;
  name?: string;
  isBusiness: boolean;
  lastMessageAt?: string;
}

export const whatsappAPI = {
  async sendMessage(data: SendMessageData): Promise<{ messageId: string; status: string }> {
    return await apiClient.post('/whatsapp/messages', data);
  },

  async getMessages(
    contact?: string,
    page: number = 1,
    limit: number = 50
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(contact && { contact }),
    });
    return await apiClient.get(`/whatsapp/messages?${params}`);
  },

  async getContacts(): Promise<WhatsAppContact[]> {
    return await apiClient.get<WhatsAppContact[]>('/whatsapp/contacts');
  },

  async getTemplates(): Promise<WhatsAppTemplate[]> {
    return await apiClient.get<WhatsAppTemplate[]>('/whatsapp/templates');
  },

  async createTemplate(template: Omit<WhatsAppTemplate, 'name'>): Promise<{ name: string }> {
    return await apiClient.post('/whatsapp/templates', template);
  },

  async deleteTemplate(templateName: string): Promise<void> {
    await apiClient.delete(`/whatsapp/templates/${templateName}`);
  },

  async getBusinessProfile(): Promise<{
    about: string;
    address: string;
    description: string;
    email: string;
    websites: string[];
  }> {
    return await apiClient.get('/whatsapp/business-profile');
  },

  async updateBusinessProfile(profile: Partial<{
    about: string;
    address: string;
    description: string;
    email: string;
    websites: string[];
  }>): Promise<void> {
    await apiClient.patch('/whatsapp/business-profile', profile);
  },

  async webhookVerification(token: string, challenge: string): Promise<{ success: boolean }> {
    return await apiClient.post('/whatsapp/webhook/verify', { token, challenge });
  },
};