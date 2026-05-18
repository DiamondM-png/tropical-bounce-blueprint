import { Check, Crown, Lock } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";

const startupTier = {
  name: "The Startup Blueprint",
  price: "$19.99",
  period: "one-time",
  description:
    "The complete launch playbook for operators going local. Buy once, own forever.",
  features: [
    "Comprehensive 25-page PDF Guide",
    "Asset Selection Criteria & vendor shortlist",
    "Local Launch Logistics (LLC, insurance, permits)",
    "Pricing & booking workflow templates",
    "Rental agreement & liability waiver",
    "Instant download · all sales final",
  ],
  cta: "Buy the Blueprint",
  priceId: "pro_blueprint_onetime",
};

const proTier = {
  name: "The Upstream Pro Platform",
  price: "$49.99",
  period: "/month",
  description:
    "The cloud platform for operators chasing estates, corporate, and luxury weddings.",
  features: [
    "Interactive Upstream Hub (full app access)",
    "Luxury Quote Architect — premium pricing engine",
    "B2B Proposal Generator with print-to-PDF",
    "Pitch Vault — Elite Planner & Country Club templates",
    "Midnight Breakdown & Weather Protection logic",
    "Cancel anytime",
  ],
  cta: "Start Upstream Pro",
  priceId: "upstream_pro_monthly",
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            Choose Your Entry Path
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Launch Local. Scale Upstream.
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Two routes. Both built for serious operators. All sales final — no refunds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Card 1 — Startup Blueprint */}
          <div className="relative rounded-2xl p-8 bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-heading font-bold text-card-foreground mb-1">
              {startupTier.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{startupTier.description}</p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-heading font-black text-foreground">
                {startupTier.price}
              </span>
              <span className="text-lg text-muted-foreground">{startupTier.period}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {startupTier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-sm font-body text-card-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              priceId={startupTier.priceId}
              size="lg"
              variant="cta"
              className="w-full py-6 text-base font-heading font-bold"
            >
              {startupTier.cta}
            </CheckoutButton>
            <p className="mt-4 text-xs text-center text-muted-foreground font-body">
              One-time payment · Instant PDF · All sales final
            </p>
          </div>

          {/* Card 2 — Upstream Pro (dark/gold) */}
          <div className="relative rounded-2xl p-8 bg-slate-950 text-slate-100 border-2 border-amber-500 shadow-2xl flex flex-col overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-sm font-heading font-bold px-4 py-1.5 rounded-full shadow-lg">
                <Crown className="h-4 w-4" />
                Scale Up
              </span>
            </div>

            <h3 className="relative text-2xl font-heading font-bold mb-1 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              {proTier.name}
            </h3>
            <p className="relative text-sm text-slate-400 mb-4">{proTier.description}</p>

            <div className="relative flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-heading font-black text-slate-50">
                {proTier.price}
              </span>
              <span className="text-lg text-slate-400">{proTier.period}</span>
            </div>

            <ul className="relative space-y-3 mb-8 flex-1">
              {proTier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-400" />
                  <span className="text-sm font-body text-slate-200">{f}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              priceId={proTier.priceId}
              size="lg"
              className="relative w-full py-6 text-base font-heading font-bold bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 rounded-full shadow-lg"
            >
              <Lock className="h-4 w-4 mr-1" />
              {proTier.cta}
            </CheckoutButton>
            <p className="relative mt-4 text-xs text-center text-slate-500 font-body">
              Recurring subscription · Cancel anytime · Unlocks Upstream Hub
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
