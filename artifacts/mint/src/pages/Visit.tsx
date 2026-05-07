import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Instagram, Check } from "lucide-react";
import { BRAND } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { fadeUp, stagger, LUXURY_EASE } from "@/lib/motion";

export default function Visit() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={<>On the corner of <em className="not-italic text-[#647962]">Park Avenue.</em></>}
        copy="Tucked into the heart of Winter Park, four blocks from Central Park, two minutes from the train. Street parking is plentiful, and our door is open."
      />

      {/* CONTACT GRID */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          {/* INFO */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="lg:col-span-5 space-y-12">
            <motion.div variants={fadeUp}>
              <p className="micro-label text-[#647962]">Address</p>
              <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer"
                className="group block mt-3 font-display text-3xl text-[#0b2e27] underline-grow">
                {BRAND.address}
                <span className="block">{BRAND.city}</span>
              </a>
              <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 micro-label text-[#647962] underline-grow">
                <MapPin className="w-3.5 h-3.5" /> Open in Maps
              </a>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="micro-label text-[#647962]">Phone</p>
              <a href={BRAND.phoneTel} className="group block mt-3 font-display text-3xl text-[#0b2e27] underline-grow">
                {BRAND.phone}
              </a>
              <p className="text-sm text-[#647962] mt-3 inline-flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Tap to call. We answer.</p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="micro-label text-[#647962]">Hours</p>
              <ul className="mt-4 space-y-2 text-[#0b2e27]">
                {BRAND.hoursLines.map(l => <li key={l} className="font-display text-xl">{l}</li>)}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="micro-label text-[#647962]">Arrival</p>
              <p className="mt-3 text-[#50563d] leading-relaxed max-w-md">
                Free parking is available along Park Avenue and in the public lot just behind the salon on New England.
                If it's your first visit, give yourself an extra five minutes — Park Ave is best enjoyed slowly.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 micro-label text-[#0b2e27] underline-grow">
                <Instagram className="w-3.5 h-3.5" /> Follow @mintontheavenue
              </a>
            </motion.div>
          </motion.div>

          {/* MAP / FORM */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="aspect-[16/10] overflow-hidden border border-[rgba(100,121,98,0.18)]">
              <iframe
                title="Map to Mint on the Avenue"
                src="https://www.google.com/maps?q=228+N+Park+Ave+Winter+Park+FL+32789&output=embed"
                className="w-full h-full grayscale-[0.4] saturate-75"
                loading="lazy"
              />
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#fbfbf6] border border-[rgba(100,121,98,0.18)] p-8 lg:p-10">
              <p className="micro-label text-[#647962]">Contact</p>
              <h2 className="mt-3 font-display text-3xl text-[#0b2e27]">Send us a quiet note.</h2>
              <p className="mt-3 text-sm text-[#50563d]">For booking, we recommend the request form so we can see your details. For everything else, here's a contact line.</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: LUXURY_EASE as any }}
                  className="mt-8 p-6 bg-[#e5e8d6] border border-[#8da48d] flex items-start gap-4"
                >
                  <Check className="w-5 h-5 text-[#0b2e27] mt-0.5" />
                  <div>
                    <p className="font-display text-xl text-[#0b2e27]">Note received.</p>
                    <p className="text-sm text-[#50563d] mt-2">A real person will reply within one business day. Thank you for reaching out.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-5">
                  <Field label="Your name" value={form.name} onChange={(v) => setForm({...form, name: v})} required />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({...form, email: v})} required />
                  <Field className="md:col-span-2" label="Phone (optional)" value={form.phone} onChange={(v) => setForm({...form, phone: v})} />
                  <div className="md:col-span-2">
                    <label className="micro-label text-[#647962] block mb-2">How can we help?</label>
                    <textarea
                      value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                      required rows={5}
                      className="w-full bg-transparent border-b border-[rgba(100,121,98,0.4)] focus:border-[#0b2e27] outline-none py-3 text-[#0b2e27] luxury-ease transition-colors resize-none"
                    />
                  </div>
                  <button type="submit"
                    className="md:col-span-2 group justify-self-start inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors active:scale-[0.985]">
                    <span className="micro-label">Send Note</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required, className = "" }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="micro-label text-[#647962] block mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="w-full bg-transparent border-b border-[rgba(100,121,98,0.4)] focus:border-[#0b2e27] outline-none py-3 text-[#0b2e27] luxury-ease transition-colors" />
    </div>
  );
}
