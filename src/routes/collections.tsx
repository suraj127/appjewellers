import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllProducts } from "@/data/storeState";
import type { Product } from "@/data/products";
import logoImg from "@/assets/logo.png";
import craftImg from "@/assets/craft.jpg";
import {
  DiamondIcon,
  RingIcon,
  CrownIcon,
  NecklaceIcon,
  EarringIcon,
  CoinIcon,
  WhatsAppIcon,
  HeartIcon,
  PhoneIcon,
} from "@/components/LuxuryIcons";

const title = "Collections — A.P.P. Jewellers, Sarafa Market, New Delhi";
const description =
  "A curated high-end editorial jewelry archive and exhibition catalog from A.P.P. Jewellers, Sarafa Market, Delhi.";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EditorialCollectionsPage,
});

/* ── Curtain Reveal Stacking Panels Definition ───────────────────── */
interface CurtainPanelConfig {
  id: string;
  categoryKey: string;
  panelNum: string;
  subtitle: string;
  title: string;
  tagline: string;
  bgColor: string;
  filterFn: (p: Product) => boolean;
}

const CURTAIN_PANELS: CurtainPanelConfig[] = [
  {
    id: "curtain-hero",
    categoryKey: "ALL",
    panelNum: "ARCHIVE 01",
    subtitle: "HAUTE JOAILLERIE & GRAND CURATION",
    title: "The Fine Jewelry Exhibition",
    tagline:
      "A year of master craftsmanship, certified 22K gold purity, and royal Delhi goldsmith heritage.",
    bgColor: "#FAF8F5",
    filterFn: () => true,
  },
  {
    id: "curtain-gold",
    categoryKey: "GOLD",
    panelNum: "ARCHIVE 02",
    subtitle: "BIS HALLMARKED 22K (916) PURITY",
    title: "The Royal Gold Heritage",
    tagline:
      "Intricate hand-forged chokers, nakshi repoussé necklaces, and heavy bridal haar.",
    bgColor: "#F5F2EB",
    filterFn: (p) =>
      p.metal === "GOLD" ||
      p.category === "HARAM" ||
      p.category === "CHOKER SET",
  },
  {
    id: "curtain-diamond",
    categoryKey: "DIAMOND",
    panelNum: "ARCHIVE 03",
    subtitle: "GIA & IGI CERTIFIED SOLITAIRES",
    title: "Magnetic Imprint & Diamonds",
    tagline:
      "Precision cut solitaire rings, diamond tennis bracelets, and pavé set emerald cuts.",
    bgColor: "#EFECE4",
    filterFn: (p) =>
      p.metal === "DIAMOND" ||
      p.metal === "PLATINUM" ||
      p.category.includes("SOLITAIRE") ||
      p.category === "ENGAGEMENT RINGS",
  },
  {
    id: "curtain-earrings",
    categoryKey: "EARRINGS",
    panelNum: "ARCHIVE 04",
    subtitle: "SACRED ARTISTRY & MEENAKARI",
    title: "Earrings, Jhumkas & Chandbalis",
    tagline:
      "Tiered temple jhumkas, pearl-tassel balis, and everyday brilliant solitaire studs.",
    bgColor: "#F8F6F1",
    filterFn: (p) =>
      p.category.includes("EAR") ||
      p.category.includes("JHUMKA") ||
      p.category.includes("STUD") ||
      p.category === "NOSE STUDS",
  },
  {
    id: "curtain-rings",
    categoryKey: "RINGS",
    panelNum: "ARCHIVE 05",
    subtitle: "TIMELESS BANDS & COCKTAIL CUTS",
    title: "Rings, Bands & Solitaires",
    tagline:
      "Hand-carved eternity bands, statement polki cocktail rings, and signature daily signets.",
    bgColor: "#F3EFE8",
    filterFn: (p) => p.category.includes("RING"),
  },
  {
    id: "curtain-wedding",
    categoryKey: "WEDDING",
    panelNum: "ARCHIVE 06",
    subtitle: "ROYAL ATELIER HEIRLOOMS",
    title: "Bridal Suites & Temple Masterpieces",
    tagline:
      "Grand wedding ensembles, goddess Lakshmi vaddanams, and hand-linked kadas.",
    bgColor: "#EAE5DC",
    filterFn: (p) =>
      p.category.includes("BRIDAL") ||
      p.category.includes("HARAM") ||
      p.category.includes("SET") ||
      p.category.includes("VADDANAM"),
  },
  {
    id: "curtain-daily",
    categoryKey: "DAILY WEAR",
    panelNum: "ARCHIVE 07",
    subtitle: "EVERYDAY LUXURY & MINIMALISM",
    title: "Dailywear Chains, Mangalsutras & Coins",
    tagline:
      "Solid gold chains, delicate everyday pendants, and certified 24K gold investment coins.",
    bgColor: "#FAF8F5",
    filterFn: (p) =>
      p.category.includes("DAILY") ||
      p.category.includes("CHAIN") ||
      p.category.includes("MANGALSUTRA") ||
      p.category.includes("COIN") ||
      p.metal === "SILVER",
  },
];

