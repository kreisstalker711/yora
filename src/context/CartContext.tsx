"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { getUserCart, setUserCart, type StoredCartItem } from "@/src/lib/firestore";

export type CartItem = StoredCartItem;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (productId: string, variantSize: string, delta: number) => void;
  removeItem: (productId: string, variantSize: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "yora_cart_items";
const COUNT_KEY = "yora_cart_count";

function loadLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function mergeCarts(local: CartItem[], remote: CartItem[]): CartItem[] {
  const merged = [...remote];
  for (const localItem of local) {
    const match = merged.find(
      (item) => item.productId === localItem.productId && item.variantSize === localItem.variantSize,
    );
    if (match) {
      match.qty = Math.max(match.qty, localItem.qty);
    } else {
      merged.push(localItem);
    }
  }
  return merged;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const hasSyncedForUid = useRef<string | null>(null);

  useEffect(() => {
    setItems(loadLocalCart());
  }, []);

  useEffect(() => {
    if (!user) {
      hasSyncedForUid.current = null;
      return;
    }
    if (hasSyncedForUid.current === user.uid) return;
    hasSyncedForUid.current = user.uid;

    (async () => {
      let remote: CartItem[] = [];
      try {
        remote = await Promise.race([
          getUserCart(user.uid),
          new Promise<CartItem[]>((_, reject) => setTimeout(() => reject(new Error("cart fetch timed out")), 6000)),
        ]);
      } catch (err) {
        console.warn("Could not load remote cart, continuing with local cart only:", err);
      }
      const merged = mergeCarts(loadLocalCart(), remote);
      setItems(merged);
      persistLocal(merged);
      void setUserCart(user.uid, merged);
    })();
  }, [user]);

  const persistLocal = (next: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    const totalCount = next.reduce((sum, item) => sum + item.qty, 0);
    localStorage.setItem(COUNT_KEY, totalCount.toString());
    window.dispatchEvent(new Event("storage"));
  };

  const persist = (next: CartItem[]) => {
    setItems(next);
    persistLocal(next);
    if (user) void setUserCart(user.uid, next);
  };

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    const existingIndex = items.findIndex(
      (i) => i.productId === item.productId && i.variantSize === item.variantSize,
    );
    const next = [...items];
    if (existingIndex > -1) {
      next[existingIndex] = { ...next[existingIndex], qty: next[existingIndex].qty + qty };
    } else {
      next.push({ ...item, qty });
    }
    persist(next);
  };

  const updateQty: CartContextValue["updateQty"] = (productId, variantSize, delta) => {
    const next = items
      .map((item) =>
        item.productId === productId && item.variantSize === variantSize
          ? { ...item, qty: item.qty + delta }
          : item,
      )
      .filter((item) => item.qty > 0);
    persist(next);
  };

  const removeItem: CartContextValue["removeItem"] = (productId, variantSize) => {
    persist(items.filter((item) => !(item.productId === productId && item.variantSize === variantSize)));
  };

  const clearCart = () => persist([]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceINR * item.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
