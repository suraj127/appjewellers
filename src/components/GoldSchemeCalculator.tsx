import { useState } from "react";
import logoImg from "@/assets/logo.png";

export function GoldSchemeCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(6000);
  const totalDraws = 8;
  const targetMaturity = monthlyAmount * totalDraws;

  const presetAmounts = [1000, 2000, 3000, 5000, 6000, 10000, 15000, 20000];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 p-4 sm:p-8 bg-gradient-to-b from-[#2d080a] via-[#1a0406] to-onyx border border-gold/40 rounded-lg shadow-2xl text-foreground">
      {/* Header Banner matching SwarnaNidhi Gold Purchase Scheme */}
      <div className="bg-[#6b0f1a] border border-gold/60 rounded-md p-6 text-center relative overflow-hidden shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-16 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(252,211,77,0.4)]"
            />
            <div className="text-left">
              <h2 className="font-display text-2xl sm:text-3xl text-gold font-bold tracking-wider">
                A.P.P. JEWELLERS
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-gold/80 font-light">
                SwarnaNidhi Gold Purchase Scheme
              </p>
            </div>
          </div>

          <div className="bg-[#4a0810] border-2 border-gold/70 px-6 py-4 rounded-md text-center max-w-md">
            <p className="font-display text-lg sm:text-xl font-bold tracking-wider text-amber-200 uppercase leading-snug">
              IF ALL INSTALLMENTS ARE PAID ON THE DUE DATE
            </p>
            <p className="text-[0.68rem] text-gold/90 uppercase tracking-widest mt-1">
              Guaranteed Bonus & Jewellery Purchase Benefit
            </p>
          </div>
        </div>
      </div>

      {/* Auto-Calculation Controls */}
      <div className="bg-onyx/90 border border-gold/30 rounded-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-gold font-display text-xl font-semibold">
              Scroll & Auto-Calculate Gold Scheme Earnings
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-1">
              Drag the scroll bar below to select your monthly installment amount from ₹1,000 to ₹50,000.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#4a0810] border-2 border-gold/60 px-5 py-2.5 rounded shadow-lg self-start md:self-auto">
            <span className="text-gold font-display text-2xl font-bold">₹</span>
            <input
              type="number"
              min={1000}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Math.max(1000, Math.min(50000, Number(e.target.value) || 0)))}
              className="w-32 bg-transparent text-2xl font-bold text-amber-200 focus:outline-none text-right"
            />
            <span className="text-xs uppercase tracking-widest text-gold/90 font-semibold">/ month</span>
          </div>
        </div>

        {/* Scroll Bar Track */}
        <div className="space-y-4 bg-black/40 p-5 rounded-lg border border-gold/30">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gold font-bold mb-1">
            <span>Scroll Bar</span>
            <span className="text-amber-200 text-sm font-bold">
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
            className="w-full h-4 bg-[#210406] rounded-lg appearance-none cursor-pointer accent-gold border border-gold/60 shadow-inner focus:outline-none"
          />

          {/* Quick Clickable Markers on the Scroll Bar */}
          <div className="flex justify-between items-center text-[0.65rem] sm:text-xs font-semibold text-muted-foreground pt-1 flex-wrap gap-1">
            {[1000, 3000, 5000, 6000, 10000, 15000, 20000, 30000, 50000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setMonthlyAmount(amt)}
                className={`px-2 py-1 rounded transition-all ${
                  monthlyAmount === amt
                    ? "bg-gold text-primary-foreground font-extrabold shadow scale-105"
                    : "hover:text-gold hover:bg-gold/10"
                }`}
              >
                ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Highlight summary */}
        <div className="mt-6 pt-6 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#4a0810]/60 border border-gold/30 p-3 rounded">
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Total Target Value
            </p>
            <p className="font-display text-2xl font-bold text-amber-300 mt-1">
              ₹{targetMaturity.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#4a0810]/60 border border-gold/30 p-3 rounded">
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Maximum Net Customer Profit
            </p>
            <p className="font-display text-2xl font-bold text-emerald-400 mt-1">
              ₹{(monthlyAmount * 7).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#4a0810]/60 border border-gold/30 p-3 rounded">
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Full Payment Bonus
            </p>
            <p className="font-display text-2xl font-bold text-gold mt-1">
              100% 1st Installment Match
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Scheme Matrix Table matching input_file_1.png */}
      <div className="overflow-x-auto rounded-md border border-gold/40 shadow-2xl">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-[#8b1524] text-amber-200 border-b border-gold/50 text-xs sm:text-sm font-bold uppercase tracking-wider">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <th key={i} className="p-3 border-r border-gold/30 min-w-[85px]">
                  DRAW <br /> {i + 1}
                  {i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}
                </th>
              ))}
              <th className="p-3 border-r border-gold/30 bg-[#6b0f1a] text-gold font-extrabold min-w-[120px]">
                Maturity Value
              </th>
              <th className="p-3 bg-[#4a0810] text-emerald-300 font-extrabold min-w-[120px]">
                Your Net Profit
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
                        className={`p-3 border-r border-gold/20 font-medium ${
                          isPaid ? "text-foreground font-semibold" : "text-rose-400 font-bold bg-rose-950/40 text-xs"
                        }`}
                      >
                        {isPaid ? (
                          monthlyAmount.toLocaleString("en-IN")
                        ) : (
                          <span className="block leading-tight text-rose-300">
                            Stop <br /> Payment
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="p-3 border-r border-gold/30 font-display text-base font-bold text-amber-200 bg-[#4a0810]/40">
                    ₹{targetMaturity.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 font-display text-base font-bold text-emerald-400 bg-[#2d080a]/80">
                    ₹{netProfit.toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}

            {/* Full Payment Row */}
            <tr className="bg-[#6b0f1a] text-gold font-bold border-t-2 border-gold">
              {Array.from({ length: totalDraws }).map((_, i) => (
                <td key={i} className="p-3 border-r border-gold/40 text-amber-200">
                  ₹{monthlyAmount.toLocaleString("en-IN")}
                </td>
              ))}
              <td className="p-3 border-r border-gold/40 font-display text-lg text-amber-200">
                ₹{targetMaturity.toLocaleString("en-IN")}
              </td>
              <td className="p-3 font-display text-lg text-emerald-300">
                + ₹{monthlyAmount.toLocaleString("en-IN")} Bonus
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-onyx/80 p-5 rounded-md border border-gold/30">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold font-medium">
            Join SwarnaNidhi Gold Scheme Today
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Visit A.P.P. Jewellers, Sarafa Market, New Seelampur or chat on WhatsApp to enroll.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/919015155615?text=Hi%20A.P.P.%20Jewellers,%20I%20want%20to%20enroll%20in%20the%20SwarnaNidhi%20Gold%20Purchase%20Scheme."
            target="_blank"
            rel="noreferrer"
            className="shine-sweep flex-1 sm:flex-initial rounded border border-emerald-500/70 bg-transparent px-6 py-3 text-xs uppercase tracking-widest text-emerald-400 font-bold text-center hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
          >
            Enroll via WhatsApp
          </a>
          <a
            href="tel:09015155615"
            className="flex-1 sm:flex-initial rounded border border-gold/60 px-6 py-3 text-xs uppercase tracking-widest text-gold font-bold text-center hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            Call: 090151 55615
          </a>
        </div>
      </div>
    </div>
  );
}
