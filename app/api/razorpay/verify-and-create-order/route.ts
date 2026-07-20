import crypto from "crypto";
import { NextResponse } from "next/server";
import { adminAuth } from "@/src/lib/firebaseAdmin";
import { createOrderAdmin } from "@/src/lib/firestoreAdmin";
import type { OrderLineItem } from "@/src/lib/firestore";

interface VerifyRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  items: OrderLineItem[];
  subtotalINR: number;
  shippingINR: number;
  discountINR?: number;
  couponCode?: string;
  totalINR: number;
  currency: string;
  deliveryMethod: "delivery" | "pickup";
  shippingAddress?: string;
}

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret || !adminAuth) {
    return NextResponse.json(
      { error: "Payment gateway or account verification is not configured yet." },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get("authorization") || "";
  const idToken = authHeader.replace("Bearer ", "");
  if (!idToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  const body: VerifyRequestBody = await request.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    subtotalINR,
    shippingINR,
    discountINR,
    couponCode,
    totalINR,
    currency,
    deliveryMethod,
    shippingAddress,
  } = body;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  try {
    const orderId = await createOrderAdmin({
      uid,
      items,
      subtotalINR,
      shippingINR,
      discountINR,
      couponCode,
      totalINR,
      currency,
      deliveryMethod,
      shippingAddress,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });
    return NextResponse.json({ orderId });
  } catch {
    return NextResponse.json({ error: "Payment succeeded but we could not save your order. Contact support with your payment ID." }, { status: 500 });
  }
}
