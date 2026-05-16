import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOtaOwnerVerify, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2 } from "lucide-react";
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
      <div className="min-h-screen bg-muted/10 flex items-center justify-center py-20 px-4">
        <div className="bg-card p-12 rounded-[2rem] border border-border shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Link Expired</h2>
          <p className="text-muted-foreground mb-8">
            This login link is invalid or has expired. Please request a new one.
          </p>
          <Link href="/owner" className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-all">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 flex items-center justify-center py-20 px-4 text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">Verifying secure link...</h2>
        <p className="text-muted-foreground mt-2">Connecting you to your portal</p>
      </div>
    </div>
  );
}