import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return NextResponse.json(
      { message: "Delivery webhook received successfully", event: body?.event || null },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delivery Webhook Error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
