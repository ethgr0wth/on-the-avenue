import { useOtaOwnerGetMe, useOtaOwnerRequestLink, useOtaOwnerLogout, useOtaOwnerUpdateListing, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { OtaOwnerRequestLinkBody, OtaOwnerUpdateListingBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, LogOut, CheckCircle2, AlertCircle } from "lucide-react";
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
      <div className="py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif mb-4">Check Your Email</h2>
        <p className="text-muted-foreground leading-relaxed">
          We've sent a magic link to <strong>{form.getValues('email')}</strong>. <br />
          Click the link in the email to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-md mx-auto">
      <div className="text-center mb-10">
        <Mail className="w-8 h-8 mx-auto text-primary mb-6 opacity-80" />
        <h2 className="text-3xl font-serif mb-3">Owner Access</h2>
        <p className="text-muted-foreground text-sm">Enter the email associated with your listing to receive a login link.</p>
      </div>

      <div className="bg-card p-8 border border-border/60">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="owner@example.com" {...field} data-testid="input-owner-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={requestLink.isPending}
              className="w-full bg-foreground text-background py-3 uppercase tracking-widest text-xs font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              data-testid="button-request-link"
            >
              {requestLink.isPending ? "Sending..." : "Send Magic Link"}
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
      case 'approved': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border/60 p-8 shadow-sm">
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-border/40">
        <div>
          <h3 className="text-2xl font-serif">{listing.name}</h3>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">{listing.category}</p>
        </div>
        <div className={`px-3 py-1 text-xs uppercase tracking-widest font-medium border ${getStatusColor(listing.status)}`}>
          {listing.status}
        </div>
      </div>

      {listing.status === 'rejected' && listing.rejectionReason && (
        <div className="mb-8 p-4 bg-destructive/5 border border-destructive/20 text-destructive text-sm flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-1">Listing requires updates</span>
            {listing.rejectionReason}
          </div>
        </div>
      )}

      {pendingMajor && (
        <div className="mb-8 p-4 bg-amber-500/5 border border-amber-500/20 text-amber-800 text-sm flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            Name and category changes need admin re-approval. Other edits are already live.
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <FormField control={form.control} name="tagline" render={({ field }) => (
            <FormItem><FormLabel>Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="h-32" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="hours" render={({ field }) => (
              <FormItem><FormLabel>Hours</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <FormField control={form.control} name="offer" render={({ field }) => (
            <FormItem><FormLabel>Offer / Perk</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <div className="flex justify-end pt-4 border-t border-border/40">
            <button 
              type="submit" 
              disabled={updateListing.isPending}
              className="bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              data-testid={`btn-save-${listing.id}`}
            >
              {updateListing.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Form>
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
    return <div className="container mx-auto px-4 py-24"><div className="animate-pulse h-64 bg-muted max-w-3xl mx-auto" /></div>;
  }

  // Not logged in or error -> show login form
  if (isError || !session) {
    return <div className="container mx-auto px-4"><MagicLinkForm /></div>;
  }

  // Logged in dashboard
  return (
    <div className="pb-32">
      <div className="bg-muted/30 border-b border-border py-12">
        <div className="container mx-auto px-4 max-w-4xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif mb-1">Owner Dashboard</h1>
            <p className="text-sm text-muted-foreground">{session.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 border border-border bg-card"
            data-testid="btn-logout"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
        {session.listings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border">
            <p className="text-muted-foreground mb-4">No listings found for your email.</p>
            <a href="/submit" className="text-primary hover:underline text-sm uppercase tracking-widest">Submit a new listing</a>
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