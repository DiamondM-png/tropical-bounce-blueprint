import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What's included in the Inflatable Enterprise Manual?",
    a: "The Inflatable Enterprise Manual is our complete in-depth guide covering everything from market research, business registration, insurance, equipment sourcing, and pricing strategies to advanced financial projections, a detailed marketing plan, premium supplier contacts, legal templates, scaling, and seasonal planning.",
  },
  {
    q: "How will I receive my guide?",
    a: "The Inflatable Enterprise Manual is delivered as a downloadable PDF immediately after purchase. No shipping, no waiting — just instant access.",
  },
  {
    q: "Do you offer refunds?",
    a: "No. Because the Inflatable Enterprise Manual is a digital product delivered instantly, all sales are final and we do not offer refunds. Please review what's included before purchasing.",
  },
  {
    q: "Do I need experience to start a bounce house business?",
    a: "Not at all! The Inflatable Enterprise Manual is designed for complete beginners. We walk you through every step with clear instructions, checklists, and templates so you can launch confidently.",
  },
  {
    q: "Can I download the templates?",
    a: "Yes! The Inflatable Enterprise Manual includes downloadable business plan, financial, marketing, and legal templates in editable formats for offline use.",
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
