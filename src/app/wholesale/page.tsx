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
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased">
      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102316] to-[#16301E] text-white py-24 sm:py-32 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#7AA33C] rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            MERCHANT PARTNERSHIPS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
            Wholesale & Distribution
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Bring traditional vaagai wood-pressed organic oils to your retail shelves, boutique hotels, wellness centers, or organic markets.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            WHY PARTNER WITH YORA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102316]">
            The Merchant Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Guaranteed Single-Origin</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We own the pressing facility in Udumalpet, Tirupur, giving us 100% control over seed quality, zero blending, and absolute purity for your clients.
            </p>
          </div>

          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Fresh Batches On Demand</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We press our oils in continuous rolling batches. Wholesale orders are bottled and shipped fresh from the press, maintaining rich natural aromas and longer shelf life.
            </p>
          </div>

          <div className="bg-white border border-[#102316]/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1F4D2E]/5 text-[#1F4D2E] flex items-center justify-center mb-6 shadow-inner font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-bold text-[#102316] mb-3">Marketing & Co-Branding</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We supply our wholesale partners with elegant print materials, product catalogs, certifications, and high-res photography assets to accelerate retail sales.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form (B2B layout) */}
      <section className="py-20 bg-[#F3ECE0]/40 border-t border-[#102316]/5">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-[#102316]/5 rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="text-left space-y-2 mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#102316]">Wholesale Inquiry Form</h3>
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
                    className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                    className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                    className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                    className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estimated Monthly Volume</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all bg-white"
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
                  className="w-full p-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#102316] hover:bg-[#7AA33C] text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 w-full sm:w-auto shadow-md"
              >
                Submit Wholesale Application
              </button>

              {formSubmitted && (
                <p className="text-[#7AA33C] text-xs font-bold animate-pulse pt-2 text-center sm:text-left">
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
