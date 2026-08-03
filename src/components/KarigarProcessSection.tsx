import { useState, useEffect, useRef } from "react";

/**
 * Mobile-Optimized Scroll-Driven Karigar Video Experience
 * 
 * 60 FPS mobile performance:
 * - Smart Video Playback Manager: Only decodes active/adjacent videos, pausing hidden ones.
 * - Hardware Accelerated RAF Scroll Interpolation: 0 frame drop during mobile scroll.
 */

const VIDEO_STAGES = [
  {
    video: "/assets/karigar/v5.mp4",
    title: "The Flame & Crucible",
    subtitle: "Stage 01 · 1,064°C Molten Gold Casting",
    desc: "Pure gold melted in clay crucibles and poured into artisan molds.",
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
    desc: "Finished Kundan bridal suite inspected under 10x loupe for 100% perfection.",
  },
];

export function KarigarProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  // Throttled RAF Scroll Calculation for 60 FPS Mobile Performance
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;
        const raw = -rect.top / scrollable;
        setProgress(Math.min(Math.max(raw, 0), 1));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const totalStages = VIDEO_STAGES.length;
  const stageFloat = progress * (totalStages - 1); // 0 -> 4
  const activeIndex = Math.min(Math.floor(stageFloat), totalStages - 2);
  const blend = stageFloat - activeIndex; // 0 -> 1 crossfade

  // Mobile Hardware Video Decoder Management:
  // Play active and next adjacent video; pause all hidden ones to avoid mobile GPU lag
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      const isVisible = idx === activeIndex || idx === activeIndex + 1;
      if (isVisible) {
        if (videoEl.paused) {
          videoEl.play().catch(() => {
            // Autoplay safety catch
          });
        }
      } else {
        if (!videoEl.paused) {
          videoEl.pause();
        }
      }
    });
  }, [activeIndex]);

  return (
    <section
      id="karigar"
      ref={containerRef}
      className="relative bg-black will-change-transform"
      style={{ height: `${totalStages * 80}vh` }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black transform-gpu">
        {/* Layered Videos with Hardware-Accelerated Opacity Crossfade */}
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
              className="absolute inset-0 pointer-events-none transform-gpu will-change-opacity transition-opacity duration-150"
              style={{ opacity }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={stage.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] transform-gpu"
              />
            </div>
          );
        })}

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

        {/* Top Header Title */}
        <div className="absolute top-5 left-5 sm:top-10 sm:left-12 z-20">
          <h2 className="font-display text-lg sm:text-3xl text-amber-100 font-bold tracking-wider">
            Art of the <span className="italic shimmer-text">Karigar</span>
          </h2>
        </div>

        {/* Dynamic Caption & Stage Description Overlay */}
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-12 right-5 sm:right-12 z-20 max-w-2xl text-left pointer-events-none">
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
                className="transition-all duration-300 transform-gpu"
                style={{ opacity: captionOpacity }}
              >
                <p className="text-[0.58rem] sm:text-xs uppercase tracking-[0.35em] text-gold font-bold mb-1">
                  {stage.subtitle}
                </p>
                <h3 className="font-display text-xl sm:text-5xl font-bold text-white leading-tight">
                  {stage.title}
                </h3>
                <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm text-amber-100/80 font-light max-w-lg leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Stage Indicator Dots */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
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
                      ? "size-3 sm:size-3.5 bg-gold shadow-[0_0_12px_rgba(255,215,0,0.9)]"
                      : "size-1.5 sm:size-2 bg-gold/30 group-hover:bg-gold/70"
                  }`}
                />
                <span
                  className={`absolute right-7 whitespace-nowrap text-[0.55rem] sm:text-[0.58rem] uppercase tracking-widest font-bold transition-all duration-300 hidden sm:block ${
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
            className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
