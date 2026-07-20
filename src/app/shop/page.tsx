"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { formatPrice } from "@/src/lib/currency";
import { PRODUCTS } from "@/src/data/products";

function HeartIcon({ filled = false, className = "size-5" }: { filled?: boolean; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "#7C9A6B" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={filled ? "#7C9A6B" : "currentColor"} className={`${className} transition-colors duration-300`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#B08D57" : "none"}
      stroke="#B08D57"
      strokeWidth={1.5}
      className="size-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499c.15-.427.79-.427.94 0l1.84 5.314a.499.499 0 00.474.335h5.518c.465 0 .659.59.288.874l-4.463 3.428a.5.5 0 00-.18.555l1.68 5.15c.142.438-.363.805-.733.526l-4.463-3.428a.5.5 0 00-.58 0l-4.463 3.428c-.37.279-.875-.088-.733-.526l1.68-5.15a.5.5 0 00-.18-.555L3.38 10.02c-.371-.284-.177-.874.288-.874h5.518a.5.5 0 00.474-.335L11.48 3.5z"
      />
    </svg>
  );
}

function SearchIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const { currency } = useCurrency();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 1])),
  );

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";
    setActiveCategory(categoryFromUrl);
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl !== null) setSearchTerm(searchFromUrl);
  }, [searchParams]);

  const updateQty = (productId: string, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: increment ? prev[productId] + 1 : Math.max(1, prev[productId] - 1),
    }));
  };

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const variant = product.variants[0];
    const qty = quantities[productId] || 1;

    addItem(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantSize: variant.size,
        priceINR: variant.priceINR,
        image: product.images[0],
      },
      qty,
    );

    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 right-8 card-surface bg-white px-6 py-4 z-50 transition-all duration-500 translate-y-4 opacity-0 flex items-center gap-3 text-sm font-sans";
    toast.innerHTML = `
      <div>
        <p class="font-bold text-xs uppercase tracking-wider text-primary">Added to Cart</p>
        <p class="text-xs text-ink-muted">${qty}x ${product.title}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("translate-y-4", "opacity-0"), 50);
    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const filteredProducts = useMemo(() => {
    let list = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.shortDesc.toLowerCase().includes(term),
      );
    }
    return list;
  }, [activeCategory, searchTerm]);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* Search + Category Tabs */}
      <div className="flex flex-col items-center gap-6 mb-16">
        <div className="relative w-full max-w-md">
          <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full h-12 pl-11 pr-4 rounded-full border border-ink/15 bg-white text-sm focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none transition-all"
          />
        </div>

        <div className="card-surface bg-white p-2 inline-flex flex-wrap gap-1 rounded-full">
          {[
            { label: "All Products", id: "all" },
            { label: "Coconut Oil", id: "coconut" },
            { label: "Groundnut Oil", id: "groundnut" },
            { label: "Sesame Oil", id: "sesame" },
            { label: "Combo", id: "combo" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === tab.id
                  ? "bg-primary text-white shadow-[inset_0_0_0_1px_rgba(176,141,87,0.4)]"
                  : "text-ink/70 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-ink-muted text-sm">
          No products match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const variant = product.variants[0];
            const inStock = product.variants.some((v) => v.inStock);
            return (
              <div
                key={product.id}
                className="card-surface card-surface-interactive bg-white p-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className={`text-[9px] font-extrabold py-1 px-3.5 rounded-full uppercase tracking-wider ${
                      inStock ? "bg-gold text-white" : "bg-ink-muted text-white"
                    }`}>
                      {product.badge}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} filled={i < product.rating} />
                        ))}
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Toggle wishlist"
                        className="hover:scale-110 transition-transform"
                      >
                        <HeartIcon filled={isWishlisted(product.id)} className="size-4" />
                      </button>
                    </div>
                  </div>

                  <a href={`/shop/${product.slug}`} className="relative group overflow-hidden rounded-[var(--radius-md)] aspect-square flex items-center justify-center bg-cream border border-primary/5 shadow-[inset_0_2px_8px_rgba(20,50,42,0.04)] block">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className={`h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_20px_rgba(20,50,42,0.12)] ${
                        !inStock ? "saturate-50 opacity-80" : ""
                      }`}
                    />
                  </a>

                  <div className="text-left space-y-3">
                    <a href={`/shop/${product.slug}`}>
                      <h3 className="font-serif text-lg font-semibold text-primary leading-snug min-h-[3.5rem] hover:text-gold transition-colors">
                        {product.title}
                      </h3>
                    </a>
                    <p className="text-ink-muted text-xs leading-relaxed line-clamp-3">
                      {product.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-ink/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">{formatPrice(variant.priceINR, currency)}</span>
                      {variant.oldPriceINR && (
                        <span className="text-xs text-ink-muted line-through">{formatPrice(variant.oldPriceINR, currency)}</span>
                      )}
                    </div>

                    {inStock && (
                      <div className="flex items-center border border-ink/15 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQty(product.id, false)}
                          className="px-3 py-1 text-xs hover:bg-accent-soft transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold font-mono">{quantities[product.id] || 1}</span>
                        <button
                          onClick={() => updateQty(product.id, true)}
                          className="px-3 py-1 text-xs hover:bg-accent-soft transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {!inStock ? (
                      <button
                        disabled
                        className="bg-cream-dark text-ink-muted text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-[var(--radius-md)] cursor-not-allowed w-full"
                      >
                        Out of Stock - Restocking
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <a
                          href={`/shop/${product.slug}`}
                          className="flex-1 border border-primary hover:border-gold hover:bg-primary hover:text-white py-3 rounded-[var(--radius-md)] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 text-center"
                        >
                          View Options
                        </a>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 bg-primary hover:bg-primary-light hover:-translate-y-0.5 text-white py-3 rounded-[var(--radius-md)] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_2px_4px_rgba(20,50,42,0.25),0_12px_24px_-6px_rgba(20,50,42,0.35)] hover:shadow-[0_4px_8px_rgba(20,50,42,0.3),0_20px_36px_-8px_rgba(20,50,42,0.4)]"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased overflow-x-hidden relative">
      <Header />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        NATURE
      </div>

      <section className="relative overflow-hidden bg-primary text-white py-20 text-center border-b border-primary-light/10">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="divider-gold mx-auto"></div>
          <span className="text-gold font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase block">
            CURATED ORGANIC SELECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
            Shop Pure Goodness
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Enjoy 100% natural, cold-pressed extraction, sulphur-free drying, and native Tamil Nadu heritage delivered directly to your home.
          </p>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-24 text-center text-ink-muted font-bold uppercase tracking-widest text-xs">
          Loading Signature Catalog...
        </div>
      }>
        <ShopContent />
      </Suspense>

      <Footer />
    </div>
  );
}
