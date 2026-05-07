import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Scissors, Droplet } from "lucide-react";
import { BRAND, ARTISTS, REVIEWS, LOOKBOOK, SERVICE_CATEGORIES } from "@/lib/data";
import { fadeUp, stagger, imageReveal, lineReveal, LUXURY_EASE } from "@/lib/motion";

const SERVICE_TILES = [
  { id: "design", title: "Hair Design", note: "Precision cuts, considered.", icon: Scissors, image: "/images/service-design.png" },
  { id: "color", title: "Hair Color", note: "Dimensional, lived-in tone.", icon: Sparkles, image: "/images/service-color.png" },
  { id: "condition", title: "Hair Condition", note: "Botanical repair rituals.", icon: Droplet, image: "/images/lookbook-2.png" },
  { id: "texture", title: "Texture", note: "Smoothing & curl care.", icon: Leaf, image: "/images/lookbook-5.png" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] pt-[88px] overflow-hidden">
        <motion.div
          variants={imageReveal} initial="hidden" animate="show"
          className="absolute inset-0 -z-20"
          style={{ backgroundImage: "url(images/hero.png)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fbfbf6]/92 via-[#fbfbf6]/50 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#fbfbf6] via-[#fbfbf6]/20 to-[#fbfbf6]/30" />

        {/* Oversized faint MINT layer */}
        <motion.div
          aria-hidden initial={{ opacity: 0, y: 60 }} animate={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: LUXURY_EASE as any }}
          className="absolute -bottom-[6vw] left-0 right-0 pointer-events-none select-none flex justify-center"
        >
          <span className="font-display text-[#0b2e27] leading-[0.78] tracking-[-0.04em] text-[34vw]">MINT</span>
        </motion.div>

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 pt-24 lg:pt-32 pb-40">
          <motion.p custom={0} initial="hidden" animate="show" variants={lineReveal} className="micro-label text-[#647962]">
            An Aveda lifestyle salon · Winter Park
          </motion.p>
          <motion.h1
            custom={1} initial="hidden" animate="show" variants={lineReveal}
            className="mt-7 font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.95] text-[#0b2e27] max-w-[16ch]"
          >
            A breath of fresh air <em className="not-italic text-[#50563d]">for modern hair.</em>
          </motion.h1>
          <motion.p
            custom={2} initial="hidden" animate="show" variants={lineReveal}
            className="mt-8 max-w-xl text-[#50563d] text-lg leading-relaxed"
          >
            Plant-powered rituals, expert color, and calm luxury care designed to leave you refreshed —
            quietly, completely, and on your own schedule.
          </motion.p>
          <motion.div
            custom={3} initial="hidden" animate="show" variants={lineReveal}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors active:scale-[0.985]"
            >
              <span className="micro-label">Book Your Refresh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-7 py-4 hover:bg-[#e5e8d6] luxury-ease transition-colors"
            >
              <span className="micro-label">Explore Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.0 }}
            className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 max-w-xs"
          >
            <div className="h-px w-12 bg-[#647962] mb-4" />
            <p className="micro-label text-[#647962] mb-2">Welcome offer</p>
            <p className="font-display text-3xl text-[#0b2e27] leading-tight">$50 toward your first visit at Mint.</p>
            <Link href="/new-guests" className="micro-label text-[#0b2e27] underline-grow mt-4 inline-block">New Guest Ritual →</Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#647962]">
          <span className="micro-label">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="w-px h-10 bg-[#647962]" />
        </div>
      </section>

      {/* SIGNATURE PROMISE */}
      <section className="relative bg-[#f1ecdf] overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 py-28 lg:py-44">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }} variants={stagger}>
            <motion.p variants={fadeUp} className="micro-label text-[#647962]">Our Promise</motion.p>
            <motion.h2 variants={fadeUp} className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.0] text-[#0b2e27] max-w-[18ch]">
              Everyone needs a little <em className="not-italic text-[#647962]">refresh.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-10 max-w-2xl text-[#50563d] text-lg leading-relaxed">
              We're not just a business — we're a family in which everyone is welcome, celebrated, and seen for the
              beautiful person they are. Whether you've been coming here for decades or this is the first you've heard
              of us, you'll always have a home here.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="micro-label text-[#647962]">Services as Rituals</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-2xl">
                Every visit begins with consultation and a moment of wellness.
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 micro-label text-[#0b2e27] underline-grow self-start lg:self-end">
              View Full Menu <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {SERVICE_TILES.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.id} variants={fadeUp}>
                  <Link href={`/services#${s.id}`} className="group block relative overflow-hidden border border-[rgba(100,121,98,0.18)] bg-[#fbfbf6]">
                    <div className="aspect-[3/4] overflow-hidden">
                      <div
                        className="w-full h-full luxury-ease transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                    </div>
                    <div className="p-6 lg:p-7">
                      <Icon className="w-4 h-4 text-[#647962] mb-4" />
                      <h3 className="font-display text-2xl text-[#0b2e27]">{s.title}</h3>
                      <p className="mt-2 text-sm text-[#50563d]">{s.note}</p>
                      <span className="mt-5 inline-flex items-center gap-1 micro-label text-[#0b2e27]">
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 luxury-ease transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.slice(4).map((c) => (
              <Link key={c.id} href={`/services#${c.id}`} className="group flex items-center justify-between border-b border-[rgba(100,121,98,0.2)] pb-4 hover:border-[#0b2e27] luxury-ease transition-colors">
                <span className="font-display text-xl text-[#0b2e27]">{c.title}</span>
                <ArrowRight className="w-4 h-4 text-[#647962] group-hover:translate-x-1 group-hover:text-[#0b2e27] luxury-ease transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW GUEST RITUAL */}
      <section className="relative bg-[#0b2e27] text-[#f1ecdf] py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-[#1c4a3f] blur-3xl opacity-40" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }} variants={stagger}>
            <motion.p variants={fadeUp} className="micro-label text-[#8da48d]">Your First Visit</motion.p>
            <motion.h2 variants={fadeUp} className="mt-6 font-display text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.02] text-[#f1ecdf]">
              A welcome offer worth $50, toward your very first refresh.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-8 text-[#ccd6c0] text-lg leading-relaxed max-w-xl">
              Change is beautiful. If you're ready to try something new, we make it easy with a $50 gift toward your first
              service at Mint, valid with select artists. Twenty unhurried minutes of consultation, a Moment of Wellness,
              and the right artist for your hair.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link href="/new-guests" className="group inline-flex items-center gap-3 bg-[#f1ecdf] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                <span className="micro-label">Begin New Guest Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
              </Link>
              <Link href="/book?guest=new" className="inline-flex items-center gap-2 border border-[#8da48d] px-7 py-4 hover:bg-[#1c4a3f] luxury-ease transition-colors">
                <span className="micro-label">Claim Offer</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
            className="relative aspect-[4/5] overflow-hidden border border-[#1c4a3f]"
            style={{ backgroundImage: "url(/images/lookbook-1.png)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </div>
      </section>

      {/* FIND YOUR ARTIST */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="micro-label text-[#647962]">Find Your Artist</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-2xl">
                Meet the people whose hands you'll be in.
              </h2>
            </div>
            <Link href="/artists" className="inline-flex items-center gap-2 micro-label text-[#0b2e27] underline-grow self-start lg:self-end">
              Find My Match <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {ARTISTS.slice(0, 4).map(a => (
              <motion.div key={a.id} variants={fadeUp}>
                <Link href={`/artists#${a.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-[#e5e8d6]">
                    <div
                      className="w-full h-full luxury-ease transition-transform duration-[1000ms] group-hover:scale-[1.05]"
                      style={{ backgroundImage: `url(${a.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                  </div>
                  <div className="pt-5">
                    <p className="micro-label text-[#647962]">{a.role}</p>
                    <h3 className="font-display text-2xl text-[#0b2e27] mt-2">{a.name}</h3>
                    <p className="text-sm text-[#50563d] mt-1">{a.specialties.slice(0, 2).join(" · ")}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOOKBOOK PREVIEW */}
      <section className="relative bg-[#e5e8d6] py-28 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="micro-label text-[#647962]">Lookbook</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-2xl">
                A quiet archive of recent work.
              </h2>
            </div>
            <Link href="/lookbook" className="inline-flex items-center gap-2 micro-label text-[#0b2e27] underline-grow self-start lg:self-end">
              Enter the Lookbook <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-5%" }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {LOOKBOOK.slice(0, 8).map((l, i) => (
              <motion.div key={l.id} variants={fadeUp}
                className={`overflow-hidden ${i === 0 || i === 5 ? "row-span-2 aspect-[3/5]" : "aspect-[3/4]"}`}>
                <div
                  className="w-full h-full luxury-ease transition-transform duration-[1000ms] hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${l.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GUEST STORIES */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="micro-label text-[#647962]">Guest Stories</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-3xl">
            Fifteen years on the avenue. The reviews speak for themselves.
          </h2>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <motion.figure key={i} variants={fadeUp} className="soft-card p-8">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#647962] text-sm">★</span>
                  ))}
                </div>
                <blockquote className="font-display text-[1.4rem] leading-[1.4] text-[#0b2e27]">"{r.text.length > 200 ? r.text.slice(0, 200) + "…" : r.text}"</blockquote>
                <figcaption className="mt-6">
                  <p className="micro-label text-[#0b2e27]">{r.name}</p>
                  <p className="text-xs text-[#647962] mt-1">{r.date}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <div className="mt-12">
            <Link href="/reviews" className="inline-flex items-center gap-2 micro-label text-[#0b2e27] underline-grow">
              Read All Reviews <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* AVEDA / ECOLOGY */}
      <section className="relative bg-[#fbfbf6] py-28 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-7 aspect-[5/4] overflow-hidden order-2 lg:order-1"
            style={{ backgroundImage: "url(/images/philosophy.png)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="lg:col-span-5 order-1 lg:order-2">
            <motion.p variants={fadeUp} className="micro-label text-[#647962]">An Aveda Lifestyle Salon</motion.p>
            <motion.h2 variants={fadeUp} className="mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-[#0b2e27]">
              Plant-powered, by intention. Considered, by hand.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-7 text-[#50563d] text-lg leading-relaxed">
              We're proud to be an Aveda lifestyle salon — which means our craft is built on plant-derived ingredients,
              responsible sourcing, and care for the environment we live and work in.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Link href="/philosophy" className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-6 py-3.5 hover:bg-[#1c1a0f] luxury-ease transition-colors">
                <span className="micro-label">Our Philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VISIT / CLOSE */}
      <section className="relative py-28 lg:py-40 bg-[#f1ecdf]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <p className="micro-label text-[#647962]">Find Us</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.0] text-[#0b2e27] max-w-4xl mx-auto">
            We're on the corner of <em className="not-italic text-[#647962]">Park Avenue</em>, with the door open.
          </h2>
          <p className="mt-8 text-[#50563d] text-lg max-w-xl mx-auto">{BRAND.address} · {BRAND.city}</p>
          <a href={BRAND.phoneTel} className="block mt-2 text-[#50563d]">{BRAND.phone}</a>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/visit" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
              <span className="micro-label">Plan Your Visit</span>
            </Link>
            <Link href="/book" className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
              <span className="micro-label">Book Your Refresh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
