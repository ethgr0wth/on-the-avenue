import { Link } from "wouter";
import { Search, Map, Calendar, Settings, Zap } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:neon-glow transition-all duration-300">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight">On The Avenue</span>
                <span className="text-[10px] uppercase tracking-widest text-primary font-medium">v3.2035</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
              <Link href="/businesses" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-primary transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" /> Discover
              </Link>
              <Link href="/categories" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-primary transition-colors flex items-center gap-2">
                <Map className="w-4 h-4" /> Categories
              </Link>
              <Link href="/offers" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-primary transition-colors flex items-center gap-2">
                <TagIcon /> Offers
              </Link>
              <Link href="/events" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-primary transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Events
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/submit" className="hidden md:flex px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:neon-glow">
                + Add Place
              </Link>
              <Link href="/owner" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-card/50 mt-auto">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                <Zap className="w-3 h-3 fill-current" />
              </div>
              <span className="font-display font-bold">On The Avenue</span>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/businesses" className="hover:text-primary transition-colors">Directory</Link>
              <Link href="/submit" className="hover:text-primary transition-colors">Submit</Link>
              <Link href="/owner" className="hover:text-primary transition-colors">Owners</Link>
              <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50">
            <p>DATA // YELP_DNA_INTEGRATION // PARK_AVE_GRID</p>
            <p className="flex items-center gap-1">SYS.STATUS: <span className="text-primary">ONLINE</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
  );
}
