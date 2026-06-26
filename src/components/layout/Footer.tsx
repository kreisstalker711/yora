"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-transparent pt-6 pb-12 px-4 sm:px-6 lg:px-8 text-left text-xs tracking-wide">
      <div 
        className="max-w-7xl mx-auto rounded-[2.5rem] border border-white/10 shadow-[0_24px_80px_rgba(10,20,14,0.3)] relative overflow-hidden p-8 sm:p-12 lg:p-16"
        style={{
          background: "linear-gradient(to bottom, rgba(36, 24, 16, 0.02) 0%, rgba(36, 24, 16, 0.25) 25%, rgba(36, 24, 16, 0.85) 55%, rgba(36, 24, 16, 0.98) 75%, rgba(36, 24, 16, 1) 90%), url('/images/footer_bg.png') top center / cover no-repeat",
        }}
      >
        {/* Top spacer showing background landscape and centering yora logo */}
        <div className="h-44 sm:h-56 relative w-full flex items-center justify-center">
          {/* Transparent overlays for centering home page click area on logo */}
          <a 
            href="/home" 
            className="absolute w-48 h-24 cursor-pointer z-20" 
            aria-label="Yora Home"
          />
        </div>

        {/* Links grid section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-white/10 relative z-10">
          
          {/* Column 1: Learn */}
          <div className="space-y-4">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">Learn</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-medium">
              <a href="/stories" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">What's New</a>
              <a href="/stories" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Browse Articles</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Getting Started</a>
              <a href="/shop" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Indexing</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Free Courses</a>
            </div>
          </div>

          {/* Column 2: General */}
          <div className="space-y-4">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">General</h4>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 font-medium">
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">About</a>
              <a href="/stories" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Blog</a>
              <a href="/shop" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Store</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Give Back</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Press</a>
              <a href="/contact" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Privacy</a>
              <a href="/contact" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Careers</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Labs</a>
              <a href="/contact" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Terms</a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">Resources</h4>
            <div className="flex flex-col gap-y-3 font-medium">
              <a href="/contact" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Ask for Help</a>
              <a href="/about" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Archivists</a>
              <a href="/contact" className="text-[#FAF7F0]/80 hover:text-[#7AA33C] transition-colors">Developers</a>
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start justify-between gap-6 text-[#FAF7F0]/40 text-[10px] font-light leading-relaxed relative z-10">
          <div>
            <p>&copy; {new Date().getFullYear()} Yora, Yakria Private Limited. All Rights Reserved.</p>
            <p className="mt-1">Prepared by traditional wood-pressed units in Pukkulam, Udumalpet, Tirupur, Tamilnadu, 642154.</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p>CIN: U72900TN2021PTC143722</p>
            <p className="mt-1">Email: <a href="mailto:info@theyora.com" className="hover:text-[#7AA33C] underline transition-colors">info@theyora.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
