import { 
  useOtaAdminGetMe, 
  useOtaAdminGetQueue, 
  useOtaAdminListAllListings, 
  useOtaAdminListOffers, 
  useOtaAdminListEvents,
  useOtaAdminApproveListing,
  useOtaAdminRejectListing,
  useOtaAdminUpdateListing,
  useOtaAdminDeleteListing,
  useOtaAdminCreateOffer,
  useOtaAdminDeleteOffer,
  useOtaAdminCreateEvent,
  useOtaAdminDeleteEvent,
  useOtaAdminLogout,
  getOtaAdminGetMeQueryKey,
  getOtaAdminGetQueueQueryKey,
  getOtaAdminListAllListingsQueryKey,
  getOtaAdminListOffersQueryKey,
  getOtaAdminListEventsQueryKey
} from "@workspace/api-client-react";
import { OtaAdminCreateOfferBody, OtaAdminCreateEventBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { LogOut, Trash2, CheckCircle, XCircle, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Sub-components for better organization
function PendingSubmissions({ items }: { items: any[] }) {
  const approve = useOtaAdminApproveListing();
  const reject = useOtaAdminRejectListing();
  const queryClient = useQueryClient();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const invalidateModeration = () => {
    queryClient.invalidateQueries({ queryKey: getOtaAdminGetQueueQueryKey() });
    queryClient.invalidateQueries({ queryKey: getOtaAdminListAllListingsQueryKey() });
  };

  const handleApprove = (id: string) => {
    approve.mutate({ id }, { onSuccess: invalidateModeration });
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) return;
    reject.mutate({ id, data: { reason: rejectReason } }, {
      onSuccess: () => {
        setRejectId(null);
        setRejectReason("");
        invalidateModeration();
      }
    });
  };

  if (items.length === 0) return <p className="text-muted-foreground py-8">No pending submissions.</p>;

  return (
    <div className="space-y-8">
      {items.map(item => (
        <div key={item.id} className="bg-card border border-border p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-serif">{item.name}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{item.category}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Submitted: {format(new Date(item.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div><strong className="text-muted-foreground">Email:</strong> {item.ownerEmail}</div>
            <div><strong className="text-muted-foreground">Phone:</strong> {item.phone || '-'}</div>
            <div><strong className="text-muted-foreground">Address:</strong> {item.address || '-'}</div>
            <div><strong className="text-muted-foreground">Website:</strong> {item.website || '-'}</div>
            <div className="col-span-2"><strong className="text-muted-foreground">Tagline:</strong> {item.tagline || '-'}</div>
            <div className="col-span-2"><strong className="text-muted-foreground">Desc:</strong> {item.description || '-'}</div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            {rejectId === item.id ? (
              <div className="flex-1 flex gap-2">
                <Input 
                  value={rejectReason} 
                  onChange={(e) => setRejectReason(e.target.value)} 
                  placeholder="Reason for rejection..." 
                  className="flex-1"
                />
                <button onClick={() => handleReject(item.id)} className="bg-destructive text-destructive-foreground px-4 py-2 text-xs uppercase tracking-widest">Confirm Reject</button>
                <button onClick={() => setRejectId(null)} className="px-4 py-2 text-xs uppercase tracking-widest border border-border">Cancel</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleApprove(item.id)} className="bg-emerald-600 text-white px-6 py-2 text-xs uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button onClick={() => setRejectId(item.id)} className="bg-transparent border border-destructive/50 text-destructive px-6 py-2 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-destructive/10">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PendingEdits({ items }: { items: any[] }) {
  const approve = useOtaAdminApproveListing();
  const reject = useOtaAdminRejectListing();
  const queryClient = useQueryClient();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const invalidateModeration = () => {
    queryClient.invalidateQueries({ queryKey: getOtaAdminGetQueueQueryKey() });
    queryClient.invalidateQueries({ queryKey: getOtaAdminListAllListingsQueryKey() });
  };

  const handleApprove = (id: string) => {
    approve.mutate({ id }, { onSuccess: invalidateModeration });
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) return;
    reject.mutate({ id, data: { reason: rejectReason } }, {
      onSuccess: () => {
        setRejectId(null);
        setRejectReason("");
        invalidateModeration();
      }
    });
  };

  if (items.length === 0) return <p className="text-muted-foreground py-8">No pending edits.</p>;

  return (
    <div className="space-y-8">
      {items.map(item => {
        const changes = item.pendingChanges || {};
        return (
          <div key={item.id} className="bg-card border border-border p-6 shadow-sm">
            <h3 className="text-xl font-serif mb-6">{item.name} <span className="text-sm font-sans text-muted-foreground">(Edits)</span></h3>
            
            <div className="space-y-4 mb-8">
              {Object.keys(changes).map(key => (
                <div key={key} className="grid grid-cols-2 gap-4 text-sm border-b border-border/40 pb-2">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">Current {key}</span>
                    <span className="line-through opacity-70">{item[key as keyof typeof item] as string || '-'}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary block mb-1">Proposed {key}</span>
                    <span className="font-medium text-primary">{changes[key as keyof typeof changes] as string}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {rejectId === item.id ? (
                <div className="flex-1 flex gap-2">
                  <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Reason for rejection..." className="flex-1" />
                  <button onClick={() => handleReject(item.id)} className="bg-destructive text-destructive-foreground px-4 py-2 text-xs uppercase tracking-widest">Confirm Reject</button>
                  <button onClick={() => setRejectId(null)} className="px-4 py-2 text-xs uppercase tracking-widest border border-border">Cancel</button>
                </div>
              ) : (
                <>
                  <button onClick={() => handleApprove(item.id)} className="bg-emerald-600 text-white px-6 py-2 text-xs uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Approve Edits
                  </button>
                  <button onClick={() => setRejectId(item.id)} className="bg-transparent border border-destructive/50 text-destructive px-6 py-2 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-destructive/10">
                    <XCircle className="w-4 h-4" /> Reject Edits
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AllListings() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: listings, isLoading } = useOtaAdminListAllListings({ status: statusFilter as any });
  const updateListing = useOtaAdminUpdateListing();
  const deleteListing = useOtaAdminDeleteListing();
  const queryClient = useQueryClient();

  const handleToggle = (id: string, field: 'isFeatured' | 'isFoundingSponsor', currentValue: boolean) => {
    updateListing.mutate(
      { id, data: { [field]: !currentValue } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListAllListingsQueryKey() }) }
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this listing?")) {
      deleteListing.mutate(
        { id },
        { onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListAllListingsQueryKey() }) }
      );
    }
  };

  if (isLoading) return <div className="py-8"><Skeleton className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <span className="text-sm font-medium">Filter by Status:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Business</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium">Sponsor</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {listings?.map(listing => (
              <tr key={listing.id} className="hover:bg-muted/20">
                <td className="p-4">
                  <div className="font-medium">{listing.name}</div>
                  <div className="text-xs text-muted-foreground">{listing.category}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-widest rounded-sm ${
                    listing.status === 'approved' ? 'bg-emerald-500/10 text-emerald-700' :
                    listing.status === 'pending' ? 'bg-amber-500/10 text-amber-700' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {listing.status}
                  </span>
                </td>
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={!!listing.isFeatured} 
                    onChange={() => handleToggle(listing.id, 'isFeatured', !!listing.isFeatured)} 
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={!!listing.isFoundingSponsor} 
                    onChange={() => handleToggle(listing.id, 'isFoundingSponsor', !!listing.isFoundingSponsor)} 
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(listing.id)}
                    className="text-destructive hover:text-destructive/80 p-2"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminOffers() {
  const { data: offers } = useOtaAdminListOffers();
  const { data: listings } = useOtaAdminListAllListings({ status: 'approved' });
  const createOffer = useOtaAdminCreateOffer();
  const deleteOffer = useOtaAdminDeleteOffer();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof OtaAdminCreateOfferBody>>({
    resolver: zodResolver(OtaAdminCreateOfferBody),
    defaultValues: { businessId: "", title: "", description: "", expiresAt: "" }
  });

  const onSubmit = (data: z.infer<typeof OtaAdminCreateOfferBody>) => {
    createOffer.mutate({ data }, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: getOtaAdminListOffersQueryKey() });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this offer?")) {
      deleteOffer.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListOffersQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <div className="bg-card border border-border p-6 sticky top-24">
          <h3 className="font-serif text-xl mb-6">Create Offer</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="businessId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Business</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select business" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {listings?.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="h-20" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="expiresAt" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires At (optional)</FormLabel>
                  <FormControl><Input type="datetime-local" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button type="submit" disabled={createOffer.isPending} className="w-full bg-foreground text-background py-2 text-xs uppercase tracking-widest mt-4">
                {createOffer.isPending ? "Adding..." : "Add Offer"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-serif text-xl mb-6">Active Offers</h3>
        {offers?.length === 0 ? (
          <p className="text-muted-foreground">No active offers.</p>
        ) : (
          offers?.map(offer => (
            <div key={offer.id} className="bg-card border border-border p-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-primary font-medium">{offer.businessName}</span>
                <h4 className="font-serif text-lg">{offer.title}</h4>
                {offer.expiresAt && <p className="text-xs text-muted-foreground mt-1">Exp: {format(new Date(offer.expiresAt), 'PP')}</p>}
              </div>
              <button onClick={() => handleDelete(offer.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-sm"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AdminEvents() {
  const { data: events } = useOtaAdminListEvents();
  const createEvent = useOtaAdminCreateEvent();
  const deleteEvent = useOtaAdminDeleteEvent();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof OtaAdminCreateEventBody>>({
    resolver: zodResolver(OtaAdminCreateEventBody),
    defaultValues: { title: "", location: "", eventDate: "", description: "", imageUrl: "" }
  });

  const onSubmit = (data: z.infer<typeof OtaAdminCreateEventBody>) => {
    // Ensure date is formatted correctly if needed
    createEvent.mutate({ data }, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: getOtaAdminListEventsQueryKey() });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this event?")) {
      deleteEvent.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListEventsQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <div className="bg-card border border-border p-6 sticky top-24">
          <h3 className="font-serif text-xl mb-6">Create Event</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="eventDate" render={({ field }) => (
                <FormItem><FormLabel>Date & Time</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="h-20" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <button type="submit" disabled={createEvent.isPending} className="w-full bg-foreground text-background py-2 text-xs uppercase tracking-widest mt-4">
                {createEvent.isPending ? "Adding..." : "Add Event"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-serif text-xl mb-6">Upcoming Events</h3>
        {events?.length === 0 ? (
          <p className="text-muted-foreground">No upcoming events.</p>
        ) : (
          events?.map(event => (
            <div key={event.id} className="bg-card border border-border p-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-primary font-medium">{format(new Date(event.eventDate), 'PPp')}</span>
                <h4 className="font-serif text-lg">{event.title}</h4>
                {event.location && <p className="text-xs text-muted-foreground mt-1">{event.location}</p>}
              </div>
              <button onClick={() => handleDelete(event.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-sm"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: session, isLoading, isError } = useOtaAdminGetMe();
  const { data: queue } = useOtaAdminGetQueue({ query: { enabled: !!session?.authenticated, queryKey: getOtaAdminGetQueueQueryKey() } });
  const logout = useOtaAdminLogout();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && (isError || !session?.authenticated)) {
      setLocation('/admin');
    }
  }, [isLoading, isError, session, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getOtaAdminGetMeQueryKey() });
        setLocation('/admin');
      }
    });
  };

  if (isLoading || !session?.authenticated) {
    return <div className="p-24 text-center"><Skeleton className="h-12 w-64 mx-auto" /></div>;
  }

  const pendingCount = (queue?.pendingSubmissions.length || 0) + (queue?.pendingEdits.length || 0);

  return (
    <div className="min-h-screen bg-muted/20 pb-32">
      <div className="bg-background border-b border-border py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif">Admin Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage the avenue's content</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 border border-border bg-card"
            data-testid="btn-admin-logout"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="w-full justify-start h-auto bg-transparent border-b border-border rounded-none p-0 mb-8 space-x-8">
            <TabsTrigger 
              value="queue" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 text-sm font-medium uppercase tracking-wider relative"
            >
              Moderation Queue
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-4 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 text-sm font-medium uppercase tracking-wider">
              All Listings
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 text-sm font-medium uppercase tracking-wider">
              Offers
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 text-sm font-medium uppercase tracking-wider">
              Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="queue" className="mt-0 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                  New Submissions
                  <span className="text-sm font-sans bg-muted px-2 py-0.5 rounded-sm">{queue?.pendingSubmissions.length || 0}</span>
                </h2>
                <PendingSubmissions items={queue?.pendingSubmissions || []} />
              </div>
              <div>
                <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                  Pending Edits
                  <span className="text-sm font-sans bg-muted px-2 py-0.5 rounded-sm">{queue?.pendingEdits.length || 0}</span>
                </h2>
                <PendingEdits items={queue?.pendingEdits || []} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="listings" className="mt-0 outline-none">
            <AllListings />
          </TabsContent>
          
          <TabsContent value="offers" className="mt-0 outline-none">
            <AdminOffers />
          </TabsContent>

          <TabsContent value="events" className="mt-0 outline-none">
            <AdminEvents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}