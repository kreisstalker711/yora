"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { motionConfig } from "@/src/lib/motionConfig";
import { runA11yCheck } from "@/src/lib/a11y";

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const timer = setTimeout(() => {
        runA11yCheck();
      }, 600); // Wait for page transition animation to complete
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionConfig.durationShort, ease: motionConfig.easeOut }}
        className="w-full min-h-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
