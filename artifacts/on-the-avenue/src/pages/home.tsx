import { useOtaGetHome } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Tag, ChevronRight, Star, Map } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export function Home() {
  const { data, isLoading, error } = useOtaGetHome();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-16 pb-24 container mx-auto px-4 mt-8">
        <Skeleton className="h-[60vh] w-full rounded-3xl bg-white/5" />
        <div className="space-y-8">
          <Skeleton className="h-12 w-64 bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-2xl bg-white/5" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-display mb-4">SYSTEM_ERROR: UNABLE TO LOAD GRID</h2>
        <p className="text-muted-foreground text-sm font-mono">Retrying connection...</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative px-4 pt-4 pb-8 lg:px-8">
        <div className="relative h-[75vh] min-h-[600px] w-full rounded-3xl overflow-hidden glass-panel border-white/10 shadow-2xl flex flex-col justify-end p-8 md:p-16">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero.jpg`} 
            alt="The Avenue" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          
          <div className="relative z-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              LIVE DATA STREAM
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 leading-none">
              THE <span className="text-primary neon-text">AVENUE</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mb-10 leading-snug">
              Hyperlocal directory powered by real-time ratings. Find the best spots on the grid.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/businesses" className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-bold hover:bg-primary/90 transition-all neon-glow flex items-center gap-2" data-testid="link-hero-discover">
                <SearchIcon /> Scan Directory
              </Link>
              <Link href="/categories" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2" data-testid="link-hero-events">
                <Map /> View Grid
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight */}
      {data.spotlight && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-panel rounded-3xl overflow-hidden border border-primary/20 p-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
                <div className="p-8 md:p-16 flex flex-col justify-center bg-card/80 backdrop-blur-xl rounded-l-3xl">
                  <div className="inline-flex items-center gap-2 text-primary font-mono text-xs mb-6">
                    <ZapIcon /> FOUNDING SPONSOR
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{data.spotlight.name}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono">{data.spotlight.category}</span>
                    {data.spotlight.rating && (
                      <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" /> {data.spotlight.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {data.spotlight.description || "A cornerstone of the avenue."}
                  </p>
                  <Link href={`/businesses/${data.spotlight.slug}`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors text-sm" data-testid="link-spotlight-visit">
                    INITIALIZE CONNECTION <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="aspect-square lg:aspect-auto relative rounded-r-3xl overflow-hidden border-l border-white/10">
                  <img 
                    src={data.spotlight.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                    alt={data.spotlight.name}
                    referrerPolicy="no-referrer" className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent pointer-events-none hidden lg:block" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Chips */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4">
            {data.categories.map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="shrink-0 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 hover:border-primary/50 transition-all flex items-center gap-3 group"
                data-testid={`link-category-${cat.slug}`}
              >
                <span>{cat.label}</span>
                <span className="bg-white/10 text-muted-foreground px-2 py-0.5 rounded-full text-xs font-mono group-hover:bg-primary/20 group-hover:text-primary transition-colors">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-display font-bold">TOP RATED</h2>
              <p className="text-muted-foreground font-mono text-sm mt-2">ALGORITHM_PICK // HIGH_SIGNAL</p>
            </div>
            <Link href="/businesses" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors" data-testid="link-view-all-businesses">
              VIEW ALL <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.featured.map((business) => (
              <Link 
                key={business.id} 
                href={`/businesses/${business.slug}`}
                className="group flex flex-col bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)] transition-all duration-300"
                data-testid={`card-featured-${business.id}`}
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                    alt={business.name}
                    referrerPolicy="no-referrer" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {business.rating != null && (
                      <div className="bg-background/80 backdrop-blur-md text-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 border border-white/10 shadow-lg">
                        <Star className="w-3 h-3 text-primary fill-primary" /> 
                        {business.rating.toFixed(1)}
                        <span className="text-muted-foreground font-mono ml-1">({business.reviewCount})</span>
                      </div>
                    )}
                    {business.priceTier && (
                      <div className="bg-background/80 backdrop-blur-md text-emerald-400 px-2 py-1 rounded-md text-xs font-bold border border-white/10 shadow-lg w-fit">
                        {business.priceTier}
                      </div>
                    )}
                  </div>

                  {business.offer && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                      <Tag className="w-3 h-3" /> OFFER
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 bg-card">
                  <span className="text-[10px] font-mono text-primary mb-2 block">{business.category}</span>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{business.name}</h3>
                  {business.tagline && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{business.tagline}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offers & Events Strip */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Offers */}
            <div className="glass-panel border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" /> ACTIVE OFFERS
                </h2>
                <Link href="/offers" className="text-xs font-bold text-primary hover:text-white transition-colors" data-testid="link-view-all-offers">
                  ALL OFFERS
                </Link>
              </div>
              <div className="space-y-4">
                {data.offers.slice(0, 3).map(offer => (
                  <Link key={offer.id} href={`/businesses/${offer.businessSlug}`} className="block p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-primary/40 transition-colors group">
                    <span className="text-[10px] font-mono text-primary mb-1 block">{offer.businessName}</span>
                    <h4 className="text-lg font-bold mb-1">{offer.title}</h4>
                    {offer.description && <p className="text-sm text-muted-foreground line-clamp-1">{offer.description}</p>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="glass-panel border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> EVENT FEED
                </h2>
                <Link href="/events" className="text-xs font-bold text-primary hover:text-white transition-colors" data-testid="link-view-all-events">
                  ALL EVENTS
                </Link>
              </div>
              <div className="space-y-4">
                {data.events.slice(0, 3).map(event => (
                  <div key={event.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-white/20 transition-colors">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-card border border-white/10 rounded-xl shrink-0 text-center">
                      <span className="text-[10px] font-mono text-primary">{format(new Date(event.eventDate), 'MMM')}</span>
                      <span className="text-lg font-display font-bold leading-none">{format(new Date(event.eventDate), 'd')}</span>
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-base font-bold leading-tight mb-1">{event.title}</h4>
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function SearchIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}

function ZapIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
