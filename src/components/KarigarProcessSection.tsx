import { useState, useEffect, useRef } from "react";
import craftImg from "@/assets/craft.jpg";
import bridalImg from "@/assets/coll-bridal.jpg";
import ringsImg from "@/assets/coll-rings.jpg";
import banglesImg from "@/assets/coll-bangles.jpg";
import tryonImg from "@/assets/tryon.jpg";

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  description: string;
  actionSummary: string;
  image: string;
  accentColor: string;
  goldPurity: string;
}

const KARIGAR_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Sona Galana — Gold Crucible & 22K Purity Melting",
    subtitle: "Stage 1: Melting & Alloy Formulations",
    specs: [
      { label: "Melting Temp", value: "1,064 °C" },
      { label: "Crucible", value: "Graphite Clay" },
      { label: "Standard", value: "91.6% Pure 22K" },
      { label: "Duration", value: "2.5 Hours" },
    ],
    description:
      "Pure 24K gold bars are melted over an intense oxygen flame inside a graphite crucible at 1,064°C. Master Karigars blend pure copper and silver in precise ratios to achieve exact 22 Carat (916) BIS Hallmark strength.",
    actionSummary: "Molten 22K gold poured into solid gold ingot bars.",
    image: craftImg,
    accentColor: "#d4af37",
    goldPurity: "22K 916 BIS Standard",
  },
  {
    step: "02",
    title: "Peetna & Taar Chheelna — Anvil Forging & Wire Drawing",
    subtitle: "Stage 2: Structural Shaping & Filaments",
    specs: [
      { label: "Anvil Tool", value: "Hardened Steel" },
      { label: "Wire Gauge", value: "0.15 mm Thin" },
      { label: "Forging Force", value: "Hand Hammered" },
      { label: "Duration", value: "12 Hours" },
    ],
    description:
      "The solid gold ingot is hand-forged on heavy steel anvils and drawn through diamond-bored steel plates. The Karigar creates ultra-thin 22K gold wire filaments and uniform gold sheets for intricate neckwear.",
    actionSummary: "Gold drawn into 0.15mm filaments and uniform sheets.",
    image: banglesImg,
    accentColor: "#e5c158",
    goldPurity: "Hand-Forged 916 Wire",
  },
  {
    step: "03",
    title: "Naqashi & Jaali — Hand-Carved Kundan Filigree",
    subtitle: "Stage 3: Micro-Chiseling & Openwork Lattice",
    specs: [
      { label: "Tool Used", value: "Diamond Chisel" },
      { label: "Artisan Hours", value: "80+ Hours" },
      { label: "Lattice Detail", value: "400+ Piercings" },
      { label: "Style", value: "Royal Jaipur Kundan" },
    ],
    description:
      "Master engravers (Naqash) use micro-chisels under magnifiers to carve lace-like gold mesh and Kundan foil cups. Every floral petal and geometric border is hand-pierced with meticulous craftsmanship.",
    actionSummary: "Over 400 micro-piercings carved by master Naqash.",
    image: tryonImg,
    accentColor: "#f3e5ab",
    goldPurity: "Hand-Carved 22K Filigree",
  },
  {
    step: "04",
    title: "Jadhai — Loupe Precision Gemstone & Solitaire Setting",
    subtitle: "Stage 4: Micro-Prong & Bezel Stone Setting",
    specs: [
      { label: "Magnification", value: "10x Loupe Lens" },
      { label: "Stones Set", value: "GIA Diamonds & Rubies" },
      { label: "Setting Type", value: "Micro-Bezel Jadhai" },
      { label: "Duration", value: "40 Hours" },
    ],
    description:
      "Certified solitaire diamonds, Burmese rubies, and Zambian emeralds are set into hand-crafted gold cups under 10x magnification loupes. Each gemstone is locked with micro-prong precision.",
    actionSummary: "VVS Solitaires & Rubies hand-locked with zero play.",
    image: ringsImg,
    accentColor: "#e8c872",
    goldPurity: "Certified VVS Diamonds",
  },
  {
    step: "05",
    title: "Rangai & HUID — Meenakari Enamel & BIS Laser Hallmark",
    subtitle: "Stage 5: Mineral Firing, Polishing & Certification",
    specs: [
      { label: "Enamel Firing", value: "750 °C Mineral" },
      { label: "Buffing", value: "Walnut Shell Velvet" },
      { label: "Stamp", value: "BIS Laser HUID" },
      { label: "Guarantee", value: "100% Lifetime" },
    ],
    description:
      "Vibrant Meenakari mineral enamel is kiln-fired into gold grooves, followed by walnut-shell velvet buffing. Finally, the ornament undergoes official government BIS laser hallmark HUID stamping.",
    actionSummary: "100% BIS Hallmarked HUID stamp & high-luster polish.",
    image: bridalImg,
    accentColor: "#ffd700",
    goldPurity: "100% BIS Hallmarked HUID",
  },
];

