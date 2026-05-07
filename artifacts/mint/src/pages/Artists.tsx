import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { ARTISTS, type Artist } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, LUXURY_EASE } from "@/lib/motion";

const FILTERS = ["All", "Cut", "Color", "Texture", "Men's"];

function classify(a: Artist): string[] {
  const tags = ["All"];
  if (a.specialties.some(s => /cut|cutting|layer|bob/i.test(s))) tags.push("Cut");
  if (a.specialties.some(s => /color|balayage|highlight|blond|grey/i.test(s))) tags.push("Color");
  if (a.specialties.some(s => /curl|texture|smoothing/i.test(s))) tags.push("Texture");
  if (/men/i.test(a.role) || a.specialties.some(s => /beard|men/i.test(s))) tags.push("Men's");
  return tags;
}

export default function Artists() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Artist | null>(null);

  const filtered = useMemo(
    () => ARTISTS.filter(a => filter === "All" || classify(a).includes(filter)),
    [filter]
  );

  return (
    <>
      <PageHero
        eyebrow="Meet the Team"
        title={<>The hands you'll be in. <em className="not-italic text-[#647962]">All eight of them.</em></>}
        copy="Master colorists, precision cutters, texture specialists, and the kind of barbers who turn a quick trim into the best part of your day."
        image="/images/lookbook-2.png"
      />

      {/* FILTERS */}
      <div className="border-y border-[rgba(100,121,98,0.18)] sticky top-[72px] z-20 frosted">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4 flex gap-7 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`micro-label whitespace-nowrap underline-grow luxury-ease transition-colors ${filter === f ? "text-[#0b2e27] is-active" : "text-[#647962] hover:text-[#0b2e27]"}`}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-5%" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map(a => (
              <motion.button key={a.id} id={a.id} variants={fadeUp}
                onClick={() => setActive(a)}
                className="group text-left block">
                <div className="aspect-[4/5] overflow-hidden bg-[#e5e8d6]">
                  <div className="w-full h-full luxury-ease transition-transform duration-[1100ms] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                </div>
                <div className="pt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="micro-label text-[#647962]">{a.role} · {a.level}</p>
                    <h3 className="font-display text-3xl text-[#0b2e27] mt-2">{a.name}</h3>
                    <p className="text-sm text-[#50563d] mt-2">{a.specialties.join(" · ")}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#647962] group-hover:translate-x-1 group-hover:text-[#0b2e27] luxury-ease transition-all flex-shrink-0 mt-2" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: LUXURY_EASE as any }}
            className="fixed inset-0 z-50 bg-[#0b2e27]/60 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.42, ease: LUXURY_EASE as any }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fbfbf6] w-full max-w-5xl max-h-[92vh] overflow-y-auto"
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto md:min-h-[560px]"
                  style={{ backgroundImage: `url(${active.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="p-8 lg:p-12 relative">
                  <button onClick={() => setActive(null)} className="absolute top-5 right-5 text-[#647962] hover:text-[#0b2e27] luxury-ease transition-colors" aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                  <p className="micro-label text-[#647962]">{active.role} · {active.level}</p>
                  <h2 className="font-display text-5xl text-[#0b2e27] mt-3">{active.name}</h2>

                  <div className="mt-8">
                    <p className="micro-label text-[#647962] mb-3">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {active.specialties.map(s => (
                        <span key={s} className="text-xs text-[#0b2e27] border border-[rgba(100,121,98,0.3)] px-3 py-1.5">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-7">
                    <p className="micro-label text-[#647962] mb-3">Best For</p>
                    <p className="text-[#0b2e27] leading-relaxed">{active.bestFor}</p>
                  </div>
                  <div className="mt-7">
                    <p className="micro-label text-[#647962] mb-3">In Their Own Style</p>
                    <p className="text-[#50563d] italic leading-relaxed">"{active.note}"</p>
                  </div>

                  <Link href={`/book?artist=${active.id}`}
                    className="group mt-10 inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
                    <span className="micro-label">Book with {active.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIND MY MATCH */}
      <section className="bg-[#0b2e27] text-[#f1ecdf] py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <p className="micro-label text-[#8da48d]">Not Sure Where to Begin?</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] max-w-3xl mx-auto">
            Tell us about your hair. We'll match you to the right artist.
          </h2>
          <Link href="/book" className="mt-10 group inline-flex items-center gap-3 bg-[#f1ecdf] text-[#0b2e27] px-8 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
            <span className="micro-label">Find My Match</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
