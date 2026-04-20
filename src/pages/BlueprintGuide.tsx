import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  BookOpen,
  Search,
  FileText,
  Shield,
  Package,
  DollarSign,
  Megaphone,
  Truck,
  Users,
  CheckSquare,
  ClipboardList,
  Link2,
} from "lucide-react";

const chapters = [
  {
    icon: BookOpen,
    title: "Introduction",
    summary: "Why bounce houses are a great side hustle",
    points: [
      "Industry overview: a $300M+ inflatable rental market growing 5–7% annually.",
      "Realistic earning potential: $300–$1,500 per weekend with 1–3 units.",
      "Low barrier to entry compared to most service businesses.",
      "Why weekends, holidays, and school breaks drive most of your revenue.",
    ],
  },
  {
    icon: Search,
    title: "Chapter 1: Market Research",
    summary: "Identify your target market and competition",
    points: [
      "Define your service radius (typically 20–30 miles from your home base).",
      "Identify your ideal customer: birthday parties, churches, schools, corporate events.",
      "Analyze local competitors: pricing, inventory, booking lead times, reviews.",
      "Estimate local demand using event venues, school calendars, and population density.",
    ],
  },
  {
    icon: FileText,
    title: "Chapter 2: Business Registration",
    summary: "LLC vs sole proprietorship, licenses, and EIN",
    points: [
      "When an LLC makes sense vs starting as a sole proprietor.",
      "Step-by-step EIN application with the IRS (free, ~10 minutes).",
      "State-level licenses, DBA filings, and sales tax registration.",
      "City and county permits commonly required for inflatable operators.",
    ],
  },
  {
    icon: Shield,
    title: "Chapter 3: Insurance",
    summary: "Liability coverage and recommended providers",
    points: [
      "Why $1M general liability is the industry minimum.",
      "Inland marine coverage for your equipment in transit and on site.",
      "Recommended carriers: Britton Gallagher, Deland Gibson, Thimble.",
      "Typical annual cost ranges: $500–$1,800 for a 1–3 unit operation.",
    ],
  },
  {
    icon: Package,
    title: "Chapter 4: Equipment Sourcing",
    summary: "Where to buy, what to look for, cost breakdown",
    points: [
      "Commercial-grade vs residential units — and why it matters legally.",
      "Top vetted manufacturers: Ninja Jump, Cutting Edge, Magic Jump.",
      "New vs used: typical price ranges $1,500–$6,000 per unit.",
      "Required accessories: blower, stakes, sandbags, extension cords, tarp.",
    ],
  },
  {
    icon: DollarSign,
    title: "Chapter 5: Pricing Strategies",
    summary: "How to price rentals, packages, and deposits",
    points: [
      "Standard 4-hour, 6-hour, and full-day pricing tiers.",
      "Bundling: bounce house + tables + chairs + concessions.",
      "Seasonal pricing for peak (April–October) vs off-season.",
      "Deposit policies, cancellation fees, and damage waiver pricing.",
    ],
  },
  {
    icon: Megaphone,
    title: "Chapter 6: Marketing Basics",
    summary: "Social media, local advertising, word-of-mouth",
    points: [
      "Setting up Google Business Profile to dominate local search.",
      "Facebook & Instagram setup with high-converting post templates.",
      "Local Facebook groups, Nextdoor, and community board strategies.",
      "Referral program structure that doubles repeat bookings.",
    ],
  },
  {
    icon: Truck,
    title: "Chapter 7: Operations",
    summary: "Booking, delivery, setup, and safety",
    points: [
      "Recommended booking software: Inflatable Office, Event Rental Systems.",
      "Delivery routing and time-block scheduling for back-to-back rentals.",
      "Step-by-step setup and teardown checklist (under 20 minutes).",
      "Safety standards: anchoring, weather thresholds, supervision rules.",
    ],
  },
  {
    icon: Users,
    title: "Chapter 8: Getting Your First Customers",
    summary: "Launch strategies and building reviews",
    points: [
      "Soft-launch pricing: discounted bookings in exchange for reviews.",
      "Partnering with local party planners and event venues.",
      "Building a 5-star review base on Google in your first 60 days.",
      "Re-engagement scripts to turn one-time renters into repeat customers.",
    ],
  },
];

