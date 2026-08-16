import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MoreHorizontal, Sparkles, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./Reveal";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  purity: string;
  weight?: string;
  image: string;
  slug?: string;
}

const LEFT_COLUMN_ITEMS: ShowcaseItem[] = [
  {
    id: "l1",
    title: "Antique Temple Chandbalis",
    category: "Temple Jewelry",
    purity: "BIS 916 • 22K",
    weight: "18.400 g",
    image: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    slug: "chandra-suite",
  },
  {
    id: "l2",
    title: "Emerald & Polki Jadau Kada",
    category: "Heritage Bangles",
    purity: "22K Gold & Polki",
    weight: "24.800 g",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    slug: "app-item-4-bangles",
  },
  {
    id: "l3",
    title: "Meenakari Royal Kundan Choker",
    category: "Kundan Bridal",
    purity: "BIS 916 • 22K",
    weight: "42.500 g",
    image: "/assets/items/kundan_choker_set_1785608015801.png",
    slug: "app-item-8-choker-set",
  },
  {
    id: "l4",
    title: "Imperial Diamond Solitaire Ring",
    category: "Diamond Solitaires",
    purity: "VVS-VS • 18K",
    weight: "4.800 g",
    image: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    slug: "app-item-11-rings",
  },
  {
    id: "l5",
    title: "Goddess Lakshmi 24K Gold Coin",
    category: "Pure 24K Gold",
    purity: "999.9 Purity",
    weight: "10.000 g",
    image: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    slug: "app-item-7-daily-wear",
  },
];

const RIGHT_COLUMN_ITEMS: ShowcaseItem[] = [
  {
    id: "r1",
    title: "Royal Carved Temple Gold Kada",
    category: "Gold Jewelry",
    purity: "BIS 916 • 22K",
    weight: "31.200 g",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    slug: "app-item-4-bangles",
  },
  {
    id: "r2",
    title: "Traditional South Temple Haram",
    category: "Temple Jewelry",
    purity: "BIS 916 • 22K",
    weight: "36.800 g",
    image: "/assets/items/temple_gold_haram_1785608046359.png",
    slug: "app-item-1-chain",
  },
  {
    id: "r3",
    title: "Imperial Diamond Cluster Suite",
    category: "Fine Diamonds",
    purity: "18K Gold & Diamonds",
    weight: "22.600 g",
    image: "/assets/items/diamond_cluster_necklace_102.png",
    slug: "app-item-2-necklace",
  },
  {
    id: "r4",
    title: "Ruby & Pearl Heritage Jhumkas",
    category: "Antique Jhumka",
    purity: "BIS 916 • 22K",
    weight: "16.900 g",
    image: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    slug: "chandra-suite",
  },
  {
    id: "r5",
    title: "Heritage Royal Gold Chain",
    category: "Pure Gold",
    purity: "BIS 916 • 22K",
    weight: "14.200 g",
    image: "/assets/items/royal_gold_chain_101.png",
    slug: "app-item-1-chain",
  },
];

