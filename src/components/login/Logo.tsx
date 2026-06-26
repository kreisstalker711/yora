"use client";

import React from "react";

export function Logo() {
  return (
    <a
      href="/home"
      className="group inline-flex items-center gap-3.5 focus:outline-none transition"
      aria-label="Yora home"
    >
      <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
        <img 
          src="/yra.png" 
          alt="Yora Logo" 
          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-serif text-2xl font-bold tracking-[0.15em] text-[#102316] leading-none">YORA</span>
        <span className="text-[8px] font-bold tracking-[0.3em] text-[#7AA33C] uppercase mt-1">Organic Purity</span>
      </div>
    </a>
  );
}
