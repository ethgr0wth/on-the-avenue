import { useOtaOwnerSubmit } from "@workspace/api-client-react";
import { OtaOwnerSubmitBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Store } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Submit() {
  const [submitted, setSubmitted] = useState(false);
  const submitListing = useOtaOwnerSubmit();

  const form = useForm<z.infer<typeof OtaOwnerSubmitBody>>({
    resolver: zodResolver(OtaOwnerSubmitBody),
    defaultValues: {
      name: "",
      category: "",
      ownerEmail: "",
      tagline: "",
      description: "",
      address: "",
      phone: "",
      website: "",
      hours: "",
      imageUrl: "",
      offer: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OtaOwnerSubmitBody>) => {
    submitListing.mutate(
      { data },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  if (submitted) {
    return (
      <div className="py-24 container mx-auto px-4 max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif mb-4">Submission Received</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Thank you for contributing to the avenue. We have sent a magic link to <strong>{form.getValues('ownerEmail')}</strong>. Please check your email to manage your listing.
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 pb-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <Store className="w-8 h-8 mx-auto text-primary mb-6 opacity-80" />
          <h1 className="text-4xl font-serif mb-4">Submit a Place</h1>
          <p className="text-muted-foreground">
            Join the curated collection of businesses on the avenue. 
            Once approved, you can manage your listing via email.
          </p>
        </div>

        <div className="bg-card border border-border/60 p-8 md:p-12 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">The Essentials</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Mint on the Avenue" {...field} data-testid="input-submit-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Salon & Spa" {...field} data-testid="input-submit-category" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ownerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Email <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="owner@example.com" {...field} data-testid="input-submit-email" />
                      </FormControl>
                      <p className="text-[11px] text-muted-foreground mt-1.5">We will send a magic link here so you can edit your listing later. Not displayed publicly.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">The Details (Optional)</h3>
                
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline</FormLabel>
                      <FormControl>
                        <Input placeholder="A brief, catchy summary" {...field} data-testid="input-submit-tagline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell the neighborhood what makes your place special..." className="h-32 resize-none" {...field} data-testid="input-submit-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 The Avenue" {...field} data-testid="input-submit-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} data-testid="input-submit-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="mintontheavenue.com" {...field} data-testid="input-submit-website" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon-Sat 9am-6pm" {...field} data-testid="input-submit-hours" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} data-testid="input-submit-image" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Offer / Perk</FormLabel>
                      <FormControl>
                        <Input placeholder="10% off for new neighbors" {...field} data-testid="input-submit-offer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={submitListing.isPending}
                  className="w-full bg-foreground text-background py-4 uppercase tracking-widest text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {submitListing.isPending ? "Submitting..." : "Submit Listing"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}