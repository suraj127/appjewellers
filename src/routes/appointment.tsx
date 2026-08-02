import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { AppointmentForm } from "@/components/AppointmentForm";

const title = "Book a Private Viewing — A.P.P. Jewellers";
const description =
  "Reserve a private viewing at A.P.P. Jewellers, Shop No. D-155, Sarafa Market, New Seelampur, New Delhi. Call 090151 55615 or book online.";

type Search = { piece?: string };

export const Route = createFileRoute("/appointment")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    piece: typeof search.piece === "string" ? search.piece.slice(0, 120) : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppointmentPage,
});

function AppointmentPage() {
  const { piece } = Route.useSearch();

  return (
    <>
      <Nav />
      <main className="page-enter px-6 pb-32 pt-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Private Viewing · Sarafa Market</p>
              <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.05]">
                Sit with the pieces, <span className="italic shimmer-text">privately</span>
              </h1>
              <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
                Book a dedicated viewing at our New Seelampur showroom or a live video consultation with a gemmologist.
              </p>
              <div className="rule-gold mx-auto mt-10 w-40" />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-14">
              <AppointmentForm piece={piece} />
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-gold">
                Return to A.P.P. Jewellers Homepage
              </Link>
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
