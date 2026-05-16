import { useOtaListEvents } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Events() {
  const { data: events, isLoading } = useOtaListEvents();

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="bg-muted/30 border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-8 h-8 mx-auto text-primary mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">Community Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Gatherings, workshops, and celebrations happening along the avenue.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-8">
                  <Skeleton className="w-full md:w-1/3 aspect-[4/3] rounded-none" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : events?.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border/60">
              <h3 className="text-2xl font-serif mb-3">No Upcoming Events</h3>
              <p className="text-muted-foreground">The calendar is currently quiet. Check back soon for new gatherings.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {events?.map(event => {
                const eventDate = parseISO(event.eventDate);
                return (
                  <article 
                    key={event.id} 
                    className="flex flex-col md:flex-row gap-8 group"
                    data-testid={`article-event-${event.id}`}
                  >
                    {/* Date Block & Image */}
                    <div className="w-full md:w-5/12 shrink-0 relative">
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        <img 
                          src={event.imageUrl || "/images/event-placeholder.jpg"} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-background border border-border shadow-sm flex flex-col items-center justify-center w-16 h-16">
                        <span className="text-[10px] uppercase tracking-widest text-primary font-medium leading-none mb-1">
                          {format(eventDate, 'MMM')}
                        </span>
                        <span className="text-xl font-serif leading-none">
                          {format(eventDate, 'd')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-2">
                      <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-3xl font-serif leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground uppercase tracking-wider mt-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{format(eventDate, 'EEEE, h:mm a')}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
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