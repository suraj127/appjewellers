import { useState, useEffect, useRef } from "react";

/**
 * Scroll-Driven Karigar Video Experience
 * 
 * High-definition video transitions through the 5 authentic benchwork stages:
 * 1. The Flame & Crucible (Pouring Molten 22K Gold)
 * 2. The Anvil & Forge (Hammering White-Hot Metal)
 * 3. Master Hand Carving (Intricate Engraving)
 * 4. Kundan & Gemstone Setting (Atelier Bench Work)
 * 5. Royal Velvet Reveal (22K BIS Hallmarked Suite)
 */

const VIDEO_STAGES = [
  {
    video: "/assets/karigar/v5.mp4",
    title: "The Flame & Crucible",
    subtitle: "Stage 01 · 1,064°C Molten Gold Casting",
    desc: "Pure 22K gold melted in clay crucibles and poured into artisan molds.",
  },
  {
    video: "/assets/karigar/v4.mp4",
    title: "The Anvil & Forge",
    subtitle: "Stage 02 · White-Hot Metal Wire Shaping",
    desc: "Hand-forged gold bars shaped with traditional wooden mallets and iron anvils.",
  },
  {
    video: "/assets/karigar/v1.mp4",
    title: "Master Hand Carving",
    subtitle: "Stage 03 · 400 Intricate Micro-Cuts",
    desc: "Precision chisels engrave traditional Meenakari & royal motifs into solid gold.",
  },
  {
    video: "/assets/karigar/v2.mp4",
    title: "The Kundan Setting",
    subtitle: "Stage 04 · Master Gemmologist Bench",
    desc: "Burmese rubies and certified solitaire diamonds foil-set in 24K pure gold leaf.",
  },
  {
    video: "/assets/karigar/v3.mp4",
    title: "The Royal Reveal",
    subtitle: "Stage 05 · BIS Hallmarked Bridal Jewel",
    desc: "Finished 22K Kundan bridal suite inspected under 10x loupe for 100% perfection.",
  },
];

export function KarigarProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  // Track scroll progress through the 500vh container
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

  // Ensure all videos play continuously
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.play().catch(() => {
          // Autoplay fallback
        });
      }
    });
  }, []);

  const totalStages = VIDEO_STAGES.length;
  const stageFloat = progress * (totalStages - 1); // 0 -> 4
  const activeIndex = Math.min(Math.floor(stageFloat), totalStages - 2);
  const blend = stageFloat - activeIndex; // 0 -> 1 crossfade interpolation

  return (
    <section
      id="karigar"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${totalStages * 100}vh` }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Layered Videos with Opacity Crossfade */}
        {VIDEO_STAGES.map((stage, i) => {
          let opacity = 0;
          if (i < activeIndex) opacity = 0;
          else if (i === activeIndex) opacity = 1 - blend;
          else if (i === activeIndex + 1) opacity = blend;
          else if (i === totalStages - 1 && progress >= 1) opacity = 1;

          if (opacity < 0.005) return null;

          return (
            <div
              key={stage.video}
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{ opacity }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={stage.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
              />
            </div>
          );
        })}

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

        {/* Top Header Badge */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-[0.58rem] sm:text-xs font-bold uppercase tracking-[0.3em] shadow-lg">
            <span className="size-2 rounded-full bg-rose-500 animate-ping" />
            Sarafa Atelier BENCHWORK
          </div>
          <h2 className="mt-2 font-display text-xl sm:text-3xl text-amber-100 font-bold tracking-wider">
            Art of the <span className="italic shimmer-text">Karigar</span>
          </h2>
        </div>

        {/* Dynamic Caption & Stage Description Overlay */}
        <div className="absolute bottom-12 sm:bottom-20 left-6 sm:left-12 right-6 sm:right-12 z-20 max-w-2xl text-left pointer-events-none">
          {VIDEO_STAGES.map((stage, i) => {
            let captionOpacity = 0;
            if (i === activeIndex && blend < 0.4) captionOpacity = 1;
            else if (i === activeIndex + 1 && blend > 0.6) captionOpacity = 1;
            else if (i === activeIndex && blend >= 0.4) captionOpacity = 1 - (blend - 0.4) / 0.2;
            else if (i === activeIndex + 1 && blend <= 0.6) captionOpacity = (blend - 0.4) / 0.2;
            if (i === totalStages - 1 && progress >= 0.98) captionOpacity = 1;

            if (captionOpacity < 0.01) return null;

            return (
              <div
                key={stage.title}
                className="transition-all duration-300"
                style={{ opacity: captionOpacity }}
              >
                <p className="text-[0.62rem] sm:text-xs uppercase tracking-[0.35em] text-gold font-bold mb-1">
                  {stage.subtitle}
                </p>
                <h3 className="font-display text-2xl sm:text-5xl font-bold text-white leading-tight">
                  {stage.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-amber-100/80 font-light max-w-lg leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Stage Indicator Rail */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
          {VIDEO_STAGES.map((st, i) => {
            const isActive =
              i === activeIndex ||
              (i === activeIndex + 1 && blend > 0.5) ||
              (i === totalStages - 1 && progress >= 0.98);

            return (
              <button
                key={st.title}
                type="button"
                aria-label={`Jump to ${st.title}`}
                onClick={() => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const containerTop = window.scrollY + rect.top;
                  const scrollable = rect.height - window.innerHeight;
                  const target = containerTop + (i / (totalStages - 1)) * scrollable;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className="group relative flex items-center justify-center p-1"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "size-3.5 bg-gold shadow-[0_0_12px_rgba(255,215,0,0.9)]"
                      : "size-2 bg-gold/30 group-hover:bg-gold/70"
                  }`}
                />
                <span
                  className={`absolute right-7 whitespace-nowrap text-[0.58rem] uppercase tracking-widest font-bold transition-all duration-300 ${
                    isActive ? "text-gold opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {i + 1}. {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Progress Bar at Bottom Viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 z-20">
          <div
            className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
