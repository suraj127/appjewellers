import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import logoImg from "@/assets/logo.png";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  purity: string;
  weight?: string;
  image: string;
  slug?: string;
  tag?: string;
}

// Exactly 4 items on the Left Column
const LEFT_4_ITEMS: ShowcaseItem[] = [
  {
    id: "l1",
    title: "Antique Lakshmi Temple Chandbalis",
    category: "Temple Jewelry",
    purity: "22K BIS 916",
    weight: "26.400 g",
    image: "/assets/items/antique_temple_earrings.jpg",
    slug: "antique-temple-earrings-104",
    tag: "Heritage Pick",
  },
  {
    id: "l2",
    title: "Maharani Royal Solitaire Diamond Haar",
    category: "Imperial Diamonds",
    purity: "18K Solitaire",
    weight: "112.500 g",
    image: "/assets/items/royal_diamond_haar_103.jpg",
    slug: "royal-diamond-haar-103",
    tag: "New Signature",
  },
  {
    id: "l3",
    title: "Meenakari Royal Kundan Choker",
    category: "Kundan Bridal",
    purity: "22K BIS 916",
    weight: "42.500 g",
    image: "/assets/items/kundan_choker_set_1785608015801.png",
    slug: "app-item-6-choker-set",
  },
  {
    id: "l4",
    title: "Imperial Diamond Solitaire Ring",
    category: "Diamond Solitaires",
    purity: "18K Solitaire",
    weight: "4.800 g",
    image: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    slug: "app-item-10-rings",
  },
];

// Exactly 4 items on the Right Column
const RIGHT_4_ITEMS: ShowcaseItem[] = [
  {
    id: "r1",
    title: "Peacock Royal Antique Filigree Kada",
    category: "Heritage Bangles",
    purity: "22K BIS 916",
    weight: "38.200 g",
    image: "/assets/items/antique_temple_kada.jpg",
    slug: "antique-temple-kada-105",
    tag: "Royal Nakshi",
  },
  {
    id: "r2",
    title: "Imperial Diamond Cluster Suite",
    category: "Fine Diamonds",
    purity: "18K Diamond",
    weight: "22.600 g",
    image: "/assets/items/diamond_cluster_necklace_102.png",
    slug: "app-item-2-necklace",
  },
  {
    id: "r3",
    title: "Emerald & Polki Jadau Kada",
    category: "Heritage Bangles",
    purity: "22K Gold & Polki",
    weight: "24.800 g",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    slug: "app-item-3-bangles",
  },
  {
    id: "r4",
    title: "Traditional South Temple Haram",
    category: "Temple Jewelry",
    purity: "22K BIS 916",
    weight: "36.800 g",
    image: "/assets/items/temple_gold_haram_1785608046359.png",
    slug: "app-item-1-chain",
  },
];

// Replicated arrays for smooth infinite marquee
const LEFT_DRIFT = [...LEFT_4_ITEMS, ...LEFT_4_ITEMS, ...LEFT_4_ITEMS];
const RIGHT_DRIFT = [...RIGHT_4_ITEMS, ...RIGHT_4_ITEMS, ...RIGHT_4_ITEMS];

