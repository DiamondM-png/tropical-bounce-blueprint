import { createContext, useContext, useState, ReactNode } from "react";

export type EventTier = "estate" | "corporate" | "luxury-wedding" | "gala";

export const TIER_BASE: Record<EventTier, { label: string; base: number }> = {
  "estate": { label: "Private Estate", base: 3500 },
  "corporate": { label: "Corporate Activation", base: 5500 },
  "luxury-wedding": { label: "Luxury Wedding", base: 4800 },
  "gala": { label: "Black-Tie Gala", base: 7500 },
};

export interface QuoteState {
  clientName: string;
  eventDate: string;
  venue: string;
  tier: EventTier;
  fabricationHours: number;
  fabricationRate: number;
  mileage: number;
  mileageMultiplier: number;
  midnightBreakdown: boolean;
  weatherProtection: boolean;
  staffCount: number;
  overheadCost: number;
}

const defaultState: QuoteState = {
  clientName: "",
  eventDate: "",
  venue: "",
  tier: "estate",
  fabricationHours: 8,
  fabricationRate: 125,
  mileage: 25,
  mileageMultiplier: 3.5,
  midnightBreakdown: false,
  weatherProtection: false,
  staffCount: 4,
  overheadCost: 850,
};

interface Ctx {
  quote: QuoteState;
  setQuote: (q: QuoteState) => void;
  update: <K extends keyof QuoteState>(k: K, v: QuoteState[K]) => void;
  calc: ReturnType<typeof computeCalc>;
}

const QuoteContext = createContext<Ctx | null>(null);

export const computeCalc = (q: QuoteState) => {
  const tierBase = TIER_BASE[q.tier].base;
  const fabrication = q.fabricationHours * q.fabricationRate;
  const transport = q.mileage * q.mileageMultiplier * 2; // round trip
  const midnightFee = q.midnightBreakdown ? 850 : 0;
  const weatherFee = q.weatherProtection ? 650 : 0;
  const subtotal = tierBase + fabrication + transport + midnightFee + weatherFee;
  const totalCost = q.overheadCost + q.staffCount * 250 + transport * 0.4;
  const netProfit = subtotal - totalCost;
  const margin = subtotal > 0 ? (netProfit / subtotal) * 100 : 0;
  return { tierBase, fabrication, transport, midnightFee, weatherFee, subtotal, totalCost, netProfit, margin };
};

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quote, setQuote] = useState<QuoteState>(defaultState);
  const update = <K extends keyof QuoteState>(k: K, v: QuoteState[K]) =>
    setQuote((q) => ({ ...q, [k]: v }));
  const calc = computeCalc(quote);
  return (
    <QuoteContext.Provider value={{ quote, setQuote, update, calc }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
};
