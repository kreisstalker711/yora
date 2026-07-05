"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, ReactNode } from "react";
import { motionConfig } from "@/src/lib/motionConfig";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = motionConfig.durationMedium,
  y = 40,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: once });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : y,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0.05 : duration,
            delay,
            ease: motionConfig.easeOut,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
