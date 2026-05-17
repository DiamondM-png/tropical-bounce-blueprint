import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Megaphone,
  Building2,
  Rocket,
  ScrollText,
  CalendarDays,
  HeartHandshake,
  Lightbulb,
  BookOpen,
} from "lucide-react";

const coreContent = [
  "Introduction · Market Research · Business Registration · Insurance",
  "Equipment Sourcing · Pricing Strategies · Marketing Basics",
  "Operations · Getting Your First Customers",
  "All checklists, business plan template, and curated resource links",
];

const proSections = [
  {
    icon: TrendingUp,
    title: "Advanced Financial Projections",
    summary: "Forecast, plan, and scale with confidence",
    points: [
      "12-month revenue forecasting model with seasonality factors built in.",
      "Expense tracking spreadsheet covering insurance, maintenance, fuel, and storage.",
      "Break-even analysis: know exactly how many bookings cover your costs.",
      "ROI calculator for every new bounce house unit you consider purchasing.",
      "Cash flow templates for managing deposits and seasonal revenue swings.",
    ],
  },
  {
    icon: Megaphone,
    title: "Detailed Marketing Plan",
    summary: "A complete brand and growth playbook",
    points: [
      "Brand identity guide: colors, fonts, voice, and logo direction.",
      "12-month social media content calendar with post templates.",
      "Paid advertising playbook for Facebook, Instagram, and Google Ads.",
      "Local SEO strategy to rank #1 for 'bounce house rental near me'.",
      "Partnership scripts for venues, planners, and photographers.",
    ],
  },
  {
    icon: Building2,
    title: "Premium Supplier Directory",
    summary: "Vetted contacts with negotiated pricing",
    points: [
      "Direct contacts at top inflatable manufacturers with reader-only pricing.",
      "Equipment comparison charts: durability, capacity, profit margin per unit.",
      "Maintenance and repair specialists across all major US regions.",
      "Bulk purchasing strategies for tables, chairs, and concession add-ons.",
    ],
  },
  {
    icon: Rocket,
    title: "Scaling Your Business",
    summary: "Grow from side hustle to full-time operation",
    points: [
      "Inventory expansion roadmap: when and what to buy next.",
      "Hiring your first delivery/setup crew (and how to pay them legally).",
      "Expanding service areas without sacrificing route efficiency.",
      "Adding complementary services: tables, chairs, generators, concessions.",
      "Building systems so the business runs without you on weekends.",
    ],
  },
  {
    icon: ScrollText,
    title: "Legal Templates",
    summary: "Attorney-reviewed documents ready to use",
    points: [
      "Full rental agreement template with damage and late-return clauses.",
      "Liability waiver template that meets requirements in all 50 states.",
      "Terms of service for your website and online booking system.",
      "Independent contractor agreement for delivery crew.",
    ],
  },
  {
    icon: CalendarDays,
    title: "Seasonal Business Planning",
    summary: "Make money 12 months a year",
    points: [
      "Peak season prep checklist (Feb–March) to maximize April–October revenue.",
      "Off-season revenue strategies: corporate events, indoor venues, schools.",
      "Holiday-themed packages: Halloween, Christmas, Easter, July 4th.",
      "Winterizing equipment and storage best practices.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Customer Management",
    summary: "Turn one-time renters into lifelong customers",
    points: [
      "CRM recommendations and setup walkthroughs (free and paid).",
      "Pre-event and post-event follow-up email/text templates.",
      "Loyalty program structures that drive 30%+ repeat bookings.",
      "Scripts for handling complaints, cancellations, and damage claims.",
    ],
  },
];

const proTips = [
  "Buy your second unit only after you've turned away 10+ bookings — demand-driven growth beats hopeful inventory.",
  "Charge a 25% non-refundable deposit. It cuts no-shows by ~80% and funds your next unit.",
  "Schools and churches book months in advance and rarely cancel — pursue them aggressively in your first year.",
  "Photograph every setup. Your social feed is your portfolio, and parents share posts they're tagged in.",
];

const ProGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Button variant="ctaInverse" size="sm" asChild>
            <Link to="/#pricing">Get Pro Blueprint — $19.99</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-accent text-secondary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-foreground/10 text-sm font-body mb-4">
            <Sparkles className="h-4 w-4" />
            Pro Blueprint · Instant PDF Download
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            The Pro Bounce Business Blueprint
          </h1>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto font-body">
            The complete guide — core chapters plus advanced financials, premium supplier
            access, legal templates, and the systems you need to scale.
          </p>
        </div>
      </section>

      {/* Core content recap */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="font-heading">Core Chapters Included</CardTitle>
              </div>
              <CardDescription>
                The full foundational content covering everything you need to launch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {coreContent.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5 shrink-0">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pro sections */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-7 w-7 text-secondary" />
            <h2 className="font-heading font-bold text-3xl">What Pro Adds</h2>
          </div>
          <p className="text-muted-foreground mb-8 font-body">
            Advanced systems, templates, and insider access for serious operators.
          </p>
          <div className="space-y-6">
            {proSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-heading font-bold rounded-bl-lg">
                    PRO
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10 text-secondary shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="font-heading">{section.title}</CardTitle>
                        <CardDescription className="mt-1">{section.summary}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 ml-2">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="text-secondary mt-1.5 shrink-0">●</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="h-7 w-7 text-secondary" />
            <h2 className="font-heading font-bold text-3xl">Pro Tips & Insider Annotations</h2>
          </div>
          <p className="text-muted-foreground mb-8 font-body">
            A sample of the highlighted notes you'll find throughout the guide.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {proTips.map((tip, i) => (
              <Card key={i} className="border-l-4 border-l-secondary bg-secondary/5">
                <CardContent className="pt-6">
                  <p className="text-xs uppercase tracking-widest text-secondary font-heading font-bold mb-2">
                    Pro Tip #{i + 1}
                  </p>
                  <p className="text-sm font-body">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary to-accent text-secondary-foreground">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Get the Pro Blueprint instantly
          </h2>
          <p className="text-secondary-foreground/80 mb-8 font-body">
            Complete PDF guide — $19.99, one-time. All sales final.
          </p>
          <Button variant="ctaInverse" size="lg" asChild>
            <Link to="/#pricing">Order Pro Blueprint — $19.99</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProGuide;
