import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShieldCheck } from "lucide-react";
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
    <div className="relative group w-full bg-[#f8f1e7] rounded-xl sm:rounded-2xl md:rounded-[28px] border border-[#d8c3a5]/60 shadow-[0_6px_20px_rgba(78,54,36,0.12)] hover:shadow-[0_16px_40px_rgba(184,134,11,0.28)] hover:border-[#d4af37] transition-all duration-500 overflow-hidden flex flex-col p-2 sm:p-3 md:p-4 mb-3 sm:mb-5 select-none">
      {/* ── Subtle Mandala Ornamental Watermark Background ── */}
      <div 
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.14] bg-center bg-no-repeat bg-contain transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `radial-gradient(circle at center, #9e7f6b 1.5px, transparent 1.5px), radial-gradient(circle at center, transparent 35%, rgba(184,134,11,0.2) 36%, transparent 37%), radial-gradient(circle at center, transparent 65%, rgba(184,134,11,0.15) 66%, transparent 67%)`,
          backgroundSize: '100% 100%, 80% 80%, 100% 100%',
        }}
      />

      {/* Top Bar: Purity Badge & Like Button */}
      <div className="relative z-10 flex items-center justify-between gap-1 mb-1">
        <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[0.52rem] sm:text-[0.62rem] md:text-[0.66rem] font-bold tracking-wider uppercase bg-[#b8860b]/15 text-[#6d4606] border border-[#b8860b]/30 backdrop-blur-xs truncate max-w-[85px] sm:max-w-none">
          <ShieldCheck className="size-2 sm:size-2.5 text-[#b8860b] shrink-0" />
          <span className="truncate">{item.purity}</span>
        </span>

        {item.tag ? (
          <span className="text-[0.46rem] sm:text-[0.56rem] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/80 text-[#8b5a00] border border-[#d4af37]/40 shadow-2xs hidden sm:inline-block">
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
            className="p-0.5 rounded-full hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              className={`size-3 sm:size-3.5 transition-colors ${
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
        className="relative aspect-[3.6/4.2] w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center p-1 sm:p-2.5 my-0.5 sm:my-1 group-hover:brightness-105 transition-all"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out group-hover:scale-106 group-hover:-translate-y-1"
        />
        <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Footer Info */}
      <div className="relative z-10 mt-1 pt-1 sm:mt-1.5 sm:pt-1.5 flex items-center justify-between border-t border-[#d8c3a5]/60 gap-1">
        <div className="flex flex-col text-left min-w-0">
          <span className="text-[0.58rem] sm:text-[0.72rem] md:text-[0.8rem] font-bold tracking-wide text-zinc-900 font-sans truncate">
            {item.category}
          </span>
          <span className="text-[0.5rem] sm:text-[0.6rem] md:text-[0.66rem] font-normal text-zinc-600 truncate max-w-[80px] sm:max-w-[130px]">
            {item.title}
          </span>
        </div>

        {item.weight && (
          <span className="text-[0.48rem] sm:text-[0.58rem] md:text-[0.64rem] font-semibold text-[#8b5a00] tracking-wide font-mono bg-white/70 px-1 sm:px-1.5 py-0.5 rounded border border-[#d8c3a5]/40 shrink-0 hidden xs:inline-block">
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
      className="relative overflow-hidden py-8 sm:py-16 md:py-20 select-none border-y border-[#c5a687]/40 shadow-inner"
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

      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-4 md:px-6">

        {/* ── CLEAN 3-COLUMN LAYOUT: 4 Left | Center Official Logo | 4 Right ── */}
        <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center">
          
          {/* ──── LEFT STREAM (4 ITEMS) ──── */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <div className="relative h-[480px] sm:h-[580px] md:h-[660px] overflow-hidden rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              <div className="absolute top-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              <div className="flex flex-col animate-marquee-up hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {LEFT_DRIFT.map((item, idx) => (
                  <ProductCard key={`left-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* ──── CENTER BRAND IDENTITY (OFFICIAL LOGO IMAGE, IN-FLOW, NEVER OVERLAYING) ──── */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4 text-center py-2 sm:py-4 px-1 sm:px-3 md:px-4 flex flex-col items-center justify-center">
            <Reveal>
              {/* Official Brand Logo */}
              <div className="relative mx-auto mb-2 sm:mb-4 flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="A.P.P. Jewellers Official Logo"
                  className="h-16 sm:h-28 md:h-36 lg:h-44 w-auto max-w-[140px] sm:max-w-[240px] md:max-w-xs object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500 select-none"
                />
              </div>

              {/* Subtitle with Hairline Rules (Sarafa Market Delhi) */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-3 my-1.5 sm:my-2.5">
                <div className="h-[1px] w-4 sm:w-10 md:w-14 bg-gradient-to-r from-transparent to-white/70" />
                <span className="text-[0.52rem] sm:text-[0.72rem] font-light tracking-[0.16em] sm:tracking-[0.24em] text-white/90 font-serif whitespace-nowrap uppercase">
                  Sarafa Market Delhi
                </span>
                <div className="h-[1px] w-4 sm:w-10 md:w-14 bg-gradient-to-l from-transparent to-white/70" />
              </div>

              {/* Estd. 1992 */}
              <p className="text-[0.5rem] sm:text-[0.66rem] tracking-[0.24em] text-white/80 font-sans font-light uppercase pl-[0.24em]">
                Estd. 1992
              </p>

              {/* Atelier Note (Visible on tablet & desktop) */}
              <p className="mt-2.5 sm:mt-4 text-xs md:text-sm text-white/85 font-light tracking-wide max-w-xs mx-auto leading-relaxed drop-shadow-xs">
                Handcrafted Solitaires, Diamond Haar & 22K Royal Antique Heirlooms
              </p>
            </Reveal>
          </div>

          {/* ──── RIGHT STREAM (4 ITEMS) ──── */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <div className="relative h-[480px] sm:h-[580px] md:h-[660px] overflow-hidden rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              <div className="absolute top-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              <div className="flex flex-col animate-marquee-down hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {RIGHT_DRIFT.map((item, idx) => (
                  <ProductCard key={`right-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
