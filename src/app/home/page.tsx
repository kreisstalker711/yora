"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Reveal } from "@/src/components/Reveal";
import { TextReveal, LineReveal } from "@/src/components/TextReveal";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { formatPrice } from "@/src/lib/currency";
import { PRODUCTS, getProductById } from "@/src/data/products";
import { submitNewsletterSignup } from "@/src/lib/firestore";

// Star rating icon component
function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#B08D57" : "none"}
      stroke="#B08D57"
      strokeWidth={1.5}
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499c.15-.427.79-.427.94 0l1.84 5.314a.499.499 0 00.474.335h5.518c.465 0 .659.59.288.874l-4.463 3.428a.5.5 0 00-.18.555l1.68 5.15c.142.438-.363.805-.733.526l-4.463-3.428a.5.5 0 00-.58 0l-4.463 3.428c-.37.279-.875-.088-.733-.526l1.68-5.15a.5.5 0 00-.18-.555L3.38 10.02c-.371-.284-.177-.874.288-.874h5.518a.5.5 0 00.474-.335L11.48 3.5z"
      />
    </svg>
  );
}

// Heart/Wishlist icon component
function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "#7C9A6B" : "none"}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={filled ? "#7C9A6B" : "currentColor"}
      className="size-5 transition-colors duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

