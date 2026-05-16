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
import { LogOut, Trash2, CheckCircle, XCircle, Search, Terminal, Plus, Settings2 } from "lucide-react";
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

  if (items.length === 0) return <div className="p-12 text-center border border-white/5 rounded-2xl bg-white/5 text-muted-foreground font-mono text-sm">NO PENDING SUBMISSIONS IN QUEUE.</div>;

  return (
    <div className="space-y-6">
      {items.map(item => (
        <div key={item.id} className="glass-panel border-white/10 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">{item.name}</h3>
              <p className="text-[10px] font-mono text-primary uppercase tracking-widest mt-1">{item.category}</p>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
              INIT: {format(new Date(item.createdAt), 'yyyy-MM-dd')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm font-mono mb-6 bg-black/20 p-4 rounded-xl">
            <div><span className="text-muted-foreground text-[10px] block">OWNER</span> <span className="text-primary truncate">{item.ownerEmail}</span></div>
            <div><span className="text-muted-foreground text-[10px] block">PHONE</span> {item.phone || 'N/A'}</div>
            <div className="col-span-2"><span className="text-muted-foreground text-[10px] block">ADDRESS</span> {item.address || 'N/A'}</div>
            <div className="col-span-2"><span className="text-muted-foreground text-[10px] block">WEBSITE</span> <span className="text-primary">{item.website || 'N/A'}</span></div>
            <div className="col-span-2"><span className="text-muted-foreground text-[10px] block">TAGLINE</span> <span className="font-sans">{item.tagline || 'N/A'}</span></div>
            <div className="col-span-2"><span className="text-muted-foreground text-[10px] block">DESC</span> <span className="font-sans">{item.description || 'N/A'}</span></div>
          </div>

          <div className="flex gap-3 pt-4">
            {rejectId === item.id ? (
              <div className="flex-1 flex gap-2">
                <Input 
                  value={rejectReason} 
                  onChange={(e) => setRejectReason(e.target.value)} 
                  placeholder="REASON FOR REJECTION..." 
                  className="flex-1 bg-black/40 border-destructive/30 focus-visible:ring-destructive rounded-xl font-mono text-xs"
                />
                <button onClick={() => handleReject(item.id)} data-testid={`btn-reject-confirm-${item.id}`} className="bg-destructive text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-destructive/90 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">CONFIRM REJECT</button>
                <button onClick={() => setRejectId(null)} data-testid="btn-reject-cancel" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 transition-colors">CANCEL</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleApprove(item.id)} data-testid={`btn-approve-${item.id}`} className="flex-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <CheckCircle className="w-4 h-4" /> AUTHORIZE NODE
                </button>
                <button onClick={() => setRejectId(item.id)} data-testid={`btn-reject-init-${item.id}`} className="flex-1 bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                  <XCircle className="w-4 h-4" /> DENY
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

  if (items.length === 0) return <div className="p-12 text-center border border-white/5 rounded-2xl bg-white/5 text-muted-foreground font-mono text-sm">NO PENDING EDITS IN QUEUE.</div>;

  return (
    <div className="space-y-6">
      {items.map(item => {
        const changes = item.pendingChanges || {};
        return (
          <div key={item.id} className="glass-panel border-white/10 p-6 rounded-2xl border-l-4 border-l-amber-500">
            <h3 className="text-2xl font-display font-bold mb-6 text-white">{item.name} <span className="text-[10px] font-mono text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded ml-2 align-middle">MUTATION DETECTED</span></h3>
            
            <div className="space-y-3 mb-8 bg-black/20 p-4 rounded-xl font-mono text-xs">
              {Object.keys(changes).map(key => (
                <div key={key} className="grid grid-cols-2 gap-4 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <span className="text-muted-foreground/60 block mb-1">CURRENT {key.toUpperCase()}</span>
                    <span className="line-through text-muted-foreground">{item[key as keyof typeof item] as string || 'NULL'}</span>
                  </div>
                  <div>
                    <span className="text-primary block mb-1">PROPOSED {key.toUpperCase()}</span>
                    <span className="text-white">{changes[key as keyof typeof changes] as string}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {rejectId === item.id ? (
                <div className="flex-1 flex gap-2">
                  <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="REASON FOR REJECTION..." className="flex-1 bg-black/40 border-destructive/30 focus-visible:ring-destructive rounded-xl font-mono text-xs" />
                  <button onClick={() => handleReject(item.id)} data-testid={`btn-reject-confirm-${item.id}`} className="bg-destructive text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-destructive/90 transition-colors">CONFIRM REJECT</button>
                  <button onClick={() => setRejectId(null)} data-testid="btn-reject-cancel" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 transition-colors">CANCEL</button>
                </div>
              ) : (
                <>
                  <button onClick={() => handleApprove(item.id)} data-testid={`btn-approve-${item.id}`} className="flex-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    <CheckCircle className="w-4 h-4" /> AUTHORIZE MUTATION
                  </button>
                  <button onClick={() => setRejectId(item.id)} data-testid={`btn-reject-init-${item.id}`} className="flex-1 bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    <XCircle className="w-4 h-4" /> DENY MUTATION
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
    if (confirm("CRITICAL WARNING: Are you sure you want to permanently purge this node from the grid?")) {
      deleteListing.mutate(
        { id },
        { onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListAllListingsQueryKey() }) }
      );
    }
  };

  if (isLoading) return <div className="py-8"><Skeleton className="h-[500px] w-full rounded-3xl bg-white/5" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-white/10 pb-4 glass-panel p-4 rounded-2xl mb-6">
        <span className="text-xs font-mono text-muted-foreground">FILTER STATE:</span>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] bg-black/40 border-white/10 rounded-xl font-mono text-xs">
            <SelectValue placeholder="ALL" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10 font-mono text-xs">
            <SelectItem value="all">ALL_NODES</SelectItem>
            <SelectItem value="approved">APPROVED_ONLY</SelectItem>
            <SelectItem value="pending">PENDING_ONLY</SelectItem>
            <SelectItem value="rejected">REJECTED_ONLY</SelectItem>
            <SelectItem value="unpublished">UNPUBLISHED_ONLY</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-panel border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-[10px] font-mono text-muted-foreground">
            <tr>
              <th className="p-4 font-normal">ENTITY_DATA</th>
              <th className="p-4 font-normal">STATUS</th>
              <th className="p-4 font-normal text-center">FEATURED</th>
              <th className="p-4 font-normal text-center">SPONSOR</th>
              <th className="p-4 font-normal text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {listings?.map(listing => (
              <tr key={listing.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="font-display font-bold text-base text-white">{listing.name}</div>
                  <div className="text-[10px] font-mono text-primary">{listing.category}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-mono rounded border ${
                    listing.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    listing.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    listing.status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                    'bg-white/5 text-muted-foreground border-white/10'
                  }`}>
                    {listing.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleToggle(listing.id, 'isFeatured', !!listing.isFeatured)}
                    className={`w-6 h-6 rounded-md inline-flex items-center justify-center border transition-colors ${listing.isFeatured ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'bg-black/40 border-white/10 text-transparent'}`}
                  >
                    <CheckCircle className="w-3 h-3" />
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleToggle(listing.id, 'isFoundingSponsor', !!listing.isFoundingSponsor)}
                    className={`w-6 h-6 rounded-md inline-flex items-center justify-center border transition-colors ${listing.isFoundingSponsor ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-black/40 border-white/10 text-transparent'}`}
                  >
                    <CheckCircle className="w-3 h-3" />
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(listing.id)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-black/40 border border-white/10 text-muted-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 transition-colors"
                    title="Purge Node"
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
    if (confirm("Purge this offer from the grid?")) {
      deleteOffer.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListOffersQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="glass-panel border-white/10 p-6 rounded-3xl sticky top-24">
          <h3 className="font-display font-bold text-xl mb-6 text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Plus className="w-5 h-5 text-primary" /> INJECT OFFER
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="businessId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-mono text-muted-foreground">TARGET NODE</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/40 border-white/10 rounded-xl h-12 text-xs">
                        <SelectValue placeholder="SELECT ENTITY" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-white/10">
                      {listings?.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-mono text-muted-foreground">OFFER TITLE</FormLabel>
                  <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-mono text-muted-foreground">PAYLOAD DETAILS</FormLabel>
                  <FormControl><Textarea className="h-24 bg-black/40 border-white/10 rounded-xl resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expiresAt" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-mono text-muted-foreground">TERMINATION DATE</FormLabel>
                  <FormControl><Input type="datetime-local" {...field} className="bg-black/40 border-white/10 rounded-xl h-12 [color-scheme:dark]" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button type="submit" disabled={createOffer.isPending} className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-xs mt-6 neon-glow transition-all hover:bg-primary/90">
                {createOffer.isPending ? "INJECTING..." : "EXECUTE"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        {offers?.length === 0 ? (
          <div className="p-12 text-center border border-white/5 rounded-3xl bg-white/5 text-muted-foreground font-mono text-sm">NO ACTIVE OFFERS DETECTED.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers?.map(offer => (
              <div key={offer.id} className="glass-panel border-white/10 rounded-2xl p-6 relative group">
                <div className="absolute top-4 right-4">
                  <button onClick={() => handleDelete(offer.id)} data-testid={`btn-delete-offer-${offer.id}`} className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-muted-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 transition-colors flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="pr-12">
                  <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded mb-3 inline-block">{offer.businessName}</span>
                  <h4 className="font-display font-bold text-lg mb-2 text-white">{offer.title}</h4>
                  {offer.expiresAt && <p className="text-[10px] font-mono text-muted-foreground mt-4 border-t border-white/5 pt-3">TERM: {format(new Date(offer.expiresAt), 'yyyy-MM-dd')}</p>}
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
    if (confirm("Purge this event from the timeline?")) {
      deleteEvent.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getOtaAdminListEventsQueryKey() })
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="glass-panel border-white/10 p-6 rounded-3xl sticky top-24">
          <h3 className="font-display font-bold text-xl mb-6 text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Plus className="w-5 h-5 text-primary" /> SCHEDULE EVENT
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-mono text-muted-foreground">EVENT DESIGNATION</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="eventDate" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-mono text-muted-foreground">CHRONO MARKER</FormLabel><FormControl><Input type="datetime-local" {...field} className="bg-black/40 border-white/10 rounded-xl h-12 [color-scheme:dark]" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-mono text-muted-foreground">PHYSICAL COORD</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-mono text-muted-foreground">DETAILS</FormLabel><FormControl><Textarea className="h-24 bg-black/40 border-white/10 rounded-xl resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] font-mono text-muted-foreground">VISUAL ASSET URL</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <button type="submit" disabled={createEvent.isPending} className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-xs mt-6 neon-glow transition-all hover:bg-primary/90">
                {createEvent.isPending ? "UPLOADING..." : "INJECT INTO TIMELINE"}
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
        {events?.length === 0 ? (
          <div className="p-12 text-center border border-white/5 rounded-3xl bg-white/5 text-muted-foreground font-mono text-sm">TIMELINE IS EMPTY.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events?.map(event => (
              <div key={event.id} className="glass-panel border-white/10 rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-16 h-16 bg-black/40 border border-white/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-mono text-primary">{format(new Date(event.eventDate), 'MMM').toUpperCase()}</span>
                  <span className="text-xl font-display font-bold text-white leading-none mt-1">{format(new Date(event.eventDate), 'dd')}</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-muted-foreground mb-1 block">{format(new Date(event.eventDate), 'HH:mm')} // {event.location?.toUpperCase()}</span>
                  <h4 className="font-display font-bold text-lg text-white">{event.title}</h4>
                </div>
                <button onClick={() => handleDelete(event.id)} data-testid={`btn-delete-event-${event.id}`} className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 text-muted-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 transition-colors flex items-center justify-center shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
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
    return <div className="p-24 text-center"><Skeleton className="h-16 w-16 mx-auto rounded-2xl bg-primary/20 animate-pulse" /></div>;
  }

  const pendingCount = (queue?.pendingSubmissions.length || 0) + (queue?.pendingEdits.length || 0);

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="glass-panel border-b border-white/10 py-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/0 via-destructive to-destructive/0" />
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/10 border border-destructive/30 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <Terminal className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tighter text-white">SYS<span className="text-destructive neon-text">ADMIN</span></h1>
              <p className="text-[10px] font-mono text-muted-foreground mt-1 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                GRID CONTROL TERMINAL ACTIVE
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-white hover:text-destructive transition-colors px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-destructive/10 hover:border-destructive/30"
            data-testid="btn-admin-logout"
          >
            <LogOut className="w-4 h-4" /> DISCONNECT
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="mb-8 bg-black/40 border border-white/10 p-1 rounded-2xl inline-flex w-full md:w-auto h-auto overflow-x-auto hide-scrollbar">
            <TabsTrigger value="queue" className="rounded-xl font-mono text-xs py-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              MODERATION {pendingCount > 0 && <span className="ml-2 bg-background/50 text-current px-2 py-0.5 rounded text-[10px]">{pendingCount}</span>}
            </TabsTrigger>
            <TabsTrigger value="directory" className="rounded-xl font-mono text-xs py-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              NODE_DIRECTORY
            </TabsTrigger>
            <TabsTrigger value="offers" className="rounded-xl font-mono text-xs py-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              OFFER_MATRIX
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-xl font-mono text-xs py-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              EVENT_TIMELINE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-12">
            <section>
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_5px_rgba(245,158,11,0.8)]"></span> NEW SUBMISSIONS
              </h2>
              <PendingSubmissions items={queue?.pendingSubmissions || []} />
            </section>
            
            <section>
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span> NODE MUTATIONS
              </h2>
              <PendingEdits items={queue?.pendingEdits || []} />
            </section>
          </TabsContent>

          <TabsContent value="directory">
            <AllListings />
          </TabsContent>

          <TabsContent value="offers">
            <AdminOffers />
          </TabsContent>

          <TabsContent value="events">
            <AdminEvents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}