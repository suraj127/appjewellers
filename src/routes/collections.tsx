import { useState, useMemo, useEffect } from "react";
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
    bgColor: "#F6F3EC",
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
    bgColor: "#EFECE5",
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
    bgColor: "#F7F5F0",
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
    bgColor: "#F2EEE6",
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
    bgColor: "#ECE7DE",
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
  { id: "curtain-hero", label: "All Jewellery", IconComponent: CrownIcon },
  { id: "curtain-gold", label: "Gold", IconComponent: CrownIcon },
  { id: "curtain-diamond", label: "Solitaire Diamond", IconComponent: DiamondIcon },
  { id: "curtain-earrings", label: "Earrings & Jhumka", IconComponent: EarringIcon },
  { id: "curtain-rings", label: "Rings & Bands", IconComponent: RingIcon },
  { id: "curtain-wedding", label: "Bridal & Wedding", IconComponent: CrownIcon },
  { id: "curtain-daily", label: "Daily Wear & Coins", IconComponent: NecklaceIcon },
];

function EditorialCollectionsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(getAllProducts());
  const [activePanelId, setActivePanelId] = useState<string>("curtain-hero");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeMobileHover, setActiveMobileHover] = useState<string | null>(null);

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

  const scrollToCurtain = (id: string) => {
    setActivePanelId(id);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans antialiased selection:bg-[#E8DFC8] selection:text-[#121212] overflow-x-hidden scroll-smooth">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. STICKY TOP BRAND HEADER                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-[#121212]/10 bg-[#FAF8F5]/95 backdrop-blur-md transition-all shadow-xs will-change-transform">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-12 py-2.5 sm:py-4">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-6 sm:h-8 object-contain"
            />
            <span className="font-display text-sm sm:text-lg tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-2 sm:pl-3">
              A.P.P. Jewellers — 365
            </span>
          </Link>

          {/* Right: Return Home Action */}
          <Link
            to="/"
            className="font-sans text-[0.55rem] sm:text-[0.65rem] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#121212] border border-[#121212]/30 rounded-full px-3 sm:px-5 py-1 sm:py-2 hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
          >
            BACK TO HOME
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SUB NAVIGATION BAR (Category Icons & Curtain Jump Tabs)     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="border-t border-[#121212]/10 bg-[#FAF8F5]/90 py-1.5 sm:py-2 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-1 sm:gap-2.5 px-2 sm:px-4 min-w-max">
            {SUB_NAV_ITEMS.map((item) => {
              const isSelected = activePanelId === item.id;
              const Icon = item.IconComponent;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCurtain(item.id)}
                  className={`group flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-sans text-[0.6rem] sm:text-xs tracking-wider uppercase transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#121212] text-[#FAF8F5] font-bold shadow-xs scale-102"
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
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. BUTTERY SMOOTH CURTAIN OVERLAPPING STACK                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <main className="relative">
        {CURTAIN_PANELS.map((panel, panelIdx) => {
          const pieces = allProducts.filter(panel.filterFn);
          const displayPieces =
            pieces.length > 0
              ? pieces.slice(0, 12)
              : allProducts.slice(panelIdx * 3, panelIdx * 3 + 9);

          const zIndexValue = 10 + panelIdx * 5;

          return (
            <section
              key={panel.id}
              id={panel.id}
              style={{
                backgroundColor: panel.bgColor,
                zIndex: zIndexValue,
                transform: "translate3d(0,0,0)",
              }}
              className={`relative scroll-mt-24 w-full border-t border-[#121212]/10 shadow-[0_-12px_32px_rgba(0,0,0,0.06)] px-2 sm:px-10 lg:px-12 py-8 sm:py-16 ${
                panelIdx > 0 ? "-mt-4 sm:-mt-6" : ""
              }`}
            >
              <div className="mx-auto max-w-7xl space-y-5 sm:space-y-12">
                {/* Curtain Panel Header */}
                <div className="text-center space-y-1 sm:space-y-2 max-w-3xl mx-auto px-1">
                  <p className="font-sans text-[0.52rem] sm:text-[0.68rem] tracking-[0.3em] uppercase text-[#777] font-semibold">
                    {panel.panelNum} · {panel.subtitle}
                  </p>
                  <h2 className="font-display italic text-2xl sm:text-5xl lg:text-6xl text-[#121212] font-normal tracking-tight">
                    {panel.title}
                  </h2>
                  <p className="font-display text-[0.72rem] sm:text-base text-[#555] font-light pt-0.5 sm:pt-1 leading-relaxed max-w-xl mx-auto line-clamp-2 sm:line-clamp-none">
                    {panel.tagline}
                  </p>
                </div>

                {/* 3-COLUMN DESKTOP & MOBILE GRID */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 items-start">
                  {displayPieces.map((piece, pieceIdx) => {
                    const aspectStyles = [
                      "aspect-[3/4]",
                      "aspect-square",
                      "aspect-[4/5]",
                      "aspect-[3/4]",
                      "aspect-square",
                      "aspect-[4/3]",
                    ];
                    const currentAspect =
                      aspectStyles[pieceIdx % aspectStyles.length];
                    const isWishlisted = wishlist.includes(piece.slug);
                    const isMobileHovered = activeMobileHover === piece.slug;

                    const whatsappPriceMsg = encodeURIComponent(
                      `Hi A.P.P. Jewellers, I would like to enquire about the price and details for "${piece.name}" (${piece.purity}, SKU: ${piece.slug.toUpperCase()}) from your 365 Collection.`
                    );

                    return (
                      <div
                        key={piece.slug}
                        className={`group relative flex flex-col space-y-1.5 sm:space-y-3 ${
                          pieceIdx % 3 === 1 ? "lg:translate-y-4" : ""
                        }`}
                      >
                        {/* Image Box Container */}
                        <div
                          onClick={() => setSelectedProduct(piece)}
                          onTouchStart={() =>
                            setActiveMobileHover((prev) =>
                              prev === piece.slug ? null : piece.slug
                            )
                          }
                          className={`relative w-full ${currentAspect} overflow-hidden bg-[#EAE6DF] cursor-pointer shadow-2xs hover:shadow-xl transition-shadow duration-300 rounded-xs`}
                        >
                          <img
                            src={piece.image}
                            alt={piece.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />

                          {/* Top Wishlist Heart Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(piece.slug);
                            }}
                            aria-label="Wishlist piece"
                            className="absolute top-1 sm:top-2.5 right-1 sm:right-2.5 z-10 p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-xs transition-transform hover:scale-110 shadow-xs"
                          >
                            <HeartIcon
                              filled={isWishlisted}
                              className={`size-2.5 sm:size-3.5 ${isWishlisted ? "text-rose-500" : "text-[#121212]"}`}
                            />
                          </button>

                          {/* ── CARTIER HOVER POPOVER CARD ── */}
                          <div
                            className={`absolute inset-1 sm:inset-4 bg-[#FFFFFF] border border-[#121212]/15 shadow-xl p-2 sm:p-6 flex flex-col justify-between items-center text-center transition-opacity duration-200 z-20 ${
                              isMobileHovered
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                            }`}
                          >
                            <div className="space-y-0.5 sm:space-y-1.5">
                              <p className="font-sans text-[0.42rem] sm:text-[0.55rem] tracking-[0.2em] uppercase text-[#888] font-bold">
                                {panel.panelNum}
                              </p>
                              <h4 className="font-display text-[0.62rem] sm:text-lg text-[#121212] uppercase tracking-wider font-normal leading-tight line-clamp-1 sm:line-clamp-2">
                                {piece.name}
                              </h4>
                              <p className="hidden sm:block font-display italic text-xs text-[#666] line-clamp-2 leading-relaxed">
                                {piece.story ||
                                  piece.tagline ||
                                  "Handcrafted with certified gold purity and master artisan settings."}
                              </p>
                            </div>

                            {/* Action Buttons: Discover Creation + Price Enquiry */}
                            <div className="w-full space-y-1 sm:space-y-1.5 pt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(piece);
                                }}
                                className="w-full py-1 sm:py-2 px-1.5 sm:px-3 rounded-full border border-[#121212] bg-[#121212] text-[#FAF8F5] font-sans text-[0.48rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.15em] transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212] shadow-xs truncate"
                              >
                                DISCOVER
                              </button>

                              <a
                                href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center gap-1 w-full py-0.5 sm:py-1.5 px-1.5 sm:px-3 rounded-full border border-[#121212]/40 bg-transparent text-[#121212] font-sans text-[0.45rem] sm:text-[0.58rem] font-semibold uppercase tracking-[0.12em] transition-all hover:bg-[#121212]/10 truncate"
                              >
                                <WhatsAppIcon className="size-2.5 sm:size-3 text-[#121212]" />
                                <span>PRICE</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Micro-Caption Directly Beneath Card */}
                        <div className="space-y-0.5 px-0.5">
                          <p className="font-sans text-[0.52rem] sm:text-[0.68rem] tracking-wider uppercase text-[#121212] font-medium truncate">
                            {piece.name}
                          </p>
                          <div className="flex items-center justify-between gap-1">
                            <p className="font-sans text-[0.45rem] sm:text-[0.55rem] tracking-wider uppercase text-[#888] truncate">
                              {piece.purity || "22K"}
                            </p>
                            <a
                              href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                              target="_blank"
                              rel="noreferrer"
                              title="WhatsApp Price Enquiry"
                              className="font-sans text-[0.45rem] sm:text-[0.58rem] tracking-wider uppercase text-[#888] hover:text-[#121212] transition-colors shrink-0"
                            >
                              Price →
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
        })}
      </main>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. EDITORIAL FOOTER                                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <footer className="relative z-50 border-t border-[#121212]/10 bg-[#FAF8F5] py-12 sm:py-16 px-4 sm:px-12 text-center space-y-4 sm:space-y-6">
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

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. FULL-SCREEN ARTICLE READER VIEW                           */}
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
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#FAF8F5] text-[#121212] animate-fadeIn">
      {/* ── Top Bar (Video 00:08) ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#121212]/10 bg-[#FAF8F5]/95 px-4 sm:px-12 py-3 sm:py-4 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-6 sm:h-8 object-contain"
          />
          <span className="font-display text-xs sm:text-sm tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-2 sm:pl-3 truncate">
            Cartier — 365 Archive
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#121212]/30 px-3 sm:px-4 py-1.5 font-sans text-[0.58rem] sm:text-[0.65rem] tracking-[0.25em] uppercase hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
        >
          <span>CLOSE</span>
          <span className="text-sm sm:text-base leading-none">✕</span>
        </button>
      </header>

      {/* ── Main Container with Left & Right Rails (Video 00:08–00:10) */}
      <div className="relative mx-auto flex min-h-[calc(100vh-70px)] max-w-7xl">
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

        {/* Center Article Content (Video 00:08–00:13) */}
        <article className="flex-1 px-3.5 py-6 sm:px-16 lg:px-20 max-w-4xl mx-auto space-y-8 sm:space-y-16">
          {/* Article Header */}
          <div className="text-center space-y-1.5 sm:space-y-3">
            <p className="font-sans text-[0.55rem] sm:text-[0.65rem] tracking-[0.35em] uppercase text-[#777] font-semibold">
              {product.collection || "EXHIBITION ARCHIVE"} · CREATION{" "}
              {product.slug.slice(-2).toUpperCase() || "01"}
            </p>
            <h1 className="font-display text-2xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#121212]">
              {product.name}
            </h1>
            <p className="font-sans text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] text-[#888] pt-0.5">
              {product.purity || "22K GOLD"} · {product.metal} · SKU-
              {product.slug.slice(-4).toUpperCase()}
            </p>
          </div>

          {/* Large Hero Image (Video 00:09) */}
          <div className="relative overflow-hidden rounded-xs border border-[#121212]/10 bg-[#EFECE6] shadow-sm">
            <div className="relative h-[260px] sm:h-[520px] lg:h-[640px] w-full overflow-hidden">
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
            <p className="font-display text-base sm:text-2xl leading-relaxed text-[#222] font-light">
              {product.story ||
                product.tagline ||
                "Conceived as an emblem of royal Indian heritage, this masterpiece combines timeless geometry with meticulously hand-carved floral details."}
            </p>
          </div>

          {/* Editorial Q&A Craft Breakdown (Exact Match to Video 00:11–00:12) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-start border-t border-b border-[#121212]/10 py-6 sm:py-12">
            {/* Left Photo */}
            <div className="md:col-span-5 relative">
              <div className="relative h-48 sm:h-80 w-full overflow-hidden bg-[#EFECE6] border border-[#121212]/10">
                <img
                  src={craftImg}
                  alt="Craftsmanship Atelier"
                  className="h-full w-full object-cover filter grayscale contrast-125"
                />
              </div>
              <p className="mt-1.5 font-sans text-[0.48rem] sm:text-[0.52rem] tracking-[0.25em] text-[#888] uppercase">
                HANDCRAFTED AT SEELAMPUR ATELIER — BIS HALLMARKED 22K/18K
              </p>
            </div>

            {/* Right Q&A Dialog (Video 00:12 Style) */}
            <div className="md:col-span-7 space-y-3.5 sm:space-y-6 font-display">
              <div>
                <p className="text-sm sm:text-lg font-medium text-[#121212]">
                  Gold Purity & Assay Grade?
                </p>
                <p className="text-xs sm:text-base text-[#555] italic mt-0.5 font-light">
                  {product.purity || "22 CARAT (916)"} — 100% BIS Hallmarked at
                  Delhi Assay Centre.
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-lg font-medium text-[#121212]">
                  Artisan Setting & Forging Technique?
                </p>
                <p className="text-xs sm:text-base text-[#555] italic mt-0.5 font-light">
                  {product.craftsmanship?.[1]?.[1] ||
                    "Traditional Hand-Forged & Prong Setting."}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-lg font-medium text-[#121212]">
                  Artisan Hours Dedicated?
                </p>
                <p className="text-xs sm:text-base text-[#555] italic mt-0.5 font-light">
                  {product.craftsmanship?.[0]?.[1] ||
                    "120 Hours of Dedicated Karigar Artistry."}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-lg font-medium text-[#121212]">
                  A characteristic you share with this creation?
                </p>
                <p className="text-xs sm:text-base text-[#555] italic mt-0.5 font-light">
                  "I feel at my best when I'm most confidently my true feminine
                  self. It allows me to be raw and brave with choices."
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp Price Inquiry & Call Store */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={`https://wa.me/919015155615?text=${whatsappInquiry}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-[#121212] bg-[#121212] px-6 py-3 sm:px-7 sm:py-3.5 font-sans text-[0.62rem] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FAF8F5] shadow-md transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212]"
            >
              <WhatsAppIcon className="size-3.5 sm:size-4 text-current" />
              <span>REQUEST PRICE & SPECIFICATIONS</span>
            </a>

            <a
              href="tel:09015155615"
              className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-full border border-[#121212]/30 px-5 py-3 sm:px-6 sm:py-3.5 font-sans text-[0.58rem] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#121212] hover:bg-[#121212]/5 transition-all"
            >
              <PhoneIcon className="size-3 sm:size-3.5 text-[#121212]" />
              <span>CALL ATELIER: 090151 55615</span>
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

      {/* ── Footer Transition: NEXT CREATION (Video 00:13–00:14) ───── */}
      <footer className="border-t border-[#121212]/10 bg-[#F5F2ED] py-8 sm:py-16 px-4 text-center">
        <div className="mx-auto max-w-xl space-y-3 sm:space-y-6">
          <p className="font-sans text-[0.58rem] sm:text-xs tracking-[0.35em] text-[#777] uppercase font-bold">
            NEXT CREATION
          </p>

          <h3 className="font-display italic text-xl sm:text-5xl text-[#121212] font-normal tracking-tight px-1">
            {nextProduct.name}
          </h3>

          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group relative inline-block overflow-hidden rounded-xs border border-[#121212]/20 shadow-md transition-all hover:scale-105 hover:border-[#121212]"
          >
            <div className="h-28 sm:h-44 w-44 sm:w-64 bg-[#EFECE6] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="bg-[#FAF8F5] p-2 sm:p-3 text-center border-t border-[#121212]/10">
              <p className="font-sans text-[0.52rem] sm:text-[0.62rem] text-[#121212] font-bold uppercase tracking-widest">
                DISCOVER CREATION →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
