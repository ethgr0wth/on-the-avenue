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
import { LogOut, Trash2, CheckCircle, XCircle, Shield, Plus, Building2, Tag, Calendar as CalendarIcon, AlertCircle, MapPin } from "lucide-react";
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

  if (items.length === 0) return <div className="p-12 text-center border border-border rounded-2xl bg-card text-muted-foreground text-sm">Queue is empty. No new submissions.</div>;

  return (
    <div className="space-y-6">
      {items.map(item => (
        <div key={item.id} className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-border pb-4 gap-4">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">{item.name}</h3>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">{item.category}</p>
            </div>
            <div className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
              Submitted: {format(new Date(item.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-8 bg-muted/30 p-6 rounded-2xl">
            <div><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Owner Email</span> <span className="font-medium text-foreground">{item.ownerEmail}</span></div>
            <div><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Phone</span> <span className="font-medium">{item.phone || 'N/A'}</span></div>
            <div className="col-span-1 md:col-span-2"><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Address</span> <span className="font-medium">{item.address || 'N/A'}</span></div>
            <div className="col-span-1 md:col-span-2"><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Website</span> <span className="font-medium text-primary">{item.website || 'N/A'}</span></div>
            <div className="col-span-1 md:col-span-2"><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Tagline</span> <span className="">{item.tagline || 'N/A'}</span></div>
            <div className="col-span-1 md:col-span-2"><span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">Description</span> <span className="text-muted-foreground">{item.description || 'N/A'}</span></div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            {rejectId === item.id ? (
              <div className="flex-1 flex flex-col md:flex-row gap-3">
                <Input 
                  value={rejectReason} 
                  onChange={(e) => setRejectReason(e.target.value)} 
                  placeholder="Reason for rejection..." 
                  className="flex-1 bg-background border-red-200 focus-visible:ring-red-500 rounded-xl"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleReject(item.id)} data-testid={`btn-reject-confirm-${item.id}`} className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">Confirm Reject</button>
                  <button onClick={() => setRejectId(null)} data-testid="btn-reject-cancel" className="px-5 py-2 rounded-xl text-sm font-bold border border-border bg-card hover:bg-muted transition-colors text-foreground">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <button onClick={() => handleApprove(item.id)} data-testid={`btn-approve-${item.id}`} className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                  <CheckCircle className="w-5 h-5" /> Approve Listing
                </button>
                <button onClick={() => setRejectId(item.id)} data-testid={`btn-reject-init-${item.id}`} className="flex-1 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                  <XCircle className="w-5 h-5" /> Deny Listing
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

  if (items.length === 0) return <div className="p-12 text-center border border-border rounded-2xl bg-card text-muted-foreground text-sm">No pending edits in queue.</div>;

  return (
    <div className="space-y-6">
      {items.map(item => {
        const changes = item.pendingChanges || {};
        return (
          <div key={item.id} className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm border-l-4 border-l-amber-400">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-display font-bold text-foreground">{item.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200 bg-amber-50 px-2 py-1 rounded">Edit Request</span>
            </div>
            
            <div className="space-y-4 mb-8 bg-muted/30 p-6 rounded-2xl">
              {Object.keys(changes).map(key => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Current {key}</span>
                    <span className="line-through text-muted-foreground">{item[key as keyof typeof item] as string || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Proposed {key}</span>
                    <span className="text-foreground font-medium">{changes[key as keyof typeof changes] as string}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              {rejectId === item.id ? (
                <div className="flex-1 flex flex-col md:flex-row gap-3">
                  <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Reason for rejection..." className="flex-1 bg-background border-red-200 focus-visible:ring-red-500 rounded-xl" />
                  <div className="flex gap-2">
                    <button onClick={() => handleReject(item.id)} data-testid={`btn-reject-confirm-${item.id}`} className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">Confirm Reject</button>
                    <button onClick={() => setRejectId(null)} data-testid="btn-reject-cancel" className="px-5 py-2 rounded-xl text-sm font-bold border border-border bg-card hover:bg-muted transition-colors text-foreground">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <button onClick={() => handleApprove(item.id)} data-testid={`btn-approve-${item.id}`} className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                    <CheckCircle className="w-5 h-5" /> Approve Changes
                  </button>
                  <button onClick={() => setRejectId(item.id)} data-testid={`btn-reject-init-${item.id}`} className="flex-1 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                    <XCircle className="w-5 h-5" /> Deny Changes
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

  if (isLoading) return <div className="py-8"><Skeleton className="h-[500px] w-full rounded-3xl bg-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-2xl mb-6 shadow-sm">
        <span className="text-sm font-semibold text-muted-foreground tracking-wide">Filter by status:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] bg-background border-border rounded-xl font-medium text-sm">
            <SelectValue placeholder="All Listings" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Listings</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-5 font-semibold">Business</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-center">Featured</th>
                <th className="p-5 font-semibold text-center">Sponsor</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {listings?.map(listing => (
                <tr key={listing.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-5">
                    <div className="font-display font-bold text-base text-foreground tracking-tight">{listing.name}</div>
                    <div className="text-xs font-medium text-muted-foreground uppercase mt-0.5">{listing.category}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                      listing.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      listing.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      listing.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button 
                      onClick={() => handleToggle(listing.id, 'isFeatured', !!listing.isFeatured)}
                      className={`w-7 h-7 rounded-md inline-flex items-center justify-center border transition-colors ${listing.isFeatured ? 'bg-primary border-primary text-primary-foreground shadow-sm' : 'bg-background border-border text-transparent hover:bg-muted'}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="p-5 text-center">
                    <button 
                      onClick={() => handleToggle(listing.id, 'isFoundingSponsor', !!listing.isFoundingSponsor)}
                      className={`w-7 h-7 rounded-md inline-flex items-center justify-center border transition-colors ${listing.isFoundingSponsor ? 'bg-amber-500 border-amber-500 text-white shadow-sm' : 'bg-background border-border text-transparent hover:bg-muted'}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleDelete(listing.id)}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-background border border-border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm"
                      title="Delete Listing"
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
    if (confirm("Are you sure you want to delete this offer?")) {
      deleteOffer.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListOffersQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-card border border-border p-6 rounded-3xl sticky top-28 shadow-sm">
          <h3 className="font-display font-bold text-xl mb-6 text-foreground flex items-center gap-2 border-b border-border pb-4">
            <Plus className="w-5 h-5 text-primary" /> Create Offer
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="businessId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Business</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border rounded-xl h-11 text-sm">
                        <SelectValue placeholder="Choose a business..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border max-h-60">
                      {listings?.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Offer Title</FormLabel>
                  <FormControl><Input {...field} className="bg-background border-border rounded-xl h-11" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</FormLabel>
                  <FormControl><Textarea className="h-24 bg-background border-border rounded-xl resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expiresAt" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiration Date</FormLabel>
                  <FormControl><Input type="datetime-local" {...field} className="bg-background border-border rounded-xl h-11" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button type="submit" disabled={createOffer.isPending} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-wider py-3.5 rounded-xl text-sm mt-6 transition-all hover:bg-primary/90 shadow-sm">
                {createOffer.isPending ? "Creating..." : "Create Offer"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        {offers?.length === 0 ? (
          <div className="p-12 text-center border border-border rounded-3xl bg-card text-muted-foreground shadow-sm">No active offers.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offers?.map(offer => (
              <div key={offer.id} className="bg-card border border-border rounded-2xl p-6 relative group shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-4 right-4">
                  <button onClick={() => handleDelete(offer.id)} data-testid={`btn-delete-offer-${offer.id}`} className="w-8 h-8 rounded-lg bg-background border border-border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="pr-12">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">{offer.businessName}</span>
                  <h4 className="font-display font-bold text-lg mb-2 text-foreground leading-tight">{offer.title}</h4>
                  {offer.expiresAt && <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-3 font-medium">Expires: {format(new Date(offer.expiresAt), 'MMM d, yyyy')}</p>}
                </div>
              </div>
            ))}
          </div>
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
    createEvent.mutate({ data }, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: getOtaAdminListEventsQueryKey() });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListEventsQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-card border border-border p-6 rounded-3xl sticky top-28 shadow-sm">
          <h3 className="font-display font-bold text-xl mb-6 text-foreground flex items-center gap-2 border-b border-border pb-4">
            <Plus className="w-5 h-5 text-primary" /> Create Event
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Event Title</FormLabel><FormControl><Input {...field} className="bg-background border-border rounded-xl h-11" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="eventDate" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date & Time</FormLabel><FormControl><Input type="datetime-local" {...field} className="bg-background border-border rounded-xl h-11" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</FormLabel><FormControl><Input {...field} className="bg-background border-border rounded-xl h-11" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</FormLabel><FormControl><Textarea className="h-24 bg-background border-border rounded-xl resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image URL</FormLabel><FormControl><Input {...field} className="bg-background border-border rounded-xl h-11" /></FormControl><FormMessage /></FormItem>
              )} />
              <button type="submit" disabled={createEvent.isPending} className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-wider py-3.5 rounded-xl text-sm mt-6 transition-all hover:bg-primary/90 shadow-sm">
                {createEvent.isPending ? "Creating..." : "Create Event"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        {events?.length === 0 ? (
           <div className="p-12 text-center border border-border rounded-3xl bg-card text-muted-foreground shadow-sm">No upcoming events.</div>
        ) : (
          <div className="space-y-4">
            {events?.map(event => (
              <div key={event.id} className="bg-card border border-border rounded-2xl p-5 relative group flex flex-col md:flex-row gap-5 items-start md:items-center shadow-sm hover:shadow-md transition-all">
                <div className="w-full md:w-32 h-32 md:h-24 rounded-xl bg-muted overflow-hidden shrink-0 border border-border">
                  <img src={event.imageUrl || `${import.meta.env.BASE_URL}images/event-placeholder.jpg`} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 pr-12">
                  <h4 className="font-display font-bold text-lg mb-1.5 text-foreground leading-tight">{event.title}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" /> {format(new Date(event.eventDate), 'MMM d, h:mm a')}</span>
                    {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>}
                  </div>
                </div>
                <div className="absolute top-5 right-5">
                  <button onClick={() => handleDelete(event.id)} data-testid={`btn-delete-event-${event.id}`} className="w-8 h-8 rounded-lg bg-background border border-border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: session, isLoading, isError } = useOtaAdminGetMe();
  const { data: queue } = useOtaAdminGetQueue({ query: { enabled: !!session?.authenticated, queryKey: getOtaAdminGetQueueQueryKey() } });
  const logout = useOtaAdminLogout();

  useEffect(() => {
    if (!isLoading && (isError || !session?.authenticated)) {
      setLocation('/admin');
    }
  }, [session, isLoading, isError, setLocation]);

  if (isLoading || !session?.authenticated) {
    return <div className="min-h-screen bg-muted/10 flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin"></div></div>;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getOtaAdminGetMeQueryKey() });
        setLocation('/admin');
      }
    });
  };

  const pendingSubmissionsCount = queue?.pendingSubmissions.length || 0;
  const pendingEditsCount = queue?.pendingEdits.length || 0;
  const totalQueue = pendingSubmissionsCount + pendingEditsCount;

  return (
    <div className="pb-32 bg-muted/10 min-h-screen">
      <div className="bg-card border-b border-border pt-12 pb-6 mb-10 shadow-sm relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-sm">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold tracking-tight text-foreground mb-1">Admin Dashboard</h1>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> System Online
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            data-testid="btn-admin-logout"
            className="flex items-center gap-2 text-sm font-semibold text-foreground bg-background hover:bg-muted border border-border px-6 py-2.5 rounded-full transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <Tabs defaultValue="moderation" className="w-full">
          <div className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur pt-4 pb-0 px-2 rounded-t-3xl mb-8 border border-border shadow-sm">
            <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2 w-full justify-start border-none">
              <TabsTrigger 
                value="moderation" 
                className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:border-border data-[state=active]:border-b-card data-[state=active]:shadow-sm rounded-t-2xl rounded-b-none border border-transparent px-6 py-3.5 text-sm font-semibold transition-all relative flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Moderation Queue
                {totalQueue > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">{totalQueue}</span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="directory" 
                className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:border-border data-[state=active]:border-b-card data-[state=active]:shadow-sm rounded-t-2xl rounded-b-none border border-transparent px-6 py-3.5 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" /> Directory Data
              </TabsTrigger>
              <TabsTrigger 
                value="offers" 
                className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:border-border data-[state=active]:border-b-card data-[state=active]:shadow-sm rounded-t-2xl rounded-b-none border border-transparent px-6 py-3.5 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Tag className="w-4 h-4" /> Offers
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:border-border data-[state=active]:border-b-card data-[state=active]:shadow-sm rounded-t-2xl rounded-b-none border border-transparent px-6 py-3.5 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" /> Events
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="pt-2">
            <TabsContent value="moderation" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 text-foreground tracking-tight">
                    New Submissions 
                    <span className="bg-muted text-muted-foreground text-xs py-1 px-2.5 rounded-full font-semibold">{pendingSubmissionsCount}</span>
                  </h3>
                  <PendingSubmissions items={queue?.pendingSubmissions || []} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 text-foreground tracking-tight">
                    Edit Requests 
                    <span className="bg-muted text-muted-foreground text-xs py-1 px-2.5 rounded-full font-semibold">{pendingEditsCount}</span>
                  </h3>
                  <PendingEdits items={queue?.pendingEdits || []} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="directory" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AllListings />
            </TabsContent>

            <TabsContent value="offers" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AdminOffers />
            </TabsContent>

            <TabsContent value="events" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <AdminEvents />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}