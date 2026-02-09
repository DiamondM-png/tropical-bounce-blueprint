import { BookOpen, CheckSquare, FileText, Library } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Guide",
    description:
      "Our 25-page Tropical Bounce Business Blueprint covers everything from startup costs to scaling your empire — with real-world examples.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CheckSquare,
    title: "Interactive Checklists",
    description:
      "Pre-built checklists for business registration, equipment procurement, marketing setup, and more. Track your progress as you go.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: FileText,
    title: "Editable Business Plans",
    description:
      "Professional templates for your startup plan, marketing strategy, and financial projections. Customize and download instantly.",
    color: "text-tropical-green",
    bg: "bg-tropical-green/10",
  },
  {
    icon: Library,
    title: "Curated Resources",
    description:
      "Hand-picked links to insurance providers, equipment suppliers, marketing tools, and software — organized and always updated.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            Everything You Need
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Your Complete Bounce Business Toolkit
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            From zero to hero — we give you the roadmap, the tools, and the 
            resources to build a thriving bounce house rental business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bg} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
