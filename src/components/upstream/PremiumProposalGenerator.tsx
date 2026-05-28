import { useQuote, TIER_BASE } from "./QuoteContext";
import { Button } from "@/components/ui/button";
import { Printer, Crown } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const PremiumProposalGenerator = () => {
  const { quote, calc } = useQuote();
  const tierLabel = TIER_BASE[quote.tier].label;

  const handlePrint = () => window.print();

  const lines = [
    { desc: `${tierLabel} — Premium Event Package`, amt: calc.tierBase },
    { desc: `Custom Fabrication & Setup (${quote.fabricationHours} hrs @ ${fmt(quote.fabricationRate)})`, amt: calc.fabrication },
    { desc: `White-Glove Transport (${quote.mileage} mi × 2 @ $${quote.mileageMultiplier}/mi)`, amt: calc.transport },
    ...(quote.midnightBreakdown ? [{ desc: "Midnight Breakdown Service", amt: calc.midnightFee }] : []),
    ...(quote.weatherProtection ? [{ desc: "Weather Protection Package", amt: calc.weatherFee }] : []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end print:hidden">
        <Button onClick={handlePrint} className="up-btn-primary gap-2 px-4 py-2">
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </Button>
      </div>

      <div id="proposal-sheet" className="bg-white text-slate-900 rounded-xl shadow-2xl mx-auto max-w-4xl p-10 md:p-14 print:shadow-none print:rounded-none print:max-w-none print:p-12">
        {/* Header */}
        <div className="flex items-start justify-between pb-6" style={{ borderBottom: "4px solid #2bbfb3" }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-6 w-6" style={{ color: "#2bbfb3" }} />
              <span className="font-heading font-extrabold tracking-widest text-sm" style={{ color: "#1a9e93" }}>UPSTREAM PRO</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl text-slate-900">Premium Event Proposal</h1>
            <p className="text-slate-500 text-sm mt-1">tropicalbounce.com — Upstream Pro</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-slate-500 uppercase tracking-wider text-xs">Proposal #</div>
            <div className="font-mono font-bold text-slate-900">{`UH-${Date.now().toString().slice(-6)}`}</div>
            <div className="text-slate-500 uppercase tracking-wider text-xs mt-2">Issued</div>
            <div className="font-mono text-slate-700">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Client */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Prepared For</div>
            <div className="font-heading font-bold text-lg text-slate-900">{quote.clientName || "—"}</div>
            <div className="text-slate-600 text-sm">{quote.venue || "—"}</div>
          </div>
          <div className="sm:text-right">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Event Tier</div>
            <div className="font-heading font-bold text-lg text-[#1a9e93]">{tierLabel}</div>
            <div className="text-slate-600 text-sm">{quote.eventDate ? new Date(quote.eventDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Date TBD"}</div>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full mt-10 text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="text-left py-3">Description</th>
              <th className="text-right py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">{l.desc}</td>
                <td className="py-3 text-right font-mono text-slate-900">{fmt(l.amt)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-6 text-right text-slate-600 uppercase text-xs tracking-wider">Total Investment</td>
              <td className="pt-6 text-right font-heading font-extrabold text-3xl text-[#1a9e93]">{fmt(calc.subtotal)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Terms */}
        <div className="mt-12 grid sm:grid-cols-2 gap-8 text-sm">
          <div>
            <div className="font-heading font-bold text-slate-900 mb-2">Inclusions</div>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>White-glove delivery, setup & teardown</li>
              <li>Dedicated on-site event captain</li>
              <li>Premium-grade equipment & finishes</li>
              <li>$2M liability coverage certificate</li>
            </ul>
          </div>
          <div>
            <div className="font-heading font-bold text-slate-900 mb-2">Terms</div>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>50% deposit secures the date</li>
              <li>Balance due 14 days prior to event</li>
              <li>All sales final — no refunds</li>
              <li>Valid 14 days from issue</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>tropicalbounce.com / Upstream Division</span>
          <span>Thank you for considering our luxury services.</span>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #proposal-sheet, #proposal-sheet * { visibility: visible !important; }
          #proposal-sheet { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PremiumProposalGenerator;
