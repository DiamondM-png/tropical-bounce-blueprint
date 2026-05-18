import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { CheckCircle2, Download, Loader2, Crown } from "lucide-react";

const CheckoutSuccess = () => {
  const { user, loading: authLoading } = useAuth();
  const [params] = useSearchParams();
  const priceId = params.get("price") || "";
  const isSubscription = priceId === "upstream_pro_monthly";
  const { isActive, loading: subLoading, refetch } = useSubscription();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"waiting" | "ready" | "error">("waiting");
  const [errMsg, setErrMsg] = useState("");

  // Poll for one-time PDF purchase row (webhook arrives asynchronously)
  useEffect(() => {
    if (authLoading || !user || isSubscription) return;
    let cancelled = false;
    let attempts = 0;

    const tryFetch = async (): Promise<void> => {
      if (cancelled) return;
      attempts++;
      const { data, error } = await supabase.functions.invoke("get-download-url");
      if (cancelled) return;

      if (!error && data?.url) {
        setPdfUrl(data.url);
        setStatus("ready");
        return;
      }
      if (attempts >= 20) {
        setStatus("error");
        setErrMsg("Still processing your purchase. Refresh in a moment or visit your account page.");
        return;
      }
      setTimeout(tryFetch, 2000);
    };

    tryFetch();
    return () => { cancelled = true; };
  }, [authLoading, user, isSubscription]);

  // Poll for subscription activation
  useEffect(() => {
    if (authLoading || !user || !isSubscription) return;
    if (isActive) return;
    let cancelled = false;
    let attempts = 0;
    const tick = async () => {
      if (cancelled) return;
      attempts++;
      await refetch();
      if (attempts >= 20) return;
      setTimeout(tick, 2000);
    };
    tick();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user, isSubscription, isActive]);

  if (isSubscription) {
    const waiting = subLoading || !isActive;
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-slate-900 border-amber-500/30 text-slate-100">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3"><Crown className="h-12 w-12 text-amber-400" /></div>
            <CardTitle className="font-heading bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Welcome to Upstream Pro
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {waiting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-300" />
                <p className="text-slate-300 text-sm">Activating your subscription… this usually takes a few seconds.</p>
              </>
            ) : (
              <>
                <p className="text-slate-300">Your subscription is active. Unlock the full hub below.</p>
                <Button asChild className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 font-bold">
                  <Link to="/upstream-hub">Enter Upstream Hub →</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-slate-400 hover:text-amber-300">
                  <Link to="/account">View account</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3"><CheckCircle2 className="h-12 w-12 text-primary" /></div>
          <CardTitle className="font-heading">Payment Successful</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "waiting" && (
            <>
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Preparing your download…</p>
            </>
          )}
          {status === "ready" && pdfUrl && (
            <>
              <p className="text-sm text-muted-foreground">Your Inflatable Enterprise Manual is ready.</p>
              <Button asChild size="lg" variant="cta" className="w-full">
                <a href={pdfUrl} download>
                  <Download className="h-4 w-4 mr-2" /> Download Inflatable Enterprise Manual PDF
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Link expires in 1 hour. You can download again anytime from your <Link to="/account" className="underline">account page</Link>.
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <p className="text-sm text-destructive">{errMsg}</p>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} className="flex-1">Refresh</Button>
                <Button asChild variant="outline" className="flex-1"><Link to="/account">My account</Link></Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
