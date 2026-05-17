import { useQuote, TIER_BASE, EventTier } from "./QuoteContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

const cardCls = "rounded-xl border border-amber-500/20 bg-slate-900/60 backdrop-blur p-6";
const labelCls = "text-slate-300 text-xs uppercase tracking-wider";
const inputCls = "bg-slate-950 border-amber-500/20 text-slate-100 focus-visible:ring-amber-500 mt-1";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const LuxuryQuoteBuilder = () => {
  const { quote, update, calc } = useQuote();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Client */}
        <div className={cardCls}>
          <h3 className="font-heading font-bold text-amber-400 mb-4">Client & Event</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelCls}>Client Name</Label>
              <Input className={inputCls} value={quote.clientName} onChange={(e) => update("clientName", e.target.value)} placeholder="Hamptons Estate LLC" />
            </div>
            <div>
              <Label className={labelCls}>Venue</Label>
              <Input className={inputCls} value={quote.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Oceanfront Estate" />
            </div>
            <div>
              <Label className={labelCls}>Event Date</Label>
              <Input type="date" className={inputCls} value={quote.eventDate} onChange={(e) => update("eventDate", e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>High-Ticket Tier</Label>
              <Select value={quote.tier} onValueChange={(v) => update("tier", v as EventTier)}>
                <SelectTrigger className={inputCls}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-amber-500/30 text-slate-100">
                  {Object.entries(TIER_BASE).map(([k, v]) => (
                    <SelectItem key={k} value={k} className="focus:bg-amber-500/10 focus:text-amber-300">
                      {v.label} — {fmt(v.base)} base
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Fabrication & Logistics */}
        <div className={cardCls}>
          <h3 className="font-heading font-bold text-amber-400 mb-4">Custom Fabrication & Logistics</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelCls}>Fabrication Setup Hours</Label>
              <Input type="number" min={0} className={inputCls} value={quote.fabricationHours} onChange={(e) => update("fabricationHours", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>Fabrication Rate / hr</Label>
              <Input type="number" min={0} className={inputCls} value={quote.fabricationRate} onChange={(e) => update("fabricationRate", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>Transport Mileage (one-way)</Label>
              <Input type="number" min={0} className={inputCls} value={quote.mileage} onChange={(e) => update("mileage", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>Mileage Multiplier ($/mi)</Label>
              <Input type="number" step="0.1" min={0} className={inputCls} value={quote.mileageMultiplier} onChange={(e) => update("mileageMultiplier", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>On-site Staff</Label>
              <Input type="number" min={0} className={inputCls} value={quote.staffCount} onChange={(e) => update("staffCount", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls}>Overhead Cost</Label>
              <Input type="number" min={0} className={inputCls} value={quote.overheadCost} onChange={(e) => update("overheadCost", +e.target.value)} />
            </div>
          </div>
        </div>

        {/* Premium Toggles */}
        <div className={cardCls}>
          <h3 className="font-heading font-bold text-amber-400 mb-4">Premium Add-Ons</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-amber-500/10 bg-slate-950/60 p-4">
              <div>
                <div className="font-semibold text-slate-100">Midnight Breakdown Fee</div>
                <div className="text-xs text-slate-400">After-hours teardown surcharge (+$850)</div>
              </div>
              <Switch checked={quote.midnightBreakdown} onCheckedChange={(v) => update("midnightBreakdown", v)} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-amber-500/10 bg-slate-950/60 p-4">
              <div>
                <div className="font-semibold text-slate-100">Weather Protection Package</div>
                <div className="text-xs text-slate-400">Storm-rated anchoring + canopy backup (+$650)</div>
              </div>
              <Switch checked={quote.weatherProtection} onCheckedChange={(v) => update("weatherProtection", v)} />
            </div>
          </div>
        </div>
      </div>

      {/* Calculations sidebar */}
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sticky top-6 shadow-[0_0_60px_-15px_rgba(245,158,11,0.25)]">
          <h3 className="font-heading font-bold text-amber-400 mb-5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Pricing Summary
          </h3>

          <div className="space-y-2 text-sm">
            <Row label={`${TIER_BASE[quote.tier].label} base`} value={fmt(calc.tierBase)} />
            <Row label="Custom fabrication" value={fmt(calc.fabrication)} />
            <Row label="Transport (round trip)" value={fmt(calc.transport)} />
            {quote.midnightBreakdown && <Row label="Midnight breakdown" value={fmt(calc.midnightFee)} />}
            {quote.weatherProtection && <Row label="Weather protection" value={fmt(calc.weatherFee)} />}
          </div>

          <div className="border-t border-amber-500/20 my-4" />

          <div className="space-y-3">
            <Metric icon={<DollarSign className="h-4 w-4" />} label="Total Premium Pricing" value={fmt(calc.subtotal)} accent />
            <Metric icon={<TrendingUp className="h-4 w-4" />} label="Net Profit" value={fmt(calc.netProfit)} />
            <Metric icon={<Percent className="h-4 w-4" />} label="High-Tier Margin" value={`${calc.margin.toFixed(1)}%`} />
          </div>

          <p className="text-[11px] text-slate-500 mt-5 leading-relaxed">
            Calculations include staff burden, overhead, and 40% transport cost factor. Use the Premium Proposal tab to export.
          </p>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-slate-300">
    <span>{label}</span>
    <span className="font-mono">{value}</span>
  </div>
);

const Metric = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) => (
  <div className={`flex items-center justify-between rounded-lg p-3 ${accent ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40" : "bg-slate-950/60 border border-slate-800"}`}>
    <div className="flex items-center gap-2 text-slate-300 text-xs uppercase tracking-wider">
      <span className={accent ? "text-amber-400" : "text-slate-400"}>{icon}</span>
      {label}
    </div>
    <div className={`font-heading font-extrabold text-lg ${accent ? "text-amber-300" : "text-slate-100"}`}>{value}</div>
  </div>
);

export default LuxuryQuoteBuilder;
