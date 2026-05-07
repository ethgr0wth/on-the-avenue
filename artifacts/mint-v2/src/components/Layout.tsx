import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Instagram, MapPin, Phone } from "lucide-react";
import { BRAND, NAV } from "@/lib/data";
import { Wordmark } from "@/components/MintMark";
import { LUXURY_EASE, maskUp, containerStagger } from "@/lib/motion";

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return <div ref={cursorRef} className={`custom-cursor hidden lg:block ${isHover ? 'hover' : ''}`} />;
}

export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [location]);
  return null;
}

export function Header() {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: LUXURY_EASE as any }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
          scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 mix-blend-difference text-white">
            <Wordmark className="h-4 w-auto" />
            <span className="micro-label hidden md:block">on the Avenue</span>
          </Link>

          <div className="flex items-center gap-8 mix-blend-difference text-white">
            <Link href="/book" className="micro-label underline-grow hidden md:block">Book Appointment</Link>
            <button onClick={() => setOpen(true)} className="flex items-center gap-3 group">
              <span className="micro-label">Menu</span>
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 1.2, ease: LUXURY_EASE as any }}
            className="fixed inset-0 z-50 bg-foreground text-background flex flex-col"
          >
            <div className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-background/10">
              <Wordmark className="h-4 w-auto text-background" />
              <button onClick={() => setOpen(false)} className="flex items-center gap-3 group">
                <span className="micro-label">Close</span>
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="flex-1 px-6 lg:px-24 py-12 lg:py-24 flex flex-col justify-center">
                <motion.nav
                  variants={containerStagger}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-4 lg:gap-8"
                >
                  {NAV.map((n, i) => (
                    <div key={n.href} className="overflow-hidden">
                      <motion.div variants={maskUp}>
                        <Link href={n.href} className="font-display text-5xl lg:text-7xl hover:text-accent transition-colors duration-500 inline-block group flex items-center gap-6">
                          <span className="text-sm font-sans tracking-widest text-background/40 group-hover:text-accent mb-4 transition-colors">0{i+1}</span>
                          {n.label}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </motion.nav>
              </div>
              <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-background/10 p-6 lg:p-12 flex flex-col justify-between bg-background/5">
                <div className="space-y-12">
                  <div>
                    <p className="micro-label text-background/50 mb-4">Visit Us</p>
                    <p className="font-display text-2xl">{BRAND.address}</p>
                    <p className="font-display text-xl text-background/70">{BRAND.city}</p>
                  </div>
                  <div>
                    <p className="micro-label text-background/50 mb-4">Contact</p>
                    <a href={BRAND.phoneTel} className="font-display text-2xl block hover:text-accent transition-colors">{BRAND.phone}</a>
                  </div>
                  <div>
                    <Link href="/book" className="inline-flex items-center gap-4 border border-background/20 px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-500">
                      <span className="micro-label">Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-32 pb-12 overflow-hidden relative">
      <div className="mx-auto px-6 lg:px-12 max-w-[1600px] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-8">
              A breath of fresh air <br/><em className="font-display-italic text-accent">for modern hair.</em>
            </h2>
            <Link href="/book" className="inline-flex items-center gap-4 micro-label border-b border-background/30 pb-2 hover:border-accent hover:text-accent transition-colors duration-500">
              Book Your Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <p className="micro-label text-background/40 mb-6">Menu</p>
              <ul className="space-y-4">
                {NAV.map(n => (
                  <li key={n.label}><Link href={n.href} className="text-lg hover:text-accent transition-colors duration-300">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="micro-label text-background/40 mb-6">Social</p>
              <ul className="space-y-4">
                <li><a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-lg hover:text-accent transition-colors duration-300">Instagram</a></li>
                <li><a href="#" className="text-lg hover:text-accent transition-colors duration-300">Facebook</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="micro-label text-background/40 mb-6">Hours</p>
              <ul className="space-y-2">
                {BRAND.hoursLines.map(l => (
                  <li key={l} className="text-sm text-background/70">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-background/10 gap-6">
          <p className="text-sm text-background/50">© {new Date().getFullYear()} Mint on the Avenue.</p>
          <div className="flex items-center gap-8 text-sm text-background/50">
            <Link href="#" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-[10%] left-0 right-0 w-full pointer-events-none opacity-5">
        <h1 className="font-display text-[25vw] leading-none text-center whitespace-nowrap overflow-hidden">MINT</h1>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col grain">
      <Cursor />
      <ScrollToTop />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow, title, copy, image,
}: { eyebrow: string; title: React.ReactNode; copy?: string; image?: string }) {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground text-background">
      {image && (
        <>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: LUXURY_EASE as any }}
            className="absolute inset-0 z-0 object-cover w-full h-full"
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-foreground/60 z-0" />
        </>
      )}
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: LUXURY_EASE as any }}
          className="micro-label text-accent mb-8"
        >{eyebrow}</motion.p>
        <div className="overflow-hidden mb-8 max-w-5xl">
          <motion.h1
            variants={maskUp}
            initial="hidden"
            animate="show"
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]"
          >{title}</motion.h1>
        </div>
        {copy && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: LUXURY_EASE as any, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-background/80 leading-relaxed font-sans font-light"
          >{copy}</motion.p>
        )}
      </div>
    </section>
  );
}
