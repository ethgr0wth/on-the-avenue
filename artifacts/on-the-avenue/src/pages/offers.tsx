import { useOtaListOffers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Tag, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function Offers() {
  const { data: offers, isLoading } = useOtaListOffers();

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="bg-primary/5 border-b border-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Tag className="w-8 h-8 mx-auto text-primary mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">Special Offers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exclusive promotions and perks from establishments along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-none" />)}
            </div>
          ) : offers?.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border/60">
              <h3 className="text-2xl font-serif mb-3">No Current Offers</h3>
              <p className="text-muted-foreground">Check back later for new promotions from our local businesses.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {offers?.map(offer => (
                <div 
                  key={offer.id} 
                  className="bg-card border border-border/60 hover:border-primary/30 transition-colors p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative group shadow-sm hover:shadow-md"
                  data-testid={`card-offer-${offer.id}`}
                >
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-primary/5 text-primary items-center justify-center shrink-0 border border-primary/10 group-hover:scale-110 transition-transform">
                    <Tag className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    {offer.businessName && (
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2 block">
                        From {offer.businessName}
                      </span>
                    )}
                    <h3 className="text-2xl font-serif mb-3 group-hover:text-primary transition-colors">{offer.title}</h3>
                    {offer.description && (
                      <p className="text-muted-foreground leading-relaxed text-sm mb-4">{offer.description}</p>
                    )}
                    
                    {offer.expiresAt && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Valid until {format(new Date(offer.expiresAt), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                  
                  {offer.businessSlug && (
                    <div className="mt-4 md:mt-0 md:ml-6 shrink-0 w-full md:w-auto">
                      <Link 
                        href={`/businesses/${offer.businessSlug}`}
                        className="inline-block w-full text-center md:w-auto px-6 py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                        data-testid={`btn-visit-${offer.businessSlug}`}
                      >
                        Visit Business
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