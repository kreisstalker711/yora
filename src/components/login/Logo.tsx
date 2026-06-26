"use client";

import React from "react";

export function Logo() {
  return (
    <a
      href="/home"
      className="group inline-flex items-center focus:outline-none transition"
      aria-label="Yora home"
    >
      <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
        <img 
          src="/yra.png" 
          alt="Yora Logo" 
          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </a>
  );
}
