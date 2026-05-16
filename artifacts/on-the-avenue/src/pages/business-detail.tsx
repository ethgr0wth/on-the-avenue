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
        <Skeleton className="h-[60vh] w-full rounded-b-3xl bg-white/5" />
        <div className="container mx-auto px-4 lg:px-8 -mt-32 relative z-10">
          <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-5xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6 bg-white/5" />
            <Skeleton className="h-16 w-3/4 mb-8 bg-white/5" />
            <Skeleton className="h-4 w-full mb-3 bg-white/5" />
            <Skeleton className="h-4 w-5/6 bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-4xl font-display mb-6 text-primary">ERROR 404</h2>
        <p className="text-muted-foreground mb-10 font-mono text-sm">
          ENTITY NOT FOUND IN CURRENT GRID SECTOR.
        </p>
        <Link href="/businesses" className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-4 h-4" /> RETURN TO DIRECTORY
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-background">
      {/* Hero Image */}
      <div className="relative h-[65vh] min-h-[500px] w-full bg-muted rounded-b-3xl overflow-hidden">
        <img 
          src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
          alt={business.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/businesses" className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10" data-testid="link-back">
            <ChevronLeft className="w-4 h-4" /> DIRECTORY
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 -mt-40">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative mb-8">
              {business.isFoundingSponsor && (
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  FOUNDING SPONSOR
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Link href={`/categories/${business.category.toLowerCase()}`} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-primary hover:bg-white/10 transition-colors">
                  {business.category}
                </Link>
                
                {/* Rating Block */}
                {business.rating != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-8 h-8 text-primary fill-primary neon-text" />
                      <span className="text-4xl font-display font-bold text-white">{business.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">Avg Score</span>
                      <span className="text-xs font-bold text-white">{business.reviewCount} Scans</span>
                    </div>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight tracking-tighter">{business.name}</h1>
              
              {business.tagline && (
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mb-10 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl">
                  {business.tagline}
                </p>
              )}
              
              {business.description && (
                <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed font-sans">
                  <p className="whitespace-pre-line text-lg">{business.description}</p>
                </div>
              )}
            </div>

            {/* Offer Card */}
            {business.offer && (
              <div className="bg-primary/10 border border-primary/30 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-colors" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-primary mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> ACTIVE PERK
                  </span>
                  <p className="text-2xl font-display font-bold text-white mb-0">{business.offer}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Actions */}
              <div className="flex gap-4">
                {business.website && (
                  <a 
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-2xl text-center text-sm font-bold hover:bg-primary/90 transition-all neon-glow flex items-center justify-center gap-2"
                    data-testid="btn-visit-website"
                  >
                    <Globe className="w-4 h-4" /> VISIT SITE
                  </a>
                )}
                <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 hover:text-primary transition-colors shrink-0">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Details Card */}
              <div className="glass-panel p-6 rounded-3xl space-y-6">
                <h3 className="text-[10px] font-mono text-muted-foreground uppercase pb-4 border-b border-white/10">Location Data</h3>
                
                {business.address && (
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="pt-1">
                      <span className="block text-[10px] font-mono text-muted-foreground mb-1">COORDINATES</span>
                      <span className="text-sm font-medium">{business.address}</span>
                    </div>
                  </div>
                )}
                
                {business.hours && (
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="pt-1">
                      <span className="block text-[10px] font-mono text-muted-foreground mb-1">OPERATING HOURS</span>
                      <span className="text-sm font-medium whitespace-pre-line">{business.hours}</span>
                    </div>
                  </div>
                )}
                
                {business.phone && (
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="pt-1">
                      <span className="block text-[10px] font-mono text-muted-foreground mb-1">COMM LINK</span>
                      <a href={`tel:${business.phone}`} className="text-sm font-medium hover:text-primary transition-colors">{business.phone}</a>
                    </div>
                  </div>
                )}

                {business.priceTier && (
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors text-emerald-400 font-bold">
                      $
                    </div>
                    <div className="pt-1">
                      <span className="block text-[10px] font-mono text-muted-foreground mb-1">PRICE INDEX</span>
                      <span className="text-sm font-bold text-emerald-400">{business.priceTier}</span>
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
