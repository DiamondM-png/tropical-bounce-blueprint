import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative rounded-3xl bg-primary overflow-hidden px-8 py-16 md:py-20 text-center">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-heading font-semibold text-primary-foreground">
                Limited time — get your guide today
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-black text-primary-foreground mb-4">
              Ready to Bounce Into Business?
            </h2>
            <p className="text-lg text-primary-foreground/80 font-body mb-8 max-w-lg mx-auto">
              Join hundreds of entrepreneurs who turned their side-hustle dream 
              into a booming bounce house business.
            </p>

            <Button variant="ctaInverse" size="lg" className="text-lg px-10 py-6">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
