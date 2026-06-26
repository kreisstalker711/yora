"use client";

import React, { useState, useEffect } from "react";

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

function CloseIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MenuIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

export function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    "Traditional wood-pressed (Vaagai) oils - pure health for your family",
    "Free shipping across India on orders over ₹999",
    "Direct farm sourcing from Udumalpet, Tamil Nadu"
  ];

  useEffect(() => {
    // Sync cart count from localStorage
    const updateCart = () => {
      const stored = localStorage.getItem("yora_cart_count");
      if (stored) setCartCount(parseInt(stored, 10));
    };

    // Sync currency from localStorage
    const updateCurrency = () => {
      const stored = localStorage.getItem("yora_currency");
      if (stored) setSelectedCurrency(stored);
    };

    updateCart();
    updateCurrency();
    window.addEventListener("storage", updateCart);
    window.addEventListener("storage", updateCurrency);
    
    // Poll localstorage because storage event only fires on other windows
    const timer2 = setInterval(() => {
      updateCart();
      updateCurrency();
    }, 1000);

    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("storage", updateCurrency);
      clearInterval(timer);
      clearInterval(timer2);
    };
  }, []);

  const changeCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    localStorage.setItem("yora_currency", currency);
    window.dispatchEvent(new Event("storage"));
  };

  const handleNextAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
  };

  const handlePrevAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-[#102316] text-[#FAF7F0] text-xs py-3 px-4 relative z-50 border-b border-white/5 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handlePrevAnnouncement} 
            className="text-white/40 hover:text-[#7AA33C] transition-colors focus:outline-none"
            aria-label="Previous announcement"
          >
            <ArrowIcon className="size-3.5" direction="left" />
          </button>
          
          <div className="text-center font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7AA33C]"></span>
            {announcements[announcementIdx]}
            <span className="w-1.5 h-1.5 rounded-full bg-[#7AA33C]"></span>
          </div>

          <button 
            onClick={handleNextAnnouncement} 
            className="text-white/40 hover:text-[#7AA33C] transition-colors focus:outline-none"
            aria-label="Next announcement"
          >
            <ArrowIcon className="size-3.5" direction="right" />
          </button>
        </div>
      </div>

      {/* 2. Translucent Luxury Header Navigation */}
      <header className="sticky top-0 bg-[#FAF7F0]/85 backdrop-blur-md border-b border-[#102316]/5 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          {/* Menu Button for Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#102316] hover:text-[#7AA33C] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Left Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-[#102316]/80">
            <a href="/home" className="hover:text-[#7AA33C] transition-colors py-2 border-b border-transparent hover:border-[#7AA33C]/30 font-bold">Home</a>
            <a href="/about" className="hover:text-[#7AA33C] transition-colors py-2 border-b border-transparent hover:border-[#7AA33C]/30 font-bold">Meet Yora</a>
            
            {/* Shop Dropdown */}
            <div className="relative group py-2 cursor-pointer">
              <span className="flex items-center gap-1 hover:text-[#7AA33C] transition-colors font-bold">
                Shop
                <ArrowIcon className="size-2.5" direction="down" />
              </span>
              <div className="absolute top-full left-0 bg-[#FAF7F0] border border-[#102316]/10 py-3 w-56 rounded-2xl shadow-2xl opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <a href="/shop" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] transition-colors font-bold">All Products</a>
                <hr className="my-1 border-[#102316]/5" />
                <a href="/shop?category=coconut" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] transition-colors font-bold">Extra Virgin Coconut Oil</a>
                <a href="/shop?category=groundnut" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] transition-colors font-bold">Wood-Pressed Groundnut Oil</a>
                <a href="/shop?category=sesame" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] transition-colors font-bold">Wood-Pressed Sesame Oil</a>
                <a href="/shop?category=combos" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] transition-colors font-bold">Family Value Combos</a>
              </div>
            </div>
          </nav>

          {/* Central Logo Emblem - Using yra.png */}
          <a href="/home" className="flex items-center focus:outline-none transition group">
            <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
              <img 
                src="/yra.png" 
                alt="Yora Logo" 
                className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Right Action Items */}
          <div className="flex items-center gap-6 text-[#102316]/80">
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 text-[10px] font-bold tracking-widest border border-[#102316]/10 px-4 py-2 rounded-full bg-white/40 hover:bg-white hover:border-[#102316]/30 transition-all shadow-sm focus:outline-none"
              >
                <span>{selectedCurrency === "INR" ? "🇮🇳 INR" : "🇺🇸 USD"}</span>
                <ArrowIcon className="size-2.5 text-slate-500" direction="down" />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#FAF7F0] border border-[#102316]/10 w-28 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in">
                  <button 
                    onClick={() => { changeCurrency("INR"); setCurrencyOpen(false); }} 
                    className="w-full text-left px-4 py-2 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] font-bold text-slate-700"
                  >
                    🇮🇳 INR
                  </button>
                  <button 
                    onClick={() => { changeCurrency("USD"); setCurrencyOpen(false); }} 
                    className="w-full text-left px-4 py-2 text-[10px] tracking-wider uppercase hover:bg-[#102316]/5 hover:text-[#7AA33C] font-bold text-slate-700"
                  >
                    🇺🇸 USD
                  </button>
                </div>
              )}
            </div>

            {/* Stories / Wholesale Quick Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase">
              <a href="/stories" className="hover:text-[#7AA33C] transition-colors py-2 font-bold">Stories</a>
              <a href="/wholesale" className="hover:text-[#7AA33C] transition-colors py-2 font-bold">Wholesale</a>
            </nav>

            {/* Contact icon */}
            <a href="/contact" className="hover:text-[#7AA33C] transition-colors p-1 md:block hidden" aria-label="Contact us">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.28-5.716-4.172-6.996-6.996l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>

            {/* Cart Icon */}
            <a href="/cart" className="relative hover:text-[#7AA33C] transition-colors p-1 shrink-0 block" aria-label="Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#7AA33C] text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border border-[#FAF7F0] animate-bounce">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#102316]/5 bg-[#FAF7F0]/95 backdrop-blur-lg animate-fade-in">
            <div className="px-6 py-8 flex flex-col gap-6 text-[12px] font-bold tracking-widest uppercase">
              <a href="/home" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Home</a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Meet Yora</a>
              <a href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Shop All Products</a>
              <a href="/stories" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Stories & Recipes</a>
              <a href="/cart" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C] flex items-center justify-between">
                <span>Cart</span>
                {cartCount > 0 && <span className="bg-[#7AA33C] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">{cartCount}</span>}
              </a>
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Contact Farm</a>
              <a href="/wholesale" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7AA33C]">Wholesale & Bulk</a>
              <hr className="border-[#102316]/10" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Currency</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => changeCurrency("INR")} 
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${selectedCurrency === "INR" ? "bg-[#102316] text-[#FAF7F0] border-transparent" : "border-[#102316]/10 text-slate-700"}`}
                  >
                    🇮🇳 INR
                  </button>
                  <button 
                    onClick={() => changeCurrency("USD")} 
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${selectedCurrency === "USD" ? "bg-[#102316] text-[#FAF7F0] border-transparent" : "border-[#102316]/10 text-slate-700"}`}
                  >
                    🇺🇸 USD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
