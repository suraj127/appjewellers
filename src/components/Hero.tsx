import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { GlowEffect } from '@/components/core/glow-effect';
import { ArrowRight, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import logoImg from "@/assets/logo.png";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Gold dust particle system on white canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      flickerSpeed: number;
      flickerOffset: number;
    }

    const particles: Particle[] = [];
    const COUNT = 35;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.25 + 0.08),
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.2,
        flickerSpeed: Math.random() * 0.02 + 0.005,
        flickerOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const draw = () => {
      time++;
      ctx.clearRect(0, 0, W(), H());

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) { p.y = H() + 10; p.x = Math.random() * W(); }
        if (p.x < -10) p.x = W() + 10;
        if (p.x > W() + 10) p.x = -10;

        const flicker = 0.5 + 0.5 * Math.sin(time * p.flickerSpeed + p.flickerOffset);
        const alpha = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 134, 11, ${alpha * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.8})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] sm:min-h-screen items-center justify-center overflow-hidden bg-white pt-24 sm:pt-36 pb-16 sm:pb-24 px-4 text-foreground border-b border-gold/30"
    >
      {/* Ambient Luxury Radial Lighting Backdrop */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] sm:size-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12) 0%, rgba(254, 243, 199, 0.25) 45%, rgba(255, 255, 255, 0) 75%)",
        }}
      />

      {/* Interactive dynamic gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(550px circle at ${50 + tilt.x * 20}% ${40 + tilt.y * 20}%, rgba(212, 175, 55, 0.1), transparent 60%)`,
          transition: "background 0.4s linear",
        }}
      />

      {/* Gold dust particles canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full pointer-events-none z-[5]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 text-center">
        {/* BRAND LOGO WITH GLOWING BACKLIGHT */}
        <div className="reveal relative flex justify-center mb-6 sm:mb-8" style={{ animationDelay: "100ms" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 sm:size-60 rounded-full bg-gold/20 blur-3xl pointer-events-none animate-pulse" />

          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-32 sm:h-44 md:h-48 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* EYEBROW BADGE */}
        <div className="reveal flex justify-center mb-4" style={{ animationDelay: "200ms" }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] text-[#b8860b] font-bold shadow-sm">
            <Sparkles className="size-3 text-[#b8860b]" />
            <span>Sarafa Market · New Seelampur · Delhi</span>
          </span>
        </div>

        {/* MAIN HEADLINE */}
        <h1
          className="reveal font-display text-[clamp(2.2rem,6.5vw,4.8rem)] leading-[1.02] tracking-tight font-extrabold text-[#121215]"
          style={{ animationDelay: "300ms" }}
        >
          Royal Gold & Diamond Artistry
          <span className="block italic shimmer-text text-[#b8860b] mt-1 sm:mt-2">
            Where Heritage Meets Luxury
          </span>
        </h1>

        {/* SUB-HEAD COPY */}
        <p
          className="reveal mx-auto mt-4 sm:mt-6 max-w-xl text-xs sm:text-base font-light leading-relaxed text-zinc-600 px-2"
          style={{ animationDelay: "450ms" }}
        >
          Discover 100% BIS Hallmarked pure gold, GIA certified solitaires, royal Kundan bridal suites, and bespoke handmade jewellery in Delhi.
        </p>

        {/* CTA BUTTONS */}
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
              className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 hover:bg-[#b8860b] px-7 py-3.5 text-xs text-white font-bold uppercase tracking-[0.22em] transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto text-center shadow-xl"
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
