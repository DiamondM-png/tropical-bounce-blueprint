import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { toast } from "sonner";
import {
  ArrowLeft, Crown, Download, ExternalLink, Loader2, LogOut, Mail, Receipt, ShieldCheck,
} from "lucide-react";

type Purchase = {
  id: string;
  product_id: string;
  amount: number;
  currency: string;
  created_at: string;
};

const Account = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { sub, isActive, loading: subLoading } = useSubscription();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [pLoading, setPLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => { document.title = "My Account — Tropical Bounce"; }, []);

  useEffect(() => {
    if (!user) { setPLoading(false); return; }
    (async () => {
      const { data } = await supabase
        .from("purchases")
        .select("id, product_id, amount, currency, created_at")
        .eq("user_id", user.id)
        .eq("environment", getStripeEnvironment())
        .order("created_at", { ascending: false });
      setPurchases((data as Purchase[]) || []);
      setPLoading(false);
    })();
  }, [user?.id]);

  const ownsBlueprint = purchases.some((p) => p.product_id === "pro_blueprint");

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-download-url");
      if (error || !data?.url) throw new Error(error?.message || "Could not generate download link");
      window.open(data.url, "_blank");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: {
          environment: getStripeEnvironment(),
          returnUrl: `${window.location.origin}/account`,
        },
      });
      if (error || !data?.url) throw new Error(error?.message || "Could not open billing portal");
      window.open(data.url, "_blank");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setPortalLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth?redirect=/account" replace />;
  }

  const fmtMoney = (cents: number, currency: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);

  const fmtDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { dateStyle: "medium" }) : "—";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-2">My Account</h1>
        <p className="text-muted-foreground mb-8 flex items-center gap-2">
          <Mail className="h-4 w-4" /> {user.email}
        </p>

        {/* Subscription */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" /> Upstream Pro
              </CardTitle>
              {subLoading ? (
                <Badge variant="secondary">Loading…</Badge>
              ) : isActive ? (
                <Badge className="bg-emerald-500 hover:bg-emerald-500">Active</Badge>
              ) : sub?.status === "canceled" ? (
                <Badge variant="destructive">Canceled</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
            <CardDescription>
              {isActive
                ? `Renews ${fmtDate(sub?.current_period_end ?? null)}`
                : "You don't have an active Upstream Pro subscription."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {isActive ? (
              <>
                <Button asChild variant="cta">
                  <Link to="/upstream-hub">Enter Upstream Hub</Link>
                </Button>
                <Button variant="outline" onClick={openPortal} disabled={portalLoading}>
                  {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                  Manage billing & cancel
                </Button>
              </>
            ) : sub ? (
              <Button variant="outline" onClick={openPortal} disabled={portalLoading}>
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                Reactivate / view invoices
              </Button>
            ) : (
              <Button asChild variant="cta">
                <Link to="/checkout?priceId=upstream_pro_monthly">Subscribe — $49.99/mo</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Blueprint PDF */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Inflatable Enterprise Manual
            </CardTitle>
            <CardDescription>
              {pLoading
                ? "Loading…"
                : ownsBlueprint
                  ? "You own this guide. Download anytime."
                  : "Purchase the one-time PDF blueprint to get instant access."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ownsBlueprint ? (
              <Button variant="cta" onClick={downloadPdf} disabled={downloading}>
                {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                Download PDF
              </Button>
            ) : (
              <Button asChild variant="cta">
                <Link to="/checkout?priceId=pro_blueprint_onetime">Buy — $19.99</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Purchase history */}
        {purchases.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Receipt className="h-5 w-5" /> Purchase history
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {purchases.map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium">
                        {p.product_id === "pro_blueprint" ? "Inflatable Enterprise Manual" : p.product_id}
                      </p>
                      <p className="text-muted-foreground text-xs">{fmtDate(p.created_at)}</p>
                    </div>
                    <span className="font-medium">{fmtMoney(p.amount, p.currency)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button variant="ghost" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
