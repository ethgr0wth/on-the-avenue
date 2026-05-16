import { useOtaOwnerGetMe, useOtaOwnerRequestLink, useOtaOwnerLogout, useOtaOwnerUpdateListing, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { OtaOwnerRequestLinkBody, OtaOwnerUpdateListingBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, LogOut, CheckCircle2, AlertCircle, Fingerprint, RefreshCcw, Save } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function MagicLinkForm() {
  const [submitted, setSubmitted] = useState(false);
  const requestLink = useOtaOwnerRequestLink();

  const form = useForm<z.infer<typeof OtaOwnerRequestLinkBody>>({
    resolver: zodResolver(OtaOwnerRequestLinkBody),
    defaultValues: { email: "" }
  });

  const onSubmit = (data: z.infer<typeof OtaOwnerRequestLinkBody>) => {
    requestLink.mutate(
      { data },
      { onSuccess: () => setSubmitted(true) }
    );
  };

  if (submitted) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_-10px_rgba(0,240,255,0.5)]">
          <Mail className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4 text-white">TOKEN <span className="text-primary neon-text">DISPATCHED</span></h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          A magic link has been sent to <strong className="text-white font-mono">{form.getValues('email')}</strong>. <br />
          Follow the link to authenticate your session.
        </p>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white">
          <Fingerprint className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-3">OWNER <span className="text-primary neon-text">ACCESS</span></h2>
        <p className="text-muted-foreground text-sm font-mono">AUTHENTICATE VIA EMAIL TO MANAGE NODES</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Auth Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="sysadmin@example.com" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-owner-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={requestLink.isPending}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all neon-glow disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
              data-testid="button-request-link"
            >
              {requestLink.isPending ? <><RefreshCcw className="w-4 h-4 animate-spin" /> GENERATING TOKEN...</> : "REQUEST MAGIC LINK"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function EditableListing({ listing }: { listing: any }) {
  const queryClient = useQueryClient();
  const updateListing = useOtaOwnerUpdateListing();
  const [pendingMajor, setPendingMajor] = useState(false);

  const form = useForm<z.infer<typeof OtaOwnerUpdateListingBody>>({
    resolver: zodResolver(OtaOwnerUpdateListingBody),
    defaultValues: {
      name: listing.name,
      category: listing.category,
      tagline: listing.tagline || "",
      description: listing.description || "",
      address: listing.address || "",
      phone: listing.phone || "",
      website: listing.website || "",
      hours: listing.hours || "",
      imageUrl: listing.imageUrl || "",
      offer: listing.offer || "",
    }
  });

  const onSubmit = (data: z.infer<typeof OtaOwnerUpdateListingBody>) => {
    updateListing.mutate(
      { id: listing.id, data },
      {
        onSuccess: (res) => {
          if (res.pendingMajor) {
            setPendingMajor(true);
          }
          queryClient.invalidateQueries({ queryKey: getOtaOwnerGetMeQueryKey() });
        }
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'rejected': return 'bg-destructive/20 text-destructive border-destructive/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
      default: return 'bg-white/5 text-muted-foreground border-white/10';
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-12">
      <div className="bg-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5">
        <div>
          <h3 className="text-3xl font-display font-bold tracking-tight text-white mb-1">{listing.name}</h3>
          <p className="text-[10px] font-mono text-primary uppercase tracking-widest">{listing.category}</p>
        </div>
        <div className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-full flex items-center gap-2 ${getStatusColor(listing.status)}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          STATUS: {listing.status}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {listing.status === 'rejected' && listing.rejectionReason && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1 font-mono text-[10px] tracking-widest uppercase">Action Required</span>
              {listing.rejectionReason}
            </div>
          </div>
        )}

        {pendingMajor && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-sm flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1 font-mono text-[10px] tracking-widest uppercase">Awaiting Re-approval</span>
              Name and category changes require admin verification. Other edits are live.
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Name</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Category</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="tagline" render={({ field }) => (
              <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tagline</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Description</FormLabel><FormControl><Textarea className="h-32 bg-black/40 border-white/10 rounded-xl resize-none p-4" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Address</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Phone</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Website</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="hours" render={({ field }) => (
                <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Hours</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Image URL</FormLabel><FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="offer" render={({ field }) => (
              <FormItem><FormLabel className="font-mono text-[10px] uppercase tracking-widest text-primary">Offer / Perk</FormLabel><FormControl><Input {...field} className="bg-primary/5 border-primary/30 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="flex justify-end pt-6 border-t border-white/5">
              <button 
                type="submit" 
                disabled={updateListing.isPending}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all neon-glow disabled:opacity-50"
                data-testid={`btn-save-${listing.id}`}
              >
                {updateListing.isPending ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {updateListing.isPending ? "SAVING..." : "UPDATE RECORD"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export function Owner() {
  const { data: session, isLoading, isError } = useOtaOwnerGetMe();
  const logout = useOtaOwnerLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getOtaOwnerGetMeQueryKey() });
      }
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24"><div className="animate-pulse h-64 bg-white/5 rounded-3xl max-w-4xl mx-auto" /></div>;
  }

  // Not logged in or error -> show login form
  if (isError || !session) {
    return <div className="container mx-auto px-4"><MagicLinkForm /></div>;
  }

  // Logged in dashboard
  return (
    <div className="pb-32 bg-background">
      <div className="glass-panel border-b border-white/10 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tighter mb-2">NODE <span className="text-primary neon-text">CONTROL</span></h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              SESSION: <span className="text-white">{session.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-white hover:text-destructive transition-colors px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-destructive/10 hover:border-destructive/30"
            data-testid="btn-logout"
          >
            <LogOut className="w-4 h-4" /> TERMINATE SESSION
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-5xl">
        {session.listings.length === 0 ? (
          <div className="text-center py-32 glass-panel rounded-3xl border border-white/10">
            <h3 className="text-2xl font-display font-bold mb-2">NO RECORDS FOUND</h3>
            <p className="text-muted-foreground font-mono text-sm mb-6">NO NODES ASSOCIATED WITH CURRENT SESSION.</p>
            <a href="/submit" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold neon-glow">REGISTER NEW NODE</a>
          </div>
        ) : (
          session.listings.map(listing => (
            <EditableListing key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}
