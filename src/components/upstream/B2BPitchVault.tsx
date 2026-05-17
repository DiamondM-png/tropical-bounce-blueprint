import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Copy, Check, Building2, Trophy, Heart } from "lucide-react";
import { toast } from "sonner";

interface PitchSection {
  id: string;
  audience: string;
  icon: React.ReactNode;
  blurb: string;
  steps: { id: string; label: string }[];
  template: string;
}

const sections: PitchSection[] = [
  {
    id: "planners",
    audience: "Elite Event Planners",
    icon: <Trophy className="h-5 w-5" />,
    blurb: "Position as the premium go-to vendor for their highest-touch clients.",
    steps: [
      { id: "p1", label: "Research planner's last 3 published events" },
      { id: "p2", label: "Identify a mutual high-profile contact for warm intro" },
      { id: "p3", label: "Send personalized outreach email (template below)" },
      { id: "p4", label: "Follow up in 5 business days with portfolio link" },
      { id: "p5", label: "Offer a private showroom walkthrough" },
    ],
    template: `Subject: A premium partner for your next estate booking

Hi {{First Name}},

I've followed your work on {{Recent Event}} — the production quality stood out, especially {{Specific Detail}}. We run the luxury division at tropicalbounce.com, exclusively handling estate, gala, and ultra-private events with custom fabrication and white-glove logistics.

A few things that may matter to your clients:
• Custom-branded installations built to spec
• Discreet, uniformed crews and silent breakdown
• $2M liability + storm-rated anchoring on every job

Would you be open to a 15-minute call this week? I'd love to walk you through our recent {{Tier}} build for a similar client.

{{Your Name}}
Upstream Division — tropicalbounce.com`,
  },
  {
    id: "country-clubs",
    audience: "Country Club Managers",
    icon: <Building2 className="h-5 w-5" />,
    blurb: "Become the preferred vendor for member events, junior galas, and seasonal activations.",
    steps: [
      { id: "c1", label: "Pull a list of clubs within 75-mile radius" },
      { id: "c2", label: "Identify the GM or Director of Member Events" },
      { id: "c3", label: "Mail printed proposal + handwritten note" },
      { id: "c4", label: "Follow up by phone within 7 days" },
      { id: "c5", label: "Propose a free demo at next member family day" },
    ],
    template: `Subject: Premium activations for your member calendar

Dear {{Manager Name}},

Many of the clubs we partner with use member family days, junior tournaments, and seasonal galas as key retention moments — but coordinating premium activations through standard vendors can compromise the brand.

We work exclusively with private clubs and estates to deliver:
• Member-day installations with custom club branding
• Insurance certificates pre-cleared with most carriers
• Off-hours setup so course/grounds aren't impacted

I'd be glad to offer your club a complimentary on-site walkthrough and a sample {{Event Type}} concept. May I send a printed proposal to your attention?

Warmly,
{{Your Name}}
tropicalbounce.com — Upstream Division`,
  },
  {
    id: "weddings",
    audience: "Luxury Wedding Organizers",
    icon: <Heart className="h-5 w-5" />,
    blurb: "Get added to the preferred-vendor list for $100K+ wedding budgets.",
    steps: [
      { id: "w1", label: "Audit organizer's vendor list for current gaps" },
      { id: "w2", label: "Send styled-shoot collaboration offer" },
      { id: "w3", label: "Deliver mood board within 48 hours of reply" },
      { id: "w4", label: "Confirm preferred-vendor listing terms" },
      { id: "w5", label: "Schedule quarterly check-in with portfolio refresh" },
    ],
    template: `Subject: Styled-shoot collaboration — luxury wedding installations

Hi {{First Name}},

Your aesthetic on {{Recent Wedding}} is exactly the level we build for. We design and fabricate luxury event installations for {{City}}-area weddings — fully custom, brand-matched, and engineered to disappear gracefully from photography.

I'd love to propose a no-cost styled shoot with your team:
• You curate creative direction and the venue
• We handle fabrication, install, and a 4-hour shoot window
• You get exclusive imagery for your portfolio and socials

If this is interesting, I'll send concept boards within 48 hours of your reply. Always happy to be considered for your preferred-vendor list.

{{Your Name}}
Upstream Division — tropicalbounce.com`,
  },
];

const STORAGE = "upstream-pitch-checks";

const B2BPitchVault = () => {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE);
    if (saved) setChecks(JSON.parse(saved));
  }, []);

  const toggle = (id: string) => {
    setChecks((c) => {
      const next = { ...c, [id]: !c[id] };
      localStorage.setItem(STORAGE, JSON.stringify(next));
      return next;
    });
  };

  const copy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Template copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {sections.map((s) => {
        const done = s.steps.filter((st) => checks[st.id]).length;
        const pct = Math.round((done / s.steps.length) * 100);
        return (
          <div key={s.id} className="rounded-xl border border-amber-500/20 bg-slate-900/60 backdrop-blur p-6 flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              {s.icon}
              <h3 className="font-heading font-bold text-lg text-slate-100">{s.audience}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">{s.blurb}</p>

            <div className="mb-3">
              <div className="flex justify-between text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                <span>Outreach progress</span>
                <span className="text-amber-400">{pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <ul className="space-y-2 mb-5">
              {s.steps.map((st) => (
                <li key={st.id} className="flex items-start gap-2">
                  <Checkbox
                    id={st.id}
                    checked={!!checks[st.id]}
                    onCheckedChange={() => toggle(st.id)}
                    className="border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 mt-0.5"
                  />
                  <label htmlFor={st.id} className={`text-sm cursor-pointer ${checks[st.id] ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    {st.label}
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="rounded-lg bg-slate-950 border border-amber-500/10 p-4 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {s.template}
              </div>
              <Button
                onClick={() => copy(s.id, s.template)}
                variant="outline"
                className="w-full mt-3 border-amber-500/40 bg-transparent text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 gap-2"
              >
                {copied === s.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === s.id ? "Copied" : "Copy template"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default B2BPitchVault;
