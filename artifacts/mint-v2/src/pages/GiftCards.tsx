import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, imageReveal, LUXURY_EASE } from "@/lib/motion";
import { BRAND } from "@/lib/data";

const AMOUNTS = [50, 100, 150, 200, 250, 500];

export default function GiftCards() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Gift Cards"
        title={<>Give a little <em className="not-italic text-[#647962]">refresh.</em></>}
        copy="A Mint gift card is a quiet, generous gesture — for a friend, a partner, a parent, or yourself, after the week you've had."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <motion.div variants={imageReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-6 aspect-[4/5] overflow-hidden relative bg-[#0b2e27]">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14 text-[#f1ecdf]">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#8da48d]" />
                <span className="micro-label text-[#8da48d]">Mint Gift Card</span>
              </div>
              <div>
                <p className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-[#f1ecdf]">${amount}</p>
                <p className="mt-3 micro-label text-[#8da48d]">Refresh, on you.</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="font-display text-2xl tracking-[0.32em] text-[#f1ecdf]">MINT</p>
                <p className="text-xs text-[#8da48d]">{BRAND.address}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="lg:col-span-6">
            <motion.p variants={fadeUp} className="micro-label text-[#647962]">Choose an amount</motion.p>
            <motion.div variants={fadeUp} className="mt-5 grid grid-cols-3 gap-3">
              {AMOUNTS.map(a => (
                <button key={a} onClick={() => { setAmount(a); setCustom(""); }}
                  className={`py-5 border luxury-ease transition-all duration-300 active:scale-[0.985] ${amount === a && !custom ? "border-[#0b2e27] bg-[#e5e8d6]" : "border-[rgba(100,121,98,0.25)] bg-[#fbfbf6] hover:border-[#647962]"}`}>
                  <span className="font-display text-2xl text-[#0b2e27]">${a}</span>
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <label className="micro-label text-[#647962] block mb-2">Or a custom amount</label>
              <div className="flex items-center border-b border-[rgba(100,121,98,0.4)] focus-within:border-[#0b2e27] luxury-ease transition-colors">
                <span className="text-[#647962] text-xl pr-2">$</span>
                <input type="number" min={25} value={custom}
                  onChange={(e) => { setCustom(e.target.value); const n = Number(e.target.value); if (!isNaN(n) && n > 0) setAmount(n); }}
                  className="bg-transparent outline-none py-3 text-[#0b2e27] flex-1 font-display text-2xl" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 space-y-4 text-[#50563d] leading-relaxed">
              <p>Available as a printed card mailed to your home, or a digital card delivered to a friend by email.</p>
              <p>Redeemable for any service or take-home product. Never expires.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a href={BRAND.phoneTel}
                className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors">
                <span className="micro-label">Call to Purchase · ${amount}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
              </a>
              <Link href="/visit"
                className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-7 py-4 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                <span className="micro-label">Buy In Person</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#f1ecdf] text-center">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: LUXURY_EASE as any }}
            className="font-display text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.15] text-[#0b2e27] max-w-3xl mx-auto"
          >
            "Filling your own cup takes many forms. A small refresh is one of them."
          </motion.p>
        </div>
      </section>
    </>
  );
}
