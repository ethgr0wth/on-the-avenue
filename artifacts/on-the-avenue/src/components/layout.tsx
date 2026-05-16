import { Link } from "wouter";
import { Search, Map, Calendar, Settings, Sun } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Sun className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xl tracking-tight text-foreground">On The Avenue</span>
                <span className="text-xs text-muted-foreground tracking-wide">Winter Park, FL</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/businesses" className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" /> Discover
              </Link>
              <Link href="/categories" className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2">
                <Map className="w-4 h-4" /> Categories
              </Link>
              <Link href="/offers" className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2">
                <TagIcon /> Offers
              </Link>
              <Link href="/events" className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Events
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/submit" className="hidden md:flex px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow">
                Submit Listing
              </Link>
              <Link href="/owner" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted border border-border hover:bg-accent transition-colors text-foreground">
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sun className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-lg">On The Avenue</span>
                <span className="text-muted-foreground text-sm">Winter Park Local Guide</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="/businesses" className="hover:text-primary transition-colors">Directory</Link>
              <Link href="/submit" className="hover:text-primary transition-colors">Submit a Business</Link>
              <Link href="/owner" className="hover:text-primary transition-colors">Owner Portal</Link>
              <Link href="/admin" className="hover:text-primary transition-colors">Admin Access</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>Presented by Mint on the Avenue.</p>
            <p>Park Avenue, Winter Park, FL.</p>
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