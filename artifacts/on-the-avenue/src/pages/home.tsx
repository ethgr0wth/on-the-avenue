import { useOtaGetHome } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Tag, ChevronRight, Star, Map, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export function Home() {
  const { data, isLoading, error } = useOtaGetHome();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-16 pb-24 container mx-auto px-4 mt-8">
        <Skeleton className="h-[60vh] w-full rounded-3xl bg-muted" />
        <div className="space-y-8">
          <Skeleton className="h-12 w-64 bg-muted" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-2xl bg-muted" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-display mb-4">Error loading page</h2>
        <p className="text-muted-foreground text-sm">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative px-4 pt-6 pb-12 lg:px-8">
        <div className="relative h-[70vh] min-h-[500px] w-full rounded-[2rem] overflow-hidden bg-card shadow-sm flex flex-col justify-center items-center text-center p-8 md:p-16">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero.jpg`} 
            alt="The Avenue" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-20 max-w-4xl flex flex-col items-center">
            <span className="text-white/90 text-sm font-medium tracking-widest uppercase mb-4">Welcome to Winter Park</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-6">
              Stroll the Avenue
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-10 leading-relaxed">
              Discover the finest dining, boutique shopping, and local culture on Park Avenue.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/businesses" className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2" data-testid="link-hero-discover">
                <Search className="w-5 h-5" /> Explore the Directory
              </Link>
              <Link href="/categories" className="bg-white text-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2" data-testid="link-hero-events">
                <Map className="w-5 h-5" /> Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 items-center">
            <span className="shrink-0 text-sm font-medium text-muted-foreground mr-2">Quick Browse:</span>
            {data.categories.map(cat => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="shrink-0 px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium hover:border-primary/50 hover:text-primary hover:shadow-sm transition-all flex items-center gap-2"
                data-testid={`link-category-${cat.slug}`}
              >
                <span>{cat.label}</span>
                <span className="text-muted-foreground text-xs bg-muted px-1.5 py-0.5 rounded-full">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      {data.spotlight && (
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-card rounded-[2rem] overflow-hidden border border-border shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 md:p-16 flex flex-col justify-center bg-card">
                  <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 uppercase tracking-wider">
                    <Star className="w-4 h-4" /> Founding Sponsor
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground tracking-tight">{data.spotlight.name}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-muted-foreground text-sm font-medium">{data.spotlight.category}</span>
                    {data.spotlight.rating && (
                      <div className="flex items-center gap-1 text-primary text-sm font-bold">
                        <Star className="w-4 h-4 fill-current" /> {data.spotlight.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                    {data.spotlight.description || "A cornerstone of the avenue."}
                  </p>
                  <Link href={`/businesses/${data.spotlight.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-base" data-testid="link-spotlight-visit">
                    View full listing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="aspect-square lg:aspect-auto relative overflow-hidden">
                  <img 
                    src={data.spotlight.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                    alt={data.spotlight.name}
                    referrerPolicy="no-referrer" className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Businesses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Featured on the Avenue</h2>
              <p className="text-muted-foreground mt-2">Highly rated local favorites.</p>
            </div>
            <Link href="/businesses" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all-businesses">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.featured.map((business) => (
              <Link 
                key={business.id} 
                href={`/businesses/${business.slug}`}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                data-testid={`card-featured-${business.id}`}
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                    alt={business.name}
                    referrerPolicy="no-referrer" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {business.rating != null && (
                      <div className="bg-white/95 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-primary fill-primary" /> 
                        {business.rating.toFixed(1)}
                        <span className="text-muted-foreground font-normal ml-1">({business.reviewCount})</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    {business.priceTier && (
                      <div className="bg-white/95 backdrop-blur-sm text-secondary px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                        {business.priceTier}
                      </div>
                    )}
                  </div>

                  {business.offer && (
                    <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <Tag className="w-3 h-3" /> Special Offer
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 bg-card">
                  <span className="text-xs font-medium text-secondary mb-1.5 block uppercase tracking-wider">{business.category}</span>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">{business.name}</h3>
                  {business.tagline && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{business.tagline}</p>}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/businesses" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              View all listings <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Offers & Events Strip */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Offers */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" /> Active Offers
                </h2>
                <Link href="/offers" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all-offers">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {data.offers.slice(0, 3).map(offer => (
                  <Link key={offer.id} href={`/businesses/${offer.businessSlug}`} className="block p-5 bg-muted/30 border border-border rounded-2xl hover:bg-muted hover:border-primary/30 transition-colors group">
                    <span className="text-xs font-medium text-primary mb-1 block uppercase tracking-wide">{offer.businessName}</span>
                    <h4 className="text-lg font-semibold mb-1 text-foreground">{offer.title}</h4>
                    {offer.description && <p className="text-sm text-muted-foreground line-clamp-1">{offer.description}</p>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Upcoming Events
                </h2>
                <Link href="/events" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all-events">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {data.events.slice(0, 3).map(event => (
                  <div key={event.id} className="flex gap-5 p-4 bg-muted/30 border border-border rounded-2xl group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-white border border-border rounded-xl shrink-0 text-center shadow-sm">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{format(new Date(event.eventDate), 'MMM')}</span>
                      <span className="text-xl font-display font-bold leading-none text-foreground mt-0.5">{format(new Date(event.eventDate), 'd')}</span>
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-base font-semibold text-foreground mb-1">{event.title}</h4>
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
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