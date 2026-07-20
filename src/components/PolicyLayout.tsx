import React from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

export default function PolicyLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased">
      <Header />

      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold">{title}</h1>
          <p className="text-white/60 text-xs uppercase tracking-widest">Last updated {updatedAt}</p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-left space-y-6 text-sm text-ink-muted leading-relaxed [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:pt-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
