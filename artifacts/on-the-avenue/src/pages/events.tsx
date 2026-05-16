import { useOtaListEvents } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Events() {
  const { data: events, isLoading } = useOtaListEvents();

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-white/5 glass-panel">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-white">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">EVENT <span className="text-primary neon-text">FEED</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Gatherings, workshops, and celebrations happening along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-6 glass-panel p-4 rounded-3xl">
                  <Skeleton className="w-full md:w-2/5 aspect-[4/3] rounded-2xl bg-white/5" />
                  <div className="flex-1 space-y-4 p-4">
                    <Skeleton className="h-10 w-3/4 bg-white/5" />
                    <Skeleton className="h-6 w-1/2 bg-white/5" />
                    <Skeleton className="h-24 w-full bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-24 glass-panel rounded-3xl border border-white/10">
              <h3 className="text-2xl font-display font-bold mb-3">0 EVENTS FOUND</h3>
              <p className="text-muted-foreground font-mono text-sm">NO GATHERINGS DETECTED ON THE GRID SCHEDULE.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {events?.map(event => {
                const eventDate = parseISO(event.eventDate);
                return (
                  <article 
                    key={event.id} 
                    className="flex flex-col md:flex-row gap-6 md:gap-8 group glass-panel border-white/10 rounded-3xl p-4 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] transition-all duration-300"
                    data-testid={`article-event-${event.id}`}
                  >
                    {/* Date Block & Image */}
                    <div className="w-full md:w-2/5 shrink-0 relative rounded-2xl overflow-hidden">
                      <div className="aspect-[4/3] bg-muted overflow-hidden h-full">
                        <img 
                          src={event.imageUrl || `${import.meta.env.BASE_URL}images/event-placeholder.jpg`} 
                          alt={event.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                      </div>
                      
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-white/10 rounded-xl flex flex-col items-center justify-center w-16 h-16 shadow-xl">
                        <span className="text-[10px] font-mono text-primary font-bold leading-none mb-1">
                          {format(eventDate, 'MMM').toUpperCase()}
                        </span>
                        <span className="text-2xl font-display font-bold leading-none text-white">
                          {format(eventDate, 'd')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-4 pr-4">
                      <div className="flex flex-col gap-2 mb-4 border-b border-white/10 pb-4">
                        <h3 className="text-3xl font-display font-bold leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{format(eventDate, 'EEEE, h:mm a').toUpperCase()}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-xs font-mono text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{event.location.toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {event.description && (
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
