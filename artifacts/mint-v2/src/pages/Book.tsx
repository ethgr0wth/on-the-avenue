import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, MapPin, Phone } from "lucide-react";
import { BOOKING_INTENTS, ARTISTS, BRAND } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { LUXURY_EASE } from "@/lib/motion";

type State = {
  intent: string;
  goal: string;
  artistId: string; // "any" or artist id
  timing: string;   // "morning" | "afternoon" | "evening" | "flexible"
  date: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const empty: State = {
  intent: "", goal: "", artistId: "any", timing: "flexible", date: "",
  name: "", email: "", phone: "", notes: "",
};

const STEP_LABELS = ["Intent", "Goal", "Artist", "Timing", "Details", "Review"];

export default function Book() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      ...empty,
      intent: params.get("guest") === "new" ? "new-guest" : (params.get("service") || ""),
      artistId: params.get("artist") || "any",
    };
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function next() { setStep((x) => Math.min(x + 1, STEP_LABELS.length - 1)); }
  function back() { setStep((x) => Math.max(x - 1, 0)); }
  function jumpTo(i: number) { setStep(i); }

  function submit() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1100);
  }

  const canContinue = useMemo(() => {
    switch (step) {
      case 0: return !!s.intent;
      case 1: return s.goal.trim().length > 0;
      case 2: return !!s.artistId;
      case 3: return !!s.timing;
      case 4: return s.name.trim() && s.email.trim() && s.phone.trim();
      default: return true;
    }
  }, [step, s]);

  if (submitted) {
    return (
      <>
        <section className="pt-[140px] lg:pt-[200px] pb-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: LUXURY_EASE as any }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e5e8d6] border border-[#8da48d]"
            >
              <Check className="w-7 h-7 text-[#0b2e27]" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: LUXURY_EASE as any, delay: 0.2 }}
              className="mt-10 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] text-[#0b2e27]"
            >Your refresh request has been received.</motion.h1>
            <p className="mt-7 text-[#50563d] text-lg leading-relaxed">
              A member of our team will reach out within one business day to confirm your appointment, your artist, and a time
              that works beautifully for you. We'll send a quiet email when it's all confirmed.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 text-left">
              <div className="soft-card p-5"><p className="micro-label text-[#647962]">Phone</p><a href={BRAND.phoneTel} className="font-display text-xl text-[#0b2e27] mt-2 inline-flex items-center gap-2"><Phone className="w-4 h-4" />{BRAND.phone}</a></div>
              <div className="soft-card p-5"><p className="micro-label text-[#647962]">Address</p><a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="font-display text-xl text-[#0b2e27] mt-2 inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{BRAND.address}</a></div>
              <div className="soft-card p-5"><p className="micro-label text-[#647962]">Hours</p><p className="text-sm text-[#50563d] mt-2 leading-relaxed">Tue — Fri · 9–8<br/>Sat · 9–6 · Sun · 10–5</p></div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/lookbook" className="inline-flex items-center gap-2 border border-[#647962] text-[#0b2e27] px-6 py-3.5 hover:bg-[#fbfbf6] luxury-ease transition-colors">
                <span className="micro-label">Explore the Lookbook</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="micro-label text-[#647962] underline-grow">← Back to Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={`Step 0${step + 1} of 06`}
        title={<>Begin your <em className="not-italic text-[#647962]">refresh.</em></>}
        copy="A guided request, never a transaction. Tell us what you have in mind — we'll confirm by phone or email within one business day."
      />

      {/* PROGRESS */}
      <div className="border-y border-[rgba(100,121,98,0.18)] sticky top-[72px] z-20 frosted">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4 flex gap-3 lg:gap-6 overflow-x-auto no-scrollbar items-center">
          {STEP_LABELS.map((label, i) => (
            <button key={label} onClick={() => i < step && jumpTo(i)} disabled={i > step}
              className={`flex items-center gap-2 micro-label whitespace-nowrap luxury-ease transition-colors ${i === step ? "text-[#0b2e27]" : i < step ? "text-[#647962] hover:text-[#0b2e27]" : "text-[#c9c8bd]"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${i === step ? "border-[#0b2e27] bg-[#0b2e27] text-[#f1ecdf]" : i < step ? "border-[#647962] bg-[#e5e8d6]" : "border-[#c9c8bd]"}`}>{i < step ? <Check className="w-3 h-3" /> : `0${i + 1}`}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="py-16 lg:py-24 min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-6 lg:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: LUXURY_EASE as any }}
            >
              {step === 0 && (
                <Step title="What brings you in?" subtitle="Choose the closest fit. We'll refine together.">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BOOKING_INTENTS.map(o => (
                      <Tile key={o.id} active={s.intent === o.id} onClick={() => setS({...s, intent: o.id})}>
                        <p className="font-display text-xl text-[#0b2e27]">{o.title}</p>
                        <p className="text-sm text-[#50563d] mt-1">{o.note}</p>
                      </Tile>
                    ))}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step title="Tell us your goal." subtitle="A line or two is plenty. The more honest, the better the result.">
                  <textarea
                    value={s.goal} onChange={(e) => setS({...s, goal: e.target.value})}
                    placeholder="e.g., Soften my color, take a couple inches off, and make my hair feel less like straw."
                    rows={6}
                    className="w-full bg-transparent border border-[rgba(100,121,98,0.3)] focus:border-[#0b2e27] outline-none p-5 text-[#0b2e27] font-display text-xl luxury-ease transition-colors resize-none"
                  />
                </Step>
              )}

              {step === 2 && (
                <Step title="Any artist preference?" subtitle="Choose someone you've been with before, or let us match you to the right artist.">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Tile active={s.artistId === "any"} onClick={() => setS({...s, artistId: "any"})}>
                      <p className="font-display text-lg text-[#0b2e27]">Match Me</p>
                      <p className="text-xs text-[#647962] mt-1">We'll suggest the right artist for your goal.</p>
                    </Tile>
                    {ARTISTS.map(a => (
                      <Tile key={a.id} active={s.artistId === a.id} onClick={() => setS({...s, artistId: a.id})}>
                        <p className="font-display text-lg text-[#0b2e27]">{a.name}</p>
                        <p className="text-xs text-[#647962] mt-1">{a.role}</p>
                      </Tile>
                    ))}
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step title="When works for you?" subtitle="Approximate is fine. We'll confirm the exact time when we call.">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { v: "morning", l: "Mornings", n: "Tue–Sat, before noon" },
                      { v: "afternoon", l: "Afternoons", n: "12–4 most days" },
                      { v: "evening", l: "Evenings", n: "Tue–Fri, after 5" },
                      { v: "flexible", l: "Flexible", n: "Whatever works for the artist" },
                    ].map(t => (
                      <Tile key={t.v} active={s.timing === t.v} onClick={() => setS({...s, timing: t.v})}>
                        <p className="font-display text-lg text-[#0b2e27]">{t.l}</p>
                        <p className="text-xs text-[#647962] mt-1">{t.n}</p>
                      </Tile>
                    ))}
                  </div>
                  <div className="mt-6">
                    <label className="micro-label text-[#647962] block mb-2">Preferred date (optional)</label>
                    <input type="date" value={s.date} onChange={(e) => setS({...s, date: e.target.value})}
                      className="bg-transparent border-b border-[rgba(100,121,98,0.4)] focus:border-[#0b2e27] outline-none py-3 text-[#0b2e27] luxury-ease transition-colors" />
                  </div>
                </Step>
              )}

              {step === 4 && (
                <Step title="Your details." subtitle="So we can confirm your refresh.">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Full name" value={s.name} onChange={(v) => setS({...s, name: v})} />
                    <Input label="Phone" value={s.phone} onChange={(v) => setS({...s, phone: v})} />
                    <Input className="sm:col-span-2" label="Email" type="email" value={s.email} onChange={(v) => setS({...s, email: v})} />
                    <div className="sm:col-span-2">
                      <label className="micro-label text-[#647962] block mb-2">Anything else? (allergies, preferences, parking notes)</label>
                      <textarea value={s.notes} onChange={(e) => setS({...s, notes: e.target.value})} rows={4}
                        className="w-full bg-transparent border-b border-[rgba(100,121,98,0.4)] focus:border-[#0b2e27] outline-none py-3 text-[#0b2e27] luxury-ease transition-colors resize-none" />
                    </div>
                  </div>
                </Step>
              )}

              {step === 5 && (
                <Step title="Review your refresh." subtitle="One last look. Edit anything that doesn't feel right.">
                  <div className="space-y-2 border-t border-[rgba(100,121,98,0.2)]">
                    <ReviewRow label="Intent" value={BOOKING_INTENTS.find(b => b.id === s.intent)?.title || s.intent || "—"} onEdit={() => jumpTo(0)} />
                    <ReviewRow label="Goal" value={s.goal || "—"} onEdit={() => jumpTo(1)} />
                    <ReviewRow label="Artist" value={s.artistId === "any" ? "Match Me" : ARTISTS.find(a => a.id === s.artistId)?.name || "—"} onEdit={() => jumpTo(2)} />
                    <ReviewRow label="Timing" value={`${s.timing}${s.date ? ` · ${s.date}` : ""}`} onEdit={() => jumpTo(3)} />
                    <ReviewRow label="Name" value={s.name || "—"} onEdit={() => jumpTo(4)} />
                    <ReviewRow label="Email" value={s.email || "—"} onEdit={() => jumpTo(4)} />
                    <ReviewRow label="Phone" value={s.phone || "—"} onEdit={() => jumpTo(4)} />
                    {s.notes && <ReviewRow label="Notes" value={s.notes} onEdit={() => jumpTo(4)} />}
                  </div>
                </Step>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between gap-4">
            <button onClick={back} disabled={step === 0}
              className="inline-flex items-center gap-2 micro-label text-[#647962] hover:text-[#0b2e27] disabled:opacity-30 luxury-ease transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < STEP_LABELS.length - 1 ? (
              <button onClick={next} disabled={!canContinue}
                className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] disabled:opacity-40 disabled:cursor-not-allowed luxury-ease transition-colors active:scale-[0.985]">
                <span className="micro-label">Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
              </button>
            ) : (
              <button onClick={submit} disabled={loading}
                className="group inline-flex items-center gap-3 bg-[#0b2e27] text-[#f1ecdf] px-7 py-4 hover:bg-[#1c1a0f] luxury-ease transition-colors active:scale-[0.985]">
                {loading ? (
                  <motion.span className="micro-label" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}>Submitting…</motion.span>
                ) : (
                  <>
                    <span className="micro-label">Submit Request</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] text-[#0b2e27]">{title}</h2>
      {subtitle && <p className="mt-3 text-[#647962] max-w-xl">{subtitle}</p>}
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Tile({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`text-left p-5 border luxury-ease transition-all duration-300 hover:border-[#647962] active:scale-[0.985] ${active ? "border-[#0b2e27] bg-[#e5e8d6] shadow-sm" : "border-[rgba(100,121,98,0.25)] bg-[#fbfbf6]"}`}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", className = "" }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="micro-label text-[#647962] block mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[rgba(100,121,98,0.4)] focus:border-[#0b2e27] outline-none py-3 text-[#0b2e27] luxury-ease transition-colors" />
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-4 py-4 border-b border-[rgba(100,121,98,0.18)] items-baseline">
      <p className="col-span-3 micro-label text-[#647962]">{label}</p>
      <p className="col-span-7 text-[#0b2e27]">{value}</p>
      <button onClick={onEdit} className="col-span-2 text-right micro-label text-[#647962] hover:text-[#0b2e27] underline-grow justify-self-end">Edit</button>
    </div>
  );
}
