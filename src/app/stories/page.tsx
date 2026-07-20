"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { BLOG_POSTS } from "@/src/data/blogPosts";

const CATEGORIES = ["all", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = activeCategory === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());

  const featured = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-giant select-none pointer-events-none uppercase">
        NATURE
      </div>

      <Header />

      <section className="relative overflow-hidden bg-primary text-white py-20 text-center border-b border-primary-light/10">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="divider-gold mx-auto"></div>
          <span className="text-gold font-bold text-[10px] sm:text-xs tracking-[0.3em] uppercase block">
            THE ORGANIC JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
            Yora Stories
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
            Insights on cold-pressing, wholesale sourcing, and everyday wellness — straight from the Yora team.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex justify-center mb-16">
          <div className="card-surface bg-white p-2 inline-flex flex-wrap gap-1 rounded-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-primary text-white shadow-[inset_0_0_0_1px_rgba(176,141,87,0.4)]"
                    : "text-ink/70 hover:text-primary"
                }`}
              >
                {cat === "all" ? "All Stories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {activeCategory === "all" && (
          <div className="mb-20">
            <a href={`/stories/${featured.slug}`} className="card-surface card-surface-interactive bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 block">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto h-64 lg:h-96 relative overflow-hidden bg-cream">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-accent-soft border border-accent/25 text-primary text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
                      Featured &middot; {featured.category}
                    </span>
                    <span className="text-[10px] text-ink-muted font-medium">{featured.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-primary leading-tight hover:text-gold transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-light line-clamp-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-ink/10 flex items-center justify-between">
                  <span className="text-[9px] text-ink-muted font-bold uppercase tracking-wider">By {featured.author}</span>
                  <span className="text-[9px] text-gold font-bold uppercase tracking-widest">{featured.readTime}</span>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles
            .filter((a) => activeCategory !== "all" || a.slug !== featured.slug)
            .map((article) => (
              <a
                href={`/stories/${article.slug}`}
                key={article.slug}
                className="card-surface card-surface-interactive bg-white overflow-hidden flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-cream border-b border-primary/5">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gold text-[9px] font-extrabold tracking-widest uppercase">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-ink-muted font-medium">{article.date}</span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-primary leading-tight group-hover:text-gold transition-colors min-h-[3rem]">
                      {article.title}
                    </h4>
                    <p className="text-ink-muted text-xs leading-relaxed font-light line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-ink/5 flex items-center justify-between">
                  <span className="text-[9px] text-ink-muted font-bold uppercase tracking-wider">By {article.author}</span>
                  <span className="text-[9px] text-gold font-bold uppercase tracking-widest">{article.readTime}</span>
                </div>
              </a>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
