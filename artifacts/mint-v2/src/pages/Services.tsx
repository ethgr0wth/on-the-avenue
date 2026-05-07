import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { LUXURY_EASE, fadeUp } from "@/lib/motion";

export default function Services() {
  const [activeCat, setActiveCat] = useState(SERVICE_CATEGORIES[0].id);

  const activeCategoryData = SERVICE_CATEGORIES.find(c => c.id === activeCat);

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title={<>Services as <em className="font-display-italic text-accent">rituals.</em></>}
        copy="Every service is an opportunity for care. We work with an art-book precision, offering transparent pricing and bespoke botanical treatments."
        image={`${import.meta.env.BASE_URL}images/service-design.png`}
      />

      <section className="py-24 lg:py-32 max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
        {/* SIDE TABS */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start hidden lg:block">
          <div className="flex flex-col gap-6">
            {SERVICE_CATEGORIES.map(c => (
              <button 
                key={c.id} 
                onClick={() => setActiveCat(c.id)}
                className={`text-left font-display text-3xl lg:text-4xl transition-all duration-500 ${activeCat === c.id ? "text-foreground translate-x-4" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE SELECT */}
        <div className="lg:hidden relative">
          <select 
            value={activeCat}
            onChange={(e) => setActiveCat(e.target.value)}
            className="w-full appearance-none font-display text-3xl bg-transparent border-b border-border pb-4 rounded-none outline-none"
          >
            {SERVICE_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 top-2 w-6 h-6 text-muted-foreground pointer-events-none" />
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeCategoryData && (
              <motion.div
                key={activeCategoryData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: LUXURY_EASE as any }}
              >
                <div className="mb-16">
                  <p className="text-xl lg:text-2xl font-light leading-relaxed text-muted-foreground">
                    {activeCategoryData.blurb}
                  </p>
                </div>

                <div className="space-y-16">
                  {activeCategoryData.groups.map((g, idx) => (
                    <div key={idx}>
                      {g.heading && (
                        <h3 className="font-display text-3xl mb-8 border-b border-border pb-4">{g.heading}</h3>
                      )}
                      <div className="flex flex-col gap-6">
                        {g.items.map((item, i) => (
                          <div key={i} className="group relative flex flex-col sm:flex-row sm:items-baseline justify-between">
                            <div className="flex items-baseline gap-4 w-full sm:w-auto">
                              <span className="text-lg lg:text-xl font-medium">{item.name}</span>
                              <div className="hidden sm:block flex-grow border-b border-dashed border-border/50 mx-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                              <span className="font-mono text-sm tracking-wider">{item.price}</span>
                            </div>
                            {item.note && (
                              <p className="w-full text-sm text-muted-foreground mt-2 font-light">{item.note}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-24 pt-12 border-t border-border">
                  <Link href={`/book?service=${activeCategoryData.id}`} className="inline-flex items-center gap-4 bg-foreground text-background px-8 py-5 hover:bg-accent transition-colors duration-300 group">
                    <span className="micro-label">Book {activeCategoryData.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
