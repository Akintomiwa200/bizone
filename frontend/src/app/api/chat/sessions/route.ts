import { NextRequest, NextResponse } from 'next/server';
import { createSessionRecord, listSessions } from '@/lib/server/chat-session-store';

export async function GET() {
  return NextResponse.json(listSessions());
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json().catch(() => ({ title: 'New Chat' }));
    const created = createSessionRecord(title);
    return NextResponse.json(created.session, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Failed to create session' }, { status: 500 });
  }
}
