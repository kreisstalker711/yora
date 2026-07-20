"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { submitWholesaleInquiry } from "@/src/lib/firestore";

export default function WholesalePage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    volume: "Monthly < 50 Liters",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      await submitWholesaleInquiry({
        companyName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        message: `Estimated Volume: ${formData.volume}\n\n${formData.message}`,
      });
      setStatus("done");
      setFormData({ businessName: "", contactName: "", email: "", phone: "", volume: "Monthly < 50 Liters", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        TRADITION
      </div>

      <Header />

      <section className="relative overflow-hidden bg-primary text-white py-20 text-center border-b border-primary-light/10">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-accent font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase block">
            MERCHANT PARTNERSHIPS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
            Wholesale & Distribution
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Bring premium cold-pressed organic oils to your retail shelves, boutique hotels, wellness centers, or organic markets.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-accent font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase block">
            WHY PARTNER WITH YORA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary">
            The Merchant Advantage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="card-surface bg-white p-8 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent-soft text-primary border border-accent/20 flex items-center justify-center mb-6 font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-semibold text-primary mb-3">Guaranteed Single-Origin</h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              We own the pressing facility in Udumalpet, Tirupur, giving us 100% control over seed quality, zero blending, and absolute purity for your clients.
            </p>
          </div>

          <div className="card-surface bg-white p-8 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent-soft text-primary border border-accent/20 flex items-center justify-center mb-6 font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-semibold text-primary mb-3">Fresh Batches On Demand</h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              We press our oils in continuous rolling batches. Wholesale orders are bottled and shipped fresh from the press, maintaining rich natural aromas and longer shelf life.
            </p>
          </div>

          <div className="card-surface bg-white p-8 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent-soft text-primary border border-accent/20 flex items-center justify-center mb-6 font-serif text-lg font-bold">✓</div>
            <h4 className="font-serif text-lg font-semibold text-primary mb-3">Marketing & Co-Branding</h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              We supply our wholesale partners with elegant print materials, product catalogs, certifications, and high-res photography assets to accelerate retail sales.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream-dark border-t border-primary/5 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="card-surface bg-white p-8 sm:p-12">
            <div className="text-left space-y-2 mb-8">
              <h3 className="font-serif text-2xl font-semibold text-primary">Wholesale Inquiry Form</h3>
              <p className="text-xs text-ink-muted">Partner with us. Let us know your business requirements.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Business / Store Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Enter registered business name"
                    className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Enter contact name"
                    className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter business email"
                    className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter mobile or landline number"
                    className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Estimated Monthly Volume</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all"
                >
                  <option>Monthly &lt; 50 Liters</option>
                  <option>Monthly 50 - 200 Liters</option>
                  <option>Monthly 200 - 1000 Liters</option>
                  <option>Monthly &gt; 1000 Liters</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Tell Us About Your Store / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your distribution channels, typical customer demographic, and which products you're interested in..."
                  className="w-full p-4 rounded-[var(--radius-md)] border border-ink/15 bg-white focus:border-accent focus:outline-none text-xs transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary hover:bg-primary-light text-white py-4 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest transition duration-300 disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Submit Wholesale Application"}
              </button>

              {status === "done" && (
                <p className="text-accent text-xs font-bold pt-2 text-center">
                  Wholesale request submitted. Our partnerships manager will contact you within 1-2 business days.
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
      </section>

      <Footer />
    </div>
  );
}
