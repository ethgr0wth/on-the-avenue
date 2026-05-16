import { useOtaGetBusiness, getOtaGetBusinessQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { MapPin, Phone, Globe, Clock, Tag, ChevronLeft } from "lucide-react";
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
        <div className="h-[50vh] w-full bg-muted"></div>
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-card p-8 border border-border shadow-sm max-w-4xl">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-4xl font-serif mb-6">Not Found</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          The establishment you're looking for doesn't seem to be on the avenue, or it may have moved.
        </p>
        <Link href="/businesses" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider border border-border px-8 py-3 hover:bg-muted transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-background">
      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[400px] w-full bg-muted border-b border-border/30">
        <img 
          src={business.imageUrl || "/images/category-placeholder.jpg"} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/businesses" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10" data-testid="link-back">
            <ChevronLeft className="w-3 h-3" /> The Directory
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 -mt-20">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-card p-8 md:p-12 border border-border/60 shadow-xl shadow-black/5 relative">
              {business.isFoundingSponsor && (
                <div className="absolute -top-4 left-8 bg-foreground text-background text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-sm">
                  Founding Sponsor
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link href={`/categories/${business.category.toLowerCase()}`} className="text-[11px] uppercase tracking-widest text-primary font-medium hover:underline">
                  {business.category}
                </Link>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-[1.1] tracking-tight">{business.name}</h1>
              
              {business.tagline && (
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10 border-l-2 border-primary/30 pl-6 py-1">
                  {business.tagline}
                </p>
              )}
              
              {business.description && (
                <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 leading-loose">
                  <p className="whitespace-pre-line">{business.description}</p>
                </div>
              )}
            </div>

            {/* Offer Card */}
            {business.offer && (
              <div className="mt-12 bg-primary/5 border border-primary/20 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Tag className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Current Offer
                  </span>
                  <p className="text-xl font-serif text-foreground mb-0">{business.offer}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-10">
              
              {/* Details Card */}
              <div className="space-y-8 p-8 border border-border/50 bg-card/50">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/40">Details</h3>
                
                {business.address && (
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Location</span>
                      <span className="text-sm leading-relaxed">{business.address}</span>
                    </div>
                  </div>
                )}
                
                {business.hours && (
                  <div className="flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Hours</span>
                      <span className="text-sm leading-relaxed whitespace-pre-line">{business.hours}</span>
                    </div>
                  </div>
                )}
                
                {business.phone && (
                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Contact</span>
                      <a href={`tel:${business.phone}`} className="text-sm hover:text-primary transition-colors">{business.phone}</a>
                    </div>
                  </div>
                )}
                
                {business.website && (
                  <div className="flex gap-4 items-start">
                    <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="overflow-hidden">
                      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Online</span>
                      <a 
                        href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm hover:text-primary transition-colors truncate block"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-3">
                {business.website && (
                  <a 
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-foreground text-background py-4 text-center text-xs uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors"
                    data-testid="btn-visit-website"
                  >
                    Visit Website
                  </a>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}