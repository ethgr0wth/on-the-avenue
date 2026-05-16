import { useOtaAdminLogin, getOtaAdminGetMeQueryKey } from "@workspace/api-client-react";
import { OtaAdminLoginBody } from "@workspace/api-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Lock } from "lucide-react";
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
            title: "Authentication failed",
            description: "Incorrect password. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif">Admin Access</h1>
        </div>

        <div className="bg-card p-8 border border-border/60 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} data-testid="input-admin-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button 
                type="submit" 
                disabled={login.isPending}
                className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors disabled:opacity-50"
                data-testid="button-admin-login"
              >
                {login.isPending ? "Authenticating..." : "Enter"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}