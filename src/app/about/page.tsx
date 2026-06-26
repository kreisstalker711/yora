"use client";

import React from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased">
      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102316] to-[#16301E] text-white py-24 sm:py-32 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#7AA33C] rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            OUR HERITAGE & VISION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
            Meet Yora
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Telling the story of how our Udumalpet farm preserves age-old wood pressing methods to craft the purest organic oils.
          </p>
        </div>
      </section>

      {/* Editorial Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Large Image with shadow */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-[2.5rem] pointer-events-none transform -rotate-3"></div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] border border-[#102316]/5 shadow-2xl">
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
              <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
                THE SEEDS OF HEALTH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">
                Pure Goodness, Straight From the Farm
              </h2>
            </div>
            
            <div className="w-16 h-[2px] bg-[#D4AF37]/60"></div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Yora was founded in Tirupur, Tamil Nadu, out of a simple, uncompromising desire: to provide families with food exactly as nature intended. Modern supermarket shelves are saturated with refined, chemically processed oils bleached at extreme temperatures. We set out to change that by re-establishing the traditional wood press.
            </p>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Our extraction unit is built directly alongside our organic orchards in Pukkulam, Udumalpet. Sourcing fresh organic coconuts, sesame seeds, and peanuts, we carry out sun-drying in clean solar structures. No sulphur, chemicals, or standard industrial additives ever enter our farm.
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Stats Row */}
      <section className="bg-[#FAF7F0] border-y border-[#102316]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">100%</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Certified Organic</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">0%</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Refinement & Bleach</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">Vaagai</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Traditional Wood Press</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">Fresh</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Direct From Udumalpet</p>
          </div>
        </div>
      </section>

      {/* Brand Values Editorial Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            WHAT WE STAND FOR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">1</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Biological Integrity</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We slow-press our seeds under 35°C in wooden Vaagai mortars. Keeping it cold ensures every nutrient, fat molecule, and natural antioxidant remains intact for healthy living.
            </p>
          </div>

          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">2</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Honest Sourcing</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We never blend cheap expeller-pressed oils or chemical diluents. What you see on the label is precisely what was pressed from the seed: 100% single-origin authenticity.
            </p>
          </div>

          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">3</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Ecological Care</h4>
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
