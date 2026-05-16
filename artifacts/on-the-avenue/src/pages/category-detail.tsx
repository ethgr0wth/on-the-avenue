import { useOtaGetCategory, getOtaGetCategoryQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ChevronLeft, MapPin } from "lucide-react";
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
        <div className="h-64 w-full bg-muted"></div>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-80 w-full rounded-none" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-3xl font-serif mb-4">Category Not Found</h2>
        <p className="text-muted-foreground mb-8">This collection doesn't exist or has been removed.</p>
        <Link href="/categories" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider border border-border px-6 py-3 hover:bg-muted transition-colors">
          <ChevronLeft className="w-4 h-4" /> All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-muted/30 border-b border-border py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           {/* Abstract decorative element */}
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-primary fill-current">
              <polygon points="100,0 0,100 100,100" />
           </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/categories" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-categories">
            <ChevronLeft className="w-3 h-3" /> Categories
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">{categoryData.label}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed border-l border-primary pl-6 py-1">
            {categoryData.intro || `Discover the finest ${categoryData.label.toLowerCase()} on the avenue.`}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-4">
            <span className="text-sm font-medium">{categoryData.businesses.length} Establishments</span>
          </div>

          {categoryData.businesses.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border/60">
              <h3 className="text-2xl font-serif mb-2">Empty Collection</h3>
              <p className="text-muted-foreground text-sm">There are no establishments in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {categoryData.businesses.map(business => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-col h-full"
                  data-testid={`card-business-${business.id}`}
                >
                  <div className="aspect-[4/3] bg-muted mb-5 overflow-hidden relative border border-border/20">
                    <img 
                      src={business.imageUrl || "/images/category-placeholder.jpg"} 
                      alt={business.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {business.isFeatured && (
                      <div className="absolute top-3 right-3 bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1 z-10">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors leading-tight">{business.name}</h3>
                    {business.tagline && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{business.tagline}</p>
                    )}
                    {business.address && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/30">
                        <MapPin className="w-3 h-3 text-primary/70" />
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