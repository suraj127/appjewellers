import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import ringsImg from "@/assets/coll-rings.jpg";
import bridalImg from "@/assets/coll-bridal.jpg";
import banglesImg from "@/assets/coll-bangles.jpg";
import tryonImg from "@/assets/tryon.jpg";
import craftImg from "@/assets/craft.jpg";
import logoImg from "@/assets/logo.png";
import { PRODUCTS } from "@/data/products";
import { AppointmentForm } from "./AppointmentForm";
import { PhoneIcon, WhatsAppIcon } from "./LuxuryIcons";
import { KarigarProcessSection } from "./KarigarProcessSection";
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Sparkles,
  Gem,
  Award,
  RefreshCw,
  ShieldCheck,
  Lock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";


const COLLECTIONS = [
  {
    name: "Solitaires",
    meta: "GIA · 0.5 – 5.0 ct",
    img: ringsImg,
    slug: "lumiere-solitaire",
    copy: "Single-stone rings cut for maximum return of light.",
  },
  {
    name: "Bridal & Temple",
    meta: "Kundan · Ruby",
    img: bridalImg,
    slug: "chandra-suite",
    copy: "Ceremonial suites, hand-set over four hundred hours.",
  },
  {
    name: "Bangles & Cuffs",
    meta: "Pavé diamond",
    img: banglesImg,
    slug: "meridian-cuff",
    copy: "Sculpted forms that hold the wrist without weight.",
  },
];

const SIGNATURE_SPECS = [
  ["Metal", "Yellow gold"],
  ["Centre stone", "3.04 ct pear, D VVS1"],
  ["Certification", "GIA · IGI · BIS Hallmark"],
  ["Gross weight", "38.420 g"],
  ["Setting", "Hand-set · 412 stones"],
  ["Availability", "Atelier · 3 boutiques"],
];

const TRYON_STEPS = [
  ["01", "Grant the camera", "Face, neck, hand and pose landmarks are detected on-device."],
  ["02", "The piece locks on", "Yaw, pitch and roll tracked at 60fps — the chain rests naturally."],
  ["03", "Light adapts to you", "Skin tone and room light drive the metal's reflection in real time."],
];

const TRUST = [
  ["BIS", "Hallmarked"],
  ["GIA · IGI", "Certified stones"],
  ["100%", "Lifetime exchange"],
  ["Fully", "Insured delivery"],
];

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 sm:mt-6 font-display text-[clamp(2.1rem,4.8vw,3.8rem)] leading-[1.15] sm:leading-[1.22] text-foreground font-bold">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm font-light leading-relaxed text-muted-foreground max-w-xl mx-auto">
          {copy}
        </p>
      ) : null}
      <div className="rule-gold mx-auto mt-6 sm:mt-8 w-32 sm:w-40" />
    </div>
  );
}

