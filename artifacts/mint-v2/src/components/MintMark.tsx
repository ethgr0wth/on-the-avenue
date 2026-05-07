import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

export function MintMark({ text = "MINT", className = "" }: { text?: string; className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 0.07, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.6, ease: LUXURY_EASE as any }}
      className={`pointer-events-none select-none font-display leading-none tracking-[0.05em] text-[#0b2e27] ${className}`}
    >
      {text}
    </motion.div>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-[0.32em] uppercase ${className}`}>Mint</span>
  );
}
