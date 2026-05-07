import type { Variants, Transition } from "framer-motion";

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SOFT_EASE = [0.65, 0, 0.35, 1] as const;

export const baseT: Transition = { duration: 0.9, ease: LUXURY_EASE as any };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: baseT },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: LUXURY_EASE as any } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: LUXURY_EASE as any } },
};

export const lineReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: LUXURY_EASE as any, delay: 0.1 + i * 0.08 },
  }),
};
