import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger } from "@/lib/motion";

const TOPICS = ["All", "Color", "Cut", "Experience", "Mariza", "Sonia", "Marisa", "Ashley", "Maribel"];

function matches(text: string, topic: string) {
  if (topic === "All") return true;
  if (topic === "Color") return /color|highlights|blonde|balayage/i.test(text);
  if (topic === "Cut") return /cut|haircut|trim/i.test(text);
  if (topic === "Experience") return /service|relax|massage|welcome|professional|comfort/i.test(text);
  return new RegExp(`\\b${topic}\\b`, "i").test(text);
}

export default function Reviews() {
  const [topic, setTopic] = useState("All");
  const filtered = useMemo(() => REVIEWS.filter(r => matches(r.text + " " + r.name, topic)), [topic]);

  const featured = REVIEWS[0];

  return (
    <>
      <PageHero
        eyebrow="What They're Saying"
        title={<>It's never <em className="not-italic text-[#647962]">"just"</em> hair.</>}
        copy="And you wouldn't trust yours with just anyone. Here's what our guests — many of whom have been coming for fifteen years and counting — have to say."
        image="/images/lookbook-3.png"
      />

      {/* FEATURED */}
      <section className="bg-[#e5e8d6] py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
          <p className="micro-label text-[#647962]">Featured</p>
          <motion.blockquote
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1 }}
            className="mt-8 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] text-[#0b2e27] max-w-5xl"
          >
            "{featured.text}"
          </motion.blockquote>
          <p className="mt-8 micro-label text-[#0b2e27]">— {featured.name}, {featured.date}</p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="border-b border-[rgba(100,121,98,0.18)] sticky top-[72px] z-20 frosted">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4 flex gap-6 overflow-x-auto no-scrollbar">
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)}
              className={`micro-label whitespace-nowrap underline-grow luxury-ease transition-colors ${topic === t ? "text-[#0b2e27] is-active" : "text-[#647962] hover:text-[#0b2e27]"}`}
            >{t}</button>
          ))}
        </div>
      </div>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-5%" }} variants={stagger} key={topic}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {filtered.map((r, i) => (
              <motion.figure key={r.name + i} variants={fadeUp} className="break-inside-avoid mb-6 soft-card p-7">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-[#647962]">★</span>)}
                </div>
                <blockquote className="font-display text-xl text-[#0b2e27] leading-[1.4]">"{r.text}"</blockquote>
                <figcaption className="mt-5 flex items-baseline justify-between">
                  <p className="micro-label text-[#0b2e27]">{r.name}</p>
                  <p className="text-xs text-[#647962]">{r.date}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[#647962] py-20">No reviews match that filter — try another.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#0b2e27] text-[#f1ecdf] text-center">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] max-w-3xl mx-auto">
            We'd love to be your next favorite review.
          </h2>
          <Link href="/book" className="mt-10 group inline-flex items-center gap-3 bg-[#f1ecdf] text-[#0b2e27] px-8 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
            <span className="micro-label">Book Your Visit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
