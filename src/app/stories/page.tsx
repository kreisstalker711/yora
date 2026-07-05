"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

const ARTICLES = [
  {
    id: 1,
    title: "The Heritage of Vaagai Wood Pressing",
    category: "Heritage",
    date: "June 18, 2026",
    author: "S. Raghavan, Master Presser",
    desc: "Why the type of wood matters in traditional cold pressing. Exploring how the Vaagai tree absorbs heat to maintain vital nutrition under 35°C.",
    img: "/images/banner_coconut.png",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "Traditional Oils vs Refined Oils: A Definitive Health Guide",
    category: "Wellness",
    date: "June 10, 2026",
    author: "Dr. Ananya Mitra, Nutritionist",
    desc: "Understanding the biochemical degradation that occurs during high-heat solvent extraction, bleach, and chemical refining of supermarket cooking oils.",
    img: "/loginsideimage.png",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Cooking with Cold-Pressed Sesame Oil: Secrets from Tamil Nadu",
    category: "Recipes",
    date: "May 28, 2026",
    author: "Chef K. Swamy",
    desc: "Unlock the deep nutty flavors of wood-pressed sesame oil crushed with organic palm jaggery. Standard culinary techniques and traditional recipes.",
    img: "/images/prod_combo.png",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Lauric Acid: The Skincare Wonder in Virgin Coconut Oil",
    category: "Skincare",
    date: "May 14, 2026",
    author: "Maya Patel, Herbalist",
    desc: "How cold centrifuged extraction protects the delicate lipid barrier of extra virgin coconut oil to deliver superior antimicrobials for facial hydration.",
    img: "/images/prod_coconut.png",
    readTime: "4 min read"
  }
];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Heritage", "Wellness", "Recipes", "Skincare"];

  const filteredArticles = activeCategory === "all"
    ? ARTICLES
    : ARTICLES.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

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
            THE ORGANIC JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            Yora Stories
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Insights on traditional wellness, heritage recipes, oil pressing techniques, and conscious lifestyle tips straight from our farm writers.
          </p>
        </div>
      </section>

      {/* Main Journal Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Filters inside Glass Tiled Selector */}
        <div className="flex justify-center mb-16">
          <div className="glass-card bg-white/80 p-2 rounded-full inline-flex flex-wrap gap-1 border border-primary/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-gradient-to-r from-[#63C132] to-[#0F3D2E] text-white shadow-md"
                    : "text-[#182218]/70 hover:text-[#63C132]"
                }`}
              >
                {cat === "all" ? "All Stories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (Asymmetric Layout in Glass Card) */}
        {activeCategory === "all" && ARTICLES.length > 0 && (
          <div className="mb-20">
            <div className="glass-card bg-white/75 rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-primary/5">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto h-64 lg:h-96 relative overflow-hidden bg-slate-50 border-r border-primary/5">
                <img 
                  src={ARTICLES[0].img} 
                  alt={ARTICLES[0].title} 
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#63C132]/10 border border-[#63C132]/25 text-[#0F3D2E] text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
                      Featured &middot; {ARTICLES[0].category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{ARTICLES[0].date}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0F3D2E] leading-tight hover:text-[#63C132] transition-colors cursor-pointer">
                    {ARTICLES[0].title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light line-clamp-4">
                    {ARTICLES[0].desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">By {ARTICLES[0].author}</span>
                  <span className="text-[9px] text-[#63C132] font-bold uppercase tracking-widest">{ARTICLES[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles
            .filter(a => activeCategory !== "all" || a.id !== 1) // exclude featured post from grid if all
            .map((article) => (
              <article 
                key={article.id}
                className="glass-card bg-white/70 rounded-[2.5rem] overflow-hidden shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-50 border-b border-primary/5">
                    <img 
                      src={article.img} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-103"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[#63C132] text-[9px] font-extrabold tracking-widest uppercase">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{article.date}</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#0F3D2E] leading-tight hover:text-[#63C132] transition-colors cursor-pointer min-h-[3rem]">
                      {article.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-3">
                      {article.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">By {article.author.split(",")[0]}</span>
                  <span className="text-[9px] text-[#63C132] font-bold uppercase tracking-widest">{article.readTime}</span>
                </div>
              </article>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
