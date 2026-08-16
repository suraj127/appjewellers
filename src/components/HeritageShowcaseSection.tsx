import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Sparkles, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

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
    purity: "18K VVS-VS Solitaire",
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

// Replicated arrays for infinite opposing drift animation
const LEFT_DRIFT = [...LEFT_4_ITEMS, ...LEFT_4_ITEMS, ...LEFT_4_ITEMS];
const RIGHT_DRIFT = [...RIGHT_4_ITEMS, ...RIGHT_4_ITEMS, ...RIGHT_4_ITEMS];

function ProductCard({ item }: { item: ShowcaseItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative group w-full bg-[#f6eee3] rounded-[26px] sm:rounded-[32px] border border-[#d8c3a5]/50 shadow-[0_12px_36px_rgba(78,54,36,0.12)] hover:shadow-[0_20px_50px_rgba(184,134,11,0.25)] hover:border-[#d4af37] transition-all duration-500 overflow-hidden flex flex-col p-3 sm:p-4 mb-5 sm:mb-7 select-none">
      {/* ── Subtle Mandala Ornamental Watermark Background (Matches user reference image) ── */}
      <div 
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.14] bg-center bg-no-repeat bg-contain transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `radial-gradient(circle at center, #9e7f6b 1.5px, transparent 1.5px), radial-gradient(circle at center, transparent 35%, rgba(184,134,11,0.2) 36%, transparent 37%), radial-gradient(circle at center, transparent 65%, rgba(184,134,11,0.15) 66%, transparent 67%)`,
          backgroundSize: '100% 100%, 80% 80%, 100% 100%',
        }}
      />

      {/* Top Bar: Purity Badge & Like Button */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-1.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider uppercase bg-[#b8860b]/15 text-[#6d4606] border border-[#b8860b]/30 backdrop-blur-xs">
          <ShieldCheck className="size-2.5 text-[#b8860b]" />
          {item.purity}
        </span>

        {item.tag ? (
          <span className="text-[0.58rem] sm:text-[0.64rem] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#fff]/70 text-[#8b5a00] border border-[#d4af37]/40 shadow-2xs">
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
            className="p-1 rounded-full hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              className={`size-4 transition-colors ${
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
        className="relative aspect-[3.8/4.5] w-full rounded-2xl overflow-hidden flex items-center justify-center p-2 sm:p-3 my-1 group-hover:brightness-105 transition-all"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-contain filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-out group-hover:scale-106 group-hover:-translate-y-1"
        />
        {/* Soft Radial Sheen */}
        <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Footer Info */}
      <div className="relative z-10 mt-2 pt-2 flex items-center justify-between border-t border-[#d8c3a5]/60">
        <div className="flex flex-col text-left">
          <span className="text-[0.72rem] sm:text-[0.82rem] font-bold tracking-wide text-zinc-900 font-sans">
            {item.category}
          </span>
          <span className="text-[0.62rem] sm:text-[0.7rem] font-normal text-zinc-600 truncate max-w-[130px] sm:max-w-[160px]">
            {item.title}
          </span>
        </div>

        {item.weight && (
          <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold text-[#8b5a00] tracking-wide font-mono bg-white/60 px-2 py-0.5 rounded-md border border-[#d8c3a5]/40">
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
      className="relative overflow-hidden py-16 sm:py-24 select-none border-y border-[#c5a687]/40 shadow-inner"
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

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* ── MAIN 3-COLUMN SHOWCASE (4 Left | Center Brand Logo | 4 Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* ──── LEFT COLUMN: 4 ITEMS ──── */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="relative h-[560px] sm:h-[680px] overflow-hidden rounded-3xl p-2 sm:p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              {/* Fade Overlays */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              {/* Left Stream Drifting Animation */}
              <div className="flex flex-col animate-marquee-up hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                {LEFT_DRIFT.map((item, idx) => (
                  <ProductCard key={`left-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* ──── CENTER LOGO & BRAND IDENTITY (EXACTLY MATCHING GIVEN IMAGE) ──── */}
          <div className="lg:col-span-4 order-1 lg:order-2 text-center py-4 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center">
            <Reveal>
              {/* Octagonal Monogram Monolith Icon (Glassmorphism + Double Gold Hairline) */}
              <div className="relative mx-auto mb-5 sm:mb-6 size-20 sm:size-24 flex items-center justify-center group cursor-default">
                {/* Outer delicate glowing octagon border */}
                <div 
                  className="absolute inset-0 rounded-[24px] border border-white/60 bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                />
                {/* Inner hairline octagon outline */}
                <div 
                  className="absolute inset-1.5 rounded-[20px] border border-white/35 pointer-events-none"
                  style={{
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                />
                {/* Center Initial "M" */}
                <span className="relative z-10 font-serif text-3xl sm:text-4xl font-light tracking-wider text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] select-none">
                  M
                </span>
              </div>

              {/* Brand Title: Wide-Spaced Serif (MADAN JEWELLERS) */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.35rem] font-normal tracking-[0.32em] sm:tracking-[0.38em] text-white uppercase pl-[0.32em] sm:pl-[0.38em] drop-shadow-sm leading-tight">
                MADAN JEWELLERS
              </h2>

              {/* Subtitle with Hairline Rules (Naresh Khanna Group) */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-2.5 sm:my-3">
                <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/70" />
                <span className="text-[0.68rem] sm:text-[0.78rem] font-light tracking-[0.24em] text-white/90 font-serif whitespace-nowrap uppercase">
                  Naresh Khanna Group
                </span>
                <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/70" />
              </div>

              {/* Estd. 1959 */}
              <p className="text-[0.65rem] sm:text-[0.72rem] tracking-[0.28em] text-white/80 font-sans font-light uppercase pl-[0.28em]">
                Estd. 1959
              </p>

              {/* Atelier Note */}
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-white/85 font-light tracking-wide max-w-xs mx-auto leading-relaxed drop-shadow-xs">
                Handcrafted Solitaires, Diamond Haar & 22K Royal Antique Heirlooms
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs mx-auto">
                <Link
                  to="/collections"
                  className="shine-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#eedab2] via-[#ffffff] to-[#d8c3a5] px-7 py-3 text-xs uppercase tracking-[0.22em] text-[#4a3424] font-extrabold shadow-[0_8px_25px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Explore 8 Vaults</span>
                  <ArrowRight className="size-3.5" />
                </Link>

                <a
                  href="https://wa.me/919015155615?text=Hello%20Madan%20Jewellers%2C%20I%20would%20like%20to%20enquire%20about%20the%20Diamond%20Haar%20and%20Antique%20Temple%20Collections."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/15 backdrop-blur-md px-6 py-3 text-xs uppercase tracking-[0.18em] text-white font-semibold hover:bg-white hover:text-[#4a3424] transition-all shadow-xs active:scale-95"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* ──── RIGHT COLUMN: 4 ITEMS ──── */}
          <div className="lg:col-span-4 order-3">
            <div className="relative h-[560px] sm:h-[680px] overflow-hidden rounded-3xl p-2 sm:p-3 bg-black/10 backdrop-blur-xs border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
              {/* Fade Overlays */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#a88a75] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8f705b] to-transparent z-20 pointer-events-none" />
              
              {/* Right Stream Drifting Animation (opposing direction) */}
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
