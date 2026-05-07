import type { Variants, Transition } from "framer-motion";

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SLOW_EASE = [0.16, 1, 0.3, 1] as const;

export const baseT: Transition = { duration: 1.2, ease: LUXURY_EASE as any };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: baseT },
};

export const maskUp: Variants = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1.4, ease: LUXURY_EASE as any } },
};

export const lineReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.2, ease: LUXURY_EASE as any, delay: i * 0.1 },
  }),
};

export const staggeredLetters = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: LUXURY_EASE as any }
  }
};

export const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05, filter: "blur(4px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.6, ease: SLOW_EASE as any } },
};

export const scrollMarquee: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear",
      },
    },
  },
};

export const stagger = containerStagger;
