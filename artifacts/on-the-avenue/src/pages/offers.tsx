import { useOtaListOffers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Tag, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function Offers() {
  const { data: offers, isLoading } = useOtaListOffers();

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-white/5 bg-primary/5">
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 text-primary shadow-[0_0_30px_-5px_rgba(0,240,255,0.3)]">
            <Tag className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">ACTIVE <span className="text-primary neon-text">OFFERS</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Exclusive promotions and perks from establishments along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-3xl bg-white/5" />)}
            </div>
          ) : offers?.length === 0 ? (
            <div className="text-center py-24 glass-panel rounded-3xl border border-white/10">
              <h3 className="text-2xl font-display font-bold mb-3">0 OFFERS FOUND</h3>
              <p className="text-muted-foreground font-mono text-sm">NO ACTIVE PROMOTIONS DETECTED ON THE GRID.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {offers?.map(offer => (
                <div 
                  key={offer.id} 
                  className="bg-card border border-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] transition-all duration-300 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center relative group"
                  data-testid={`card-offer-${offer.id}`}
                >
                  <div className="hidden md:flex w-20 h-20 rounded-2xl bg-primary/10 text-primary items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
                    <Tag className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 w-full">
                    {offer.businessName && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                          SOURCE: <span className="text-white font-bold">{offer.businessName}</span>
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{offer.title}</h3>
                    {offer.description && (
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">{offer.description}</p>
                    )}
                    
                    {offer.expiresAt && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded w-fit">
                        <Calendar className="w-3 h-3" />
                        <span>EXPIRES: {format(new Date(offer.expiresAt), 'yyyy-MM-dd')}</span>
                      </div>
                    )}
                  </div>
                  
                  {offer.businessSlug && (
                    <div className="mt-4 md:mt-0 shrink-0 w-full md:w-auto">
                      <Link 
                        href={`/businesses/${offer.businessSlug}`}
                        className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-xs font-bold hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all group/btn"
                        data-testid={`btn-visit-${offer.businessSlug}`}
                      >
                        ACCESS NODE <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
