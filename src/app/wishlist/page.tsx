"use client";

import React from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { formatPrice } from "@/src/lib/currency";
import { getProductById } from "@/src/data/products";

function HeartIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

export default function WishlistPage() {
  const { productIds, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { currency } = useCurrency();

  const products = productIds.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-primary mb-12">Your Wishlist</h1>

        {products.length === 0 ? (
          <div className="text-center space-y-6 max-w-md mx-auto py-12">
            <div className="w-16 h-16 bg-accent-soft text-ink-muted rounded-full flex items-center justify-center mx-auto border border-ink/5">
              <HeartIcon className="size-8" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-primary">No saved items yet</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Tap the heart icon on any product to save it here for later.
            </p>
            <a
              href="/shop"
              className="inline-block bg-primary hover:bg-primary-light text-white text-xs font-bold px-8 py-4 rounded-[var(--radius-md)] transition-all duration-300 uppercase tracking-widest"
            >
              Explore Collection
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const variant = product.variants[0];
              return (
                <div key={product.id} className="card-surface bg-white p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <a href={`/shop/${product.slug}`} className="block aspect-square bg-cream rounded-[var(--radius-md)] flex items-center justify-center p-6">
                      <img src={product.images[0]} alt={product.title} className="max-h-full w-auto object-contain" />
                    </a>
                    <a href={`/shop/${product.slug}`}>
                      <h3 className="font-serif text-lg font-semibold text-primary hover:text-accent transition-colors">{product.title}</h3>
                    </a>
                    <p className="text-lg font-bold text-primary">{formatPrice(variant.priceINR, currency)}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="px-4 py-3 rounded-[var(--radius-md)] border border-ink/15 text-ink-muted hover:border-red-400 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <HeartIcon className="size-4" />
                    </button>
                    <button
                      onClick={() =>
                        addItem({
                          productId: product.id,
                          slug: product.slug,
                          title: product.title,
                          variantSize: variant.size,
                          priceINR: variant.priceINR,
                          image: product.images[0],
                        })
                      }
                      className="flex-1 bg-primary hover:bg-primary-light text-white py-3 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
