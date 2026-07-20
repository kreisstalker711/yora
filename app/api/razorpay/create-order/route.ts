import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payment gateway is not configured yet. Add Razorpay keys to .env.local." },
      { status: 503 },
    );
  }

  const { amountINR } = await request.json();
  if (typeof amountINR !== "number" || amountINR <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amountINR * 100),
      currency: "INR",
      receipt: `yora_${Date.now()}`,
    });
    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch {
    return NextResponse.json({ error: "Could not create payment order." }, { status: 502 });
  }
}
