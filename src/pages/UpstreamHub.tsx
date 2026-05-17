import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Crown, ArrowLeft, Calculator, FileText, Briefcase } from "lucide-react";
import LuxuryQuoteBuilder from "@/components/upstream/LuxuryQuoteBuilder";
import PremiumProposalGenerator from "@/components/upstream/PremiumProposalGenerator";
import B2BPitchVault from "@/components/upstream/B2BPitchVault";
import { QuoteProvider } from "@/components/upstream/QuoteContext";

const UNLOCK_CODE = "UPSTREAM2026";
const STORAGE_KEY = "upstream-hub-unlocked";

const UpstreamHub = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") setUnlocked(true);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === UNLOCK_CODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError("Invalid access code. Contact your account manager.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ colorScheme: "dark" }}>
      {/* Ambient gold glow */}
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
              Premium
            </span>
          </div>
        </div>
      </header>

      <main className="relative container py-10">
        {!unlocked ? (
          <div className="max-w-md mx-auto mt-16">
            <div className="rounded-2xl border border-amber-500/20 bg-slate-900/60 backdrop-blur p-8 shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <h1 className="text-2xl font-heading font-bold text-center text-slate-50 mb-2">
                Locked Premium Module
              </h1>
              <p className="text-center text-slate-400 text-sm mb-6">
                Upstream Hub is reserved for high-tier operators. Enter your access code to unlock luxury pricing, premium proposals, and the B2B pitch vault.
              </p>
              <form onSubmit={handleUnlock} className="space-y-3">
                <Input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(""); }}
                  placeholder="Access code"
                  className="bg-slate-950 border-amber-500/30 text-slate-100 placeholder:text-slate-500 focus-visible:ring-amber-500"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold"
                >
                  Unlock Upstream Hub
                </Button>
                <p className="text-[11px] text-center text-slate-500 pt-2">
                  Demo access code: <span className="text-amber-400/80 font-mono">UPSTREAM2026</span>
                </p>
              </form>
            </div>
          </div>
        ) : (
          <QuoteProvider>
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
                <TabsTrigger
                  value="quote"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2"
                >
                  <Calculator className="h-4 w-4" /> Luxury Quote Builder
                </TabsTrigger>
                <TabsTrigger
                  value="proposal"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2"
                >
                  <FileText className="h-4 w-4" /> Premium Proposal
                </TabsTrigger>
                <TabsTrigger
                  value="pitch"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-slate-950 text-slate-300 gap-2"
                >
                  <Briefcase className="h-4 w-4" /> B2B Pitch Vault
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quote" className="mt-6">
                <LuxuryQuoteBuilder />
              </TabsContent>
              <TabsContent value="proposal" className="mt-6">
                <PremiumProposalGenerator />
              </TabsContent>
              <TabsContent value="pitch" className="mt-6">
                <B2BPitchVault />
              </TabsContent>
            </Tabs>
          </QuoteProvider>
        )}
      </main>
    </div>
  );
};

export default UpstreamHub;
