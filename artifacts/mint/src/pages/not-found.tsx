import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-[88px] pb-20 px-6 relative overflow-hidden">
      <motion.span
        aria-hidden initial={{ opacity: 0, y: 40 }} animate={{ opacity: 0.06, y: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute -bottom-[4vw] left-1/2 -translate-x-1/2 font-display text-[#0b2e27] text-[40vw] leading-[0.78] tracking-[-0.04em] pointer-events-none select-none"
      >404</motion.span>
      <div className="relative text-center">
        <p className="micro-label text-[#647962]">Lost on the avenue</p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-[#0b2e27] max-w-3xl">
          This page took a quiet detour.
        </h1>
        <p className="mt-7 text-[#50563d] text-lg max-w-xl mx-auto">
          Let's get you back somewhere considered. Try the home page, or book your refresh.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
            <span className="micro-label">Back to Home</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
          </Link>
          <Link href="/book" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
            <span className="micro-label">Book Your Refresh</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
