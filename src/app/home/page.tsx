"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

// Star rating icon component
function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#C89B3C" : "none"}
      stroke="#C89B3C"
      strokeWidth={1.5}
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499c.15-.427.79-.427.94 0l1.84 5.314a.499.499 0 00.474.335h5.518c.465 0 .659.59.288.874l-4.463 3.428a.5.5 0 00-.18.555l1.68 5.15c.142.438-.363.805-.733.526l-4.463-3.428a.5.5 0 00-.58 0l-4.463 3.428c-.37.279-.875-.088-.733-.526l1.68-5.15a.5.5 0 00-.18-.555L3.38 10.02c-.371-.284-.177-.874.288-.874h5.518a.5.5 0 00.474-.335L11.48 3.5z"
      />
    </svg>
  );
}

export default function HomePage() {
  const [activeCraftStep, setActiveCraftStep] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [quantities, setQuantities] = useState({
    coconut: 1,
    groundnut: 1,
    sesame: 1,
  });

  const storyVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (storyVideoRef.current) {
        const rect = storyVideoRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          storyVideoRef.current.play().catch(() => { });
        } else {
          storyVideoRef.current.pause();
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const craftSteps = [
    {
      title: "Direct Farm Sourcing",
      location: "Udumalpet Farms, Tirupur",
      desc: "We partner directly with local farmers in Udumalpet, sourcing premium quality organically-grown coconuts, sesame seeds, and peanuts. Fair trade ensures farmers are rewarded, and we guarantee chemical-free ingredients from the root.",
      badge: "Step 01"
    },
    {
      title: "Natural Sun-Drying",
      location: "Solar Drying Yards",
      desc: "Our copra (coconut meat) and seeds are sun-dried naturally in clean, hygienic solar yards to achieve optimal moisture levels. We never use sulphur, artificial preservatives, or chemical drying agents to speed up the process.",
      badge: "Step 02"
    },
    {
      title: "Vaagai Wood Pressing",
      location: "Traditional Cold Press",
      desc: "Using heritage wood pressers made from the Vaagai tree (black siris), we slowly press the seeds at room temperature. The wood naturally absorbs excess heat, ensuring the extracted oil remains below 35°C, preserving all vital nutrients, enzymes, and natural aromas.",
      badge: "Step 03"
    },
    {
      title: "Sedimentation & Bottling",
      location: "Natural Clarification",
      desc: "Instead of machine filtering or chemical bleaching, we let the oil settle naturally in steel tanks for 3 to 4 days. The clarified oil is then carefully filtered through organic cotton cloths and bottled in premium, dark-tinted containers to protect it from light.",
      badge: "Step 04"
    }
  ];

  const updateQty = (product: "coconut" | "groundnut" | "sesame", increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: increment ? prev[product] + 1 : Math.max(1, prev[product] - 1),
    }));
  };

  const handleAddToCart = (qty: number, productId: "coconut" | "groundnut" | "sesame", productName: string, price: number, image: string) => {
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

    // Toast notification
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

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#182218] font-sans antialiased overflow-x-hidden">
      <Header />

      {/* 1. Luxury DTC Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-20 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#F4FCEF] to-[#E9F8E3]">
        {/* Decorative oversized background word */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
          PURITY
        </div>

        {/* Blurred mint circles background */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D6F5C2]/45 rounded-full filter blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#8FD16A]/15 rounded-full filter blur-[140px] pointer-events-none"></div>

        {/* Floating oil/leaves element illustrations */}
        <div className="absolute top-24 right-1/4 animate-float-slow opacity-25 pointer-events-none">
          <span className="text-6xl">🍃</span>
        </div>
        <div className="absolute bottom-1/4 left-16 animate-float-medium opacity-30 pointer-events-none">
          <span className="text-5xl">💧</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Heading */}
            <div className="lg:col-span-6 text-left space-y-8 animate-reveal-up">
              <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#63C132]/10 border border-[#63C132]/25 text-[#0F3D2E] text-[10px] font-extrabold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#63C132] animate-pulse"></span>
                Pure Single-Origin Press
              </div>
              <h1 className="font-serif text-5xl sm:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#0F3D2E] uppercase">
                Cold Pressed  <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63C132] to-[#2F6B3D]">Purity</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed font-light">
                Clarified naturally by gravity and sun, our traditional oils represent clean nourishment sourced directly from the soil of Udumalpet, Tamil Nadu.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/shop"
                  className="bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-105"
                >
                  Shop Collection
                </a>
                <a
                  href="/about"
                  className="glass-card bg-white/40 hover:bg-white text-[#0F3D2E] px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 border border-primary/10 hover:scale-105"
                >
                  Our Tradition
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#0F3D2E]/10 max-w-md">
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#0F3D2E]">100%</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chemical-Free</p>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#0F3D2E]">Traditional</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vaagai Mortar</p>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#0F3D2E]">Direct</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Farm Sourced</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Product Render */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              {/* Radial gradient glow behind bottles */}
              <div className="absolute w-[450px] h-[450px] bg-[#63C132]/10 rounded-full filter blur-[80px] pointer-events-none animate-pulse-slow"></div>

              {/* Main product representation mockup cards layering */}
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                {/* Floating Bottle 1 */}
                <div className="absolute z-20 left-4 top-12 w-44 animate-float-slow">
                  <div className="glass-card rounded-[2rem] p-4 bg-white/80 shadow-2xl transition-all duration-300 hover:scale-105">
                    <img src="/images/evcocard.png" alt="Coconut Oil" className="w-full h-auto rounded-2xl object-cover" />
                    <div className="mt-2 text-center">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#63C132] bg-[#63C132]/10 px-2 py-0.5 rounded-full">Coconut</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bottle 2 (Center Primary) */}
                <div className="absolute z-30 w-52 animate-float-medium">
                  <div className="glass-card rounded-[2.5rem] p-5 bg-white/90 shadow-2xl border border-white/70 transition-all duration-300 hover:scale-105">
                    <img src="/images/goilard.png" alt="Groundnut Oil" className="w-full h-auto rounded-3xl object-cover" />
                    <div className="mt-3 text-center space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#C89B3C] bg-[#C89B3C]/10 px-3 py-0.5 rounded-full">Groundnut</span>
                      <p className="font-serif text-xs font-bold text-[#0F3D2E]">Traditional Vaagai Press</p>
                    </div>
                  </div>
                </div>

                {/* Floating Bottle 3 */}
                <div className="absolute z-10 right-4 bottom-8 w-40 animate-float-fast">
                  <div className="glass-card rounded-[2rem] p-4 bg-white/80 shadow-2xl transition-all duration-300 hover:scale-105">
                    <img src="/images/sesamecard.png" alt="Sesame Oil" className="w-full h-auto rounded-2xl object-cover" />
                    <div className="mt-2 text-center">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#2F6B3D] bg-[#2F6B3D]/10 px-2 py-0.5 rounded-full">Sesame</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Slightly Tilted Floating Glass Benefits Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            WHY PARTNER WITH YORA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E]">
            A Pure Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "100% Organic Sourcing",
              desc: "Every coconut, groundnut, and sesame seed is hand-selected from vetted regional growers in Tirupur. Pure, clean farming seeds with zero chemical treatments.",
              icon: "🌱",
              tilt: "-rotate-1 hover:rotate-0"
            },
            {
              title: "Traditional Wood Mortar",
              desc: "Pressed using slow-rotating Vaagai (black siris) wood pestles. The wood limits thermal friction, keeping the oil naturally cool and preserving aromatic benefits.",
              icon: "🪵",
              tilt: "rotate-1 hover:rotate-0"
            },
            {
              title: "Chemical-Free Promise",
              desc: "Zero chemical refining, bleaching, or sulphur additives. Clarified using gravity settling and sun filtration, ensuring pure, unrefined golden texture.",
              icon: "💧",
              tilt: "-rotate-2 hover:rotate-0"
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`glass-card bg-white/80 p-10 rounded-[2.5rem] transition-all duration-500 transform ${item.tilt} hover:-translate-y-3 hover:shadow-2xl`}
            >
              <div className="w-14 h-14 rounded-3xl bg-[#D6F5C2]/40 border border-[#D6F5C2]/80 flex items-center justify-center mb-8 font-serif text-2xl">
                {item.icon}
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0F3D2E] mb-4">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Meet Yora (Editorial layout with video inside glass card) */}
      <section className="py-24 bg-[#F8F6EF] relative overflow-hidden">
        {/* Decorative oversized background word */}
        <div className="absolute top-1/3 left-10 text-giant select-none pointer-events-none uppercase">
          TRADITION
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Video in Glass Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="glass-card bg-white/70 p-4 rounded-[3rem] shadow-2xl w-full max-w-lg relative">
                <div className="absolute -inset-4 border border-[#C89B3C]/10 rounded-[3.5rem] pointer-events-none transform -rotate-2"></div>
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-inner">
                  <video
                    ref={storyVideoRef}
                    src="/story.mp4"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#63C132] animate-ping"></span>
                    Live Udumalpet Press
                  </div>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 text-left space-y-8 relative z-10">
              <div className="space-y-3">
                <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
                  THE SOIL & THE PRESS
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E] leading-tight">
                  Handcrafted Nutrition, Straight from Tamil Nadu
                </h2>
              </div>
              <div className="w-16 h-[2px] bg-[#C89B3C]"></div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                Yora was established on a simple premise: returning pure, unrefined wood-pressed nutrition back to modern homes. We source high-grade coconuts and seeds directly from farmers in the rich soil of Tirupur.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                By pressing slowly in native Vaagai wooden mortar structures, we ensure minimal temperature change. This keeps delicate nutrients intact, capturing the natural taste and aromas of traditional purity.
              </p>
              <div className="pt-4">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F3D2E] hover:text-[#63C132] transition-colors"
                >
                  Discover Founder Story &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Craft Process Timeline with glowing steps */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            HOW WE BOTTLE PURITY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E]">
            The Clarification Path
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Step navigation inside a Glass Card */}
          <div className="lg:col-span-5 space-y-4">
            {craftSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCraftStep(idx)}
                className={`w-full text-left p-6.5 rounded-3xl transition-all duration-300 flex items-center justify-between border ${activeCraftStep === idx
                  ? "bg-white border-[#63C132]/30 shadow-xl"
                  : "bg-transparent border-transparent hover:bg-white/40"
                  }`}
              >
                <div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest ${activeCraftStep === idx ? "text-[#63C132]" : "text-slate-400"}`}>
                    {step.badge}
                  </span>
                  <h4 className={`font-serif text-base font-bold mt-1 ${activeCraftStep === idx ? "text-[#0F3D2E]" : "text-slate-500"}`}>
                    {step.title}
                  </h4>
                </div>
                <span className={`text-xl transition-transform duration-300 ${activeCraftStep === idx ? "rotate-90 text-[#63C132]" : "text-slate-300"}`}>
                  &rarr;
                </span>
              </button>
            ))}
          </div>

          {/* Right: Detailed active step panel */}
          <div className="lg:col-span-7">
            <div className="glass-card bg-white/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative min-h-[350px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-[#63C132]/10 border border-[#63C132]/25 text-[#0F3D2E] text-[10px] font-extrabold uppercase tracking-wider">
                    {craftSteps[activeCraftStep].location}
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-[#C89B3C]/40">
                    {craftSteps[activeCraftStep].badge}
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-extrabold text-[#0F3D2E]">
                  {craftSteps[activeCraftStep].title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                  {craftSteps[activeCraftStep].desc}
                </p>
              </div>
              <div className="pt-8 border-t border-[#0F3D2E]/10 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#63C132] animate-ping"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0F3D2E]">Nutrients retained at room temp pressing</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Apple Store-Style Product Cards Grid */}
      <section className="py-24 bg-[#FDFBF5] relative overflow-hidden">
        {/* Decorative background word */}
        <div className="absolute top-1/4 right-10 text-giant select-none pointer-events-none uppercase">
          ORGANIC
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              OUR DIRECT BOTTLES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E]">
              The Traditional Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Product 1: Coconut */}
            <div className="glass-card bg-white/70 p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="bg-[#63C132] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Best Seller
                  </span>
                  <div className="flex gap-0.5">
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-3xl aspect-square flex items-center justify-center bg-gradient-to-b from-white to-[#F4FCEF]">
                  <img
                    src="/images/evcocard.png"
                    alt="Yora Extra Virgin Coconut Oil"
                    className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Centrifuged Pure
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#0F3D2E]">
                    Extra Virgin Coconut Oil (Centrifuged)
                  </h3>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    Centrifuged extraction preserves coconut enzymes, raw antioxidants, and zero oily odors.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0F3D2E]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F3D2E]">{formatPrice(250)}</span>
                  <div className="flex items-center border border-[#182218]/15 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQty("coconut", false)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#0F3D2E]">{quantities.coconut}</span>
                    <button
                      onClick={() => updateQty("coconut", true)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(quantities.coconut, "coconut", "Extra Virgin Coconut Oil (Centrifuged)", 250, "/images/evcocard.png")}
                  className="w-full bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-102"
                >
                  Quick Add to Cart
                </button>
              </div>
            </div>

            {/* Product 2: Groundnut */}
            <div className="glass-card bg-white/70 p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="bg-[#C89B3C] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Vaagai Pressed
                  </span>
                  <div className="flex gap-0.5">
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-3xl aspect-square flex items-center justify-center bg-gradient-to-b from-white to-[#FDFBF5]">
                  <img
                    src="/images/goilard.png"
                    alt="Yora Wood-Pressed Groundnut Oil"
                    className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Wood Mortar (Vaagai)
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#0F3D2E]">
                    Wood-Pressed Groundnut (Peanut) Oil
                  </h3>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    Vaagai wood absorbs heat, preserving vitamins E & B with deep natural peanut aromas.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0F3D2E]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F3D2E]">{formatPrice(258)}</span>
                  <div className="flex items-center border border-[#182218]/15 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQty("groundnut", false)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#0F3D2E]">{quantities.groundnut}</span>
                    <button
                      onClick={() => updateQty("groundnut", true)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(quantities.groundnut, "groundnut", "Wood-Pressed Groundnut Oil", 258, "/images/goilard.png")}
                  className="w-full bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-102"
                >
                  Quick Add to Cart
                </button>
              </div>
            </div>

            {/* Product 3: Sesame */}
            <div className="glass-card bg-white/70 p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="bg-[#2F6B3D] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Pure Gingelly
                  </span>
                  <div className="flex gap-0.5">
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                    <StarIcon filled />
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-3xl aspect-square flex items-center justify-center bg-gradient-to-b from-white to-[#F4FCEF]">
                  <img
                    src="/images/sesamecard.png"
                    alt="Yora Wood-Pressed Sesame Oil"
                    className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Sun-Dried Seeds
                  </div>
                </div>

                <div className="text-left space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#0F3D2E]">
                    Wood-Pressed Sesame (Gingelly) Oil
                  </h3>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    Pressed with natural palm jaggery, creating a rich sweet aroma and healthy vitamins.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0F3D2E]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#0F3D2E]">{formatPrice(160)}</span>
                  <div className="flex items-center border border-[#182218]/15 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQty("sesame", false)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#0F3D2E]">{quantities.sesame}</span>
                    <button
                      onClick={() => updateQty("sesame", true)}
                      className="px-3 py-1 text-xs hover:bg-[#182218]/5 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(quantities.sesame, "sesame", "Wood-Pressed Sesame Oil", 160, "/images/sesamecard.png")}
                  className="w-full bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-102"
                >
                  Quick Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonials Row with Floating Cards */}
      <section className="py-24 bg-[#F3F0E7] relative overflow-hidden">
        {/* Decorative background word */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
          LOVE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              VERIFIED COOKS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E]">
              Loved by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ramya",
                role: "Bangalore, India",
                quote: "Its Totally worth of cost . and suits for all skin type. I started using past 2 weeks its too good for as moisturizer and body lotion.",
                stars: 5,
              },
              {
                name: "Bhuvana",
                role: "Chennai, India",
                quote: "Loving the taste, quality and texture. It enhances the taste of any traditional dish which we prepare. The aroma is pure wood-press.",
                stars: 5,
              },
              {
                name: "S.V. Sarveshwaran",
                role: "Coimbatore, India",
                quote: "YORA is always special... குணமுள்ள எண்ணெய்! நிறைவு மனமடையும். ரொம்ப பிரமாதம்! The authenticity is visible in color and viscosity.",
                stars: 5,
              }
            ].map((review, i) => (
              <div
                key={i}
                className="glass-card bg-white/80 p-8.5 rounded-[2.5rem] shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.stars }).map((_, idx) => (
                      <StarIcon key={idx} filled />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-8 border-t border-[#0F3D2E]/10 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2F6B3D]/10 text-[#0F3D2E] flex items-center justify-center font-bold font-serif text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h5 className="font-serif text-xs font-bold text-[#0F3D2E]">{review.name}</h5>
                    <p className="text-[9px] text-slate-400 font-medium tracking-wide uppercase">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Masonry-like Instagram Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            #THEYORACOOKS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F3D2E]">
            Follow the Farm
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "/loginsideimage.png",
            "/yra.png",
            "/images/goilard.png",
            "/images/evcocard.png",
          ].map((imgUrl, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden aspect-square border border-[#182218]/10 bg-white flex items-center justify-center p-4">
              <img src={imgUrl} alt="Instagram Post" className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0F3D2E]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest">View Post</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
