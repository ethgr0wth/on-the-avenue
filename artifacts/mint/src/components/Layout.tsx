import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Gift, Instagram, MapPin, ArrowRight } from "lucide-react";
import { BRAND, NAV } from "@/lib/data";
import { Wordmark } from "@/components/MintMark";
import { LUXURY_EASE } from "@/lib/motion";

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [location]);
  return null;
}

export function Header() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: LUXURY_EASE as any }}
        className={`fixed top-0 inset-x-0 z-40 luxury-ease transition-all duration-300 ${
          scrolled ? "frosted border-b border-[rgba(100,121,98,0.12)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Wordmark className="text-[15px] text-[#0b2e27]" />
            <span className="hidden sm:inline micro-label text-[#647962] mt-[2px]">on the Avenue</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`micro-label text-[#0b2e27] underline-grow ${location === n.href ? "is-active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={BRAND.phoneTel} className="text-[#0b2e27] hover:text-[#50563d] luxury-ease transition-colors" aria-label="Call us">
              <Phone className="w-[18px] h-[18px]" />
            </a>
            <Link href="/gift-cards" className="text-[#0b2e27] hover:text-[#50563d] luxury-ease transition-colors" aria-label="Gift cards">
              <Gift className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-[#0b2e27] text-[#f1ecdf] px-5 py-3 hover:bg-[#1c1a0f] luxury-ease transition-colors active:scale-[0.985]"
            >
              <span className="micro-label">Book</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 luxury-ease transition-transform" />
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link href="/book" className="bg-[#0b2e27] text-[#f1ecdf] px-4 py-2.5 micro-label active:scale-[0.985]">Book</Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="text-[#0b2e27] p-2 -mr-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE as any }}
            className="fixed inset-0 z-50 bg-[#fbfbf6]"
          >
            <div className="h-[72px] px-6 flex items-center justify-between border-b border-[rgba(100,121,98,0.12)]">
              <Wordmark className="text-[15px] text-[#0b2e27]" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[#0b2e27] p-2 -mr-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="px-8 pt-12 pb-10 flex flex-col gap-7"
            >
              {NAV.map((n) => (
                <motion.div key={n.href} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: LUXURY_EASE as any } } }}>
                  <Link href={n.href} className="font-display text-4xl text-[#0b2e27] block">{n.label}</Link>
                </motion.div>
              ))}
              <div className="border-t border-[rgba(100,121,98,0.18)] pt-7 mt-2 space-y-4">
                <Link href="/book" className="inline-flex items-center justify-between w-full bg-[#0b2e27] text-[#f1ecdf] px-6 py-4">
                  <span className="micro-label">Book Your Refresh</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={BRAND.phoneTel} className="flex items-center gap-3 text-[#0b2e27]"><Phone className="w-4 h-4" /><span className="text-sm">{BRAND.phone}</span></a>
                <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#0b2e27]"><MapPin className="w-4 h-4" /><span className="text-sm">{BRAND.address}</span></a>
                <Link href="/gift-cards" className="flex items-center gap-3 text-[#0b2e27]"><Gift className="w-4 h-4" /><span className="text-sm">Gift Cards</span></Link>
                <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#0b2e27]"><Instagram className="w-4 h-4" /><span className="text-sm">Instagram</span></a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#0b2e27] text-[#e5e8d6] overflow-hidden">
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-4xl">
          <p className="micro-label text-[#8da48d] mb-6">{BRAND.refresh.split(' ').slice(0, 3).join(' ')}</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-[#f1ecdf]">
            Everyone needs a little <em className="not-italic text-[#ccd6c0]">refresh.</em>
          </h2>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-3 border border-[#8da48d] text-[#f1ecdf] px-6 py-4 hover:bg-[#f1ecdf] hover:text-[#0b2e27] luxury-ease transition-colors group"
          >
            <span className="micro-label">Book Your Refresh</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 luxury-ease transition-transform" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="micro-label text-[#8da48d] mb-4">Visit</p>
            <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="block text-[#f1ecdf] underline-grow text-sm leading-relaxed">{BRAND.address}<br/>{BRAND.city}</a>
            <a href={BRAND.phoneTel} className="block mt-3 text-[#f1ecdf] underline-grow text-sm">{BRAND.phone}</a>
          </div>
          <div>
            <p className="micro-label text-[#8da48d] mb-4">Hours</p>
            {BRAND.hoursLines.map(l => <p key={l} className="text-sm leading-relaxed text-[#ccd6c0]">{l}</p>)}
          </div>
          <div>
            <p className="micro-label text-[#8da48d] mb-4">Services</p>
            {[
              { l: "Hair Design", h: "/services#design" },
              { l: "Hair Color", h: "/services#color" },
              { l: "Hair Condition", h: "/services#condition" },
              { l: "Mint Men", h: "/services#men" },
              { l: "Texture", h: "/services#texture" },
            ].map(s => (
              <Link key={s.h} href={s.h} className="block text-sm text-[#ccd6c0] hover:text-[#f1ecdf] luxury-ease transition-colors">{s.l}</Link>
            ))}
          </div>
          <div>
            <p className="micro-label text-[#8da48d] mb-4">Brand</p>
            {[
              { l: "Philosophy", h: "/philosophy" },
              { l: "Artists", h: "/artists" },
              { l: "Lookbook", h: "/lookbook" },
              { l: "Reviews", h: "/reviews" },
              { l: "Gift Cards", h: "/gift-cards" },
            ].map(s => (
              <Link key={s.h} href={s.h} className="block text-sm text-[#ccd6c0] hover:text-[#f1ecdf] luxury-ease transition-colors">{s.l}</Link>
            ))}
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-[#ccd6c0] hover:text-[#f1ecdf] luxury-ease transition-colors">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1c4a3f] flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-xs text-[#8da48d]">© {new Date().getFullYear()} Mint on the Avenue. An Aveda lifestyle salon.</p>
          <div className="flex gap-6">
            <span className="text-xs text-[#8da48d]">Privacy</span>
            <span className="text-xs text-[#8da48d]">Policies</span>
            <span className="text-xs text-[#8da48d]">Careers</span>
          </div>
        </div>
      </div>

      <div className="relative -mt-2 overflow-hidden h-[18vw] flex items-end justify-center pointer-events-none">
        <span className="font-display text-[#0e352d] text-[28vw] leading-[0.78] tracking-[-0.04em] translate-y-[18%]">MINT</span>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf6]">
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow, title, copy, image,
}: { eyebrow: string; title: React.ReactNode; copy?: string; image?: string }) {
  return (
    <section className="relative pt-[160px] pb-20 lg:pt-[220px] lg:pb-32 overflow-hidden">
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.4, ease: LUXURY_EASE as any }}
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fbfbf6]/40 via-[#fbfbf6]/80 to-[#fbfbf6]" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: LUXURY_EASE as any }}
          className="micro-label text-[#647962]"
        >{eyebrow}</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: LUXURY_EASE as any, delay: 0.12 }}
          className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] text-[#0b2e27] mt-6 max-w-5xl"
        >{title}</motion.h1>
        {copy && (
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE as any, delay: 0.32 }}
            className="mt-8 max-w-2xl text-[#50563d] text-lg leading-relaxed"
          >{copy}</motion.p>
        )}
      </div>
    </section>
  );
}
