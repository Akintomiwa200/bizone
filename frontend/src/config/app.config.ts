export const APP_CONFIG = {
  name: 'Bizone',
  description: 'Bizone trade, logistics, and payment platform',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@bizone.trade',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+2348000000000',
  locale: 'en-NG',
  currency: 'NGN',
  timezone: 'Africa/Lagos',
} as const;

export type AppConfig = typeof APP_CONFIG;
