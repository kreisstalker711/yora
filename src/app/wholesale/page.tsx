"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

export default function WholesalePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    volume: "Monthly < 50 Liters",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ businessName: "", contactName: "", email: "", phone: "", volume: "Monthly < 50 Liters", message: "" });
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#182218] font-sans antialiased relative overflow-hidden">
      {/* Decorative background word */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        TRADITION
      </div>

      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F3D2E] to-[#082018] text-[#FFFDF8] py-20 text-center border-b border-[#2F6B3D]/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#63C132]/20 rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            MERCHANT PARTNERSHIPS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Wholesale & Distribution
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Bring traditional vaagai wood-pressed organic oils to your retail shelves, boutique hotels, wellness centers, or organic markets.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            WHY PARTNER WITH YORA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F3D2E]">
            The Merchant Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Guaranteed Single-Origin</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We own the pressing facility in Udumalpet, Tirupur, giving us 100% control over seed quality, zero blending, and absolute purity for your clients.
            </p>
          </div>

          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Fresh Batches On Demand</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We press our oils in continuous rolling batches. Wholesale orders are bottled and shipped fresh from the press, maintaining rich natural aromas and longer shelf life.
            </p>
          </div>

          <div className="glass-card bg-white/70 p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#63C132]/10 text-[#0F3D2E] border border-[#63C132]/20 flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mb-3">Marketing & Co-Branding</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We supply our wholesale partners with elegant print materials, product catalogs, certifications, and high-res photography assets to accelerate retail sales.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form (B2B layout) */}
      <section className="py-20 bg-[#F8F6EF]/60 border-t border-primary/5 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-card bg-white/80 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="text-left space-y-2 mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">Wholesale Inquiry Form</h3>
              <p className="text-xs text-slate-500 font-light">Partner with us. Let us know your business requirements.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Business / Store Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Enter registered business name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Person Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Enter contact name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter business email"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter mobile or landline number"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estimated Monthly Volume</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                >
                  <option>Monthly &lt; 50 Liters</option>
                  <option>Monthly 50 - 200 Liters</option>
                  <option>Monthly 200 - 1000 Liters</option>
                  <option>Monthly &gt; 1000 Liters</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tell Us About Your Store / Requirements</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your distribution channels, typical customer demographic, and which products you're interested in..."
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-102"
              >
                Submit Wholesale Application
              </button>

              {formSubmitted && (
                <p className="text-[#63C132] text-xs font-bold animate-pulse pt-2 text-center">
                  ✓ Wholesale request submitted. Our partnerships manager will contact you within 1-2 business days.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
