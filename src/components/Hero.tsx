import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from 'lucide-react';
import logoImg from "@/assets/logo.png";
import heroBgImg from "@/assets/hero-bg.jpg";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent | PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex items-center justify-center overflow-hidden bg-[#F8F6EF] pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 md:pb-16 px-4 text-foreground border-b border-gold/30"
    >
      {/* ── Background Luxury Image with mobile-optimized responsive framing ── */}
      <img
        src={heroBgImg}
        alt="Royal Jewellery Background"
        className="absolute inset-0 size-full object-cover object-[78%_center] sm:object-[center_35%] pointer-events-none transition-transform duration-700 ease-out select-none"
        style={{
          transform: `scale(1.03) translate3d(${tilt.x * -8}px, ${tilt.y * -8}px, 0)`,
        }}
      />

      {/* ── Soft Champagne & Alabaster Center Light Overlay for Readability ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248, 246, 239, 0.86) 0%, rgba(248, 246, 239, 0.6) 50%, rgba(248, 246, 239, 0.2) 80%, rgba(248, 246, 239, 0.5) 100%)",
        }}
      />

      {/* Interactive dynamic gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(550px circle at ${50 + tilt.x * 20}% ${40 + tilt.y * 20}%, rgba(212, 175, 55, 0.12), transparent 60%)`,
          transition: "background 0.4s linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-3 sm:px-6 text-center">
        {/* BRAND LOGO */}
        <div className="reveal relative flex justify-center mb-3 sm:mb-4 mx-auto" style={{ animationDelay: "100ms" }}>
          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-20 sm:h-28 md:h-32 w-auto object-contain hover:scale-105 transition-transform duration-700 select-none"
          />
        </div>

        {/* EYEBROW BADGE (Cormorant Garamond Medium with side filigree flourishes) */}
        <div className="reveal flex items-center justify-center gap-2 mb-2.5 sm:mb-3" style={{ animationDelay: "200ms" }}>
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">⊰⊱</span>
          <span className="inline-flex items-center rounded-full border border-[#C49324]/80 bg-[#F2E9D8]/80 backdrop-blur-sm px-3.5 sm:px-5 py-0.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.24em] text-[#C49324] font-display font-medium shadow-sm">
            SARAFA MARKET · NEW SEELAMPUR · DELHI
          </span>
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">⊰⊱</span>
        </div>

        {/* MAIN HEADLINE (Cormorant Garamond SemiBold + Italic Sparkling Gold) */}
        <h1
          className="reveal mt-1.5 sm:mt-2 font-display text-[clamp(1.85rem,4.5vw,3.6rem)] leading-[1.08] tracking-tight"
          style={{ animationDelay: "300ms" }}
        >
          <span className="font-semibold text-[#121212]">Where Heritage </span>
          <span className="italic font-normal luxury-sparkle-text text-[#C49324] block sm:inline">
            Meets Luxury
          </span>
        </h1>

        {/* SUB-HEAD COPY */}
        <p
          className="reveal mx-auto mt-2.5 sm:mt-3.5 max-w-lg text-xs sm:text-sm font-light leading-relaxed text-zinc-700 px-2 drop-shadow-sm"
          style={{ animationDelay: "450ms" }}
        >
          Discover 100% BIS Hallmarked pure gold, GIA certified solitaires, royal Kundan bridal suites, and bespoke handmade jewellery in Delhi.
        </p>

        {/* LUXURY CTA BUTTONS */}
        <div
          className="reveal mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto"
          style={{ animationDelay: "600ms" }}
        >
          <Link
            to="/collections"
            className="shine-sweep group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-7 py-3 text-[0.68rem] sm:text-xs text-black font-extrabold uppercase tracking-[0.22em] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-[0_8px_25px_rgba(196,147,36,0.35)] hover:shadow-[0_12px_35px_rgba(196,147,36,0.55)] hover:brightness-105"
          >
            <span>Explore Collections</span>
            <ArrowRight className="size-3.5 text-black transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="#store-info"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#b8860b]/60 bg-[#fcfaf2]/90 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#121212] hover:to-[#1a1a1a] hover:text-[#FAF8F5] hover:border-[#121212] px-7 py-3 text-[0.68rem] sm:text-xs uppercase tracking-[0.2em] text-[#121212] font-bold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-sm"
          >
            <MapPin className="size-3.5 text-[#b8860b] group-hover:text-amber-300" />
            <span>Visit Showroom</span>
          </a>
        </div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center pointer-events-none">
        <div className="mx-auto h-8 w-px bg-gradient-to-b from-transparent via-[#C49324] to-transparent" />
        <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.35em] text-zinc-500 font-medium">
          Scroll
        </span>
      </div>
    </section>
  );
}
