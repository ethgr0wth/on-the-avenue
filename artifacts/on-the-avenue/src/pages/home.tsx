import { useOtaGetHome } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Tag, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export function Home() {
  const { data, isLoading, error } = useOtaGetHome();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-16 pb-24">
        <div className="h-[60vh] w-full bg-muted"></div>
        <div className="container mx-auto px-4 space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-serif mb-4">Unable to load the avenue</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/images/hero.jpg" 
          alt="The Avenue" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <span className="text-sm tracking-[0.2em] uppercase mb-4 block opacity-90">Welcome to</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">On the Avenue</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10 font-light">
            A curated guide to the businesses, creatives, and events that make our neighborhood extraordinary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/businesses" className="bg-white text-black px-8 py-3 rounded-sm text-sm font-medium hover:bg-white/90 transition-colors uppercase tracking-wider" data-testid="link-hero-discover">
              Discover
            </Link>
            <Link href="/events" className="bg-transparent border border-white text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-white/10 transition-colors uppercase tracking-wider" data-testid="link-hero-events">
              Events
            </Link>
          </div>
        </div>
      </section>

      {/* Spotlight */}
      {data.spotlight && (
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Founding Sponsor</span>
                <h2 className="text-4xl font-serif mb-6">{data.spotlight.name}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {data.spotlight.description || "A cornerstone of the avenue."}
                </p>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-8">
                  {data.spotlight.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{data.spotlight.address}</span>
                    </div>
                  )}
                </div>
                <Link href={`/businesses/${data.spotlight.slug}`} className="inline-flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity uppercase tracking-wider text-sm" data-testid="link-spotlight-visit">
                  Visit Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="order-1 lg:order-2 aspect-[4/3] bg-muted relative overflow-hidden">
                <img 
                  src={data.spotlight.imageUrl || "/images/category-placeholder.jpg"} 
                  alt={data.spotlight.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Explore By</span>
              <h2 className="text-3xl font-serif">Category</h2>
            </div>
            <Link href="/categories" className="hidden sm:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-all-categories">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {data.categories.length === 0 ? (
              <p className="text-muted-foreground italic">Categories forming soon.</p>
            ) : (
              data.categories.map(cat => (
                <Link 
                  key={cat.slug} 
                  href={`/categories/${cat.slug}`}
                  className="px-5 py-2.5 bg-muted/50 hover:bg-muted border border-border/50 rounded-sm text-sm transition-colors flex items-center gap-2"
                  data-testid={`link-category-${cat.slug}`}
                >
                  <span className="font-medium">{cat.label}</span>
                  <span className="text-xs text-muted-foreground opacity-70">{cat.count}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">The Curated Collection</span>
              <h2 className="text-3xl font-serif">Featured Places</h2>
            </div>
            <Link href="/businesses" className="hidden sm:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-all-businesses">
              View Directory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {data.featured.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border">
              <p className="text-muted-foreground font-serif text-lg">The collection is currently empty.</p>
              <Link href="/submit" className="text-primary hover:underline mt-2 inline-block text-sm" data-testid="link-empty-submit">Submit a place</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featured.map((business) => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-col block h-full"
                  data-testid={`card-featured-${business.id}`}
                >
                  <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden relative">
                    <img 
                      src={business.imageUrl || "/images/category-placeholder.jpg"} 
                      alt={business.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {business.offer && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider px-2 py-1">
                        Offer
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">{business.category}</span>
                    <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">{business.name}</h3>
                    {business.tagline && <p className="text-sm text-muted-foreground line-clamp-2">{business.tagline}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Offers & Events */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Offers */}
            <div>
              <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
                <h2 className="text-2xl font-serif">Current Offers</h2>
                <Link href="/offers" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-all-offers">
                  See All
                </Link>
              </div>
              <div className="space-y-6">
                {data.offers.length === 0 ? (
                  <p className="text-muted-foreground italic text-sm">No special offers at the moment.</p>
                ) : (
                  data.offers.slice(0, 3).map(offer => (
                    <div key={offer.id} className="p-6 bg-card border border-border/50 flex flex-col gap-2 relative group hover:border-primary/30 transition-colors">
                      <Tag className="absolute top-6 right-6 w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                      <span className="text-xs uppercase tracking-wider text-primary font-medium">
                        {offer.businessName || "Local Business"}
                      </span>
                      <h4 className="text-lg font-serif">{offer.title}</h4>
                      {offer.description && <p className="text-sm text-muted-foreground leading-relaxed mt-1">{offer.description}</p>}
                      {offer.expiresAt && <p className="text-xs text-muted-foreground mt-3 opacity-70">Valid until {format(new Date(offer.expiresAt), 'MMM d, yyyy')}</p>}
                      {offer.businessSlug && (
                        <Link href={`/businesses/${offer.businessSlug}`} className="absolute inset-0 z-10" data-testid={`link-offer-${offer.id}`}>
                          <span className="sr-only">View business</span>
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
                <h2 className="text-2xl font-serif">Upcoming Events</h2>
                <Link href="/events" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors" data-testid="link-view-all-events">
                  See All
                </Link>
              </div>
              <div className="space-y-6">
                {data.events.length === 0 ? (
                  <p className="text-muted-foreground italic text-sm">The calendar is currently quiet.</p>
                ) : (
                  data.events.slice(0, 3).map(event => (
                    <div key={event.id} className="flex gap-6 group">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-muted shrink-0 text-center">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">{format(new Date(event.eventDate), 'MMM')}</span>
                        <span className="text-xl font-serif leading-none">{format(new Date(event.eventDate), 'd')}</span>
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-lg font-serif group-hover:text-primary transition-colors">{event.title}</h4>
                        {event.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}