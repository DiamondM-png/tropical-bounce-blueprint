import heroBounce from "@/assets/hero-bounce.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBounce}
          alt="Kids enjoying a tropical bounce house party"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-heading font-semibold text-primary-foreground">
              The #1 Bounce House Business Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-primary-foreground leading-[1.1] mb-6">
            Launch Your Dream{" "}
            <span className="text-accent">Bounce House</span>{" "}
            Business!
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/85 font-body leading-relaxed mb-8 max-w-xl">
            Everything you need to start a profitable bounce house rental 
            business — from our 25-page blueprint to interactive checklists, 
            editable templates, and curated resources.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="cta" className="text-lg px-8 py-6">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="hero" className="text-lg px-8 py-6">
              See What's Included
            </Button>
          </div>

          <p className="mt-6 text-primary-foreground/60 text-sm font-body">
            PDF from $19.99 · Physical guide from $49.99 · Mailed via USPS
          </p>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 80 480 100 720 80C960 60 1200 20 1440 40V100H0V40Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
