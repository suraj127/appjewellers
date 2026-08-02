import { useState } from "react";
import logoImg from "@/assets/logo.png";

export function GoldSchemeCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(6000);
  const totalDraws = 8;
  const targetMaturity = monthlyAmount * totalDraws;

  return (
    <div className="w-full max-w-6xl mx-auto my-6 sm:my-12 p-3 sm:p-8 bg-gradient-to-b from-[#2d080a] via-[#1a0406] to-onyx border border-gold/40 rounded-lg shadow-2xl text-foreground">
      {/* Header Banner */}
      <div className="bg-[#6b0f1a] border border-gold/60 rounded-md p-4 sm:p-6 text-center relative overflow-hidden shadow-xl mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-10 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.4)] shrink-0"
            />
            <div>
              <h2 className="font-display text-lg sm:text-3xl text-gold font-bold tracking-wider leading-tight">
                A.P.P. JEWELLERS
              </h2>
              <p className="text-[0.55rem] sm:text-xs uppercase tracking-[0.2em] text-gold/80 font-light">
                SwarnaNidhi Gold Purchase Scheme
              </p>
            </div>
          </div>

          <div className="bg-[#4a0810] border border-gold/70 px-4 sm:px-6 py-2.5 sm:py-4 rounded-md text-center w-full md:max-w-md">
            <p className="font-display text-xs sm:text-xl font-bold tracking-wider text-amber-200 uppercase leading-snug">
              IF ALL INSTALLMENTS ARE PAID ON DUE DATE
            </p>
            <p className="text-[0.52rem] sm:text-[0.68rem] text-gold/90 uppercase tracking-widest mt-0.5">
              Guaranteed Bonus & Jewellery Purchase Benefit
            </p>
          </div>
        </div>
      </div>

      {/* Auto-Calculation Controls */}
      <div className="bg-onyx/90 border border-gold/30 rounded-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 text-left">
          <div>
            <h3 className="text-gold font-display text-base sm:text-xl font-semibold">
              Calculate Your Gold Scheme Earnings
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              Select or type your monthly installment amount from ₹1,000 to ₹50,000.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 bg-[#4a0810] border border-gold/60 px-4 py-2 rounded shadow-lg w-full md:w-auto">
            <span className="text-gold font-display text-lg sm:text-2xl font-bold">₹</span>
            <input
              type="number"
              min={1000}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Math.max(1000, Math.min(50000, Number(e.target.value) || 0)))}
              className="w-24 sm:w-32 bg-transparent text-lg sm:text-2xl font-bold text-amber-200 focus:outline-none text-right"
            />
            <span className="text-[0.62rem] sm:text-xs uppercase tracking-widest text-gold/90 font-semibold">/ month</span>
          </div>
        </div>

        {/* Scroll Bar Track */}
        <div className="space-y-3 sm:space-y-4 bg-black/40 p-3 sm:p-5 rounded-lg border border-gold/30">
          <div className="flex items-center justify-between text-[0.65rem] sm:text-xs uppercase tracking-widest text-gold font-bold">
            <span>Monthly Installment Slider</span>
            <span className="text-amber-200 text-xs sm:text-sm font-bold">
              ₹{monthlyAmount.toLocaleString("en-IN")} / mo
            </span>
          </div>

          <input
            type="range"
            min={1000}
            max={50000}
            step={500}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            className="w-full h-3 sm:h-4 bg-[#210406] rounded-lg appearance-none cursor-pointer accent-gold border border-gold/60 shadow-inner focus:outline-none"
          />

          {/* Preset Buttons Grid on Mobile */}
          <div className="grid grid-cols-5 sm:flex sm:justify-between items-center gap-1.5 pt-1">
            {[1000, 3000, 5000, 6000, 10000, 15000, 20000, 30000, 50000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setMonthlyAmount(amt)}
                className={`py-1 text-[0.58rem] sm:text-xs rounded font-semibold text-center transition-all border ${
                  monthlyAmount === amt
                    ? "bg-gold text-primary-foreground border-gold font-extrabold shadow scale-105"
                    : "bg-onyx/60 text-muted-foreground border-border/40 hover:text-gold hover:border-gold/50"
                }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Highlight Summary Cards */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gold/20 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-[#4a0810]/60 border border-gold/30 p-2 sm:p-3 rounded flex flex-col justify-center">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium">
              Target Value
            </p>
            <p className="font-display text-sm sm:text-2xl font-bold text-amber-300 mt-0.5 truncate">
              ₹{targetMaturity.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#4a0810]/60 border border-gold/30 p-2 sm:p-3 rounded flex flex-col justify-center">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium">
              Customer Profit
            </p>
            <p className="font-display text-sm sm:text-2xl font-bold text-emerald-400 mt-0.5 truncate">
              ₹{(monthlyAmount * 7).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#4a0810]/60 border border-gold/30 p-2 sm:p-3 rounded flex flex-col justify-center">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium">
              Full Bonus
            </p>
            <p className="font-display text-[0.62rem] sm:text-xl font-bold text-gold mt-0.5 leading-tight">
              100% 1st Month
            </p>
          </div>
        </div>
      </div>

      {/* Swipe Hint for Mobile View */}
      <div className="flex items-center justify-between text-[0.55rem] sm:text-xs text-gold/80 font-medium mb-2 px-1">
        <span>Draw Breakdown Matrix</span>
        <span className="sm:hidden text-amber-200">← Swipe left to view table →</span>
      </div>

      {/* Interactive Scheme Matrix Table */}
      <div className="overflow-x-auto rounded-md border border-gold/40 shadow-2xl no-scrollbar">
        <table className="w-full border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#8b1524] text-amber-200 border-b border-gold/50 text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <th key={i} className="p-2 sm:p-3 border-r border-gold/30 min-w-[70px] sm:min-w-[85px]">
                  DRAW {i + 1}
                </th>
              ))}
              <th className="p-2 sm:p-3 border-r border-gold/30 bg-[#6b0f1a] text-gold font-extrabold min-w-[95px] sm:min-w-[120px]">
                Maturity
              </th>
              <th className="p-2 sm:p-3 bg-[#4a0810] text-emerald-300 font-extrabold min-w-[95px] sm:min-w-[120px]">
                Net Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: totalDraws - 1 }).map((_, paidDrawsIndex) => {
              const paidDraws = paidDrawsIndex + 1;
              const netProfit = monthlyAmount * (totalDraws - paidDraws);

              return (
                <tr
                  key={paidDraws}
                  className={`border-b border-gold/20 transition-colors hover:bg-gold/10 ${
                    paidDraws % 2 === 0 ? "bg-[#38090d]/60" : "bg-[#270508]/60"
                  }`}
                >
                  {Array.from({ length: totalDraws }).map((_, drawIndex) => {
                    const isPaid = drawIndex < paidDraws;
                    return (
                      <td
                        key={drawIndex}
                        className={`p-2 sm:p-3 border-r border-gold/20 text-[0.62rem] sm:text-sm font-medium ${
                          isPaid ? "text-foreground font-semibold" : "text-rose-400 font-bold bg-rose-950/40 text-[0.55rem]"
                        }`}
                      >
                        {isPaid ? (
                          monthlyAmount.toLocaleString("en-IN")
                        ) : (
                          <span className="block leading-tight text-rose-300">
                            Stop
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="p-2 sm:p-3 border-r border-gold/30 font-display text-xs sm:text-base font-bold text-amber-200 bg-[#4a0810]/40">
                    ₹{targetMaturity.toLocaleString("en-IN")}
                  </td>
                  <td className="p-2 sm:p-3 font-display text-xs sm:text-base font-bold text-emerald-400 bg-[#2d080a]/80">
                    ₹{netProfit.toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}

            {/* Full Payment Row */}
            <tr className="bg-[#6b0f1a] text-gold font-bold border-t-2 border-gold text-[0.62rem] sm:text-sm">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <td key={i} className="p-2 sm:p-3 border-r border-gold/40 text-amber-200">
                  ₹{monthlyAmount.toLocaleString("en-IN")}
                </td>
              ))}
              <td className="p-2 sm:p-3 border-r border-gold/40 font-display text-xs sm:text-lg text-amber-200">
                ₹{targetMaturity.toLocaleString("en-IN")}
              </td>
              <td className="p-2 sm:p-3 font-display text-xs sm:text-lg text-emerald-300">
                +₹{monthlyAmount.toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-onyx/90 p-4 sm:p-5 rounded-md border border-gold/30 text-left">
        <div>
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-widest text-gold font-bold">
            Join SwarnaNidhi Gold Scheme Today
          </p>
          <p className="text-[0.62rem] sm:text-xs text-muted-foreground mt-0.5">
            Visit A.P.P. Jewellers in Sarafa Market or enroll via WhatsApp.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/919015155615?text=Hi%20A.P.P.%20Jewellers,%20I%20want%20to%20enroll%20in%20the%20SwarnaNidhi%20Gold%20Purchase%20Scheme."
            target="_blank"
            rel="noreferrer"
            className="shine-sweep flex-1 sm:flex-initial rounded border border-emerald-500/70 bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-[0.58rem] sm:text-xs uppercase tracking-widest text-emerald-400 font-bold text-center hover:bg-emerald-500/10 transition-all"
          >
            Enroll via WhatsApp
          </a>
          <a
            href="tel:09015155615"
            className="flex-1 sm:flex-initial rounded border border-gold/60 px-4 sm:px-6 py-2.5 sm:py-3 text-[0.58rem] sm:text-xs uppercase tracking-widest text-gold font-bold text-center hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            Call: 090151 55615
          </a>
        </div>
      </div>
    </div>
  );
}
