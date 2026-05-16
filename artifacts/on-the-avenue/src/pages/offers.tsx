import { useOtaListOffers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Tag, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function Offers() {
  const { data: offers, isLoading } = useOtaListOffers();

  return (
    <div className="pb-32 bg-muted/10 min-h-screen">
      {/* Header */}
      <section className="bg-card border-b border-border py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
            <Tag className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-foreground">Active Offers</h1>
          <p className="text-lg text-muted-foreground font-light">
            Exclusive promotions and perks from establishments along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-2xl bg-muted shadow-sm" />)}
            </div>
          ) : offers?.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm">
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground tracking-tight">No active offers</h3>
              <p className="text-muted-foreground">Check back later for new promotions and specials.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {offers?.map(offer => (
                <div 
                  key={offer.id} 
                  className="bg-card border border-border hover:shadow-md transition-all duration-300 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center relative group"
                  data-testid={`card-offer-${offer.id}`}
                >
                  <div className="hidden md:flex w-20 h-20 rounded-full bg-primary/10 text-primary items-center justify-center shrink-0 border border-primary/20 shadow-sm">
                    <Tag className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 w-full">
                    {offer.businessName && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                          {offer.businessName}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-display font-bold mb-3 text-foreground tracking-tight">{offer.title}</h3>
                    {offer.description && (
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">{offer.description}</p>
                    )}
                    
                    {offer.expiresAt && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Valid until {format(new Date(offer.expiresAt), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                  
                  {offer.businessSlug && (
                    <div className="mt-4 md:mt-0 shrink-0 w-full md:w-auto">
                      <Link 
                        href={`/businesses/${offer.businessSlug}`}
                        className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                        data-testid={`btn-visit-${offer.businessSlug}`}
                      >
                        Visit Listing <ChevronRight className="w-4 h-4" />
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