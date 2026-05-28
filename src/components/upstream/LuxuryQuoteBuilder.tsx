import { useQuote, TIER_BASE, EventTier } from "./QuoteContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

const labelCls = "font-mono-de text-[11px] uppercase tracking-wider";
const inputCls = "up-input mt-1";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const LuxuryQuoteBuilder = () => {
  const { quote, update, calc } = useQuote();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Client */}
        <div className="up-card p-6">
          <h3 className="font-display text-xl mb-4" style={{ color: "var(--up-teal)" }}>CLIENT & EVENT</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Client Name</Label>
              <Input className={inputCls} value={quote.clientName} onChange={(e) => update("clientName", e.target.value)} placeholder="Hamptons Estate LLC" />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Venue</Label>
              <Input className={inputCls} value={quote.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Oceanfront Estate" />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Event Date</Label>
              <Input type="date" className={inputCls} value={quote.eventDate} onChange={(e) => update("eventDate", e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>High-Ticket Tier</Label>
              <Select value={quote.tier} onValueChange={(v) => update("tier", v as EventTier)}>
                <SelectTrigger className={inputCls}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: "var(--up-elevated)", borderColor: "var(--up-border)", color: "var(--up-white)" }}>
                  {Object.entries(TIER_BASE).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label} — {fmt(v.base)} base
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Fabrication & Logistics */}
        <div className="up-card p-6">
          <h3 className="font-display text-xl mb-4" style={{ color: "var(--up-teal)" }}>CUSTOM FABRICATION & LOGISTICS</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Fabrication Setup Hours</Label>
              <Input type="number" min={0} className={inputCls} value={quote.fabricationHours} onChange={(e) => update("fabricationHours", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Fabrication Rate / hr</Label>
              <Input type="number" min={0} className={inputCls} value={quote.fabricationRate} onChange={(e) => update("fabricationRate", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Transport Mileage (one-way)</Label>
              <Input type="number" min={0} className={inputCls} value={quote.mileage} onChange={(e) => update("mileage", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Mileage Multiplier ($/mi)</Label>
              <Input type="number" step="0.1" min={0} className={inputCls} value={quote.mileageMultiplier} onChange={(e) => update("mileageMultiplier", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>On-site Staff</Label>
              <Input type="number" min={0} className={inputCls} value={quote.staffCount} onChange={(e) => update("staffCount", +e.target.value)} />
            </div>
            <div>
              <Label className={labelCls} style={{ color: "var(--up-muted)" }}>Overhead Cost</Label>
              <Input type="number" min={0} className={inputCls} value={quote.overheadCost} onChange={(e) => update("overheadCost", +e.target.value)} />
            </div>
          </div>
        </div>

        {/* Premium Toggles */}
        <div className="up-card p-6">
          <h3 className="font-display text-xl mb-4" style={{ color: "var(--up-teal)" }}>PREMIUM ADD-ONS</h3>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between rounded-lg p-4"
              style={{ background: "var(--up-elevated)", border: "1px solid var(--up-border)" }}
            >
              <div>
                <div className="font-medium" style={{ color: "var(--up-white)" }}>Midnight Breakdown Fee</div>
                <div className="text-xs" style={{ color: "var(--up-muted)" }}>After-hours teardown surcharge (+$850)</div>
              </div>
              <Switch checked={quote.midnightBreakdown} onCheckedChange={(v) => update("midnightBreakdown", v)} />
            </div>
            <div
              className="flex items-center justify-between rounded-lg p-4"
              style={{ background: "var(--up-elevated)", border: "1px solid var(--up-border)" }}
            >
              <div>
                <div className="font-medium" style={{ color: "var(--up-white)" }}>Weather Protection Package</div>
                <div className="text-xs" style={{ color: "var(--up-muted)" }}>Storm-rated anchoring + canopy backup (+$650)</div>
              </div>
              <Switch checked={quote.weatherProtection} onCheckedChange={(v) => update("weatherProtection", v)} />
            </div>
          </div>
        </div>
      </div>

      {/* Calculations sidebar */}
      <div className="space-y-4">
        <div className="up-stat-card sticky top-20 p-6">
          <div className="font-display text-xl mb-5 flex items-center gap-2" style={{ color: "var(--up-teal)" }}>
            <TrendingUp className="h-4 w-4" /> PRICING SUMMARY
          </div>

          <div className="space-y-2 text-sm">
            <Row label={`${TIER_BASE[quote.tier].label} base`} value={fmt(calc.tierBase)} />
            <Row label="Custom fabrication" value={fmt(calc.fabrication)} />
            <Row label="Transport (round trip)" value={fmt(calc.transport)} />
            {quote.midnightBreakdown && <Row label="Midnight breakdown" value={fmt(calc.midnightFee)} />}
            {quote.weatherProtection && <Row label="Weather protection" value={fmt(calc.weatherFee)} />}
          </div>

          <div className="my-4" style={{ borderTop: "1px solid var(--up-border)" }} />

          <div className="space-y-3">
            <Metric icon={DollarSign} label="Total Premium Pricing" value={fmt(calc.subtotal)} accent />
            <Metric icon={TrendingUp} label="Net Profit" value={fmt(calc.netProfit)} />
            <Metric icon={Percent} label="High-Tier Margin" value={`${calc.margin.toFixed(1)}%`} />
          </div>

          <p className="text-[11px] mt-5 leading-relaxed font-mono-de" style={{ color: "var(--up-muted)" }}>
            Calculations include staff burden, overhead, and 40% transport cost factor. Use the Premium Proposal tab to export.
          </p>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between" style={{ color: "var(--up-body)" }}>
    <span>{label}</span>
    <span className="font-mono-de" style={{ color: "var(--up-teal)" }}>{value}</span>
  </div>
);

const Metric = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) => (
  <div
    className="flex items-center justify-between rounded-lg p-3"
    style={
      accent
        ? { background: "var(--up-elevated)", border: "1px solid rgba(43,191,179,0.25)" }
        : { background: "var(--up-elevated)", border: "1px solid var(--up-border)" }
    }
  >
    <div className="flex items-center gap-2 font-mono-de text-[11px] uppercase tracking-wider" style={{ color: "var(--up-muted)" }}>
      <span style={{ color: accent ? "var(--up-orange)" : "var(--up-teal)" }}>{icon}</span>
      {label}
    </div>
    <div className="font-display text-xl" style={{ color: accent ? "var(--up-orange)" : "var(--up-teal)", letterSpacing: "0.04em" }}>
      {value}
    </div>
  </div>
);

export default LuxuryQuoteBuilder;
