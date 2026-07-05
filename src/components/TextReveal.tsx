"use client";

import React, { useEffect, useRef } from "react";

type TagName = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";

interface TextRevealProps {
  children: string;
  as?: TagName;
  className?: string;
  /** Additional delay before the first word starts (ms) */
  delay?: number;
  /** Stagger per word (ms) */
  wordDelay?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
}

/**
 * TextReveal — splits text into words, each clipped inside an overflow:hidden
 * wrapper so words slide up from behind an invisible mask (the "cinematic" masked
 * text reveal effect used by premium D2C brands).
 *
 * Words animate in with stagger when the element enters the viewport.
 * Fully accessible: aria-label preserves the raw string for screen readers.
 * Respects prefers-reduced-motion.
 */
export function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  wordDelay = 50,
  threshold = 0.15,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Bail early if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      container.querySelectorAll<HTMLElement>(".tr-word").forEach((el) => {
        el.style.transform = "none";
        el.style.opacity = "1";
      });
      return;
    }

    const words = Array.from(container.querySelectorAll<HTMLElement>(".tr-word"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((word, i) => {
            setTimeout(
              () => {
                word.style.transform = "translateY(0)";
                word.style.opacity = "1";
              },
              delay + i * wordDelay
            );
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [delay, wordDelay, threshold]);

  // Split the string by spaces; preserve non-breaking space between words
  const words = children.split(" ");

  const TagEl = Tag as React.ElementType;
  return (
    <TagEl
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="tr-clip"
          // Each clip hides the word until it slides up
          style={{
            overflow: "hidden",
            display: "inline-block",
            verticalAlign: "bottom",
            // Add a thin right margin instead of a space character so wrapping works
            marginRight: i < words.length - 1 ? "0.28em" : 0,
          }}
        >
          <span
            className="tr-word"
            style={{
              display: "inline-block",
              transform: "translateY(110%)",
              opacity: 0,
              transition: `transform 0.72s cubic-bezier(.16,1,.3,1), opacity 0.72s cubic-bezier(.16,1,.3,1)`,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </TagEl>
  );
}

/**
 * LineReveal — reveals a single line/block (not word-by-word) with a
 * translateY slide-up. Good for subheadings, labels, and paragraphs where
 * word-by-word is too granular.
 */
interface LineRevealProps {
  children: React.ReactNode;
  as?: TagName;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function LineReveal({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  threshold = 0.15,
}: LineRevealProps) {
  const clipRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const clip = clipRef.current;
    const inner = innerRef.current;
    if (!clip || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      inner.style.transform = "none";
      inner.style.opacity = "1";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            inner.style.transform = "translateY(0)";
            inner.style.opacity = "1";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(clip);
    return () => observer.disconnect();
  }, [delay, threshold]);

  // @ts-ignore — dynamic tag
  const TagEl2 = Tag as React.ElementType;
  return (
    <TagEl2 className={className}>
      <span
        ref={clipRef}
        style={{ overflow: "hidden", display: "block" }}
      >
        <span
          ref={innerRef}
          style={{
            display: "block",
            transform: "translateY(100%)",
            opacity: 0,
            transition: `transform 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </span>
      </span>
    </TagEl2>
  );
}
