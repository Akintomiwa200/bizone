import { useState, useCallback, useMemo } from 'react';
import { whatsappAPI, WhatsAppMessage, WhatsAppContact, WhatsAppTemplate, SendMessageData } from '@/lib/api/whatsapp';
import { whatsappAI } from '@/lib/ai/whatsapp-integration';
import { notificationService } from '@/lib/services/notification-service';

export interface UseWhatsAppReturn {
  messages: WhatsAppMessage[];
  contacts: WhatsAppContact[];
  templates: WhatsAppTemplate[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sendMessage: (data: SendMessageData) => Promise<void>;
  sendTemplateMessage: (to: string, templateName: string, parameters?: string[]) => Promise<void>;
  sendBulkMessages: (contacts: string[], message: string) => Promise<void>;
  fetchMessages: (contact?: string, page?: number, limit?: number) => Promise<void>;
  fetchContacts: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  createTemplate: (template: Omit<WhatsAppTemplate, 'name'>) => Promise<void>;
  deleteTemplate: (templateName: string) => Promise<void>;
  getBusinessProfile: () => Promise<any>;
  updateBusinessProfile: (profile: any) => Promise<void>;
  processIncomingMessage: (phone: string, message: string, businessId: string) => Promise<any>;
  clearError: () => void;
}

export const useWhatsApp = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  const sendMessage = useCallback(async (data: SendMessageData) => {
    setIsLoading(true);
    setError(null);
    try {
      await whatsappAPI.sendMessage(data);
      notificationService.success('Message Sent', 'WhatsApp message has been sent successfully');
      
      // Refresh messages for this contact
      await fetchMessages(data.to);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send WhatsApp message';
      setError(errorMessage);
      notificationService.error('Send Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTemplateMessage = useCallback(async (to: string, templateName: string, parameters: string[] = []) => {
    setIsLoading(true);
    setError(null);
    try {
      await whatsappAPI.sendMessage({
        to,
        type: 'template',
        templateName,
        templateParameters: parameters,
      });
      notificationService.success('Template Sent', 'WhatsApp template message has been sent successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send template message';
      setError(errorMessage);
      notificationService.error('Send Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendBulkMessages = useCallback(async (contactPhones: string[], message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const promises = contactPhones.map(phone =>
        whatsappAPI.sendMessage({
          to: phone,
          type: 'text',
          content: message,
        })
      );

      await Promise.all(promises);
      notificationService.success('Bulk Messages Sent', `${contactPhones.length} messages have been sent successfully`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send bulk messages';
      setError(errorMessage);
      notificationService.error('Bulk Send Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (contact?: string, page: number = 1, limit: number = 50) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await whatsappAPI.getMessages(contact, page, limit);
      setMessages(response.messages);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch WhatsApp messages';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contactsData = await whatsappAPI.getContacts();
      setContacts(contactsData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch WhatsApp contacts';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const templatesData = await whatsappAPI.getTemplates();
      setTemplates(templatesData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch WhatsApp templates';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTemplate = useCallback(async (template: Omit<WhatsAppTemplate, 'name'>) => {
    setIsLoading(true);
    setError(null);
    try {
      await whatsappAPI.createTemplate(template);
      notificationService.success('Template Created', 'WhatsApp template has been created successfully');
      
      // Refresh templates list
      await fetchTemplates();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create WhatsApp template';
      setError(errorMessage);
      notificationService.error('Creation Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTemplates]);

  const deleteTemplate = useCallback(async (templateName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await whatsappAPI.deleteTemplate(templateName);
      notificationService.success('Template Deleted', 'WhatsApp template has been deleted successfully');
      
      // Refresh templates list
      await fetchTemplates();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete WhatsApp template';
      setError(errorMessage);
      notificationService.error('Deletion Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTemplates]);

  const getBusinessProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await whatsappAPI.getBusinessProfile();
      return profile;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch business profile';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBusinessProfile = useCallback(async (profile: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await whatsappAPI.updateBusinessProfile(profile);
      notificationService.success('Profile Updated', 'WhatsApp business profile has been updated successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update business profile';
      setError(errorMessage);
      notificationService.error('Update Failed', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processIncomingMessage = useCallback(async (phone: string, message: string, businessId: string) => {
    try {
      const result = await whatsappAI.processIncomingMessage(phone, message, businessId);
      return result;
    } catch (error: any) {
      console.error('Failed to process incoming message:', error);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized conversation threads
  const conversationThreads = useMemo(() => {
    const threads: { [key: string]: WhatsAppMessage[] } = {};

    messages.forEach(message => {
      const threadKey = message.direction === 'inbound' ? message.from : message.to;
      
      if (!threads[threadKey]) {
        threads[threadKey] = [];
      }
      
      threads[threadKey].push(message);
    });

    // Sort messages in each thread by timestamp
    Object.keys(threads).forEach(threadKey => {
      threads[threadKey].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    });

    return threads;
  }, [messages]);

  // Memoized unread message count
  const unreadCount = useMemo(() => {
    return messages.filter(message => 
      message.direction === 'inbound' && message.status === 'delivered'
    ).length;
  }, [messages]);

  return {
    messages,
    contacts,
    templates,
    isLoading,
    error,
    pagination,
    conversationThreads,
    unreadCount,
    sendMessage,
    sendTemplateMessage,
    sendBulkMessages,
    fetchMessages,
    fetchContacts,
    fetchTemplates,
    createTemplate,
    deleteTemplate,
    getBusinessProfile,
    updateBusinessProfile,
    processIncomingMessage,
    clearError,
  };
};