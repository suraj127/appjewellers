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
      const headerOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans antialiased selection:bg-[#E8DFC8] selection:text-[#121212]">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. STICKY TOP BRAND HEADER                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-[#121212]/10 bg-[#FAF8F5]/95 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-12 py-3 sm:py-4">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src={logoImg}
              alt="A.P.P. Jewellers"
              className="h-7 sm:h-8 object-contain"
            />
            <span className="font-display text-base sm:text-lg tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-2.5 sm:pl-3">
              A.P.P. Jewellers — 365
            </span>
          </Link>

          {/* Right: Return Home Action */}
          <Link
            to="/"
            className="font-sans text-[0.58rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#121212] border border-[#121212]/30 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
          >
            BACK TO HOME
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SUB NAVIGATION BAR (Category Icons & Curtain Jump Tabs)     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="border-t border-[#121212]/10 bg-[#FAF8F5]/90 py-2 sm:py-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-1.5 sm:gap-3 px-3 sm:px-4 min-w-max">
            {SUB_NAV_ITEMS.map((item) => {
              const isSelected = activePanelId === item.id;
              const Icon = item.IconComponent;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCurtain(item.id)}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-[0.68rem] sm:text-xs tracking-wider uppercase transition-all shrink-0 ${
                    isSelected
                      ? "bg-[#121212] text-[#FAF8F5] font-bold shadow-xs scale-105"
                      : "text-[#555] hover:text-[#121212] hover:bg-[#121212]/5"
                  }`}
                >
                  <Icon
                    className={`size-3 sm:size-3.5 transition-colors ${
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
      {/* 2. CURTAIN REVEAL / OVERLAPPING STACKING PANELS (Wipe Stack) */}
      {/* ════════════════════════════════════════════════════════════ */}
      <main className="relative">
        {CURTAIN_PANELS.map((panel, panelIdx) => {
          const pieces = allProducts.filter(panel.filterFn);
          const displayPieces =
            pieces.length > 0
              ? pieces.slice(0, 9)
              : allProducts.slice(panelIdx * 3, panelIdx * 3 + 6);

          // Stacking z-index: Each incoming panel has a higher z-index so it slides directly over the previous one!
          const zIndexValue = 10 + panelIdx * 5;

          return (
            <section
              key={panel.id}
              id={panel.id}
              style={{
                backgroundColor: panel.bgColor,
                zIndex: zIndexValue,
              }}
              className={`sticky top-[108px] min-h-screen w-full transition-all duration-700 ease-out border-t border-[#121212]/10 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] px-4 sm:px-10 lg:px-12 py-12 sm:py-20`}
            >
              <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
                {/* Curtain Panel Header with Staggered Entrance */}
                <div className="text-center space-y-2 max-w-3xl mx-auto px-2">
                  <p className="font-sans text-[0.6rem] sm:text-[0.68rem] tracking-[0.35em] uppercase text-[#777] font-semibold">
                    {panel.panelNum} · {panel.subtitle}
                  </p>
                  <h2 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#121212] font-normal tracking-tight">
                    {panel.title}
                  </h2>
                  <p className="font-display text-xs sm:text-base text-[#555] font-light pt-1 leading-relaxed max-w-xl mx-auto">
                    {panel.tagline}
                  </p>
                </div>

                {/* Asymmetric Exhibition Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 items-start">
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
                        className={`group relative flex flex-col space-y-3 transition-transform duration-700 ease-out ${
                          pieceIdx % 3 === 1 ? "lg:translate-y-6" : ""
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
                          className={`relative w-full ${currentAspect} overflow-hidden bg-[#EAE6DF] cursor-pointer shadow-xs transition-all duration-700 ease-out group-hover:shadow-2xl rounded-xs`}
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
                            aria-label="Wishlist piece"
                            className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-xs transition-transform hover:scale-110 shadow-xs"
                          >
                            <HeartIcon
                              filled={isWishlisted}
                              className={`size-3.5 sm:size-4 ${isWishlisted ? "text-rose-500" : "text-[#121212]"}`}
                            />
                          </button>

                          {/* ── CARTIER HOVER POPOVER CARD (With Discover + Price Enquiry) ── */}
                          <div
                            className={`absolute inset-2 sm:inset-5 bg-[#FFFFFF] border border-[#121212]/15 shadow-2xl p-4 sm:p-7 flex flex-col justify-between items-center text-center transition-all duration-300 transform z-20 ${
                              isMobileHovered
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
                            }`}
                          >
                            <div className="space-y-1.5 sm:space-y-2">
                              <p className="font-sans text-[0.52rem] sm:text-[0.55rem] tracking-[0.3em] uppercase text-[#888] font-bold">
                                {panel.panelNum} · CREATION {pieceIdx + 1}
                              </p>
                              <h4 className="font-display text-sm sm:text-xl text-[#121212] uppercase tracking-wider font-normal leading-tight line-clamp-2">
                                {piece.name}
                              </h4>
                              <p className="font-display italic text-[0.68rem] sm:text-sm text-[#666] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                {piece.story ||
                                  piece.tagline ||
                                  "Handcrafted with certified gold purity and master artisan settings."}
                              </p>
                            </div>

                            {/* Action Buttons: Discover Creation + Price Enquiry */}
                            <div className="w-full space-y-2 pt-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProduct(piece);
                                }}
                                className="w-full py-2 sm:py-2.5 px-4 rounded-full border border-[#121212] bg-[#121212] text-[#FAF8F5] font-sans text-[0.58rem] sm:text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212] shadow-xs"
                              >
                                DISCOVER CREATION
                              </button>

                              <a
                                href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center gap-1.5 w-full py-1.5 sm:py-2 px-4 rounded-full border border-[#121212]/40 bg-transparent text-[#121212] font-sans text-[0.55rem] sm:text-[0.6rem] font-semibold uppercase tracking-[0.18em] transition-all hover:bg-[#121212]/10"
                              >
                                <WhatsAppIcon className="size-3 text-[#121212]" />
                                <span>PRICE ENQUIRY</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Micro-Caption Directly Beneath Card */}
                        <div className="flex items-center justify-between gap-2 px-0.5">
                          <div className="min-w-0">
                            <p className="font-sans text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] uppercase text-[#121212] font-medium truncate">
                              {piece.name}
                            </p>
                            <p className="font-sans text-[0.52rem] sm:text-[0.55rem] tracking-[0.2em] uppercase text-[#888]">
                              {piece.purity || "22K GOLD"} · {piece.category}
                            </p>
                          </div>

                          <a
                            href={`https://wa.me/919015155615?text=${whatsappPriceMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp Price Enquiry"
                            className="shrink-0 font-sans text-[0.52rem] sm:text-[0.58rem] tracking-wider uppercase text-[#888] hover:text-[#121212] border-b border-[#888]/40 hover:border-[#121212] transition-colors"
                          >
                            Price on Request →
                          </a>
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
      <footer className="relative z-50 border-t border-[#121212]/10 bg-[#FAF8F5] py-16 px-6 sm:px-12 text-center space-y-4 sm:space-y-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[0.62rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-[#777]">
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
      {/* 4. FULL-SCREEN ARTICLE READER VIEW (Responsive for Mobile)   */}
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
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#121212]/10 bg-[#FAF8F5]/95 px-4 sm:px-12 py-3.5 sm:py-4 backdrop-blur-md">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-7 sm:h-8 object-contain"
          />
          <span className="font-display text-xs sm:text-sm tracking-widest text-[#121212] font-semibold border-l border-[#121212]/20 pl-2.5 sm:pl-3 truncate">
            Cartier — 365 Archive
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#121212]/30 px-3.5 sm:px-4 py-1.5 font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
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
        <article className="flex-1 px-4 py-8 sm:px-16 lg:px-20 max-w-4xl mx-auto space-y-10 sm:space-y-16">
          {/* Article Header */}
          <div className="text-center space-y-2 sm:space-y-3">
            <p className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.35em] uppercase text-[#777] font-semibold">
              {product.collection || "EXHIBITION ARCHIVE"} · CREATION{" "}
              {product.slug.slice(-2).toUpperCase() || "01"}
            </p>
            <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#121212]">
              {product.name}
            </h1>
            <p className="font-sans text-[0.68rem] sm:text-xs uppercase tracking-[0.25em] text-[#888] pt-0.5">
              {product.purity || "22K GOLD"} · {product.metal} · SKU-
              {product.slug.slice(-4).toUpperCase()}
            </p>
          </div>

          {/* Large Hero Image (Video 00:09) */}
          <div className="relative overflow-hidden rounded-xs border border-[#121212]/10 bg-[#EFECE6] shadow-sm">
            <div className="relative h-[300px] sm:h-[520px] lg:h-[640px] w-full overflow-hidden">
              <img
                src={currentImg}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 border-t border-[#121212]/10 bg-[#FAF8F5] p-2.5 sm:p-3">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`size-12 sm:size-14 overflow-hidden border transition-all ${
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
          <div className="space-y-4 max-w-2xl mx-auto text-center px-2">
            <p className="font-display text-lg sm:text-2xl leading-relaxed text-[#222] font-light">
              {product.story ||
                product.tagline ||
                "Conceived as an emblem of royal Indian heritage, this masterpiece combines timeless geometry with meticulously hand-carved floral details."}
            </p>
          </div>

          {/* Editorial Q&A Craft Breakdown (Exact Match to Video 00:11–00:12) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start border-t border-b border-[#121212]/10 py-8 sm:py-12">
            {/* Left Photo with vertical credits along edge */}
            <div className="md:col-span-5 relative">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#EFECE6] border border-[#121212]/10">
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
            <div className="md:col-span-7 space-y-4 sm:space-y-6 font-display">
              <div>
                <p className="text-base sm:text-lg font-medium text-[#121212]">
                  Gold Purity & Assay Grade?
                </p>
                <p className="text-sm sm:text-base text-[#555] italic mt-1 font-light">
                  {product.purity || "22 CARAT (916)"} — 100% BIS Hallmarked at
                  Delhi Assay Centre.
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-medium text-[#121212]">
                  Artisan Setting & Forging Technique?
                </p>
                <p className="text-sm sm:text-base text-[#555] italic mt-1 font-light">
                  {product.craftsmanship?.[1]?.[1] ||
                    "Traditional Hand-Forged & Prong Setting."}
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-medium text-[#121212]">
                  Artisan Hours Dedicated?
                </p>
                <p className="text-sm sm:text-base text-[#555] italic mt-1 font-light">
                  {product.craftsmanship?.[0]?.[1] ||
                    "120 Hours of Dedicated Karigar Artistry."}
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-medium text-[#121212]">
                  A characteristic you share with this creation?
                </p>
                <p className="text-sm sm:text-base text-[#555] italic mt-1 font-light">
                  "I feel at my best when I'm most confidently my true feminine
                  self. It allows me to be raw and brave with choices."
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp Price Inquiry & Call Store */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919015155615?text=${whatsappInquiry}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-full border border-[#121212] bg-[#121212] px-7 py-3.5 font-sans text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#FAF8F5] shadow-md transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121212]"
            >
              <WhatsAppIcon className="size-4 text-current" />
              <span>REQUEST PRICE & SPECIFICATIONS</span>
            </a>

            <a
              href="tel:09015155615"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-[#121212]/30 px-6 py-3.5 font-sans text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#121212] hover:bg-[#121212]/5 transition-all"
            >
              <PhoneIcon className="size-3.5 text-[#121212]" />
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
      <footer className="border-t border-[#121212]/10 bg-[#F5F2ED] py-12 sm:py-16 px-4 text-center">
        <div className="mx-auto max-w-xl space-y-4 sm:space-y-6">
          <p className="font-sans text-[0.65rem] sm:text-xs tracking-[0.35em] text-[#777] uppercase font-bold">
            NEXT CREATION
          </p>

          <h3 className="font-display italic text-2xl sm:text-5xl text-[#121212] font-normal tracking-tight px-2">
            {nextProduct.name}
          </h3>

          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group relative inline-block overflow-hidden rounded-xs border border-[#121212]/20 shadow-md transition-all hover:scale-105 hover:border-[#121212]"
          >
            <div className="h-36 sm:h-44 w-52 sm:w-64 bg-[#EFECE6] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="bg-[#FAF8F5] p-2.5 sm:p-3 text-center border-t border-[#121212]/10">
              <p className="font-sans text-[0.58rem] sm:text-[0.62rem] text-[#121212] font-bold uppercase tracking-widest">
                DISCOVER CREATION →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
