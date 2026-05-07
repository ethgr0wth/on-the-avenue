import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ARTISTS } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { LUXURY_EASE, maskUp } from "@/lib/motion";

export default function Artists() {
  return (
    <>
      <PageHero
        eyebrow="The Team"
        title={<>Masters of <em className="font-display-italic text-accent">their craft.</em></>}
        copy="A tightly curated collective of specialists. Magazine-grade editorial styling, precision cutting, and lived-in color."
      />

      <section className="bg-background pb-32">
        {ARTISTS.map((artist, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={artist.id} className="min-h-screen flex items-center py-24 sticky top-0 bg-background border-t border-border">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 1.5, ease: LUXURY_EASE as any }}
                    className="aspect-[3/4] overflow-hidden"
                  >
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center`}>
                  <div className="overflow-hidden mb-4">
                    <motion.p variants={maskUp} initial="hidden" whileInView="show" className="micro-label text-accent">
                      {artist.role} · {artist.level}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden mb-12">
                    <motion.h2 variants={maskUp} initial="hidden" whileInView="show" className="font-display text-7xl lg:text-9xl tracking-tighter">
                      {artist.name}
                    </motion.h2>
                  </div>
                  
                  <motion.blockquote 
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASE as any }}
                    className="text-2xl lg:text-4xl font-display font-display-italic text-muted-foreground mb-12 border-l-2 border-accent pl-6 py-2"
                  >
                    "{artist.note}"
                  </motion.blockquote>

                  <div className="grid sm:grid-cols-2 gap-8 mb-12">
                    <div>
                      <p className="micro-label mb-4">Specialties</p>
                      <ul className="space-y-2 font-light">
                        {artist.specialties.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="micro-label mb-4">Best For</p>
                      <p className="font-light leading-relaxed text-muted-foreground">{artist.bestFor}</p>
                    </div>
                  </div>

                  <Link href={`/book?artist=${artist.id}`} className="inline-flex items-center gap-4 micro-label self-start border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-all duration-300 group">
                    Book {artist.name} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
