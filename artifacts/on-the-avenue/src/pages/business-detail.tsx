import { useOtaGetBusiness, getOtaGetBusinessQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { MapPin, Phone, Globe, Clock, Tag, ChevronLeft, Star, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function BusinessDetail() {
  const params = useParams();
  const slug = params.slug || "";
  
  const { data: business, isLoading, error } = useOtaGetBusiness(slug, { 
    query: { 
      enabled: !!slug, 
      queryKey: getOtaGetBusinessQueryKey(slug) 
    } 
  });

  if (isLoading) {
    return (
      <div className="animate-pulse pb-24">
        <Skeleton className="h-[50vh] w-full bg-muted" />
        <div className="container mx-auto px-4 lg:px-8 -mt-24 relative z-10">
          <div className="bg-card p-8 md:p-12 rounded-3xl max-w-5xl mx-auto shadow-sm border border-border">
            <Skeleton className="h-8 w-32 mb-6 bg-muted" />
            <Skeleton className="h-16 w-3/4 mb-8 bg-muted" />
            <Skeleton className="h-4 w-full mb-3 bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-4xl font-display mb-4 text-foreground tracking-tight">Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          We couldn't find the listing you're looking for.
        </p>
        <Link href="/businesses" className="inline-flex items-center gap-2 text-sm font-semibold bg-secondary text-secondary-foreground px-8 py-4 rounded-full hover:bg-secondary/90 transition-colors shadow-sm">
          <ChevronLeft className="w-4 h-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-background">
      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[400px] w-full bg-muted">
        <img 
          src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
          alt={business.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/businesses" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-white/90 backdrop-blur shadow-sm hover:bg-white px-5 py-2.5 rounded-full transition-colors" data-testid="link-back">
            <ChevronLeft className="w-4 h-4" /> Directory
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 -mt-24 md:-mt-32">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-card p-8 md:p-12 rounded-[2rem] border border-border shadow-md relative mb-8">
              {business.isFoundingSponsor && (
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  Founding Sponsor
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Link href={`/categories/${business.category.toLowerCase()}`} className="px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors uppercase tracking-wide">
                  {business.category}
                </Link>
                
                {/* Rating Block */}
                {business.rating != null && (
                  <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 text-primary fill-primary" />
                      <span className="text-xl font-bold text-foreground">{business.rating.toFixed(1)}</span>
                    </div>
                    <div className="w-px h-6 bg-border"></div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {business.reviewCount} Reviews
                    </div>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight tracking-tight text-foreground">{business.name}</h1>
              
              {business.tagline && (
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mb-10">
                  {business.tagline}
                </p>
              )}
              
              {business.description && (
                <div className="prose max-w-none text-foreground leading-relaxed font-sans mt-8 pt-8 border-t border-border">
                  <p className="whitespace-pre-line text-lg">{business.description}</p>
                </div>
              )}
            </div>

            {/* Offer Card */}
            {business.offer && (
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="text-sm font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-widest">
                    <Tag className="w-4 h-4" /> Active Offer
                  </span>
                  <p className="text-2xl font-display font-bold text-foreground mb-0">{business.offer}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Actions */}
              <div className="flex gap-4">
                {business.website && (
                  <a 
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-2xl text-center text-base font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                    data-testid="btn-visit-website"
                  >
                    <Globe className="w-5 h-5" /> Visit Website
                  </a>
                )}
                <button className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-foreground hover:bg-muted transition-colors shrink-0 shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Details Card */}
              <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground pb-4 border-b border-border tracking-wide">Information</h3>
                
                {business.address && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="pt-2">
                      <span className="text-base text-foreground font-medium">{business.address}</span>
                    </div>
                  </div>
                )}
                
                {business.hours && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="pt-2">
                      <span className="text-base text-foreground font-medium whitespace-pre-line">{business.hours}</span>
                    </div>
                  </div>
                )}
                
                {business.phone && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="pt-2">
                      <a href={`tel:${business.phone}`} className="text-base text-foreground font-medium hover:text-primary transition-colors">{business.phone}</a>
                    </div>
                  </div>
                )}

                {business.priceTier && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary font-bold">
                      $
                    </div>
                    <div className="pt-2">
                      <span className="text-base font-bold text-secondary">{business.priceTier}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}