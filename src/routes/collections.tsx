import { useState, useMemo, useEffect, useRef } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { PRODUCTS, CATEGORY_GROUPS, type Product } from "@/data/products";
import { getAllProducts } from "@/data/storeState";
import bridalBannerImg from "@/assets/coll-bridal.jpg";
import craftImg from "@/assets/craft.jpg";
import catalogueIconImg from "@/assets/catalogue_icon.png";
import logoImg from "@/assets/logo.png";

import { CatalogPdfModal } from "@/components/CatalogPdfModal";

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


const title = "Collections — A.P.P. Jewellers, Sarafa Market, New Delhi";
const description =
  "Explore 22K Gold, Solitaire Diamond, Kundan Bridal Sets, Bangles, Chains and Temple Jewellery at A.P.P. Jewellers. Detailed collection directory with virtual try-on and inquiries.";

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
  component: DetailedCollectionsPage,
});

// Interactive Product Image with Mobile Tap & Desktop Hover support + Dot Indicators
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
      className={`relative size-full overflow-hidden select-none cursor-pointer ${className}`}
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

// Quick Inquiry Modal Component
function QuickInquiryModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const whatsappMsg = encodeURIComponent(
    `Hi A.P.P. Jewellers, I would like to get a price quote and details for "${product.name}" (Category: ${product.category}, Purity: ${product.purity}) from your collection directory.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-onyx border border-gold/50 rounded-sm p-6 sm:p-8 shadow-2xl overflow-hidden text-foreground">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-gold text-xl font-bold p-2"
        >
          ✕
        </button>

        <div className="grid gap-6 sm:grid-cols-2 items-center">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded border border-border bg-black/40">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
            {product.purity && (
              <span className="absolute top-3 left-3 bg-gold text-primary-foreground text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs shadow">
                {product.purity}
              </span>
            )}
          </div>

          <div className="text-left">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-semibold">
              {product.category} · {product.metal}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-foreground font-semibold mt-1">
              {product.name}
            </h3>
            <p className="mt-2 text-xs font-light text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>

            <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground border-y border-border/60 py-3">
              <div className="flex justify-between">
                <dt className="text-gold font-medium">Purity Rating:</dt>
                <dd className="text-foreground">{product.purity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gold font-medium">Metal Base:</dt>
                <dd className="text-foreground">{product.metal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gold font-medium">Availability:</dt>
                <dd className="text-emerald-400 font-bold">In Stock at Sarafa Market</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <a
                href={`https://wa.me/919015155615?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="shine-sweep flex items-center justify-center gap-2 w-full rounded border border-emerald-500/70 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-emerald-400 font-bold text-center hover:bg-emerald-500/10 hover:border-emerald-400 transition-all shadow-lg"
              >
                <WhatsAppIcon className="size-4 text-emerald-400" /> Price on Request via WhatsApp
              </a>

              <a
                href="tel:09015155615"
                className="flex items-center justify-center gap-2 w-full rounded border border-gold/70 px-4 py-2.5 text-xs uppercase tracking-widest text-gold font-bold text-center hover:bg-gold hover:text-primary-foreground transition-colors"
              >
                <PhoneIcon className="size-4 text-gold" /> Call Store: 090151 55615
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  SearchIcon,
  DiamondIcon,
  RingIcon,
  CrownIcon,
  NecklaceIcon,
  EarringIcon,
  CoinIcon,
  MirrorIcon,
  HeartIcon,
  SparklesIcon,
  WhatsAppIcon,
  PhoneIcon,
  CloseIcon,
} from "@/components/LuxuryIcons";

// Top Category Mega-Menu Data with Vector SVG Icons
const MEGA_NAV_ITEMS = [
  { id: "ALL", label: "All Jewellery", IconComponent: SparklesIcon },
  { id: "GOLD", label: "22K Gold", IconComponent: CrownIcon },
  { id: "DIAMOND", label: "Solitaire Diamond", IconComponent: DiamondIcon },
  { id: "EARRINGS", label: "Earrings & Jhumka", IconComponent: EarringIcon },
  { id: "RINGS", label: "Rings & Bands", IconComponent: RingIcon },
  { id: "DAILY WEAR", label: "Daily Wear", IconComponent: NecklaceIcon },
  { id: "WEDDING", label: "Bridal & Wedding", IconComponent: CrownIcon },
  { id: "GOLD COIN", label: "Gold Coins", IconComponent: CoinIcon },
];

