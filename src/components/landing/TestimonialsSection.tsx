import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus J.",
    role: "Bounce House Owner, Miami FL",
    quote:
      "This blueprint saved me months of trial and error. I had my first booking within 3 weeks of starting!",
    stars: 5,
  },
  {
    name: "Sarah T.",
    role: "Side Hustle Entrepreneur, Houston TX",
    quote:
      "The checklists and business plan templates made everything feel so organized. I went from idea to launch in under a month.",
    stars: 5,
  },
  {
    name: "Derek W.",
    role: "Party Rental Business, Atlanta GA",
    quote:
      "The curated resource list alone was worth the subscription. Found my insurance provider and best equipment supplier through it.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Entrepreneurs Who Bounced to the Top
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Real people, real results. See how our Blueprint helped them launch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-card p-6 shadow-card border border-border hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground font-body leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-heading font-bold text-card-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
