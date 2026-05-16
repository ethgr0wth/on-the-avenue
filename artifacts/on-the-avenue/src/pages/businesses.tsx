import { useOtaListBusinesses, useOtaListCategories } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Search, MapPin, Star, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export function Businesses() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const urlQ = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "";

  const [q, setQ] = useState(urlQ);
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [category, setCategory] = useState(urlCategory);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q);
    }, 400);
    return () => clearTimeout(timer);
  }, [q]);

  // Update URL on filter change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (category) params.set("category", category);
    
    const newSearch = params.toString();
    const currentSearch = window.location.search.replace(/^\?/, "");
    
    if (newSearch !== currentSearch) {
      window.history.replaceState(null, "", `${location}${newSearch ? `?${newSearch}` : ""}`);
    }
  }, [debouncedQ, category, location]);

  const { data: businesses, isLoading: isLoadingBusinesses } = useOtaListBusinesses({ q: debouncedQ, category });
  const { data: categories } = useOtaListCategories();

  return (
    <div className="pb-24 bg-muted/20">
      {/* Filters Section */}
      <section className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the avenue..." 
                className="pl-11 bg-card border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-full h-11 text-sm shadow-sm"
                data-testid="input-search-businesses"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              <button
                onClick={() => setCategory("")}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${!category ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground hover:bg-muted'}`}
                data-testid="btn-filter-all"
              >
                All
              </button>
              {categories?.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${category === cat.slug ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground hover:bg-muted'}`}
                  data-testid={`btn-filter-${cat.slug}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoadingBusinesses ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 flex gap-4 h-48 shadow-sm">
                  <Skeleton className="w-1/3 h-full rounded-xl bg-muted" />
                  <div className="flex-1 space-y-4 py-2">
                    <Skeleton className="h-6 w-3/4 bg-muted" />
                    <Skeleton className="h-4 w-1/2 bg-muted" />
                    <Skeleton className="h-4 w-full bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : businesses?.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground tracking-tight">No results found</h3>
              <p className="text-muted-foreground mb-8">We couldn't find any places matching your search.</p>
              <button 
                onClick={() => { setQ(""); setCategory(""); }}
                className="text-sm font-semibold bg-secondary text-secondary-foreground px-6 py-3 rounded-full hover:bg-secondary/90 transition-colors shadow-sm"
                data-testid="btn-clear-filters"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {businesses?.map(business => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-row h-52 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  data-testid={`card-business-${business.id}`}
                >
                  <div className="w-2/5 shrink-0 bg-muted relative overflow-hidden">
                    <img 
                      src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                      alt={business.name}
                      referrerPolicy="no-referrer" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {business.offer && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-wider">
                        <Tag className="w-3 h-3" /> Offer
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col p-5 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                          {business.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {business.rating != null && (
                          <div className="flex items-center gap-1 text-primary text-sm font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" /> {business.rating.toFixed(1)}
                            <span className="text-muted-foreground font-normal text-xs ml-0.5">({business.reviewCount})</span>
                          </div>
                        )}
                        {business.priceTier && (
                          <span className="text-secondary font-bold text-sm">{business.priceTier}</span>
                        )}
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{business.category}</span>
                      </div>
                      
                      {business.tagline && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{business.tagline}</p>
                      )}
                    </div>

                    {business.address && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
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