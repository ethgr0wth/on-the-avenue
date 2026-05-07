import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { LOOKBOOK, LOOKBOOK_FILTERS } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, LUXURY_EASE } from "@/lib/motion";

export default function Lookbook() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => filter === "All" ? LOOKBOOK : LOOKBOOK.filter(l => l.tag === filter), [filter]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? filtered[activeIdx] : null;

  function next() { if (activeIdx !== null) setActiveIdx((activeIdx + 1) % filtered.length); }
  function prev() { if (activeIdx !== null) setActiveIdx((activeIdx - 1 + filtered.length) % filtered.length); }

  return (
    <>
      <PageHero
        eyebrow="Lookbook"
        title={<>An archive of <em className="not-italic text-[#647962]">recent work.</em></>}
        copy="Color, cut, texture, and event hair from the chairs of Mint. Quiet inspiration for your next visit."
        image="/images/lookbook-4.png"
      />

      <div className="border-y border-[rgba(100,121,98,0.18)] sticky top-[72px] z-20 frosted">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4 flex gap-7 overflow-x-auto no-scrollbar">
          {LOOKBOOK_FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`micro-label whitespace-nowrap underline-grow luxury-ease transition-colors ${filter === f ? "text-[#0b2e27] is-active" : "text-[#647962] hover:text-[#0b2e27]"}`}
            >{f}</button>
          ))}
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-5%" }} variants={stagger} key={filter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {filtered.map((l, i) => (
              <motion.button key={l.id} variants={fadeUp} onClick={() => setActiveIdx(i)}
                className={`group relative overflow-hidden text-left ${i % 7 === 0 ? "aspect-[3/5] row-span-2" : "aspect-[3/4]"}`}>
                <div className="absolute inset-0 luxury-ease transition-transform duration-[1100ms] group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${l.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2e27]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 luxury-ease transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 luxury-ease transition-all duration-500">
                  <p className="micro-label text-[#ccd6c0]">{l.tag}</p>
                  <p className="font-display text-lg text-[#fbfbf6] mt-1">{l.title}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="fixed inset-0 z-50 bg-[#0b2e27]/85 backdrop-blur-sm flex items-center justify-center p-4 lg:p-10"
            onClick={() => setActiveIdx(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setActiveIdx(null); }}
              className="absolute top-5 right-5 text-[#f1ecdf] hover:text-[#ccd6c0]" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 lg:left-10 text-[#f1ecdf] hover:text-[#ccd6c0] p-3" aria-label="Previous">
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 lg:right-10 text-[#f1ecdf] hover:text-[#ccd6c0] p-3" aria-label="Next">
              <ChevronRight className="w-7 h-7" />
            </button>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: LUXURY_EASE as any }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <img src={active.image} alt={active.title} className="max-h-[78vh] w-auto object-contain" />
              <div className="mt-5 text-center">
                <p className="micro-label text-[#8da48d]">{active.tag}</p>
                <p className="font-display text-2xl text-[#f1ecdf] mt-2">{active.title}</p>
                <Link href={`/book?inspiration=${active.id}`}
                  className="inline-flex items-center gap-2 mt-5 bg-[#f1ecdf] text-[#0b2e27] px-6 py-3 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                  <span className="micro-label">Book a Similar Look</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
