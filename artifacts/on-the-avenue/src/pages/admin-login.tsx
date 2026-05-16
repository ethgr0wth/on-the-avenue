import { useOtaAdminLogin, getOtaAdminGetMeQueryKey } from "@workspace/api-client-react";
import { OtaAdminLoginBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, ShieldAlert } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const login = useOtaAdminLogin();

  const form = useForm<z.infer<typeof OtaAdminLoginBody>>({
    resolver: zodResolver(OtaAdminLoginBody),
    defaultValues: { password: "" }
  });

  const onSubmit = (data: z.infer<typeof OtaAdminLoginBody>) => {
    login.mutate(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getOtaAdminGetMeQueryKey() });
          setLocation('/admin/dashboard');
        },
        onError: () => {
          toast({
            title: "ACCESS DENIED",
            description: "INVALID SECURITY CLEARANCE.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tighter mb-2">SYS<span className="text-primary neon-text">ADMIN</span></h1>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3 text-destructive" /> RESTRICTED SECTOR
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Clearance Code</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-black/60 border-white/10 focus-visible:border-primary focus-visible:ring-primary rounded-xl h-12 text-center tracking-[0.5em] font-mono text-lg text-primary placeholder:text-muted-foreground/30" data-testid="input-admin-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button 
                type="submit" 
                disabled={login.isPending}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all neon-glow disabled:opacity-50 mt-4"
                data-testid="button-admin-login"
              >
                {login.isPending ? "VERIFYING..." : "AUTHENTICATE"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
