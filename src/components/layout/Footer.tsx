"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-transparent pt-6 pb-12 px-4 sm:px-6 lg:px-8 text-left text-xs tracking-wide">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-white/10 shadow-[0_24px_80px_rgba(10,20,14,0.3)] relative overflow-hidden bg-[#102316]">
        
        {/* Top Banner: Farm Landscape with Heading and Yora Logo from the reference image */}
        <a 
          href="/home" 
          className="block h-48 sm:h-64 w-full relative group overflow-hidden border-b border-white/10"
          style={{
            backgroundImage: "url('/images/footer_bg_new.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Yora Home"
        >
          {/* Subtle hover overlay zoom animation */}
          <div className="absolute inset-0 bg-[#102316]/5 group-hover:bg-transparent transition-all duration-500"></div>
        </a>

        {/* Bottom Sitemap Section */}
        <div className="p-8 sm:p-12 lg:p-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left relative z-10">
            
            {/* Column 1: Products */}
            <div className="space-y-4">
              <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">Products</h4>
              <ul className="space-y-3 font-medium">
                <li>
                  <a href="/shop?category=coconut" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Extra Virgin Coconut Oil
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Cold centrifuged pure raw extract</span>
                  </a>
                </li>
                <li>
                  <a href="/shop?category=groundnut" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Wood-Pressed Groundnut Oil
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Traditional wood mortar extraction</span>
                  </a>
                </li>
                <li>
                  <a href="/shop?category=sesame" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Wood-Pressed Sesame Oil
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Sun-dried seeds pressed with palm jaggery</span>
                  </a>
                </li>
                <li>
                  <a href="/shop" className="text-[#7AA33C] hover:text-[#8CB847] transition-colors font-bold block pt-2 border-t border-white/5">
                    View Full Catalog &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Meet Yora */}
            <div className="space-y-4">
              <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">Meet Yora</h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a href="/about" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Our Heritage & Story
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Vaagai mortar pressing roots in Udumalpet</span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Farming Purity & Values
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Direct farm sourcing & zero chemical refinement</span>
                  </a>
                </li>
                <li>
                  <a href="/stories" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Stories & Recipes
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Healthy organic cooking & heritage guides</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Support */}
            <div className="space-y-4">
              <h4 className="text-[#FAF7F0]/40 font-bold text-[10px] uppercase tracking-widest">Contact Farm</h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a href="/contact" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Contact Us
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Get in touch for support and general queries</span>
                  </a>
                </li>
                <li>
                  <a href="/wholesale" className="text-[#FAF7F0]/85 hover:text-[#7AA33C] transition-colors block">
                    Wholesale Inquiries
                    <span className="block text-[10px] text-[#FAF7F0]/40 font-light mt-0.5">Bulk commercial requirements & partnerships</span>
                  </a>
                </li>
                <li>
                  <div className="text-[#FAF7F0]/50 text-[11px] leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5 font-light">
                    <strong>Yakria Private Limited</strong> <br/>
                    CIN: U72900TN2021PTC143722 <br/>
                    5/176-3, Pukkulam, Udumalpet, Tirupur, TN, 642154
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Compliance & Copyright sub-footer */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-[#FAF7F0]/40 text-[10px] font-light leading-relaxed">
            <div>
              <p>&copy; {new Date().getFullYear()} Yora. All Rights Reserved. Prepared by traditional cold-press units in Tirupur.</p>
            </div>
            <div className="flex items-center gap-6 font-bold uppercase tracking-wider text-[9px] shrink-0">
              <a href="/contact" className="hover:text-[#7AA33C] transition-colors">Privacy Policy</a>
              <a href="/contact" className="hover:text-[#7AA33C] transition-colors">Terms of Service</a>
              <a href="mailto:info@theyora.com" className="hover:text-[#7AA33C] transition-colors underline">info@theyora.com</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