/* ── Sub Navigation Bar Items ────────────────────────────────────── */
const SUB_NAV_ITEMS = [
  { id: "curtain-hero", label: "All", labelFull: "All Jewellery", IconComponent: CrownIcon },
  { id: "curtain-gold", label: "Gold", labelFull: "Gold", IconComponent: CrownIcon },
  { id: "curtain-diamond", label: "Diamond", labelFull: "Solitaire Diamond", IconComponent: DiamondIcon },
  { id: "curtain-earrings", label: "Earrings", labelFull: "Earrings & Jhumka", IconComponent: EarringIcon },
  { id: "curtain-rings", label: "Rings", labelFull: "Rings & Bands", IconComponent: RingIcon },
  { id: "curtain-wedding", label: "Bridal", labelFull: "Bridal & Wedding", IconComponent: CrownIcon },
  { id: "curtain-daily", label: "Daily", labelFull: "Daily Wear & Coins", IconComponent: NecklaceIcon },
];

/* ── Header height constants ─────────────────────────────────────── */
const HEADER_HEIGHT_MOBILE = 82;
const HEADER_HEIGHT_DESKTOP = 105;

function EditorialCollectionsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(getAllProducts());
  const [activePanelId, setActivePanelId] = useState<string>("curtain-hero");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeMobileHover, setActiveMobileHover] = useState<string | null>(null);
  const [visiblePanels, setVisiblePanels] = useState<Set<string>>(new Set(["curtain-hero"]));
  const subNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setAllProducts(getAllProducts());
    sync();
    window.addEventListener("app_inventory_updated", sync);
    return () => window.removeEventListener("app_inventory_updated", sync);
  }, []);

  /* ── IntersectionObserver: Track active panel on scroll ──────── */
  useEffect(() => {
    const panelEls = CURTAIN_PANELS.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    if (panelEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActivePanelId(id);
            setVisiblePanels((prev) => {
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-60px 0px -40% 0px",
      }
    );

    panelEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Auto-scroll sub-nav to keep active item visible ─────────── */
  useEffect(() => {
    if (!subNavRef.current) return;
    const activeBtn = subNavRef.current.querySelector(`[data-nav-id="${activePanelId}"]`) as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activePanelId]);

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const scrollToCurtain = (id: string) => {
    setActivePanelId(id);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = window.innerWidth >= 640 ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset + 5;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans antialiased selection:bg-[#E8DFC8] selection:text-[#121212]">
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. STICKY TOP BRAND HEADER                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-[200] border-b border-[#121212]/10 bg-[#FAF8F5]/95 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2.5 sm:px-12 py-2 sm:py-4">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-3 transition-opacity hover:opacity-80 min-w-0"
          >
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-5 sm:h-8 object-contain shrink-0"
            />
            <span className="hidden xs:inline font-display text-[0.7rem] sm:text-lg tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-1.5 sm:pl-3 truncate">
              A.P.P. — 365
            </span>
          </Link>

          {/* Right: Return Home Action */}
          <Link
            to="/"
            className="font-sans text-[0.5rem] sm:text-[0.65rem] tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#121212] border border-[#121212]/30 rounded-full px-2.5 sm:px-5 py-1 sm:py-2 hover:bg-[#121212] hover:text-[#FAF8F5] transition-all shrink-0"
          >
            HOME
          </Link>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* SUB NAVIGATION BAR (Category Icons & Curtain Jump Tabs)     */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div
          ref={subNavRef}
          className="border-t border-[#121212]/10 bg-[#FAF8F5]/90 py-1 sm:py-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-0.5 sm:gap-2.5 px-1.5 sm:px-4 min-w-max">
            {SUB_NAV_ITEMS.map((item) => {
              const isSelected = activePanelId === item.id;
              const Icon = item.IconComponent;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-nav-id={item.id}
                  onClick={() => scrollToCurtain(item.id)}
                  className={`group flex items-center gap-0.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-sans text-[0.55rem] sm:text-xs tracking-wider uppercase transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "bg-[#121212] text-[#FAF8F5] font-bold shadow-xs"
                      : "text-[#555] hover:text-[#121212] hover:bg-[#121212]/5"
                  }`}
                >
                  <Icon
                    className={`size-2.5 sm:size-3.5 transition-colors ${
                      isSelected
                        ? "text-[#FAF8F5]"
                        : "text-[#888] group-hover:text-[#121212]"
                    }`}
                  />
                  <span className="hidden sm:inline">{item.labelFull}</span>
                  <span className="sm:hidden">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. CATEGORY COLLECTION PANELS                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <main className="relative w-full">
        {CURTAIN_PANELS.map((panel, panelIdx) => (
          <CurtainPanel
            key={panel.id}
            panel={panel}
            panelIdx={panelIdx}
            allProducts={allProducts}
            isVisible={visiblePanels.has(panel.id)}
            wishlist={wishlist}
            activeMobileHover={activeMobileHover}
            onToggleWishlist={toggleWishlist}
            onMobileHover={setActiveMobileHover}
            onSelectProduct={setSelectedProduct}
          />
        ))}
      </main>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. EDITORIAL FOOTER                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <footer
        className="relative border-t border-[#121212]/10 bg-[#FAF8F5] py-12 sm:py-16 px-4 sm:px-12 text-center space-y-4 sm:space-y-6"
        style={{ zIndex: 200 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 font-sans text-[0.55rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-[#777]">
          <p>A.P.P. JEWELLERS — 365</p>
          <p>A YEAR OF CRAFTSMANSHIP & GOLD HERITAGE</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#121212] font-bold hover:underline"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. FULL-SCREEN ARTICLE READER VIEW                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {selectedProduct && (
        <EditorialPieceReader
          product={selectedProduct}
          allProducts={allProducts}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* ── Curtain reveal CSS animations (injected once) ───────────── */}
      <style>{`
        /* Curtain panel content reveal animation */
        .curtain-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .curtain-content.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger delays for content children */
        .curtain-content.revealed .stagger-1 { transition-delay: 0.05s; }
        .curtain-content.revealed .stagger-2 { transition-delay: 0.12s; }
        .curtain-content.revealed .stagger-3 { transition-delay: 0.18s; }
        .curtain-content.revealed .stagger-4 { transition-delay: 0.24s; }
        .curtain-content.revealed .stagger-5 { transition-delay: 0.30s; }
        .curtain-content.revealed .stagger-6 { transition-delay: 0.36s; }

        /* Individual staggered children */
        .stagger-child {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .curtain-content.revealed .stagger-child {
          opacity: 1;
          transform: translateY(0);
        }

        /* Reader fade-in */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out both;
        }
      `}</style>
    </div>
  );
}

/* Helper to extract gross weight from product specs */
function getPieceGrossWeight(piece: Product): string {
  const dimWeight = piece.dimensions?.find((d) =>
    d[0].toLowerCase().includes("weight")
  )?.[1];
  if (dimWeight) return dimWeight;

  const matWeight = piece.materials?.find((m) =>
    m[0].toLowerCase().includes("weight")
  )?.[1];
  if (matWeight) return matWeight;

  return "15.92 g";
}

/* ══════════════════════════════════════════════════════════════════════ */
/* CURTAIN PANEL COMPONENT                                              */
/* Free-flowing responsive category containers with smooth scrolling     */
/* ══════════════════════════════════════════════════════════════════════ */
function CurtainPanel({
  panel,
  panelIdx,
  allProducts,
  isVisible,
  wishlist,
  activeMobileHover,
  onToggleWishlist,
  onMobileHover,
  onSelectProduct,
}: {
  panel: CurtainPanelConfig;
  panelIdx: number;
  allProducts: Product[];
  isVisible: boolean;
  wishlist: string[];
  activeMobileHover: string | null;
  onToggleWishlist: (slug: string) => void;
  onMobileHover: (slug: string | null) => void;
  onSelectProduct: (p: Product) => void;
}) {
  const pieces = allProducts.filter(panel.filterFn);
  const displayPieces =
    pieces.length > 0
      ? pieces.slice(0, 6)
      : allProducts.slice(panelIdx * 3, panelIdx * 3 + 6);

  return (
    <section
      id={panel.id}
      style={{
        backgroundColor: panel.bgColor,
      }}
      className="relative w-full px-2.5 sm:px-10 lg:px-12 py-7 sm:py-16 border-b border-[#121212]/10 scroll-mt-24 sm:scroll-mt-28 transition-all"
    >
      <div className={`curtain-content ${isVisible ? "revealed" : ""} mx-auto max-w-7xl space-y-4 sm:space-y-12`}>
        {/* Curtain Panel Header */}
        <div className="text-center space-y-1 sm:space-y-2 max-w-3xl mx-auto px-1 stagger-child stagger-1">
          <p className="font-sans text-[0.52rem] sm:text-[0.68rem] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8b5a00] font-bold">
            {panel.panelNum} · {panel.subtitle}
          </p>
          <h2 className="font-display italic text-2xl sm:text-5xl lg:text-6xl text-[#121212] font-normal tracking-tight">
            {panel.title}
          </h2>
          <p className="font-display text-xs sm:text-base text-[#555] font-light leading-relaxed max-w-xl mx-auto line-clamp-2 sm:line-clamp-none">
            {panel.tagline}
          </p>
        </div>

        {/* RESPONSIVE GRID: 2 COLUMNS ON MOBILE, 3 ON TABLET/DESKTOP */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 items-start">
          {displayPieces.map((piece, pieceIdx) => {
            const aspectDesktop = [
              "sm:aspect-[3/4]",
              "sm:aspect-square",
              "sm:aspect-[4/5]",
              "sm:aspect-[3/4]",
              "sm:aspect-square",
              "sm:aspect-[4/3]",
            ];
            const desktopAspect = aspectDesktop[pieceIdx % aspectDesktop.length];
            const isWishlisted = wishlist.includes(piece.slug);
            const isCardActive = activeMobileHover === piece.slug;
            const grossWeight = getPieceGrossWeight(piece);

            const whatsappPriceMsg = encodeURIComponent(
              `Hi A.P.P. Jewellers, I would like to request the price and atelier details for "${piece.name}" (Gross Weight: ${grossWeight}, ${piece.purity || "22K"}, SKU: ${piece.slug.toUpperCase()}) from your 365 Collection.`
            );

            return (
              <div
                key={piece.slug}
                className={`stagger-child stagger-${Math.min(pieceIdx + 1, 6)} group relative flex flex-col space-y-1.5 sm:space-y-3 ${
                  pieceIdx % 3 === 1 ? "md:translate-y-4" : ""
                }`}
              >
                {/* Image Box Container */}
                <div
                  onClick={() =>
                    onMobileHover(isCardActive ? null : piece.slug)
                  }
                  className={`relative w-full aspect-[3/4] ${desktopAspect} overflow-hidden bg-[#1a1a1a] cursor-pointer shadow-xs transition-all duration-300 hover:shadow-2xl rounded-xs border border-[#b8860b]/20 group-hover:border-[#b8860b]/60`}
                >
                  <img
                    src={piece.image}
                    alt={piece.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(piece.slug);
                    }}
                    aria-label="Wishlist piece"
                    className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 transition-transform hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <HeartIcon
                      filled={isWishlisted}
                      className={`size-3.5 sm:size-4 ${isWishlisted ? "text-rose-500 fill-rose-500" : "text-white"}`}
                    />
                  </button>

                  {/* Gross Weight Pill on Top-Left */}
                  <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md border border-[#d4af37]/40 px-2 py-0.5 rounded-full shadow-xs">
                    <span className="font-sans text-[0.52rem] sm:text-[0.62rem] font-bold text-[#f5d77f] tracking-wider uppercase">
                      GS: {grossWeight}
                    </span>
                  </div>

                  {/* ── LUXURY OBSIDIAN-GOLD GLASS OVERLAY ── */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/35 backdrop-blur-xs border border-[#d4af37]/40 p-3 sm:p-5 flex flex-col justify-between items-center text-center transition-all duration-300 z-20 ${
                      isCardActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  >
                    {/* Top dismiss handle for mobile */}
                    <div className="w-full flex items-center justify-between">
                      <span className="font-sans text-[0.5rem] sm:text-[0.6rem] tracking-[0.2em] uppercase text-[#d4af37] font-bold">
                        {panel.panelNum}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMobileHover(null);
                        }}
                        className="text-zinc-400 hover:text-white p-0.5 rounded-full"
                        aria-label="Close details"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Middle Piece Title & Specs */}
                    <div className="space-y-1 sm:space-y-1.5 my-auto px-1">
                      <h4 className="font-display text-sm sm:text-xl text-[#FAF8F5] uppercase tracking-wider font-normal leading-tight line-clamp-2">
                        {piece.name}
                      </h4>

                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        <span className="font-sans text-[0.52rem] sm:text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5d77f]">
                          GS WT: {grossWeight}
                        </span>
                        <span className="font-sans text-[0.52rem] sm:text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-zinc-200">
                          {piece.purity || "22K GOLD"}
                        </span>
                      </div>

                      <p className="hidden sm:block font-display italic text-xs text-zinc-300 line-clamp-2 leading-relaxed pt-1">
                        {piece.story ||
                          piece.tagline ||
                          "Handcrafted with certified gold purity and master artisan settings."}
                      </p>
                    </div>

                    {/* Luxury Action Buttons: Discover & WhatsApp Price Request */}
                    <div className="w-full space-y-1.5 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(piece);
                        }}
                        className="flex items-center justify-center gap-1 w-full py-2 sm:py-2.5 px-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] text-black font-sans text-[0.58rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-all hover:brightness-110 active:scale-95 shadow-md"
                      >
                        <span>DISCOVER</span>
                        <span className="text-xs">→</span>
                      </button>

                      <a
                        href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 sm:py-2 px-3 rounded-full border border-[#25D366]/80 bg-[#25D366]/20 hover:bg-[#25D366] text-white hover:text-black font-sans text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.14em] transition-all shadow-xs active:scale-95"
                      >
                        <WhatsAppIcon className="size-3 text-current shrink-0" />
                        <span>PRICE REQUEST</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Micro-Caption Directly Beneath Card */}
                <div className="space-y-0.5 px-1">
                  <p className="font-display text-xs sm:text-base tracking-wide text-[#121212] font-semibold truncate leading-tight">
                    {piece.name}
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-sans text-[0.52rem] sm:text-[0.62rem] tracking-wider uppercase text-[#8b5a00] font-bold truncate">
                      GS: {grossWeight} · {piece.purity || "22K"}
                    </span>
                    <a
                      href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      title="WhatsApp Price Enquiry"
                      className="font-sans text-[0.52rem] sm:text-[0.62rem] tracking-wider uppercase text-[#121212] font-bold hover:text-[#b8860b] transition-colors shrink-0 underline underline-offset-2"
                    >
                      Price Request →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Full-Screen Cartier 365 Article Reader Component ────────────── */
function EditorialPieceReader({
  product,
  allProducts,
  onClose,
  onSelectProduct,
}: {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}) {
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const currentIndex = allProducts.findIndex((p) => p.slug === product.slug);
  const nextProduct =
    allProducts[(currentIndex + 1) % allProducts.length] || allProducts[0];

  const images = [product.image, product.hoverImage].filter(
    (img, idx, arr) => img && arr.indexOf(img) === idx
  );
  const currentImg = images[activeImgIdx] || product.image;

  const complementaryPieces = allProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.metal === product.metal)
    )
    .slice(0, 6);

  const whatsappInquiry = encodeURIComponent(
    `Hi A.P.P. Jewellers, I am reading about "${product.name}" (${product.purity}, SKU: ${product.slug.toUpperCase()}) in your 365 Collection Catalog and would like to request price details & an atelier appointment.`
  );

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-[#FAF8F5] text-[#121212] animate-fadeIn">
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#121212]/10 bg-[#FAF8F5]/95 px-3 sm:px-12 py-2.5 sm:py-4 backdrop-blur-md">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-5 sm:h-8 object-contain shrink-0"
          />
          <span className="font-display text-[0.65rem] sm:text-sm tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-1.5 sm:pl-3 truncate">
            365 Archive
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-1 sm:gap-2 rounded-full border border-[#121212]/30 px-2.5 sm:px-4 py-1 sm:py-1.5 font-sans text-[0.5rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-[#121212] hover:text-[#FAF8F5] transition-all shrink-0"
        >
          <span>CLOSE</span>
          <span className="text-xs sm:text-base leading-none">✕</span>
        </button>
      </header>

      {/* ── Main Container with Left & Right Rails ──────────────── */}
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-70px)] max-w-7xl">
        {/* Left Rail: Vertical "BACK TO GALLERY" (Desktop Only) */}
        <aside className="hidden lg:flex w-20 shrink-0 flex-col items-center justify-center border-r border-[#121212]/10 bg-[#FAF8F5]">
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 py-16 font-sans text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#121212]/70 hover:text-[#121212] transition-colors [writing-mode:vertical-lr] rotate-180"
          >
            <span className="inline-block transition-transform group-hover:-translate-y-1">
              ↑
            </span>
            <span>BACK TO GALLERY</span>
          </button>
        </aside>

        {/* Center Article Content */}
        <article className="flex-1 px-3 py-4 sm:px-16 sm:py-6 lg:px-20 max-w-4xl mx-auto space-y-5 sm:space-y-16">
          {/* Article Header */}
          <div className="text-center space-y-1.5 sm:space-y-3">
            <p className="font-sans text-[0.48rem] sm:text-[0.65rem] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#8b5a00] font-bold">
              {product.collection || "EXHIBITION ARCHIVE"} · CREATION{" "}
              {product.slug.slice(-2).toUpperCase() || "01"}
            </p>
            <h1 className="font-display text-2xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#121212]">
              {product.name}
            </h1>
            
            {/* Specs & Gross Weight Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="font-sans text-[0.55rem] sm:text-xs font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-[#fcfaf2] border border-[#b8860b]/40 text-[#8b5a00] shadow-xs">
                GS WT: {getPieceGrossWeight(product)}
              </span>
              <span className="font-sans text-[0.55rem] sm:text-xs font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-white border border-[#121212]/15 text-[#121212] shadow-xs">
                {product.purity || "22K BIS HALLMARKED"}
              </span>
              <span className="font-sans text-[0.55rem] sm:text-xs font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-white border border-[#121212]/15 text-[#777] shadow-xs">
                SKU: {product.slug.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative overflow-hidden rounded-xs border border-[#121212]/10 bg-[#EFECE6] shadow-sm">
            <div className="relative h-[280px] sm:h-[520px] lg:h-[640px] w-full overflow-hidden">
              <img
                src={currentImg}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 border-t border-[#121212]/10 bg-[#FAF8F5] p-2 sm:p-3">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`size-10 sm:size-14 overflow-hidden border transition-all ${
                      activeImgIdx === idx
                        ? "border-[#121212] ring-1 ring-[#121212]"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Story Opening Paragraph */}
          <div className="space-y-3 max-w-2xl mx-auto text-center px-1">
            <p className="font-display text-sm sm:text-2xl leading-relaxed text-[#222] font-light">
              {product.story ||
                product.tagline ||
                "Conceived as an emblem of royal Indian heritage, this masterpiece combines timeless geometry with meticulously hand-carved floral details."}
            </p>
          </div>

          {/* Editorial Q&A Craft Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start border-t border-b border-[#121212]/10 py-5 sm:py-12">
            {/* Left Photo */}
            <div className="md:col-span-5 relative">
              <div className="relative h-40 sm:h-80 w-full overflow-hidden bg-[#EFECE6] border border-[#121212]/10">
                <img
                  src={craftImg}
                  alt="Craftsmanship Atelier"
                  className="h-full w-full object-cover filter grayscale contrast-125"
                />
              </div>
              <p className="mt-1 font-sans text-[0.42rem] sm:text-[0.52rem] tracking-[0.2em] sm:tracking-[0.25em] text-[#888] uppercase">
                HANDCRAFTED AT SEELAMPUR ATELIER — BIS HALLMARKED
              </p>
            </div>

            {/* Right Q&A Dialog */}
            <div className="md:col-span-7 space-y-3 sm:space-y-6 font-display">
              <div>
                <p className="text-xs sm:text-lg font-medium text-[#121212]">
                  Gold Purity & Assay Grade?
                </p>
                <p className="text-[0.68rem] sm:text-base text-[#555] italic mt-0.5 font-light leading-relaxed">
                  {product.purity || "22 CARAT (916)"} — 100% BIS Hallmarked at
                  Delhi Assay Centre.
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-lg font-medium text-[#121212]">
                  Artisan Setting & Forging Technique?
                </p>
                <p className="text-[0.68rem] sm:text-base text-[#555] italic mt-0.5 font-light leading-relaxed">
                  {product.craftsmanship?.[1]?.[1] ||
                    "Traditional Hand-Forged & Prong Setting."}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-lg font-medium text-[#121212]">
                  Artisan Hours Dedicated?
                </p>
                <p className="text-[0.68rem] sm:text-base text-[#555] italic mt-0.5 font-light leading-relaxed">
                  {product.craftsmanship?.[0]?.[1] ||
                    "120 Hours of Dedicated Karigar Artistry."}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-lg font-medium text-[#121212]">
                  A characteristic you share with this creation?
                </p>
                <p className="text-[0.68rem] sm:text-base text-[#555] italic mt-0.5 font-light leading-relaxed">
                  "I feel at my best when I'm most confidently my true feminine
                  self. It allows me to be raw and brave with choices."
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal Thumbnail Strip for related pieces */}
          {complementaryPieces.length > 0 && (
            <div className="lg:hidden">
              <p className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.25em] text-[#888] uppercase mb-2">
                RELATED PIECES
              </p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {complementaryPieces.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => onSelectProduct(item)}
                    title={item.name}
                    className="group relative shrink-0 w-16 overflow-hidden border border-[#121212]/20 transition-all active:scale-95"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-sans text-[0.38rem] tracking-wider uppercase text-[#555] text-center py-0.5 truncate px-0.5">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons: WhatsApp Price Inquiry & Call Store */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/919015155615?text=${whatsappInquiry}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto rounded-full border border-[#121212] bg-[#121212] px-5 py-2.5 sm:px-7 sm:py-3.5 font-sans text-[0.55rem] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#FAF8F5] shadow-md transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212] active:scale-95"
            >
              <WhatsAppIcon className="size-3 sm:size-4 text-current" />
              <span>REQUEST PRICE</span>
            </a>

            <a
              href="tel:09015155615"
              className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-full border border-[#121212]/30 px-5 py-2.5 sm:px-6 sm:py-3.5 font-sans text-[0.55rem] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#121212] hover:bg-[#121212]/5 transition-all active:scale-95"
            >
              <PhoneIcon className="size-3 sm:size-3.5 text-[#121212]" />
              <span>CALL: 090151 55615</span>
            </a>
          </div>
        </article>

        {/* Right Rail: Vertical Thumbnail Carousel (Desktop Only) */}
        {complementaryPieces.length > 0 && (
          <aside className="hidden lg:flex w-24 shrink-0 flex-col items-center border-l border-[#121212]/10 bg-[#FAF8F5] p-3 space-y-4">
            <p className="font-sans text-[0.55rem] tracking-[0.25em] text-[#888] uppercase text-center mt-6">
              SUITE PIECES
            </p>
            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar py-2">
              {complementaryPieces.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  title={item.name}
                  className="group relative block size-16 overflow-hidden border border-[#121212]/20 transition-all hover:border-[#121212] hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* ── Footer Transition: NEXT CREATION ─────────────────────── */}
      <footer className="border-t border-[#121212]/10 bg-[#F5F2ED] py-6 sm:py-16 px-4 text-center">
        <div className="mx-auto max-w-xl space-y-2 sm:space-y-6">
          <p className="font-sans text-[0.5rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] text-[#777] uppercase font-bold">
            NEXT CREATION
          </p>

          <h3 className="font-display italic text-lg sm:text-5xl text-[#121212] font-normal tracking-tight px-1">
            {nextProduct.name}
          </h3>

          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group relative inline-block overflow-hidden rounded-xs border border-[#121212]/20 shadow-md transition-all hover:scale-105 hover:border-[#121212] active:scale-95"
          >
            <div className="h-24 sm:h-44 w-36 sm:w-64 bg-[#EFECE6] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="bg-[#FAF8F5] p-1.5 sm:p-3 text-center border-t border-[#121212]/10">
              <p className="font-sans text-[0.48rem] sm:text-[0.62rem] text-[#121212] font-bold uppercase tracking-widest">
                DISCOVER →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
