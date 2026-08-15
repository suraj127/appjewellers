import { useState, useMemo, useEffect, useRef } from "react";
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
} from "@/components/LuxuryIcons";

/* ── A.P.P. Jewellers 365 Editorial Collection — Sub-Navbar & Orbit Scroll ── */
/* ── 3D Orbit Background Constants for Smooth Scroll Transition ── */
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

/* ── Sub Navigation Bar Items (Like Earlier) ─────────────────────── */
const SUB_NAV_ITEMS = [
  { id: "ALL", label: "All Jewellery", IconComponent: CrownIcon },
  { id: "GOLD", label: "Gold", IconComponent: CrownIcon },
  { id: "DIAMOND", label: "Solitaire Diamond", IconComponent: DiamondIcon },
  { id: "EARRINGS", label: "Earrings & Jhumka", IconComponent: EarringIcon },
  { id: "RINGS", label: "Rings & Bands", IconComponent: RingIcon },
  { id: "DAILY WEAR", label: "Daily Wear", IconComponent: NecklaceIcon },
  { id: "WEDDING", label: "Bridal & Wedding", IconComponent: CrownIcon },
  { id: "GOLD COIN", label: "Gold Coins", IconComponent: CoinIcon },
];

function EditorialCollectionsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(getAllProducts());
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // 3D Orbit Scroll & Viewport Transition State
  const mainRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [orbitReady, setOrbitReady] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = ORBIT_COUNT + 1;
    [...ORBIT_FRAMES, MACRO_FRAME].forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded >= total) setOrbitReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= total) setOrbitReady(true);
      };
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

  const orbitProgress = smoothstep(0.02, 0.90, scrollProgress);
  const floatFrame = orbitProgress * (ORBIT_COUNT - 1);
  const activeIdx = Math.min(Math.floor(floatFrame), ORBIT_COUNT - 2);
  const blend = floatFrame - activeIdx;
  const macroBlend = smoothstep(0.82, 0.92, scrollProgress);
  const footerFadeOut = 1 - smoothstep(0.88, 0.98, scrollProgress);
  const zoomScale = 1.0 + orbitProgress * 0.15;

  useEffect(() => {
    const sync = () => setAllProducts(getAllProducts());
    sync();
    window.addEventListener("app_inventory_updated", sync);
    return () => window.removeEventListener("app_inventory_updated", sync);
  }, []);

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Filter products by selected sub-nav item
  const filteredProducts = useMemo(() => {
    if (activeCategory === "ALL") return allProducts;
    return allProducts.filter((p) => {
      if (activeCategory === "GOLD") return p.metal === "GOLD";
      if (activeCategory === "DIAMOND") return p.metal === "DIAMOND" || p.category.includes("SOLITAIRE");
      if (activeCategory === "EARRINGS") return p.category.includes("EAR") || p.category.includes("JHUMKA") || p.category.includes("STUD");
      if (activeCategory === "RINGS") return p.category.includes("RING");
      if (activeCategory === "DAILY WEAR") return p.category.includes("DAILY") || p.category.includes("CHAIN") || p.category.includes("PENDANT");
      if (activeCategory === "WEDDING") return p.category.includes("BRIDAL") || p.category.includes("HARAM") || p.category.includes("SET") || p.category.includes("VADDANAM");
      if (activeCategory === "GOLD COIN") return p.category.includes("COIN");
      return p.category.toUpperCase().includes(activeCategory.toUpperCase());
    });
  }, [allProducts, activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans antialiased selection:bg-[#E8DFC8] selection:text-[#121212]">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. TOP EDITORIAL BRAND HEADER                               */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 border-b border-[#121212]/10 bg-[#FAF8F5]/95 backdrop-blur-md transition-all shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12 sm:py-5">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-8 object-contain"
            />
            <span className="font-display text-lg tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-3">
              A.P.P. Jewellers — 365
            </span>
          </Link>

          {/* Right: Return Home Action */}
          <Link
            to="/"
            className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#121212] border border-[#121212]/30 rounded-full px-5 py-2 hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
          >
            BACK TO HOME
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SUB NAVIGATION BAR (Like Earlier - Category Icons & Tabs)   */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="border-t border-[#121212]/10 bg-[#FAF8F5]/90 py-2.5 overflow-x-auto no-scrollbar">
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-2 sm:gap-4 px-4 min-w-max">
            {SUB_NAV_ITEMS.map((item) => {
              const isSelected = activeCategory === item.id;
              const Icon = item.IconComponent;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveCategory(item.id)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all ${
                    isSelected
                      ? "bg-[#121212] text-[#FAF8F5] font-bold shadow-sm"
                      : "text-[#555] hover:text-[#121212] hover:bg-[#121212]/5"
                  }`}
                >
                  <Icon
                    className={`size-3.5 transition-colors ${
                      isSelected ? "text-[#FAF8F5]" : "text-[#888] group-hover:text-[#121212]"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. 3D ORBIT SCROLL TRANSITION BACKGROUND                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      {footerFadeOut > 0.005 && (
        <div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform opacity-30"
          style={{ transform: `scale(${zoomScale})` }}
        >
          {orbitReady &&
            ORBIT_FRAMES.map((src, i) => {
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
                    opacity: opacity * 0.15,
                    filter: "grayscale(1) brightness(1.2)",
                  }}
                  draggable={false}
                />
              );
            })}

          {macroBlend > 0.01 && (
            <img
              src={MACRO_FRAME}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                opacity: macroBlend * footerFadeOut * 0.15,
                filter: "grayscale(1) brightness(1.2)",
              }}
              draggable={false}
            />
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. EDITORIAL MAGAZINE EXHIBITION GRID                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <main ref={mainRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-10 lg:px-12 py-12 sm:py-20 space-y-12">
        {/* Editorial Sub-Header Indicator */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <p className="font-sans text-[0.65rem] tracking-[0.35em] uppercase text-[#888] font-semibold">
            ARCHIVE 365 · SARAFA MARKET
          </p>
          <h1 className="font-display italic text-4xl sm:text-6xl text-[#121212] font-normal tracking-tight">
            {activeCategory === "ALL" ? "The Fine Jewelry Exhibition" : SUB_NAV_ITEMS.find((s) => s.id === activeCategory)?.label || "Exhibition Catalog"}
          </h1>
          <p className="font-display text-sm sm:text-base text-[#666] font-light pt-1 leading-relaxed">
            Every piece is forged in 22K/18K certified gold with hand-cut solitaires and master karigar hallmarks.
          </p>
        </div>

        {/* Asymmetric Staggered Masonry Grid with Smooth Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 items-start pt-6">
          {filteredProducts.map((piece, pieceIdx) => {
            // Asymmetric aspect ratio pattern
            const aspectStyles = [
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/3]",
            ];
            const currentAspect = aspectStyles[pieceIdx % aspectStyles.length];
            const isWishlisted = wishlist.includes(piece.slug);

            return (
              <div
                key={piece.slug}
                className={`group relative flex flex-col space-y-3.5 transition-all duration-700 ${
                  pieceIdx % 3 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                {/* Image Box Container */}
                <div
                  onClick={() => setSelectedProduct(piece)}
                  className={`relative w-full ${currentAspect} overflow-hidden bg-[#EFECE6] cursor-pointer shadow-xs transition-all duration-700 ease-out group-hover:shadow-2xl`}
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
                      toggleWishlist(piece.slug);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-xs transition-transform hover:scale-110"
                  >
                    <HeartIcon
                      filled={isWishlisted}
                      className={`size-3.5 ${isWishlisted ? "text-rose-500" : "text-[#121212]"}`}
                    />
                  </button>

                  {/* ── CARTIER HOVER POPOVER CARD (Video 00:04–00:05) ── */}
                  <div className="absolute inset-3 sm:inset-5 bg-[#FFFFFF] border border-[#121212]/15 shadow-2xl p-6 sm:p-7 flex flex-col justify-between items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 z-20 pointer-events-none group-hover:pointer-events-auto">
                    <div className="space-y-2">
                      <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[#888] font-bold">
                        CREATION {pieceIdx + 1}
                      </p>
                      <h4 className="font-display text-base sm:text-xl text-[#121212] uppercase tracking-wider font-normal leading-tight">
                        {piece.name}
                      </h4>
                      <p className="font-display italic text-xs sm:text-sm text-[#666] line-clamp-3 leading-relaxed">
                        {piece.story ||
                          piece.tagline ||
                          "Handcrafted with certified gold purity and master artisan settings."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(piece);
                      }}
                      className="mt-4 w-full py-2.5 px-6 rounded-full border border-[#121212]/70 bg-transparent text-[#121212] font-sans text-[0.62rem] font-bold uppercase tracking-[0.25em] transition-all hover:bg-[#121212] hover:text-[#FAF8F5] shadow-xs"
                    >
                      DISCOVER CREATION
                    </button>
                  </div>
                </div>

                {/* Micro-Caption Directly Beneath Card (Video 00:01 & 00:03) */}
                <div className="space-y-0.5">
                  <p className="font-sans text-[0.62rem] sm:text-[0.68rem] tracking-[0.25em] uppercase text-[#121212] font-medium truncate">
                    {piece.name}
                  </p>
                  <p className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#888]">
                    {piece.purity || "22K GOLD"} · {piece.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. EDITORIAL FOOTER                                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#121212]/10 bg-[#FAF8F5] py-16 px-6 sm:px-12 text-center space-y-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-[#777]">
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

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. FULL-SCREEN ARTICLE READER VIEW (Video 00:08–00:14)       */}
      {/* ════════════════════════════════════════════════════════════ */}
      {selectedProduct && (
        <EditorialPieceReader
          product={selectedProduct}
          allProducts={allProducts}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}
    </div>
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] text-[#121212] animate-fadeIn">
      {/* ── Top Bar (Video 00:08) ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#121212]/10 bg-[#FAF8F5]/95 px-6 py-4 sm:px-12 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-8 object-contain"
          />
          <span className="font-display text-sm tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-3">
            Cartier — 365 Archive
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 rounded-full border border-[#121212]/30 px-4 py-1.5 font-sans text-[0.65rem] tracking-[0.25em] uppercase hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
        >
          <span>CLOSE</span>
          <span className="text-base leading-none">✕</span>
        </button>
      </header>

      {/* ── Main Container with Left & Right Rails (Video 00:08–00:10) */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl">
        {/* Left Rail: Vertical "BACK TO GALLERY" */}
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

        {/* Center Article Content (Video 00:08–00:13) */}
        <article className="flex-1 px-6 py-12 sm:px-16 lg:px-20 max-w-4xl mx-auto space-y-16">
          {/* Article Header */}
          <div className="text-center space-y-3">
            <p className="font-sans text-[0.65rem] tracking-[0.35em] uppercase text-[#777] font-semibold">
              {product.collection || "EXHIBITION ARCHIVE"} · CREATION {product.slug.slice(-2).toUpperCase() || "01"}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#121212]">
              {product.name}
            </h1>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#888] pt-1">
              {product.purity || "22K GOLD"} · {product.metal} · SKU-{product.slug.slice(-4).toUpperCase()}
            </p>
          </div>

          {/* Large Hero Image (Video 00:09) */}
          <div className="relative overflow-hidden rounded-xs border border-[#121212]/10 bg-[#EFECE6] shadow-sm">
            <div className="relative h-[420px] sm:h-[580px] lg:h-[680px] w-full overflow-hidden">
              <img
                src={currentImg}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 border-t border-[#121212]/10 bg-[#FAF8F5] p-3">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-14 w-14 overflow-hidden border transition-all ${
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
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <p className="font-display text-xl sm:text-2xl leading-relaxed text-[#222] font-light">
              {product.story ||
                product.tagline ||
                "Conceived as an emblem of royal Indian heritage, this masterpiece combines timeless geometry with meticulously hand-carved floral details."}
            </p>
          </div>

          {/* Editorial Q&A Craft Breakdown (Exact Match to Video 00:11–00:12) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-b border-[#121212]/10 py-12">
            {/* Left Photo with vertical credits along edge */}
            <div className="md:col-span-5 relative">
              <div className="relative h-80 w-full overflow-hidden bg-[#EFECE6] border border-[#121212]/10">
                <img
                  src={craftImg}
                  alt="Craftsmanship Atelier"
                  className="h-full w-full object-cover filter grayscale contrast-125"
                />
              </div>
              <p className="mt-2 font-sans text-[0.52rem] tracking-[0.25em] text-[#888] uppercase">
                HANDCRAFTED AT SEELAMPUR ATELIER — BIS HALLMARKED 22K/18K
              </p>
            </div>

            {/* Right Q&A Dialog (Video 00:12 Style) */}
            <div className="md:col-span-7 space-y-6 font-display">
              <div>
                <p className="text-lg font-medium text-[#121212]">
                  Gold Purity & Assay Grade?
                </p>
                <p className="text-base text-[#555] italic mt-1 font-light">
                  {product.purity || "22 CARAT (916)"} — 100% BIS Hallmarked at Delhi Assay Centre.
                </p>
              </div>

              <div>
                <p className="text-lg font-medium text-[#121212]">
                  Artisan Setting & Forging Technique?
                </p>
                <p className="text-base text-[#555] italic mt-1 font-light">
                  {product.craftsmanship?.[1]?.[1] || "Traditional Hand-Forged & Prong Setting."}
                </p>
              </div>

              <div>
                <p className="text-lg font-medium text-[#121212]">
                  Artisan Hours Dedicated?
                </p>
                <p className="text-base text-[#555] italic mt-1 font-light">
                  {product.craftsmanship?.[0]?.[1] || "120 Hours of Dedicated Karigar Artistry."}
                </p>
              </div>

              <div>
                <p className="text-lg font-medium text-[#121212]">
                  A characteristic you share with this creation?
                </p>
                <p className="text-base text-[#555] italic mt-1 font-light">
                  "I feel at my best when I'm most confidently my true feminine self. It allows me to be raw and brave with choices."
                </p>
              </div>
            </div>
          </div>

          {/* Action Button: WhatsApp Price Inquiry */}
          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/919015155615?text=${whatsappInquiry}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#121212] bg-[#121212] px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#FAF8F5] shadow-md transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212]"
            >
              <WhatsAppIcon className="size-4 text-current" />
              <span>REQUEST PRICE & SPECIFICATIONS</span>
            </a>
          </div>
        </article>

        {/* Right Rail: Vertical Thumbnail Carousel */}
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

      {/* ── Footer Transition: NEXT CREATION (Video 00:13–00:14) ───── */}
      <footer className="border-t border-[#121212]/10 bg-[#F5F2ED] py-16 px-6 text-center">
        <div className="mx-auto max-w-xl space-y-6">
          <p className="font-sans text-xs tracking-[0.35em] text-[#777] uppercase font-bold">
            NEXT CREATION
          </p>

          <h3 className="font-display italic text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight">
            {nextProduct.name}
          </h3>

          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group relative inline-block overflow-hidden rounded-xs border border-[#121212]/20 shadow-md transition-all hover:scale-105 hover:border-[#121212]"
          >
            <div className="h-44 w-64 bg-[#EFECE6] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="bg-[#FAF8F5] p-3 text-center border-t border-[#121212]/10">
              <p className="font-sans text-[0.62rem] text-[#121212] font-bold uppercase tracking-widest">
                DISCOVER CREATION →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
