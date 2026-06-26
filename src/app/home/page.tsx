"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

// Inline Icons to keep builds light, clean and dependency-free
function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#D4AF37" : "none"} // Gold color
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

function ArrowIcon({ className = "size-4", direction = "right" }: { className?: string; direction?: "left" | "right" | "up" | "down" }) {
  const rotation = {
    left: "rotate-180",
    right: "",
    up: "-rotate-90",
    down: "rotate-90",
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={`${className} ${rotation} transition-transform duration-300`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default function HomePage() {
  const [activeCraftStep, setActiveCraftStep] = useState(0);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const [quantities, setQuantities] = useState({
    coconut: 1,
    groundnut: 1,
    sesame: 1,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const storyVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (storyVideoRef.current) {
        const rect = storyVideoRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          storyVideoRef.current.play().catch(e => {});
        } else {
          storyVideoRef.current.pause();
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
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

  const reviews = [
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
      name: "Vibha Joshi",
      role: "Mumbai, India",
      quote: "100% pure, natural peanut oil. Great for heart health and daily cooking. Highly recommended! Delivery to Mumbai was fast and clean.",
      stars: 5,
    },
    {
      name: "S.V. Sarveshwaran",
      role: "Coimbatore, India",
      quote: "YORA is always special... குணமுள்ள எண்ணெய்! நிறைவு மனமடையும். ரொம்ப பிரமாதம்! The authenticity is visible in color and viscosity.",
      stars: 5,
    },
    {
      name: "Karthik Raja",
      role: "Trichy, India",
      quote: "The wood-pressed sesame oil is outstanding. My family has been using it for deep frying and traditional cooking. Excellent packaging and quick delivery.",
      stars: 5,
    },
    {
      name: "Anjali Sharma",
      role: "Delhi, India",
      quote: "Finally, an oil brand that keeps its promise of zero preservatives. Cooking in Yora groundnut oil reminds me of my grandmother's home-cooked meals.",
      stars: 5,
    }
  ];

  const handleAddToCart = (qty: number, productName: string) => {
    let productId = "coconut";
    if (productName.includes("Groundnut")) productId = "groundnut";
    else if (productName.includes("Sesame")) productId = "sesame";

    const metadata: Record<string, { name: string; price: number; image: string }> = {
      coconut: {
        name: "Yora Extra Virgin Coconut Oil (Cold Centrifuged)",
        price: 250,
        image: "/images/evcocard.png"
      },
      groundnut: {
        name: "Cold-Pressed Groundnut (Peanut) Oil",
        price: 258,
        image: "/images/goilard.png"
      },
      sesame: {
        name: "Cold-Pressed Sesame (Gingelly) Oil",
        price: 160,
        image: "/images/sesamecard.png"
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
    
    // Dispatch a storage event to alert other components in the same window
    window.dispatchEvent(new Event("storage"));

    // Create elegant toast notification
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
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    }, 50);

    // Animate out
    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes("@")) {
      setSubscribeStatus("error");
      return;
    }
    setSubscribeStatus("success");
    setSubscribedEmail("");
    setTimeout(() => setSubscribeStatus("idle"), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased">
      <Header />

      {/* 3. Hero Section (Full-Width Banner Image, No Text) */}
      <section className="relative w-full overflow-hidden bg-[#FAF7F0] pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <a href="/shop" className="block relative group overflow-hidden rounded-[2rem] shadow-2xl border border-[#102316]/5 transition-all duration-500 hover:scale-[1.01]">
            <img
              src="/images/banner.png"
              alt="Yora Premium Oils Banner"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </a>
        </div>
      </section>

      {/* 4. Features Banner (Glassmorphic cards) */}
      <section className="-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white rounded-3xl border border-[#102316]/5 shadow-2xl p-8 sm:p-10 backdrop-blur-xl bg-opacity-95">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#102316]/10">
            {/* Feature 1 */}
            <div className="flex items-center gap-5 py-3 sm:py-0 lg:px-4">
              <div className="p-4 bg-[#1F4D2E]/5 rounded-2xl text-[#1F4D2E] shadow-inner shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-[#102316] tracking-wide">Free Global Shipping</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-bold">Complimentary shipping on orders over ₹999</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-5 py-3 sm:py-0 sm:pl-6 lg:pl-6 lg:px-4">
              <div className="p-4 bg-[#1F4D2E]/5 rounded-2xl text-[#1F4D2E] shadow-inner shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-[#102316] tracking-wide">100% Organics</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-bold">Pure ingredients verified from organic soil</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-5 py-3 sm:py-0 lg:pl-6 lg:px-4">
              <div className="p-4 bg-[#1F4D2E]/5 rounded-2xl text-[#1F4D2E] shadow-inner shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-[#102316] tracking-wide">Traditional Press</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-bold">Slow-pressed in native Vaagai wood mortars</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-5 py-3 sm:py-0 sm:pl-6 lg:pl-6 lg:px-4">
              <div className="p-4 bg-[#1F4D2E]/5 rounded-2xl text-[#1F4D2E] shadow-inner shrink-0">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-[#102316] tracking-wide">Chemical-Free Promise</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-bold">No artificial refinements, preservatives, or color</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet Yora (Editorial Brand Story with single centered column) */}
      <section className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Heading */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            MEET YORA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#102316]">
            Rooted in Tradition, <br />
            <span className="text-[#7AA33C] italic font-normal">Nourished by Purity</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37]/60 mx-auto mt-4"></div>
        </div>
        
        {/* Detail/Text */}
        <div className="max-w-3xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed font-light space-y-6">
          <p>
            At Yora, we believe food should be wholesome, nourishing, and true to its natural origins. Our journey started on private organic farms in Udumalpet, seeking a return to traditional wood pressing structures that extract oil without destroying temperature-sensitive enzymes.
          </p>
          <p>
            Our promise is absolute: 100% raw, unrefined, and organic cold-pressed oil, clear of chemicals, sulphur, or artificial preservation methods. The result is oil rich in aroma, natural color, and raw nutrients that support cardiovascular health, skincare, and gourmet food preparation.
          </p>

          <div className="flex justify-center gap-12 pt-4">
            <div className="border-l-2 border-[#7AA33C] pl-4 text-left">
              <p className="font-serif text-2xl font-bold text-[#102316]">0%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Chemicals & Sulphur</p>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-4 text-left">
              <p className="font-serif text-2xl font-bold text-[#102316]">100%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Wood Pressed (Vaagai)</p>
            </div>
          </div>
        </div>

        {/* Video centered below details */}
        <div className="max-w-3xl mx-auto rounded-[2rem] overflow-hidden border border-[#102316]/5 shadow-2xl bg-white relative">
          <video
            ref={storyVideoRef}
            src="/yoravideo.mp4"
            controls
            playsInline
            loop
            className="w-full h-auto object-cover aspect-video"
          />
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <a 
            href="/about" 
            className="inline-flex items-center gap-3 bg-[#102316] hover:bg-[#7AA33C] text-white text-xs font-bold px-8 py-4.5 rounded-full transition-all duration-300 hover:shadow-xl uppercase tracking-widest"
          >
            Discover Our Heritage
            <ArrowIcon className="size-4" direction="right" />
          </a>
        </div>
      </section>

      {/* 6. The Yora Way (Interactive Timeline Craft Section) */}
      <section className="py-24 bg-[#F3ECE0]/50 border-y border-[#102316]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              OUR CRAFT PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102316] mt-3">
              The Yora Way
            </h2>
            <p className="text-slate-500 text-sm mt-4 font-light leading-relaxed">
              We preserve biological integrity through slower traditional methods. Here is how we craft our signature cold-pressed oils.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Timeline tabs */}
            <div className="lg:col-span-5 space-y-4 text-left">
              {craftSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCraftStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex gap-5 items-start ${
                    activeCraftStep === idx
                      ? "bg-white border-[#D4AF37] shadow-xl translate-x-2"
                      : "bg-transparent border-[#102316]/5 hover:bg-white/40 hover:border-[#102316]/10"
                  }`}
                >
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase shrink-0 ${
                    activeCraftStep === idx ? "bg-[#7AA33C] text-white" : "bg-[#102316]/5 text-slate-500"
                  }`}>
                    {step.badge}
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#102316]">{step.title}</h4>
                    <p className="text-[10px] text-[#7AA33C] font-bold tracking-wider mt-0.5">{step.location}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Display panel */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#102316]/5 shadow-xl relative min-h-[350px] flex flex-col justify-between text-left">
              {/* Graphic background detail */}
              <div className="absolute top-8 right-8 text-slate-100 font-serif text-9xl font-bold leading-none pointer-events-none select-none">
                0{activeCraftStep + 1}
              </div>

              <div className="space-y-6 relative z-10">
                <span className="text-[#D4AF37] font-extrabold text-[10px] tracking-[0.22em] uppercase block font-bold">
                  Manufacturing Standard
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102316]">
                  {craftSteps[activeCraftStep].title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {craftSteps[activeCraftStep].desc}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-8 border-t border-slate-100 mt-6 relative z-10">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/50 bg-white flex items-center justify-center p-0.5 shrink-0">
                  <img src="/yora.png" alt="QC check" className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Certified Process &middot; Udumalpet Unit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Curated Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-16 gap-4">
          <div className="text-left space-y-2">
            <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              DISCOVER CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">
              Curated Collections
            </h2>
          </div>
          <a 
            href="/shop" 
            className="group flex items-center gap-2 text-xs font-bold text-[#102316] hover:text-[#7AA33C] transition-colors uppercase tracking-widest shrink-0"
          >
            Shop All Products
            <ArrowIcon className="size-4" direction="right" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Extra Virgin Coconut Oil",
              desc: "Cold Centrifuged raw milk extract",
              img: "/images/evcocard.png",
              link: "/shop?category=coconut",
            },
            {
              title: "Cold-Pressed Groundnut Oil",
              desc: "Traditional Vaagai slow-pressed",
              img: "/images/goilard.png",
              link: "/shop?category=groundnut",
            },
            {
              title: "Cold-Pressed Sesame Oil",
              desc: "Sun-dried gingelly with palm jaggery",
              img: "/images/sesamecard.png",
              link: "/shop?category=sesame",
            },
          ].map((cat, index) => (
            <a 
              key={index} 
              href={cat.link}
              className="bg-white border border-[#102316]/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="p-8 flex items-center justify-center bg-[#F3ECE0]/30 border-b border-[#102316]/5 overflow-hidden h-44 relative">
                {/* Visual decoration overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="h-24 w-auto object-contain transition-transform duration-700 group-hover:scale-108 filter drop-shadow-md" 
                />
              </div>
              <div className="p-6 text-left flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#102316] leading-snug group-hover:text-[#7AA33C] transition-colors">{cat.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{cat.desc}</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#102316]/5 text-[#102316] flex items-center justify-center group-hover:bg-[#7AA33C] group-hover:text-white transition duration-300 shrink-0 shadow-inner">
                  <ArrowIcon className="size-3.5" direction="right" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. Bestsellers Shelf (Signature Collection) */}
      <section id="bestsellers" className="py-24 bg-[#FAF7F0] border-t border-[#102316]/5 relative">
        {/* Soft background shape */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#FAF7F0]/60 filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-16 gap-4">
            <div className="text-left space-y-2">
              <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
                OUR BESTSELLERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">
                The Signature Collection
              </h2>
            </div>
            <a 
              href="/shop" 
              className="group flex items-center gap-2 text-xs font-bold text-[#102316] hover:text-[#7AA33C] transition-colors uppercase tracking-widest shrink-0"
            >
              View Full Catalog
              <ArrowIcon className="size-4" direction="right" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1: Coconut Oil (Active) */}
            <div className="bg-white border border-[#102316]/5 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative flex flex-col justify-between text-left group">
              <div>
                <span className="absolute top-4 left-4 bg-[#7AA33C] text-white text-[8px] font-extrabold py-1.5 px-3 rounded-full uppercase tracking-wider shadow-sm z-10 animate-pulse">
                  Best Seller
                </span>
                
                <div className="h-56 flex items-center justify-center mb-6 overflow-hidden bg-[#F3ECE0]/30 rounded-2xl p-4 border border-[#102316]/5 relative">
                  <img 
                    src="/images/evcocard.png" 
                    alt="Yora Extra Virgin Coconut Oil" 
                    className="max-h-[85%] w-auto object-contain transition-transform duration-700 group-hover:scale-103" 
                  />
                </div>
                
                <h3 className="font-serif text-base font-bold text-[#102316] hover:text-[#7AA33C] transition-colors leading-tight min-h-12">
                  Yora Extra Virgin Coconut Oil (Cold Centrifuged)
                </h3>
                
                <div className="flex items-center gap-1 mt-2 mb-4">
                  <div className="flex gap-0.5">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold ml-1.5">(12 Verified Reviews)</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2.5 mb-4 border-t border-slate-100 pt-4">
                  <span className="text-xl font-bold text-[#102316]">{formatPrice(250)}</span>
                  <span className="text-xs text-slate-400 line-through font-medium">{formatPrice(650)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-[#102316]/10 rounded-xl overflow-hidden h-11 w-full bg-slate-50/50">
                    <button 
                      onClick={() => updateQty("coconut", false)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold font-mono">{quantities.coconut}</span>
                    <button 
                      onClick={() => updateQty("coconut", true)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] tracking-wider uppercase font-bold">
                    <button 
                      onClick={() => handleAddToCart(quantities.coconut, "Yora Extra Virgin Coconut Oil (500ml)")}
                      className="border border-[#102316] hover:bg-[#102316] hover:text-white py-3 rounded-xl transition duration-300"
                    >
                      Add
                    </button>
                    <button 
                      onClick={() => { handleAddToCart(quantities.coconut, "Yora Extra Virgin Coconut Oil (500ml)"); }}
                      className="bg-[#7AA33C] hover:bg-[#8CB847] text-white py-3 rounded-xl transition duration-300 shadow-md shadow-[#7AA33C]/10"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2: Groundnut Oil */}
            <div className="bg-white border border-[#102316]/5 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative flex flex-col justify-between text-left group">
              <div>
                <span className="absolute top-4 left-4 bg-[#7AA33C] text-white text-[8px] font-extrabold py-1.5 px-3 rounded-full uppercase tracking-wider shadow-sm z-10 animate-pulse">
                  Best Seller
                </span>
                
                <div className="h-56 flex items-center justify-center mb-6 overflow-hidden bg-[#F3ECE0]/30 rounded-2xl p-4 border border-[#102316]/5 relative">
                  <img 
                    src="/images/goilard.png" 
                    alt="Cold-Pressed Groundnut (Peanut) Oil" 
                    className="max-h-[85%] w-auto object-contain transition-transform duration-700 group-hover:scale-103" 
                  />
                </div>
                
                <h3 className="font-serif text-base font-bold text-[#102316] hover:text-[#7AA33C] transition-colors leading-tight min-h-12">
                  Cold-Pressed Groundnut (Peanut) Oil
                </h3>
                
                <div className="flex items-center gap-1 mt-2 mb-4">
                  <div className="flex gap-0.5">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold ml-1.5">(18 Verified Reviews)</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2.5 mb-4 border-t border-slate-100 pt-4">
                  <span className="text-xl font-bold text-[#102316]">{formatPrice(258)}</span>
                  <span className="text-xs text-slate-400 line-through font-medium">{formatPrice(399)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-[#102316]/10 rounded-xl overflow-hidden h-11 w-full bg-slate-50/50">
                    <button 
                      onClick={() => updateQty("groundnut", false)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold font-mono">{quantities.groundnut}</span>
                    <button 
                      onClick={() => updateQty("groundnut", true)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] tracking-wider uppercase font-bold">
                    <button 
                      onClick={() => handleAddToCart(quantities.groundnut, "Cold-Pressed Groundnut Oil (500ml)")}
                      className="border border-[#102316] hover:bg-[#102316] hover:text-white py-3 rounded-xl transition duration-300"
                    >
                      Add
                    </button>
                    <button 
                      onClick={() => { handleAddToCart(quantities.groundnut, "Cold-Pressed Groundnut Oil (500ml)"); }}
                      className="bg-[#7AA33C] hover:bg-[#8CB847] text-white py-3 rounded-xl transition duration-300 shadow-md shadow-[#7AA33C]/10"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 4: Sesame Oil */}
            <div className="bg-white border border-[#102316]/5 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative flex flex-col justify-between text-left group">
              <div>
                <span className="absolute top-4 left-4 bg-[#7AA33C] text-white text-[8px] font-extrabold py-1.5 px-3 rounded-full uppercase tracking-wider shadow-sm z-10">
                  Sale
                </span>
                
                <div className="h-56 flex items-center justify-center mb-6 overflow-hidden bg-[#F3ECE0]/30 rounded-2xl p-4 border border-[#102316]/5 relative">
                  <img 
                    src="/images/sesamecard.png" 
                    alt="Cold-Pressed Sesame (Gingelly) Oil" 
                    className="max-h-[85%] w-auto object-contain transition-transform duration-700 group-hover:scale-103" 
                  />
                </div>
                
                <h3 className="font-serif text-base font-bold text-[#102316] hover:text-[#7AA33C] transition-colors leading-tight min-h-12">
                  Cold-Pressed Sesame (Gingelly) Oil
                </h3>
                
                <div className="flex items-center gap-1 mt-2 mb-4">
                  <div className="flex gap-0.5">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold ml-1.5">(14 Verified Reviews)</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2.5 mb-4 border-t border-slate-100 pt-4">
                  <span className="text-xl font-bold text-[#102316]">{formatPrice(160)}</span>
                  <span className="text-xs text-slate-400 line-through font-medium">{formatPrice(349)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-[#102316]/10 rounded-xl overflow-hidden h-11 w-full bg-slate-50/50">
                    <button 
                      onClick={() => updateQty("sesame", false)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold font-mono">{quantities.sesame}</span>
                    <button 
                      onClick={() => updateQty("sesame", true)}
                      className="px-4 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] tracking-wider uppercase font-bold">
                    <button 
                      onClick={() => handleAddToCart(quantities.sesame, "Cold-Pressed Sesame Oil (500ml)")}
                      className="border border-[#102316] hover:bg-[#102316] hover:text-white py-3 rounded-xl transition duration-300"
                    >
                      Add
                    </button>
                    <button 
                      onClick={() => { handleAddToCart(quantities.sesame, "Cold-Pressed Sesame Oil (500ml)"); }}
                      className="bg-[#7AA33C] hover:bg-[#8CB847] text-white py-3 rounded-xl transition duration-300 shadow-md shadow-[#7AA33C]/10"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials (Luxury Masonry/Grid Layout) */}
      <section className="py-24 bg-[#F3ECE0]/30 border-t border-[#102316]/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              TESTIMONIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#102316] mt-3">
              Voices of Trust
            </h2>
            <p className="text-slate-500 text-sm mt-4 font-light leading-relaxed">
              We strive for purity, and our clients notice. Read verified experiences from families who transitioned to Yora.
            </p>
          </div>

          <div className="relative w-full overflow-hidden mask-gradient py-6">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2">
              {/* First set of reviews */}
              <div className="flex gap-8 pr-8 shrink-0">
                {reviews.map((review, index) => (
                  <div 
                    key={`review-1-${index}`} 
                    className="w-[280px] sm:w-[360px] bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left flex flex-col justify-between relative group shrink-0"
                  >
                    {/* Graphic editorial quote mark */}
                    <span className="absolute top-6 right-8 text-[#7AA33C]/10 font-serif text-7xl leading-none pointer-events-none select-none group-hover:text-[#7AA33C]/20 transition-colors">“</span>
                    
                    <div>
                      <div className="flex gap-0.5 mb-6">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <p className="text-slate-600 text-xs sm:text-[13px] italic leading-relaxed mb-8 font-light relative z-10 min-h-[72px]">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/45 shrink-0 bg-[#FAF7F0] flex items-center justify-center text-[10px] font-bold text-[#102316]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-serif text-xs font-bold text-[#102316] uppercase tracking-wider">{review.name}</h5>
                        <p className="text-[9px] text-[#7AA33C] font-bold tracking-widest mt-0.5 uppercase">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second set of reviews (identical clone) */}
              <div className="flex gap-8 pr-8 shrink-0" aria-hidden="true">
                {reviews.map((review, index) => (
                  <div 
                    key={`review-2-${index}`} 
                    className="w-[280px] sm:w-[360px] bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left flex flex-col justify-between relative group shrink-0"
                  >
                    {/* Graphic editorial quote mark */}
                    <span className="absolute top-6 right-8 text-[#7AA33C]/10 font-serif text-7xl leading-none pointer-events-none select-none group-hover:text-[#7AA33C]/20 transition-colors">“</span>
                    
                    <div>
                      <div className="flex gap-0.5 mb-6">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <p className="text-slate-600 text-xs sm:text-[13px] italic leading-relaxed mb-8 font-light relative z-10 min-h-[72px]">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/45 shrink-0 bg-[#FAF7F0] flex items-center justify-center text-[10px] font-bold text-[#102316]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-serif text-xs font-bold text-[#102316] uppercase tracking-wider">{review.name}</h5>
                        <p className="text-[9px] text-[#7AA33C] font-bold tracking-widest mt-0.5 uppercase">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Newsletter Journal Section */}
      <section className="bg-[#102316] text-[#FAF7F0] py-24 border-b border-white/5 relative overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7AA33C]/10 filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
              JOIN THE JOURNAL
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Subscribe to Healthier Living
            </h3>
            <p className="text-[#FAF7F0]/70 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              Get seasonal harvesting reports, traditional cold-pressed oil recipes, special value discounts, and wellness updates straight to your mailbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto pt-4">
              <input
                type="email"
                required
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/10 text-white placeholder-white/40 px-6 py-4 rounded-xl text-xs border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7AA33C] focus:border-transparent flex-grow shadow-inner text-center sm:text-left transition-all"
              />
              <button
                type="submit"
                className="bg-[#7AA33C] hover:bg-[#8CB847] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition duration-300 shadow-lg shadow-[#7AA33C]/20"
              >
                Subscribe
              </button>
            </form>
            
            {subscribeStatus === "success" && (
              <p className="text-[#7AA33C] text-xs font-bold animate-pulse pt-2">
                ✓ Thank you! You've been successfully subscribed to our organic journal.
              </p>
            )}
            {subscribeStatus === "error" && (
              <p className="text-red-400 text-xs font-bold pt-2">
                ⚠ Please enter a valid email address.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
