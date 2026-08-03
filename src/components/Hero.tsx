import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-necklace.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import logoImg from "@/assets/logo.png";

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

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

  // Gold dust particle system
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
    const COUNT = 40;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.2,
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

        // Wrap around
        if (p.y < -10) { p.y = H() + 10; p.x = Math.random() * W(); }
        if (p.x < -10) p.x = W() + 10;
        if (p.x > W() + 10) p.x = -10;

        const flicker = 0.5 + 0.5 * Math.sin(time * p.flickerSpeed + p.flickerOffset);
        const alpha = p.opacity * flicker;

        // Gold glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.25})`;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 223, 100, ${alpha})`;
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-onyx pt-28 sm:pt-36 pb-16 sm:pb-20 px-4"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={heroImg}
        className="absolute inset-0 size-full object-cover"
        style={{
          transform: `scale(1.12) translate3d(${tilt.x * -14}px, ${tilt.y * -14 - offset * 0.12}px, 0)`,
          transition: "transform 1.2s var(--ease-luxe)",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

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

      {/* Gold dust particles canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full pointer-events-none z-[5]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 text-center">
        {/* BIG & ULTRA-VIBRANT LOGO IN HERO WITH RADIAL HALO */}
        <div className="reveal relative flex justify-center mb-4 sm:mb-6" style={{ animationDelay: "150ms" }}>
          {/* Glowing Backlight Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 sm:size-72 rounded-full bg-gold/25 blur-3xl pointer-events-none animate-pulse" />

          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-28 sm:h-48 md:h-60 w-auto object-contain filter brightness-125 contrast-125 saturate-150 drop-shadow-[0_0_35px_rgba(255,215,0,0.85)] drop-shadow-[0_0_70px_rgba(212,175,55,0.6)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        <p className="eyebrow reveal text-[0.55rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.42em]" style={{ animationDelay: "280ms" }}>
          Sarafa Market · New Seelampur · Delhi
        </p>

        <h1
          className="reveal mt-3 sm:mt-5 font-display text-[clamp(1.75rem,6.5vw,5.2rem)] leading-[1.02] sm:leading-[0.98] tracking-tight font-medium"
          style={{ animationDelay: "380ms" }}
        >
          Royal Gold & Diamond Artistry
          <span className="block italic shimmer-text mt-1 sm:mt-1.5 text-amber-200">
            Where Heritage Meets Luxury
          </span>
        </h1>

        <p
          className="reveal mx-auto mt-4 sm:mt-6 max-w-xl text-xs sm:text-base font-light leading-relaxed tracking-wide text-muted-foreground"
          style={{ animationDelay: "560ms" }}
        >
          Explore certified solitaire diamonds, Kundan bridal sets, gold bangles and bespoke handcrafted jewellery at our showroom in New Seelampur.
        </p>

        <div
          className="reveal mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row w-full max-w-sm sm:max-w-none mx-auto"
          style={{ animationDelay: "700ms" }}
        >
          <Link
            to="/collections"
            className="shine-sweep w-full rounded-sm border border-gold/70 bg-gold/10 px-6 sm:px-9 py-3 sm:py-3.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] sm:tracking-[0.34em] text-gold transition-all duration-700 hover:bg-gold hover:text-primary-foreground sm:w-auto font-semibold text-center"
          >
            Explore Collections
          </Link>
          <a
            href="#store-info"
            className="w-full rounded-sm border border-border/80 px-6 sm:px-9 py-3 sm:py-3.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] sm:tracking-[0.34em] text-foreground/90 transition-colors duration-500 hover:border-gold/60 hover:text-gold sm:w-auto text-center"
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
