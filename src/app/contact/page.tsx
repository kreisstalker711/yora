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
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased">
      <Header />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102316] to-[#16301E] text-white py-24 sm:py-32 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#7AA33C] rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-[#7AA33C] font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
            Contact Yora
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Have questions about our vaagai wood pressing methods or want to track your order? Connect directly with our farm team in Tirupur.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Farm Info & Image */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#102316]">
                Our Farm Headquarters
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Our wooden pressing units and solar copra drying structures are nestled in the organic agricultural belt of Udumalpet, Tamil Nadu. Visitors are welcome by appointment.
              </p>
            </div>

            <div className="w-16 h-[2px] bg-[#D4AF37]/60"></div>

            {/* Farm Coordinates card */}
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#1F4D2E]/5 text-[#1F4D2E] rounded-xl shadow-inner shrink-0">
                  📍
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#102316]">Postal Address</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-light">
                    Yakria Private Limited <br/>
                    5/176-3, Pukkulam, Udumalpet, <br/>
                    Tirupur, Tamil Nadu, 642154
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#1F4D2E]/5 text-[#1F4D2E] rounded-xl shadow-inner shrink-0">
                  ✉️
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#102316]">Electronic Support</h4>
                  <p className="text-xs text-slate-500 mt-1 font-light">
                    Email: <a href="mailto:info@theyora.com" className="hover:text-[#7AA33C] underline">info@theyora.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-[#1F4D2E]/5 text-[#1F4D2E] rounded-xl shadow-inner shrink-0">
                  ⏰
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#102316]">Operating Hours</h4>
                  <p className="text-xs text-slate-500 mt-1 font-light">
                    Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

             {/* Elegant Side Seal Card */}
             <div className="bg-white border border-[#102316]/5 rounded-3xl p-6 shadow-sm relative overflow-hidden flex items-center gap-4">
               <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
                 <img 
                   src="/yra.png" 
                   alt="Yora Logo" 
                   className="max-h-full w-auto object-contain"
                 />
               </div>
              <div className="text-left">
                <h5 className="font-serif text-xs font-bold text-[#102316] uppercase tracking-wider">The Yora Guarantee</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-light">
                  Direct sourcing. Zero chemical refinement. Prepared with native Vaagai heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Glassmorphism design) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#102316]/5 rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
              {/* Radial gradient background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#7AA33C]/5 rounded-full filter blur-2xl pointer-events-none"></div>

              <div className="text-left space-y-2 mb-8 relative z-10">
                <h3 className="font-serif text-2xl font-bold text-[#102316]">Send an Inquiry</h3>
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
                      className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                      className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                      className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                      className="w-full h-12 px-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all"
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
                    className="w-full p-4 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:outline-none text-xs transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#102316] hover:bg-[#7AA33C] text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 w-full sm:w-auto shadow-md"
                >
                  Send Message
                </button>

                {formSubmitted && (
                  <p className="text-[#7AA33C] text-xs font-bold animate-pulse pt-2 text-center sm:text-left">
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
