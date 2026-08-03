import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

/*
 * ═══════════════════════════════════════════════════════════════════
 *  THE CHANDRA SUITE — Full-Bleed Cinematic Video-Feel Experience
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Every frame covers the ENTIRE viewport (object-cover).
 *  Crossfade between frames as you scroll — feels like a video.
 *  Info text overlaid on top of the image with elegant backdrop.
 *
 *  Section height: 500vh → creates long scroll runway for smooth
 *  frame interpolation that feels like real video playback.
 * ═══════════════════════════════════════════════════════════════════
 */

const ORBIT_COUNT = 22;
const ORBIT_FRAMES = Array.from(
  { length: ORBIT_COUNT },
  (_, i) => `/assets/chandra/f${String(i + 1).padStart(2, "0")}.jpg`
);
const MACRO_FRAME = "/assets/chandra/macro.jpg";

const SPECS: [string, string][] = [
  ["Metal", "BIS Hallmarked Gold"],
  ["Gems", "Burmese Rubies · Unheated"],
  ["Diamonds", "412 Ideal-Cut (F-G / VVS)"],
  ["Craft", "340 Hours · Sarafa Atelier"],
];

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ChandraSuiteSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  // ── Preload all frames ────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const total = ORBIT_COUNT + 1;
    const allSrcs = [...ORBIT_FRAMES, MACRO_FRAME];
    allSrcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => { loaded++; if (loaded >= total) setImagesReady(true); };
      img.onerror = () => { loaded++; if (loaded >= total) setImagesReady(true); };
    });
  }, []);

  // ── Scroll progress (0 → 1) ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ═══════════════════════════════════════════════════════════════
  //  PHASES
  // ═══════════════════════════════════════════════════════════════

  // Phase 1: Entry fade-in (0 → 0.06)
  const entryOpacity = smoothstep(0, 0.06, progress);

  // Phase 2: Orbit rotation fills 0.02 → 0.72 (long runway = video feel)
  const orbitProgress = smoothstep(0.02, 0.72, progress);
  const floatFrame = orbitProgress * (ORBIT_COUNT - 1);
  const activeIdx = Math.min(Math.floor(floatFrame), ORBIT_COUNT - 2);
  const blend = floatFrame - activeIdx;

  // Phase 3: Slow cinematic zoom while orbiting (1.0 → 1.15)
  const zoomProgress = smoothstep(0, 0.80, progress);
  const zoomScale = lerp(1.0, 1.15, zoomProgress);

  // Phase 4: Text overlay reveal (staggered, 0.15 → 0.55)
  const textBase = smoothstep(0.15, 0.55, progress);
  const stagger = (delay: number) => clamp((textBase - delay) / 0.12, 0, 1);
  const badgeReveal = stagger(0);
  const titleReveal = stagger(0.08);
  const descReveal = stagger(0.18);
  const specsReveal = stagger(0.30);
  const ctaReveal = stagger(0.42);

  // Phase 5: Macro close-up transition (0.74 → 0.90)
  const macroBlend = smoothstep(0.74, 0.90, progress);

  // Phase 6: Exit fade (0.92 → 1.0)
  const exitFade = smoothstep(0.92, 1.0, progress);

  // Overall content opacity (fade in, hold, fade out)
  const contentOpacity = entryOpacity * (1 - exitFade);

  return (
    <section
      id="signature"
      ref={sectionRef}
      style={{ height: "500vh", background: "#0a0203" }}
    >
      {/* ── Sticky Fullscreen Viewport ─────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ════════════════════════════════════════════════════════ */}
        {/*  FULL-BLEED IMAGE LAYER (covers entire viewport)       */}
        {/* ════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${zoomScale})`,
            opacity: contentOpacity,
          }}
        >
          {imagesReady && ORBIT_FRAMES.map((src, i) => {
            let opacity = 0;
            if (i === activeIdx) opacity = 1 - blend;
            else if (i === activeIdx + 1) opacity = blend;
            // Fade orbit out as macro comes in
            opacity *= (1 - macroBlend);
            if (opacity < 0.005) return null;

            return (
              <img
                key={src}
                src={src}
                alt="The Chandra Suite — Royal Rani Haar"
                className="absolute inset-0 w-full h-full select-none pointer-events-none"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  opacity,
                  filter: "brightness(1.06) contrast(1.05)",
                }}
                draggable={false}
              />
            );
          })}

          {/* Macro close-up frame */}
          {macroBlend > 0.01 && (
            <img
              src={MACRO_FRAME}
              alt="Chandra Suite — Pendant Detail"
              className="absolute inset-0 w-full h-full select-none pointer-events-none"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                opacity: macroBlend * (1 - exitFade),
                filter: "brightness(1.08) contrast(1.06)",
              }}
              draggable={false}
            />
          )}

          {/* Loading state */}
          {!imagesReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0203]">
              <div className="flex flex-col items-center gap-4">
                <div className="size-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
                <p className="text-[0.55rem] uppercase tracking-[0.4em] text-gold/50">
                  Loading Exhibition…
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/*  CINEMATIC GRADIENT OVERLAY (makes text readable)      */}
        {/* ════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: contentOpacity }}
        >
          {/* Bottom gradient for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(5,1,1,0.92) 0%, rgba(5,1,1,0.7) 25%, rgba(5,1,1,0.15) 50%, transparent 65%)",
            }}
          />
          {/* Left-side gradient for text area */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: "linear-gradient(to right, rgba(5,1,1,0.6) 0%, rgba(5,1,1,0.3) 30%, transparent 55%)",
            }}
          />
          {/* Top subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(5,1,1,0.5) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/*  OVERLAID INFO — Bottom-Left Positioned                */}
        {/* ════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-20 flex items-end"
          style={{ opacity: contentOpacity }}
        >
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:pb-20">
            <div className="max-w-xl lg:max-w-2xl">

              {/* Badge */}
              <div
                style={{
                  opacity: badgeReveal,
                  transform: `translateY(${(1 - badgeReveal) * 20}px)`,
                }}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="h-px w-6 sm:w-10 bg-gold/60" />
                  <p className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.4em] text-gold font-medium">
                    Piece No. 001 · Signature Exhibition
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2
                className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold leading-[0.92] text-white"
                style={{
                  opacity: titleReveal,
                  transform: `translateY(${(1 - titleReveal) * 30}px)`,
                  filter: `blur(${(1 - titleReveal) * 6}px)`,
                }}
              >
                The <span className="italic shimmer-text">Chandra</span> Suite
              </h2>

              {/* Description */}
              <p
                className="mt-3 sm:mt-5 text-[0.7rem] sm:text-sm lg:text-base font-light leading-relaxed text-white/70 max-w-lg"
                style={{
                  opacity: descReveal,
                  transform: `translateY(${(1 - descReveal) * 25}px)`,
                  filter: `blur(${(1 - descReveal) * 5}px)`,
                }}
              >
                A crescent of unheated Burmese rubies framed by 412 ideal-cut diamonds,
                hand-sculpted in BIS Hallmarked gold. Each pearl hand-strung.
                Each stone hand-set. Crafted for royalty.
              </p>

              {/* Specs Grid */}
              <div
                className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 border-t border-white/15 pt-4 sm:pt-5"
                style={{
                  opacity: specsReveal,
                  transform: `translateY(${(1 - specsReveal) * 20}px)`,
                  filter: `blur(${(1 - specsReveal) * 4}px)`,
                }}
              >
                {SPECS.map(([label, val]) => (
                  <div key={label}>
                    <dt className="text-[0.42rem] sm:text-[0.5rem] uppercase tracking-[0.2em] text-gold/80 font-medium">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-[0.62rem] sm:text-xs text-white/90 font-semibold leading-snug">
                      {val}
                    </dd>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                style={{
                  opacity: ctaReveal,
                  transform: `translateY(${(1 - ctaReveal) * 20}px)`,
                  filter: `blur(${(1 - ctaReveal) * 4}px)`,
                }}
              >
                <Link
                  to="/piece/$slug"
                  params={{ slug: "chandra-suite" }}
                  className="shine-sweep rounded-sm bg-gold px-5 sm:px-7 py-3 sm:py-3.5 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.3em] text-primary-foreground font-bold shadow-xl hover:scale-105 transition-transform duration-500"
                >
                  Inspect Full Specs →
                </Link>
                <Link
                  to="/appointment"
                  search={{ piece: "The Chandra Suite" }}
                  className="rounded-sm border border-white/30 px-5 sm:px-6 py-3 sm:py-3.5 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.3em] text-white/90 font-semibold hover:bg-white/10 transition-colors duration-500"
                >
                  Book Private Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════ */}
        {/*  SCROLL PROGRESS INDICATOR                             */}
        {/* ════════════════════════════════════════════════════════ */}

        {/* Right-side vertical progress */}
        <div
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: contentOpacity * 0.7 }}
        >
          <div className="w-[2px] h-24 sm:h-40 bg-white/10 rounded-full overflow-hidden">
            <div
              className="w-full rounded-full"
              style={{
                height: `${progress * 100}%`,
                background: "linear-gradient(to bottom, var(--gold), rgba(212,175,55,0.3))",
                boxShadow: "0 0 8px rgba(212,175,55,0.5)",
              }}
            />
          </div>
          <span className="text-[0.4rem] sm:text-[0.45rem] uppercase tracking-[0.25em] text-white/40 font-medium writing-mode-vertical"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            360° View
          </span>
        </div>

        {/* Bottom scroll hint (visible at start only) */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: (1 - smoothstep(0.03, 0.10, progress)) * contentOpacity }}
        >
          <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5">
            <div className="w-[2px] h-2 bg-gold rounded-full animate-bounce" />
          </div>
          <p className="text-[0.42rem] sm:text-[0.48rem] uppercase tracking-[0.35em] text-white/40">
            Scroll to experience
          </p>
        </div>
      </div>
    </section>
  );
}
