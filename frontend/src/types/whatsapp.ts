export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  type: string;
  content: string;
  status: string;
  direction: 'inbound' | 'outbound';
  timestamp: string;
}

export interface WhatsAppContact {
  phone: string;
  name?: string;
  unreadCount?: number;
}
