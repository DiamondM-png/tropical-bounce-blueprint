import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

const tiers = [
  {
    name: "Blueprint Access",
    price: "$9.99",
    period: " PDF",
    description: "Perfect for getting started with your bounce house business.",
    features: [
      "25-page Tropical Bounce Blueprint",
      "Interactive business checklists",
      "Basic business plan template",
      "Curated resource library",
      "Email support",
    ],
    cta: "Start Blueprint Access",
    popular: false,
  },
  {
    name: "Pro Blueprint",
    price: "$49.99",
    period: " - In-depth physical guide mailed via USPS",
    description: "Everything you need to launch and scale like a pro.",
    features: [
      "Everything in Blueprint Access",
      "Advanced financial projections template",
      "Marketing plan template",
      "Premium supplier contacts",
      "Downloadable guide & templates",
      "Highlight & notes on guide",
      "Priority support",
    ],
    cta: "Go Pro Now",
    popular: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Start with what you need. Upgrade anytime. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.popular
                  ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-accent"
                  : "bg-card text-card-foreground shadow-card border border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-heading font-bold px-4 py-1.5 rounded-full">
                    <Crown className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-heading font-bold mb-1">{tier.name}</h3>
              <p className={`text-sm mb-4 ${tier.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                {tier.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-heading font-black">{tier.price}</span>
                <span className={`text-lg ${tier.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${tier.popular ? "text-accent" : "text-primary"}`} />
                    <span className={`text-sm font-body ${tier.popular ? "text-primary-foreground/90" : ""}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-6 text-base font-heading font-bold"
                variant={tier.popular ? "ctaInverse" : "cta"}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