export default function HomePage() {
  const { currency } = useCurrency();
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    coconut: 1,
    groundnut: 1,
    sesame: 1,
  });
  const [wishlist, setWishlist] = useState<{ [key: string]: boolean }>({
    coconut: false,
    groundnut: false,
    sesame: false,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (storyVideoRef.current) {
        const rect = storyVideoRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          storyVideoRef.current.play().catch(() => { });
        } else {
          storyVideoRef.current.pause();
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateQty = (productId: string, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: increment ? (prev[productId] || 1) + 1 : Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (qty: number, productId: string) => {
    const product = getProductById(productId);
    if (!product) return;
    const variant = product.variants[0];

    addItem(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantSize: variant.size,
        priceINR: variant.priceINR,
        image: product.images[0],
      },
      qty,
    );

    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 right-8 card-surface bg-white px-6 py-4 text-sm font-sans flex items-center gap-3 z-50 transition-all duration-500 translate-y-4 opacity-0";
    toast.innerHTML = `
      <div>
        <p class="font-bold text-xs uppercase tracking-wider text-primary">Added to Cart</p>
        <p class="text-xs text-ink-muted">${qty}x ${product.title}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("translate-y-4", "opacity-0"), 50);
    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === "submitting") return;
    setNewsletterStatus("submitting");
    try {
      await submitNewsletterSignup(newsletterEmail);
      setNewsletterEmail("");
      setNewsletterStatus("done");
      setTimeout(() => setNewsletterStatus("idle"), 4000);
    } catch {
      setNewsletterStatus("error");
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      carouselRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased overflow-x-hidden">
      <Header />

      {/* 1. Shopify Premium Hero Section (Full-Bleed Banner Only) */}
      <section className="relative w-full bg-cream overflow-hidden pt-0 pb-0">
        <div className="w-full">
          <img 
            src="/images/yorawebbanner.png" 
            alt="Yora Premium E-Commerce Banner" 
            className="w-full h-auto object-cover block"
          />
        </div>
      </section>

      {/* 2. TRUST BAR - Redesigned with User Content */}
      <section className="bg-primary text-white py-12 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 Q100,0 200,50 T400,50 T600,50 T800,50 T1000,50" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-3">
            <div className="divider-gold mx-auto"></div>
            <span className="text-gold font-bold text-xs uppercase tracking-widest block">Trust Bar</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white">Trusted Quality, Certified Excellence</h2>
            <p className="text-white/70 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed">
              Every bottle of Yora is produced with strict quality standards and carefully tested to ensure purity, freshness, and consistency.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 max-w-4xl mx-auto">
            {[
              "100% Natural",
              "No Chemicals",
              "No Artificial Preservatives",
              "Farm Fresh Ingredients",
              "Traditional Processing",
              "Rich in Natural Nutrition",
              "Everyday Wellness"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/[0.06] px-4.5 py-2.5 rounded-full border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="flex items-center justify-center size-3.5 rounded-full bg-gold/20 text-gold text-[8px]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT YORA - Updated with User Content */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Rich Copy Block */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">About Yora</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary leading-tight">
                Pure Roots. Honest Ingredients. Healthy Living.
              </h2>
              <div className="w-16 h-[2px] bg-gold"></div>
              
              <div className="space-y-4 text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                <p>
                  At Yora, we believe that the healthiest food begins with nature. Every product we create reflects our commitment to purity, authenticity, and traditional food wisdom.
                </p>
                <p>
                  Inspired by generations of natural living, Yora carefully produces premium oils using gentle processing methods that preserve the original nutrients, aroma, and flavor of every ingredient. Unlike heavily refined oils, our products are never exposed to harsh chemicals or unnecessary processing, allowing nature to remain exactly as it should be.
                </p>
                <p>
                  From sourcing the finest raw materials to delivering every bottle with care, we remain dedicated to bringing healthier choices to modern homes while staying true to traditional values.
                </p>
                <p className="font-semibold text-primary">
                  Whether you're cooking for your family, nourishing your hair, or caring for your skin, Yora brings you nature's goodness in its purest form.
                </p>
                <div className="pt-4">
                  <a
                    href="/about"
                    className="inline-flex items-center bg-primary hover:bg-accent text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Meet Yora &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Media Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="card-surface bg-white p-3.5 rounded-[var(--radius-xl)] shadow-xl w-full max-w-sm relative border border-primary/10">
                <div className="relative rounded-[var(--radius-lg)] overflow-hidden aspect-[4/5] bg-cream">
                  <video
                    ref={storyVideoRef}
                    src="/yoravideo.mp4"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                    Live Cold Pressing
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SHOWCASE - Rounded cards */}
      <section className="py-20 bg-cream-dark relative overflow-hidden border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="divider-gold mx-auto mb-3"></div>
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Explore Our Range</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-primary">Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Extra Virgin Coconut Oil",
                desc: "Cold centrifuged pure raw coconut milk extract",
                img: "/images/real/coconut-bottle-1.png",
                bg: "from-accent/15 to-cream",
                link: "#products"
              },
              {
                title: "Cold Pressed Groundnut Oil",
                desc: "Naturally extracted peanut oil for cooking",
                img: "/images/real/groundnut-bottle-1.jpg",
                bg: "from-gold/15 to-cream",
                link: "#products"
              },
              {
                title: "Cold Pressed Sesame Oil",
                desc: "Traditionally processed sesame oil with jaggery",
                img: "/images/real/sesame-bottle-1.jpg",
                bg: "from-accent/15 to-cream",
                link: "#products"
              }
            ].map((cat, i) => (
              <a
                href={cat.link}
                key={i}
                className="card-surface card-surface-interactive group relative p-8 bg-white flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.bg} rounded-full blur-2xl group-hover:scale-125 duration-500`}></div>

                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-primary mb-2">{cat.title}</h4>
                  <p className="text-xs text-ink/75 leading-relaxed font-light mb-6">{cat.desc}</p>
                </div>

                <div className="relative h-44 flex items-center justify-center mb-6 bg-cream rounded-[var(--radius-md)] border border-primary/5">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="max-h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_12px_20px_rgba(20,50,42,0.12)]"
                  />
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-gold transition-colors mt-auto">
                  Shop Category
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PRODUCTS - Updated with User Content */}
      <section id="products" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="divider-gold mx-auto mb-3"></div>
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Our Products</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-primary">Premium Oils Crafted by Nature</h2>
            <p className="text-xs sm:text-sm text-ink/75 font-light mt-2">
              Discover our carefully curated collection of naturally processed oils designed for healthier cooking and everyday wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.filter((p) => p.category !== "combo").map((product) => {
              const variant = product.variants[0];
              return (
                <div key={product.id} className="card-surface card-surface-interactive bg-white p-6 flex flex-col justify-between relative group">
                  <div className="flex items-center justify-between z-10 relative">
                    <span className="bg-gold text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.badge}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2.5 rounded-full bg-white shadow-sm text-ink/60 hover:text-accent transition-all duration-300"
                      aria-label="Toggle wishlist"
                    >
                      <HeartIcon filled={wishlist[product.id]} />
                    </button>
                  </div>

                  <a href={`/shop/${product.slug}`} className="relative block h-56 w-full mt-4 rounded-[var(--radius-md)] overflow-hidden bg-cream flex items-center justify-center p-6 border border-primary/5 shadow-[inset_0_2px_8px_rgba(20,50,42,0.04)]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_20px_rgba(20,50,42,0.12)]"
                    />
                  </a>

                  <div className="mt-6 text-left space-y-3">
                    <div className="flex gap-0.5 items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} filled={i < product.rating} />
                      ))}
                      <span className="text-[10px] text-ink/60 font-semibold ml-1.5">({product.reviewCount} reviews)</span>
                    </div>

                    <a href={`/shop/${product.slug}`}>
                      <h3 className="font-serif text-lg font-bold text-primary hover:text-accent transition-colors">
                        {product.title}
                      </h3>
                    </a>

                    <p className="text-xs text-ink/75 leading-relaxed font-light">
                      {product.shortDesc}
                    </p>

                    <div className="bg-cream border border-primary/5 p-3.5 rounded-[var(--radius-sm)] space-y-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">Perfect For:</span>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-medium text-ink/85">
                        {product.perfectFor.map((item) => (
                          <span key={item} className="flex items-center gap-1">
                            <span className="text-gold">✔</span> {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-primary/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">{formatPrice(variant.priceINR, currency)}</span>
                        {variant.oldPriceINR && (
                          <span className="text-[10px] text-ink/40 line-through font-medium">Was {formatPrice(variant.oldPriceINR, currency)}</span>
                        )}
                      </div>

                      <div className="flex items-center border border-primary/20 bg-white rounded-[var(--radius-sm)] overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQty(product.id, false)}
                          className="px-3 py-1.5 text-sm hover:bg-primary/5 text-primary font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-primary">{quantities[product.id] || 1}</span>
                        <button
                          onClick={() => updateQty(product.id, true)}
                          className="px-3 py-1.5 text-sm hover:bg-primary/5 text-primary font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(quantities[product.id] || 1, product.id)}
                      className="w-full bg-primary hover:bg-primary-light text-white py-3.5 rounded-[var(--radius-sm)] text-xs font-bold uppercase tracking-widest transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE YORA - Updated with User Content (6 Cards) */}
      <section className="py-20 bg-cream-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Why Thousands Trust Yora</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">Why Choose Yora</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "100% Pure Ingredients",
                desc: "Only carefully selected natural ingredients are used to ensure every bottle delivers authentic quality.",
                icon: "🌱"
              },
              {
                title: "Naturally Processed",
                desc: "We use traditional and gentle processing methods that help retain the natural nutrients, aroma, and taste.",
                icon: "🏺"
              },
              {
                title: "No Chemicals",
                desc: "Absolutely free from chemical refining, bleaching agents, artificial preservatives, and unnecessary additives.",
                icon: "🚫"
              },
              {
                title: "Rich in Nutrition",
                desc: "Natural vitamins, antioxidants, and healthy fats remain preserved through minimal processing.",
                icon: "💧"
              },
              {
                title: "Farm to Bottle",
                desc: "Every product follows a carefully monitored journey from trusted farms to your kitchen.",
                icon: "🚜"
              },
              {
                title: "Multi-Purpose Wellness",
                desc: "Perfect for cooking, skin care, hair care, wellness routines, and everyday healthy living.",
                icon: "✨"
              }
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-white border border-white/60 p-8 rounded-[var(--radius-lg)] hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-xl mb-4 font-serif">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-primary mb-2">{feat.title}</h4>
                  <p className="text-xs text-ink/85 leading-relaxed font-light">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR PROMISE - New Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-primary to-accent text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-white/5 rounded-l-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-6 text-left space-y-6">
                <span className="text-gold font-bold text-xs uppercase tracking-widest">Our Promise</span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight">
                  What Makes Every Bottle Different
                </h2>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                  Every bottle of Yora represents our promise to deliver food exactly as nature intended.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Carefully Selected Ingredients",
                    "Traditional Processing",
                    "No Chemical Refining",
                    "No Artificial Colors",
                    "No Artificial Preservatives",
                    "No Added Fragrances",
                    "Maximum Freshness",
                    "Premium Quality Control",
                    "Naturally Rich Taste",
                    "Honest Manufacturing"
                  ].map((promise, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/95">
                      <span className="text-gold text-lg">✔</span>
                      <span>{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FROM FARM TO YOUR HOME - Redesigned Step Layout (User Content) */}
      <section className="py-20 bg-cream relative overflow-hidden border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">From Farm to Your Home</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">A Journey of Purity</h2>
            <p className="text-xs sm:text-sm text-ink/75 font-light mt-2">
              Every bottle follows a carefully monitored journey to ensure unmatched freshness and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "Step 1", title: "Carefully Selected Farms", desc: "We source only premium-quality coconuts, groundnuts, and sesame seeds from trusted farmers." },
              { step: "Step 2", title: "Fresh Harvest", desc: "Ingredients are harvested at the right stage to ensure maximum nutritional value." },
              { step: "Step 3", title: "Natural Processing", desc: "Our gentle extraction methods preserve the natural goodness without harsh refining." },
              { step: "Step 4", title: "Quality Testing", desc: "Every batch undergoes strict quality inspection before packaging." },
              { step: "Step 5", title: "Fresh Packaging", desc: "Products are packed hygienically to preserve freshness and purity." },
              { step: "Step 6", title: "Delivered to Your Home", desc: "Pure, natural oils reach your family exactly as nature intended." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-primary/10 p-8 rounded-[var(--radius-lg)] shadow-sm hover:shadow-md transition-all duration-300 relative"
              >
                <span className="absolute top-6 right-6 font-serif text-2xl font-extrabold text-gold/35">{item.step}</span>
                <h4 className="font-serif text-lg font-bold text-primary mb-3">{item.title}</h4>
                <p className="text-xs text-ink/85 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OUR VALUES - New Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Our Values</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-primary">The Principles Behind Every Product</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Purity", desc: "We believe natural food should remain natural." },
              { name: "Transparency", desc: "We openly share how every product is sourced and produced." },
              { name: "Sustainability", desc: "Supporting responsible farming and environmentally conscious practices." },
              { name: "Wellness", desc: "Helping families make healthier food choices every day." },
              { name: "Trust", desc: "Building long-term relationships through uncompromising quality." }
            ].map((val, idx) => (
              <div
                key={idx}
                className="bg-cream border border-primary/5 p-6 rounded-[var(--radius-lg)] hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-serif text-lg font-bold text-primary mb-2">{val.name}</h4>
                <p className="text-[11px] text-ink/85 font-light leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CERTIFIED QUALITY & CUSTOMER BENEFITS - Side by Side Grid */}
      <section className="py-20 bg-cream-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Block: Certified Quality */}
            <div className="card-surface bg-white p-8 sm:p-10 space-y-6">
              <div className="text-left space-y-2">
                <div className="divider-gold mb-1"></div>
                <span className="text-accent font-bold text-xs uppercase tracking-widest block">Certified Quality</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-primary">Produced Under Trusted Standards</h3>
                <p className="text-xs text-ink/75 font-light">
                  Every product is manufactured following internationally recognized quality and food safety practices.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { name: "Vegan", icon: "🌱" },
                  { name: "ISO Certified", icon: "🛡️" },
                  { name: "FDA Approved", icon: "✅" },
                  { name: "QRO Certified", icon: "🔍" },
                  { name: "FSSAI Registered", icon: "🥇" },
                  { name: "NBA Certified", icon: "🌿" },
                  { name: "Halal", icon: "☪️" },
                ].map((cert) => (
                  <div key={cert.name} className="flex flex-col justify-center items-center text-center gap-2">
                    <div className="badge-seal size-14 flex items-center justify-center text-xl">
                      {cert.icon}
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide leading-tight">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block: Customer Benefits */}
            <div className="card-surface bg-white p-8 sm:p-10 space-y-6">
              <div className="text-left space-y-2">
                <div className="divider-gold mb-1"></div>
                <span className="text-accent font-bold text-xs uppercase tracking-widest block">Customer Benefits</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-primary">More Than Just Cooking Oil</h3>
                <p className="text-xs text-ink/75 font-light">
                  Yora products become a part of your healthy lifestyle.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Better Everyday Cooking", desc: "Natural flavor with traditional goodness." },
                  { name: "Healthy Living", desc: "Rich in natural nutrients that support balanced nutrition." },
                  { name: "Hair Nourishment", desc: "Deep nourishment that leaves hair healthier and naturally shiny." },
                  { name: "Skin Care", desc: "Provides natural moisture and gentle daily care." },
                  { name: "Family Wellness", desc: "Suitable for daily use across generations." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-accent text-sm mt-0.5">✔</span>
                    <div className="text-left">
                      <h5 className="font-serif text-xs sm:text-sm font-bold text-primary">{item.name}</h5>
                      <p className="text-[11px] text-ink/70 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. OUR MISSION & VISION */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-4 text-left">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Mission</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">Bringing Nature Back to Every Kitchen</h3>
              <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                Our mission is to provide families with natural, minimally processed products that preserve the authentic nutrition, flavor, and purity of traditional foods. Through responsible sourcing, careful manufacturing, and uncompromising quality standards, we aim to inspire healthier lifestyles and build lasting trust with every household we serve.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-cream border border-primary/10 p-8 sm:p-12 rounded-[var(--radius-xl)] space-y-4 text-left">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block">Our Vision</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">A Healthier Future Begins With Pure Choices</h3>
              <p className="text-xs sm:text-sm text-ink/85 font-light leading-relaxed">
                We envision a future where every family has access to natural, wholesome foods free from unnecessary chemicals and excessive processing. By combining traditional wisdom with modern quality standards, Yora strives to become a trusted symbol of purity, nutrition, and sustainable living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Best Sellers Carousel shelf */}
      <section className="py-20 bg-cream relative overflow-hidden border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Customer Favorites</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">Best Sellers Collection</h2>
            </div>
            
            {/* Carousel Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-3 rounded-full border border-primary/20 bg-white hover:bg-cream text-primary transition-all shadow-sm focus:outline-none"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-3 rounded-full border border-primary/20 bg-white hover:bg-cream text-primary transition-all shadow-sm focus:outline-none"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            {PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 snap-start bg-white border border-primary/5 rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <a href={`/shop/${item.slug}`} className="relative h-56 w-full rounded-[var(--radius-md)] bg-cream flex items-center justify-center p-4 block">
                  <span className="absolute top-2 left-2 bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <img src={item.images[0]} alt={item.title} className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                </a>

                <div className="mt-4 text-left">
                  <h4 className="font-serif text-sm font-bold text-primary line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-accent font-bold mt-1">{formatPrice(item.variants[0].priceINR, currency)}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(1, item.id)}
                  className="w-full mt-4 bg-primary hover:bg-primary-light text-white py-2.5 rounded-[var(--radius-sm)] text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                >
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FINAL CALL TO ACTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[var(--radius-xl)] bg-gradient-to-r from-primary to-accent text-white overflow-hidden relative shadow-2xl">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-white/5 rounded-l-full blur-3xl pointer-events-none"></div>
            
            <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-8 text-left space-y-6">
                <span className="text-gold font-bold text-xs uppercase tracking-widest">Final Call To Action</span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight">
                  Bring Home Nature's Purest Goodness
                </h2>
                <p className="text-white/80 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                  Discover premium natural oils crafted with care, tradition, and uncompromising quality. Experience healthier cooking, everyday wellness, and authentic taste with every bottle.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#products"
                    className="bg-gold hover:bg-white text-primary hover:text-primary px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Explore Products
                  </a>
                  <a
                    href="/shop"
                    className="bg-white hover:bg-gold text-primary hover:text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center items-center">
                <img
                  src="/images/prod_combo.png"
                  alt="Organic Premium Combos"
                  className="h-60 w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ & Testimonials Grid */}
      <section className="py-20 bg-cream relative overflow-hidden border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Glassmorphic Testimonials */}
            <div className="lg:col-span-6 space-y-8">
              <div className="text-left">
                <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Verified Kitchen Reviews</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">What Cooks Say</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "Ramya",
                    role: "Bangalore, India",
                    quote: "Absolutely worth the cost. I started using Yora past 2 weeks and the aroma is pure sun-dried copra. Highly recommended for daily cooking.",
                    stars: 5,
                  },
                  {
                    name: "Bhuvana",
                    role: "Chennai, India",
                    quote: "Loving the taste, quality and thickness. It enhances the taste of any traditional dish which we prepare. The natural cold press aroma is completely visible.",
                    stars: 5,
                  },
                  {
                    name: "Sarveshwaran",
                    role: "Coimbatore, India",
                    quote: "YORA is always special... Authentic cold pressed oil with high viscosity. The natural settling shows clearly. Excellent product!",
                    stars: 5,
                  }
                ].map((review, i) => (
                  <div
                    key={i}
                    className="card-surface card-surface-interactive bg-white p-6 relative overflow-hidden"
                  >
                    <span className="absolute -top-2 right-4 font-serif text-6xl text-gold/15 select-none pointer-events-none">&rdquo;</span>
                    <div className="flex justify-between items-start gap-4 mb-3 relative">
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.stars }).map((_, idx) => (
                          <StarIcon key={idx} filled />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold">{review.role}</span>
                    </div>

                    <p className="text-xs text-ink/90 italic font-light leading-relaxed relative">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 pt-3 border-t border-primary/5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] font-serif">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-serif text-xs font-bold text-primary">{review.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Accordion FAQs */}
            <div className="lg:col-span-6 space-y-8">
              <div className="text-left">
                <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Help & Support</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">Frequently Asked FAQs</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "What is Cold Pressing?",
                    a: "It is a extraction method of pressing organic seeds at room temperature. By keeping temperatures low, natural antioxidants, vitamins, flavor, and nutrients remain fully intact without heat degradation."
                  },
                  {
                    q: "Why does the color of the oil vary between batches?",
                    a: "Because we refuse to use chemical bleaching agents or artificial stabilizers. The color depends purely on natural sun drying, seeds, and climate. Slight color variance is the biggest proof of 100% natural, unrefined oil."
                  },
                  {
                    q: "How long does Yora oil keep fresh?",
                    a: "Since our oils are unrefined and free of artificial chemical preservatives, they keep fresh for 6-9 months when stored in a cool, dry place away from direct sunlight."
                  },
                  {
                    q: "Where do you source your raw materials?",
                    a: "Every seed, copra, and peanut is sourced directly from vetted farming networks in Udumalpet and neighboring regions of Tamil Nadu, ensuring fair trade and quality control."
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-primary/15 rounded-2xl overflow-hidden bg-white/50 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-serif font-bold text-primary hover:bg-white/40 focus:outline-none transition-colors"
                    >
                      <span>{item.q}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className={`size-3.5 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    
                    {openFaq === idx && (
                      <div className="p-5 pt-0 border-t border-primary/5 bg-white/20 text-xs text-ink/85 font-light leading-relaxed animate-fade-in">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. Newsletter Subscription Card */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[var(--radius-xl)] bg-primary p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center shadow-[0_2px_4px_rgba(20,50,42,0.2),0_32px_64px_-16px_rgba(20,50,42,0.35)]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,50 Q40,10 70,50 T130,50" fill="none" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M300,100 Q330,60 360,100 T420,100" fill="none" stroke="#FFFFFF" strokeWidth="5" />
              </svg>
            </div>

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="divider-gold mx-auto"></div>
              <span className="text-gold font-bold text-xs uppercase tracking-widest">Join Our Wellness Circle</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                Get Recipe Guides & Priority Restocks
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light">
                Subscribe to receive farm-to-table updates, cold pressing science articles, and priority restock notifications.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full h-12 px-4 rounded-[var(--radius-md)] bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-gold focus:bg-white/15 focus:outline-none text-xs transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "submitting"}
                  className="bg-gold hover:bg-white hover:text-primary text-white px-8 py-3 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest transition duration-300 whitespace-nowrap disabled:opacity-60"
                >
                  {newsletterStatus === "submitting" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {newsletterStatus === "done" && (
                <p className="text-gold text-xs font-bold">Thank you for subscribing to Yora Circle!</p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-red-300 text-xs font-bold">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