export function KarigarProcessSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the section has scrolled through viewport
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress(clampedProgress);

      // Determine active step index (0 to 4)
      const stepIndex = Math.min(
        Math.floor(clampedProgress * KARIGAR_STEPS.length),
        KARIGAR_STEPS.length - 1
      );
      setActiveStepIndex(stepIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentStep = KARIGAR_STEPS[activeStepIndex];

  return (
    <section
      id="karigar"
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#1a0407] via-[#2a060a] to-[#1a0407] text-foreground border-y border-gold/40 shadow-2xl min-h-[260vh] sm:min-h-[300vh]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
        {/* Ambient Glowing Background Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 size-80 rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />

        {/* Section Top Header & Scroll Meter */}
        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-wrap items-center justify-between gap-3 border-b border-gold/30 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gold text-primary-foreground font-bold px-2 py-0.5 rounded text-[0.55rem] uppercase tracking-widest">
                SARAFA MARKET ATELIER
              </span>
              <span className="text-[0.62rem] text-gold font-bold uppercase tracking-widest">
                Interactive Karigar Craft Journey
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl text-amber-100 font-bold mt-0.5">
              The 5 Sacred Stages of Handcrafted Gold
            </h2>
          </div>

          {/* Step Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {KARIGAR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const containerTop = window.scrollY + rect.top;
                    const sectionHeight = rect.height - window.innerHeight;
                    const targetScroll = containerTop + (idx / (KARIGAR_STEPS.length - 1)) * sectionHeight;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }
                }}
                className={`px-2.5 py-1 rounded text-[0.6rem] font-bold uppercase tracking-wider transition-all border ${
                  activeStepIndex === idx
                    ? "bg-gold text-primary-foreground border-gold shadow-md scale-105"
                    : "bg-onyx/80 text-muted-foreground border-gold/30 hover:border-gold hover:text-gold"
                }`}
              >
                Stage {s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area (Split 2-Col Layout) */}
        <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-4 sm:py-6 overflow-hidden">
          {/* Left Column: Stage Image & Live Molten Gold Visual */}
          <div className="lg:col-span-5 relative h-56 sm:h-80 lg:h-[400px] w-full rounded-lg border border-gold/50 overflow-hidden bg-black/60 shadow-2xl group">
            <img
              src={currentStep.image}
              alt={currentStep.title}
              className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-black/40" />

            {/* Stage Number Badge */}
            <div className="absolute top-3 left-3 bg-gradient-to-br from-[#4a0810] to-onyx border border-gold/60 p-2.5 rounded text-center shadow-xl">
              <span className="text-[0.55rem] uppercase tracking-widest text-gold block font-semibold">
                STAGE
              </span>
              <span className="font-display text-2xl text-amber-200 font-bold leading-none">
                {currentStep.step}
              </span>
            </div>

            {/* Live Hallmark Pill Tag */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass-panel p-2 rounded border-gold/40">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[0.62rem] font-bold text-amber-200 uppercase tracking-wider">
                  {currentStep.goldPurity}
                </span>
              </div>
              <span className="text-[0.55rem] uppercase tracking-widest text-gold font-bold">
                100% Certified
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Stage Info & Interactive Technical Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6 text-left">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold">
                {currentStep.subtitle}
              </p>
              <h3 className="font-display text-2xl sm:text-4xl text-amber-100 font-bold mt-1 leading-snug">
                {currentStep.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-base font-light text-muted-foreground leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Technical Specifications 4-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {currentStep.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="p-2.5 sm:p-3 rounded bg-onyx/90 border border-gold/30 hover:border-gold/60 transition-colors shadow-inner"
                >
                  <p className="text-[0.55rem] uppercase tracking-wider text-gold font-semibold">
                    {sp.label}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                    {sp.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Summary Callout Box */}
            <div className="p-3.5 rounded bg-gradient-to-r from-[#4a0810] via-onyx to-[#4a0810] border border-gold/40 flex items-center justify-between text-xs text-amber-200 shadow-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-gold font-bold text-base">⚒️</span>
                <div>
                  <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold">
                    KARIGAR ACTION SUMMARY
                  </p>
                  <p className="text-foreground font-semibold text-xs sm:text-sm mt-0.5">
                    {currentStep.actionSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Progress Bar & Stage Indicator */}
        <div className="relative z-10 mx-auto max-w-7xl w-full border-t border-gold/30 pt-3">
          <div className="flex items-center justify-between text-[0.62rem] text-muted-foreground font-medium mb-1.5">
            <span className="uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-gold animate-pulse" />
              Scroll Down to View Jewellery Making Process ({Math.round(scrollProgress * 100)}%)
            </span>
            <span className="text-amber-200 font-bold">
              STAGE {activeStepIndex + 1} OF {KARIGAR_STEPS.length}
            </span>
          </div>

          {/* Glowing Gold Track Progress Bar */}
          <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-gold/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.8)]"
              style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
