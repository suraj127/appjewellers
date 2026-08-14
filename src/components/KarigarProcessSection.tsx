import { useState, useEffect, useRef } from "react";

/**
 * Mobile-First & Desktop Scroll-Driven Karigar Video Experience
 * 
 * Features:
 * - Touch swipeable stages on mobile (Swipe Left / Right to navigate stages)
 * - Stage pills on mobile for instant 1-tap navigation
 * - Responsive 100dvh sticky container preventing mobile address-bar jitter
 * - Safe-area padding preventing overlap with floating action buttons
 * - 60 FPS RAF scroll synchronization on desktop
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
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const rafId = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const totalStages = VIDEO_STAGES.length;

  // Throttled RAF Scroll Calculation for Desktop and Mobile
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
        const currentProg = Math.min(Math.max(raw, 0), 1);
        setProgress(currentProg);
        const stageIdx = Math.min(
          Math.floor(currentProg * totalStages),
          totalStages - 1
        );
        setActiveStageIndex(stageIdx);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [totalStages]);

  const stageFloat = progress * (totalStages - 1);
  const activeIndex = Math.min(Math.floor(stageFloat), totalStages - 2);
  const blend = stageFloat - activeIndex;

  // Mobile Hardware Video Decoder Management:
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      const isVisible = idx === activeIndex || idx === activeIndex + 1 || idx === activeStageIndex;
      if (isVisible) {
        if (videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      } else {
        if (!videoEl.paused) {
          videoEl.pause();
        }
      }
    });
  }, [activeIndex, activeStageIndex]);

  // Jump to specific stage
  const jumpToStage = (idx: number) => {
    setActiveStageIndex(idx);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollable = rect.height - window.innerHeight;
    const target = containerTop + (idx / (totalStages - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0 && activeStageIndex < totalStages - 1) {
        jumpToStage(activeStageIndex + 1);
      } else if (deltaX > 0 && activeStageIndex > 0) {
        jumpToStage(activeStageIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="karigar"
      ref={containerRef}
      className="relative bg-[#121212] will-change-transform"
      style={{ height: `${totalStages * 85}vh` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Fullscreen Viewport using dynamic viewport height */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#121212] transform-gpu">
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
              className="absolute inset-0 pointer-events-none transform-gpu will-change-opacity transition-opacity duration-150"
              style={{ opacity }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={stage.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] transform-gpu"
              />
            </div>
          );
        })}

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70 pointer-events-none z-10" />

        {/* Top Header & Mobile Stage Switcher Pills */}
        <div className="absolute top-4 sm:top-10 inset-x-4 sm:inset-x-12 z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[0.58rem] sm:text-xs uppercase tracking-[0.3em] text-[#C49324] font-bold block mb-0.5">
              ATELIER CRAFTSMANSHIP
            </span>
            <h2 className="font-display text-xl sm:text-3xl text-white font-bold tracking-wider">
              Art of the <span className="italic luxury-sparkle-text text-[#C49324]">Karigar</span>
            </h2>
          </div>

          {/* Mobile Stage Tap Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {VIDEO_STAGES.map((st, i) => {
              const isSelected = i === activeStageIndex;
              return (
                <button
                  key={st.title}
                  type="button"
                  onClick={() => jumpToStage(i)}
                  className={`px-2.5 py-1 rounded-full text-[0.6rem] sm:text-[0.68rem] uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? "bg-[#C49324] text-black shadow-[0_0_12px_rgba(196,147,36,0.8)] scale-105"
                      : "bg-black/60 backdrop-blur-md text-zinc-300 border border-[#C49324]/30 hover:border-[#C49324]"
                  }`}
                >
                  Stage 0{i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Caption & Stage Description Overlay (Safe padding from bottom controls) */}
        <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-12 right-12 sm:right-24 z-20 max-w-xl text-left pointer-events-none">
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C49324]/20 border border-[#C49324]/50 backdrop-blur-md text-[0.55rem] sm:text-xs uppercase tracking-[0.25em] text-[#e5be59] font-bold mb-2">
                  <span>{stage.subtitle}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-5xl font-bold text-white leading-tight drop-shadow-md">
                  {stage.title}
                </h3>
                <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm text-zinc-200 font-light max-w-md leading-relaxed drop-shadow-sm">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Stage Indicator Dots (Desktop) */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
          {VIDEO_STAGES.map((st, i) => {
            const isActive = i === activeStageIndex;

            return (
              <button
                key={st.title}
                type="button"
                aria-label={`Jump to ${st.title}`}
                onClick={() => jumpToStage(i)}
                className="group relative flex items-center justify-center p-1.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "size-3 sm:size-3.5 bg-[#C49324] shadow-[0_0_12px_rgba(196,147,36,0.9)]"
                      : "size-1.5 sm:size-2 bg-[#C49324]/40 group-hover:bg-[#C49324]"
                  }`}
                />
                <span
                  className={`absolute right-7 whitespace-nowrap text-[0.55rem] sm:text-[0.58rem] uppercase tracking-widest font-bold transition-all duration-300 hidden md:block ${
                    isActive ? "text-[#C49324] opacity-100" : "text-zinc-400 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {i + 1}. {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll / Swipe Progress Bar at Bottom Viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/80 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#996e14] via-[#C49324] to-[#FFF8D6] transition-all duration-100"
            style={{ width: `${((activeStageIndex + 1) / totalStages) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
