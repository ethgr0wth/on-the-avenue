import { useOtaListBusinesses, useOtaListCategories } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Search, SlidersHorizontal, MapPin, Star, Tag } from "lucide-react";
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
      {/* Filters Overlay */}
      <section className="sticky top-16 md:top-20 z-40 glass-panel border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="SEARCH_GRID..." 
                className="pl-11 bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-full h-12 font-mono text-sm"
                data-testid="input-search-businesses"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setCategory("")}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${!category ? 'bg-primary text-primary-foreground neon-glow' : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                data-testid="btn-filter-all"
              >
                ALL
              </button>
              {categories?.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${category === cat.slug ? 'bg-primary text-primary-foreground neon-glow' : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                  data-testid={`btn-filter-${cat.slug}`}
                >
                  {cat.label.toUpperCase()}
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-card border border-white/5 rounded-2xl p-4 flex gap-4 h-48">
                  <Skeleton className="w-1/3 h-full rounded-xl bg-white/5" />
                  <div className="flex-1 space-y-4 py-2">
                    <Skeleton className="h-6 w-3/4 bg-white/5" />
                    <Skeleton className="h-4 w-1/2 bg-white/5" />
                    <Skeleton className="h-4 w-full bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : businesses?.length === 0 ? (
            <div className="text-center py-32 glass-panel rounded-3xl border border-white/10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-bold mb-3 text-primary">0 RESULTS FOUND</h3>
              <p className="text-muted-foreground font-mono mb-8">ADJUST SEARCH PARAMETERS</p>
              <button 
                onClick={() => { setQ(""); setCategory(""); }}
                className="text-sm font-bold bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
                data-testid="btn-clear-filters"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {businesses?.map(business => (
                <Link 
                  key={business.id} 
                  href={`/businesses/${business.slug}`}
                  className="group flex flex-row h-48 bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] transition-all duration-300"
                  data-testid={`card-business-${business.id}`}
                >
                  <div className="w-2/5 shrink-0 bg-muted relative overflow-hidden">
                    <img 
                      src={business.imageUrl || `${import.meta.env.BASE_URL}images/category-placeholder.jpg`} 
                      alt={business.name}
                      referrerPolicy="no-referrer" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
                    {business.offer && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(0,240,255,0.5)] flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col p-4 pl-0 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-lg font-display font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {business.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {business.rating != null && (
                          <div className="flex items-center gap-1 text-primary text-xs font-bold bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                            <Star className="w-3 h-3 fill-current" /> {business.rating.toFixed(1)}
                            <span className="text-muted-foreground font-mono font-normal">({business.reviewCount})</span>
                          </div>
                        )}
                        {business.priceTier && (
                          <span className="text-emerald-400 font-bold text-xs">{business.priceTier}</span>
                        )}
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{business.category}</span>
                      </div>
                      
                      {business.tagline && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{business.tagline}</p>
                      )}
                    </div>

                    {business.address && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mt-2 border-t border-white/5 pt-2">
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
