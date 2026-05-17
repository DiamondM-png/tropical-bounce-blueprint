import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

const tier = {
  name: "Pro Blueprint",
  price: "$19.99",
  period: " PDF",
  description: "Everything you need to launch and scale like a pro — delivered as a downloadable PDF.",
  features: [
    "Full in-depth Pro Blueprint guide (PDF)",
    "Advanced financial projections template",
    "Detailed marketing plan template",
    "Premium supplier contacts",
    "Legal templates (rental agreement, waiver)",
    "Scaling, seasonal planning & customer management",
    "Downloadable templates",
    "Priority support",
  ],
  cta: "Get the Pro Blueprint",
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            One Plan. Everything You Need.
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            One-time purchase. Instant PDF delivery. All sales final — no refunds.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 bg-primary text-primary-foreground shadow-lg ring-2 ring-accent">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-heading font-bold px-4 py-1.5 rounded-full">
                <Crown className="h-4 w-4" />
                Best Value
              </span>
            </div>

            <h3 className="text-2xl font-heading font-bold mb-1">{tier.name}</h3>
            <p className="text-sm mb-4 text-primary-foreground/75">
              {tier.description}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-heading font-black">{tier.price}</span>
              <span className="text-lg text-primary-foreground/70">
                {tier.period}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-sm font-body text-primary-foreground/90">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full py-6 text-base font-heading font-bold"
              variant="ctaInverse"
              size="lg"
            >
              {tier.cta}
            </Button>

            <p className="mt-4 text-xs text-center text-primary-foreground/70 font-body">
              All sales are final. No refunds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
