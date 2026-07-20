"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { BLOG_POSTS, getBlogPostBySlug } from "@/src/data/blogPosts";

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "paragraph"; text: string };

function groupBlocks(lines: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let currentList: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: "list", items: currentList });
    }
    currentList = null;
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "heading", text: line.replace("## ", "") });
    } else if (line.startsWith("- ")) {
      if (!currentList) currentList = [];
      currentList.push(line.replace("- ", ""));
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push({ type: "callout", text: line.replace("> ", "") });
    } else {
      flushList();
      blocks.push({ type: "paragraph", text: line });
    }
  }
  flushList();
  return blocks;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-24 gap-4 text-center">
          <h1 className="font-serif text-2xl font-semibold text-primary">Story Not Found</h1>
          <a href="/stories" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-gold">
            Back to Stories &rarr;
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased overflow-x-hidden">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <nav className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-8">
          <a href="/stories" className="hover:text-primary">Stories</a> <span className="mx-1">/</span> {post.category}
        </nav>

        <div className="space-y-4 text-left mb-10">
          <div className="flex items-center gap-3">
            <span className="bg-accent-soft border border-accent/25 text-primary text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-[10px] text-ink-muted font-medium">{post.date}</span>
            <span className="text-[10px] text-gold font-bold uppercase tracking-widest">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-primary leading-tight">{post.title}</h1>
          <p className="text-xs text-ink-muted font-semibold uppercase tracking-wider">By {post.author}</p>
        </div>

        <div className="card-surface bg-cream aspect-video overflow-hidden mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="space-y-5 text-left text-sm text-ink-muted leading-relaxed max-w-none">
          {groupBlocks(post.body).map((block, idx) => {
            if (block.type === "heading") {
              return (
                <h2 key={idx} className="font-serif text-xl font-semibold text-primary pt-4">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "callout") {
              return (
                <div key={idx} className="card-surface bg-accent-soft/40 border-l-4 border-gold px-5 py-4 text-ink">
                  {block.text}
                </div>
              );
            }
            return <p key={idx}>{block.text}</p>;
          })}
        </article>

        <div className="mt-16 pt-10 border-t border-ink/10">
          <h2 className="font-serif text-2xl font-semibold text-primary mb-8">More Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {fallbackRelated.map((r) => (
              <a key={r.slug} href={`/stories/${r.slug}`} className="card-surface card-surface-interactive bg-white overflow-hidden block">
                <div className="aspect-video bg-cream overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-1.5">
                  <span className="text-gold text-[9px] font-extrabold tracking-widest uppercase">{r.category}</span>
                  <h4 className="font-serif text-sm font-semibold text-primary leading-snug">{r.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
