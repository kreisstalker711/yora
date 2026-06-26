"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#0A140E] text-[#FAF7F0]/75 py-24 border-t border-white/5 text-left text-xs tracking-wide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
          {/* Column 1: Company Profile with new inverted logo */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
                <img 
                  src="/yra.png" 
                  alt="Yora Logo" 
                  className="max-h-full w-auto object-contain brightness-0 invert" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-lg font-bold tracking-[0.15em] text-white">YORA</span>
                <span className="text-[6px] font-bold tracking-[0.25em] text-[#7AA33C] uppercase">Pure & Organic</span>
              </div>
            </div>

            <p className="leading-relaxed text-[#FAF7F0]/50 text-[11px] sm:text-xs font-light">
              Yakria Private Limited <br/>
              CIN : U72900TN2021PTC143722 <br/>
              5/176-3, Pukkulam, Udumalpet, <br/>
              Tirupur, Tamilnadu, 642154
            </p>
            <p className="text-[#FAF7F0]/60 text-[11px] sm:text-xs">
              Email: <a href="mailto:info@theyora.com" className="hover:text-[#7AA33C] underline transition-colors">info@theyora.com</a>
            </p>
          </div>

          {/* Column 2: Products Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Collections</h4>
            <ul className="space-y-3 text-[#FAF7F0]/50 font-light">
              <li><a href="/shop?category=coconut" className="hover:text-[#7AA33C] transition-colors">Extra Virgin Coconut Oil</a></li>
              <li><a href="/shop?category=groundnut" className="hover:text-[#7AA33C] transition-colors">Wood-Pressed Groundnut Oil</a></li>
              <li><a href="/shop?category=sesame" className="hover:text-[#7AA33C] transition-colors">Wood-Pressed Sesame Oil</a></li>
              <li><a href="/shop?category=combos" className="hover:text-[#7AA33C] transition-colors">Value Gift Combos</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Sitemap</h4>
            <ul className="space-y-3 text-[#FAF7F0]/50 font-light">
              <li><a href="/about" className="hover:text-[#7AA33C] transition-colors">Meet Yora (About)</a></li>
              <li><a href="/shop" className="hover:text-[#7AA33C] transition-colors">Shop Catalog</a></li>
              <li><a href="/stories" className="hover:text-[#7AA33C] transition-colors">Stories & Recipes</a></li>
              <li><a href="/contact" className="hover:text-[#7AA33C] transition-colors">Contact Farm</a></li>
              <li><a href="/wholesale" className="hover:text-[#7AA33C] transition-colors">Wholesale Inquiry</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Care */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-3 text-[#FAF7F0]/50 font-light">
              <li><a href="/contact" className="hover:text-[#7AA33C] transition-colors">Shipping Policy</a></li>
              <li><a href="/contact" className="hover:text-[#7AA33C] transition-colors">Return & Refund Policy</a></li>
              <li><a href="/contact" className="hover:text-[#7AA33C] transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="hover:text-[#7AA33C] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 5: Social Icons */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Follow Yora</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-white/5 rounded-full hover:bg-[#7AA33C] hover:text-white transition-all duration-300 animate-fade-in" aria-label="Facebook">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-full hover:bg-[#7AA33C] hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-12 border-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-center sm:text-left text-[11px]">
            &copy; {new Date().getFullYear()} Yora, Yakria Private Limited. All Rights Reserved. Prepared by traditional cold-press units in Tirupur.
          </p>

          <div className="flex items-center gap-3 bg-white/5 py-2 px-5 rounded-2xl border border-white/5">
            <span className="text-[9px] text-[#FAF7F0]/40 uppercase tracking-widest font-bold mr-2">Secure Payments:</span>
            <span className="font-extrabold text-[8px] bg-blue-900/40 text-white border border-blue-900/40 px-2 py-0.5 rounded">VISA</span>
            <span className="font-extrabold text-[8px] bg-red-600/40 text-white border border-red-600/40 px-2 py-0.5 rounded">MC</span>
            <span className="font-extrabold text-[8px] bg-green-700/40 text-white border border-green-700/40 px-2 py-0.5 rounded">UPI</span>
            <span className="font-extrabold text-[8px] bg-sky-600/40 text-white border border-sky-600/40 px-2 py-0.5 rounded">RAZORPAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
