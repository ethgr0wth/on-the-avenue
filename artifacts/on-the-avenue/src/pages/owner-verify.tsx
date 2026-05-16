import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOtaOwnerVerify, getOtaOwnerGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw, AlertCircle, Fingerprint } from "lucide-react";
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
        <div className="w-20 h-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)]">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4 text-white">AUTH <span className="text-destructive neon-text">FAILED</span></h2>
        <p className="text-muted-foreground mb-8 font-mono text-sm">
          TOKEN INVALID OR EXPIRED. PLEASE REQUEST A NEW DISPATCH.
        </p>
        <Link href="/owner" className="inline-block bg-white text-black px-8 py-4 rounded-full text-xs font-bold transition-all hover:scale-105">
          REQUEST NEW TOKEN
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-40 text-center flex flex-col items-center">
      <div className="w-24 h-24 relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-primary/50 rounded-full animate-spin reverse-spin"></div>
        <Fingerprint className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <h2 className="text-2xl font-display font-bold text-white tracking-widest">VERIFYING SIGNATURE...</h2>
      <p className="text-primary font-mono text-xs mt-4">ESTABLISHING SECURE CONNECTION</p>
    </div>
  );
}
