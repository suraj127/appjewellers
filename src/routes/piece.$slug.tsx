import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS, getProduct, type Spec } from "@/data/products";

export const Route = createFileRoute("/piece/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "High Jewellery";
    const title = `${name} — A.P.P. Jewellers, New Seelampur, Delhi`;
    const description =
      loaderData?.tagline ??
      "Materials, craftsmanship, dimensions and certification for every piece at A.P.P. Jewellers.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PiecePage,
});

function SpecTable({ heading, note, specs }: { heading: string; note: string; specs: Spec[] }) {
  return (
    <section className="border-t border-border/60 py-14">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
        <div>
          <h2 className="font-display text-3xl">{heading}</h2>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
            {note}
          </p>
        </div>
        <dl className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {specs.map(([k, v]) => (
            <div key={k} className="border-b border-border/50 pb-3">
              <dt className="text-[0.56rem] uppercase tracking-[0.3em] text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-1.5 font-display text-lg leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PiecePage() {
  const p = Route.useLoaderData();
  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="page-enter px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="relative lg:sticky lg:top-32">
                <div
                  aria-hidden
                  className="absolute -inset-10 opacity-60"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                />
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.collection} by A.P.P. Jewellers`}
                  width={900}
                  height={1100}
                  className="relative w-full rounded-sm object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div>
                <p className="eyebrow">{p.eyebrow}</p>
                <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.03]">
                  {p.name}
                </h1>
                <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
                <div className="rule-gold mt-8 w-40" />
                <p className="mt-8 text-sm font-light leading-relaxed text-muted-foreground">
                  {p.story}
                </p>

                <ul className="mt-8 space-y-3">
                  {p.atelierNotes.map((n: string) => (
                    <li key={n} className="flex gap-3 text-sm font-light text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                      {n}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <Link
                    to="/appointment"
                    search={{ piece: p.name }}
                    className="shine-sweep rounded-sm border border-gold/60 px-8 py-4 text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-colors duration-500 hover:bg-gold hover:text-primary-foreground"
                  >
                    Request a private viewing
                  </Link>
                  <Link
                    to="/"
                    hash="try-on"
                    className="text-[0.65rem] uppercase tracking-[0.32em] text-foreground/80 underline-offset-8 transition-colors duration-500 hover:text-gold hover:underline"
                  >
                    See it on you
                  </Link>
                </div>
                <p className="mt-6 text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Available to view by appointment · Enquiries handled privately
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-24">
            <SpecTable
              heading="Materials"
              note="Every metal, stone and component recorded exactly as it leaves the bench."
              specs={p.materials}
            />
            <SpecTable
              heading="Craftsmanship"
              note="Hours, hands and techniques behind the piece — from wax to final burnish."
              specs={p.craftsmanship}
            />
            <SpecTable
              heading="Dimensions"
              note="Measured on the finished piece, not the design drawing."
              specs={p.dimensions}
            />
            <SpecTable
              heading="Certificate"
              note="Independent laboratory reports and hallmarking accompany the piece in its case."
              specs={p.certificate}
            />
          </div>

          <div className="mt-24 border-t border-border/60 pt-16">
            <p className="eyebrow">Continue</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/piece/$slug"
                  params={{ slug: o.slug }}
                  className="lift shine-sweep group relative block h-80 overflow-hidden rounded-sm border border-border"
                >
                  <img
                    src={o.image}
                    alt={o.name}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                    style={{ transitionTimingFunction: "var(--ease-luxe)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold">
                      {o.collection}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{o.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
