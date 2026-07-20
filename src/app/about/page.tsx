"use client";

import React from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Reveal } from "@/src/components/Reveal";
import { TextReveal, LineReveal } from "@/src/components/TextReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased relative overflow-hidden">
      {/* Decorative background word */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        YORA
      </div>

      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary text-cream py-20 text-center border-b border-accent/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-accent font-extrabold text-[10px] sm:text-xs tracking-[0.3em] uppercase block font-bold">
            About Yora
          </span>
          
          <TextReveal as="h1" className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white">
            Pure by Nature. Trusted by Families.
          </TextReveal>
          
          <p className="text-white/80 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            At Yora, we believe that the finest food begins with nature. Every bottle we create is a reflection of our commitment to purity, authenticity, and traditional values. Through carefully selected ingredients and gentle processing methods, we bring wholesome, naturally nourishing oils to families who value quality and healthy living.
          </p>
          <p className="text-white/70 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Our journey is inspired by the timeless wisdom of traditional food preparation, where patience, care, and respect for nature were at the heart of every meal. Today, we continue that legacy by producing premium natural oils that preserve their original nutrition, aroma, and authentic taste—without unnecessary chemicals or excessive processing.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Editorial Content Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Large Image in Glass Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="card-surface bg-white p-3.5 rounded-[var(--radius-xl)] shadow-xl w-full max-w-md relative border border-primary/10">
              <div className="absolute -inset-4 border border-gold/15 rounded-[var(--radius-xl)] pointer-events-none transform -rotate-2"></div>
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden aspect-[4/5] shadow-inner bg-cream">
                <img
                  src="/images/real/farmer-holding-groundnuts.jpg"
                  alt="Yora Journey - farm sourcing in Udumalpet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Editorial copy: Our Story */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Story</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
              A Journey Rooted in Nature
            </h2>
            <div className="w-16 h-[2px] bg-gold"></div>
            
            <div className="space-y-4 text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
              <p>
                Long before industrial refining became common, families relied on naturally extracted oils prepared using traditional methods. These oils were valued not only for their rich taste but also for the nourishment they provided to generations.
              </p>
              <p className="font-bold text-primary">
                Yora was founded with a simple vision—to bring back that purity.
              </p>
              <p>
                We believe that food should remain as close to its natural form as possible. Every product we create is carefully crafted to preserve the essential nutrients, authentic flavor, and natural aroma that nature intended.
              </p>
              <p>
                By combining traditional extraction techniques with modern quality standards, Yora delivers products that families can trust every single day.
              </p>
              <p>
                From the farms where our ingredients are grown to the bottle that reaches your home, every step reflects our dedication to quality, honesty, and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PHILOSOPHY */}
      <section className="bg-cream-dark border-y border-primary/5 py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">Nature Knows Best</h2>
          </div>
          
          <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed max-w-2xl mx-auto">
            At Yora, we believe that the healthiest choices are often the simplest ones. Nature provides everything needed for wholesome living. Our responsibility is not to change it—but to preserve it.
          </p>

          <div className="bg-white border border-white/60 p-8 rounded-[var(--radius-lg)] shadow-sm text-left max-w-xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary block border-b border-primary/10 pb-2">
              That philosophy guides every decision we make:
            </span>
            <ul className="space-y-3 text-xs sm:text-sm font-light text-ink/90">
              {[
                "Source only quality natural ingredients.",
                "Preserve nutrients through gentle processing.",
                "Avoid unnecessary chemicals and artificial additives.",
                "Maintain complete transparency in our manufacturing practices.",
                "Deliver products that families can trust every day."
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-accent font-bold">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-serif italic text-base font-bold text-primary">
            &ldquo;For us, purity is not a marketing promise—it is our way of working.&rdquo;
          </p>
        </div>
      </section>

      {/* 4. MISSION & VISION (Split Cards Layout) */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-4 text-left">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Mission</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">Bringing Pure Nutrition to Every Home</h3>
              <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                Our mission is to make natural, minimally processed foods accessible to every family. We are committed to producing premium-quality oils that preserve their original nutritional value while maintaining the highest standards of food safety, hygiene, and consistency. Through responsible sourcing, careful manufacturing, and honest practices, we strive to inspire healthier lifestyles and build lasting trust with every customer.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-4 text-left">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Vision</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">Creating a Healthier Future</h3>
              <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                We envision a future where every kitchen is filled with wholesome, naturally produced foods that support healthier living. Our goal is to become one of the most trusted names in natural oils by continuously delivering products known for their purity, quality, and authenticity while promoting sustainable practices that benefit both people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT MAKES YORA DIFFERENT */}
      <section className="py-20 bg-cream-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">More Than Just Oil</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">What Makes Yora Different</h2>
            <p className="text-xs text-ink/75 mt-2">Yora is built upon values that go beyond manufacturing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "100% Natural", desc: "Every product begins with carefully selected, naturally grown ingredients sourced from trusted farms." },
              { title: "Traditional", desc: "We use gentle extraction methods that help preserve natural nutrients, flavor, and aroma." },
              { title: "No Chemicals", desc: "Our oils are produced without chemical refining, bleaching agents, or unnecessary additives." },
              { title: "Quality Sourcing", desc: "Every batch undergoes strict quality inspections before reaching your kitchen." },
              { title: "Everyday Wellness", desc: "Our products are designed to support healthier cooking, personal care, and family well-being." }
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-white border border-primary/10 p-6 rounded-[var(--radius-lg)] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center font-serif text-base font-bold text-primary mb-4">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary mb-2">{feat.title}</h4>
                  <p className="text-[10px] sm:text-[11px] text-ink/85 leading-relaxed font-light">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR MANUFACTURING PROCESS */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Farm to Bottle</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">Our Manufacturing Process</h2>
            <p className="text-xs sm:text-sm text-ink/75 font-light mt-2">
              Every bottle of Yora reflects a carefully controlled production process that protects the natural goodness of every ingredient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
            {[
              { step: "Step 1", title: "Sourcing", desc: "We partner with trusted farmers who cultivate coconuts, groundnuts, and sesame seeds responsibly." },
              { step: "Step 2", title: "Selection", desc: "Only mature, fresh, and premium-quality raw materials are selected after inspection." },
              { step: "Step 3", title: "Cleaning", desc: "Ingredients are thoroughly cleaned to remove impurities while maintaining freshness." },
              { step: "Step 4", title: "Extraction", desc: "Virgin Coconut: cold centrifuged milk. Groundnut/Sesame: mechanically cold pressed." },
              { step: "Step 5", title: "Quality", desc: "Each batch undergoes comprehensive quality testing to ensure purity and safety." },
              { step: "Step 6", title: "Packaging", desc: "Freshly extracted oils are immediately filtered and packed in food-grade containers." },
              { step: "Step 7", title: "Delivered", desc: "Every bottle reaches customers with the same purity and value nature intended." }
            ].map((item, idx) => (
              <div key={idx} className="bg-cream border border-primary/10 p-6 rounded-2xl flex flex-col justify-between text-left relative hover:-translate-y-1 duration-300">
                <span className="text-gold text-[9px] font-bold uppercase tracking-wider block mb-1">{item.step}</span>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-[10px] text-ink/80 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY OUR EXTRA VIRGIN COCONUT OIL IS DIFFERENT */}
      <section className="py-20 bg-cream-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Coconut Extraction</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">
                Why Our Extra Virgin Coconut Oil is Different
              </h2>
              <div className="w-16 h-[2px] bg-gold"></div>
              
              <div className="space-y-4 text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                <p>
                  Unlike conventional coconut oils produced from dried copra, Yora's Extra Virgin Coconut Oil is extracted from fresh coconut milk using a cold-centrifugation process.
                </p>
                <p>
                  This advanced extraction method naturally separates the oil from water and coconut solids without exposing it to high temperatures or chemical solvents.
                </p>
                
                <div className="bg-white border border-primary/10 p-5 rounded-2xl space-y-2 mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">As a result, the oil retains:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-primary/90">
                    {[
                      "Its fresh natural aroma",
                      "Healthy medium-chain fatty acids (MCFAs)",
                      "Natural antioxidants",
                      "Essential nutrients",
                      "Light texture",
                      "Authentic coconut flavor"
                    ].map((bullet, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="text-accent">✔</span> {bullet}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-semibold text-primary pt-2">
                  The result is a premium-quality oil suitable for cooking, hair care, skincare, and everyday wellness.
                </p>
              </div>
            </div>

            {/* Right Picture */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="card-surface bg-white p-3.5 rounded-[var(--radius-xl)] border border-primary/10 w-full max-w-sm">
                <img
                  src="/images/real/coconut-oil-in-leaves.jpg"
                  alt="Extra Virgin Coconut Oil"
                  className="w-full h-auto rounded-[var(--radius-lg)] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. OUR QUALITY STANDARDS & SUSTAINABILITY */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Quality Standards */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-6 text-left">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Quality Control</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">Our Quality Standards</h3>
              <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                Quality is never an afterthought at Yora—it is built into every stage of production. Our manufacturing process follows strict hygiene protocols and quality management systems to ensure every bottle meets the highest standards before leaving our facility.
              </p>
              <div className="space-y-2 border-t border-primary/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-2">We focus on:</span>
                <div className="grid grid-cols-2 gap-2 text-xs text-ink/90 font-medium">
                  {[
                    "Premium raw materials",
                    "Hygienic processing",
                    "Food-grade packaging",
                    "Batch quality testing",
                    "Product consistency",
                    "Freshness preservation"
                  ].map((focus, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="text-accent">✔</span> {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sustainability */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-6 text-left flex flex-col justify-between">
              <div>
                <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Environmental Care</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">Our Commitment to Sustainability</h3>
                <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed mt-4">
                  Nature provides everything we need, and we believe it is our responsibility to protect it.
                </p>
                <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed mt-2">
                  Yora supports responsible sourcing, environmentally conscious manufacturing, and practices that reduce unnecessary waste while maintaining product quality.
                </p>
                <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed mt-2">
                  By working closely with trusted farming communities and focusing on minimal processing, we strive to create products that are better for people and kinder to the environment.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. OUR CORE VALUES */}
      <section className="py-20 bg-cream-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">The Principles That Guide Us</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { name: "Purity", desc: "Delivering products that remain true to their natural origins." },
              { name: "Integrity", desc: "Being transparent and honest in everything we do." },
              { name: "Quality", desc: "Never compromising on food safety or manufacturing standards." },
              { name: "Wellness", desc: "Helping families make healthier choices every day." },
              { name: "Sustainability", desc: "Supporting responsible farming and environmentally conscious production." },
              { name: "Trust", desc: "Building lasting relationships through consistency and reliability." }
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-white border border-primary/10 p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
              >
                <h4 className="font-serif text-base font-bold text-primary mb-2">{feat.name}</h4>
                <p className="text-[10px] text-ink/85 leading-relaxed font-light">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. OUR PROMISE */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Commitment</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">Our Promise</h2>
          <p className="text-xs sm:text-sm text-ink/80 font-light leading-relaxed max-w-2xl mx-auto">
            When you choose Yora, you are choosing more than premium natural oil. You are choosing products created with care, guided by tradition, and backed by modern quality standards. Every bottle represents our promise to preserve nature's goodness while delivering purity, nutrition, and authentic taste to your home.
          </p>
        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-xl)] bg-gradient-to-r from-primary to-accent text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-gold font-bold text-xs uppercase tracking-widest">Natural Living</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight">
              Experience the Difference of Pure, Natural Living
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
              Discover a range of premium natural oils crafted with care, rooted in tradition, and designed for modern families.
            </p>
            <p className="font-serif text-xl sm:text-2xl font-extrabold text-gold">
              Choose Purity. Choose Yora.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <a
                href="/shop"
                className="bg-gold hover:bg-white text-primary hover:text-primary px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
              >
                Shop Oils Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
