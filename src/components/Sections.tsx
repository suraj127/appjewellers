import { useState, useRef } from "react";
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
    meta: "22K · Kundan · Ruby",
    img: bridalImg,
    slug: "chandra-suite",
    copy: "Ceremonial suites, hand-set over four hundred hours.",
  },
  {
    name: "Bangles & Cuffs",
    meta: "22K · Pavé diamond",
    img: banglesImg,
    slug: "meridian-cuff",
    copy: "Sculpted forms that hold the wrist without weight.",
  },
];

const SIGNATURE_SPECS = [
  ["Metal", "22K yellow gold"],
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

export function Collections() {
  const exclusiveItems = PRODUCTS.filter((p) => p.isExclusive);

  return (
    <section id="collections" className="relative px-3 sm:px-6 py-14 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Special Gold & Diamond Collection"
            title="Handcrafted Jewellery for Every Celebration"
            copy="Explore pure 22K BIS hallmarked gold, real certified diamonds, traditional Kundan sets, and dailywear jewellery crafted at A.P.P. Jewellers."
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
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="absolute inset-0 size-full object-cover transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-0"
                  style={{ transitionTimingFunction: "var(--ease-luxe)" }}
                />
                {item.hoverImage && (
                  <img
                    src={item.hoverImage}
                    alt={`${item.name} alternate view`}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="absolute inset-0 size-full object-cover opacity-0 transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-100"
                    style={{ transitionTimingFunction: "var(--ease-luxe)" }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 text-center">
                  <p className="text-[0.52rem] sm:text-[0.6rem] uppercase tracking-[0.2em] sm:tracking-[0.34em] text-gold font-medium truncate">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-sm sm:text-2xl font-semibold text-amber-100 leading-tight line-clamp-1">
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
    <section className="relative px-6 py-24 bg-gradient-to-r from-[#3b080c] via-[#210406] to-onyx border-y border-gold/40">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-left">
          <span className="eyebrow">A.P.P. Gold Purchase Plan</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-amber-200">
            SwarnaNidhi <span className="italic shimmer-text">Gold Savings Scheme</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed">
            Pay 8 monthly installments and enjoy up to 100% store bonus & net customer profits up to ₹42,000! Calculate your returns with our interactive scheme calculator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
          <Link
            to="/scheme"
            className="shine-sweep rounded-sm bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground font-bold text-center hover:opacity-90 transition-opacity shadow-lg"
          >
            Calculate Scheme Earnings
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Signature() {
  return (
    <section id="signature" className="relative overflow-hidden bg-onyx px-6 py-32 sm:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 opacity-60"
              style={{ boxShadow: "var(--shadow-glow)" }}
            />
            <img
              src={bridalImg}
              alt="Chandra ruby and diamond bridal necklace in 22K gold"
              loading="lazy"
              width={900}
              height={1100}
              className="float-slow relative w-full rounded-sm object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div>
            <p className="eyebrow">Piece No. 001 — Signature</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.03]">
              The <span className="italic shimmer-text">Chandra</span> Suite
            </h2>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
              A crescent of Burmese rubies framed by 412 brilliant-cut diamonds.
              Rotate it, inspect each stone at microscopic zoom, and view it under
              daylight, showroom, warm or studio lighting.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {SIGNATURE_SPECS.map(([k, v]) => (
                <div key={k} className="border-b border-border/60 pb-3">
                  <dt className="text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/piece/$slug"
                params={{ slug: "chandra-suite" }}
                className="shine-sweep rounded-sm border border-gold/60 px-8 py-4 text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-colors duration-500 hover:bg-gold hover:text-primary-foreground"
              >
                Full specification
              </Link>
              <Link
                to="/appointment"
                search={{ piece: "The Chandra Suite" }}
                className="text-[0.65rem] uppercase tracking-[0.32em] text-foreground/80 underline-offset-8 transition-colors duration-500 hover:text-gold hover:underline"
              >
                Enquire privately
              </Link>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}



export function Maison() {
  return (
    <section id="maison" className="relative overflow-hidden">
      <div className="relative h-[34rem]">
        <img
          src={craftImg}
          alt="Master goldsmith setting stones by hand at A.P.P. Jewellers atelier bench"
          loading="lazy"
          width={1400}
          height={900}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <Reveal>
            <div className="max-w-2xl text-center">
              <p className="eyebrow">A.P.P. Jewellers Atelier</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]">
                Generations of Mastery & Pure Artistry
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
                From hand-drawn sketches to micro-pavé stone setting, every masterpiece is created under expert care at A.P.P. Jewellers. Each piece is hallmarked and certified before reaching your hands.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-y border-border/60 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(([k, v], i) => (
            <Reveal key={v} delay={i * 100}>
              <div className="text-center">
                <p className="font-display text-3xl text-gold">{k}</p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {v}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreLocation() {
  return (
    <section id="store-info" className="relative px-6 py-28 sm:py-36 bg-onyx/80 border-t border-gold/20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Visit Our Flagship Store"
            title="A.P.P. Jewellers — Sarafa Market"
            copy="Experience our complete collection of 22K BIS hallmarked gold, certified solitaires, Kundan bridal suites, and handcrafted ornaments in person."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 items-stretch">
          <Reveal>
            <div className="glass-panel rounded-sm p-8 sm:p-10 flex flex-col justify-between h-full border-gold/30">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={logoImg}
                    alt="A.P.P. Jewellers"
                    className="h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
                  />
                  <div>
                    <h3 className="font-display text-2xl tracking-wider text-gold font-semibold">A.P.P. JEWELLERS</h3>
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">Sarafa Market · New Seelampur</p>
                  </div>
                </div>

                <div className="space-y-6 text-sm font-light text-muted-foreground">
                  <div className="border-b border-border/60 pb-4">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-medium">Showroom Address</p>
                    <p className="mt-2 text-foreground font-normal leading-relaxed text-base">
                      Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Seelampur, Seelampur, New Delhi, Delhi, 110053
                    </p>
                  </div>

                  <div className="border-b border-border/60 pb-4">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-medium">Direct Telephone & Inquiries</p>
                    <a
                      href="tel:09015155615"
                      className="mt-2 inline-block font-display text-2xl text-gold hover:text-white transition-colors font-semibold"
                    >
                      📞 090151 55615
                    </a>
                  </div>

                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-medium">Showroom Hours</p>
                    <p className="mt-1 text-foreground">Monday – Sunday: 11:00 AM – 8:30 PM</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Walk-ins welcome & Private VIP appointments available</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="tel:09015155615"
                  className="shine-sweep flex-1 rounded-sm bg-gold px-6 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-primary-foreground font-semibold text-center transition-opacity hover:opacity-90 min-w-[140px]"
                >
                  📞 Call Store
                </a>
                <a
                  href="https://wa.me/919015155615"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-sm border border-emerald-500/60 bg-emerald-500/10 px-6 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-400 font-semibold text-center transition-colors hover:bg-emerald-500 hover:text-white min-w-[140px]"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=Shop+No.+D-155,+Sarafa+Market,+New+Seelampur+Phase+II,+New+Seelampur,+Seelampur,+New+Delhi,+Delhi,+110053"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-sm border border-border px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground text-center transition-colors hover:border-gold/60 hover:text-gold"
                >
                  📍 Open Directions on Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="glass-panel rounded-sm p-8 sm:p-10 flex flex-col justify-between h-full border-gold/30">
              <div>
                <p className="eyebrow">Our Guarantees</p>
                <h3 className="mt-4 font-display text-3xl">Purity, Authenticity & Trust</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                  At A.P.P. Jewellers, every piece of gold and diamond jewellery is crafted with unyielding dedication to purity, traditional artistry, and modern certification.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-gold font-display text-xl">01</span>
                    <div>
                      <h4 className="font-display text-lg text-foreground">100% BIS Hallmarked Gold</h4>
                      <p className="text-xs text-muted-foreground font-light">Certified 22K (916) and 18K gold hallmark purity on every piece.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-gold font-display text-xl">02</span>
                    <div>
                      <h4 className="font-display text-lg text-foreground">Certified Diamond Solitaires</h4>
                      <p className="text-xs text-muted-foreground font-light">GIA & IGI certified natural diamonds cut for exceptional light performance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-gold font-display text-xl">03</span>
                    <div>
                      <h4 className="font-display text-lg text-foreground">Bespoke Bridal & Custom Design</h4>
                      <p className="text-xs text-muted-foreground font-light">Personalized Kundan, Meenakari, and antique temple suites created to your exact vision.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-border/60 pt-6 text-center">
                <a
                  href="/appointment"
                  className="inline-block text-[0.65rem] uppercase tracking-[0.3em] text-gold underline-offset-8 transition-colors hover:underline font-medium"
                >
                  Schedule a VIP Private Consultation →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Appointment() {
  return (
    <section id="appointment" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Private Viewing</p>
            <h2 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.05]">
              Sit with the pieces, <span className="italic shimmer-text">privately</span>
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
              Book your private consultation at our showroom or a live video session with our master gemmologist.
            </p>
            <div className="rule-gold mx-auto mt-10 w-40" />
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14">
            <AppointmentForm />
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
    videoUrl?: string;
    poster: string;
  };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Reveal delay={index * 140}>
      <div
        className="group relative flex flex-col justify-between bg-[#140305] border border-gold/40 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video / Reel Viewport */}
        <div className="relative w-full aspect-[9/16] bg-black overflow-hidden cursor-pointer">
          {/* Cover Poster Image */}
          <img
            src={reel.poster}
            alt={reel.title}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Autoplay HTML5 Video on Hover */}
          <video
            ref={videoRef}
            src={reel.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-gold-ring-41559-large.mp4"}
            poster={reel.poster}
            loop
            muted={isMuted}
            playsInline
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />

          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 pointer-events-none" />

          {/* Top Reel Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-gold/40 shadow-lg">
              <span className={`size-2 rounded-full ${isHovered ? "bg-emerald-400 animate-ping" : "bg-gold"}`} />
              <span className="text-[0.58rem] uppercase tracking-widest text-amber-200 font-bold">
                {isHovered ? "PLAYING LIVE" : "HOVER TO AUTO-PLAY"}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="glass-panel p-2 rounded-full text-gold hover:text-white transition-colors"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>

          {/* Center Play Button Overlay (Fades out on hover) */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
              isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="size-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.6)]">
              <span className="text-gold text-2xl ml-1">▶</span>
            </div>
          </div>

          {/* Bottom Video Meta Overlay */}
          <div className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-4 z-10 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[0.48rem] sm:text-[0.55rem] font-bold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full">
                Reel
              </span>
              <span className="text-[0.55rem] sm:text-[0.62rem] text-gold font-semibold tracking-wider truncate">
                @appjewellers
              </span>
              <span className="text-amber-400 text-[0.65rem] sm:text-xs">☑</span>
            </div>
            <p className="font-display text-xs sm:text-lg text-white font-bold leading-snug drop-shadow-md line-clamp-1 sm:line-clamp-2">
              {reel.title}
            </p>
            <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-[0.55rem] sm:text-[0.6rem] text-amber-200/90 font-medium">
              <span>👁 {reel.views}</span>
              <span>❤️ {reel.likes}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="p-2 sm:p-4 bg-[#1a0406] border-t border-gold/30 flex items-center justify-between gap-2">
          <p className="text-[0.55rem] sm:text-[0.62rem] text-muted-foreground font-light line-clamp-1">
            {reel.caption}
          </p>
          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="shine-sweep shrink-0 rounded bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.52rem] sm:text-[0.6rem] uppercase tracking-widest text-white font-bold hover:opacity-90 transition-opacity"
          >
            Watch
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function InstaReels() {
  const reels = [
    {
      id: "DamjhYBzNMe",
      title: "Royal Kundan Choker & Pearl Bridal Reveal",
      url: "https://www.instagram.com/reel/DamjhYBzNMe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Behind the bench: Hand-setting Burmese rubies & natural Basra pearls at A.P.P. Jewellers salon.",
      views: "48.2K views",
      likes: "5.4K likes",
      poster: bridalImg,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-gold-ring-41559-large.mp4",
    },
    {
      id: "DaiDDMbzAMf",
      title: "22K Antique Gold Haram & Kasu Mala Craftsmanship",
      url: "https://www.instagram.com/reel/DaiDDMbzAMf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Sculpting Goddess Lakshmi temple motifs in pure 22K BIS Hallmarked gold.",
      views: "62.9K views",
      likes: "8.1K likes",
      poster: craftImg,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-diamond-ring-41558-large.mp4",
    },
    {
      id: "DaSKnYpzgg_",
      title: "Solitaire Diamond & Kundan Jewellery Showcase",
      url: "https://www.instagram.com/reel/DaSKnYpzgg_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Exquisite craftsmanship live from our Sarafa Market, New Seelampur showroom.",
      views: "94.1K views",
      likes: "12.3K likes",
      poster: ringsImg,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-macro-shot-of-a-diamond-ring-41560-large.mp4",
    },
  ];

  return (
    <section id="instagram-reels" className="relative px-6 py-28 bg-gradient-to-b from-onyx via-[#1a0406] to-onyx border-t border-gold/30">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Live Store Videos"
            title="See How Our Gold & Kundan Jewellery is Made"
            copy="Hover or tap any video below to watch real jewellery making, Kundan setting, and bridal reveals directly from our Sarafa Market shop."
          />
        </Reveal>

        <div className="mt-8 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-3">
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="shine-sweep inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-10 py-4 text-xs uppercase tracking-[0.32em] text-white font-bold shadow-2xl transition-transform hover:scale-105"
            >
              Follow Us on Instagram →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    ["Jewellery Types", ["Necklaces & Chains", "Rings & Bands", "Bangles & Kadas", "Bridal Sets", "Real Diamonds"]],
    ["Our Services", ["Custom Design Jewellery", "Monthly Gold Plan", "Book Store Visit", "Cleaning & Repair"]],
    ["About Our Shop", ["Sarafa Market Shop", "Gold Purity Guarantee", "Our Craftsmanship", "Contact Us"]],
  ] as const;

  return (
    <footer className="bg-onyx px-4 sm:px-6 pb-10 pt-12 sm:pt-20 border-t border-gold/30">
      <div className="mx-auto max-w-7xl">
        {/* CENTERED BRAND LOGO & ADDRESS IN FOOTER */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-16">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="h-16 sm:h-28 w-auto object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-3"
          />
          <p className="text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.25em] sm:tracking-[0.38em] text-gold font-medium max-w-xl px-2 leading-relaxed">
            Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Seelampur, Seelampur, New Delhi, Delhi, 110053
          </p>

          {/* Quick Mobile Contact Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:09015155615"
              className="shine-sweep inline-flex items-center gap-2 rounded bg-gold/10 border border-gold/60 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-colors shadow"
            >
              <PhoneIcon className="size-3.5" /> Call 090151 55615
            </a>
            <a
              href="https://wa.me/919015155615"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-emerald-950/60 border border-emerald-500/50 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-emerald-400 font-bold hover:bg-emerald-600 hover:text-white transition-colors shadow"
            >
              <WhatsAppIcon className="size-3.5" /> WhatsApp Inquiry
            </a>
          </div>
        </div>

        {/* 2-Column Grid on Mobile, 4-Column Grid on Desktop */}
        <div className="grid grid-cols-2 gap-6 sm:gap-12 md:grid-cols-4 text-left">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.32em] text-gold font-bold">
              A.P.P. Jewellers
            </p>
            <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
              Your trusted destination for 22K BIS Hallmarked gold, certified solitaires, and exquisite Kundan bridal suites in Sarafa Market, New Seelampur, New Delhi.
            </p>
          </div>

          {cols.map(([title, items]) => (
            <div key={title}>
              <p className="text-[0.58rem] sm:text-[0.6rem] uppercase tracking-[0.32em] text-gold font-bold">
                {title}
              </p>
              <ul className="mt-3 sm:mt-5 space-y-2 sm:space-y-3">
                {items.map((i) => (
                  <li key={i}>
                    <a
                      href="#top"
                      className="text-[0.7rem] sm:text-xs font-light text-muted-foreground transition-colors duration-300 hover:text-gold"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-gold mt-10 sm:mt-16" />
        <p className="mt-6 sm:mt-8 text-center text-[0.55rem] sm:text-[0.58rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground leading-relaxed px-2">
          © 2026 A.P.P. Jewellers · Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Delhi 110053 · Phone: 090151 55615 · BIS Hallmarked 22K Gold & Certified Diamonds
        </p>
      </div>
    </footer>
  );
}
