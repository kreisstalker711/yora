"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#182218] font-sans antialiased relative overflow-hidden">
      {/* Decorative background word */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        NATURE
      </div>

      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F3D2E] to-[#082018] text-[#FFFDF8] py-20 text-center border-b border-[#2F6B3D]/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#63C132]/20 rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-[#63C132] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Contact Yora
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Have questions about our vaagai wood pressing methods or want to track your order? Connect directly with our farm team in Tirupur.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Farm Info & Image */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-extrabold text-[#0F3D2E]">
                Our Farm Headquarters
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Our wooden pressing units and solar copra drying structures are nestled in the organic agricultural belt of Udumalpet, Tamil Nadu. Visitors are welcome by appointment.
              </p>
            </div>

            <div className="w-16 h-[2px] bg-[#C89B3C]"></div>

            {/* Farm Coordinates card */}
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#63C132]/10 text-[#0F3D2E] rounded-2xl shadow-inner shrink-0 border border-[#63C132]/25 font-bold">
                  📍
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0F3D2E]">Postal Address</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-light">
                    Yakria Private Limited <br/>
                    5/176-3, Pukkulam, Udumalpet, <br/>
                    Tirupur, Tamil Nadu, 642154
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#63C132]/10 text-[#0F3D2E] rounded-2xl shadow-inner shrink-0 border border-[#63C132]/25 font-bold">
                  ✉️
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0F3D2E]">Electronic Support</h4>
                  <p className="text-xs text-slate-500 mt-1 font-light">
                    Email: <a href="mailto:info@theyora.com" className="hover:text-[#63C132] underline">info@theyora.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#63C132]/10 text-[#0F3D2E] rounded-2xl shadow-inner shrink-0 border border-[#63C132]/25 font-bold">
                  ⏰
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0F3D2E]">Operating Hours</h4>
                  <p className="text-xs text-slate-500 mt-1 font-light">
                    Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Elegant Side Seal Card */}
            <div className="glass-card bg-white/70 rounded-3xl p-6 shadow-md relative overflow-hidden flex items-center gap-4 border border-primary/5">
              <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
                <img 
                  src="/yra.png" 
                  alt="Yora Logo" 
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="text-left">
                <h5 className="font-serif text-xs font-bold text-[#0F3D2E] uppercase tracking-wider">The Yora Guarantee</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-light">
                  Direct sourcing. Zero chemical refinement. Prepared with native Vaagai heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Glassmorphism design) */}
          <div className="lg:col-span-7">
            <div className="glass-card bg-white/80 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-primary/5">
              {/* Radial gradient background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#63C132]/5 rounded-full filter blur-2xl pointer-events-none"></div>

              <div className="text-left space-y-2 mb-8 relative z-10">
                <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">Send an Inquiry</h3>
                <p className="text-xs text-slate-500 font-light">We will respond within 24 operational hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter contact number (Optional)"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="E.g. Retail, Order status"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message / Question</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your inquiry details..."
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white/50 focus:border-[#63C132] focus:bg-white focus:outline-none text-xs transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] hover:scale-102"
                >
                  Send Message
                </button>

                {formSubmitted && (
                  <p className="text-[#63C132] text-xs font-bold animate-pulse pt-2 text-center">
                    ✓ Thank you! Your message has been sent successfully to the Udumalpet unit.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
