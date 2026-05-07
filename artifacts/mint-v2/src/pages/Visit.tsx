import { motion } from "framer-motion";
import { BRAND } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { maskUp, LUXURY_EASE } from "@/lib/motion";

export default function Visit() {
  return (
    <>
      <PageHero
        eyebrow="Location"
        title={<>Find your <em className="font-display-italic text-accent">way here.</em></>}
        copy="Tucked into Winter Park, just steps from Central Park. A sanctuary designed for quiet luxury."
      />

      <section className="py-24 lg:py-48 max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-24">
        
        {/* OVERSIZE TYPOGRAPHY */}
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden mb-8">
            <motion.h2 variants={maskUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="font-display text-6xl lg:text-[8rem] leading-[0.9] tracking-tighter text-foreground">
              {BRAND.address.split(' ')[0]} <br/> 
              <em className="font-display-italic text-accent">{BRAND.address.split(' ').slice(1).join(' ')}</em>
            </motion.h2>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }} className="mt-12 space-y-12">
            <div>
              <p className="micro-label text-muted-foreground mb-4">City</p>
              <p className="text-2xl font-light">{BRAND.city}</p>
            </div>
            
            <div>
              <p className="micro-label text-muted-foreground mb-4">Phone</p>
              <a href={BRAND.phoneTel} className="text-4xl font-display hover:text-accent transition-colors">{BRAND.phone}</a>
            </div>

            <div>
              <p className="micro-label text-muted-foreground mb-6">Hours</p>
              <div className="space-y-4 border-l border-border pl-6">
                {BRAND.hoursLines.map(line => {
                  const [day, time] = line.split('·');
                  return (
                    <div key={line} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 max-w-sm">
                      <span className="font-medium">{day.trim()}</span>
                      <span className="font-mono text-sm text-muted-foreground">{time?.trim()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FULL BLEED MAP MOMENT */}
        <div className="relative h-[60vh] lg:h-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 1.5, ease: LUXURY_EASE as any }}
            className="absolute inset-0 bg-muted overflow-hidden"
          >
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=228+N+Park+Ave+Winter+Park+FL+32789&output=embed"
              className="w-full h-full grayscale-[0.8] contrast-50 opacity-80 mix-blend-multiply dark:mix-blend-screen dark:invert"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-border/50" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
