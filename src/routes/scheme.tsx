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
      <main className="px-6 pb-32 pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Gold Purchase Scheme · A.P.P. Jewellers</p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
                SwarnaNidhi <span className="italic shimmer-text">Gold Savings Plan</span>
              </h1>
              <p className="mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed text-muted-foreground">
                Plan your gold & diamond purchases systematically with monthly installments and receive maximum net profit and guaranteed store bonuses upon maturity.
              </p>
              <div className="rule-gold mx-auto mt-8 w-40" />
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
