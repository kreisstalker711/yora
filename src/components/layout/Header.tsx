"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { useAuth } from "@/src/context/AuthContext";
import { useWishlist } from "@/src/context/WishlistContext";

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

function UserIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function SearchIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

export function Header() {
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { region, setRegion } = useCurrency();
  const { user, signOut } = useAuth();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
  };

  const announcements = [
    "Premium cold-pressed oils - pure health for your family",
    "Free shipping across India on orders over ₹999",
    "Direct farm sourcing from Udumalpet, Tamil Nadu"
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, [announcements.length]);

  const handleNextAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
  };

  const handlePrevAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-primary text-white text-xs py-2.5 px-4 relative z-50 border-b border-white/10 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevAnnouncement}
            className="text-white/55 hover:text-accent transition-colors focus:outline-none"
            aria-label="Previous announcement"
          >
            <ArrowIcon className="size-3.5" direction="left" />
          </button>

          <div className="text-center font-semibold tracking-widest text-[9px] sm:text-xs uppercase">
            {announcements[announcementIdx]}
          </div>

          <button
            onClick={handleNextAnnouncement}
            className="text-white/55 hover:text-accent transition-colors focus:outline-none"
            aria-label="Next announcement"
          >
            <ArrowIcon className="size-3.5" direction="right" />
          </button>
        </div>
      </div>

      {/* 2. Fixed/Sticky Navbar */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "top-0 glass-nav shadow-sm py-3 h-20"
            : "top-10 bg-transparent border-b border-ink/5 py-5 h-24"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Menu Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:text-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Left Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-ink/90">
            <a href="/home" className="hover:text-accent transition-all duration-300 py-2 border-b-2 border-transparent hover:border-accent">
              Home
            </a>
            <a href="/about" className="hover:text-accent transition-all duration-300 py-2 border-b-2 border-transparent hover:border-accent">
              Meet Yora
            </a>

            {/* Shop Dropdown */}
            <div className="relative group py-2 cursor-pointer">
              <span className="flex items-center gap-1 hover:text-accent transition-all duration-300">
                Shop
                <ArrowIcon className="size-2.5 text-ink/60" direction="down" />
              </span>
              <div className="absolute top-full left-0 card-surface py-3 w-56 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <a href="/shop" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary transition-colors font-bold rounded-[var(--radius-sm)]">All Products</a>
                <hr className="my-1 border-ink/10" />
                <a href="/shop?category=coconut" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary transition-colors font-bold rounded-[var(--radius-sm)]">Extra Virgin Coconut Oil</a>
                <a href="/shop?category=groundnut" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary transition-colors font-bold rounded-[var(--radius-sm)]">Cold-Pressed Groundnut Oil</a>
                <a href="/shop?category=sesame" className="block px-5 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary transition-colors font-bold rounded-[var(--radius-sm)]">Cold-Pressed Sesame Oil</a>
              </div>
            </div>
          </nav>

          {/* Central Logo Emblem */}
          <a href="/home" className="flex items-center focus:outline-none transition group">
            <div className="relative w-20 h-12 overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="/yra.png"
                alt="Yora Logo"
                className="max-h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Right Action Items */}
          <div className="flex items-center gap-5 text-ink/90">
            {/* Search */}
            <div className="relative hidden sm:flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                    placeholder="Search products..."
                    className="h-9 w-40 px-3 rounded-full border border-ink/15 bg-white text-xs focus:border-accent focus:outline-none"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:text-accent transition-colors p-1 hover:scale-110 duration-300"
                  aria-label="Search"
                >
                  <SearchIcon className="size-5" />
                </button>
              )}
            </div>

            {/* Region + Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 text-[10px] font-bold tracking-widest border border-ink/10 px-4 py-2.5 rounded-full bg-white hover:border-accent transition-all shadow-sm focus:outline-none"
              >
                <span>{region === "IN" ? "India (INR)" : "International (USD)"}</span>
                <ArrowIcon className="size-2.5 text-ink/50" direction="down" />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 card-surface w-44 overflow-hidden py-1 z-50">
                  <button
                    onClick={() => { setRegion("IN"); setCurrencyOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary font-bold text-ink-muted transition-colors"
                  >
                    India (INR)
                  </button>
                  <button
                    onClick={() => { setRegion("INTL"); setCurrencyOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[10px] tracking-wider uppercase hover:bg-accent-soft hover:text-primary font-bold text-ink-muted transition-colors"
                  >
                    International (USD)
                  </button>
                </div>
              )}
            </div>

            {/* Stories / Wholesale Quick Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase">
              <a href="/stories" className="hover:text-accent transition-colors py-2 border-b-2 border-transparent hover:border-accent duration-300 font-bold">Stories</a>
              <a href="/wholesale" className="hover:text-accent transition-colors py-2 border-b-2 border-transparent hover:border-accent duration-300 font-bold">Wholesale</a>
            </nav>

            {/* Account Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="hover:text-accent transition-colors p-1 hover:scale-110 duration-300 flex items-center"
                aria-label="Account"
              >
                <UserIcon />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 card-surface w-48 overflow-hidden py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-ink-muted font-bold border-b border-ink/5 truncate">
                        {user.displayName || user.email}
                      </div>
                      <a href="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-[11px] font-semibold hover:bg-accent-soft hover:text-primary transition-colors">My Account</a>
                      <a href="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-[11px] font-semibold hover:bg-accent-soft hover:text-primary transition-colors">Order History</a>
                      <button
                        onClick={() => { signOut(); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-[11px] font-semibold hover:bg-accent-soft hover:text-primary transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-[11px] font-semibold hover:bg-accent-soft hover:text-primary transition-colors">Login</a>
                      <a href="/signup" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-[11px] font-semibold hover:bg-accent-soft hover:text-primary transition-colors">Create Account</a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Contact icon */}
            <a href="/contact" className="hover:text-accent transition-colors p-1 md:block hidden hover:scale-110 duration-300" aria-label="Contact us">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.28-5.716-4.172-6.996-6.996l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>

            {/* Wishlist Icon */}
            <a href="/wishlist" className="relative hover:text-accent transition-colors p-1 md:block hidden hover:scale-110 duration-300" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-accent text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-cream">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <a href="/cart" className="relative hover:text-accent transition-colors p-1 shrink-0 block hover:scale-110 duration-300" aria-label="Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-accent text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-cream">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-ink/5 bg-cream/98 backdrop-blur-lg animate-fade-in shadow-xl">
            <div className="px-6 py-8 flex flex-col gap-6 text-[12px] font-bold tracking-widest uppercase">
              <form onSubmit={handleSearchSubmit} className="flex items-center normal-case">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-10 w-full px-4 rounded-full border border-ink/15 bg-white text-xs focus:border-accent focus:outline-none font-normal"
                />
              </form>
              <a href="/home" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Home</a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Meet Yora</a>
              <a href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Shop All Products</a>
              <a href="/stories" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Stories & Recipes</a>
              <a href="/cart" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between">
                <span>Cart</span>
                {cartCount > 0 && <span className="bg-accent text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">{cartCount}</span>}
              </a>
              <a href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between">
                <span>Wishlist</span>
                {wishlistCount > 0 && <span className="bg-accent text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">{wishlistCount}</span>}
              </a>
              {user ? (
                <>
                  <a href="/account" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">My Account</a>
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-left hover:text-accent transition-colors">Sign Out</button>
                </>
              ) : (
                <>
                  <a href="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Login</a>
                  <a href="/signup" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Create Account</a>
                </>
              )}
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Contact Farm</a>
              <a href="/wholesale" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Wholesale & Bulk</a>
              <hr className="border-ink/10" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-ink-muted normal-case">Region</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRegion("IN")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${region === "IN" ? "bg-primary text-white border-transparent" : "border-ink/10 text-ink-muted"}`}
                  >
                    India
                  </button>
                  <button
                    onClick={() => setRegion("INTL")}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${region === "INTL" ? "bg-primary text-white border-transparent" : "border-ink/10 text-ink-muted"}`}
                  >
                    International
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer to push content below the fixed header */}
      <div className="h-24"></div>
    </>
  );
}
