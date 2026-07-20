import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/src/lib/firebaseAdmin";
import type { Order } from "@/src/lib/firestore";

export async function createOrderAdmin(order: Omit<Order, "id" | "createdAt" | "status">): Promise<string> {
  if (!adminDb) throw new Error("Firebase admin is not configured.");
  const ref = await adminDb.collection("orders").add({
    ...order,
    status: "confirmed",
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}