function ProductCard({ item }: { item: ShowcaseItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative group w-full bg-[#f8f1e7] rounded-2xl sm:rounded-[28px] border border-[#d8c3a5]/60 shadow-[0_8px_25px_rgba(78,54,36,0.12)] hover:shadow-[0_16px_40px_rgba(184,134,11,0.28)] hover:border-[#d4af37] transition-all duration-500 overflow-hidden flex flex-col p-2.5 sm:p-4 mb-3.5 sm:mb-6 select-none">
      {/* ── Subtle Mandala Ornamental Watermark Background (Matches user reference image) ── */}
      <div 
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.15] bg-center bg-no-repeat bg-contain transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `radial-gradient(circle at center, #9e7f6b 1.5px, transparent 1.5px), radial-gradient(circle at center, transparent 35%, rgba(184,134,11,0.2) 36%, transparent 37%), radial-gradient(circle at center, transparent 65%, rgba(184,134,11,0.15) 66%, transparent 67%)`,
          backgroundSize: '100% 100%, 80% 80%, 100% 100%',
        }}
      />

      {/* Top Bar: Purity Badge & Like Button */}
      <div className="relative z-10 flex items-center justify-between gap-1 mb-1">
        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[0.55rem] sm:text-[0.66rem] font-bold tracking-wider uppercase bg-[#b8860b]/15 text-[#6d4606] border border-[#b8860b]/30 backdrop-blur-xs">
          <ShieldCheck className="size-2 sm:size-2.5 text-[#b8860b]" />
          {item.purity}
        </span>

        {item.tag ? (
          <span className="text-[0.5rem] sm:text-[0.6rem] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-[#fff]/80 text-[#8b5a00] border border-[#d4af37]/40 shadow-2xs">
            {item.tag}
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Save to favourites"
            className="p-0.5 sm:p-1 rounded-full hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              className={`size-3.5 sm:size-4 transition-colors ${
                liked
                  ? "fill-[#b91c1c] text-[#b91c1c]"
                  : "text-zinc-400 hover:text-[#b8860b]"
              }`}
            />
          </button>
        )}
      </div>

      {/* Main Image Display with soft drop shadow */}
      <Link
        to="/piece/$slug"
        params={{ slug: item.slug || "royal-diamond-haar-103" }}
        className="relative aspect-[3.6/4.3] w-full rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-1.5 sm:p-3 my-0.5 sm:my-1 group-hover:brightness-105 transition-all"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out group-hover:scale-106 group-hover:-translate-y-1"
        />
        {/* Soft Radial Sheen */}
        <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Footer Info */}
      <div className="relative z-10 mt-1.5 pt-1.5 flex items-center justify-between border-t border-[#d8c3a5]/60 gap-1">
        <div className="flex flex-col text-left min-w-0">
          <span className="text-[0.65rem] sm:text-[0.8rem] font-bold tracking-wide text-zinc-900 font-sans truncate">
            {item.category}
          </span>
          <span className="text-[0.55rem] sm:text-[0.68rem] font-normal text-zinc-600 truncate max-w-[95px] sm:max-w-[150px]">
            {item.title}
          </span>
        </div>

        {item.weight && (
          <span className="text-[0.52rem] sm:text-[0.65rem] font-semibold text-[#8b5a00] tracking-wide font-mono bg-white/70 px-1.5 sm:px-2 py-0.5 rounded border border-[#d8c3a5]/40 shrink-0">
            {item.weight}
          </span>
        )}
      </div>
    </div>
  );
}

export function HeritageShowcaseSection() {
  return (
    <section
      id="heritage-showcase"
      className="relative overflow-hidden py-10 sm:py-20 select-none border-y border-[#c5a687]/40 shadow-inner"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #bca18e 0%, #a88a75 55%, #8f705b 100%)",
      }}
    >
      {/* Soft Ambient Vignette & Golden Glow */}
      <div 
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(255,235,200,0.35),transparent_70%)]" 
      />
      <div 
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:28px_28px]" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6">

        {/* ── DESKTOP & LARGE SCREENS: 3-COLUMN SIDE-BY-SIDE LAYOUT ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* LEFT COLUMN: 4 ITEMS */}
          <div className="lg:col-span-4">
            <div className="relative h-[660px] overflow-hidden rounded-3xl p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              <div className="flex flex-col animate-marquee-up hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {LEFT_DRIFT.map((item, idx) => (
                  <ProductCard key={`desktop-left-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER LOGO & BRAND IDENTITY (A.P.P. JEWELLERS) */}
          <div className="lg:col-span-4 text-center py-6 px-4 flex flex-col items-center justify-center">
            <Reveal>
              {/* Octagonal Monogram Monolith Icon (Glassmorphism + Double Gold Hairline) */}
              <div className="relative mx-auto mb-5 size-24 flex items-center justify-center group cursor-default">
                <div 
                  className="absolute inset-0 rounded-[24px] border border-white/60 bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                />
                <div 
                  className="absolute inset-1.5 rounded-[20px] border border-white/35 pointer-events-none"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                />
                <span className="relative z-10 font-serif text-2xl font-normal tracking-widest text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] select-none">
                  APP
                </span>
              </div>

              {/* Brand Title: Wide-Spaced Serif (A.P.P. JEWELLERS) */}
              <h2 className="font-serif text-3xl md:text-[2.25rem] font-normal tracking-[0.34em] text-white uppercase pl-[0.34em] drop-shadow-sm leading-tight">
                A.P.P. JEWELLERS
              </h2>

              {/* Subtitle with Hairline Rules (Sarafa Market Group) */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-white/70" />
                <span className="text-[0.74rem] font-light tracking-[0.24em] text-white/90 font-serif whitespace-nowrap uppercase">
                  Sarafa Market Group
                </span>
                <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-white/70" />
              </div>

              {/* Estd. 1992 */}
              <p className="text-[0.68rem] tracking-[0.28em] text-white/80 font-sans font-light uppercase pl-[0.28em]">
                Estd. 1992
              </p>

              {/* Atelier Note */}
              <p className="mt-5 text-sm text-white/85 font-light tracking-wide max-w-xs mx-auto leading-relaxed drop-shadow-xs">
                Handcrafted Solitaires, Diamond Haar & 22K Royal Antique Heirlooms
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-row items-center justify-center gap-3 w-full max-w-xs mx-auto">
                <Link
                  to="/collections"
                  className="shine-sweep inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#eedab2] via-[#ffffff] to-[#d8c3a5] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#4a3424] font-extrabold shadow-[0_8px_25px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Explore Vaults</span>
                  <ArrowRight className="size-3.5" />
                </Link>

                <a
                  href="https://wa.me/919015155615?text=Hello%20A.P.P.%20Jewellers%2C%20I%20would%20like%20to%20enquire%20about%20the%20Diamond%20Haar%20and%20Antique%20Temple%20Collections."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/15 backdrop-blur-md px-6 py-3 text-xs uppercase tracking-[0.18em] text-white font-semibold hover:bg-white hover:text-[#4a3424] transition-all shadow-xs active:scale-95"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: 4 ITEMS */}
          <div className="lg:col-span-4">
            <div className="relative h-[660px] overflow-hidden rounded-3xl p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              <div className="flex flex-col animate-marquee-down hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {RIGHT_DRIFT.map((item, idx) => (
                  <ProductCard key={`desktop-right-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>


        {/* ── MOBILE & TABLET: IMMERSIVE 2-COLUMN WITH CENTER FLOATING LOGO (EXACT REEL EFFECT) ── */}
        <div className="lg:hidden relative w-full h-[620px] sm:h-[720px] overflow-hidden rounded-3xl p-1.5 sm:p-3 bg-black/10 backdrop-blur-xs border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
          {/* Top & Bottom Fade Gradients */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#a88a75] via-[#a88a75]/80 to-transparent z-30 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8f705b] via-[#8f705b]/80 to-transparent z-30 pointer-events-none" />

          {/* 2-Column Opposing Streams (4 Left | 4 Right) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 h-full relative z-10">
            {/* LEFT STREAM: Scrolls UP */}
            <div className="flex flex-col animate-marquee-up hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
              {LEFT_DRIFT.map((item, idx) => (
                <ProductCard key={`mobile-left-${item.id}-${idx}`} item={item} />
              ))}
            </div>

            {/* RIGHT STREAM: Scrolls DOWN */}
            <div className="flex flex-col animate-marquee-down hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
              {RIGHT_DRIFT.map((item, idx) => (
                <ProductCard key={`mobile-right-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* ── CENTER FLOATING FROSTED LOGO HERO (Center Layer in Mobile) ── */}
          <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center p-3">
            <div className="pointer-events-auto max-w-[290px] sm:max-w-xs w-full text-center p-4 sm:p-5 rounded-3xl bg-[#7c5f49]/80 backdrop-blur-md border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col items-center">
              {/* Octagonal Monogram Monolith Icon */}
              <div className="relative mx-auto mb-2.5 size-14 sm:size-16 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-2xl border border-white/60 bg-white/20 backdrop-blur-md shadow-md"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                />
                <span className="relative z-10 font-serif text-base sm:text-lg font-bold tracking-widest text-white drop-shadow-sm select-none">
                  APP
                </span>
              </div>

              {/* Brand Title: A.P.P. JEWELLERS */}
              <h3 className="font-serif text-base sm:text-xl font-medium tracking-[0.26em] text-white uppercase pl-[0.26em] drop-shadow-sm leading-tight">
                A.P.P. JEWELLERS
              </h3>

              {/* Subtitle with Hairline Rules */}
              <div className="flex items-center justify-center gap-2 my-1.5">
                <div className="h-[1px] w-8 bg-white/60" />
                <span className="text-[0.58rem] sm:text-[0.66rem] font-light tracking-[0.2em] text-white/90 font-serif whitespace-nowrap uppercase">
                  Sarafa Market Delhi
                </span>
                <div className="h-[1px] w-8 bg-white/60" />
              </div>

              <p className="text-[0.52rem] sm:text-[0.58rem] tracking-[0.24em] text-white/80 font-sans uppercase pl-[0.24em] mb-2.5">
                Estd. 1992
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 w-full mt-1">
                <Link
                  to="/collections"
                  className="shine-sweep flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-white text-[#4a3424] py-2 px-3 text-[0.62rem] font-extrabold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <span>Vaults</span>
                  <ArrowRight className="size-2.5" />
                </Link>

                <a
                  href="https://wa.me/919015155615?text=Hello%20A.P.P.%20Jewellers%2C%20I%20would%20like%20to%20enquire%20about%20the%20collections."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-white/50 bg-black/20 text-white py-2 px-3 text-[0.62rem] font-semibold uppercase tracking-wider backdrop-blur-xs hover:bg-white hover:text-[#4a3424] transition-all"
                >
                  <MessageCircle className="size-2.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
