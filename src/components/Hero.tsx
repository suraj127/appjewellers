import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GlowEffect } from '@/components/core/glow-effect';
import { ArrowRight, MapPin } from 'lucide-react';
import logoImg from "@/assets/logo.png";

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
      className="relative flex min-h-[90vh] sm:min-h-screen items-center justify-center overflow-hidden bg-white pt-24 sm:pt-36 pb-16 sm:pb-24 px-4 text-foreground border-b border-gold/30"
    >
      {/* Ambient Warm Luxury Radial Lighting Backdrop */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] sm:size-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, rgba(254, 243, 199, 0.2) 45%, rgba(255, 255, 255, 0) 75%)",
        }}
      />

      {/* Interactive dynamic gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(550px circle at ${50 + tilt.x * 20}% ${40 + tilt.y * 20}%, rgba(212, 175, 55, 0.08), transparent 60%)`,
          transition: "background 0.4s linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 text-center">
        {/* BRAND LOGO WITH GLOWING BACKLIGHT */}
        <div className="reveal relative flex justify-center mb-6 sm:mb-8" style={{ animationDelay: "100ms" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 sm:size-60 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-32 sm:h-44 md:h-48 w-auto object-contain filter drop-shadow-[0_2px_15px_rgba(212,175,55,0.35)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* EYEBROW BADGE */}
        <div className="reveal flex justify-center mb-4" style={{ animationDelay: "200ms" }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] text-[#b8860b] font-bold shadow-sm">
            <span>Sarafa Market · New Seelampur · Delhi</span>
          </span>
        </div>

        {/* MAIN HEADLINE */}
        <h1
          className="reveal mt-4 font-display text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
          style={{ animationDelay: "300ms" }}
        >
          Where Heritage <span className="italic shimmer-text text-[#b8860b]">Meets Luxury</span>
        </h1>

        {/* SUB-HEAD COPY */}
        <p
          className="reveal mx-auto mt-4 sm:mt-6 max-w-xl text-xs sm:text-base font-light leading-relaxed text-zinc-600 px-2"
          style={{ animationDelay: "450ms" }}
        >
          Discover 100% BIS Hallmarked pure gold, GIA certified solitaires, royal Kundan bridal suites, and bespoke handmade jewellery in Delhi.
        </p>

        {/* CTA BUTTONS WITH GLOW EFFECT */}
        <div
          className="reveal mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto"
          style={{ animationDelay: "600ms" }}
        >
          <div className="relative w-full sm:w-auto flex justify-center">
            <GlowEffect
              colors={['#D4AF37', '#FFD700', '#F3E5AB', '#AA771C']}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={0.9}
            />
            <Link
              to="/collections"
              className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 hover:bg-[#b8860b] px-7 py-3.5 text-xs text-white font-bold uppercase tracking-[0.22em] transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto text-center shadow-2xl"
            >
              <span>Explore Collections</span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          </div>

          <a
            href="#store-info"
            className="w-full rounded-lg border-2 border-gold/60 bg-white hover:bg-gold/10 px-7 py-3 text-xs uppercase tracking-[0.22em] text-zinc-900 font-bold transition-all duration-300 sm:w-auto text-center shadow-sm flex items-center justify-center gap-2"
          >
            <MapPin className="size-3.5 text-[#b8860b]" />
            <span>Visit Showroom</span>
          </a>
        </div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center pointer-events-none">
        <div className="mx-auto h-8 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.35em] text-zinc-400 font-medium">
          Scroll
        </span>
      </div>
    </section>
  );
}
