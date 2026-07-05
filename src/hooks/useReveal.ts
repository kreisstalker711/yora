"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Attaches an IntersectionObserver to the provided ref and adds the "visible"
 * class when the element enters the viewport.  Works with the .reveal and
 * .reveal-scale CSS utilities defined in globals.css.
 */
export function useReveal<T extends Element = HTMLElement>(
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Observe multiple child elements (e.g. staggered cards) within a container.
 * Adds "visible" to each child matching `childSelector` as they enter view.
 */
export function useRevealChildren<T extends Element = HTMLElement>(
  childSelector: string,
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { threshold = 0.1, rootMargin = "0px 0px -30px 0px", once = true } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.querySelectorAll(childSelector));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [childSelector, threshold, rootMargin, once]);

  return ref;
}
