"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { useAuth } from "@/src/context/AuthContext";
import { formatPrice } from "@/src/lib/currency";
import { getCouponByCode, type Coupon } from "@/src/data/coupons";
import type { RazorpaySuccessResponse } from "@/src/types/razorpay";

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();
  const { currency } = useCurrency();
  const { user } = useAuth();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const isFreeShipping = subtotal >= 999 || deliveryMethod === "pickup";
  const shippingFee = subtotal > 0 && !isFreeShipping ? 99 : 0;

  const discountINR = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, shippingFee || appliedCoupon.value)
    : 0;

  const total = Math.max(0, subtotal + shippingFee - discountINR);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const coupon = getCouponByCode(couponInput);
    if (!coupon) {
      setCouponError("That coupon code isn't valid.");
      return;
    }
    if (coupon.minOrderINR && subtotal < coupon.minOrderINR) {
      setCouponError(`This code requires a minimum order of ${formatPrice(coupon.minOrderINR, currency)}.`);
      return;
    }
    setAppliedCoupon(coupon);
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    setPlacingOrder(true);
    setError(null);

    try {
      const idToken = await user.getIdToken();

      const createRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountINR: total }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error || "Could not start payment.");

      const orderItems = items.map((item) => ({
        productId: item.productId,
        slug: item.slug,
        title: item.title,
        variantSize: item.variantSize,
        priceINR: item.priceINR,
        qty: item.qty,
        isSubscription: item.isSubscription,
        subscriptionFrequency: item.subscriptionFrequency,
      }));

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: createData.amount,
        currency: createData.currency,
        name: "Yora",
        description: "Cold-pressed organic oils",
        order_id: createData.id,
        prefill: { name: user.displayName || undefined, email: user.email || undefined },
        theme: { color: "#14322A" },
        modal: {
          ondismiss: () => setPlacingOrder(false),
        },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-and-create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                ...response,
                items: orderItems,
                subtotalINR: subtotal,
                shippingINR: shippingFee,
                discountINR,
                couponCode: appliedCoupon?.code,
                totalINR: total,
                currency,
                deliveryMethod,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || "Payment could not be verified.");
            setOrderId(verifyData.orderId);
            clearCart();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment succeeded but confirming your order failed. Contact support.");
          } finally {
            setPlacingOrder(false);
          }
        },
      });
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting your payment.");
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        YORA
      </div>

      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 animate-fade-in">
        {orderId ? (
          <div className="max-w-md mx-auto text-center space-y-6 card-surface bg-white p-8 sm:p-12">
            <div className="w-16 h-16 bg-accent-soft text-primary rounded-full flex items-center justify-center mx-auto border border-accent/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-semibold text-primary">Payment Successful!</h1>
            <p className="text-ink-muted text-sm leading-relaxed">
              Thank you for supporting organic farming. Your order <span className="font-mono font-bold text-primary">#{orderId.slice(0, 8).toUpperCase()}</span> has been confirmed, and our Udumalpet farm unit is preparing your fresh harvest shipment.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="/account"
                className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-8 py-4 rounded-[var(--radius-md)] transition-all duration-300 uppercase tracking-widest block text-center"
              >
                View Order History
              </a>
              <a
                href="/shop"
                className="border border-ink/15 hover:border-accent text-ink text-xs font-bold px-8 py-4 rounded-[var(--radius-md)] transition-all duration-300 uppercase tracking-widest block text-center"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center space-y-6 max-w-md mx-auto py-12">
            <div className="w-16 h-16 bg-accent-soft text-ink-muted rounded-full flex items-center justify-center mx-auto border border-ink/5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-semibold text-primary">Your Cart is Empty</h1>
            <p className="text-ink-muted text-sm leading-relaxed">
              It looks like you haven&apos;t added any products to your cart yet. Explore our cold-pressed organic collections to start your healthy wellness journey.
            </p>
            <div className="pt-4">
              <a
                href="/shop"
                className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-8 py-4 rounded-[var(--radius-md)] transition-all duration-300 uppercase tracking-widest block text-center"
              >
                Explore Collection
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-left text-primary">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              <div className="lg:col-span-8 space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantSize}`}
                    className="flex flex-col sm:flex-row items-center gap-6 card-surface bg-white p-6 text-center sm:text-left"
                  >
                    <div className="w-24 h-24 bg-cream rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center p-3 border border-ink/5 shrink-0">
                      <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-grow text-center sm:text-left space-y-2">
                      <h4 className="font-serif text-base font-semibold text-primary leading-snug">{item.title}</h4>
                      <p className="text-xs text-ink-muted">{item.variantSize}</p>
                      <p className="text-xs text-accent font-bold">{formatPrice(item.priceINR, currency)} / unit</p>
                      {item.isSubscription && (
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-accent-soft text-primary px-2 py-0.5 rounded-full">
                          Subscribe &amp; Save ({item.subscriptionFrequency})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center justify-between border border-ink/15 rounded-[var(--radius-sm)] overflow-hidden h-10 w-28 bg-white">
                        <button
                          onClick={() => updateQty(item.productId, item.variantSize, -1)}
                          className="px-3 h-full hover:bg-accent-soft text-ink-muted transition font-bold text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.variantSize, 1)}
                          className="px-3 h-full hover:bg-accent-soft text-ink-muted transition font-bold text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right font-bold w-24">
                        <p className="text-sm text-primary">{formatPrice(item.priceINR * item.qty, currency)}</p>
                        <button
                          onClick={() => removeItem(item.productId, item.variantSize)}
                          className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider mt-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery Method */}
                <div className="card-surface bg-white p-6 space-y-3 text-left">
                  <h3 className="font-serif text-base font-semibold text-primary">Delivery Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`flex items-start gap-3 p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all ${deliveryMethod === "delivery" ? "border-accent bg-accent-soft" : "border-ink/15"}`}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === "delivery"}
                        onChange={() => setDeliveryMethod("delivery")}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-primary">Home Delivery</span>
                        <p className="text-[11px] text-ink-muted mt-0.5">Free above ₹999, otherwise ₹99 shipping.</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all ${deliveryMethod === "pickup" ? "border-accent bg-accent-soft" : "border-ink/15"}`}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === "pickup"}
                        onChange={() => setDeliveryMethod("pickup")}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-primary">Pickup at Udumalpet Facility</span>
                        <p className="text-[11px] text-ink-muted mt-0.5">No shipping fee. Collect from our Tamil Nadu press unit.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 card-surface bg-white p-8 space-y-6 text-left">
                <h3 className="font-serif text-xl font-semibold border-b border-ink/10 pb-4 text-primary">Order Summary</h3>

                {/* Coupon */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-accent-soft px-4 py-2.5 rounded-[var(--radius-sm)]">
                      <span className="text-xs font-bold text-primary">{appliedCoupon.code} applied</span>
                      <button
                        onClick={() => { setAppliedCoupon(null); setCouponInput(""); }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        className="flex-1 h-10 px-3 rounded-[var(--radius-sm)] border border-ink/15 bg-white text-xs focus:border-accent focus:outline-none"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 h-10 rounded-[var(--radius-sm)] border border-primary text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-ink-muted font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-primary font-bold">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="text-primary font-bold">
                      {shippingFee === 0 ? <span className="text-accent">Free</span> : formatPrice(shippingFee, currency)}
                    </span>
                  </div>
                  {discountINR > 0 && (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-accent font-bold">-{formatPrice(discountINR, currency)}</span>
                    </div>
                  )}
                  {!isFreeShipping && (
                    <p className="text-[10px] text-ink-muted font-normal leading-normal italic">
                      Add {formatPrice(999 - subtotal, currency)} more for Free Shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-ink/10 pt-4 flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold text-primary">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total, currency)}</span>
                </div>
                {currency === "USD" && (
                  <p className="text-[10px] text-ink-muted italic -mt-4">Charged in INR at checkout.</p>
                )}

                {error && <p className="text-[11px] text-red-600">{error}</p>}

                <button
                  onClick={handleCheckout}
                  disabled={placingOrder}
                  className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-4 rounded-[var(--radius-md)] transition duration-300 uppercase tracking-widest text-center disabled:opacity-60"
                >
                  {placingOrder ? "Processing..." : user ? "Pay & Place Order" : "Login to Checkout"}
                </button>

                <p className="text-[9px] text-ink-muted font-normal text-center italic">
                  * Secured by Razorpay. Local taxes calculated at check-out.
                </p>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
