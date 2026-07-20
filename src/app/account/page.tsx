"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { formatPrice } from "@/src/lib/currency";
import {
  getOrdersForUser,
  getUserProfile,
  upsertUserProfile,
  withTimeout,
  type Order,
} from "@/src/lib/firestore";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { currency } = useCurrency();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/account");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid)
      .then((profile) => {
        setPhone(profile?.phone || "");
        setAddress(profile?.address || "");
      })
      .catch((err) => console.warn("Could not load profile:", err));
    getOrdersForUser(user.uid)
      .then(setOrders)
      .finally(() => setOrdersLoading(false));
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    try {
      await withTimeout(upsertUserProfile(user.uid, { phone, address }));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      console.warn("Could not save profile:", err);
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-primary">My Account</h1>
            <p className="text-xs text-ink-muted mt-1">{user.displayName || user.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-primary transition-colors self-start sm:self-auto"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile */}
          <div className="lg:col-span-5 card-surface bg-white p-8 space-y-6">
            <h2 className="font-serif text-xl font-semibold text-primary">Profile Details</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email || ""} disabled className="opacity-60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City, State, PIN" />
              </div>
              <Button type="submit" disabled={savingProfile} className="w-full">
                {savingProfile ? "Saving..." : "Save Changes"}
              </Button>
              {profileSaved && <p className="text-[11px] text-accent font-semibold text-center">Profile updated.</p>}
            </form>
          </div>

          {/* Order History */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-xl font-semibold text-primary">Order History</h2>
            {ordersLoading ? (
              <div className="card-surface bg-white p-8 text-center text-xs text-ink-muted uppercase tracking-widest">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="card-surface bg-white p-8 text-center space-y-3">
                <p className="text-sm text-ink-muted">You haven&apos;t placed any orders yet.</p>
                <a href="/shop" className="inline-block text-xs font-bold uppercase tracking-widest text-primary hover:text-accent">
                  Start Shopping &rarr;
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card-surface bg-white overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id!)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-cream transition-colors"
                    >
                      <div>
                        <p className="text-xs font-mono font-bold text-primary">#{order.id?.slice(0, 8).toUpperCase()}</p>
                        <p className="text-[11px] text-ink-muted mt-0.5">{order.items.length} item(s) &middot; {formatPrice(order.totalINR, currency)}</p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-accent-soft text-primary px-3 py-1 rounded-full">
                        {order.status}
                      </span>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="p-5 pt-0 border-t border-ink/5 space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-ink-muted">
                            <span>{item.qty}x {item.title} ({item.variantSize})</span>
                            <span className="font-semibold text-ink">{formatPrice(item.priceINR * item.qty, currency)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
