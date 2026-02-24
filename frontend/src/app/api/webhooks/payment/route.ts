import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Payment Webhook Received:", body);

    // Example: verify webhook signature here if needed
    // const signature = req.headers.get("verif-hash");

    // TODO: Update payment status in your database

    return NextResponse.json(
      { message: "Payment webhook received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Webhook Error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}