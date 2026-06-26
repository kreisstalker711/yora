"use client";

import React from "react";

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3 text-[#7AA33C]" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-transparent pt-6 pb-12 px-4 sm:px-6 lg:px-8 text-left text-xs tracking-wide">
      <div className="max-w-7xl mx-auto bg-[#102316] rounded-[2.5rem] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_24px_80px_rgba(10,20,14,0.3)] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Company Profile (span 4) */}
          <div className="lg:col-span-4 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] flex flex-col justify-between space-y-6">
            <div>
              <a href="/home" className="flex items-center focus:outline-none transition group">
                <div className="relative w-16 h-10 overflow-hidden shrink-0 flex items-center justify-center bg-white rounded-xl border border-white/10">
                  <img 
                    src="/yora.png" 
                    alt="Yora Logo" 
                    className="max-h-[80%] w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
              </a>

              <p className="leading-relaxed text-[#FAF7F0]/60 text-[11px] sm:text-xs font-light mt-6">
                <strong>Yakria Private Limited</strong> <br/>
                CIN : U72900TN2021PTC143722 <br/>
                5/176-3, Pukkulam, Udumalpet, <br/>
                Tirupur, Tamilnadu, 642154
              </p>
            </div>

            <p className="text-[#FAF7F0]/80 text-[11px] sm:text-xs border-t border-white/10 pt-4">
              Email: <a href="mailto:info@theyora.com" className="hover:text-[#7AA33C] underline font-medium transition-colors">info@theyora.com</a>
            </p>
          </div>

          {/* Card 2: Collections Links (span 2) */}
          <div className="lg:col-span-2 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] space-y-6">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Collections</h4>
            <ul className="space-y-4">
              <li>
                <a href="/shop?category=coconut" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Extra Virgin Coconut</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Cold centrifuged pure oil</div>
                </a>
              </li>
              <li>
                <a href="/shop?category=groundnut" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Pressed Groundnut</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Traditional Vaagai wood-pressed</div>
                </a>
              </li>
              <li>
                <a href="/shop?category=sesame" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Pressed Sesame</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Sun-dried seeds & jaggery</div>
                </a>
              </li>
              <li>
                <a href="/shop?category=combos" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Value Gift Combos</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Curated family organic trios</div>
                </a>
              </li>
            </ul>
          </div>

          {/* Card 3: Sitemap Links (span 2) */}
          <div className="lg:col-span-2 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] space-y-6">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Sitemap</h4>
            <ul className="space-y-4">
              <li>
                <a href="/about" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Meet Yora</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Our story & organic values</div>
                </a>
              </li>
              <li>
                <a href="/shop" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Shop Catalog</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Browse wood-pressed purity</div>
                </a>
              </li>
              <li>
                <a href="/stories" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Stories & Recipes</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Healthy cooking guides</div>
                </a>
              </li>
              <li>
                <a href="/contact" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Contact Farm</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Direct farm connection</div>
                </a>
              </li>
              <li>
                <a href="/wholesale" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Wholesale Inquiry</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Bulk and commercial orders</div>
                </a>
              </li>
            </ul>
          </div>

          {/* Card 4: Customer Care Links (span 2) */}
          <div className="lg:col-span-2 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] space-y-6">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              <li>
                <a href="/contact" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Shipping Policy</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Nationwide home delivery</div>
                </a>
              </li>
              <li>
                <a href="/contact" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Return Policy</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">100% trust guarantee</div>
                </a>
              </li>
              <li>
                <a href="/contact" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Privacy Policy</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Secure payment data guidelines</div>
                </a>
              </li>
              <li>
                <a href="/contact" className="group block text-left">
                  <div className="font-bold text-white group-hover:text-[#7AA33C] text-[12px] transition-colors leading-tight">Terms of Service</div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-0.5">Standard service protocols</div>
                </a>
              </li>
            </ul>
          </div>

          {/* Card 5: Brand Promise (span 2) */}
          <div className="lg:col-span-2 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] space-y-6">
            <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Our Promise</h4>
            <ul className="space-y-4">
              <li>
                <div className="text-left">
                  <div className="font-bold text-white text-[12px] leading-tight flex items-center gap-1">
                    <StarIcon /> Wood-Pressed
                  </div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-1 leading-normal">
                    No heat generated, preserves full nutrition.
                  </div>
                </div>
              </li>
              <li>
                <div className="text-left">
                  <div className="font-bold text-white text-[12px] leading-tight flex items-center gap-1">
                    <StarIcon /> Sourced Direct
                  </div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-1 leading-normal">
                    Freshly dried seeds from Udumalpet farms.
                  </div>
                </div>
              </li>
              <li>
                <div className="text-left">
                  <div className="font-bold text-white text-[12px] leading-tight flex items-center gap-1">
                    <StarIcon /> Chemical Free
                  </div>
                  <div className="text-[10px] text-[#FAF7F0]/50 font-light mt-1 leading-normal">
                    No refined additives or chemical bleaching.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Card 6: Availability and Payments (span 7) */}
          <div className="lg:col-span-7 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-left space-y-2 max-w-md">
              <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Availability</h4>
              <p className="text-white font-bold text-xs leading-snug">
                Farm Dispatch Active Nationwide
              </p>
              <p className="text-[10px] text-[#FAF7F0]/50 font-light leading-relaxed">
                Processed and packed fresh at our traditional wooden extraction mills in Pukkulam, and shipped securely across India.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 w-full md:w-auto">
              <span className="text-[9px] text-[#FAF7F0]/40 uppercase tracking-widest font-extrabold">Secure Payments</span>
              <div className="flex flex-wrap gap-1.5 bg-white/[0.05] p-2.5 rounded-2xl border border-white/5">
                <span className="font-extrabold text-[8px] bg-blue-900/40 text-blue-100 border border-blue-900/50 px-2 py-0.5 rounded">VISA</span>
                <span className="font-extrabold text-[8px] bg-red-600/40 text-red-100 border border-red-600/50 px-2 py-0.5 rounded">MC</span>
                <span className="font-extrabold text-[8px] bg-green-700/40 text-green-100 border border-green-700/50 px-2 py-0.5 rounded">UPI</span>
                <span className="font-extrabold text-[8px] bg-emerald-600/40 text-emerald-100 border border-emerald-600/50 px-2 py-0.5 rounded">RAZORPAY</span>
              </div>
            </div>
          </div>

          {/* Card 7: Follow Us (span 5) */}
          <div className="lg:col-span-5 col-span-12 p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-wider">Follow Us</h4>
              <p className="text-[10px] text-[#FAF7F0]/50 font-light leading-relaxed">
                Connect with our organic farming community.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <a href="#" className="p-3 bg-white/[0.05] border border-white/10 rounded-full text-white hover:bg-[#7AA33C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Facebook">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="p-3 bg-white/[0.05] border border-white/10 rounded-full text-white hover:bg-[#7AA33C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Instagram">
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-3 bg-white/[0.05] border border-white/10 rounded-full text-white hover:bg-[#7AA33C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Twitter">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <hr className="my-12 border-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[#FAF7F0]/40 text-[11px]">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Yora, Yakria Private Limited. All Rights Reserved. Prepared by traditional cold-press units in Tirupur.
          </p>

          <div className="flex items-center gap-6 font-bold tracking-widest uppercase text-[10px]">
            <a href="/contact" className="text-[#FAF7F0]/60 hover:text-[#7AA33C] transition-colors">Privacy Policy</a>
            <a href="/contact" className="text-[#FAF7F0]/60 hover:text-[#7AA33C] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

