"use client";

import React, { useState } from "react";
import { submitNewsletterSignup } from "@/src/lib/firestore";

const MARKETPLACES = ["Amazon", "Flipkart", "Blinkit", "JioMart"];

function SocialIcon({ name }: { name: "Facebook" | "Instagram" | "YouTube" | "LinkedIn" }) {
  const paths: Record<typeof name, string> = {
    Facebook: "M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.35C16.17 4.3 15.05 4.2 13.75 4.2c-2.7 0-4.55 1.65-4.55 4.68V10.5H6.7v3h2.5V21h4.3z",
    Instagram: "M12 2.2c2.7 0 3 .01 4.13.06 1.13.05 1.9.24 2.57.5.7.27 1.28.63 1.87 1.2.57.6.93 1.18 1.2 1.88.26.66.45 1.44.5 2.57.05 1.13.06 1.43.06 4.13s-.01 3-.06 4.13c-.05 1.13-.24 1.9-.5 2.57-.27.7-.63 1.28-1.2 1.87-.6.57-1.18.93-1.88 1.2-.66.26-1.44.45-2.57.5-1.13.05-1.43.06-4.13.06s-3-.01-4.13-.06c-1.13-.05-1.9-.24-2.57-.5-.7-.27-1.28-.63-1.87-1.2-.57-.6-.93-1.18-1.2-1.88-.26-.66-.45-1.44-.5-2.57C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.13c.05-1.13.24-1.9.5-2.57.27-.7.63-1.28 1.2-1.87.6-.57 1.18-.93 1.88-1.2.66-.26 1.44-.45 2.57-.5C9 2.21 9.3 2.2 12 2.2zm0 1.8c-2.65 0-2.96.01-4.01.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.74-.35.35-.56.68-.74 1.14-.13.35-.3.88-.34 1.85-.05 1.05-.06 1.36-.06 4.01s.01 2.96.06 4.01c.04.97.2 1.5.34 1.85.18.46.4.79.74 1.14.35.35.68.56 1.14.74.35.13.88.3 1.85.34 1.05.05 1.36.06 4.01.06s2.96-.01 4.01-.06c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.74.35-.35.56-.68.74-1.14.13-.35.3-.88.34-1.85.05-1.05.06-1.36.06-4.01s-.01-2.96-.06-4.01c-.04-.97-.2-1.5-.34-1.85-.18-.46-.4-.79-.74-1.14a3.05 3.05 0 00-1.14-.74c-.35-.13-.88-.3-1.85-.34-1.05-.05-1.36-.06-4.01-.06zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm5.85-2a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z",
    YouTube: "M22 12s0-3.2-.41-4.72a2.9 2.9 0 00-2.04-2.05C17.99 4.8 12 4.8 12 4.8s-5.99 0-7.55.43a2.9 2.9 0 00-2.04 2.05C2 8.8 2 12 2 12s0 3.2.41 4.72a2.9 2.9 0 002.04 2.05C6.01 19.2 12 19.2 12 19.2s5.99 0 7.55-.43a2.9 2.9 0 002.04-2.05C22 15.2 22 12 22 12zM9.9 15.3V8.7l5.7 3.3-5.7 3.3z",
    LinkedIn: "M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM10 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4z",
  };
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    try {
      await submitNewsletterSignup(email);
      setStatus("done");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-primary pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-left text-xs tracking-wide relative overflow-hidden border-t border-primary/5 text-white">
      <div className="absolute -bottom-10 right-10 text-giant select-none pointer-events-none text-white/5 font-black uppercase text-[150px] lg:text-[220px]">
        PURE
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">

        {/* Top Section: Branding + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/yra.png"
                alt="Yora Logo"
                className="h-16 w-auto brightness-0 invert object-contain"
              />
              <h3 className="font-serif text-3xl font-semibold tracking-wide uppercase">Yora</h3>
            </div>
            <p className="text-white/70 max-w-md text-sm leading-relaxed font-light">
              Crafting cold-pressed traditional oils direct from our press in Udumalpet, Tamil Nadu. Bringing wholesome goodness, purity, and natural health to your kitchen.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-accent font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              100% Traditional Cold Press
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white/8 border border-white/15 p-8 rounded-[var(--radius-lg)] space-y-4">
              <h4 className="font-serif text-lg font-semibold text-white tracking-wide">Join the Yora Circle</h4>
              <p className="text-white/70 text-xs font-light">Subscribe to receive recipe guides, farm updates, and priority restock notifications.</p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full h-12 px-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-accent focus:bg-white/15 focus:outline-none text-xs transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-accent hover:bg-accent-soft hover:text-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 whitespace-nowrap disabled:opacity-60"
                >
                  {status === "submitting" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {status === "done" && (
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest">
                  Thank you for subscribing to Yora news!
                </p>
              )}
              {status === "error" && (
                <p className="text-[#E0A0A0] text-[10px] font-bold uppercase tracking-widest">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Marketplace + Social Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Also Available On</span>
            {MARKETPLACES.map((name) => (
              <span
                key={name}
                title="Coming soon"
                className="text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/15 px-3 py-1.5 rounded-full cursor-default select-none"
              >
                {name} <span className="text-white/30 normal-case font-normal">(soon)</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {(["Facebook", "Instagram", "YouTube", "LinkedIn"] as const).map((name) => (
              <span
                key={name}
                title={`${name} - coming soon`}
                className="text-white/50 hover:text-white/50 p-2 rounded-full border border-white/15 cursor-default select-none"
              >
                <SocialIcon name={name} />
              </span>
            ))}
          </div>
        </div>

        {/* Middle Section: Sitemap columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">

          <div className="space-y-4">
            <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Products</h4>
            <ul className="space-y-3 font-medium">
              <li>
                <a href="/shop?category=coconut" className="text-white/85 hover:text-accent transition-colors block">
                  Extra Virgin Coconut Oil
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Cold centrifuged pure raw extract</span>
                </a>
              </li>
              <li>
                <a href="/shop?category=groundnut" className="text-white/85 hover:text-accent transition-colors block">
                  Cold-Pressed Groundnut Oil
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Traditional low temperature extraction</span>
                </a>
              </li>
              <li>
                <a href="/shop?category=sesame" className="text-white/85 hover:text-accent transition-colors block">
                  Cold-Pressed Sesame Oil
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Sun-dried seeds pressed with palm jaggery</span>
                </a>
              </li>
              <li>
                <a href="/shop" className="text-accent hover:text-white transition-colors font-bold block pt-2 border-t border-white/5">
                  View Full Catalog &rarr;
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Meet Yora</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="/about" className="text-white/85 hover:text-accent transition-colors block">
                  Our Heritage & Story
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Cold pressed heritage roots in Udumalpet</span>
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/85 hover:text-accent transition-colors block">
                  Farming Purity & Values
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Direct farm sourcing & zero chemical refinement</span>
                </a>
              </li>
              <li>
                <a href="/stories" className="text-white/85 hover:text-accent transition-colors block">
                  Stories & Recipes
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Healthy organic cooking & heritage guides</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Contact Farm</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="/contact" className="text-white/85 hover:text-accent transition-colors block">
                  Contact Us
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Get in touch for support and general queries</span>
                </a>
              </li>
              <li>
                <a href="/wholesale" className="text-white/85 hover:text-accent transition-colors block">
                  Wholesale Inquiries
                  <span className="block text-[10px] text-white/40 font-light mt-0.5">Bulk commercial requirements & partnerships</span>
                </a>
              </li>
              <li>
                <div className="text-white/50 text-[11px] leading-relaxed bg-white/[0.03] p-4 rounded-[var(--radius-md)] border border-white/5 font-light">
                  <strong>Yakria Private Limited</strong> <br/>
                  CIN: U72900TN2021PTC143722 <br/>
                  5/176-3, Pukkulam, Udumalpet, Tirupur, TN, 642154
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal & Copyrights */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-white/40 text-[10px] font-light leading-relaxed">
          <div>
            <p>&copy; {new Date().getFullYear()} Yora. All Rights Reserved. Crafted with care in Tirupur, Tamil Nadu.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-bold uppercase tracking-wider text-[9px] shrink-0">
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</a>
            <a href="/shipping-policy" className="hover:text-accent transition-colors">Shipping Policy</a>
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="mailto:info@theyora.com" className="hover:text-accent transition-colors underline">info@theyora.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
