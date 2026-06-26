"use client";

import { FormEvent, useId, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Logo } from "./Logo";
import { auth } from "@/src/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type Errors = {
  identifier?: string;
  password?: string;
  submit?: string;
};

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 11V8a5 5 0 0 1 10 0v3M6.5 11h11A1.5 1.5 0 0 1 19 12.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-7A1.5 1.5 0 0 1 6.5 11Z" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path
        d={
          open
            ? "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            : "M3 3l18 18M10.6 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a14 14 0 0 1-2.3 3.1M6.5 6.7C3.9 8.5 2.5 12 2.5 12s3.5 7 9.5 7c1.5 0 2.8-.4 4-1"
        }
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.2 3-7.2Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-0.9 6.6-2.5l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.8a6 6 0 0 1 0-3.6V7.6H3.1a10 10 0 0 0 0 8.8l3.3-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.6l3.3 2.6C7.2 7.9 9.4 6.1 12 6.1Z"
      />
    </svg>
  );
}

export function LoginForm() {
  const identifierId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function validate(identifier: string, password: string) {
    const nextErrors: Errors = {};
    const normalizedIdentifier = identifier.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+()\-\s\d]{8,18}$/;

    if (!normalizedIdentifier) {
      nextErrors.identifier = "Enter your email address.";
    } else if (!emailPattern.test(normalizedIdentifier)) {
      if (phonePattern.test(normalizedIdentifier)) {
        nextErrors.identifier = "Phone login is currently unavailable. Please use email or sign in with Google.";
      } else {
        nextErrors.identifier = "Use a valid email address.";
      }
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") ?? "");
    const password = String(formData.get("password") ?? "");

    const nextErrors = validate(identifier, password);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, identifier, password);
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Authentication error:", error);
      let errorMsg = "Failed to sign in. Please verify your email/password.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        errorMsg = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMsg = "Too many login attempts. Please try again later or reset your password.";
      } else if (error.code === "auth/network-request-failed") {
        errorMsg = "Network error. Please check your internet connection.";
      } else {
        errorMsg = error.message || errorMsg;
      }
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setErrors({});
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Google Authentication error:", error);
      let errorMsg = "Failed to sign in with Google.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMsg = "Login popup closed before completion.";
      } else if (error.code === "auth/network-request-failed") {
        errorMsg = "Network error. Please check your internet connection.";
      } else {
        errorMsg = error.message || errorMsg;
      }
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#FAF7F0] px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16 border-r border-[#102316]/5">
      <div className="w-full max-w-[420px] space-y-10">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#102316]">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
            Please sign in to access your organic order history and premium subscription benefits.
          </p>
        </div>

        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 text-center animate-fade-in">
              {errors.submit}
            </div>
          )}
          <div className="space-y-2 text-left">
            <Label htmlFor={identifierId} className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email or Phone Number</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon />
              </span>
              <Input
                id={identifierId}
                name="identifier"
                type="text"
                inputMode="email"
                autoComplete="username"
                placeholder="Enter your email or phone number"
                className="pl-12 h-12 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:ring-4 focus:ring-[#7AA33C]/10 text-xs bg-white"
                aria-invalid={Boolean(errors.identifier)}
                aria-describedby={errors.identifier ? `${identifierId}-error` : undefined}
              />
            </div>
            {errors.identifier ? (
              <p id={`${identifierId}-error`} className="text-xs text-red-600 font-medium" role="alert">
                {errors.identifier}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor={passwordId} className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Password</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <LockIcon />
              </span>
              <Input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="px-12 h-12 rounded-xl border border-[#DCE2D6] focus:border-[#7AA33C] focus:ring-4 focus:ring-[#7AA33C]/10 text-xs bg-white"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? `${passwordId}-error` : undefined}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-slate-400 transition hover:text-[#102316]"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password ? (
              <p id={`${passwordId}-error`} className="text-xs text-red-600 font-medium" role="alert">
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-4 text-xs font-medium">
            <Label
              htmlFor={rememberId}
              className="inline-flex cursor-pointer items-center gap-2 font-normal text-slate-500 hover:text-[#102316]"
            >
              <Checkbox id={rememberId} name="remember" className="h-4 w-4 text-[#7AA33C] focus:ring-[#7AA33C]/20" />
              Remember me
            </Label>
            <a
              href="/forgot-password"
              className="font-bold text-[#102316] hover:text-[#7AA33C] transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-[#102316] hover:bg-[#7AA33C] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition duration-300 shadow-md shadow-[#102316]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-light">
            <span className="h-px flex-1 bg-slate-200" />
            or sign in with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Button 
            type="button"
            variant="outline" 
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full h-12 border border-[#102316]/10 hover:border-[#102316]/30 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            aria-label="Continue with Google"
          >
            <GoogleIcon />
            {loading ? "Loading..." : "Continue with Google"}
          </Button>

          <p className="text-center text-xs text-slate-500 font-light">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-[#102316] hover:text-[#7AA33C] transition-colors"
            >
              Sign Up
            </a>
          </p>

          <div className="sr-only" aria-live="polite">
            {Object.keys(errors).length
              ? "Please fix the highlighted fields."
              : "Login form ready."}
          </div>
        </form>
      </div>
    </section>
  );
}
