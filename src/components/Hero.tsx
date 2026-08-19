import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.png";

/* ── Slide Data ── */
const HERO_SLIDES = [
  {
    image: "/assets/hero/slide1.jpg",
    eyebrow: "Purity Guaranteed",
    headline: "BIS Hallmarked",
    headlineAccent: "Pure Gold",
    sub: "Every piece carries the BIS hallmark — your guarantee of purity in every grain of gold.",
  },
  {
    image: "/assets/hero/slide2.jpg",
    eyebrow: "Brilliance Certified",
    headline: "GIA Certified",
    headlineAccent: "Diamonds",
    sub: "Hand-selected solitaires and diamond jewellery, each accompanied by a GIA grading report.",
  },
  {
    image: "/assets/hero/slide3.jpg",
    eyebrow: "Bridal Elegance",
    headline: "Kundan Bridal",
    headlineAccent: "Collection",
    sub: "Timeless Kundan and Polki bridal suites, handcrafted for your most cherished celebrations.",
  },
  {
    image: "/assets/hero/slide4.jpg",
    eyebrow: "Artisan Craft",
    headline: "Bespoke Handmade",
    headlineAccent: "Jewellery",
    sub: "One-of-a-kind pieces designed and shaped by master karigars in our Delhi atelier.",
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export function Hero() {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, active]);

  // Interactive mouse-follow gold aura (desktop only)
  useEffect(() => {
    const onMove = (e: MouseEvent | PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] sm:min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 sm:pt-36 pb-16 sm:pb-24 px-4 text-foreground border-b border-gold/30"
    >
      {/* ── Background Slides with Ken Burns ── */}
      {HERO_SLIDES.map((s, idx) => (
        <img
          key={idx}
          src={s.image}
          alt=""
          className={`absolute inset-0 size-full object-cover pointer-events-none select-none transition-opacity duration-1000 ease-in-out ${
            idx === active
              ? "opacity-100 hero-slide-active"
              : "opacity-0"
          }`}
          style={{ zIndex: 1 }}
          {...(idx === 0 ? {} : { loading: "lazy" as const })}
        />
      ))}

      {/* ── Dark Vignette + Center Light Overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248, 246, 239, 0.82) 0%, rgba(248, 246, 239, 0.55) 45%, rgba(10, 10, 10, 0.15) 75%, rgba(10, 10, 10, 0.5) 100%)",
          zIndex: 2,
        }}
      />

      {/* Interactive dynamic gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background: `radial-gradient(550px circle at ${50 + tilt.x * 20}% ${40 + tilt.y * 20}%, rgba(212, 175, 55, 0.15), transparent 60%)`,
          transition: "background 0.4s linear",
          zIndex: 3,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 text-center">
        {/* BRAND LOGO */}
        <div
          className="reveal relative flex justify-center mb-5 sm:mb-7 mx-auto"
          style={{ animationDelay: "100ms" }}
        >
          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-28 sm:h-40 md:h-44 w-auto object-contain hover:scale-105 transition-transform duration-700 select-none"
          />
        </div>

        {/* LOCATION BADGE */}
        <div
          className="reveal flex items-center justify-center gap-2 mb-4"
          style={{ animationDelay: "200ms" }}
        >
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">
            ⊰⊱
          </span>
          <span className="inline-flex items-center rounded-full border border-[#C49324]/80 bg-[#F2E9D8]/80 backdrop-blur-sm px-4 sm:px-6 py-1 text-[0.68rem] sm:text-xs uppercase tracking-[0.28em] text-[#C49324] font-display font-medium shadow-sm">
            SARAFA MARKET · NEW SEELAMPUR · DELHI
          </span>
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">
            ⊰⊱
          </span>
        </div>

        {/* SLIDE EYEBROW (animated per slide) */}
        <p
          key={`eyebrow-${active}`}
          className="text-[#b8860b] text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] font-semibold mb-2 animate-fadeIn"
        >
          {slide.eyebrow}
        </p>

        {/* MAIN HEADLINE (changes per slide with cross-fade) */}
        <h1
          key={`headline-${active}`}
          className="reveal mt-1 sm:mt-3 font-display text-[clamp(2.2rem,6.5vw,5rem)] leading-[1.05] tracking-tight"
          style={{ animationDelay: "0ms" }}
        >
          <span className="font-semibold text-[#121212]">
            {slide.headline}{" "}
          </span>
          <span className="italic font-normal luxury-sparkle-text text-[#C49324] block sm:inline">
            {slide.headlineAccent}
          </span>
        </h1>

        {/* SUB-HEAD COPY (changes per slide) */}
        <p
          key={`sub-${active}`}
          className="reveal mx-auto mt-4 sm:mt-5 max-w-xl text-xs sm:text-base font-light leading-relaxed text-zinc-700 px-2 drop-shadow-sm"
          style={{ animationDelay: "100ms" }}
        >
          {slide.sub}
        </p>

        {/* CTA BUTTONS */}
        <div
          className="reveal mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            to="/collections"
            className="shine-sweep group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-9 py-4 text-xs text-black font-extrabold uppercase tracking-[0.26em] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-[0_10px_35px_rgba(196,147,36,0.45)] hover:shadow-[0_15px_45px_rgba(196,147,36,0.65)] hover:brightness-105"
          >
            <span>Explore Collections</span>
            <ArrowRight className="size-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="#store-info"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#b8860b]/60 bg-[#fcfaf2]/90 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#121212] hover:to-[#1a1a1a] hover:text-[#FAF8F5] hover:border-[#121212] px-9 py-4 text-xs uppercase tracking-[0.24em] text-[#121212] font-bold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-md"
          >
            <MapPin className="size-4 text-[#b8860b] group-hover:text-amber-300" />
            <span>Visit Showroom</span>
          </a>
        </div>
      </div>

      {/* ── Slide Indicator Dots + Progress ── */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex items-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group relative flex items-center justify-center"
          >
            {/* Outer ring for active */}
            <span
              className={`block rounded-full transition-all duration-500 ${
                idx === active
                  ? "w-8 h-2 bg-[#d4af37]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
            {/* Progress fill inside active dot */}
            {idx === active && (
              <span className="absolute left-0 top-0 h-full rounded-full bg-white/60 hero-progress-bar" />
            )}
          </button>
        ))}
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-center pointer-events-none hidden sm:block">
        <div className="mx-auto h-6 w-px bg-gradient-to-b from-transparent via-[#C49324] to-transparent" />
        <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.35em] text-zinc-400 font-medium">
          Scroll
        </span>
      </div>
    </section>
  );
}
