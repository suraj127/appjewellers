import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-necklace.jpg";
import logoImg from "@/assets/logo.png";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-onyx pt-36 pb-20"
    >
      <img
        src={heroImg}
        alt="A.P.P. Jewellers fine gold and diamond jewellery"
        width={1600}
        height={1200}
        className="absolute inset-0 size-full object-cover"
        style={{
          transform: `scale(1.12) translate3d(${tilt.x * -14}px, ${tilt.y * -14 - offset * 0.12}px, 0)`,
          transition: "transform 1.2s var(--ease-luxe)",
        }}
      />

      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 58%, oklch(0.08 0 0 / 0.85), oklch(0.08 0 0 / 0.45) 60%, transparent 85%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(600px circle at ${50 + tilt.x * 22}% ${44 + tilt.y * 22}%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 62%)`,
          transition: "background 0.5s linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* BIG & ULTRA-VIBRANT LOGO IN HERO WITH RADIAL HALO */}
        <div className="reveal relative flex justify-center mb-6" style={{ animationDelay: "150ms" }}>
          {/* Glowing Backlight Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 sm:size-72 rounded-full bg-gold/25 blur-3xl pointer-events-none animate-pulse" />

          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-36 sm:h-52 md:h-60 w-auto object-contain filter brightness-125 contrast-125 saturate-150 drop-shadow-[0_0_35px_rgba(255,215,0,0.85)] drop-shadow-[0_0_70px_rgba(212,175,55,0.6)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        <p className="eyebrow reveal" style={{ animationDelay: "280ms" }}>
          Sarafa Market · New Seelampur · Delhi
        </p>

        <h1
          className="reveal mt-5 font-display text-[clamp(2.3rem,7vw,5.2rem)] leading-[0.98] tracking-tight font-medium"
          style={{ animationDelay: "380ms" }}
        >
          Royal Gold & Diamond Artistry
          <span className="block italic shimmer-text mt-1 text-amber-200">
            14K · 18K · 22K BIS Hallmarked Jewellery
          </span>
        </h1>

        <p
          className="reveal mx-auto mt-6 max-w-xl text-sm sm:text-base font-light leading-relaxed tracking-wide text-muted-foreground"
          style={{ animationDelay: "560ms" }}
        >
          Explore certified solitaire diamonds, Kundan bridal sets, 22K gold bangles and bespoke handcrafted jewellery at our showroom in New Seelampur.
        </p>

        <div
          className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "700ms" }}
        >
          <a
            href="#collections"
            className="shine-sweep w-full rounded-sm border border-gold/70 bg-gold/10 px-9 py-3.5 text-[0.68rem] uppercase tracking-[0.34em] text-gold transition-all duration-700 hover:bg-gold hover:text-primary-foreground sm:w-auto font-semibold"
          >
            Explore Collections
          </a>
          <a
            href="#store-info"
            className="w-full rounded-sm border border-border/80 px-9 py-3.5 text-[0.68rem] uppercase tracking-[0.34em] text-foreground/90 transition-colors duration-500 hover:border-gold/60 hover:text-gold sm:w-auto"
          >
            Showroom Details & Location
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent" />
        <span className="mt-2 block text-[0.55rem] uppercase tracking-[0.4em] text-muted-foreground">
          Scroll
        </span>
      </div>
    </section>
  );
}

