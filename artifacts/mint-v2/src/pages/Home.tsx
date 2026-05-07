import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND, ARTISTS, LOOKBOOK } from "@/lib/data";
import { fadeUp, LUXURY_EASE, scrollMarquee } from "@/lib/motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const textScrollRef = useRef(null);
  const { scrollYProgress: textProgress } = useScroll({ target: textScrollRef, offset: ["start end", "end start"] });
  const xLeft = useTransform(textProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div ref={containerRef}>
      {/* CINEMATIC HERO: Horizontal Scrub Frames */}
      <section className="relative h-screen w-full overflow-hidden bg-foreground">
        <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] z-0 flex">
          <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url(/images/hero.png)" }} />
          <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url(/images/atmosphere.png)" }} />
        </motion.div>
        <div className="absolute inset-0 bg-foreground/30 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-6">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: LUXURY_EASE as any }} className="micro-label text-accent mb-6">
              Winter Park, Florida
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.4, ease: LUXURY_EASE as any }} className="font-display text-[clamp(4rem,10vw,12rem)] text-background leading-[0.85] tracking-tight">
              MINT
            </motion.h1>
          </div>
        </div>
      </section>

      {/* SCROLL DRIVEN MASSIVE TYPE */}
      <section ref={textScrollRef} className="py-32 lg:py-64 overflow-hidden flex items-center justify-center bg-background">
        <motion.div style={{ x: xLeft }} className="whitespace-nowrap">
          <h2 className="font-display text-[15vw] leading-none text-foreground/10 tracking-tighter">
            PLANT POWERED • LUXURY • COUTURE
          </h2>
        </motion.div>
      </section>

      {/* EDITORIAL MANIFESTO */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-end">
          <div className="lg:col-span-5">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: LUXURY_EASE as any }}
              src={`${import.meta.env.BASE_URL}images/lookbook-3.png`} 
              alt="Editorial cut" 
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="lg:col-span-7 pb-12">
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="micro-label text-accent mb-8">Our Philosophy</motion.p>
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="font-display text-4xl lg:text-6xl leading-[1.1] mb-12 text-foreground">
              A space defined by <em className="font-display-italic text-accent">restraint</em>, <br/>craft, and quiet luxury.
            </motion.h3>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-xl font-light leading-relaxed max-w-2xl text-muted-foreground mb-12">
              Every detail is a deliberate choice. We believe in the power of less, executed perfectly. Our botanical approach to color and cutting is designed to enhance, not mask, your natural texture.
            </motion.p>
            <Link href="/philosophy" className="inline-flex items-center gap-4 micro-label border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-all duration-300">
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ARTISTS PREVIEW - ASYMMETRIC */}
      <section className="py-24 lg:py-48 bg-foreground text-background">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-24">
            <div>
              <p className="micro-label text-accent mb-6">The Artists</p>
              <h2 className="font-display text-5xl lg:text-7xl">Masters of <em className="font-display-italic">craft.</em></h2>
            </div>
            <Link href="/artists" className="hidden md:inline-flex items-center gap-4 micro-label border-b border-background/30 pb-2 hover:border-accent hover:text-accent transition-colors">
              View All Artists <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-32">
            {ARTISTS.slice(0, 2).map((artist, i) => (
              <motion.div 
                key={artist.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: LUXURY_EASE as any }}
                className={i === 1 ? "md:mt-32" : ""}
              >
                <div className="aspect-[3/4] overflow-hidden mb-8 group cursor-pointer">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                </div>
                <p className="micro-label text-accent mb-2">{artist.role}</p>
                <h3 className="font-display text-4xl mb-4">{artist.name}</h3>
                <p className="text-background/70 font-light leading-relaxed">{artist.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* LOOKBOOK MARQUEE */}
      <section className="py-32 overflow-hidden bg-background">
        <div className="flex mb-16 px-6 lg:px-12 max-w-[1600px] mx-auto justify-between items-end">
          <h2 className="font-display text-5xl lg:text-6xl">Archive</h2>
          <Link href="/lookbook" className="micro-label border-b border-foreground pb-2 hover:text-accent transition-colors">Explore Gallery</Link>
        </div>
        <div className="relative w-full flex">
          <motion.div variants={scrollMarquee} animate="animate" className="flex gap-8 px-4 whitespace-nowrap">
            {[...LOOKBOOK, ...LOOKBOOK].map((l, i) => (
              <div key={i} className="w-[300px] lg:w-[400px] shrink-0">
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img src={l.image} alt={l.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="micro-label text-muted-foreground">{l.tag}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
