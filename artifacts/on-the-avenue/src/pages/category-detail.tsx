import { useOtaGetCategory, getOtaGetCategoryQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ChevronLeft, MapPin, Star, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryDetail() {
  const params = useParams();
  const slug = params.slug || "";
  
  const { data: categoryData, isLoading, error } = useOtaGetCategory(slug, {
    query: {
      enabled: !!slug,
      queryKey: getOtaGetCategoryQueryKey(slug)
    }
  });

  if (isLoading) {
    return (
      <div className="animate-pulse pb-24">
        <div className="h-64 w-full bg-white/5"></div>
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 w-full rounded-2xl bg-white/5" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-3xl font-display font-bold mb-4 text-primary">SECTOR OFFLINE</h2>
        <p className="text-muted-foreground mb-8 font-mono text-sm">Requested category data could not be retrieved from the grid.</p>
        <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-4 h-4" /> VIEW ALL SECTORS
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="glass-panel border-b border-white/10 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-[0.03] pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-primary fill-current">
              <polygon points="100,0 0,100 100,100" />
           </svg>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link href="/categories" className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-white transition-colors mb-8 bg-white/5 px-3 py-1.5 rounded border border-white/10" data-testid="link-back-categories">
            <ChevronLeft className="w-3 h-3" /> PARENT SECTOR
          </Link>
          <div className="flex items-end gap-6 mb-6">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none">{categoryData.label}</h1>
            <div className="hidden md:flex flex-col mb-2">
               <span className="text-[10px] font-mono text-muted-foreground">ACTIVE NODES</span>
               <span className="text-2xl font-bold text-primary">{categoryData.businesses.length}</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            {categoryData.intro || `Discover the finest ${categoryData.label.toLowerCase()} on the avenue.`}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {categoryData.businesses.length === 0 ? (
            <div className="text-center py-32 glass-panel rounded-3xl border border-white/10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-bold mb-2">SECTOR EMPTY</h3>
              <p className="text-muted-foreground font-mono text-sm">NO ACTIVE ESTABLISHMENTS FOUND IN THIS CATEGORY.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryData.businesses.map(business => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-col bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] transition-all duration-300"
                  data-testid={`card-business-${business.id}`}
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

                    {business.isFeatured && (
                      <div className="absolute top-3 right-3 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                        FEATURED
                      </div>
                    )}
                    
                    {business.offer && (
                      <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                        <Tag className="w-3 h-3" /> OFFER
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-card">
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{business.name}</h3>
                    {business.tagline && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{business.tagline}</p>}
                    {business.address && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mt-4 pt-4 border-t border-white/5">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="truncate">{business.address}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
