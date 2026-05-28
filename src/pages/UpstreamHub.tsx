import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Calculator, FileText, Briefcase, Loader2 } from "lucide-react";
import LuxuryQuoteBuilder from "@/components/upstream/LuxuryQuoteBuilder";
import PremiumProposalGenerator from "@/components/upstream/PremiumProposalGenerator";
import B2BPitchVault from "@/components/upstream/B2BPitchVault";
import { QuoteProvider } from "@/components/upstream/QuoteContext";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

type TabKey = "quote" | "proposal" | "pitch";

const NAV: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "quote", label: "Luxury Quote Builder", icon: Calculator },
  { key: "proposal", label: "Premium Proposal", icon: FileText },
  { key: "pitch", label: "B2B Pitch Vault", icon: Briefcase },
];

const TITLES: Record<TabKey, string> = {
  quote: "Luxury Quote Builder",
  proposal: "Premium Proposal",
  pitch: "B2B Pitch Vault",
};

const UpstreamHub = () => {
  const { user, loading: authLoading } = useAuth();
  const { isActive, loading: subLoading } = useSubscription();
  const navigate = useNavigate();
  const unlocked = isActive;
  const loading = authLoading || subLoading;
  const [tab, setTab] = useState<TabKey>("quote");

  const onUpgrade = () => {
    if (!user) {
      navigate(`/auth?redirect=${encodeURIComponent("/upstream-hub")}`);
      return;
    }
    navigate(`/checkout?priceId=upstream_pro_monthly`);
  };

  return (
    <div className="upstream-dashboard" style={{ colorScheme: "dark" }}>
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside
          className="hidden md:flex md:flex-col md:w-64 shrink-0 border-r"
          style={{ background: "var(--up-surface)", borderColor: "var(--up-border)" }}
        >
          {/* Logo */}
          <div className="px-5 py-5 flex items-center gap-3 border-b" style={{ borderColor: "var(--up-border)" }}>
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center text-xl shadow-md"
              style={{ background: "linear-gradient(135deg, #2bbfb3, #1a9e93)" }}
              aria-hidden
            >
              🏝
            </div>
            <div className="font-display text-xl leading-none tracking-wider">
              UPSTREAM <span style={{ color: "var(--up-orange)" }}>PRO</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 pr-3 space-y-1">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = tab === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => setTab(n.key)}
                  className={`up-nav-item ${active ? "active" : ""}`}
                  data-state={active ? "active" : "inactive"}
                >
                  <Icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Plan badge */}
          <div className="p-4">
            <div className="up-plan-badge">
              <div className="font-display text-base tracking-wider" style={{ color: "var(--up-teal)" }}>
                UPSTREAM PRO
              </div>
              <div className="font-mono-dm text-[11px] mt-1" style={{ color: "var(--up-muted)" }}>
                $197/mo · All subscriptions final
              </div>
            </div>
            <Link
              to="/"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs font-mono-dm"
              style={{ color: "var(--up-muted)" }}
            >
              <ArrowLeft className="h-3 w-3" /> Back to site
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOPBAR */}
          <header
            className="h-16 px-6 flex items-center justify-between border-b sticky top-0 z-30"
            style={{ background: "var(--up-surface)", borderColor: "var(--up-border)" }}
          >
            <h1 className="up-topbar-title text-2xl md:text-3xl">{TITLES[tab]}</h1>
            <div className="flex items-center gap-2">
              <span className="up-badge up-badge-primary">PRO MEMBER</span>
            </div>
          </header>

          {/* Mobile tabs */}
          <div className="md:hidden flex gap-1 p-3 border-b overflow-x-auto" style={{ borderColor: "var(--up-border)" }}>
            {NAV.map((n) => {
              const active = tab === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => setTab(n.key)}
                  className={`up-nav-item ${active ? "active" : ""} whitespace-nowrap`}
                  data-state={active ? "active" : "inactive"}
                >
                  <n.icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </button>
              );
            })}
          </div>

          <main className="flex-1 p-6 md:p-8">
            <QuoteProvider>
              <div className={unlocked ? "" : "pointer-events-none select-none blur-sm opacity-60"}>
                {tab === "quote" && <LuxuryQuoteBuilder />}
                {tab === "proposal" && <PremiumProposalGenerator />}
                {tab === "pitch" && <B2BPitchVault />}
              </div>
            </QuoteProvider>
          </main>
        </div>
      </div>

      {!unlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-md" style={{ background: "rgba(10,22,40,0.75)" }} />
          <div
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{
              background: "var(--up-card)",
              border: "1px solid rgba(43,191,179,0.3)",
              boxShadow: "0 0 60px -10px rgba(43,191,179,0.35)",
            }}
          >
            <div className="flex justify-center mb-5">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--up-teal-dim)", border: "1px solid rgba(43,191,179,0.4)" }}
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--up-teal)" }} />
                ) : (
                  <Lock className="h-6 w-6" style={{ color: "var(--up-teal)" }} />
                )}
              </div>
            </div>
            <h2 className="font-display text-2xl text-center mb-3" style={{ color: "var(--up-teal)" }}>
              UPSTREAM PRO REQUIRED
            </h2>
            <p className="text-center text-sm leading-relaxed mb-6" style={{ color: "var(--up-body)" }}>
              This section requires an active Upstream Pro Subscription. Upgrade to unlock luxury pricing engines and
              B2B proposal tools.
            </p>
            <Button
              onClick={onUpgrade}
              disabled={loading}
              className="w-full up-btn-primary rounded-full py-6 text-base"
            >
              Upgrade to Upstream Pro · $49.99/mo
            </Button>
            <Link
              to="/"
              className="block text-center text-xs mt-4 font-mono-dm"
              style={{ color: "var(--up-muted)" }}
            >
              ← Back to site
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpstreamHub;
