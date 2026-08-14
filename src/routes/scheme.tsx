import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { GoldSchemeCalculator } from "@/components/GoldSchemeCalculator";
import {
  Crown,
  ShieldCheck,
  Gift,
  Coins,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
} from "lucide-react";

const title = "SwarnaNidhi Gold Savings Scheme — A.P.P. Jewellers, Delhi";
const description =
  "Official SwarnaNidhi Gold Purchase Scheme by A.P.P. Jewellers, Sarafa Market Delhi. Pay 7 installments, get 100% 1st month bonus on maturity. Calculate returns online.";

export const Route = createFileRoute("/scheme")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SchemePage,
});

const TRUST_PILLARS = [
  {
    icon: Gift,
    title: "100% 1st Month Store Bonus",
    desc: "A.P.P. Jewellers pays your 8th month installment as a gift upon on-time maturity.",
  },
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked Purity",
    desc: "Redeem against certified 22K 916 Gold, 18K Diamond Solitaires & Royal Kundan sets.",
  },
  {
    icon: Coins,
    title: "Systematic Gold Wealth",
    desc: "Shield against gold price fluctuations with disciplined monthly micro-investments.",
  },
  {
    icon: Crown,
    title: "Zero Making Charge Perks",
    desc: "Enjoy exclusive VIP Karigar discounts on making charges when purchasing your jewellery.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Select Monthly Plan",
    desc: "Choose an installment starting from ₹1,000 to ₹50,000/month suited to your budget.",
  },
  {
    step: "02",
    title: "Pay 7 Monthly Installments",
    desc: "Make convenient monthly payments via UPI, Card, Net Banking or in-store at Sarafa Market.",
  },
  {
    step: "03",
    title: "We Contribute 8th Month",
    desc: "A.P.P. Jewellers adds a full 100% month bonus to your account upon regular completion.",
  },
  {
    step: "04",
    title: "Take Home Pure Gold",
    desc: "Redeem your total maturity value across our entire gold and diamond showroom collection.",
  },
];

const FAQS = [
  {
    q: "Can I redeem my scheme for both Gold and Diamond jewellery?",
    a: "Yes! Your SwarnaNidhi maturity value can be redeemed across all categories: 22K Hallmarked Gold, 18K Diamond Jewellery, Solitaires, Kundan Bridal Sets, Polki, and Gold Bangles.",
  },
  {
    q: "What is the 100% 1st Month Contribution benefit?",
    a: "When you pay all installments by their due dates for 7 months, A.P.P. Jewellers contributes 100% of your first month's installment value directly into your total jewellery maturity amount.",
  },
  {
    q: "Can I join online or do I need to visit the showroom?",
    a: "You can join instantly online via WhatsApp by sending your chosen monthly amount, or visit our flagship showroom at Shop No. D-155, Sarafa Market, New Seelampur, Delhi.",
  },
  {
    q: "What if I need to withdraw or stop early?",
    a: "Our Draw Breakdown Matrix clearly outlines your exact guaranteed maturity value and net profit at every individual monthly draw stage without any penalty deductions.",
  },
];

function SchemePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Nav />
      <main className="page-enter relative bg-white text-foreground min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-32 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gold/5 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
          {/* ── 1. LUXURY PAGE HEADER ── */}
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] text-[#b8860b] font-bold shadow-sm">
                <span>A.P.P. Jewellers · Sarafa Market Delhi</span>
              </span>

              <h1 className="mt-4 font-display text-3xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                SwarnaNidhi <span className="italic shimmer-text text-[#b8860b]">Gold Savings Plan</span>
              </h1>

              <p className="mt-4 text-xs sm:text-base font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Build your family's gold and diamond collection systematically with guaranteed 100% 1st month store bonus contributions, certified BIS hallmark purity, and zero market loss protection.
              </p>

              <div className="rule-gold mx-auto mt-6 w-32" />
            </div>
          </Reveal>

          {/* ── 2. TRUST HIGHLIGHTS (4 PILLARS) ── */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 my-10 sm:my-14">
              {TRUST_PILLARS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 rounded-xl bg-[#fafafa] border border-gold/25 hover:border-gold/60 transition-all duration-300 shadow-sm text-left group hover:-translate-y-1"
                  >
                    <div className="size-10 sm:size-12 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-[#b8860b] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="size-5 sm:size-6" />
                    </div>
                    <h3 className="font-display text-xs sm:text-base font-bold text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[0.68rem] sm:text-xs text-muted-foreground font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* ── 3. INTERACTIVE GOLD CALCULATOR & MATRIX ── */}
          <Reveal delay={150}>
            <GoldSchemeCalculator />
          </Reveal>

          {/* ── 4. HOW SWARNANIDHI WORKS (4 STEPS) ── */}
          <section className="my-16 sm:my-24">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold block">
                  Simple 4-Step Process
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-foreground">
                  How <span className="italic shimmer-text text-[#b8860b]">SwarnaNidhi</span> Works
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-light">
                  From your first installment to taking home pure hallmarked gold jewellery.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STEPS.map((s, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="p-5 sm:p-6 rounded-xl bg-white border border-gold/30 shadow-md relative overflow-hidden text-left h-full flex flex-col justify-between">
                    <div>
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-gold/40 block mb-2">
                        {s.step}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground font-light leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gold/15 flex items-center gap-1.5 text-[0.65rem] text-[#b8860b] font-semibold">
                      <CheckCircle2 className="size-3.5" />
                      <span>Verified Scheme Privilege</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── 5. FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
          <section className="my-16 sm:my-24 max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold block">
                  Got Questions?
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-foreground">
                  Frequently Asked <span className="italic shimmer-text text-[#b8860b]">Questions</span>
                </h2>
              </div>
            </Reveal>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gold/30 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display text-xs sm:text-base font-semibold text-foreground hover:text-[#b8860b] transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="size-4 text-gold shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`size-4 text-gold shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed border-t border-gold/15 bg-[#fafafa]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 6. FLAGSHIP SHOWROOM DETAILS ── */}
          <Reveal>
            <div className="my-12 sm:my-20 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-[#121215] via-[#1a1a20] to-[#121215] border border-gold/40 text-white text-center sm:text-left shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold block">
                    Flagship Showroom Desk
                  </span>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                    Visit A.P.P. Jewellers in Sarafa Market
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Delhi 110053 · Open all 7 days from 11:00 AM to 8:30 PM.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                  <a
                    href="tel:09015155615"
                    className="shine-sweep flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-6 py-3.5 text-xs uppercase tracking-widest text-black font-extrabold shadow-lg hover:scale-105 transition-transform"
                  >
                    <Phone className="size-4 fill-black" />
                    <span>Call: 090151 55615</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Shop+No.+D-155,+Sarafa+Market,+New+Seelampur+Phase+II,+New+Seelampur,+Seelampur,+New+Delhi,+Delhi,+110053"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gold/60 bg-white/10 hover:bg-white/20 px-6 py-3.5 text-xs uppercase tracking-widest text-white font-bold transition-all"
                  >
                    <MapPin className="size-4 text-gold" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
