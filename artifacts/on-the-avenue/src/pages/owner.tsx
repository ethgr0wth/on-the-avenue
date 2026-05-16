import { useOtaOwnerGetMe, useOtaOwnerRequestLink, useOtaOwnerLogout, useOtaOwnerUpdateListing, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { OtaOwnerRequestLinkBody, OtaOwnerUpdateListingBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, LogOut, CheckCircle2, AlertCircle, RefreshCcw, Save, Shield } from "lucide-react";
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
        <div className="w-20 h-20 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Mail className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4 text-foreground tracking-tight">Check your email</h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          We've sent a magic login link to <strong>{form.getValues('email')}</strong>. <br />
          Click the link to securely access your listings.
        </p>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">Owner Portal</h2>
        <p className="text-muted-foreground text-sm">Enter your email to manage your listings.</p>
      </div>

      <div className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="owner@example.com" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-owner-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={requestLink.isPending}
              className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
              data-testid="button-request-link"
            >
              {requestLink.isPending ? <><RefreshCcw className="w-4 h-4 animate-spin" /> Sending link...</> : "Send Login Link"}
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
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden mb-12">
      <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border bg-muted/20">
        <div>
          <h3 className="text-3xl font-display font-bold tracking-tight text-foreground mb-1">{listing.name}</h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{listing.category}</p>
        </div>
        <div className={`px-3 py-1 text-xs uppercase tracking-wider font-bold border rounded-full flex items-center gap-2 ${getStatusColor(listing.status)}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          Status: {listing.status}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {listing.status === 'rejected' && listing.rejectionReason && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">Action Required</span>
              {listing.rejectionReason}
            </div>
          </div>
        )}

        {pendingMajor && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">Updates Submitted for Review</span>
              Name and category changes require admin verification. Other edits are live immediately.
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="tagline" render={({ field }) => (
              <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tagline</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</FormLabel><FormControl><Textarea className="h-32 bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl resize-none p-4" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Website</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="hours" render={({ field }) => (
                <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image URL</FormLabel><FormControl><Input {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="offer" render={({ field }) => (
              <FormItem><FormLabel className="text-xs font-semibold uppercase tracking-wider text-primary">Special Offer</FormLabel><FormControl><Input {...field} className="bg-primary/5 border-primary/20 rounded-xl h-12" /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="flex justify-end pt-6 border-t border-border">
              <button 
                type="submit" 
                disabled={updateListing.isPending}
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold tracking-wider uppercase hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                data-testid={`btn-save-${listing.id}`}
              >
                {updateListing.isPending ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {updateListing.isPending ? "Saving..." : "Save Changes"}
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
    return <div className="container mx-auto px-4 py-24"><div className="animate-pulse h-64 bg-muted rounded-[2rem] max-w-4xl mx-auto" /></div>;
  }

  // Not logged in or error -> show login form
  if (isError || !session) {
    return <div className="container mx-auto px-4 bg-muted/10 min-h-[80vh]"><MagicLinkForm /></div>;
  }

  // Logged in dashboard
  return (
    <div className="pb-32 bg-muted/10 min-h-screen">
      <div className="bg-card border-b border-border py-10 mb-12 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight mb-2 text-foreground">Manage Listings</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              Logged in as: <span className="text-foreground">{session.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-destructive transition-colors px-6 py-2.5 rounded-full border border-border bg-background shadow-sm hover:bg-destructive/10 hover:border-destructive/30"
            data-testid="btn-logout"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-4 max-w-5xl">
        {session.listings.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-[2rem] border border-border shadow-sm">
            <h3 className="text-2xl font-display font-bold mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-6">You don't have any businesses associated with this email address.</p>
            <a href="/submit" className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-colors">Submit a Listing</a>
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