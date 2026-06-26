"use client";

import React from "react";

export function PromoBanner() {
  return (
    <section className="hidden lg:flex lg:w-1/2 relative min-h-screen overflow-hidden bg-[#0A140E]">
      {/* Background image covering the banner area */}
      <img
        src="/loginsideimage.png"
        alt="Yora Organic Ingredients Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-transform duration-10000 hover:scale-110"
      />
      
      {/* Editorial border/decor inside the banner */}
      <div className="absolute inset-8 border border-white/10 rounded-[2rem] pointer-events-none z-10"></div>
      <div className="absolute inset-10 border border-[#D4AF37]/10 rounded-[1.8rem] pointer-events-none z-10"></div>

      {/* Dark premium gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A140E]/90 via-[#102316]/50 to-[#0A140E]/30"></div>

      {/* Content overlay */}
      <div className="absolute bottom-20 left-20 right-20 z-20 text-white text-left space-y-6 animate-slide-up">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7AA33C] animate-pulse"></span>
          <span className="text-[#FAF7F0] text-[9px] uppercase font-bold tracking-[0.25em] bg-[#7AA33C]/20 border border-[#7AA33C]/30 px-3.5 py-1.5 rounded-full">
            Est. Tirupur, Tamil Nadu
          </span>
        </div>
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.2] text-[#FAF7F0] tracking-tight">
          Pure Goodness, <br />
          <span className="text-[#7AA33C] italic font-normal tracking-wide">Straight</span> From the Farm
        </h2>
        
        <p className="text-white/70 text-xs sm:text-sm max-w-md leading-relaxed font-light">
          At Yora, we believe food should be wholesome, nourishing, and true to its natural origins. Traditional cold-pressing preserves life. Taste the difference today.
        </p>
        
        <div className="flex gap-2 pt-4">
          <span className="w-8 h-1 rounded bg-[#7AA33C]"></span>
          <span className="w-2 h-1 rounded bg-white/20"></span>
          <span className="w-2 h-1 rounded bg-white/20"></span>
        </div>
      </div>
    </section>
  );
}
