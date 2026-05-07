import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, LUXURY_EASE } from "@/lib/motion";

const STEPS = [
  { n: "01", title: "Arrive a few minutes early", body: "We'll greet you with warm tea or sparkling water. No rush, no script — just a calm room and a friendly face." },
  { n: "02", title: "Aveda Moment of Wellness", body: "A complimentary three-minute neck and shoulder massage with botanical aromatherapy. Choose your scent — it sets the tone." },
  { n: "03", title: "Unhurried consultation", body: "Twenty minutes with your stylist. We talk hair, lifestyle, the photo on your phone, and what you actually want — not what's trending." },
  { n: "04", title: "Your service, by hand", body: "Color, cut, treatment, or all three. Always paired with a hand massage at the bowl, and a finishing style that translates to your at-home routine." },
  { n: "05", title: "A small refresh, on us", body: "A take-home blend tailored to your hair, plus your full first-visit gift applied at checkout." },
];

const FAQ = [
  { q: "How does the $50 New Guest gift work?", a: "Mention 'New Guest' when you request your appointment, and we'll apply $50 toward your first service. Valid with select artists — we'll match you to one when you book." },
  { q: "How long should I plan to be in the salon?", a: "A first cut and consultation runs 60–90 minutes. New color services run 2–3 hours depending on your hair. Your stylist will confirm the exact estimate when you book." },
  { q: "Will my Aveda Moment of Wellness add to my appointment time?", a: "No — it's woven into your service, not added on top. It's our way of saying welcome." },
  { q: "I'm not sure what I want. Can I just come in and talk?", a: "Yes. Book a complimentary consultation. Twenty unhurried minutes with one of our master artists, no commitment, no pressure." },
  { q: "Do you have a cancellation policy?", a: "We hold your appointment with care and ask for at least 24 hours notice if you need to reschedule. We understand life happens — please call us at 407.645.2264." },
  { q: "Do you welcome children?", a: "We do. We have dedicated children's pricing under 10 and stylists who genuinely love working with younger guests." },
];

export default function NewGuests() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Your First Visit"
        title={<>Your first refresh, <em className="not-italic text-[#647962]">beautifully guided.</em></>}
        copy="Maybe you've walked past us plenty of times, but have never been in for a service. Or maybe this is the first you've heard of us. Either way, here's exactly what to expect."
        image={`${import.meta.env.BASE_URL}images/lookbook-1.png`}
      />

      {/* OFFER BANNER */}
      <section className="bg-[#0b2e27] text-[#f1ecdf]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="micro-label text-[#8da48d]">$50 Welcome Gift</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              Because we'd love to meet you. $50 toward your first service at Mint.
            </h2>
            <p className="mt-6 text-[#ccd6c0] leading-relaxed max-w-xl">
              Change is beautiful. If you're ready to try something new, we make it easy — valid with select artists.
              Mention "New Guest" when you request your appointment.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link href="/book?guest=new" className="group inline-flex items-center gap-3 bg-[#f1ecdf] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
              <span className="micro-label">Claim Your Refresh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-4">
              <p className="micro-label text-[#647962]">What to expect</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] text-[#0b2e27]">
                A first visit that feels considered, never rushed.
              </h2>
            </div>
            <p className="lg:col-span-8 text-[#50563d] text-lg leading-relaxed self-end">
              We've spent decades on Park Avenue learning what makes a first visit feel right. Here's the rhythm of yours.
            </p>
          </div>

          <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="space-y-2">
            {STEPS.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="grid grid-cols-12 gap-6 lg:gap-12 py-8 border-b border-[rgba(100,121,98,0.18)]">
                <span className="col-span-2 lg:col-span-1 font-display text-3xl text-[#647962]">{s.n}</span>
                <div className="col-span-10 lg:col-span-11 grid lg:grid-cols-12 gap-6">
                  <h3 className="lg:col-span-4 font-display text-2xl text-[#0b2e27]">{s.title}</h3>
                  <p className="lg:col-span-8 text-[#50563d] leading-relaxed">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* STYLIST MATCHING */}
      <section className="bg-[#e5e8d6] py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="micro-label text-[#647962]">The Right Match</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-[#0b2e27]">
              Find the artist whose hands fit your hair.
            </h2>
            <p className="mt-7 text-[#50563d] text-lg leading-relaxed">
              A small, intentional team — each with a distinct specialty. Tell us about your hair and what you're hoping for —
              we'll suggest the right fit, or pair you with the next available artist who'll do beautifully by you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/artists" className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-6 py-3.5 hover:bg-[#1c1a0f] luxury-ease transition-colors">
                <span className="micro-label">Meet the Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
              </Link>
              <Link href="/book" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-6 py-3.5 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                <span className="micro-label">Let Us Match You</span>
              </Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: LUXURY_EASE as any }}
            className="aspect-[4/5] overflow-hidden"
            style={{ backgroundImage: "url(/images/lookbook-3.png)", backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="micro-label text-[#647962]">FAQ</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] text-[#0b2e27]">
              Quietly answered, before you even ask.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-[rgba(100,121,98,0.2)]">
                  <button onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left">
                    <span className="font-display text-xl text-[#0b2e27]">{f.q}</span>
                    {isOpen ? <Minus className="w-5 h-5 text-[#647962] flex-shrink-0" /> : <Plus className="w-5 h-5 text-[#647962] flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: LUXURY_EASE as any }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[#50563d] leading-relaxed max-w-3xl">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#f1ecdf]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#0b2e27] max-w-3xl mx-auto">
            Ready when you are.
          </h2>
          <Link href="/book?guest=new" className="mt-10 group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-8 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
            <span className="micro-label">Begin Your New Guest Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
