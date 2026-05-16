import { useOtaOwnerSubmit } from "@workspace/api-client-react";
import { OtaOwnerSubmitBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Store, Zap } from "lucide-react";
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
        <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_-10px_rgba(0,240,255,0.5)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4 tracking-tight text-white">NODE <span className="text-primary neon-text">INITIALIZED</span></h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
          Submission successful. An authentication token has been dispatched to <strong className="text-white font-mono">{form.getValues('ownerEmail')}</strong>. Access your mail client to verify.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tighter">ADD TO <span className="text-primary neon-text">GRID</span></h1>
          <p className="text-muted-foreground text-lg font-light">
            Register a new node on the avenue directory. Management access is tied to the provided email via magic link.
          </p>
        </div>

        <div className="glass-panel border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 relative z-10">
              
              <div className="space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest border-b border-primary/20 pb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> PRIMARY METADATA
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Entity Name <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Mint on the Avenue" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-name" />
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
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Sector Category <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Salon & Spa" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-category" />
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
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Auth Email <span className="text-primary">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="sysadmin@example.com" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-email" />
                      </FormControl>
                      <p className="text-[10px] font-mono text-muted-foreground/60 mt-2">ENCRYPTED. USED FOR MAGIC LINK AUTHENTICATION ONLY.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-4">
                <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest border-b border-primary/20 pb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> SECONDARY METADATA (OPTIONAL)
                </h3>
                
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Tagline</FormLabel>
                      <FormControl>
                        <Input placeholder="Short summary" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-tagline" />
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
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Full Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detailed information..." className="h-32 resize-none bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl p-4" {...field} data-testid="input-submit-description" />
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
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Physical Coordinates</FormLabel>
                        <FormControl>
                          <Input placeholder="123 The Avenue" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-address" />
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
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Comm Link (Phone)</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-phone" />
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
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Network Address (Web)</FormLabel>
                        <FormControl>
                          <Input placeholder="mintontheavenue.com" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-website" />
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
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Operating Cycles (Hours)</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon-Sat 9am-6pm" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-hours" />
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
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Visual Asset URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12" data-testid="input-submit-image" />
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
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Active Offer</FormLabel>
                      <FormControl>
                        <Input placeholder="10% off initialization" {...field} className="bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12 border-primary/30" data-testid="input-submit-offer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={submitListing.isPending}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all neon-glow disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {submitListing.isPending ? "UPLOADING TO GRID..." : "INITIALIZE NODE"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