// Replicate for seamless infinite marquee loop
const LEFT_STREAM = [...LEFT_COLUMN_ITEMS, ...LEFT_COLUMN_ITEMS, ...LEFT_COLUMN_ITEMS];
const RIGHT_STREAM = [...RIGHT_COLUMN_ITEMS, ...RIGHT_COLUMN_ITEMS, ...RIGHT_COLUMN_ITEMS];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative group w-full bg-[#fdfbf7] rounded-2xl sm:rounded-3xl border border-[#d4af37]/35 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.22)] hover:border-[#d4af37] transition-all duration-500 overflow-hidden flex flex-col p-3 sm:p-4 mb-5 sm:mb-7 select-none">
      {/* Decorative Subtle Mandala Watermark Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle Corner Gold Flourish */}
      <div className="absolute top-2 right-2 size-6 border-t border-r border-[#d4af37]/30 rounded-tr-lg pointer-events-none" />

      {/* Top Meta: Purity Badge & Weight */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider uppercase bg-[#b8860b]/10 text-[#8b5a00] border border-[#b8860b]/25">
          <ShieldCheck className="size-2.5 text-[#b8860b]" />
          {item.purity}
        </span>
        {item.weight && (
          <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold text-zinc-500 tracking-wide font-mono">
            {item.weight}
          </span>
        )}
      </div>

      {/* Main Image Display */}
      <div className="relative aspect-[4/4.8] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#f5ede0]/50 to-[#ede0cc]/40 flex items-center justify-center p-3 sm:p-4 my-1">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
        />
        {/* Soft Radial Sheen */}
        <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Footer Category Bar */}
      <div className="relative z-10 mt-2.5 pt-2 flex items-center justify-between border-t border-[#d4af37]/20">
        <div className="flex flex-col text-left">
          <span className="text-[0.7rem] sm:text-[0.82rem] font-bold tracking-wider text-zinc-900 font-sans">
            {item.category}
          </span>
          <span className="text-[0.6rem] sm:text-[0.68rem] font-normal text-zinc-500 truncate max-w-[140px] sm:max-w-[170px]">
            {item.title}
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Save to favourites"
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              className={`size-4 sm:size-4.5 transition-colors ${
                liked
                  ? "fill-[#b91c1c] text-[#b91c1c]"
                  : "text-zinc-400 hover:text-[#b8860b]"
              }`}
            />
          </button>
          
          <Link
            to="/piece/$slug"
            params={{ slug: item.slug || "chandra-suite" }}
            aria-label="View piece details"
            className="p-1.5 rounded-full hover:bg-[#b8860b]/10 text-zinc-400 hover:text-[#8b5a00] active:scale-90 transition-all"
          >
            <MoreHorizontal className="size-4 sm:size-4.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeritageShowcaseSection() {
  return (
    <section
      id="heritage-showcase"
      className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f7f0e4] to-[#ebdcc4] py-16 sm:py-28 border-y border-gold/30 shadow-sm select-none"
    >
      {/* Background Royal Mandala Motif Ambient Overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#8b5a00_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-10 sm:mb-14">
          <Reveal>
            <p className="eyebrow text-[#b8860b]">HERITAGE ATELIER SHOWCASE</p>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-zinc-900">
              Timeless Heirlooms of A.P.P. Jewellers
            </h2>
            <p className="mt-3 text-xs sm:text-base font-normal leading-relaxed text-zinc-700 max-w-2xl mx-auto px-4">
              Handcrafted temple gold, bridal kundan, and bespoke certified diamonds passed down through generations.
            </p>
            <div className="rule-gold mx-auto mt-4 w-32 sm:w-40" />
          </Reveal>
        </div>

        {/* ── DUAL COLUMN OPPOSING INFINITE MARQUEE SHOWCASE ── */}
        <div className="relative w-full max-w-4xl mx-auto h-[540px] sm:h-[640px] md:h-[720px] overflow-hidden rounded-3xl p-2 sm:p-4 bg-[#fcf9f2]/70 backdrop-blur-sm border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(139,90,0,0.08)]">
          {/* Top Fade Gradient Mask */}
          <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-[#fcf9f2] via-[#fcf9f2]/90 to-transparent z-20 pointer-events-none" />
          {/* Bottom Fade Gradient Mask */}
          <div className="absolute bottom-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-t from-[#fcf9f2] via-[#fcf9f2]/90 to-transparent z-20 pointer-events-none" />

          {/* Columns Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 h-full relative z-10">
            {/* LEFT COLUMN: SCROLLS UP (animate-marquee-up) */}
            <div className="flex flex-col animate-marquee-up hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
              {LEFT_STREAM.map((item, idx) => (
                <ShowcaseCard key={`left-${item.id}-${idx}`} item={item} />
              ))}
            </div>

            {/* RIGHT COLUMN: SCROLLS DOWN (animate-marquee-down) */}
            <div className="flex flex-col animate-marquee-down hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
              {RIGHT_STREAM.map((item, idx) => (
                <ShowcaseCard key={`right-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── MAJESTIC BRANDING SEAL AT THE END (MADAN JEWELLERS HERITAGE EXACT STYLE) ── */}
        <div className="mt-14 sm:mt-20 text-center max-w-2xl mx-auto">
          <Reveal delay={200}>
            {/* Elegant Translucent Octagon Monogram Emblem */}
            <div className="relative mx-auto mb-6 size-16 sm:size-20 flex items-center justify-center">
              {/* Outer delicate gold octagon border */}
              <div className="absolute inset-0 rounded-[22px] border border-[#d4af37]/60 bg-gradient-to-b from-[#ffffff]/70 to-[#f5ebd7]/50 backdrop-blur-xs shadow-[0_4px_20px_rgba(184,134,11,0.18)] rotate-0" />
              {/* Inner subtle outline */}
              <div className="absolute inset-1.5 rounded-[18px] border border-[#b8860b]/30" />
              {/* Monogram Letter */}
              <span className="relative z-10 font-display text-2xl sm:text-3xl font-light tracking-widest text-[#8b5a00]">
                A
              </span>
            </div>

            {/* Brand Title: Wide-Spaced Luxury Serif */}
            <h3 className="font-display text-2xl sm:text-4xl md:text-[2.65rem] font-normal tracking-[0.32em] sm:tracking-[0.38em] text-[#2c2214] uppercase pl-[0.32em] sm:pl-[0.38em]">
              A.P.P. JEWELLERS
            </h3>

            {/* Heritage Group Line with Horizontal Hairline Rules */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-3 sm:my-3.5">
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#b8860b]/70" />
              <span className="text-[0.65rem] sm:text-[0.72rem] font-normal tracking-[0.25em] text-[#8b5a00] font-serif">
                Sarafa Market Group
              </span>
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#b8860b]/70" />
            </div>

            {/* Estd. 1992 */}
            <p className="text-[0.7rem] sm:text-xs tracking-[0.28em] text-[#7a654c] font-sans font-light uppercase pl-[0.28em]">
              Estd. 1992
            </p>

            {/* Showroom Promise */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-600 font-light tracking-wide max-w-md mx-auto">
              Pure BIS Hallmarked 22K Gold • Certified Solitaires • Bespoke Kundan
            </p>

            {/* Luxury Call-To-Action Pill Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <Link
                to="/collections"
                className="shine-sweep inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-black font-extrabold shadow-[0_8px_25px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explore All Vaults</span>
                <ArrowRight className="size-3.5" />
              </Link>
              
              <a
                href="https://wa.me/919015155615?text=Hello%20A.P.P.%20Jewellers%2C%20I%20would%20like%20to%20enquire%20about%20your%20heritage%20collections."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b8860b]/60 bg-white/90 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#8b5a00] font-bold hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all shadow-xs active:scale-95"
              >
                <Phone className="size-3.5" />
                <span>Enquire On WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
