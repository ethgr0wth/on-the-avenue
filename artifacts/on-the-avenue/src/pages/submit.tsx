import { useOtaOwnerSubmit } from "@workspace/api-client-react";
import { OtaOwnerSubmitBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Store, FileText } from "lucide-react";
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
      <div className="py-24 container mx-auto px-4 max-w-lg text-center bg-muted/10 min-h-screen">
        <div className="w-20 h-20 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4 tracking-tight text-foreground">Submission Received</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
          Your listing has been submitted for review. A verification email has been sent to <strong>{form.getValues('ownerEmail')}</strong>. Please check your inbox to manage this listing.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24 pb-32 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-foreground">Submit a Listing</h1>
          <p className="text-muted-foreground text-lg font-light">
            Add your business to the Park Avenue directory.
          </p>
        </div>

        <div className="bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" /> Essential Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Name <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Mint on the Avenue" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-name" />
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
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Salon & Spa" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-category" />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Email <span className="text-primary">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="owner@example.com" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-email" />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-2">This email will be used to manage your listing.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border pb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" /> Additional Details
                </h3>
                
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tagline</FormLabel>
                      <FormControl>
                        <Input placeholder="A brief summary of your business" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-tagline" />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell visitors what makes your business special..." className="h-32 resize-none bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl p-4" {...field} data-testid="input-submit-description" />
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
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Park Avenue" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-address" />
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
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(407) 555-0123" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-phone" />
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
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Website</FormLabel>
                        <FormControl>
                          <Input placeholder="mintontheavenue.com" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-website" />
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
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours of Operation</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon-Sat 9am-6pm" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-hours" />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Photo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-image" />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Special Offer (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="10% off your first visit" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-12" data-testid="input-submit-offer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-8 mt-8 border-t border-border">
                <button 
                  type="submit" 
                  disabled={submitListing.isPending}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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