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
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.05]">{title}</h2>
      {copy ? (
        <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">{copy}</p>
      ) : null}
      <div className="rule-gold mx-auto mt-10 w-40" />
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

export function Collections() {
  const exclusiveItems = PRODUCTS.filter((p) => p.isExclusive);

  return (
    <section
      id="collections"
      className="relative px-3 sm:px-6 py-14 sm:py-32 bg-background border-y border-gold/30 shadow-sm overflow-hidden"
    >
      {/* Ambient Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Foreground content (unchanged) ───────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Special Gold & Diamond Collection"
            title="Handcrafted Jewellery for Every Celebration"
            copy="Explore pure BIS hallmarked gold, real certified diamonds, traditional Kundan sets, and dailywear jewellery crafted at A.P.P. Jewellers."
          />
        </Reveal>

        {/* Exclusive Items Grid - 2 cols on mobile */}
        <div className="mt-10 sm:mt-20 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
          {exclusiveItems.map((item, i) => (
            <Reveal key={item.slug} delay={i * 140}>
              <Link
                to="/piece/$slug"
                params={{ slug: item.slug }}
                className="lift shine-sweep group relative block h-[18rem] sm:h-[28rem] overflow-hidden rounded-sm border border-border/80 bg-onyx"
              >
                <ProductHoverImage
                  image={item.image}
                  hoverImage={item.hoverImage}
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-95 pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 text-center">
                  <p className="text-[0.52rem] sm:text-[0.6rem] uppercase tracking-[0.2em] sm:tracking-[0.34em] text-gold font-medium truncate">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-sm sm:text-2xl font-semibold text-foreground leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[0.65rem] sm:text-xs text-gold font-bold uppercase tracking-wider">
                    PRICE ON REQUEST
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center border-t border-border/60 pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Looking for specific categories like Chains, Jhumkas, Mangalsutra, Coins, or Rings?
            </p>
            <Link
              to="/collections"
              className="shine-sweep inline-block rounded-sm bg-gold px-10 py-4 text-xs uppercase tracking-[0.32em] text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-xl"
            >
              Browse Full Category Directory & Collections →
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
            className="shine-sweep rounded-sm bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground font-bold text-center hover:opacity-90 transition-opacity shadow-xl"
          >
            Calculate Scheme Earnings
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
                  className="shine-sweep rounded-sm bg-gold px-4 sm:px-8 py-2.5 sm:py-4 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-primary-foreground font-bold"
                >
                  Inspect Piece
                </Link>
                <Link
                  to="/appointment"
                  search={{ piece: "The Chandra Suite" }}
                  className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-gold underline font-semibold"
                >
                  Enquire Privately
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
                  <span className="text-[0.55rem] text-emerald-600 font-medium block">
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
                  className="shine-sweep flex items-center justify-center gap-2 rounded bg-gold px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground font-bold shadow-lg hover:opacity-95 transition-opacity"
                >
                  <span>📍 Get Google Maps Directions</span>
                </a>
                <a
                  href="tel:09015155615"
                  className="flex items-center justify-center gap-2 rounded border border-gold/60 bg-gold/10 px-6 py-3.5 text-xs uppercase tracking-widest text-gold font-semibold hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <PhoneIcon className="size-3.5" /> Call Store Desk
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
              className="shine-sweep rounded-sm bg-gold px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-[0.32em] text-primary-foreground font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              Book Store Visit →
            </Link>
            <a
              href="tel:09015155615"
              className="rounded-sm border border-gold/60 px-6 sm:px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-colors"
            >
              📞 Call Showroom Directly
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

export function Footer() {
  return (
    <footer className="bg-[#0a0203] px-4 sm:px-8 pb-8 pt-12 sm:pt-20 border-t border-gold/30 text-left relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* BRAND HEADER & STORE BADGE */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-gold/20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers Logo"
              className="h-16 sm:h-20 w-auto object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_20px_rgba(255,215,0,0.35)]"
            />
            <p className="mt-2 text-[0.62rem] sm:text-xs uppercase tracking-[0.3em] text-gold font-medium">
              Purity · Artistry · Heritage
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:09015155615"
              className="shine-sweep inline-flex items-center gap-2 rounded bg-gold/15 border border-gold/50 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-all shadow"
            >
              <PhoneIcon className="size-3.5" /> Call Store
            </a>
            <a
              href="https://wa.me/919015155615"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-emerald-500/10 border border-emerald-500/50 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all shadow"
            >
              <WhatsAppIcon className="size-3.5" /> WhatsApp Chat
            </a>
            <a
              href="https://maps.google.com/?q=Shop+No.+D-155,+Sarafa+Market,+New+Seelampur+Phase+II,+New+Seelampur,+Seelampur,+New+Delhi,+Delhi,+110053"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-onyx border border-border/70 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-muted-foreground hover:text-gold hover:border-gold/60 transition-all"
            >
              <span>📍 Directions</span>
            </a>
          </div>
        </div>

        {/* STREAMLINED 4-COLUMN FOOTER NAVIGATION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-left border-b border-gold/20">
          {/* Col 1: Collections */}
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold mb-4">
              Fine Collections
            </p>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-light">
              <li><Link to="/collections" className="hover:text-gold transition-colors">Solitaire Diamonds</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Kundan Bridal Sets</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Gold Bangles & Kadas</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Temple Jewellery & Haram</Link></li>
              <li><Link to="/scheme" className="hover:text-gold transition-colors">SwarnaNidhi Gold Scheme</Link></li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold mb-4">
              Showroom Services
            </p>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-light">
              <li><Link to="/appointment" className="hover:text-gold transition-colors">Book Private Consultation</Link></li>
              <li><Link to="/piece/$slug" params={{ slug: "lumiere-solitaire" }} className="hover:text-gold transition-colors">Virtual Try-On Experience</Link></li>
              <li><a href="#collections" className="hover:text-gold transition-colors">Live Gold & Silver Rates</a></li>
              <li><a href="#maison" className="hover:text-gold transition-colors">Bespoke Bench Craftsmanship</a></li>
            </ul>
          </div>

          {/* Col 3: Purity & Trust */}
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold mb-4">
              Purity & Trust
            </p>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-light">
              <li className="flex items-center gap-1.5 text-amber-200/90 font-medium"><span>✓</span> BIS 100% Hallmarked Gold</li>
              <li className="flex items-center gap-1.5 text-amber-200/90 font-medium"><span>✓</span> GIA & IGI Certified Solitaires</li>
              <li className="flex items-center gap-1.5 text-amber-200/90 font-medium"><span>✓</span> 100% Lifetime Exchange</li>
              <li className="flex items-center gap-1.5 text-amber-200/90 font-medium"><span>✓</span> Fully Insured Transit</li>
            </ul>
          </div>

          {/* Col 4: Showroom Info */}
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold font-bold mb-4">
              Showroom Location
            </p>
            <div className="space-y-2 text-xs text-muted-foreground font-light leading-relaxed">
              <p className="text-white font-medium">A.P.P. Jewellers</p>
              <p>Shop No. D-155, Sarafa Market, New Seelampur Phase II, Delhi 110053</p>
              <p className="text-gold/90 font-medium pt-1">Open Daily: 11:00 AM – 8:30 PM</p>
              <p className="text-muted-foreground">Phone: 090151 55615</p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.58rem] uppercase tracking-widest text-muted-foreground">
          <p>© 2026 A.P.P. Jewellers · All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gold/60">BIS 916 HALLMARK</span>
            <span>·</span>
            <span className="text-gold/60">GIA CERTIFIED</span>
            <a
              href="/admin"
              title="Owner Portal Login"
              className="text-[0.65rem] opacity-30 hover:opacity-100 transition-opacity text-gold ml-2"
            >
              🔒
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
