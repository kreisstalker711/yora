"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(redirect);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-surface bg-white p-8 sm:p-12 max-w-md mx-auto">
      <div className="text-left space-y-2 mb-8">
        <h1 className="font-serif text-2xl font-semibold text-primary">Welcome Back</h1>
        <p className="text-xs text-ink-muted">Sign in to view your orders and account details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <p className="text-xs text-ink-muted text-center mt-6">
        Don&apos;t have an account?{" "}
        <a href={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-primary font-semibold hover:text-accent">
          Create one
        </a>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Suspense fallback={<div className="text-center text-ink-muted text-xs uppercase tracking-widest">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