const checklists = [
  {
    title: "Business Registration Checklist",
    items: [
      "Choose business name and check availability",
      "File LLC or DBA paperwork with your state",
      "Apply for EIN with the IRS",
      "Open a dedicated business bank account",
      "Register for state sales tax",
      "Obtain required city/county permits",
    ],
  },
  {
    title: "Equipment Procurement Checklist",
    items: [
      "Select 1–2 starter bounce house units",
      "Purchase commercial-grade blower(s)",
      "Stock stakes, sandbags, and tarps",
      "Buy heavy-duty extension cords (50ft+)",
      "Get a hand truck or dolly for transport",
      "Print laminated safety rules signage",
    ],
  },
  {
    title: "Marketing Setup Checklist",
    items: [
      "Claim Google Business Profile",
      "Create Facebook & Instagram business pages",
      "Build a one-page website with online inquiry form",
      "Take 10+ professional photos of each unit",
      "Design a simple flyer for local distribution",
      "Set up a referral reward program",
    ],
  },
];

const resources = [
  { label: "IRS EIN Application", note: "Free online — takes ~10 minutes" },
  { label: "Thimble Insurance", note: "On-demand event liability coverage" },
  { label: "Ninja Jump", note: "Commercial inflatable manufacturer" },
  { label: "Inflatable Office", note: "Industry-standard booking software" },
  { label: "Google Business Profile", note: "Free local SEO for service businesses" },
];

const BlueprintGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Button variant="cta" size="sm" asChild>
            <Link to="/#pricing">Get this guide — $9.99</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-widest text-primary-foreground/70 font-body mb-3">
            Blueprint Access · PDF Guide
          </p>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            The Tropical Bounce Business Blueprint
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body">
            Your 25-page core guide to launching a profitable bounce house rental
            business — from research and registration to your first paying customer.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading font-bold text-3xl mb-8">What's Inside</h2>
          <div className="space-y-6">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Card key={chapter.title}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="font-heading">{chapter.title}</CardTitle>
                        <CardDescription className="mt-1">{chapter.summary}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 ml-2">
                      {chapter.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 shrink-0">●</span>
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

      {/* Checklists */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <CheckSquare className="h-7 w-7 text-primary" />
            <h2 className="font-heading font-bold text-3xl">Interactive Checklists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {checklists.map((list) => (
              <Card key={list.title}>
                <CardHeader>
                  <CardTitle className="text-lg font-heading">{list.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {list.items.map((item, i) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Checkbox id={`${list.title}-${i}`} className="mt-0.5" />
                        <label htmlFor={`${list.title}-${i}`} className="text-muted-foreground cursor-pointer">
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Plan Template */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="h-7 w-7 text-primary" />
            <h2 className="font-heading font-bold text-3xl">Basic Business Plan Template</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              {[
                { label: "Business Name", placeholder: "e.g. Sunny Bounce Rentals LLC" },
                { label: "Service Area", placeholder: "Cities and zip codes you'll serve" },
                { label: "Target Customer", placeholder: "Families, schools, churches, etc." },
                { label: "Starting Inventory", placeholder: "Number and type of units" },
                { label: "Pricing Structure", placeholder: "4hr / full-day / package rates" },
                { label: "First Year Revenue Goal", placeholder: "$ amount" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-sm font-medium font-heading mb-2">{field.label}</p>
                  <div className="border-b-2 border-dashed border-border h-10 flex items-end pb-1">
                    <span className="text-sm text-muted-foreground/60 italic">{field.placeholder}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Link2 className="h-7 w-7 text-primary" />
            <h2 className="font-heading font-bold text-3xl">Curated Resource Links</h2>
          </div>
          <Card>
            <CardContent className="pt-6 divide-y divide-border">
              {resources.map((resource) => (
                <div key={resource.label} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium font-heading">{resource.label}</p>
                    <p className="text-sm text-muted-foreground">{resource.note}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Ready to launch your bounce house business?
          </h2>
          <p className="text-primary-foreground/80 mb-8 font-body">
            Get the complete Blueprint Access PDF guide for just $9.99.
          </p>
          <Button variant="ctaInverse" size="lg" asChild>
            <Link to="/#pricing">Get Blueprint Access — $9.99</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlueprintGuide;
