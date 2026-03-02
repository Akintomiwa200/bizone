import { NextResponse } from 'next/server';
import { clearSessionMessages, getSessionRecord } from '@/lib/server/chat-session-store';

interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { sessionId } = await context.params;
  if (!getSessionRecord(sessionId)) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }

  clearSessionMessages(sessionId);
  return NextResponse.json({ success: true });
}
