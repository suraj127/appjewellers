import { useState, useEffect, useRef } from "react";

/**
 * Cinematic Scroll-Driven Karigar Experience
 * 
 * A full-screen, video-like visual journey through the jewellery making process.
 * No text walls. No spec grids. Just pure visual storytelling driven by scroll.
 * 
 * Inspired by Apple's cinematic product pages — images crossfade as you scroll,
 * with a subtle gold progress filament and minimal captions that appear/fade.
 */

const FRAMES = [
  {
    image: "/assets/karigar_1.png",
    caption: "The Flame",
    subcaption: "1,064°C",
  },
  {
    image: "/assets/karigar_2.png",
    caption: "The Forge",
    subcaption: "Hand & Anvil",
  },
  {
    image: "/assets/karigar_3.png",
    caption: "The Carving",
    subcaption: "400 Micro-Cuts",
  },
  {
    image: "/assets/karigar_4.png",
    caption: "The Setting",
    subcaption: "10x Loupe",
  },
  {
    image: "/assets/karigar_5.png",
    caption: "The Masterpiece",
    subcaption: "BIS Hallmarked",
  },
];

export function KarigarProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      setProgress(Math.min(Math.max(raw, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which frame is active and how far into its transition are we
  const totalFrames = FRAMES.length;
  const frameFloat = progress * (totalFrames - 1); // 0..4
  const activeIndex = Math.min(Math.floor(frameFloat), totalFrames - 2);
  const blend = frameFloat - activeIndex; // 0..1 within current pair

  return (
    <section
      id="karigar"
      ref={containerRef}
      className="relative"
      style={{ height: `${totalFrames * 100}vh` }}
    >
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Stacked full-bleed images with opacity crossfade */}
        {FRAMES.map((frame, i) => {
          let opacity = 0;
          if (i < activeIndex) opacity = 0;
          else if (i === activeIndex) opacity = 1 - blend;
          else if (i === activeIndex + 1) opacity = blend;
          else if (i === totalFrames - 1 && progress >= 1) opacity = 1;
          else opacity = 0;

          // Subtle Ken Burns zoom: each frame scales from 1.0 → 1.08 as it fades in
          const scale = i === activeIndex + 1
            ? 1 + blend * 0.08
            : i === activeIndex
              ? 1.08 - blend * 0.08
              : 1;

          return (
            <div
              key={i}
              className="absolute inset-0 transition-none"
              style={{ opacity, zIndex: i }}
            >
              <img
                src={frame.image}
                alt={frame.caption}
                className="size-full object-cover will-change-transform"
                style={{ transform: `scale(${scale})` }}
                loading={i <= 1 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Dark cinematic vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-10" />

        {/* Minimal caption — fades in/out with each frame */}
        <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 z-20 text-center pointer-events-none">
          {FRAMES.map((frame, i) => {
            let captionOpacity = 0;
            if (i === activeIndex && blend < 0.4) captionOpacity = 1;
            else if (i === activeIndex + 1 && blend > 0.6) captionOpacity = 1;
            else if (i === activeIndex && blend >= 0.4) captionOpacity = 1 - (blend - 0.4) / 0.2;
            else if (i === activeIndex + 1 && blend <= 0.6) captionOpacity = (blend - 0.4) / 0.2;
            if (i === totalFrames - 1 && progress >= 0.98) captionOpacity = 1;
            if (captionOpacity < 0.01) return null;

            const translateY = captionOpacity < 1 ? 12 * (1 - captionOpacity) : 0;

            return (
              <div
                key={i}
                className="absolute inset-x-0 bottom-0 flex flex-col items-center"
                style={{
                  opacity: captionOpacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <p
                  className="font-display text-3xl sm:text-6xl font-bold tracking-wider"
                  style={{
                    color: "transparent",
                    backgroundImage: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {frame.caption}
                </p>
                <p className="mt-1.5 text-[0.7rem] sm:text-xs uppercase tracking-[0.4em] text-amber-200/70 font-light">
                  {frame.subcaption}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top-left: Tiny "A.P.P. Karigar" badge */}
        <div
          className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 pointer-events-none"
          style={{ opacity: progress > 0.02 ? 1 : 0, transition: "opacity 0.6s" }}
        >
          <p className="text-[0.55rem] sm:text-[0.62rem] uppercase tracking-[0.35em] text-gold/80 font-semibold">
            A.P.P. Karigar
          </p>
          <p className="text-[0.48rem] sm:text-[0.52rem] uppercase tracking-[0.25em] text-amber-200/50 mt-0.5">
            Sarafa Market Atelier
          </p>
        </div>

        {/* Right edge: Vertical stage dots */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
          {FRAMES.map((_, i) => {
            const isActive =
              i === activeIndex ||
              (i === activeIndex + 1 && blend > 0.5) ||
              (i === totalFrames - 1 && progress >= 0.98);
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to stage ${i + 1}`}
                onClick={() => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const containerTop = window.scrollY + rect.top;
                  const scrollable = rect.height - window.innerHeight;
                  const target = containerTop + (i / (totalFrames - 1)) * scrollable;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className="group relative flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? "size-3 bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                      : "size-1.5 bg-gold/30 group-hover:bg-gold/60"
                  }`}
                />
                {/* Tiny label on hover */}
                <span
                  className={`absolute right-6 whitespace-nowrap text-[0.55rem] uppercase tracking-widest font-semibold transition-opacity duration-300 ${
                    isActive ? "text-gold opacity-100" : "text-gold/50 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Ultra-thin gold progress filament */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="h-[2px] w-full bg-gold/10">
            <div
              className="h-full bg-gradient-to-r from-transparent via-gold to-transparent transition-none"
              style={{
                width: `${progress * 100}%`,
                boxShadow: "0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
