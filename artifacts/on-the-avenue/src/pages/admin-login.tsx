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
            title: "Access Denied",
            description: "Incorrect password. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20 px-4 bg-muted/10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-2 text-foreground">Admin Access</h1>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Restricted Area
          </p>
        </div>

        <div className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-background border-border focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl h-14 text-center tracking-[0.3em] font-medium text-lg text-foreground placeholder:text-muted-foreground/30 shadow-sm" data-testid="input-admin-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button 
                type="submit" 
                disabled={login.isPending}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm hover:shadow disabled:opacity-50 mt-4"
                data-testid="button-admin-login"
              >
                {login.isPending ? "Authenticating..." : "Sign In"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}