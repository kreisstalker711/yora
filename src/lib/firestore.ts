import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";

export function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Request timed out - please check your connection.")), ms)),
  ]);
}

export interface UserProfile {
  email: string;
  displayName: string;
  phone?: string;
  address?: string;
  createdAt?: unknown;
}

export interface OrderLineItem {
  productId: string;
  slug: string;
  title: string;
  variantSize: string;
  priceINR: number;
  qty: number;
  isSubscription?: boolean;
  subscriptionFrequency?: "monthly" | "bimonthly";
}

export interface Order {
  id?: string;
  uid: string;
  items: OrderLineItem[];
  subtotalINR: number;
  shippingINR: number;
  discountINR?: number;
  couponCode?: string;
  totalINR: number;
  currency: string;
  status: "confirmed";
  deliveryMethod: "delivery" | "pickup";
  shippingAddress?: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  createdAt?: unknown;
}

export interface Review {
  id?: string;
  productId: string;
  uid: string;
  displayName: string;
  rating: number;
  title: string;
  body: string;
  createdAt?: unknown;
}

export interface StoredCartItem {
  productId: string;
  slug: string;
  title: string;
  variantSize: string;
  priceINR: number;
  image: string;
  qty: number;
  isSubscription?: boolean;
  subscriptionFrequency?: "monthly" | "bimonthly";
}

export async function getUserCart(uid: string): Promise<StoredCartItem[]> {
  const snap = await getDoc(doc(db, "users", uid));
  const data = snap.data();
  return (data?.cart as StoredCartItem[] | undefined) ?? [];
}

export async function setUserCart(uid: string, items: StoredCartItem[]): Promise<void> {
  await setDoc(doc(db, "users", uid), { cart: items }, { merge: true });
}

export async function getUserWishlist(uid: string): Promise<string[]> {
  const snap = await getDoc(doc(db, "users", uid));
  const data = snap.data();
  return (data?.wishlist as string[] | undefined) ?? [];
}

export async function setUserWishlist(uid: string, productIds: string[]): Promise<void> {
  await setDoc(doc(db, "users", uid), { wishlist: productIds }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function upsertUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

export async function getOrdersForUser(uid: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("uid", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }));
}

export async function submitReview(review: Omit<Review, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "reviews"), {
    ...review,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }));
}

export async function submitNewsletterSignup(email: string): Promise<void> {
  await addDoc(collection(db, "newsletterSignups"), { email, createdAt: serverTimestamp() });
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  await addDoc(collection(db, "contactSubmissions"), { ...data, createdAt: serverTimestamp() });
}

export async function submitWholesaleInquiry(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
}): Promise<void> {
  await addDoc(collection(db, "wholesaleInquiries"), { ...data, createdAt: serverTimestamp() });
}
