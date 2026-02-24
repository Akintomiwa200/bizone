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
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * 2️⃣ POST → Receive WhatsApp messages
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("WhatsApp Webhook:", JSON.stringify(body, null, 2));

    // Example: Access incoming message
    const message =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
      console.log("Incoming message:", message.text?.body);
      // TODO: Save message to DB
      // TODO: Trigger auto-reply
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}