function ProductHoverImage({
  image,
  hoverImage,
  alt,
  className = "",
}: {
  image: string;
  hoverImage?: string;
  alt: string;
  className?: string;
}) {
  const [showSecond, setShowSecond] = useState(false);
  const hasSecondImage = Boolean(hoverImage && hoverImage !== image);

  return (
    <div
      className={`relative size-full overflow-hidden select-none ${className}`}
      onTouchStart={() => {
        if (hasSecondImage) {
          setShowSecond((prev) => !prev);
        }
      }}
      onMouseEnter={() => {
        if (hasSecondImage) setShowSecond(true);
      }}
      onMouseLeave={() => {
        if (hasSecondImage) setShowSecond(false);
      }}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-in-out ${
          hasSecondImage && showSecond ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      />
      {hasSecondImage && (
        <img
          src={hoverImage}
          alt={`${alt} alternate view`}
          loading="lazy"
          className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-in-out ${
            showSecond ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />
      )}
      {hasSecondImage && (
        <div className="absolute bottom-2 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              !showSecond ? "w-3 bg-gold" : "w-1.5 bg-white/40"
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              showSecond ? "w-3 bg-gold" : "w-1.5 bg-white/40"
            }`}
          />
        </div>
      )}
    </div>
  );
}

/* ── 3D Orbit Background Constants ─────────────────────────────── */
const ORBIT_COUNT = 22;
const ORBIT_FRAMES = Array.from(
  { length: ORBIT_COUNT },
  (_, i) => `/assets/chandra/f${String(i + 1).padStart(2, "0")}.jpg`
);
const MACRO_FRAME = "/assets/chandra/macro.jpg";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function getPieceGrossWeight(item: any): string {
  const dimWeight = item.dimensions?.find(
    (d: any) =>
      typeof d[0] === "string" &&
      (d[0].toLowerCase().includes("weight") || d[0].toLowerCase().includes("gross"))
  );
  if (dimWeight && dimWeight[1]) return dimWeight[1];
  return "24.500 g";
}

export function Collections() {
  const exclusiveItems = PRODUCTS.filter((p) => p.isExclusive);
  const items = exclusiveItems.length >= 5 ? exclusiveItems : PRODUCTS.slice(0, 8);

  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const total = items.length;

  const prev = () => {
    setActiveIndex((curr) => (curr - 1 + total) % total);
  };

  const next = () => {
    setActiveIndex((curr) => (curr + 1) % total);
  };

  // Auto-play every 5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((curr) => (curr + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      next();
    } else if (distance < -40) {
      prev();
    }
    setTouchStart(null);
  };

  return (
    <section
      id="collections"
      className="relative px-3 sm:px-6 py-16 sm:py-28 bg-background border-y border-gold/30 shadow-sm overflow-hidden"
    >
      {/* Ambient Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Foreground Container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Special Gold & Diamond Collection"
            title="Handcrafted Jewellery for Every Celebration"
            copy="Explore pure BIS hallmarked gold, real certified diamonds, traditional Kundan sets, and dailywear jewellery crafted at A.P.P. Jewellers."
          />
        </Reveal>

        {/* ── 3D CURVED COVER FLOW CAROUSEL CONTAINER ── */}
        <div
          className="relative mt-12 sm:mt-20 pt-6 sm:pt-10 w-full max-w-6xl mx-auto h-[26rem] sm:h-[35rem] flex items-center justify-center select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Nav Button */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous Creation"
            className="absolute left-1 sm:left-4 z-40 size-10 sm:size-12 rounded-full bg-black/85 border border-[#d4af37]/60 text-amber-100 hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#aa771c] hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>

          {/* Right Arrow Nav Button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next Creation"
            className="absolute right-1 sm:right-4 z-40 size-10 sm:size-12 rounded-full bg-black/85 border border-[#d4af37]/60 text-amber-100 hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#aa771c] hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer active:scale-90 hover:scale-105"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>

          {/* 3D Stack of Cards */}
          <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
            {items.map((item, idx) => {
              let offset = idx - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              // Calculate 3D transformation values with proper spacing
              let translateX = 0;
              let scale = 1;
              let rotateY = 0;
              let zIndex = 10;
              let opacity = 1;
              let filter = "brightness(1)";

              if (isCenter) {
                translateX = 0;
                scale = 1.05;
                rotateY = 0;
                zIndex = 30;
                opacity = 1;
                filter = "brightness(1)";
              } else if (offset === 1) {
                translateX = 82;
                scale = 0.88;
                rotateY = -20;
                zIndex = 20;
                opacity = 0.82;
                filter = "brightness(0.85)";
              } else if (offset === -1) {
                translateX = -82;
                scale = 0.88;
                rotateY = 20;
                zIndex = 20;
                opacity = 0.82;
                filter = "brightness(0.85)";
              } else if (offset === 2) {
                translateX = 158;
                scale = 0.72;
                rotateY = -30;
                zIndex = 10;
                opacity = 0.42;
                filter = "brightness(0.7)";
              } else if (offset === -2) {
                translateX = -158;
                scale = 0.72;
                rotateY = 30;
                zIndex = 10;
                opacity = 0.42;
                filter = "brightness(0.7)";
              } else {
                translateX = offset > 0 ? 200 : -200;
                scale = 0.5;
                rotateY = offset > 0 ? -40 : 40;
                zIndex = 0;
                opacity = 0;
              }

              const grossWeight = getPieceGrossWeight(item);

              return (
                <div
                  key={item.slug}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(idx);
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-[70vw] max-w-[250px] sm:max-w-[310px] h-[21rem] sm:h-[29rem] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1)] ${
                    isCenter
                      ? "border-2 border-[#d4af37] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.3)] pointer-events-auto"
                      : "border border-[#d4af37]/35 shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity: isVisible ? opacity : 0,
                    filter,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  {/* Background Piece Image with Smooth Alternate Angle Hover */}
                  <ProductHoverImage
                    image={item.image}
                    hoverImage={item.hoverImage}
                    alt={item.name}
                    className="size-full object-cover"
                  />

                  {/* Gradient Vignette Shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 pointer-events-none" />

                  {/* Top Gross Weight Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                    <span className="rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/60 px-2.5 sm:px-3 py-1 text-[0.52rem] sm:text-[0.62rem] text-amber-200 font-extrabold uppercase tracking-wider shadow-md">
                      GS WT: {grossWeight}
                    </span>
                  </div>

                  {/* Top Right Certified Hallmarked Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                    <span className="rounded-full bg-[#d4af37]/20 backdrop-blur-md border border-[#d4af37]/50 px-2 py-0.5 text-[0.5rem] sm:text-[0.58rem] text-amber-100 font-bold uppercase tracking-wider">
                      BIS 916
                    </span>
                  </div>

                  {/* Bottom Right Expand/Inspect Direct Button */}
                  <Link
                    to="/piece/$slug"
                    params={{ slug: item.slug }}
                    aria-label={`Inspect ${item.name}`}
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 size-8 sm:size-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f5d77f] text-black shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    onClick={(e) => {
                      if (!isCenter) {
                        e.preventDefault();
                        setActiveIndex(idx);
                      }
                    }}
                  >
                    <Maximize2 className="size-3.5 sm:size-4 stroke-[2.5]" />
                  </Link>

                  {/* Bottom Text & Pricing Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 text-left z-10 pointer-events-none pr-12">
                    <p className="text-[0.52rem] sm:text-[0.62rem] uppercase tracking-[0.22em] text-[#d4af37] font-bold truncate">
                      {item.category}
                    </p>
                    <h3 className="mt-0.5 font-display text-xs sm:text-lg font-bold text-white leading-snug line-clamp-1 drop-shadow-md">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[0.58rem] sm:text-[0.72rem] text-amber-200 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="size-2.5 sm:size-3 text-[#d4af37] animate-pulse shrink-0" />
                      <span>PRICE ON REQUEST</span>
                    </p>

                    {isCenter && (
                      <div className="mt-2.5 pointer-events-auto">
                        <Link
                          to="/piece/$slug"
                          params={{ slug: item.slug }}
                          className="shine-sweep inline-flex items-center gap-1.5 text-[0.58rem] sm:text-[0.66rem] uppercase tracking-[0.2em] text-[#d4af37] hover:text-[#f5d77f] font-extrabold transition-colors py-0.5 group/btn"
                        >
                          <span>Discover Creation</span>
                          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CAROUSEL PAGINATION & SLIDE INDICATORS ── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeIndex
                  ? "w-8 sm:w-10 bg-gradient-to-r from-[#d4af37] to-[#f5d77f] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  : "w-2 bg-zinc-400/40 hover:bg-[#d4af37]/60"
              }`}
            />
          ))}
        </div>

        {/* ── FULL CATEGORY DIRECTORY CTA ── */}
        <Reveal delay={200}>
          <div className="mt-14 text-center border-t border-border/60 pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Looking for specific categories like Chains, Jhumkas, Mangalsutra, Coins, or Rings?
            </p>
            <Link
              to="/collections"
              className="shine-sweep inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-10 py-4 text-xs uppercase tracking-[0.28em] text-black font-extrabold shadow-[0_10px_35px_rgba(184,134,11,0.4)] hover:shadow-[0_14px_45px_rgba(184,134,11,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Browse Full Category Directory & Collections</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SchemeTeaser() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-24 bg-onyx border-y border-gold/30 shadow-sm overflow-hidden">
      {/* Ambient Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-left">
          <span className="eyebrow text-[0.55rem] sm:text-xs">A.P.P. Gold Purchase Plan</span>
          <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold text-foreground">
            SwarnaNidhi <span className="italic shimmer-text">Gold Savings Scheme</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Pay 8 monthly installments and enjoy up to 100% store bonus & net customer profits up to ₹42,000! Calculate your returns with our interactive scheme calculator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto z-10">
          <Link
            to="/scheme"
            className="shine-sweep inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-9 py-4 text-xs uppercase tracking-[0.26em] text-black font-extrabold shadow-[0_10px_35px_rgba(184,134,11,0.4)] hover:shadow-[0_14px_45px_rgba(184,134,11,0.6)] hover:scale-105 active:scale-95 transition-all text-center"
          >
            <span>Calculate Scheme Earnings</span>
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Signature() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="signature" className="relative overflow-hidden bg-gradient-to-r from-[#ffffff] via-[#f9f9fa] to-[#ffffff] py-12 sm:py-24 border-y border-gold/30 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* SINGLE FEATURED IMAGE WITH MINIMAL LUXURY ANIMATION */}
          <Reveal>
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-lg border border-gold/40 shadow-2xl h-72 sm:h-[420px] group bg-black transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Single Image with Slow Ken Burns Breathing Zoom */}
              <img
                src={bridalImg}
                alt="Chandra ruby and diamond bridal necklace in 22K gold"
                loading="lazy"
                className="size-full object-cover transition-transform duration-[8000ms] ease-in-out scale-100 group-hover:scale-110 animate-pulse-slow"
              />

              {/* Diagonal Gold Light Sweep Sheen */}
              <div className="shine-sweep absolute inset-0 pointer-events-none z-10" />

              {/* Ambient Vignette & Shadow Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            </div>
          </Reveal>

          {/* DETAILS ON RIGHT */}
          <Reveal delay={150}>
            <div className="text-left">
              <p className="eyebrow text-[0.55rem] sm:text-xs">Piece No. 001 — Signature</p>
              <h2 className="mt-2 sm:mt-4 font-display text-2xl sm:text-5xl leading-tight font-bold text-foreground">
                The <span className="italic shimmer-text">Chandra</span> Suite
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-base font-light leading-relaxed text-muted-foreground">
                A crescent of Burmese rubies framed by 412 brilliant-cut diamonds. Certified hallmarked gold purity with lifetime polish guarantee.
              </p>

              <dl className="mt-4 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-6 border-t border-gold/30 pt-4">
                {SIGNATURE_SPECS.map(([k, v]) => (
                  <div key={k} className="border-b border-gold/20 pb-2">
                    <dt className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-wider text-gold font-medium">
                      {k}
                    </dt>
                    <dd className="mt-0.5 font-display text-xs sm:text-lg text-foreground font-semibold truncate">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6">
                <Link
                  to="/piece/$slug"
                  params={{ slug: "chandra-suite" }}
                  className="shine-sweep inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-8 py-3.5 text-xs uppercase tracking-[0.24em] text-black font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Inspect Piece</span>
                  <span className="text-xs">→</span>
                </Link>
                <Link
                  to="/appointment"
                  search={{ piece: "The Chandra Suite" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b8860b]/60 bg-[#fcfaf2] px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-[#8b5a00] font-bold hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all shadow-xs active:scale-95"
                >
                  <span>Enquire Privately</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Maison() {
  return (
    <>
      <KarigarProcessSection />
      <section className="relative overflow-hidden bg-onyx py-10 sm:py-16 border-b border-gold/30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {TRUST.map(([k, v], i) => (
              <Reveal key={v} delay={i * 100}>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-onyx/80 border border-gold/30 shadow-lg">
                  <p className="font-display text-xl sm:text-3xl text-gold font-bold">{k}</p>
                  <p className="mt-1 text-[0.55rem] sm:text-[0.62rem] uppercase tracking-widest text-muted-foreground font-semibold">
                    {v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


export function StoreLocation() {
  return (
    <section id="store-info" className="relative px-4 sm:px-6 py-16 sm:py-28 bg-background border-t border-gold/30 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="eyebrow text-[0.55rem] sm:text-xs">Sarafa Market · New Seelampur · Delhi</span>
            <h2 className="mt-3 font-display text-2xl sm:text-5xl leading-tight font-bold text-foreground">
              Visit Our Flagship <span className="italic shimmer-text">Showroom</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-light leading-relaxed text-muted-foreground">
              Experience certified solitaire diamonds, Kundan bridal sets, gold bangles, and bespoke jewellery in person at our showroom in Sarafa Market.
            </p>
            <div className="rule-gold mx-auto mt-6 w-32" />
          </div>
        </Reveal>

        {/* SHOWROOM LOCATION CARD */}
        <Reveal delay={100}>
          <div className="mb-14 rounded-xl bg-onyx/90 border border-gold/50 p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-500 hover:border-gold hover:shadow-[0_0_60px_rgba(212,175,55,0.25)] max-w-3xl mx-auto text-center">
            <div className="space-y-6 flex flex-col items-center">
              <div>
                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold block mb-1">
                  Flagship Store Location
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-foreground leading-snug">
                  A.P.P. Jewellers
                </h3>
                <p className="mt-2 text-xs sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                  Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Seelampur, Seelampur, New Delhi, Delhi 110053
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-gold/20 py-4 w-full max-w-lg">
                <div>
                  <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider text-gold font-semibold block">
                    Showroom Hours
                  </span>
                  <p className="text-xs sm:text-sm text-foreground font-bold mt-0.5">
                    11:00 AM – 8:30 PM
                  </p>
                  <span className="text-[0.55rem] text-[#C49324] font-medium block">
                    Open All 7 Days
                  </span>
                </div>
                <div>
                  <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider text-gold font-semibold block">
                    Direct Phone Desk
                  </span>
                  <a href="tel:09015155615" className="text-xs sm:text-sm text-foreground font-bold mt-0.5 block hover:text-gold transition-colors">
                    090151 55615
                  </a>
                  <span className="text-[0.55rem] text-muted-foreground font-medium block">
                    Call for Valet & Appointments
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=Shop+No.+D-155,+Sarafa+Market,+New+Seelampur+Phase+II,+New+Seelampur,+Seelampur,+New+Delhi,+Delhi,+110053"
                  target="_blank"
                  rel="noreferrer"
                  className="shine-sweep inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-8 py-3.5 text-xs uppercase tracking-[0.24em] text-black font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <span>📍 Get Google Maps Directions</span>
                </a>
                <a
                  href="tel:09015155615"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b8860b] bg-[#fcfaf2] hover:bg-[#121212] hover:text-white hover:border-[#121212] px-8 py-3.5 text-xs uppercase tracking-[0.24em] text-[#121212] font-bold transition-all shadow-xs active:scale-95"
                >
                  <PhoneIcon className="size-3.5 text-[#b8860b]" />
                  <span>Call Store Desk</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="grid grid-cols-3 gap-2 sm:gap-8 items-stretch">
            <div className="glass-panel rounded-md p-2.5 sm:p-8 border-gold/30 flex flex-col justify-between h-full hover:border-gold transition-colors">
              <div>
                <span className="text-gold font-display text-xs sm:text-2xl font-bold">01</span>
                <h3 className="mt-1 sm:mt-3 font-display text-[0.68rem] sm:text-xl text-foreground font-semibold leading-tight">
                  100% BIS Hallmarked
                </h3>
                <p className="mt-1 sm:mt-2 text-[0.52rem] sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Certified BIS hallmarked gold purity on every piece.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-md p-2.5 sm:p-8 border-gold/30 flex flex-col justify-between h-full hover:border-gold transition-colors">
              <div>
                <span className="text-gold font-display text-xs sm:text-2xl font-bold">02</span>
                <h3 className="mt-1 sm:mt-3 font-display text-[0.68rem] sm:text-xl text-foreground font-semibold leading-tight">
                  Certified Solitaires
                </h3>
                <p className="mt-1 sm:mt-2 text-[0.52rem] sm:text-sm text-muted-foreground font-light leading-relaxed">
                  GIA & IGI certified natural diamonds cut for brilliance.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-md p-2.5 sm:p-8 border-gold/30 flex flex-col justify-between h-full hover:border-gold transition-colors">
              <div>
                <span className="text-gold font-display text-xs sm:text-2xl font-bold">03</span>
                <h3 className="mt-1 sm:mt-3 font-display text-[0.68rem] sm:text-xl text-foreground font-semibold leading-tight">
                  Bespoke Bridal Design
                </h3>
                <p className="mt-1 sm:mt-2 text-[0.52rem] sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Personalized Kundan, Meenakari, and temple suites.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Appointment() {
  return (
    <section id="appointment" className="px-3 sm:px-6 py-16 sm:py-24 bg-gradient-to-r from-[#ffffff] via-[#f9f9fa] to-[#ffffff] border-y border-gold/30 shadow-sm">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div>
            <span className="eyebrow text-[0.55rem] sm:text-xs">Private Showroom Experience</span>
            <h2 className="mt-3 font-display text-2xl sm:text-5xl leading-tight font-bold text-foreground">
              Sit with the pieces, <span className="italic shimmer-text">privately</span>
            </h2>
            <p className="mt-4 text-xs sm:text-base font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Schedule a dedicated private consultation at our Sarafa Market salon or a live video session with our master gemmologist.
            </p>
            <div className="rule-gold mx-auto mt-6 w-32" />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/appointment"
              className="shine-sweep inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.28em] text-black font-extrabold shadow-[0_12px_40px_rgba(184,134,11,0.45)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book Store Visit</span>
              <span className="text-sm">→</span>
            </Link>
            <a
              href="tel:09015155615"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#b8860b]/60 bg-[#fcfaf2] hover:bg-[#121212] hover:text-white hover:border-[#121212] px-9 py-4 text-xs sm:text-sm uppercase tracking-[0.26em] text-[#121212] font-bold transition-all shadow-md active:scale-95"
            >
              <Phone className="size-3.5 text-[#b8860b]" />
              <span>Call Showroom Directly</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReelCard({
  reel,
  index,
}: {
  reel: {
    id: string;
    title: string;
    url: string;
    caption: string;
    views: string;
    likes: string;
  };
  index: number;
}) {
  return (
    <Reveal delay={index * 120}>
      <div className="w-[300px] sm:w-[360px] shrink-0 snap-center group relative bg-[#0e0204] border border-gold/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-col justify-between">
        
        {/* Top Meta Instagram Profile Header */}
        <div className="p-3 bg-gradient-to-r from-onyx via-[#1a0406] to-onyx border-b border-gold/20 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Meta Story Ring */}
            <div className="size-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] shrink-0 animate-pulse">
              <div className="size-full rounded-full bg-onyx flex items-center justify-center text-[0.5rem] font-bold text-amber-200">
                APP
              </div>
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-[0.68rem] text-white font-bold tracking-wider truncate">
                  appjewellers
                </p>
                {/* Meta Verified Badge Icon */}
                <svg className="size-3 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-3.8-3.8 1.4-1.4 2.4 2.4 6-6 1.4 1.4-7.4 7.4z"/>
                </svg>
              </div>
              <p className="text-[0.55rem] text-gold/80 truncate font-medium">Sarafa Market, Delhi · Original Reel</p>
            </div>
          </div>

          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[0.58rem] uppercase tracking-wider text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-3 py-1 rounded-full font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-1"
          >
            <span>Watch</span> <span>↗</span>
          </a>
        </div>

        {/* 9:16 Video Canvas / Iframe */}
        <div className="relative w-full h-[460px] sm:h-[500px] bg-black overflow-hidden">
          <iframe
            src={`https://www.instagram.com/reel/${reel.id}/embed/`}
            title={reel.title}
            className="w-full h-full border-0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>

        {/* Bottom Metadata & Social Proof Bar */}
        <div className="p-3.5 bg-gradient-to-b from-[#180306] to-[#0d0103] border-t border-gold/25 text-left space-y-2">
          <div className="flex items-center justify-between text-[0.62rem] text-gold/90 font-medium">
            <span className="flex items-center gap-1">
              <svg className="size-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <strong>{reel.views}</strong>
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              <svg className="size-3.5 fill-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {reel.likes}
            </span>
          </div>

          <p className="text-xs font-bold text-amber-100 leading-snug line-clamp-1">
            {reel.title}
          </p>
          <p className="text-[0.62rem] text-muted-foreground font-light line-clamp-2 leading-relaxed">
            {reel.caption}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function InstaReels() {
  return (
    <section id="instagram-reels" className="relative px-4 sm:px-6 py-16 sm:py-24 bg-background border-y border-gold/30 shadow-sm overflow-hidden text-center">
      {/* Ambient Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center justify-center text-center">
            {/* Instagram Profile Avatar Badge */}
            <div className="relative mb-4">
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-xl">
                <img
                  src={logoImg}
                  alt="@appjewellers Instagram"
                  className="size-16 sm:size-20 rounded-full object-cover bg-white p-1 border-2 border-white"
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-white text-[0.6rem] shadow">
                ✓
              </span>
            </div>

            <p className="text-[0.62rem] uppercase tracking-[0.35em] text-gold font-bold mb-2">
              Official Instagram Feed
            </p>
            <h2 className="font-display text-2xl sm:text-5xl font-bold text-foreground leading-tight">
              Follow <span className="italic shimmer-text">@appjewellers</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-light text-muted-foreground max-w-lg leading-relaxed">
              Stay updated with daily gold rate announcements, real bridal customer reveals, Kundan craftsmanship videos, and exclusive new arrivals directly from Sarafa Market.
            </p>

            <div className="rule-gold mx-auto my-6 w-32" />

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="shine-sweep inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 sm:px-12 py-3.5 sm:py-4 text-xs uppercase tracking-[0.32em] text-white font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-rose-900/50"
            >
              <span>Follow @appjewellers on Instagram</span>
              <span>→</span>
            </a>
            <p className="mt-3 text-[0.58rem] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Join 50,000+ Patrons & Jewellery Lovers
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Intricate Indian Royal Rangoli / Mandala Watermark SVG ────────── */
function RangoliMandala({ className = "size-72" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" fill="none" stroke="#C49324" strokeWidth="0.85" className={className}>
      <circle cx="150" cy="150" r="140" strokeDasharray="3 4" opacity="0.35" />
      <circle cx="150" cy="150" r="120" opacity="0.45" />
      <circle cx="150" cy="150" r="90" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="150" cy="150" r="60" opacity="0.6" />
      <circle cx="150" cy="150" r="30" opacity="0.75" />
      <circle cx="150" cy="150" r="8" fill="#C49324" fillOpacity="0.25" />
      {/* 16-Fold Sacred Geometry Rangoli Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const deg = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${deg} 150 150)`}>
            {/* Outer Petal */}
            <path d="M150 15 C175 60 190 100 150 135 C110 100 125 60 150 15Z" opacity="0.55" />
            {/* Inner Petal */}
            <path d="M150 45 C168 80 178 110 150 135 C122 110 132 80 150 45Z" opacity="0.45" />
            {/* Center Flame */}
            <path d="M150 80 C160 105 165 125 150 140 C135 125 140 105 150 80Z" opacity="0.6" fill="#C49324" fillOpacity="0.05" />
            {/* Decorative Tips */}
            <circle cx="150" cy="22" r="2.5" fill="#C49324" opacity="0.8" />
            <circle cx="150" cy="5" r="1.5" fill="#C49324" opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#180205] via-[#120103] to-[#0a0002] text-left relative overflow-hidden text-white pt-14 sm:pt-20 pb-10 px-4 sm:px-8">
      {/* ── TOP LUXURY GOLD BORDER WITH GLOWING DIAMOND FLARE ── */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C49324] to-transparent shadow-[0_0_15px_rgba(196,147,36,0.8)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        <div className="size-3.5 rotate-45 bg-[#C49324] border border-[#FFF8D6] shadow-[0_0_18px_#FFD700] ring-2 ring-[#C49324]/50" />
      </div>

      {/* ── BOTTOM LUXURY GOLD BORDER WITH GLOWING DIAMOND FLARE ── */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C49324] to-transparent shadow-[0_0_15px_rgba(196,147,36,0.8)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex items-center justify-center">
        <div className="size-3.5 rotate-45 bg-[#C49324] border border-[#FFF8D6] shadow-[0_0_18px_#FFD700] ring-2 ring-[#C49324]/50" />
      </div>

      {/* ── TOP-LEFT & BOTTOM-RIGHT RANGOLI MANDALAS ── */}
      <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 pointer-events-none opacity-30 select-none">
        <RangoliMandala className="size-72 sm:size-96 animate-pulse [animation-duration:8s]" />
      </div>
      <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 pointer-events-none opacity-30 select-none">
        <RangoliMandala className="size-72 sm:size-96 animate-pulse [animation-duration:8s]" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 size-96 bg-rose-950/25 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 size-96 bg-rose-950/25 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── MAIN 4-COLUMN FOOTER GRID (Horizontal on Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 pb-12">
          {/* ── COLUMN 1: BRAND IDENTITY & HORIZONTAL ACTION BUTTONS ── */}
          <div className="relative space-y-4 text-center sm:text-left lg:pr-8 flex flex-col items-center sm:items-start">
            {/* Vertical Golden Divider */}
            <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#C49324]/35 to-transparent" />

            <Link to="/" className="inline-block">
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]"
              />
            </Link>

            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C49324] font-medium">
              PURITY · ARTISTRY · HERITAGE
            </p>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Timeless jewellery crafted with purity, artistry and a heritage you can trust.
            </p>

            {/* 3 Action Buttons (Horizontal Row on Mobile) */}
            <div className="pt-2 flex flex-row items-center justify-center sm:justify-start gap-2 w-full max-w-md lg:max-w-xs">
              <a
                href="tel:09015155615"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-[#C49324]/50 bg-[#1e070a]/80 hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#aa771c] hover:text-black py-2.5 px-3 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-[#e5be59] font-extrabold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <Phone className="size-3 text-current shrink-0" />
                <span>CALL</span>
              </a>

              <a
                href="https://wa.me/919015155615"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-[#25D366]/60 bg-[#25D366]/15 hover:bg-[#25D366] hover:text-black py-2.5 px-3 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-emerald-300 font-extrabold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <WhatsAppIcon className="size-3 text-current shrink-0" />
                <span>CHAT</span>
              </a>

              <a
                href="https://maps.google.com/?q=Shop+No.+D-155,+Sarafa+Market,+New+Seelampur+Phase+II,+New+Seelampur,+Seelampur,+New+Delhi,+Delhi,+110053"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#FAF8F5] hover:bg-white py-2.5 px-3 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-[#121212] font-extrabold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span className="text-rose-600 font-bold text-xs">📍</span>
                <span>MAP</span>
              </a>
            </div>
          </div>

          {/* ── 2-COLUMN HORIZONTAL GRID FOR COLLECTIONS & WHY CHOOSE US ON MOBILE ── */}
          <div className="grid grid-cols-2 lg:contents gap-6 sm:gap-8">
            {/* ── COLUMN 2: COLLECTIONS ── */}
            <div className="relative space-y-4 text-left lg:px-6">
              {/* Vertical Golden Divider */}
              <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#C49324]/35 to-transparent" />

              <div>
                <h4 className="font-display text-xs sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C49324] font-bold">
                  COLLECTIONS
                </h4>
                <div className="mt-1.5 flex items-center gap-1">
                  <div className="h-[1px] w-6 sm:w-8 bg-[#C49324]/50" />
                  <div className="size-1 rotate-45 bg-[#C49324]" />
                  <div className="h-[1px] w-10 sm:w-16 bg-[#C49324]/30" />
                </div>
              </div>

              <ul className="space-y-2.5 sm:space-y-3.5 text-[0.7rem] sm:text-xs text-zinc-300 font-light pt-1 sm:pt-2">
                <li>
                  <Link
                    to="/collections"
                    search={{ category: "Solitaires" }}
                    className="flex items-center justify-between group hover:text-[#C49324] transition-colors py-0.5"
                  >
                    <span>Solitaires</span>
                    <ChevronRight className="size-3 text-zinc-500 group-hover:text-[#C49324] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections"
                    search={{ category: "Bridal & Temple" }}
                    className="flex items-center justify-between group hover:text-[#C49324] transition-colors py-0.5"
                  >
                    <span>Bridal Sets</span>
                    <ChevronRight className="size-3 text-zinc-500 group-hover:text-[#C49324] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections"
                    search={{ category: "Bangles & Bracelets" }}
                    className="flex items-center justify-between group hover:text-[#C49324] transition-colors py-0.5"
                  >
                    <span>Gold Bangles</span>
                    <ChevronRight className="size-3 text-zinc-500 group-hover:text-[#C49324] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections"
                    search={{ category: "Bridal & Temple" }}
                    className="flex items-center justify-between group hover:text-[#C49324] transition-colors py-0.5"
                  >
                    <span>Temple Haram</span>
                    <ChevronRight className="size-3 text-zinc-500 group-hover:text-[#C49324] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/scheme"
                    className="flex items-center justify-between group text-amber-200/90 font-medium hover:text-[#C49324] transition-colors py-0.5"
                  >
                    <span>SwarnaNidhi</span>
                    <ChevronRight className="size-3 text-[#C49324] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── COLUMN 3: WHY CHOOSE US ── */}
            <div className="relative space-y-4 text-left lg:px-6">
              {/* Vertical Golden Divider */}
              <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#C49324]/35 to-transparent" />

              <div>
                <h4 className="font-display text-xs sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C49324] font-bold">
                  WHY CHOOSE US
                </h4>
                <div className="mt-1.5 flex items-center gap-1">
                  <div className="h-[1px] w-6 sm:w-8 bg-[#C49324]/50" />
                  <div className="size-1 rotate-45 bg-[#C49324]" />
                  <div className="h-[1px] w-10 sm:w-16 bg-[#C49324]/30" />
                </div>
              </div>

              <ul className="space-y-2.5 sm:space-y-4 text-[0.7rem] sm:text-xs text-zinc-300 font-light pt-1 sm:pt-2">
                <li className="flex items-center gap-2 sm:gap-3">
                  <Gem className="size-3.5 sm:size-4 text-[#C49324] shrink-0" />
                  <span>100% Hallmarked</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Award className="size-3.5 sm:size-4 text-[#C49324] shrink-0" />
                  <span>GIA / IGI Certified</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <RefreshCw className="size-3.5 sm:size-4 text-[#C49324] shrink-0" />
                  <span>Lifetime Exchange</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <ShieldCheck className="size-3.5 sm:size-4 text-[#C49324] shrink-0" />
                  <span>Insured Transit</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ── COLUMN 4: SHOWROOM ── */}
          <div className="space-y-4 text-left lg:pl-6">
            <div>
              <h4 className="font-display text-sm sm:text-base uppercase tracking-[0.25em] text-[#C49324] font-bold">
                SHOWROOM
              </h4>
              <div className="mt-1.5 flex items-center gap-1">
                <div className="h-[1px] w-8 bg-[#C49324]/50" />
                <div className="size-1 rotate-45 bg-[#C49324]" />
                <div className="h-[1px] w-16 bg-[#C49324]/30" />
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-zinc-300 font-light pt-2 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#C49324] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">A.P.P. Jewellers</p>
                  <p className="text-zinc-400 mt-0.5">
                    Shop No. D-155, Sarafa Market, New Seelampur Phase II, Delhi 110053
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="size-4 text-[#C49324] shrink-0" />
                <p>
                  <span className="text-[#C49324] font-bold">Open Daily:</span> 11:00 AM – 8:30 PM
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#C49324] shrink-0" />
                <a href="tel:09015155615" className="hover:text-[#C49324] transition-colors font-medium">
                  090151 55615
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM COPYRIGHT & TRUST BADGES BAR (Responsive Stack on Mobile) ── */}
        <div className="pt-8 border-t border-[#C49324]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-center lg:text-left text-[0.68rem] text-zinc-400 font-light order-3 lg:order-1">
            <p className="text-zinc-300 font-medium">© 2026 A.P.P. JEWELLERS</p>
            <p className="mt-0.5">All Rights Reserved.</p>
          </div>

          {/* Center: 3 Trust Marks (Grid on Mobile) */}
          <div className="grid grid-cols-3 sm:flex items-center gap-3 sm:gap-8 md:gap-10 text-[0.58rem] sm:text-[0.62rem] text-zinc-300 uppercase tracking-wider sm:tracking-widest font-medium order-1 lg:order-2 w-full sm:w-auto justify-center text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5">
              <div className="size-6 rounded-full bg-[#C49324]/15 border border-[#C49324]/40 flex items-center justify-center text-[#C49324] shrink-0">
                <Award className="size-3.5" />
              </div>
              <div>
                <span className="block text-[0.52rem] sm:text-[0.55rem] text-[#C49324] font-bold">BIS 916</span>
                <span className="text-[0.5rem] sm:text-[0.62rem]">HALLMARK</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5">
              <div className="size-6 rounded-full bg-[#C49324]/15 border border-[#C49324]/40 flex items-center justify-center text-[#C49324] shrink-0">
                <Gem className="size-3.5" />
              </div>
              <div>
                <span className="block text-[0.52rem] sm:text-[0.55rem] text-[#C49324] font-bold">GIA</span>
                <span className="text-[0.5rem] sm:text-[0.62rem]">CERTIFIED</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5">
              <div className="size-6 rounded-full bg-[#C49324]/15 border border-[#C49324]/40 flex items-center justify-center text-[#C49324] shrink-0">
                <Lock className="size-3.5" />
              </div>
              <div>
                <span className="block text-[0.52rem] sm:text-[0.55rem] text-[#C49324] font-bold">SECURE</span>
                <span className="text-[0.5rem] sm:text-[0.62rem]">PAYMENTS</span>
              </div>
            </div>
          </div>

          {/* Right: Social Outlines & Owner portal */}
          <div className="flex items-center justify-center gap-3 order-2 lg:order-3">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C49324] font-bold hidden sm:inline mr-1">
              FOLLOW US
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="size-8 rounded-full border border-[#C49324]/40 hover:border-[#C49324] hover:bg-[#C49324]/15 flex items-center justify-center text-[#C49324] transition-all active:scale-95"
            >
              <Instagram className="size-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="size-8 rounded-full border border-[#C49324]/40 hover:border-[#C49324] hover:bg-[#C49324]/15 flex items-center justify-center text-[#C49324] transition-all active:scale-95"
            >
              <Facebook className="size-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="size-8 rounded-full border border-[#C49324]/40 hover:border-[#C49324] hover:bg-[#C49324]/15 flex items-center justify-center text-[#C49324] transition-all active:scale-95"
            >
              <Youtube className="size-3.5" />
            </a>
            <a
              href="https://wa.me/919015155615"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="size-8 rounded-full border border-[#C49324]/40 hover:border-[#C49324] hover:bg-[#C49324]/15 flex items-center justify-center text-[#C49324] transition-all active:scale-95"
            >
              <WhatsAppIcon className="size-3.5" />
            </a>
            <a
              href="/admin"
              title="Portal"
              className="text-[0.65rem] opacity-30 hover:opacity-100 transition-opacity text-[#C49324] ml-1"
            >
              🔒
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
