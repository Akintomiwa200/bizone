import { NextResponse } from 'next/server';
import { deleteSessionRecord, getSessionRecord } from '@/lib/server/chat-session-store';

interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { sessionId } = await context.params;
  const session = getSessionRecord(sessionId);
  if (!session) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }
  return NextResponse.json({
    session: session.session,
    messages: session.messages,
  });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { sessionId } = await context.params;
  const deleted = deleteSessionRecord(sessionId);
  if (!deleted) {
    return NextResponse.json({ message: 'Session not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
