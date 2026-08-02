import { useState, useEffect } from "react";
import { getLiveGoldRates, saveLiveGoldRates, type GoldRates } from "@/data/storeState";
import { toast } from "sonner";

export function AdminLiveRates() {
  const [rates, setRates] = useState<GoldRates>(getLiveGoldRates());

  useEffect(() => {
    setRates(getLiveGoldRates());
  }, []);

  const handleChange = (key: keyof GoldRates, val: string) => {
    const num = parseFloat(val);
    setRates((prev) => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveLiveGoldRates(rates);
    setRates(updated);
    toast.success("Live Gold & Diamond rates updated successfully across the site!");
  };

  return (
    <div className="bg-onyx/90 border border-gold/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl max-w-4xl mx-auto text-left">
      <div className="border-b border-gold/30 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-amber-200 font-bold uppercase tracking-wider">
            Daily Live Gold Rate Manager
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Update today's per-gram gold rates. Changes instantly update the site header banner, scheme calculator & price estimates.
          </p>
        </div>
        <span className="text-[0.65rem] uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 rounded border border-gold/30 w-fit">
          Last Updated: {rates.lastUpdated}
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 24K Rate */}
          <div className="bg-black/50 p-4 rounded border border-gold/20 space-y-2">
            <label className="text-[0.62rem] uppercase tracking-widest text-gold font-bold block">
              24K Gold Rate (₹/g)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-semibold">₹</span>
              <input
                type="number"
                value={rates.rate24k || ""}
                onChange={(e) => handleChange("rate24k", e.target.value)}
                required
                className="w-full bg-background border border-gold/40 rounded pl-7 pr-3 py-2 text-base text-amber-100 font-mono font-bold focus:border-gold outline-none"
              />
            </div>
            <p className="text-[0.6rem] text-muted-foreground">99.9% Pure Gold standard</p>
          </div>

          {/* 22K Rate */}
          <div className="bg-black/50 p-4 rounded border border-gold/20 space-y-2">
            <label className="text-[0.62rem] uppercase tracking-widest text-amber-300 font-bold block">
              22K Gold Rate (₹/g)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-semibold">₹</span>
              <input
                type="number"
                value={rates.rate22k || ""}
                onChange={(e) => handleChange("rate22k", e.target.value)}
                required
                className="w-full bg-background border border-gold/40 rounded pl-7 pr-3 py-2 text-base text-amber-100 font-mono font-bold focus:border-gold outline-none"
              />
            </div>
            <p className="text-[0.6rem] text-muted-foreground">91.6% BIS Hallmarked benchmark</p>
          </div>

          {/* 18K Rate */}
          <div className="bg-black/50 p-4 rounded border border-gold/20 space-y-2">
            <label className="text-[0.62rem] uppercase tracking-widest text-amber-400/90 font-bold block">
              18K Gold Rate (₹/g)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-semibold">₹</span>
              <input
                type="number"
                value={rates.rate18k || ""}
                onChange={(e) => handleChange("rate18k", e.target.value)}
                required
                className="w-full bg-background border border-gold/40 rounded pl-7 pr-3 py-2 text-base text-amber-100 font-mono font-bold focus:border-gold outline-none"
              />
            </div>
            <p className="text-[0.6rem] text-muted-foreground">75.0% Fine Diamond jewellery grade</p>
          </div>

          {/* 14K Rate */}
          <div className="bg-black/50 p-4 rounded border border-gold/20 space-y-2">
            <label className="text-[0.62rem] uppercase tracking-widest text-amber-500/80 font-bold block">
              14K Gold Rate (₹/g)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-semibold">₹</span>
              <input
                type="number"
                value={rates.rate14k || ""}
                onChange={(e) => handleChange("rate14k", e.target.value)}
                required
                className="w-full bg-background border border-gold/40 rounded pl-7 pr-3 py-2 text-base text-amber-100 font-mono font-bold focus:border-gold outline-none"
              />
            </div>
            <p className="text-[0.6rem] text-muted-foreground">58.5% Everyday wear grade</p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-gold/20">
          <button
            type="submit"
            className="shine-sweep bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition-all shadow-lg hover:opacity-90 cursor-pointer"
          >
            Save & Publish New Rates Live
          </button>
        </div>
      </form>
    </div>
  );
}