const MEGA_SUB_CATEGORIES: Record<string, Array<{ name: string; IconComponent: any; cat: string }>> = {
  GOLD: [
    { name: "Gold Bangles", IconComponent: RingIcon, cat: "BANGLES" },
    { name: "Gold Bracelets", IconComponent: RingIcon, cat: "BRACELETS" },
    { name: "Gold Earrings", IconComponent: EarringIcon, cat: "EARRINGS" },
    { name: "Gold Chains", IconComponent: NecklaceIcon, cat: "CHAIN" },
    { name: "Gold Pendants", IconComponent: NecklaceIcon, cat: "PENDANT" },
    { name: "Gold Rings", IconComponent: RingIcon, cat: "RINGS" },
    { name: "Gold Engagement Rings", IconComponent: DiamondIcon, cat: "ENGAGEMENT RINGS" },
    { name: "Gold Necklaces", IconComponent: CrownIcon, cat: "NECKLACE" },
    { name: "Gold Nose Pins", IconComponent: SparklesIcon, cat: "NOSE STUDS" },
    { name: "Gold Kadas", IconComponent: RingIcon, cat: "KADA" },
    { name: "Gold Mangalsutras", IconComponent: NecklaceIcon, cat: "MANGALSUTRA" },
  ],
  DIAMOND: [
    { name: "Solitaire Rings", IconComponent: DiamondIcon, cat: "RINGS" },
    { name: "Diamond Necklaces", IconComponent: CrownIcon, cat: "NECKLACE" },
    { name: "Diamond Earrings", IconComponent: EarringIcon, cat: "EARRINGS" },
    { name: "Diamond Bracelets", IconComponent: RingIcon, cat: "BRACELETS" },
    { name: "Diamond Mangalsutra", IconComponent: NecklaceIcon, cat: "MANGALSUTRA" },
  ],
  EARRINGS: [
    { name: "Kundan Jhumkas", IconComponent: EarringIcon, cat: "JHUMKA" },
    { name: "Gold Studs", IconComponent: SparklesIcon, cat: "STUDS" },
    { name: "Drop Earrings", IconComponent: EarringIcon, cat: "EARRINGS" },
    { name: "Second Studs", IconComponent: SparklesIcon, cat: "SECOND STUD" },
  ],
  WEDDING: [
    { name: "Full Bridal Sets", IconComponent: CrownIcon, cat: "BRIDAL SET" },
    { name: "Kasu Mala Haram", IconComponent: NecklaceIcon, cat: "HARAM" },
    { name: "Bridal Nath", IconComponent: SparklesIcon, cat: "BRIDAL NATH" },
    { name: "Maang Tikka", IconComponent: CrownIcon, cat: "MAANG TIKKA" },
    { name: "Vaddanam Belt", IconComponent: SparklesIcon, cat: "VADDANAM" },
  ],
};

