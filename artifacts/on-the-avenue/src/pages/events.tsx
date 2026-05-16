import { useOtaListEvents } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Events() {
  const { data: events, isLoading } = useOtaListEvents();

  return (
    <div className="pb-32 bg-muted/10 min-h-screen">
      {/* Header */}
      <section className="bg-card border-b border-border py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-foreground">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground font-light">
            Gatherings, workshops, and celebrations happening along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-6 bg-card p-4 rounded-3xl shadow-sm border border-border">
                  <Skeleton className="w-full md:w-2/5 aspect-[4/3] rounded-2xl bg-muted" />
                  <div className="flex-1 space-y-4 p-4">
                    <Skeleton className="h-10 w-3/4 bg-muted" />
                    <Skeleton className="h-6 w-1/2 bg-muted" />
                    <Skeleton className="h-24 w-full bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm">
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground">No upcoming events</h3>
              <p className="text-muted-foreground">Check back later for new gatherings and activities.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {events?.map(event => {
                const eventDate = parseISO(event.eventDate);
                return (
                  <article 
                    key={event.id} 
                    className="flex flex-col md:flex-row gap-6 md:gap-8 group bg-card border border-border rounded-3xl p-4 hover:shadow-md transition-all duration-300"
                    data-testid={`article-event-${event.id}`}
                  >
                    {/* Date Block & Image */}
                    <div className="w-full md:w-2/5 shrink-0 relative rounded-2xl overflow-hidden">
                      <div className="aspect-[4/3] bg-muted overflow-hidden h-full">
                        <img 
                          src={event.imageUrl || `${import.meta.env.BASE_URL}images/event-placeholder.jpg`} 
                          alt={event.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                      
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-md rounded-xl flex flex-col items-center justify-center w-16 h-16 text-foreground">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
                          {format(eventDate, 'MMM')}
                        </span>
                        <span className="text-2xl font-display font-bold leading-none">
                          {format(eventDate, 'd')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-4 pr-4">
                      <div className="flex flex-col gap-2 mb-4 border-b border-border pb-4">
                        <h3 className="text-3xl font-display font-bold leading-tight group-hover:text-primary transition-colors tracking-tight text-foreground">{event.title}</h3>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-muted px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{format(eventDate, 'EEEE, h:mm a')}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-muted px-3 py-1.5 rounded-full">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {event.description && (
                        <p className="text-muted-foreground leading-relaxed">
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