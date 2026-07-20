"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { submitContactForm } from "@/src/lib/firestore";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      await submitContactForm(formData);
      setStatus("done");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        NATURE
      </div>

      <Header />

      <section className="relative overflow-hidden bg-primary text-white py-20 text-center border-b border-primary-light/10">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-accent font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
            Contact Yora
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Have questions about our cold pressing methods or want to track your order? Connect directly with our farm team in Tirupur.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-semibold text-primary">
                Our Farm Headquarters
              </h2>
              <p className="text-ink-muted text-sm leading-relaxed">
                Our wooden pressing units and solar copra drying structures are nestled in the organic agricultural belt of Udumalpet, Tamil Nadu. Visitors are welcome by appointment.
              </p>
            </div>

            <div className="w-16 h-[2px] bg-gold"></div>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <span className="p-3 bg-accent-soft text-primary rounded-[var(--radius-md)] shrink-0 border border-accent/25 font-bold">
                  📍
                </span>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-primary">Postal Address</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Yakria Private Limited <br/>
                    5/176-3, Pukkulam, Udumalpet, <br/>
                    Tirupur, Tamil Nadu, 642154
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-accent-soft text-primary rounded-[var(--radius-md)] shrink-0 border border-accent/25 font-bold">
                  ✉️
                </span>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-primary">Electronic Support</h4>
                  <p className="text-xs text-ink-muted mt-1">
                    Email: <a href="mailto:info@theyora.com" className="hover:text-accent underline">info@theyora.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="p-3 bg-accent-soft text-primary rounded-[var(--radius-md)] shrink-0 border border-accent/25 font-bold">
                  ⏰
                </span>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-primary">Operating Hours</h4>
                  <p className="text-xs text-ink-muted mt-1">
                    Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface bg-white p-6 relative flex items-center gap-4">
              <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src="/yra.png"
                  alt="Yora Logo"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="text-left">
                <h5 className="font-serif text-xs font-semibold text-primary uppercase tracking-wider">The Yora Guarantee</h5>
                <p className="text-[10px] text-ink-muted mt-0.5 leading-relaxed">
                  Direct sourcing. Zero chemical refinement. Prepared with traditional cold-pressed standards.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card-surface bg-white p-8 sm:p-12">
              <div className="text-left space-y-2 mb-8">
                <h3 className="font-serif text-2xl font-semibold text-primary">Send an Inquiry</h3>
                <p className="text-xs text-ink-muted">We will respond within 24 operational hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                      className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter contact number (Optional)"
                      className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="E.g. Retail, Order status"
                      className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Message / Question</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your inquiry details..."
                    className="w-full p-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-primary hover:bg-primary-light text-white py-4 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest transition duration-300 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>

                {status === "done" && (
                  <p className="text-accent text-xs font-bold pt-2 text-center">
                    Thank you! Your message has been sent successfully to the Udumalpet unit.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 text-xs font-bold pt-2 text-center">
                    Something went wrong. Please try again.
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
