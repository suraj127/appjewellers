import { useState, useEffect } from "react";
import type { Product } from "@/data/products";
import logoImg from "@/assets/logo.png";
import { WhatsAppIcon } from "@/components/LuxuryIcons";

interface JewelryPieceReaderProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function JewelryPieceReader({
  product,
  allProducts,
  onClose,
  onSelectProduct,
}: JewelryPieceReaderProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Lock background scroll when reader is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Compute complementary suite items (same category or collection, excluding current item)
  const complementarySuite = allProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.collection === product.collection || p.metal === product.metal)
    )
    .slice(0, 6);

  // Find next product in suite for footer navigation
  const currentIndex = allProducts.findIndex((p) => p.slug === product.slug);
  const nextProduct =
    allProducts[(currentIndex + 1) % allProducts.length] || allProducts[0];

  const images = [product.image, product.hoverImage].filter(
    (img, idx, arr) => img && arr.indexOf(img) === idx
  );

  const currentActiveImg = images[activeImageIndex] || product.image;

  const whatsappMsg = encodeURIComponent(
    `Hi A.P.P. Jewellers, I am reading about "${product.name}" (${product.purity}, SKU: ${product.slug.toUpperCase()}) in your collection directory and would like to request current price details.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F9F8F6] text-[#1A1A1A] animate-fadeIn">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* TOP NAVIGATION BAR (Matching Video 00:08)                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#1A1A1A]/10 bg-[#F9F8F6]/90 px-6 py-5 shadow-2xs backdrop-blur-md">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-8 object-contain"
          />
          <span className="font-serif text-sm tracking-widest text-[#1A1A1A] font-semibold border-l border-[#1A1A1A]/20 pl-3">
            A.P.P. Jewellers — 365
          </span>
        </div>

        {/* Center: Collection / Article Marker */}
        <div className="hidden md:block text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-[#C5A059]">
            {product.collection || "CHAPTER ONE · CREATION ARCHIVE"}
          </p>
        </div>

        {/* Right: Minimalist Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 rounded-full border border-[#1A1A1A]/30 bg-transparent px-4 py-1.5 text-xs text-[#1A1A1A] transition-all hover:bg-[#1A1A1A] hover:text-[#FAF9F6]"
        >
          <span className="font-mono text-[0.65rem] tracking-widest uppercase font-semibold">
            Close
          </span>
          <span className="text-base font-light leading-none">✕</span>
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTAINER WITH FIXED SIDE RAILS & EDITORIAL LAYOUT      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl">
        {/* ── LEFT RAIL: Vertical "BACK TO GALLERY" (Video 00:09) ────── */}
        <aside className="hidden lg:flex w-20 shrink-0 flex-col items-center justify-center border-r border-[#1A1A1A]/10 bg-[#F9F8F6]">
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 py-12 font-mono text-[0.68rem] font-bold uppercase tracking-[0.35em] text-[#1A1A1A]/70 transition-colors hover:text-[#1A1A1A] [writing-mode:vertical-lr] rotate-180"
          >
            <span className="inline-block transition-transform group-hover:-translate-y-1">
              ↑
            </span>
            <span>BACK TO GALLERY</span>
          </button>
        </aside>

        {/* ── CENTER EDITORIAL CONTENT (Video 00:08 - 00:12) ────────── */}
        <main className="flex-1 px-6 py-10 sm:px-12 lg:px-16 max-w-4xl mx-auto space-y-12">
          {/* Article Header */}
          <div className="text-center space-y-3 pt-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-[#C5A059] font-bold">
              {product.collection || "CHAPTER ONE"} · ARTICLE {product.slug.slice(-2).toUpperCase() || "06"}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-[#1A1A1A]">
              {product.name}
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#777] pt-1">
              {product.purity || "22K GOLD"} · {product.metal} · SKU-{product.slug.slice(-4).toUpperCase()}
            </p>
          </div>

          {/* Featured Large Hero Photo */}
          <div className="relative overflow-hidden rounded-sm border border-[#1A1A1A]/10 bg-[#EFECE6] shadow-sm">
            <div
              className={`relative h-[380px] sm:h-[520px] lg:h-[600px] w-full overflow-hidden transition-cursor ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={currentActiveImg}
                alt={product.name}
                className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                  isZoomed ? "scale-140" : "scale-100 hover:scale-105"
                }`}
              />

              {/* Top Right Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-[#FAF9F6] border border-[#1A1A1A]/20 font-mono text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 text-[#1A1A1A] shadow-xs">
                  {product.purity || "22K GOLD"}
                </span>
              </div>
            </div>

            {/* Alternate Angle Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 border-t border-[#1A1A1A]/10 bg-[#FAF9F6] p-3">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-14 w-14 overflow-hidden rounded-xs border transition-all ${
                      activeImageIndex === idx
                        ? "border-[#1A1A1A] ring-1 ring-[#1A1A1A]"
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

          {/* Editorial Q&A & Narrative Section (Video 00:11–00:12 Style) */}
          <div className="space-y-10 pt-4 border-t border-[#1A1A1A]/10">
            {/* The Inspiration Narrative */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                The Inspiration & Artistry
              </h2>
              <p className="font-serif text-base sm:text-lg leading-relaxed text-[#333] font-light">
                {product.story ||
                  product.tagline ||
                  "As an emblem of Indian royal heritage, this creation taps into the freedom of ancient goldsmithing techniques. Here, master craftsmen hand-engrave every floral detail with rose-cut solitaires."}
              </p>
            </div>

            {/* Q&A Editorial Format (Matching Video 00:12 "Panther spots or tiger stripes?") */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F3F1EC] p-6 sm:p-8 rounded-sm border border-[#1A1A1A]/10">
              <div className="space-y-4">
                <div>
                  <p className="font-serif text-base font-medium text-[#1A1A1A]">
                    Gold Purity & Assay Grade?
                  </p>
                  <p className="font-serif text-sm text-[#555] italic mt-1">
                    {product.purity || "22 CARAT (916)"} — 100% BIS Hallmarked at Delhi Assay Office.
                  </p>
                </div>
                <div>
                  <p className="font-serif text-base font-medium text-[#1A1A1A]">
                    Setting Technique & Artistry?
                  </p>
                  <p className="font-serif text-sm text-[#555] italic mt-1">
                    {product.craftsmanship?.[1]?.[1] || "Traditional Kundan & Hand-Forged Prong Setting."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-serif text-base font-medium text-[#1A1A1A]">
                    Artisan Hours Dedicated?
                  </p>
                  <p className="font-serif text-sm text-[#555] italic mt-1">
                    {product.craftsmanship?.[0]?.[1] || "120 Hours of Master Goldsmith Crafting."}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-base font-medium text-[#1A1A1A]">
                    Atelier & Provenance?
                  </p>
                  <p className="font-serif text-sm text-[#555] italic mt-1">
                    Sarafa Market Atelier, New Delhi · Certified A.P.P. Hallmark.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-2 text-center">
              <a
                href={`https://wa.me/919015155615?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#FAF9F6] shadow-md transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A]"
              >
                <WhatsAppIcon className="size-4 text-current" />
                <span>REQUEST PRICE & SPECIFICATIONS</span>
              </a>
            </div>
          </div>
        </main>

        {/* ── RIGHT RAIL: Vertical Thumbnail Bar (Video 00:09) ───────── */}
        {complementarySuite.length > 0 && (
          <aside className="hidden lg:flex w-24 shrink-0 flex-col items-center border-l border-[#1A1A1A]/10 bg-[#F9F8F6] p-3 space-y-4">
            <p className="font-mono text-[0.55rem] tracking-[0.25em] text-[#777] uppercase text-center mt-6">
              SUITE PIECES
            </p>
            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar py-2">
              {complementarySuite.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  title={item.name}
                  className="group relative block size-16 overflow-hidden rounded-xs border border-[#1A1A1A]/20 transition-all hover:border-[#1A1A1A] hover:scale-105"
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

      {/* ════════════════════════════════════════════════════════════ */}
      {/* FOOTER TRANSITION: NEXT CREATION (Matching Video 00:13-00:14) */}
      {/* ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#1A1A1A]/10 bg-[#F3F1EC] py-16 px-6 text-center">
        <div className="mx-auto max-w-xl space-y-6">
          <p className="font-mono text-xs tracking-[0.35em] text-[#777] uppercase font-bold">
            NEXT CREATION
          </p>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
            {nextProduct.name}
          </h3>

          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group relative inline-block overflow-hidden rounded-sm border border-[#1A1A1A]/20 shadow-md transition-all hover:scale-105 hover:border-[#1A1A1A]"
          >
            <div className="h-44 w-64 bg-[#EFECE6] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="bg-[#FAF9F6] p-3 text-center border-t border-[#1A1A1A]/10">
              <p className="font-mono text-[0.62rem] text-[#1A1A1A] font-bold uppercase tracking-widest">
                DISCOVER CREATION →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
