import { NextResponse } from 'next/server';
import { getSessionRecord } from '@/lib/server/chat-session-store';

interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { sessionId } = await context.params;
  const session = getSessionRecord(sessionId);
  if (!session) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }

  const lastMessage = session.messages[session.messages.length - 1]?.content?.toLowerCase() || '';
  let suggestions = [
    'Show me your best-selling products',
    'How can I track my order?',
    'What are your delivery options?',
  ];

  if (lastMessage.includes('order')) {
    suggestions = ['Check my order status', 'Update delivery address', 'Cancel my order'];
  } else if (lastMessage.includes('product')) {
    suggestions = ['Show new arrivals', 'What are your top products?', 'Any active discount?'];
  }

  return NextResponse.json(suggestions);
}
