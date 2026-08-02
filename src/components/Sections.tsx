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

export function Collections() {
  const exclusiveItems = PRODUCTS.filter((p) => p.isExclusive);

  return (
    <section id="collections" className="relative px-3 sm:px-6 py-14 sm:py-32 bg-gradient-to-r from-[#4a0810] via-[#210406] to-[#4a0810] border-y border-gold/40 shadow-2xl">
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
    <section className="relative px-6 py-24 bg-onyx border-y border-border/60">
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
    <section id="signature" className="relative overflow-hidden bg-gradient-to-r from-[#210406] via-[#3b080c] to-[#210406] py-12 sm:py-24 border-y border-gold/40 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* FEATURED IMAGE ON LEFT */}
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-gold/40 shadow-2xl h-72 sm:h-[420px]">
              <img
                src={bridalImg}
                alt="Chandra ruby and diamond bridal necklace in 22K gold"
                loading="lazy"
                className="size-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* DETAILS ON RIGHT */}
          <Reveal delay={150}>
            <div className="text-left">
              <p className="eyebrow text-[0.55rem] sm:text-xs">Piece No. 001 — Signature</p>
              <h2 className="mt-2 sm:mt-4 font-display text-2xl sm:text-5xl leading-tight font-bold text-amber-200">
                The <span className="italic shimmer-text">Chandra</span> Suite
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-base font-light leading-relaxed text-muted-foreground">
                A crescent of Burmese rubies framed by 412 brilliant-cut diamonds. Certified 22K gold hallmarked purity with lifetime polish guarantee.
              </p>

              <dl className="mt-4 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-6 border-t border-gold/30 pt-4">
                {SIGNATURE_SPECS.map(([k, v]) => (
                  <div key={k} className="border-b border-gold/20 pb-2">
                    <dt className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-wider text-gold font-medium">
                      {k}
                    </dt>
                    <dd className="mt-0.5 font-display text-xs sm:text-lg text-white font-semibold truncate">{v}</dd>
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
    <section id="maison" className="relative overflow-hidden bg-gradient-to-r from-[#3b080c] via-[#210406] to-[#3b080c] py-12 sm:py-24 border-y border-gold/40 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* ARTISTRY IMAGE ON LEFT */}
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-gold/40 shadow-2xl h-72 sm:h-[420px]">
              <img
                src={craftImg}
                alt="Master Karigar melting raw gold in crucible and finalizing handcrafted jewellery"
                loading="lazy"
                className="size-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* ARTISTRY DETAILS ON RIGHT */}
          <Reveal delay={150}>
            <div className="text-left">
              <span className="eyebrow text-[0.55rem] sm:text-xs">A.P.P. Karigar</span>
              <h2 className="mt-2 sm:mt-4 font-display text-2xl sm:text-5xl text-amber-100 font-bold leading-tight">
                Generations of Mastery & Pure Artistry
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-base font-light leading-relaxed text-muted-foreground">
                From hand-drawn sketches to micro-pavé stone setting, every ornament is handcrafted at our Sarafa Market workshop. 100% BIS hallmarked gold & certified diamonds guaranteed.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-6">
                <Link
                  to="/appointment"
                  className="shine-sweep rounded-sm bg-gold px-4 sm:px-8 py-2.5 sm:py-4 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-primary-foreground font-bold"
                >
                  Book Store Visit
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-16 border-t border-gold/30 pt-8 sm:pt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {TRUST.map(([k, v], i) => (
              <Reveal key={v} delay={i * 100}>
                <div className="text-center p-3 rounded-lg bg-onyx/60 border border-gold/30">
                  <p className="font-display text-xl sm:text-3xl text-gold font-bold">{k}</p>
                  <p className="mt-1 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-muted-foreground font-medium">
                    {v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
                  className="flex-1 rounded-sm border border-emerald-500/60 bg-transparent px-6 py-3.5 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-400 font-semibold text-center transition-colors hover:bg-emerald-500/10 hover:border-emerald-400 min-w-[140px]"
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
  };
  index: number;
}) {
  return (
    <Reveal delay={index * 150}>
      <div className="w-[280px] sm:w-[340px] shrink-0 snap-center group relative bg-[#140305] border border-gold/40 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold">
        {/* Top Instagram Profile Header */}
        <div className="p-3 bg-onyx border-b border-gold/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] shrink-0">
              <div className="size-full rounded-full bg-onyx flex items-center justify-center text-[0.45rem] font-bold text-gold">
                APP
              </div>
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[0.62rem] text-gold font-bold tracking-wider leading-none truncate">
                @appjewellers ☑
              </p>
              <p className="text-[0.52rem] text-muted-foreground truncate">Sarafa Market, New Delhi</p>
            </div>
          </div>
          <a
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[0.55rem] uppercase tracking-widest text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-2.5 py-1 rounded font-bold hover:opacity-90 transition-opacity"
          >
            Watch ↗
          </a>
        </div>

        {/* Official Live Instagram Reel Embed Frame */}
        <div className="relative w-full h-[440px] sm:h-[480px] bg-black">
          <iframe
            src={`https://www.instagram.com/reel/${reel.id}/embed/`}
            title={reel.title}
            className="w-full h-full border-0 rounded-b-none"
            scrolling="no"
            allowTransparency
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>

        {/* Reel Title Footer */}
        <div className="p-3 bg-[#1a0406] border-t border-gold/30 text-left">
          <p className="text-xs font-bold text-amber-200 line-clamp-1">
            {reel.title}
          </p>
          <p className="mt-1 text-[0.62rem] text-muted-foreground font-light line-clamp-1">
            {reel.caption}
          </p>
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
    },
    {
      id: "DaiDDMbzAMf",
      title: "22K Antique Gold Haram & Kasu Mala Craftsmanship",
      url: "https://www.instagram.com/reel/DaiDDMbzAMf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Sculpting Goddess Lakshmi temple motifs in pure 22K BIS Hallmarked gold.",
      views: "62.9K views",
      likes: "8.1K likes",
    },
    {
      id: "DaSKnYpzgg_",
      title: "Solitaire Diamond & Kundan Jewellery Showcase",
      url: "https://www.instagram.com/reel/DaSKnYpzgg_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      caption: "Exquisite craftsmanship live from our Sarafa Market, New Seelampur showroom.",
      views: "94.1K views",
      likes: "12.3K likes",
    },
  ];

  return (
    <section id="instagram-reels" className="relative px-3 sm:px-6 py-14 sm:py-28 bg-onyx border-y border-border/60 shadow-xl">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHead
            eyebrow="Live Store Videos"
            title="See How Our Gold & Kundan Jewellery is Made"
            copy="Swipe or scroll horizontally to watch real live Instagram Reels of Kundan setting, gold polishing, and bridal reveals directly from our Sarafa Market shop."
          />
        </Reveal>

        {/* Horizontal Scrollable Carousel for Reels */}
        <div className="mt-8 sm:mt-16 flex overflow-x-auto no-scrollbar gap-4 sm:gap-8 pb-4 snap-x">
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 sm:mt-16 text-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="shine-sweep inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 sm:px-10 py-3.5 sm:py-4 text-xs uppercase tracking-[0.32em] text-white font-bold shadow-2xl transition-transform hover:scale-105"
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
              className="inline-flex items-center gap-2 rounded bg-transparent border border-emerald-500/60 px-4 py-2 text-[0.62rem] uppercase tracking-widest text-emerald-400 font-bold hover:bg-emerald-500/10 hover:border-emerald-400 transition-colors shadow"
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
