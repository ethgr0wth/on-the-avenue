import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex flex-col">
              <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity">
                On the Avenue
              </Link>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">
                Presented by Mint
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/businesses" className="hover:text-primary transition-colors">Discover</Link>
              <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
              <Link href="/offers" className="hover:text-primary transition-colors">Offers</Link>
              <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
              <Link href="/submit" className="hover:text-primary transition-colors">Submit</Link>
              <Link href="/owner" className="hover:text-primary transition-colors">Owners</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative">
        {children}
      </main>

      <footer className="border-t border-border mt-auto bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="font-serif text-xl mb-4 block">On the Avenue</Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                A curated neighborhood guide to the businesses, offers, and events surrounding Mint on the Avenue.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm tracking-wide uppercase">Explore</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/businesses" className="hover:text-primary transition-colors block">Discover</Link></li>
                <li><Link href="/offers" className="hover:text-primary transition-colors block">Offers</Link></li>
                <li><Link href="/events" className="hover:text-primary transition-colors block">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm tracking-wide uppercase">Community</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/submit" className="hover:text-primary transition-colors block">Submit a Listing</Link></li>
                <li><Link href="/owner" className="hover:text-primary transition-colors block">Owner Portal</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} On the Avenue. All rights reserved.</p>
            <p>Curated with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
