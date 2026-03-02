import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

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
    const response = await apiClient.post<ApiEnvelope<{ messageId: string; status: string }>>('/whatsapp/messages', data);
    return response.data;
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
    const response = await apiClient.get<ApiEnvelope<any>>(`/whatsapp/messages?${params}`);
    return response.data;
  },

  async getContacts(): Promise<WhatsAppContact[]> {
    const response = await apiClient.get<ApiEnvelope<WhatsAppContact[]>>('/whatsapp/contacts');
    return response.data || [];
  },

  async getTemplates(): Promise<WhatsAppTemplate[]> {
    const response = await apiClient.get<ApiEnvelope<WhatsAppTemplate[]>>('/whatsapp/templates');
    return response.data || [];
  },

  async createTemplate(template: Omit<WhatsAppTemplate, 'name'>): Promise<{ name: string }> {
    const response = await apiClient.post<ApiEnvelope<{ name: string }>>('/whatsapp/templates', template);
    return response.data;
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
    const response = await apiClient.get<ApiEnvelope<{
      about: string;
      address: string;
      description: string;
      email: string;
      websites: string[];
    }>>('/whatsapp/business-profile');
    return response.data;
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
