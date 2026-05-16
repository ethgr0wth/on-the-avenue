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
      <div className="animate-pulse pb-24 bg-muted/10">
        <div className="h-48 w-full bg-card border-b border-border shadow-sm"></div>
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 w-full rounded-2xl bg-muted" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <h2 className="text-4xl font-display font-bold mb-4 text-foreground">Category Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">We couldn't load the details for this category.</p>
        <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-semibold bg-secondary text-secondary-foreground px-8 py-4 rounded-full hover:bg-secondary/90 transition-colors shadow-sm">
          <ChevronLeft className="w-4 h-4" /> View all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-muted/10 min-h-screen">
      {/* Header */}
      <section className="bg-card border-b border-border py-12 md:py-16 shadow-sm relative">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6" data-testid="link-back-categories">
            <ChevronLeft className="w-4 h-4" /> All Categories
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground leading-none">{categoryData.label}</h1>
            <div className="flex items-center gap-2 text-muted-foreground bg-muted px-4 py-2 rounded-full w-fit">
               <span className="font-semibold text-foreground">{categoryData.businesses.length}</span>
               <span>Places</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            {categoryData.intro || `Discover the finest ${categoryData.label.toLowerCase()} on the avenue.`}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {categoryData.businesses.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold mb-2">No places yet</h3>
              <p className="text-muted-foreground">There are currently no active listings in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {categoryData.businesses.map(business => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  data-testid={`card-business-${business.id}`}
                >
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <img 
                      src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                      alt={business.name}
                      referrerPolicy="no-referrer" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
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
                      {business.isFeatured && (
                        <div className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    {business.offer && (
                      <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Tag className="w-3 h-3" /> Offer
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-card">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">{business.category}</span>
                    <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors tracking-tight">{business.name}</h3>
                    {business.tagline && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{business.tagline}</p>}
                    {business.address && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
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