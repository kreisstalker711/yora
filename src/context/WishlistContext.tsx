"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { getUserWishlist, setUserWishlist, withTimeout } from "@/src/lib/firestore";

interface WishlistContextValue {
  productIds: string[];
  count: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "yora_wishlist";

function loadLocalWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function mergeWishlists(local: string[], remote: string[]): string[] {
  return Array.from(new Set([...remote, ...local]));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [productIds, setProductIds] = useState<string[]>([]);
  const hasSyncedForUid = useRef<string | null>(null);

  useEffect(() => {
    setProductIds(loadLocalWishlist());
  }, []);

  useEffect(() => {
    if (!user) {
      hasSyncedForUid.current = null;
      return;
    }
    if (hasSyncedForUid.current === user.uid) return;
    hasSyncedForUid.current = user.uid;

    (async () => {
      let remote: string[] = [];
      try {
        remote = await withTimeout(getUserWishlist(user.uid), 6000);
      } catch (err) {
        console.warn("Could not load remote wishlist, continuing with local wishlist only:", err);
      }
      const merged = mergeWishlists(loadLocalWishlist(), remote);
      setProductIds(merged);
      persistLocal(merged);
      void setUserWishlist(user.uid, merged);
    })();
  }, [user]);

  const persistLocal = (next: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleWishlist = (productId: string) => {
    const next = productIds.includes(productId)
      ? productIds.filter((id) => id !== productId)
      : [...productIds, productId];
    setProductIds(next);
    persistLocal(next);
    if (user) void setUserWishlist(user.uid, next);
  };

  const isWishlisted = (productId: string) => productIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ productIds, count: productIds.length, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
