import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, LUXURY_EASE } from "@/lib/motion";

export default function Services() {
  const [activeCat, setActiveCat] = useState(SERVICE_CATEGORIES[0].id);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id && SERVICE_CATEGORIES.find(c => c.id === id)) {
      setActiveCat(id);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      for (const c of SERVICE_CATEGORIES) {
        const el = document.getElementById(c.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 200 && r.bottom > 200) { setActiveCat(c.id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title={<>Services as <em className="not-italic text-[#647962]">rituals.</em></>}
        copy="Every visit begins with consultation and an Aveda Moment of Wellness. The menu is a starting point — your stylist is the rest of the conversation."
        image="/images/service-color.png"
      />

      <div className="sticky top-[72px] z-30 frosted border-y border-[rgba(100,121,98,0.14)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex gap-8 overflow-x-auto py-4 no-scrollbar">
            {SERVICE_CATEGORIES.map(c => (
              <a
                key={c.id} href={`#${c.id}`}
                onClick={() => setActiveCat(c.id)}
                className={`micro-label whitespace-nowrap luxury-ease transition-colors underline-grow ${activeCat === c.id ? "text-[#0b2e27] is-active" : "text-[#647962] hover:text-[#0b2e27]"}`}
              >{c.title}</a>
            ))}
          </div>
        </div>
      </div>

      <section className="pb-32">
        {SERVICE_CATEGORIES.map((c, idx) => (
          <div key={c.id} id={c.id} className={`scroll-mt-[180px] ${idx % 2 === 1 ? "bg-[#f1ecdf]" : ""}`}>
            <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-28">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
                <motion.div variants={fadeUp} className="lg:col-span-4">
                  <p className="micro-label text-[#647962]">Category</p>
                  <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-[#0b2e27] mt-4">{c.title}</h2>
                </motion.div>
                <motion.p variants={fadeUp} className="lg:col-span-8 text-[#50563d] text-lg leading-relaxed">{c.blurb}</motion.p>
              </motion.div>

              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12 space-y-12">
                  {c.groups.map((g, gi) => (
                    <div key={gi}>
                      {g.heading && (
                        <div className="flex items-baseline justify-between border-b border-[rgba(100,121,98,0.25)] pb-4 mb-2">
                          <h3 className="font-display text-2xl text-[#0b2e27]">{g.heading}</h3>
                          {g.subnote && <p className="hidden md:block text-xs text-[#647962] max-w-md text-right">{g.subnote}</p>}
                        </div>
                      )}
                      {g.subnote && <p className="md:hidden text-xs text-[#647962] mb-4">{g.subnote}</p>}
                      <div>
                        {g.items.map((item, ii) => {
                          const key = `${c.id}-${gi}-${ii}`;
                          const isOpen = openItem === key;
                          return (
                            <div key={key} className="border-b border-[rgba(100,121,98,0.18)] last:border-b-0">
                              <button
                                onClick={() => setOpenItem(isOpen ? null : key)}
                                className="w-full flex items-center justify-between gap-6 py-5 text-left luxury-ease hover:bg-[#fbfbf6] -mx-2 px-2 transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#0b2e27] text-base lg:text-lg">{item.name}</p>
                                </div>
                                <span className="text-[#647962] text-sm tracking-wide whitespace-nowrap">{item.price}</span>
                                {item.note && (
                                  <span className="text-[#647962]">
                                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                  </span>
                                )}
                              </button>
                              <AnimatePresence>
                                {isOpen && item.note && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.32, ease: LUXURY_EASE as any }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-6 pr-12 -mt-1 flex items-start gap-6">
                                      <p className="text-sm text-[#50563d] max-w-2xl flex-1">{item.note}</p>
                                      <Link href={`/book?service=${encodeURIComponent(item.name)}`}
                                        className="micro-label text-[#0b2e27] underline-grow whitespace-nowrap">
                                        Book this →
                                      </Link>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {c.footnote && <p className="text-xs text-[#647962] italic">{c.footnote}</p>}

                  <div className="pt-6 flex flex-wrap gap-4">
                    <Link href={`/book?service=${c.id}`} className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-6 py-3.5 hover:bg-[#1c1a0f] luxury-ease transition-colors">
                      <span className="micro-label">Book {c.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
                    </Link>
                    <Link href="/book?service=consultation" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-6 py-3.5 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                      <span className="micro-label">Not Sure? Book a Consult</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
