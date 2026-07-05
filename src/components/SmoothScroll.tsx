"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — wraps the app with Lenis for momentum-based smooth scrolling.
 * Uses expo-out easing to mimic physical deceleration (same curve as our CSS transitions).
 * Runs on a rAF loop so it stays in sync with the browser's paint cycle.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      // expo-out: starts fast, decelerates smoothly — matches cubic-bezier(.16,1,.3,1)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Expose lenis on window so other components can call lenis.scrollTo etc.
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
