import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOtaOwnerVerify, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export function OwnerVerify() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const verifyMutation = useOtaOwnerVerify();
  
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyMutation.mutate(
        { data: { token } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getOtaOwnerGetMeQueryKey() });
            setLocation('/owner');
          }
        }
      );
    }
  }, [token]);

  if (!token || verifyMutation.isError) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif mb-4">Link Invalid or Expired</h2>
        <p className="text-muted-foreground mb-8">
          The magic link is no longer valid. Please request a new one to access your dashboard.
        </p>
        <Link href="/owner" className="inline-block bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors">
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-6" />
      <h2 className="text-2xl font-serif">Verifying your identity...</h2>
    </div>
  );
}