export const WHATSAPP_CONFIG = {
  enabled: true,
  maxMessageLength: 4096,
  defaultPageSize: 50,
  templateLanguage: 'en',
} as const;

export type WhatsAppConfig = typeof WHATSAPP_CONFIG;
