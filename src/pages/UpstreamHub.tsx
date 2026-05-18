import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Lock, Crown, ArrowLeft, Calculator, FileText, Briefcase, Loader2 } from "lucide-react";
import LuxuryQuoteBuilder from "@/components/upstream/LuxuryQuoteBuilder";
import PremiumProposalGenerator from "@/components/upstream/PremiumProposalGenerator";
import B2BPitchVault from "@/components/upstream/B2BPitchVault";
import { QuoteProvider } from "@/components/upstream/QuoteContext";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";

const UpstreamHub = () => {
  const { user, loading: authLoading } = useAuth();
  const { isActive, loading: subLoading } = useSubscription();
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();
  const navigate = useNavigate();
  const unlocked = isActive;
  const loading = authLoading || subLoading;

  const onUpgrade = () => {
    if (!user) {
      navigate(`/auth?redirect=${encodeURIComponent("/upstream-hub")}`);
      return;
    }
    openCheckout({
      priceId: "upstream_pro_monthly",
      userId: user.id,
      customerEmail: user.email,
      successUrl: `${window.location.origin}/checkout/success?price=upstream_pro_monthly`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ colorScheme: "dark" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-600/5 blur-3xl" />
      </div>

      <header className="relative border-b border-amber-500/20 bg-slate-950/80 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <span className="font-heading font-extrabold tracking-tight text-lg bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              UPSTREAM HUB
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/60 border border-amber-400/30 rounded px-1.5 py-0.5 ml-1">
              Pro
            </span>
          </div>
        </div>
      </header>

      <main className="relative container py-10">
        <QuoteProvider>
          <div className={unlocked ? "" : "pointer-events-none select-none blur-sm opacity-60"}>
            <div className="mb-8">
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Upstream Hub
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl">
                Premium toolkit for estate, corporate, and luxury wedding bookings. Build high-ticket quotes, generate elite proposals, and pitch the right buyers.
              </p>
            </div>

            <Tabs defaultValue="quote" className="w-full">
              <TabsList className="bg-slate-900/80 border border-amber-500/20 p-1 h-auto flex-wrap">
                <TabsTrigger value="quote" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2">
                  <Calculator className="h-4 w-4" /> Luxury Quote Builder
                </TabsTrigger>
                <TabsTrigger value="proposal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2">
                  <FileText className="h-4 w-4" /> Premium Proposal
                </TabsTrigger>
                <TabsTrigger value="pitch" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2">
                  <Briefcase className="h-4 w-4" /> B2B Pitch Vault
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quote" className="mt-6"><LuxuryQuoteBuilder /></TabsContent>
              <TabsContent value="proposal" className="mt-6"><PremiumProposalGenerator /></TabsContent>
              <TabsContent value="pitch" className="mt-6"><B2BPitchVault /></TabsContent>
            </Tabs>
          </div>
        </QuoteProvider>
      </main>

      {!unlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" />
          <div className="relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_-10px_rgba(245,158,11,0.35)] p-8">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 via-transparent to-amber-600/10 pointer-events-none" />
            <div className="relative">
              <div className="flex justify-center mb-5">
                <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
                  {loading ? <Loader2 className="h-6 w-6 text-amber-300 animate-spin" /> : <Lock className="h-6 w-6 text-amber-300" />}
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-center bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent mb-3">
                Upstream Pro Required
              </h2>
              <p className="text-center text-slate-300 text-sm leading-relaxed mb-6">
                This section requires an active Upstream Pro Subscription. Upgrade to unlock luxury pricing engines and B2B proposal tools.
              </p>
              <Button
                onClick={onUpgrade}
                disabled={loading || checkoutLoading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold rounded-full py-6"
              >
                {checkoutLoading ? "Opening checkout…" : "Upgrade to Upstream Pro · $49.99/mo"}
              </Button>
              <Link
                to="/"
                className="block text-center text-xs text-slate-400 hover:text-amber-300 mt-4 transition-colors"
              >
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpstreamHub;
