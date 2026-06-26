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
      fill={filled ? "#D4AF37" : "none"}
      stroke="#D4AF37"
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
    oldPrice: 350,
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
    img: "/images/prod_groundnut.png",
    rating: 5,
    reviews: 18,
    soldOut: false,
    badge: "Best Seller"
  },
  {
    id: "combo",
    title: "Family Value Pack Trio Combo",
    category: "combos",
    price: 1379,
    oldPrice: 1848,
    desc: "A handcrafted family pack containing 1L Coconut Oil, 1L Groundnut Oil, and 1L Sesame Oil. Preserves chemical-free health across all culinary styles, ensuring a complete and wholesome organic kitchen journey.",
    img: "/images/prod_combo.png",
    rating: 5,
    reviews: 26,
    soldOut: false,
    badge: "Value Set"
  },
  {
    id: "sesame",
    title: "Cold-Pressed Sesame (Gingelly) Oil",
    category: "sesame",
    price: 160,
    oldPrice: 349,
    desc: "Slow-pressed in native black Vaagai wood structures using premium sun-dried sesame seeds and dark palm jaggery (karupatti). Preserves heart-healthy lignans and vitamins with a distinct rustic depth.",
    img: "/images/prod_sesame.png",
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

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    coconut: 1,
    groundnut: 1,
    combo: 1,
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

  const handleAddToCart = (productId: string, productName: string) => {
    const qty = quantities[productId] || 1;
    
    // Add item to structured cart items list
    const metadata: Record<string, { name: string; price: number; image: string }> = {
      coconut: {
        name: "Yora Extra Virgin Coconut Oil (Cold Centrifuged)",
        price: 250,
        image: "/images/evcocard.png"
      },
      groundnut: {
        name: "Cold-Pressed Groundnut (Peanut) Oil",
        price: 258,
        image: "/images/prod_groundnut.png"
      },
      combo: {
        name: "Family Value Pack Trio Combo",
        price: 1379,
        image: "/images/prod_combo.png"
      },
      sesame: {
        name: "Cold-Pressed Sesame (Gingelly) Oil",
        price: 160,
        image: "/images/prod_sesame.png"
      }
    };

    const product = metadata[productId] || { name: productName, price: 250, image: "/images/prod_coconut.png" };
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
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }

    localStorage.setItem("yora_cart_items", JSON.stringify(items));

    // Update total count
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("yora_cart_count", totalCount.toString());
    
    // Dispatch storage event to update Header
    window.dispatchEvent(new Event("storage"));

    // Toast
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 right-8 bg-[#102316]/95 backdrop-blur-md text-[#FAF7F0] px-6 py-4 rounded-2xl shadow-2xl border border-[#7AA33C]/30 text-sm font-sans flex items-center gap-3 z-50 transition-all duration-500 translate-y-4 opacity-0";
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-[#7AA33C] animate-pulse"></span>
      <div>
        <p class="font-bold text-xs uppercase tracking-wider text-[#7AA33C]">Added to Cart</p>
        <p class="text-xs text-[#FAF7F0]/80">${qty}x ${productName}</p>
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
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {[
          { label: "All Products", id: "all" },
          { label: "Coconut Oil", id: "coconut" },
          { label: "Groundnut Oil", id: "groundnut" },
          { label: "Sesame Oil", id: "sesame" },
          { label: "Value Combos", id: "combos" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              activeCategory === tab.id
                ? "bg-[#102316] text-[#FAF7F0] shadow-lg shadow-[#102316]/10"
                : "border border-[#102316]/10 text-[#102316]/70 bg-white hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Editorial Grid */}
      <div className="space-y-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white border border-[#102316]/5 rounded-[2.5rem] p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left Product Photo Column */}
            <div className="lg:col-span-5 flex justify-center bg-[#F3ECE0]/30 rounded-3xl p-6 h-80 relative overflow-hidden border border-[#102316]/5">
              <span className={`absolute top-4 left-4 text-[8px] font-extrabold py-1.5 px-3.5 rounded-full uppercase tracking-wider shadow-sm z-10 ${
                product.soldOut ? "bg-slate-400 text-white" : "bg-[#7AA33C] text-white"
              }`}>
                {product.badge}
              </span>
              <img 
                src={product.img} 
                alt={product.title} 
                className={`max-h-full w-auto object-contain transition-transform duration-700 hover:scale-105 filter drop-shadow-md ${
                  product.soldOut ? "saturate-50 opacity-80" : ""
                }`} 
              />
            </div>

            {/* Right Product Copy Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102316] leading-tight">
                  {product.title}
                </h3>
                
                {/* Rating details */}
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold ml-1">({product.reviews} customer reviews)</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {product.desc}
              </p>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-bold text-[#102316]">₹{product.price.toLocaleString("en-IN")}.00</span>
                <span className="text-sm text-slate-400 line-through font-medium">₹{product.oldPrice.toLocaleString("en-IN")}.00</span>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center">
                {product.soldOut ? (
                  <button 
                    disabled 
                    className="bg-slate-100 text-slate-400 text-xs font-bold tracking-widest uppercase px-10 py-4.5 rounded-full cursor-not-allowed w-full sm:w-auto"
                  >
                    Out of Stock - Restocking
                  </button>
                ) : (
                  <>
                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between border border-[#102316]/10 rounded-full overflow-hidden h-12 w-32 bg-slate-50/50">
                      <button 
                        onClick={() => updateQty(product.id, false)}
                        className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold font-mono">{quantities[product.id] || 1}</span>
                      <button 
                        onClick={() => updateQty(product.id, true)}
                        className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto flex-grow max-w-sm">
                      <button 
                        onClick={() => handleAddToCart(product.id, product.title)}
                        className="border border-[#102316] hover:bg-[#102316] hover:text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 flex-1"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => { handleAddToCart(product.id, product.title); }}
                        className="bg-[#7AA33C] hover:bg-[#8CB847] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-md shadow-[#7AA33C]/10 flex-1"
                      >
                        Buy Now
                      </button>
                    </div>
                  </>
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
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased">
      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102316] to-[#16301E] text-white py-24 sm:py-32 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#7AA33C] rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            CURATED ORGANIC SELECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
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
