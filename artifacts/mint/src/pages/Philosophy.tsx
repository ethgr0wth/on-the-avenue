import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VALUES } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, imageReveal, LUXURY_EASE } from "@/lib/motion";

export default function Philosophy() {
  return (
    <>
      <PageHero
        eyebrow="Philosophy"
        title={<>A breath of <em className="not-italic text-[#647962]">fresh air.</em></>}
        copy="Sometimes, things just feel right. It's the way we felt the first time we stepped into Mint — and the way we hope our guests feel, not just when they arrive, but long after they depart."
        image="/images/philosophy.png"
      />

      {/* STORY */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="micro-label text-[#647962]">Our Story</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] text-[#0b2e27]">
              We love what we do. We love who we do it with — and for.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-[#50563d] text-lg leading-[1.7]">
            <p>
              Maybe you've been coming here for decades. Maybe you've walked past us plenty of times, but never been in
              for a service. Or maybe this is the first you've heard of us. No matter what, there's something new in
              store, and you'll always have a home here.
            </p>
            <p>
              At Mint, we're full of gratitude for every person who walks through our door. We see it as the privilege
              of a lifetime to make our guests feel good about themselves. We're not just a business — we're a family
              in which everyone is welcome, celebrated, and seen for the beautiful person they are.
            </p>
            <p>
              We believe excellence is what you do when nobody's watching. The whole team showing up, every day, with
              the same care for the regular as for the celebrity, the same care for the bang trim as for the full
              transformation. That's the only kind of luxury that lasts.
            </p>
          </div>
        </div>
      </section>

      {/* QUIET QUOTE */}
      <section className="bg-[#e5e8d6] py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <p className="micro-label text-[#647962]">Beauty Without Ego</p>
          <motion.blockquote
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: LUXURY_EASE as any }}
            className="mt-8 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.15] text-[#0b2e27] max-w-5xl mx-auto"
          >
            "Master craft, none of the attitude. We're proud of our work — and even prouder of how guests feel when they leave."
          </motion.blockquote>
        </div>
      </section>

      {/* AVEDA */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-6 aspect-[5/6] overflow-hidden"
            style={{ backgroundImage: "url(/images/service-color.png)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="lg:col-span-6">
            <p className="micro-label text-[#647962]">An Aveda Lifestyle Salon</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-[#0b2e27]">
              Plant-powered care, by intention.
            </h2>
            <p className="mt-7 text-[#50563d] text-lg leading-relaxed">
              Aveda's mission has always been ours: to care for the world we live in. Botanically derived, cruelty-free,
              and environmentally responsible — from the ingredients on our backbar to the products you take home.
            </p>
            <ul className="mt-8 space-y-4 text-[#50563d]">
              <li className="flex gap-4 items-start"><span className="micro-label text-[#647962] mt-1">01</span><span>Plant-derived ingredients responsibly sourced.</span></li>
              <li className="flex gap-4 items-start"><span className="micro-label text-[#647962] mt-1">02</span><span>Cruelty-free, ethically tested, never on animals.</span></li>
              <li className="flex gap-4 items-start"><span className="micro-label text-[#647962] mt-1">03</span><span>100% post-consumer recycled packaging on most products.</span></li>
              <li className="flex gap-4 items-start"><span className="micro-label text-[#647962] mt-1">04</span><span>Wind-powered manufacturing at the source.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="bg-[#0b2e27] text-[#f1ecdf] py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="micro-label text-[#8da48d]">What We Live By</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] max-w-3xl">
            Four quiet values, every day, no exceptions.
          </h2>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-14">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} className="border-t border-[#1c4a3f] pt-8">
                <p className="font-display text-3xl text-[#8da48d]">0{i + 1}</p>
                <h3 className="font-display text-3xl text-[#f1ecdf] mt-4">{v.title}</h3>
                <p className="mt-4 text-[#ccd6c0] leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="py-24 bg-[#f1ecdf]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-4xl mx-auto">
            We'd love to meet you. The door is open.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book" className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
              <span className="micro-label">Book Your Refresh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
            <Link href="/visit" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
              <span className="micro-label">Visit Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
