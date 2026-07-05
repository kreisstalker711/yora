"use client";

import React from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#182218] font-sans antialiased relative overflow-hidden">
      {/* Decorative background word */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        YORA
      </div>

      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F3D2E] to-[#082018] text-[#FFFDF8] py-20 text-center border-b border-[#2F6B3D]/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#63C132]/20 rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            OUR HERITAGE & VISION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Meet Yora
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Telling the story of how our Udumalpet farm preserves age-old wood pressing methods to craft the purest organic oils.
          </p>
        </div>
      </section>

      {/* Editorial Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Large Image in Glass Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="glass-card bg-white/70 p-4 rounded-[3rem] shadow-2xl w-full max-w-md relative">
              <div className="absolute -inset-4 border border-[#C89B3C]/10 rounded-[3.5rem] pointer-events-none transform -rotate-3"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-inner">
                <img 
                  src="/loginsideimage.png" 
                  alt="Yora Organic Bottle Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial copy */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="space-y-3">
              <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
                THE SEEDS OF HEALTH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E] leading-tight">
                Pure Goodness, Straight From the Farm
              </h2>
            </div>
            
            <div className="w-16 h-[2px] bg-[#C89B3C]"></div>
            
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Yora was founded in Tirupur, Tamil Nadu, out of a simple, uncompromising desire: to provide families with food exactly as nature intended. Modern supermarket shelves are saturated with refined, chemically processed oils bleached at extreme temperatures. We set out to change that by re-establishing the traditional wood press.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Our extraction unit is built directly alongside our organic orchards in Pukkulam, Udumalpet. Sourcing fresh organic coconuts, sesame seeds, and peanuts, we carry out sun-drying in clean solar structures. No sulphur, chemicals, or standard industrial additives ever enter our farm.
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Stats Row */}
      <section className="bg-[#F8F6EF] border-y border-primary/5 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2 border-r border-[#182218]/10 last:border-0">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">100%</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Certified Organic</p>
          </div>
          <div className="text-center space-y-2 md:border-r border-[#182218]/10 last:border-0">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">0%</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Refinement & Bleach</p>
          </div>
          <div className="text-center space-y-2 border-r border-[#182218]/10 last:border-0">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">Vaagai</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Traditional Wood Press</p>
          </div>
          <div className="text-center space-y-2 last:border-0">
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">Fresh</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Direct From Udumalpet</p>
          </div>
        </div>
      </section>

      {/* Brand Values Editorial Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            WHAT WE STAND FOR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">1</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Biological Integrity</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We slow-press our seeds under 35°C in wooden Vaagai mortars. Keeping it cold ensures every nutrient, fat molecule, and natural antioxidant remains intact for healthy living.
            </p>
          </div>

          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">2</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Honest Sourcing</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We never blend cheap expeller-pressed oils or chemical diluents. What you see on the label is precisely what was pressed from the seed: 100% single-origin authenticity.
            </p>
          </div>

          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">3</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Ecological Care</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              From utilizing local vaagai timber residues to packaging in eco-friendly glass containers, we strive to make Yora's carbon footprint as light as possible.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
