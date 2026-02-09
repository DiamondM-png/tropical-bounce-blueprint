import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What's included in the Tropical Bounce Business Blueprint?",
    a: "Our 25-page guide covers everything from market research and business registration to equipment sourcing, pricing strategies, marketing tactics, and scaling your bounce house rental business. It's designed specifically for aspiring side-hustle entrepreneurs.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely! There are no long-term contracts. You can cancel your subscription at any time from your account dashboard, and you'll retain access until the end of your billing period.",
  },
  {
    q: "What's the difference between Blueprint Access and Pro Blueprint?",
    a: "Blueprint Access gives you the core guide, interactive checklists, and basic templates. Pro Blueprint adds advanced financial projections, a detailed marketing plan template, premium supplier contacts, guide annotations, and priority support.",
  },
  {
    q: "Do I need experience to start a bounce house business?",
    a: "Not at all! Our Blueprint is designed for complete beginners. We walk you through every step with clear instructions, checklists, and templates so you can launch confidently.",
  },
  {
    q: "Can I download the templates and guide?",
    a: "Yes! Pro Blueprint subscribers can download the full guide as a PDF and all business plan templates in Word-compatible format for offline use.",
  },
  {
    q: "How often is the resource library updated?",
    a: "We continuously update our curated resource library with the latest and best providers, tools, and suppliers for the bounce house industry.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-heading font-bold tracking-wider uppercase text-secondary mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground mb-4">
            Got Questions?
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Everything you need to know about getting started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-card-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
