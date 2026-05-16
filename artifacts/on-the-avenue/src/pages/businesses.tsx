import { useOtaListBusinesses, useOtaListCategories } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
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
    <div className="pb-24">
      {/* Header */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">The Directory</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Discover the Avenue</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From morning coffee to evening cocktails, explore the finest establishments our neighborhood has to offer.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border/50 sticky top-20 bg-background/95 backdrop-blur z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search places..." 
                className="pl-10 bg-transparent border-border/60 focus-visible:border-primary rounded-none h-11"
                data-testid="input-search-businesses"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
              <button
                onClick={() => setCategory("")}
                className={`shrink-0 px-4 py-2 text-xs uppercase tracking-wider transition-colors ${!category ? 'text-primary font-medium border-b border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                data-testid="btn-filter-all"
              >
                All
              </button>
              {categories?.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`shrink-0 px-4 py-2 text-xs uppercase tracking-wider transition-colors ${category === cat.slug ? 'text-primary font-medium border-b border-primary' : 'text-muted-foreground hover:text-foreground'}`}
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoadingBusinesses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full aspect-[4/3] rounded-none" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : businesses?.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-border/60 max-w-3xl mx-auto">
              <h3 className="text-2xl font-serif mb-3">No places found</h3>
              <p className="text-muted-foreground mb-8">We couldn't find any establishments matching your criteria.</p>
              <button 
                onClick={() => { setQ(""); setCategory(""); }}
                className="text-sm uppercase tracking-wider border border-border px-6 py-3 hover:bg-muted transition-colors"
                data-testid="btn-clear-filters"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {businesses?.map(business => (
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
                    {business.offer && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-2 py-1 z-10">
                        Offer
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-serif group-hover:text-primary transition-colors leading-tight">{business.name}</h3>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest shrink-0 mt-1">{business.category}</span>
                    </div>
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