function DetailedCollectionsPage() {
  // State
  const [allProducts, setAllProducts] = useState<Product[]>(getAllProducts());

  // 3D Orbit Background state & scroll tracking
  const mainRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [orbitReady, setOrbitReady] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = ORBIT_COUNT + 1;
    [...ORBIT_FRAMES, MACRO_FRAME].forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => { loaded++; if (loaded >= total) setOrbitReady(true); };
      img.onerror = () => { loaded++; if (loaded >= total) setOrbitReady(true); };
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      setScrollProgress(clamp(raw, 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Orbit frame calculations
  const orbitProgress = smoothstep(0.02, 0.90, scrollProgress);
  const floatFrame = orbitProgress * (ORBIT_COUNT - 1);
  const activeIdx = Math.min(Math.floor(floatFrame), ORBIT_COUNT - 2);
  const blend = floatFrame - activeIdx;
  const macroBlend = smoothstep(0.82, 0.92, scrollProgress);
  const footerFadeOut = 1 - smoothstep(0.88, 0.98, scrollProgress);
  const zoomScale = 1.0 + orbitProgress * 0.15;

  useEffect(() => {
    const syncInventory = () => setAllProducts(getAllProducts());
    syncInventory();
    window.addEventListener("app_inventory_updated", syncInventory);
    return () => window.removeEventListener("app_inventory_updated", syncInventory);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeMetal, setActiveMetal] = useState<string>("ALL");
  const [activePurity, setActivePurity] = useState<string>("ALL");
  const [activePriceRange, setActivePriceRange] = useState<string>("ALL");
  const [activeOccasion, setActiveOccasion] = useState<string>("ALL");
  const [activeForWhom, setActiveForWhom] = useState<string>("ALL");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("BEST_MATCHES");

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"category" | "metal" | "purity" | "price" | "sort">("category");

  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [isCatalogPdfModalOpen, setIsCatalogPdfModalOpen] = useState<boolean>(false);

  // Toggle Wishlist
  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Efficient Filtering Engine
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat =
        activeCategory === "ALL" ||
        p.category.toUpperCase() === activeCategory.toUpperCase() ||
        p.collection.toUpperCase().includes(activeCategory.toUpperCase());

      const matchMetal =
        activeMetal === "ALL" || p.metal.toUpperCase() === activeMetal.toUpperCase();

      const matchPurity =
        activePurity === "ALL" || p.purity.toUpperCase().includes(activePurity.toUpperCase());

      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metal.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPrice =
        activePriceRange === "ALL" ||
        (activePriceRange === "UNDER_25K" && (p.category.includes("RING") || p.category.includes("EAR") || p.category.includes("COIN"))) ||
        (activePriceRange === "25K_50K" && (p.category.includes("BANG") || p.category.includes("CHAIN") || p.category.includes("KADA"))) ||
        (activePriceRange === "50K_100K" && (p.category.includes("HARAM") || p.category.includes("PEND") || p.category.includes("JHUMKA"))) ||
        (activePriceRange === "ABOVE_100K" && (p.category.includes("SET") || p.category.includes("BRIDAL") || p.category.includes("SOLITAIRE")));

      return matchCat && matchMetal && matchPurity && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "NEWEST") return b.slug.localeCompare(a.slug);
      if (sortBy === "PURITY") return b.purity.localeCompare(a.purity);
      return 0; // BEST_MATCHES default
    });
  }, [allProducts, activeCategory, activeMetal, activePurity, activePriceRange, searchQuery, sortBy]);

  // Lazy Loading / Infinite Scroll State for High-Performance Rendering
  const BATCH_SIZE = 24;
  const [displayLimit, setDisplayLimit] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Reset batch limit whenever user changes filter criteria
  useEffect(() => {
    setDisplayLimit(BATCH_SIZE);
  }, [activeCategory, activeMetal, activePurity, activePriceRange, searchQuery, sortBy]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayLimit);
  }, [filteredProducts, displayLimit]);

  const hasMore = displayLimit < filteredProducts.length;

  // Auto load next batch on scroll using IntersectionObserver
  useEffect(() => {
    if (!hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayLimit((prev) => prev + BATCH_SIZE);
            setIsLoadingMore(false);
          }, 450);
        }
      },
      { rootMargin: "250px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);


  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 3-SECOND FULL PAGE LUXURY LOADER */}
      {pageLoading && (
        <div className="fixed inset-0 z-[100] bg-[#0a0203] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-700 animate-fadeIn">
          {/* Ambient Glow Backdrop */}
          <div className="absolute size-[500px] bg-gradient-to-r from-rose-900/30 via-gold/20 to-amber-900/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Spinning Gold Halo Ring with Brand Crest Logo */}
            <div className="relative size-28 sm:size-36 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 border-t-gold animate-spin shadow-[0_0_25px_rgba(212,175,55,0.4)]" />
              <div className="absolute inset-2 rounded-full border border-gold/40 border-b-amber-300 animate-spin [animation-duration:4s]" />
              <img
                src={logoImg}
                alt="A.P.P. Jewellers"
                className="size-16 sm:size-20 object-contain animate-pulse filter brightness-110 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
              />
            </div>

            <div className="space-y-2">
              <span className="eyebrow text-[0.6rem] sm:text-xs tracking-[0.4em] text-gold uppercase font-semibold">
                Sarafa Market Atelier
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-amber-100 font-bold tracking-wider">
                A.P.P. <span className="italic shimmer-text font-serif">Jewellers</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light tracking-widest uppercase">
                Curating Fine Gold & Solitaire Collections...
              </p>
            </div>

            {/* Live Animated 3-Second Gold Progress Bar */}
            <div className="w-56 sm:w-72 h-1 bg-onyx/90 rounded-full overflow-hidden border border-gold/40 shadow-inner">
              <div className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold animate-progress-3s shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
            </div>
          </div>
        </div>
      )}

      <Nav />
      <main ref={mainRef} className="relative page-enter px-3 sm:px-8 pb-32 pt-24 sm:pt-36 bg-background text-foreground min-h-screen">
        {/* ══════════════════════════════════════════════════════════ */}
        {/*  3D ORBIT BACKGROUND LAYER (Fixed & Fades Out at Footer)  */}
        {/* ══════════════════════════════════════════════════════════ */}
        {footerFadeOut > 0.005 && (
          <div
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform"
            style={{ transform: `scale(${zoomScale})` }}
          >
              {orbitReady && ORBIT_FRAMES.map((src, i) => {
                let opacity = 0;
                if (i === activeIdx) opacity = 1 - blend;
                else if (i === activeIdx + 1) opacity = blend;
                opacity *= (1 - macroBlend) * footerFadeOut;
                if (opacity < 0.005) return null;

                return (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full select-none"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 40%",
                      opacity: opacity * 0.28,
                      filter: "brightness(0.65) contrast(1.1) saturate(0.85)",
                    }}
                    draggable={false}
                  />
                );
              })}

              {/* Macro close-up frame */}
              {macroBlend > 0.01 && (
                <img
                  src={MACRO_FRAME}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full select-none"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                    opacity: macroBlend * footerFadeOut * 0.28,
                    filter: "brightness(0.65) contrast(1.1) saturate(0.85)",
                  }}
                  draggable={false}
                />
              )}

              {/* Dark Radial Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 130% 90% at 50% 50%, rgba(10,2,3,0.7) 0%, rgba(10,2,3,0.88) 60%, rgba(10,2,3,0.95) 100%)",
                  opacity: footerFadeOut,
                }}
              />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* PREMIUM COLLECTION LUXURY HEADER */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-5xl font-bold text-amber-100 tracking-wide leading-tight">
              Our <span className="italic shimmer-text font-serif">Premium Collection</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Handcrafted 22K BIS Hallmarked Gold, Certified Solitaire Diamonds & Royal Kundan Masterpieces.
            </p>
            <div className="rule-gold mx-auto mt-3 sm:mt-4 w-28 sm:w-36" />
          </div>

          {/* CLEAN SEARCH BAR */}
          <div className="bg-gradient-to-r from-[#4a0810] via-[#210406] to-[#4a0810] border border-gold/50 rounded-lg p-3 sm:p-4 shadow-2xl">
            {/* Search Input */}
            <div className="relative flex items-center w-full">
              <SearchIcon className="absolute left-4 size-4.5 text-gold" />
              <input
                type="text"
                placeholder="Search rings, bangles, haram, kundan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-onyx/90 border border-gold/40 focus:border-gold rounded-full pl-11 pr-10 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs text-gold hover:text-white"
                >
                  <CloseIcon className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* MOBILE CONTROL BAR & PRODUCT GRID (Full-Width 2-Col Grid on Mobile) */}
          <div className="lg:hidden mt-4">
            {/* Mobile Filter & Sort Control Bar */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-onyx/90 border border-gold/40 mb-3 shadow-lg">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="shine-sweep flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold/20 border border-gold text-gold font-bold text-[0.62rem] uppercase tracking-wider shadow"
              >
                <span>⚙️ Filter Facets</span>
                {(activeCategory !== "ALL" || activeMetal !== "ALL" || activePurity !== "ALL") && (
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[0.58rem] text-gold font-semibold uppercase tracking-wider">
                  {visibleProducts.length} Items
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-gold/40 rounded px-2 py-1 text-[0.58rem] text-gold font-bold outline-none"
                >
                  <option value="BEST_MATCHES">Sort: Matches</option>
                  <option value="NEWEST">Sort: Newest</option>
                  <option value="PURITY">Sort: Purity</option>
                </select>
              </div>
            </div>

            {/* Mobile Product Grid - Full Width 2 Columns */}
            <div className="grid grid-cols-2 gap-2.5">
              {visibleProducts.map((product, idx) => {
                const isWishlisted = wishlist.includes(product.slug);
                return (
                  <div
                    key={product.slug}
                    className="group relative flex flex-col justify-between bg-onyx/80 border border-border/80 rounded-sm overflow-hidden shadow-lg"
                  >
                    <div className="relative block h-44 w-full overflow-hidden bg-black/40">
                      <ProductHoverImage
                        image={product.image}
                        hoverImage={product.hoverImage}
                        alt={product.name}
                      />
                      <div className="absolute top-1.5 left-1.5">
                        {product.purity && (
                          <span className="glass-panel text-gold font-bold text-[0.5rem] uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                            {product.purity}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.slug)}
                        className="absolute top-1.5 right-1.5 glass-panel p-1 rounded-full"
                      >
                        <HeartIcon
                          filled={isWishlisted}
                          className={`size-3.5 ${isWishlisted ? "text-rose-500" : "text-gold/80"}`}
                        />
                      </button>
                    </div>

                    <div className="p-2.5 flex flex-col justify-between flex-1 text-center">
                      <div>
                        <p className="text-[0.52rem] uppercase tracking-wider text-gold font-medium truncate">
                          {product.category} · {product.metal}
                        </p>
                        <h3 className="mt-0.5 font-display text-xs text-foreground font-semibold leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-border/40">
                        <button
                          type="button"
                          onClick={() => setInquiryProduct(product)}
                          className="shine-sweep w-full rounded bg-gold/15 border border-gold/50 py-1.5 text-[0.55rem] uppercase tracking-widest text-gold font-bold text-center"
                        >
                          PRICE ON REQUEST
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Load More Button / Sentinel */}
            {hasMore && (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 py-4">
                <button
                  type="button"
                  onClick={() => setDisplayLimit((prev) => prev + 12)}
                  className="shine-sweep rounded-full bg-gold/20 border border-gold px-8 py-3 text-xs uppercase tracking-[0.25em] text-gold font-bold shadow-lg hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  Load More Articles ({visibleProducts.length} of {filteredProducts.length})
                </button>
              </div>
            )}
          </div>

          {/* DESKTOP CONTENT AREA: Left Facet Filter Sidebar + Right Product Grid */}
          <div className="hidden lg:grid mt-8 gap-6 lg:grid-cols-[270px_1fr] items-start">
            {/* Left Filter Sidebar with Floating Sticky Scroll */}
            <aside className="bg-onyx/90 border border-gold/40 rounded-lg p-5 space-y-6 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-gold/30 pb-3">
                <div>
                  <h3 className="font-display text-base text-gold font-bold uppercase tracking-wider">
                    Filter Facets
                  </h3>
                  <p className="text-[0.6rem] text-muted-foreground mt-0.5">
                    {filteredProducts.length} Items Found
                  </p>
                </div>
                {(activeCategory !== "ALL" || activeMetal !== "ALL" || activePurity !== "ALL" || activePriceRange !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("ALL");
                      setActiveMetal("ALL");
                      setActivePurity("ALL");
                      setActivePriceRange("ALL");
                    }}
                    className="text-[0.6rem] text-gold underline hover:text-white uppercase tracking-widest font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Catalogue PDF Download Luxury Card */}
              <div className="p-3.5 rounded-md bg-gradient-to-br from-[#4a0810] via-onyx to-[#210406] border border-gold/50 text-center space-y-2 shadow-xl">
                <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold flex items-center justify-center gap-1">
                  <CrownIcon className="size-3.5 text-gold" /> Catalogue PDF
                </p>
                <h4 className="font-display text-sm text-amber-200 font-bold leading-tight">
                  Download 2026 Collection Book
                </h4>
                <p className="text-[0.6rem] text-muted-foreground leading-normal">
                  Ultra-high resolution PDF with 22K gold specs, purity grades & WhatsApp inquiry links.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCatalogPdfModalOpen(true)}
                  className="shine-sweep w-full rounded bg-gradient-to-r from-gold via-amber-300 to-gold py-2 text-[0.62rem] uppercase tracking-widest text-primary-foreground font-bold shadow hover:brightness-110 flex items-center justify-center gap-1"
                >
                  <CrownIcon className="size-3 text-primary-foreground" /> Download PDF
                </button>
              </div>



              {/* Category Facet */}
              <div className="border-t border-border/50 pt-4">
                <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground font-semibold mb-2">
                  Category
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground max-h-48 overflow-y-auto pr-1">
                  {[
                    "ALL",
                    "RINGS",
                    "BANGLES",
                    "EARRINGS",
                    "JHUMKA",
                    "NECKLACE",
                    "HARAM",
                    "PENDANT",
                    "BRIDAL SET",
                    "MANGALSUTRA",
                    "GOLD COIN",
                    "CHAIN",
                    "KADA",
                  ].map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left w-full text-[0.65rem] uppercase tracking-wider py-1 px-2 rounded transition-colors ${
                          activeCategory === cat
                            ? "bg-gold/20 text-gold font-bold border-l-2 border-gold"
                            : "hover:text-foreground hover:bg-background/40"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metal & Gemstone Facet */}
              <div className="border-t border-border/50 pt-4">
                <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground font-semibold mb-2">
                  Metal & Gemstone
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["ALL", "GOLD", "DIAMOND", "PLATINUM", "SILVER", "GEMSTONE"].map((metal) => (
                    <li key={metal}>
                      <button
                        type="button"
                        onClick={() => setActiveMetal(metal)}
                        className={`text-left w-full text-[0.65rem] uppercase tracking-wider py-1 px-2 rounded transition-colors ${
                          activeMetal === metal
                            ? "bg-gold/20 text-gold font-bold border-l-2 border-gold"
                            : "hover:text-foreground hover:bg-background/40"
                        }`}
                      >
                        {metal}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold Purity Rating */}
              <div className="border-t border-border/50 pt-4">
                <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground font-semibold mb-2">
                  Purity Grade
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["ALL", "24 CARAT", "22 CARAT", "20 CARAT", "18 CARAT"].map((pur) => (
                    <li key={pur}>
                      <button
                        type="button"
                        onClick={() => setActivePurity(pur)}
                        className={`text-left w-full text-[0.65rem] uppercase tracking-wider py-1 px-2 rounded transition-colors ${
                          activePurity === pur
                            ? "bg-gold/20 text-gold font-bold border-l-2 border-gold"
                            : "hover:text-foreground hover:bg-background/40"
                        }`}
                      >
                        {pur}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right Product Grid Column */}
            <div>
              {/* Counter status badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-border/50">
                <p className="text-xs uppercase tracking-widest text-gold font-semibold">
                  Showing <span className="text-foreground font-bold">{visibleProducts.length}</span> of <span className="text-foreground font-bold">{filteredProducts.length}</span> Jewellery Items
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCatalogPdfModalOpen(true)}
                    className="shine-sweep flex items-center gap-1.5 rounded bg-gold/15 border border-gold/50 px-3 py-1 text-[0.62rem] uppercase tracking-widest text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-all shadow"
                  >
                    <CrownIcon className="size-3.5 text-gold" /> Save Catalogue PDF
                  </button>
                  <span className="text-[0.62rem] text-muted-foreground hidden sm:inline-block">
                    Contact us for current gold rate & best price
                  </span>
                </div>
              </div>

              {/* Product Grid showcasing cards without pricing - 2 cols on mobile */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                {visibleProducts.map((product, idx) => {
                  const isWishlisted = wishlist.includes(product.slug);

                  // Inject an In-Grid Campaign Banner after every 6 items matching Tanishq Screenshot 3
                  const showInGridBanner = idx > 0 && idx % 6 === 0;

                  return (
                    <div key={product.slug} className="contents">
                      {showInGridBanner && (
                        <div className="col-span-full my-4 sm:my-6 p-4 sm:p-8 rounded bg-gradient-to-r from-[#4a0810] via-[#210406] to-onyx border border-gold/40 text-center relative overflow-hidden shadow-2xl">
                          <span className="eyebrow text-[0.58rem]">Everyday Luxury</span>
                          <h3 className="font-display text-xl sm:text-3xl text-amber-200 font-bold mt-1">
                            Dailywear & Kundan Heritage Collection
                          </h3>
                          <p className="mt-1.5 text-xs text-muted-foreground max-w-xl mx-auto font-light hidden sm:block">
                            Crafted for effortless elegance and lasting durability. Certified 22K BIS Hallmarked gold with lifetime polish warranty.
                          </p>
                          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => setActiveCategory("DAILY WEAR")}
                              className="shine-sweep rounded bg-gold px-4 sm:px-6 py-2 text-[0.62rem] sm:text-xs uppercase tracking-widest text-primary-foreground font-bold"
                            >
                              Explore Dailywear Rings
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveCategory("JHUMKA")}
                              className="rounded border border-gold/60 px-4 sm:px-6 py-2 text-[0.62rem] sm:text-xs uppercase tracking-widest text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-colors"
                            >
                              Explore Dailywear Earrings
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Detailed Product Card WITHOUT PRICING */}
                      <div className="group relative flex flex-col justify-between bg-onyx/80 border border-border/80 rounded-sm overflow-hidden lift transition-all duration-500 hover:border-gold/60">
                        {/* Image Box - Compact height on mobile */}
                        <div className="relative block h-40 sm:h-72 w-full overflow-hidden bg-black/40">
                          <ProductHoverImage
                            image={product.image}
                            hoverImage={product.hoverImage}
                            alt={product.name}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent opacity-80 pointer-events-none" />

                          {/* Top Left Badges */}
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
                            {product.purity && (
                              <span className="glass-panel text-gold font-bold text-[0.5rem] sm:text-[0.55rem] uppercase tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xs shadow">
                                {product.purity}
                              </span>
                            )}
                            {idx % 3 === 0 && (
                              <span className="bg-rose-900/80 text-rose-200 text-[0.5rem] sm:text-[0.55rem] font-bold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-xs border border-rose-500/40 hidden sm:inline-block">
                                Only 1 left!
                              </span>
                            )}
                          </div>

                          {/* Top Right Wishlist Heart */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.slug)}
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 glass-panel p-1.5 sm:p-2 rounded-full transition-transform hover:scale-110"
                          >
                            <HeartIcon
                              filled={isWishlisted}
                              className={`size-3.5 sm:size-4 ${isWishlisted ? "text-rose-500" : "text-gold/80"}`}
                            />
                          </button>

                          {/* Hover Quick Action Buttons matching Tanishq Screenshot 1 */}
                          <div className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => setInquiryProduct(product)}
                              className="w-full bg-gold text-primary-foreground font-bold text-[0.55rem] sm:text-[0.62rem] uppercase tracking-widest py-1.5 sm:py-2.5 rounded text-center shine-sweep shadow-lg"
                            >
                              Inquire Now
                            </button>
                          </div>
                        </div>

                        {/* Content WITHOUT PRICING */}
                        <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 text-center">
                          <div>
                            <p className="text-[0.52rem] sm:text-[0.58rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold font-medium truncate">
                              {product.category} · {product.metal}
                            </p>
                            <h3 className="mt-1 font-display text-sm sm:text-2xl text-foreground font-semibold leading-snug line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-[0.68rem] sm:text-xs font-light text-muted-foreground line-clamp-1 sm:line-clamp-2">
                              {product.tagline}
                            </p>
                          </div>

                          <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-border/50">
                            <a
                              href={`https://wa.me/919015155615?text=${encodeURIComponent(
                                `Hi A.P.P. Jewellers, I would like to get a price quote and details for "${product.name}" (Category: ${product.category}, Purity: ${product.purity}) from your collection directory.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="shine-sweep w-full rounded bg-[#e8e2d5]/10 border border-gold/50 px-2 sm:px-4 py-1.5 sm:py-2.5 text-[0.55rem] sm:text-[0.62rem] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold font-bold text-center transition-all duration-300 hover:bg-gold hover:text-primary-foreground flex items-center justify-center gap-1.5"
                            >
                              <WhatsAppIcon className="size-3.5 text-emerald-400 shrink-0" />
                              <span>PRICE ON REQUEST</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Store Logo Animated Loader Sentinel */}
                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="col-span-full py-12 flex flex-col items-center justify-center gap-3 animate-fadeIn"
                  >
                    <div className="relative size-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
                      <img
                        src="/logo-transparent.png"
                        alt="A.P.P. Jewellers Loading"
                        className="size-9 object-contain animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                      />
                    </div>
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold font-bold">
                      Loading More Masterpieces...
                    </p>
                    <p className="text-[0.58rem] text-muted-foreground">
                      Showing {visibleProducts.length} of {filteredProducts.length} certified items
                    </p>
                  </div>
                )}
              </div>


              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-onyx/50 border border-border/40 rounded-sm mt-8 p-8">
                  <p className="text-lg text-foreground font-display">No pieces match your selected filter criteria.</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    We craft custom designs for any category or purity rating! Contact our master goldsmiths.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("ALL");
                      setActiveMetal("ALL");
                      setActivePurity("ALL");
                      setSearchQuery("");
                    }}
                    className="mt-6 shine-sweep rounded bg-gold px-6 py-2.5 text-xs text-primary-foreground uppercase font-bold tracking-widest"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* LUXURY 2-COLUMN TABBED MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-md animate-fadeIn lg:hidden">
          <div className="bg-[#120305] border-t border-gold/50 rounded-t-2xl flex flex-col h-[80vh] max-h-[620px] shadow-2xl overflow-hidden text-foreground">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gold/30 bg-onyx/90">
              <div>
                <h3 className="font-display text-base text-gold font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>Refine Collection</span>
                  {(activeCategory !== "ALL" || activeMetal !== "ALL" || activePurity !== "ALL") && (
                    <span className="text-[0.55rem] bg-gold text-primary-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                      Active Filters
                    </span>
                  )}
                </h3>
                <p className="text-[0.6rem] text-muted-foreground mt-0.5">
                  Showing {filteredProducts.length} certified items
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="size-8 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center font-bold text-sm hover:bg-gold hover:text-primary-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 2-Column Master-Detail Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Tab Rail (35% Width) */}
              <div className="w-[35%] bg-onyx/60 border-r border-gold/20 flex flex-col overflow-y-auto">
                {[
                  { id: "category", label: "Category", active: activeCategory !== "ALL" },
                  { id: "metal", label: "Metal / Gem", active: activeMetal !== "ALL" },
                  { id: "purity", label: "Purity Grade", active: activePurity !== "ALL" },
                  { id: "sort", label: "Sort By", active: sortBy !== "BEST_MATCHES" },
                ].map((tab) => {
                  const isSelected = mobileTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMobileTab(tab.id as any)}
                      className={`p-3.5 text-left border-b border-gold/10 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#38090d] text-gold border-l-4 border-l-gold font-bold shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-onyx/40"
                      }`}
                    >
                      <span className="truncate">{tab.label}</span>
                      {tab.active && (
                        <span className="size-2 rounded-full bg-gold shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Options Panel (65% Width) */}
              <div className="w-[65%] p-4 overflow-y-auto bg-background/50">
                {/* TAB 1: CATEGORIES */}
                {mobileTab === "category" && (
                  <div className="space-y-2">
                    <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold mb-3">
                      Select Jewellery Type
                    </p>
                    {[
                      { label: "All Categories", val: "ALL" },
                      { label: "Rings & Bands", val: "RINGS" },
                      { label: "Bangles & Kadas", val: "BANGLES" },
                      { label: "Earrings & Studs", val: "EARRINGS" },
                      { label: "Jhumkas", val: "JHUMKA" },
                      { label: "Necklaces & Sets", val: "NECKLACE" },
                      { label: "Bridal Haram", val: "HARAM" },
                      { label: "Pendants", val: "PENDANT" },
                      { label: "Bridal Suites", val: "BRIDAL SET" },
                      { label: "Mangalsutra", val: "MANGALSUTRA" },
                      { label: "22K Gold Coins", val: "GOLD COIN" },
                      { label: "Chains", val: "CHAIN" },
                    ].map((item) => {
                      const isSelected = activeCategory === item.val;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setActiveCategory(item.val)}
                          className={`w-full p-2.5 rounded text-left text-xs font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-gold/20 text-gold border-gold font-bold shadow"
                              : "bg-onyx/40 border-border/40 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isSelected && <span className="text-gold font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* TAB 2: METAL & GEMSTONE */}
                {mobileTab === "metal" && (
                  <div className="space-y-2">
                    <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold mb-3">
                      Select Precious Metal / Gem
                    </p>
                    {[
                      { label: "All Metals & Gems", val: "ALL" },
                      { label: "22K / 18K Yellow Gold", val: "GOLD" },
                      { label: "GIA / IGI Solitaire Diamond", val: "DIAMOND" },
                      { label: "Pure Platinum 950", val: "PLATINUM" },
                      { label: "Fine Sterling Silver 925", val: "SILVER" },
                    ].map((item) => {
                      const isSelected = activeMetal === item.val;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setActiveMetal(item.val)}
                          className={`w-full p-2.5 rounded text-left text-xs font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-gold/20 text-gold border-gold font-bold shadow"
                              : "bg-onyx/40 border-border/40 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isSelected && <span className="text-gold font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* TAB 3: PURITY GRADE */}
                {mobileTab === "purity" && (
                  <div className="space-y-2">
                    <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold mb-3">
                      Select Hallmark Purity Grade
                    </p>
                    {[
                      { label: "All Purity Grades", val: "ALL" },
                      { label: "24 Carat (999 Pure)", val: "24 CARAT" },
                      { label: "22 Carat (916 BIS Hallmark)", val: "22 CARAT" },
                      { label: "20 Carat", val: "20 CARAT" },
                      { label: "18 Carat (750 Hallmark)", val: "18 CARAT" },
                    ].map((item) => {
                      const isSelected = activePurity === item.val;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setActivePurity(item.val)}
                          className={`w-full p-2.5 rounded text-left text-xs font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-gold/20 text-gold border-gold font-bold shadow"
                              : "bg-onyx/40 border-border/40 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isSelected && <span className="text-gold font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* TAB 4: SORT BY */}
                {mobileTab === "sort" && (
                  <div className="space-y-2">
                    <p className="text-[0.58rem] uppercase tracking-widest text-gold font-bold mb-3">
                      Sort Products By
                    </p>
                    {[
                      { label: "Best Matches (Default)", val: "BEST_MATCHES" },
                      { label: "Newest Collection Additions", val: "NEWEST" },
                      { label: "Highest Gold Purity Grade", val: "PURITY" },
                    ].map((item) => {
                      const isSelected = sortBy === item.val;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setSortBy(item.val)}
                          className={`w-full p-2.5 rounded text-left text-xs font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-gold/20 text-gold border-gold font-bold shadow"
                              : "bg-onyx/40 border-border/40 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isSelected && <span className="text-gold font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Fixed Action Bar */}
            <div className="p-3 border-t border-gold/30 bg-onyx flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("ALL");
                  setActiveMetal("ALL");
                  setActivePurity("ALL");
                  setSortBy("BEST_MATCHES");
                  setSearchQuery("");
                }}
                className="w-1/3 py-3 rounded border border-gold/40 text-gold text-[0.62rem] uppercase tracking-widest font-bold text-center hover:bg-gold/10"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="shine-sweep w-2/3 py-3 rounded bg-gradient-to-r from-gold via-amber-300 to-gold text-primary-foreground text-[0.62rem] uppercase tracking-[0.2em] font-extrabold shadow-xl text-center"
              >
                Show {filteredProducts.length} Items →
              </button>
            </div>
          </div>
        </div>
      )}




      {/* FLOATING CATALOGUE ICON BUTTON (ICON ONLY) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsCatalogPdfModalOpen(true)}
          aria-label="View & Download Catalogue PDF"
          className="shine-sweep group relative size-14 sm:size-16 rounded-full bg-black p-1 border-2 border-gold/80 shadow-[0_10px_30px_rgba(212,175,55,0.5)] hover:scale-110 hover:border-gold transition-all duration-300 backdrop-blur-md flex items-center justify-center overflow-hidden"
        >
          <img
            src={catalogueIconImg}
            alt="Catalogue PDF"
            className="size-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
          />
        </button>
      </div>

      {/* QUICK INQUIRY MODAL */}
      {inquiryProduct && (
        <QuickInquiryModal
          product={inquiryProduct}
          onClose={() => setInquiryProduct(null)}
        />
      )}

      {/* CATALOGUE PDF MODAL */}
      <CatalogPdfModal
        isOpen={isCatalogPdfModalOpen}
        allProducts={allProducts}
        currentFilteredProducts={filteredProducts}
        activeCategory={activeCategory}
        onClose={() => setIsCatalogPdfModalOpen(false)}
      />

      <Footer />
    </>
  );
}
