"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#C89B3C" : "none"}
      stroke="#C89B3C"
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

const PRODUCTS = [
  {
    id: "coconut",
    title: "Yora Extra Virgin Coconut Oil (Cold Centrifuged)",
    category: "coconut",
    price: 250,
    oldPrice: 650,
    desc: "Extracted from fresh raw coconut milk using dynamic centrifuge separation under room temperature. Unrefined, highly bioavailable, and rich in Lauric Acid. Perfect for skin hydration, oil pulling, and delicate raw baking.",
    img: "/images/evcocard.png",
    rating: 5,
    reviews: 12,
    soldOut: false,
    badge: "Best Seller"
  },
  {
    id: "groundnut",
    title: "Cold-Pressed Groundnut (Peanut) Oil",
    category: "groundnut",
    price: 258,
    oldPrice: 399,
    desc: "Pressed slowly using native Vaagai wood mortars from premium quality sun-dried peanuts in Tirupur. The oil has a rich nutty aroma and high smoke point, ideal for healthy deep frying, sautéing, and daily cooking.",
    img: "/images/goilard.png",
    rating: 5,
    reviews: 18,
    soldOut: false,
    badge: "Best Seller"
  },
  {
    id: "sesame",
    title: "Cold-Pressed Sesame (Gingelly) Oil",
    category: "sesame",
    price: 160,
    oldPrice: 349,
    desc: "Slow-pressed in native black Vaagai wood structures using premium sun-dried sesame seeds and dark palm jaggery (karupatti). Preserves heart-healthy lignans and vitamins with a distinct rustic depth.",
    img: "/images/sesamecard.png",
    rating: 5,
    reviews: 14,
    soldOut: false,
    badge: "Sale"
  }
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  useEffect(() => {
    const updateCurrency = () => {
      const stored = localStorage.getItem("yora_currency");
      if (stored) setSelectedCurrency(stored);
    };
    updateCurrency();
    window.addEventListener("storage", updateCurrency);
    const timer = setInterval(updateCurrency, 1000);
    return () => {
      window.removeEventListener("storage", updateCurrency);
      clearInterval(timer);
    };
  }, []);

  const formatPrice = (inrValue: number) => {
    if (selectedCurrency === "USD") {
      const usdValue = inrValue / 83;
      return `$${usdValue.toFixed(2)}`;
    }
    return `₹${inrValue.toLocaleString("en-IN")}.00`;
  };

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    coconut: 1,
    groundnut: 1,
    sesame: 1
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";
    setActiveCategory(categoryFromUrl);
  }, [searchParams]);

  const updateQty = (productId: string, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: increment ? prev[productId] + 1 : Math.max(1, prev[productId] - 1),
    }));
  };

  const handleAddToCart = (productId: string, productName: string, price: number, image: string) => {
    const qty = quantities[productId] || 1;
    const storedItems = localStorage.getItem("yora_cart_items");
    let items: any[] = [];
    if (storedItems) {
      try {
        items = JSON.parse(storedItems);
      } catch (e) {
        items = [];
      }
    }

    const existingItemIndex = items.findIndex((item) => item.id === productId);
    if (existingItemIndex > -1) {
      items[existingItemIndex].quantity += qty;
    } else {
      items.push({
        id: productId,
        name: productName,
        price: price,
        image: image,
        quantity: qty
      });
    }

    localStorage.setItem("yora_cart_items", JSON.stringify(items));
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("yora_cart_count", totalCount.toString());
    window.dispatchEvent(new Event("storage"));

    // Toast
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 right-8 glass-card bg-white/95 px-6 py-4 rounded-2xl shadow-2xl border border-secondary/30 text-sm font-sans flex items-center gap-3 z-50 transition-all duration-500 translate-y-4 opacity-0";
    toast.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full bg-[#63C132] animate-ping"></span>
      <div>
        <p class="font-bold text-xs uppercase tracking-wider text-[#0F3D2E]">Added to Cart</p>
        <p class="text-xs text-slate-600">${qty}x ${productName}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("translate-y-4", "opacity-0"), 50);
    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Category Tabs inside Glass Card */}
      <div className="flex justify-center mb-16">
        <div className="glass-card bg-white/80 p-2 rounded-full inline-flex flex-wrap gap-1 border border-primary/5">
          {[
            { label: "All Products", id: "all" },
            { label: "Coconut Oil", id: "coconut" },
            { label: "Groundnut Oil", id: "groundnut" },
            { label: "Sesame Oil", id: "sesame" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === tab.id
                  ? "bg-gradient-to-r from-[#63C132] to-[#0F3D2E] text-white shadow-md shadow-primary/10"
                  : "text-[#182218]/70 hover:text-[#63C132]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Luxury Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="glass-card bg-white/80 rounded-[3rem] p-6 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <span className={`text-[9px] font-extrabold py-1 px-3.5 rounded-full uppercase tracking-wider shadow-sm z-10 ${
                  product.soldOut ? "bg-slate-400 text-white" : "bg-[#C89B3C] text-white"
                }`}>
                  {product.badge}
                </span>
                <div className="flex gap-0.5">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>

              {/* Product Photo Box */}
              <div className="relative group overflow-hidden rounded-3xl aspect-square flex items-center justify-center bg-gradient-to-b from-white to-[#F4FCEF]/70 border border-primary/5">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className={`h-48 w-auto object-contain transition-transform duration-700 group-hover:scale-110 filter drop-shadow-md ${
                    product.soldOut ? "saturate-50 opacity-80" : ""
                  }`} 
                />
              </div>

              <div className="text-left space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#0F3D2E] leading-snug min-h-[3.5rem]">
                  {product.title}
                </h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-3">
                  {product.desc}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#0F3D2E]">{formatPrice(product.price)}</span>
                  <span className="text-xs text-slate-400 line-through font-medium">{formatPrice(product.oldPrice)}</span>
                </div>

                {!product.soldOut && (
                  <div className="flex items-center border border-[#182218]/15 rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQty(product.id, false)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold font-mono">{quantities[product.id] || 1}</span>
                    <button 
                      onClick={() => updateQty(product.id, true)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                {product.soldOut ? (
                  <button 
                    disabled 
                    className="bg-slate-100 text-slate-400 text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-full cursor-not-allowed w-full"
                  >
                    Out of Stock - Restocking
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(product.id, product.title, product.price, product.img)}
                      className="flex-1 border border-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => { handleAddToCart(product.id, product.title, product.price, product.img); }}
                      className="flex-1 bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)]"
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#182218] font-sans antialiased overflow-x-hidden relative">
      <Header />

      {/* Decorative oversized background word */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        NATURE
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F3D2E] to-[#082018] text-[#FFFDF8] py-20 text-center border-b border-[#2F6B3D]/10">
        {/* Background light rays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D6F5C2] rounded-full filter blur-[120px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            CURATED ORGANIC SELECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Shop Pure Goodness
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Enjoy 100% natural, wood-pressed cold extraction, sulphur-free drying, and native Tamil Nadu vaagai heritage delivered directly to your home.
          </p>
        </div>
      </section>

      {/* Suspension boundaries for useSearchParams */}
      <Suspense fallback={
        <div className="py-24 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
          Loading Signature Catalog...
        </div>
      }>
        <ShopContent />
      </Suspense>

      <Footer />
    </div>
  );
}
