import { useState } from "react";
import { ShieldCheck, Gift, ArrowRight, Phone, CheckCircle2, ChevronRight } from "lucide-react";
import logoImg from "@/assets/logo.png";

export function GoldSchemeCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(6000);
  const totalDraws = 8;
  const targetMaturity = monthlyAmount * totalDraws;
  const customerPaid = monthlyAmount * 7;
  const storeBonus = monthlyAmount;

  return (
    <div className="w-full max-w-6xl mx-auto my-8 sm:my-14 bg-white border border-gold/35 rounded-2xl shadow-xl overflow-hidden text-foreground">
      {/* ── 1. HEADER HERO BANNER ── */}
      <div className="bg-gradient-to-r from-[#121215] via-[#1c1c22] to-[#121215] p-5 sm:p-8 text-white border-b border-gold/40 relative overflow-hidden">
        {/* Ambient Gold Glow Backdrop */}
        <div className="absolute top-0 right-0 size-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-left">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-14 sm:h-18 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] shrink-0"
            />
            <div>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-bold block">
                Official Gold Purchase Plan
              </span>
              <h2 className="font-display text-xl sm:text-3xl text-white font-bold tracking-wide leading-tight mt-0.5">
                SwarnaNidhi <span className="italic shimmer-text text-amber-200">Gold Savings</span>
              </h2>
              <p className="text-xs text-zinc-300 font-light mt-1">
                Shop No. D-155, Sarafa Market, New Seelampur, Delhi
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-gold/50 px-5 py-3 rounded-xl text-center md:text-right w-full md:w-auto shadow-lg">
            <span className="text-[0.55rem] uppercase tracking-[0.25em] text-gold font-bold block">
              Guaranteed Store Privilege
            </span>
            <p className="font-display text-sm sm:text-lg font-bold text-amber-200 mt-0.5">
              100% 1st Month Contribution Paid By Us
            </p>
            <span className="text-[0.62rem] text-zinc-300 font-light block mt-0.5">
              Pay 7 Months · Get 8 Months Jewellery Value
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {/* ── 2. INTERACTIVE CONTROLS SECTION ── */}
        <div className="bg-[#fafafc] border border-gold/30 rounded-xl p-4 sm:p-7 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-left">
            <div>
              <span className="text-[0.62rem] uppercase tracking-widest text-gold font-bold block">
                Step 1: Select Your Monthly Plan
              </span>
              <h3 className="text-foreground font-display text-lg sm:text-2xl font-bold mt-1">
                Choose Monthly Installment
              </h3>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                Adjust the slider or pick a preset tier from ₹1,000 to ₹50,000 per month.
              </p>
            </div>

            {/* Custom Amount Display & Direct Input */}
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-white border-2 border-gold/50 px-5 py-2.5 rounded-xl shadow-sm w-full md:w-auto">
              <span className="text-gold font-display text-xl sm:text-2xl font-bold">₹</span>
              <input
                type="number"
                min={1000}
                max={50000}
                step={500}
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Math.max(1000, Math.min(50000, Number(e.target.value) || 0)))}
                className="w-28 sm:w-36 bg-transparent text-xl sm:text-2xl font-bold text-foreground focus:outline-none text-right font-display"
              />
              <span className="text-xs uppercase tracking-wider text-gold font-bold">/ Month</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-4 bg-white p-4 sm:p-6 rounded-xl border border-gold/25 shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-gold font-bold">
              <span>Installment Range (₹1,000 – ₹50,000)</span>
              <span className="text-foreground font-bold text-sm">
                Selected: ₹{monthlyAmount.toLocaleString("en-IN")} / mo
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#b8860b] border border-gold/30 shadow-inner focus:outline-none"
            />

            {/* Quick Preset Buttons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 pt-1">
              {[1000, 3000, 5000, 6000, 10000, 15000, 20000, 30000, 50000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyAmount(amt)}
                  className={`py-1.5 text-[0.65rem] sm:text-xs rounded-lg font-semibold text-center transition-all border ${
                    monthlyAmount === amt
                      ? "bg-[#b8860b] text-white border-[#b8860b] font-bold shadow-md scale-105"
                      : "bg-[#fafafc] text-foreground border-zinc-200 hover:text-gold hover:border-gold/60"
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>
          </div>

          {/* ── 3. DYNAMIC METRIC SUMMARY CARDS ── */}
          <div className="mt-6 pt-6 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            {/* Target Maturity Card */}
            <div className="bg-gradient-to-br from-[#fffdf5] to-[#fef9e7] border border-amber-300/80 p-4 sm:p-5 rounded-xl flex flex-col justify-center shadow-sm relative overflow-hidden">
              <span className="text-[0.62rem] uppercase tracking-widest text-amber-800 font-bold block">
                Total Jewellery Value
              </span>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#b8860b] mt-1">
                ₹{targetMaturity.toLocaleString("en-IN")}
              </p>
              <span className="text-[0.62rem] text-muted-foreground mt-0.5">
                Redeem on Gold & Diamonds
              </span>
            </div>

            {/* You Pay Card */}
            <div className="bg-[#fafafc] border border-zinc-300 p-4 sm:p-5 rounded-xl flex flex-col justify-center shadow-sm">
              <span className="text-[0.62rem] uppercase tracking-widest text-zinc-600 font-bold block">
                You Pay (7 Installments)
              </span>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                ₹{customerPaid.toLocaleString("en-IN")}
              </p>
              <span className="text-[0.62rem] text-muted-foreground mt-0.5">
                7 Monthly Payments
              </span>
            </div>

            {/* Free Store Bonus Card */}
            <div className="bg-gradient-to-br from-[#fbf8ee] to-[#f4ecd8] border border-gold/40 p-4 sm:p-5 rounded-xl flex flex-col justify-center shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-center gap-1 text-[0.62rem] uppercase tracking-widest text-[#8b5a00] font-bold">
                <Gift className="size-3 text-[#b8860b]" />
                <span>Store Gift (100% 1st Month)</span>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#8b5a00] mt-1">
                +₹{storeBonus.toLocaleString("en-IN")}
              </p>
              <span className="text-[0.62rem] text-[#8b5a00]/80 font-medium mt-0.5">
                Paid Directly By A.P.P. Jewellers
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. INTERACTIVE DRAW MATRIX TABLE ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-gold font-bold mb-3 px-1">
            <span className="uppercase tracking-wider flex items-center gap-1.5">
              Draw Breakdown & Maturity Matrix
            </span>
            <span className="sm:hidden text-muted-foreground text-[0.65rem]">
              ← Swipe table horizontally →
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gold/40 shadow-md bg-white no-scrollbar">
            <table className="w-full border-collapse text-center text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#121215] text-amber-200 border-b border-gold/40 text-[0.62rem] sm:text-xs font-bold uppercase tracking-wider">
                  {Array.from({ length: totalDraws }).map((_, i) => (
                    <th key={i} className="p-3 border-r border-zinc-700 min-w-[75px] sm:min-w-[90px]">
                      DRAW {i + 1}
                    </th>
                  ))}
                  <th className="p-3 border-r border-zinc-700 bg-[#1a1a20] text-amber-300 font-extrabold min-w-[100px] sm:min-w-[130px]">
                    Total Maturity
                  </th>
                  <th className="p-3 bg-[#241f17] text-amber-200 font-extrabold min-w-[100px] sm:min-w-[130px]">
                    Net Profit / Gain
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 font-medium text-foreground bg-zinc-50/50">
                  {Array.from({ length: totalDraws }).map((_, i) => (
                    <td key={i} className="p-3 border-r border-zinc-200">
                      ₹{monthlyAmount.toLocaleString("en-IN")}
                    </td>
                  ))}
                  <td className="p-3 border-r border-zinc-200 font-display text-xs sm:text-lg text-foreground font-extrabold">
                    ₹{targetMaturity.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 font-display text-xs sm:text-lg text-[#8b5a00] font-extrabold bg-[#fbf8ee]">
                    +₹{monthlyAmount.toLocaleString("en-IN")} Free
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 5. DIRECT ENROLLMENT CALL TO ACTION ── */}
        <div className="bg-gradient-to-r from-[#121215] via-[#1e1e24] to-[#121215] p-5 sm:p-7 rounded-xl border border-gold/40 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="text-left">
            <span className="text-[0.62rem] uppercase tracking-widest text-gold font-bold block">
              Instant Enrollment Desk
            </span>
            <h4 className="font-display text-lg sm:text-2xl font-bold text-white mt-0.5">
              Start Your Plan for ₹{monthlyAmount.toLocaleString("en-IN")}/Month
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-1">
              Join online via WhatsApp or visit our flagship showroom in Sarafa Market, New Seelampur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/919015155615?text=Hi%20A.P.P.%20Jewellers,%20I%20want%20to%20enroll%20in%20the%20SwarnaNidhi%20Gold%20Scheme%20for%20₹${monthlyAmount.toLocaleString("en-IN")}/month.`}
              target="_blank"
              rel="noreferrer"
              className="shine-sweep flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] hover:brightness-110 px-6 py-3 text-xs uppercase tracking-widest text-black font-extrabold transition-all shadow-md active:scale-95"
            >
              <span>Enroll via WhatsApp</span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href="tel:09015155615"
              className="flex items-center justify-center gap-2 rounded-lg border border-gold/60 bg-gold/15 hover:bg-gold hover:text-black px-6 py-3 text-xs uppercase tracking-widest text-gold font-bold transition-all"
            >
              <Phone className="size-4" />
              <span>Call: 090151 55615</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
