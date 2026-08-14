import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { GoldSchemeCalculator } from "@/components/GoldSchemeCalculator";

const title = "SwarnaNidhi Gold Purchase Scheme — A.P.P. Jewellers, New Delhi";
const description =
  "Calculate your gold purchase scheme savings with A.P.P. Jewellers SwarnaNidhi scheme. Auto-calculate monthly installments, maturity values, and guaranteed bonuses.";

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

function SchemePage() {
  return (
    <>
      <Nav />
      <main className="page-enter relative px-3 sm:px-6 pb-20 sm:pb-32 pt-24 sm:pt-36 bg-background text-foreground min-h-screen overflow-hidden">
        {/* Ambient Glow Backdrop matching SwarnaNidhi home section */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] sm:size-[900px] bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow text-[0.55rem] sm:text-xs">Gold Purchase Scheme · A.P.P. Jewellers</p>
              <h1 className="mt-3 font-display text-2xl sm:text-5xl leading-tight font-bold text-[#9b111e]">
                SwarnaNidhi <span className="italic shimmer-text">Gold Savings Plan</span>
              </h1>
              <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm font-light leading-relaxed text-muted-foreground px-2">
                Plan your gold & diamond purchases systematically with monthly installments and receive maximum net profit and guaranteed store bonuses upon maturity.
              </p>
              <div className="rule-gold mx-auto mt-6 w-32" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <GoldSchemeCalculator />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
