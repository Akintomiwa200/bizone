import { NextRequest, NextResponse } from 'next/server';
import { chatEngine } from '@/lib/ai/chat-engine';
import { getSessionRecord, upsertMessage } from '@/lib/server/chat-session-store';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message, context } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ message: 'sessionId and message are required' }, { status: 400 });
    }

    const session = getSessionRecord(sessionId);
    if (!session) {
      return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      content: message,
      role: 'user' as const,
      timestamp: new Date().toISOString(),
      type: 'text' as const,
    };
    upsertMessage(sessionId, userMessage);

    const aiResult = await chatEngine.processMessage(message, {
      businessId: context?.businessId || 'default-business',
      userId: context?.userId || 'default-user',
      sessionId,
      recentMessages: session.messages.slice(-10),
      userPreferences: {
        language: context?.userPreferences?.language || 'en',
        tone: context?.userPreferences?.tone || 'friendly',
      },
    });

    const assistantMessage = {
      id: `${Date.now()}-assistant`,
      content: aiResult.response,
      role: 'assistant' as const,
      timestamp: new Date().toISOString(),
      type: 'text' as const,
      metadata: {
        intent: aiResult.intent,
        confidence: aiResult.confidence,
        actions: aiResult.actions,
        suggestions: aiResult.suggestions,
      },
    };
    upsertMessage(sessionId, assistantMessage);

    return NextResponse.json({
      message: assistantMessage,
      suggestions: aiResult.suggestions,
      actions: aiResult.actions,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Failed to process chat message' }, { status: 500 });
  }
}
