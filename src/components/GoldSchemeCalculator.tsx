import { useState } from "react";
import logoImg from "@/assets/logo.png";

export function GoldSchemeCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(6000);
  const totalDraws = 8;
  const targetMaturity = monthlyAmount * totalDraws;

  return (
    <div className="w-full max-w-6xl mx-auto my-6 sm:my-12 p-3 sm:p-8 bg-onyx border border-gold/30 rounded-lg shadow-sm text-foreground">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-gold/60 rounded-md p-4 sm:p-6 text-center relative overflow-hidden shadow-xl mb-6 sm:mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-10 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.4)] shrink-0"
            />
            <div>
              <h2 className="font-display text-lg sm:text-3xl text-amber-200 font-bold tracking-wider leading-tight">
                A.P.P. JEWELLERS
              </h2>
              <p className="text-[0.55rem] sm:text-xs uppercase tracking-[0.2em] text-amber-100/90 font-light">
                SwarnaNidhi Gold Purchase Scheme
              </p>
            </div>
          </div>

          <div className="bg-black/20 border border-gold/50 px-4 sm:px-6 py-2.5 sm:py-4 rounded-md text-center w-full md:max-w-md">
            <p className="font-display text-xs sm:text-xl font-bold tracking-wider text-amber-200 uppercase leading-snug">
              IF ALL INSTALLMENTS ARE PAID ON DUE DATE
            </p>
            <p className="text-[0.52rem] sm:text-[0.68rem] text-amber-100/90 uppercase tracking-widest mt-0.5">
              Guaranteed Bonus & Jewellery Purchase Benefit
            </p>
          </div>
        </div>
      </div>

      {/* Auto-Calculation Controls */}
      <div className="bg-[#fafafb] border border-gold/30 rounded-md p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 text-left">
          <div>
            <h3 className="text-[#b8860b] font-display text-base sm:text-xl font-semibold">
              Calculate Your Gold Scheme Earnings
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              Select or type your monthly installment amount from ₹1,000 to ₹50,000.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 bg-white border border-gold/50 px-4 py-2 rounded shadow-sm w-full md:w-auto">
            <span className="text-[#b8860b] font-display text-lg sm:text-2xl font-bold">₹</span>
            <input
              type="number"
              min={1000}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Math.max(1000, Math.min(50000, Number(e.target.value) || 0)))}
              className="w-24 sm:w-32 bg-transparent text-lg sm:text-2xl font-bold text-foreground focus:outline-none text-right"
            />
            <span className="text-[0.62rem] sm:text-xs uppercase tracking-widest text-[#b8860b] font-semibold">/ month</span>
          </div>
        </div>

        {/* Scroll Bar Track */}
        <div className="space-y-3 sm:space-y-4 bg-white p-3 sm:p-5 rounded-lg border border-gold/25 shadow-sm">
          <div className="flex items-center justify-between text-[0.65rem] sm:text-xs uppercase tracking-widest text-[#b8860b] font-bold">
            <span>Monthly Installment Slider</span>
            <span className="text-foreground text-xs sm:text-sm font-bold">
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
            className="w-full h-2.5 sm:h-3.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#b8860b] border border-gold/30 shadow-inner focus:outline-none"
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
                    ? "bg-[#b8860b] text-white border-[#b8860b] font-extrabold shadow scale-105"
                    : "bg-white text-foreground border-gold/30 hover:text-[#b8860b] hover:border-gold"
                }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Highlight Summary Cards */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gold/20 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-[#faf9f5] border border-amber-200 p-2.5 sm:p-4 rounded-lg flex flex-col justify-center shadow-sm">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-muted-foreground font-semibold">
              Target Value
            </p>
            <p className="font-display text-sm sm:text-2xl font-bold text-[#b8860b] mt-0.5 truncate">
              ₹{targetMaturity.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#ecfdf5] border border-emerald-300 p-2.5 sm:p-4 rounded-lg flex flex-col justify-center shadow-sm">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-emerald-800 font-semibold">
              Customer Profit
            </p>
            <p className="font-display text-sm sm:text-2xl font-bold text-[#059669] mt-0.5 truncate">
              ₹{(monthlyAmount * 7).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#fffbeb] border border-amber-300 p-2.5 sm:p-4 rounded-lg flex flex-col justify-center shadow-sm">
            <p className="text-[0.48rem] sm:text-[0.65rem] uppercase tracking-wider text-amber-800 font-semibold">
              Full Bonus
            </p>
            <p className="font-display text-[0.62rem] sm:text-xl font-bold text-[#d97706] mt-0.5 leading-tight">
              100% 1st Month
            </p>
          </div>
        </div>
      </div>

      {/* Swipe Hint for Mobile View */}
      <div className="flex items-center justify-between text-[0.55rem] sm:text-xs text-[#b8860b] font-semibold mb-2 px-1">
        <span>Draw Breakdown Matrix</span>
        <span className="sm:hidden text-muted-foreground">← Swipe left to view table →</span>
      </div>

      {/* Interactive Scheme Matrix Table */}
      <div className="overflow-x-auto rounded-lg border border-gold/40 shadow-md bg-white no-scrollbar">
        <table className="w-full border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#121212] text-amber-200 border-b border-gold/40 text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <th key={i} className="p-2.5 sm:p-3 border-r border-zinc-700 min-w-[70px] sm:min-w-[85px]">
                  DRAW {i + 1}
                </th>
              ))}
              <th className="p-2.5 sm:p-3 border-r border-zinc-700 bg-[#1e1e1e] text-amber-300 font-extrabold min-w-[95px] sm:min-w-[120px]">
                Maturity
              </th>
              <th className="p-2.5 sm:p-3 bg-[#064e3b] text-emerald-300 font-extrabold min-w-[95px] sm:min-w-[120px]">
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
                  className={`border-b border-zinc-200 transition-colors hover:bg-amber-50/50 ${
                    paidDraws % 2 === 0 ? "bg-[#fafafc]" : "bg-white"
                  }`}
                >
                  {Array.from({ length: totalDraws }).map((_, drawIndex) => {
                    const isPaid = drawIndex < paidDraws;
                    return (
                      <td
                        key={drawIndex}
                        className="p-2.5 sm:p-3 border-r border-zinc-200 text-[0.62rem] sm:text-sm font-medium"
                      >
                        {isPaid ? (
                          <span className="text-foreground font-semibold">
                            ₹{monthlyAmount.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="inline-block bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded text-[0.55rem] font-bold">
                            Stop
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="p-2.5 sm:p-3 border-r border-zinc-200 font-display text-xs sm:text-base font-bold text-[#b8860b] bg-[#fffdf5]">
                    ₹{targetMaturity.toLocaleString("en-IN")}
                  </td>
                  <td className="p-2.5 sm:p-3 font-display text-xs sm:text-base font-bold text-[#059669] bg-[#ecfdf5]">
                    ₹{netProfit.toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}

            {/* Full Payment Row */}
            <tr className="bg-[#121212] text-amber-300 font-bold border-t-2 border-[#b8860b] text-[0.62rem] sm:text-sm">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <td key={i} className="p-2.5 sm:p-3 border-r border-zinc-700 text-amber-200 font-bold">
                  ₹{monthlyAmount.toLocaleString("en-IN")}
                </td>
              ))}
              <td className="p-2.5 sm:p-3 border-r border-zinc-700 font-display text-xs sm:text-lg text-amber-300 font-bold">
                ₹{targetMaturity.toLocaleString("en-IN")}
              </td>
              <td className="p-2.5 sm:p-3 font-display text-xs sm:text-lg text-emerald-400 font-extrabold bg-[#064e3b]">
                +₹{monthlyAmount.toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-md border border-gold/30 shadow-sm text-left">
        <div>
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-widest text-[#b8860b] font-bold">
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
            className="shine-sweep flex-1 sm:flex-initial rounded border border-emerald-600 bg-emerald-50 px-4 sm:px-6 py-2.5 sm:py-3 text-[0.58rem] sm:text-xs uppercase tracking-widest text-emerald-700 font-bold text-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            Enroll via WhatsApp
          </a>
          <a
            href="tel:09015155615"
            className="flex-1 sm:flex-initial rounded border border-gold/60 bg-gold/10 px-4 sm:px-6 py-2.5 sm:py-3 text-[0.58rem] sm:text-xs uppercase tracking-widest text-[#b8860b] font-bold text-center hover:bg-gold hover:text-white transition-colors"
          >
            Call: 090151 55615
          </a>
        </div>
      </div>
    </div>
  );
}
