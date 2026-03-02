import { NextRequest, NextResponse } from "next/server";

/**
 * 1️⃣ GET → Used by Meta to verify webhook
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    try {
      const proxyUrl = new URL('/api/whatsapp/webhook', backendUrl);
      proxyUrl.search = req.nextUrl.search;
      const response = await fetch(proxyUrl.toString(), { method: 'GET', cache: 'no-store' });
      const text = await response.text();
      return new NextResponse(text || challenge, { status: response.status || 200 });
    } catch {
      return new NextResponse(challenge, { status: 200 });
    }
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * 2️⃣ POST → Receive WhatsApp messages
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const proxyUrl = new URL('/api/whatsapp/webhook', backendUrl);
    const response = await fetch(proxyUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const text = await response.text();
    return new NextResponse(text || 'OK', { status: response.status || 200 });
  } catch (error) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
