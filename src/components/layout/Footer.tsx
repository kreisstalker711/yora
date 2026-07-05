"use client";

import React, { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#FFFDF8] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-left text-xs tracking-wide relative overflow-hidden border-t border-primary/5">
      {/* Decorative oversized background word */}
      <div className="absolute -bottom-10 right-10 text-giant select-none pointer-events-none text-white/5 opacity-5 font-black uppercase text-[150px] lg:text-[220px]">
        PURE
      </div>

      <div className="max-w-7xl mx-auto rounded-[3rem] shadow-[0_30px_80px_rgba(15,61,46,0.15)] relative overflow-hidden bg-gradient-to-b from-[#0F3D2E] to-[#082018] border border-[#2F6B3D]/20 text-[#FFFDF8]">
        
        {/* Organic SVG Leaf Pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,100 Q80,40 100,100 T150,100" fill="none" stroke="#D6F5C2" strokeWidth="2" />
            <path d="M400,200 Q450,100 500,200 T600,200" fill="none" stroke="#D6F5C2" strokeWidth="2" />
            <path d="M800,150 Q850,70 900,150 T1000,150" fill="none" stroke="#D6F5C2" strokeWidth="2" />
          </svg>
        </div>

        {/* Main Footer layout */}
        <div className="p-8 sm:p-12 lg:p-16 space-y-16 relative z-10">
          
          {/* Top Section: Branding, Organic Text and Glass Newsletter Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Branding & description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/yra.png" 
                  alt="Yora Logo" 
                  className="h-16 w-auto brightness-0 invert object-contain"
                />
                <h3 className="font-serif text-3xl font-extrabold tracking-wider uppercase">Yora</h3>
              </div>
              <p className="text-white/70 max-w-md text-sm leading-relaxed font-light">
                Crafting wood-pressed (Vaagai) traditional oils direct from our press in Udumalpet, Tamil Nadu. Bringing wholesome goodness, purity, and natural health to your kitchen.
              </p>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8FD16A] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#63C132] animate-ping"></span>
                100% Traditional Cold Press
              </div>
            </div>

            {/* Newsletter Glass Card */}
            <div className="lg:col-span-6">
              <div className="glass-card bg-white/10 backdrop-blur-lg border border-white/15 p-8 rounded-[2rem] shadow-2xl space-y-4">
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">Join the Yora Circle</h4>
                <p className="text-white/70 text-xs font-light">Subscribe to receive recipe guides, farm updates, and priority restock notifications.</p>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full h-12 px-4 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/50 focus:border-[#63C132] focus:bg-white/25 focus:outline-none text-xs transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#63C132] to-[#0F3D2E] hover:from-[#7AE441] hover:to-[#2D6B00] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 shadow-[0_15px_40px_rgba(53,134,0,0.25)] whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>

                {subscribed && (
                  <p className="text-[#8FD16A] text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    ✓ Thank you for subscribing to Yora news!
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Middle Section: Sitemap columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
            
            {/* Sitemap Column 1: Products */}
            <div className="space-y-4">
              <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Products</h4>
              <ul className="space-y-3 font-medium">
                <li>
                  <a href="/shop?category=coconut" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Extra Virgin Coconut Oil
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Cold centrifuged pure raw extract</span>
                  </a>
                </li>
                <li>
                  <a href="/shop?category=groundnut" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Wood-Pressed Groundnut Oil
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Traditional wood mortar extraction</span>
                  </a>
                </li>
                <li>
                  <a href="/shop?category=sesame" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Wood-Pressed Sesame Oil
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Sun-dried seeds pressed with palm jaggery</span>
                  </a>
                </li>
                <li>
                  <a href="/shop" className="text-[#63C132] hover:text-[#8FD16A] transition-colors font-bold block pt-2 border-t border-white/5">
                    View Full Catalog &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Sitemap Column 2: Story & Vision */}
            <div className="space-y-4">
              <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Meet Yora</h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a href="/about" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Our Heritage & Story
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Vaagai mortar pressing roots in Udumalpet</span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Farming Purity & Values
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Direct farm sourcing & zero chemical refinement</span>
                  </a>
                </li>
                <li>
                  <a href="/stories" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Stories & Recipes
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Healthy organic cooking & heritage guides</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Sitemap Column 3: Contact details */}
            <div className="space-y-4">
              <h4 className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Contact Farm</h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a href="/contact" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Contact Us
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Get in touch for support and general queries</span>
                  </a>
                </li>
                <li>
                  <a href="/wholesale" className="text-white/85 hover:text-[#63C132] transition-colors block">
                    Wholesale Inquiries
                    <span className="block text-[10px] text-white/40 font-light mt-0.5">Bulk commercial requirements & partnerships</span>
                  </a>
                </li>
                <li>
                  <div className="text-white/50 text-[11px] leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5 font-light">
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
            <div className="flex items-center gap-6 font-bold uppercase tracking-wider text-[9px] shrink-0">
              <a href="/contact" className="hover:text-[#63C132] transition-colors">Privacy Policy</a>
              <a href="/contact" className="hover:text-[#63C132] transition-colors">Terms of Service</a>
              <a href="mailto:info@theyora.com" className="hover:text-[#63C132] transition-colors underline">info@theyora.com</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
