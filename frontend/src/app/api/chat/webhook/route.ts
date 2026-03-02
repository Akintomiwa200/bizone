import { NextRequest, NextResponse } from 'next/server';
import { chatEngine } from '@/lib/ai/chat-engine';
import { IntentRecognizer } from '@/lib/ai/intent-recognition';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'analyze-intent') {
      const recognizer = new IntentRecognizer();
      const result = await recognizer.recognize(body.message || '', {
        businessId: 'default-business',
        userId: 'default-user',
        sessionId: 'analysis-session',
        recentMessages: [],
      });
      return NextResponse.json({
        intent: result.intent,
        confidence: result.confidence,
        entities: [],
      });
    }

    if (body.type === 'generate-response') {
      const response = await chatEngine.processMessage(body.prompt || '', {
        businessId: body.context?.businessId || 'default-business',
        userId: body.context?.userId || 'default-user',
        sessionId: body.context?.sessionId || 'generate-session',
        recentMessages: body.context?.recentMessages || [],
        userPreferences: body.context?.userPreferences || { language: 'en', tone: 'friendly' },
      });
      return NextResponse.json({ response: response.response });
    }

    return NextResponse.json({ message: 'Unsupported webhook payload' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
