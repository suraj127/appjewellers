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

  // Lock background scroll when modal is open
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
    `Hi A.P.P. Jewellers, I am reviewing "${product.name}" (${product.purity}, SKU: ${product.slug.toUpperCase()}) in your luxury collection catalog and would like to request price details & store availability.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0c0b]/95 text-[#F5F2EB] backdrop-blur-xl animate-fadeIn">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* TOP NAVIGATION BAR                                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#D4AF37]/30 bg-[#0f1412]/90 px-6 py-4 shadow-md backdrop-blur-md">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers"
            className="h-9 object-contain"
          />
          <div className="hidden sm:block border-l border-[#D4AF37]/30 pl-3">
            <p className="font-serif text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
              Haute Joaillerie Archive
            </p>
            <p className="text-[0.6rem] tracking-[0.2em] text-[#C5A059]/80 uppercase">
              Sarafa Market · New Delhi
            </p>
          </div>
        </div>

        {/* Center: Collection / Chapter Name */}
        <div className="text-center">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] uppercase text-[#D4AF37]">
            {product.collection || "Editorial Archive"}
          </p>
          <h2 className="font-serif text-sm sm:text-base font-medium tracking-wide text-[#FAF9F6]">
            {product.name}
          </h2>
        </div>

        {/* Right: Minimalist Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#141b18] px-3.5 py-1.5 text-xs text-[#FAF9F6] transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0f1412]"
        >
          <span className="text-[0.65rem] font-mono tracking-widest uppercase group-hover:font-bold">
            Close
          </span>
          <span className="text-sm font-light">✕</span>
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTAINER WITH SIDE RAILS & SPLIT COLUMN CONTENT        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl">
        {/* ── LEFT RAIL: Vertical Return Button ──────────────────────── */}
        <aside className="hidden lg:flex w-16 shrink-0 flex-col items-center justify-center border-r border-[#D4AF37]/20 bg-[#0c100e]">
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 py-8 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A059] transition-colors hover:text-[#D4AF37] [writing-mode:vertical-lr] rotate-180"
          >
            <span className="inline-block transition-transform group-hover:-translate-y-1">
              ↑
            </span>
            <span>BACK TO GALLERY</span>
          </button>
        </aside>

        {/* ── SPLIT CONTENT AREA ────────────────────────────────────── */}
        <main className="grid flex-1 grid-cols-1 gap-8 p-6 lg:grid-cols-12 lg:gap-12 lg:p-10">
          {/* LEFT COLUMN: Macro Imagery & Vertical Craft Credits (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative overflow-hidden rounded-sm border border-[#D4AF37]/30 bg-[#121815] shadow-2xl group">
              {/* Macro Image */}
              <div
                className={`relative h-[420px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden transition-cursor ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
              >
                <img
                  src={currentActiveImg}
                  alt={product.name}
                  className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                    isZoomed ? "scale-150" : "scale-100 group-hover:scale-105"
                  }`}
                />

                {/* Vertical Craftsmanship Credit Watermark along edge */}
                <div className="absolute left-4 bottom-6 pointer-events-none hidden sm:block">
                  <p className="text-[0.58rem] font-mono tracking-[0.35em] text-[#D4AF37]/80 uppercase [writing-mode:vertical-lr] rotate-180 drop-shadow">
                    HANDCRAFTED AT SEELAMPUR ATELIER — BIS HALLMARKED 22K/18K
                  </p>
                </div>

                {/* Top Badge: Purity */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-xs border border-[#D4AF37]/60 bg-[#0f1412]/90 px-3 py-1 font-mono text-xs font-semibold tracking-widest text-[#D4AF37] shadow">
                    {product.purity || "22K GOLD"}
                  </span>
                </div>
              </div>

              {/* Alternate View Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-3 border-t border-[#D4AF37]/20 bg-[#0d1210] p-3">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-14 w-14 overflow-hidden rounded-xs border transition-all ${
                        activeImageIndex === idx
                          ? "border-[#D4AF37] ring-1 ring-[#D4AF37]"
                          : "border-transparent opacity-60 hover:opacity-100"
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
          </div>

          {/* RIGHT COLUMN: Editorial Q&A & Specifications Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header Title & Category */}
              <div>
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
                  {product.category} · {product.metal}
                </p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#FAF9F6]">
                  {product.name}
                </h1>
                <p className="mt-2 text-xs font-mono tracking-[0.2em] uppercase text-[#C5A059]">
                  SKU: APP-{product.slug.toUpperCase()}
                </p>
              </div>

              <hr className="border-[#D4AF37]/20" />

              {/* 1. The Inspiration (Editorial Narrative) */}
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-medium text-[#D4AF37]">
                  The Inspiration
                </h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D6D1C7]">
                  {product.story ||
                    product.tagline ||
                    "Conceived as an homage to royal Indian heritage, this masterpiece combines timeless geometry with meticulously hand-carved details."}
                </p>
              </div>

              {/* 2. Specifications List */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#D4AF37]">
                  Specifications & Purity
                </h3>
                <dl className="grid grid-cols-2 gap-3 rounded-sm border border-[#D4AF37]/20 bg-[#121815] p-4 text-xs">
                  <div>
                    <dt className="font-mono text-[0.65rem] tracking-wider uppercase text-[#C5A059]">
                      Gold Purity Index
                    </dt>
                    <dd className="font-serif text-sm text-[#FAF9F6] font-semibold mt-0.5">
                      {product.purity || "22 CARAT (916)"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] tracking-wider uppercase text-[#C5A059]">
                      Precious Metal Base
                    </dt>
                    <dd className="font-serif text-sm text-[#FAF9F6] font-semibold mt-0.5">
                      {product.metal || "Solid Gold"}
                    </dd>
                  </div>
                  {product.dimensions && product.dimensions.length > 0 && (
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-wider uppercase text-[#C5A059]">
                        Gross Weight
                      </dt>
                      <dd className="font-serif text-sm text-[#FAF9F6] font-semibold mt-0.5">
                        {product.dimensions[0][1]}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[0.65rem] tracking-wider uppercase text-[#C5A059]">
                      Hallmark Certification
                    </dt>
                    <dd className="font-serif text-sm text-[#FAF9F6] font-semibold mt-0.5">
                      BIS Hallmarked 100%
                    </dd>
                  </div>
                </dl>
              </div>

              {/* 3. Craftsmanship Details */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#D4AF37]">
                  Craftsmanship Details
                </h3>
                <div className="rounded-sm border border-[#D4AF37]/20 bg-[#121815] p-4 text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#D4AF37]/10 pb-2">
                    <span className="font-mono text-[#C5A059] uppercase tracking-wider text-[0.65rem]">
                      Artisan Setting Technique
                    </span>
                    <span className="font-serif text-[#FAF9F6]">
                      {product.craftsmanship?.[1]?.[1] || "Hand-Forged & Prong Set"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF37]/10 pb-2">
                    <span className="font-mono text-[#C5A059] uppercase tracking-wider text-[0.65rem]">
                      Artisan Hours Dedicated
                    </span>
                    <span className="font-serif text-[#FAF9F6]">
                      {product.craftsmanship?.[0]?.[1] || "120 Hours"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[#C5A059] uppercase tracking-wider text-[0.65rem]">
                      Atelier Location
                    </span>
                    <span className="font-serif text-[#FAF9F6]">
                      Sarafa Market Atelier, New Delhi
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: WhatsApp Inquiry */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/919015155615?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full rounded-sm border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#D4AF37] py-3.5 px-6 font-mono text-xs font-bold tracking-[0.2em] text-[#0f1412] uppercase shadow-lg transition-all hover:brightness-110"
                >
                  <WhatsAppIcon className="size-4 text-[#0f1412]" />
                  <span>Request Price & Appointment</span>
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* ── RIGHT RAIL: Suite Thumbnail Carousel ───────────────────── */}
        {complementarySuite.length > 0 && (
          <aside className="hidden lg:flex w-24 shrink-0 flex-col items-center border-l border-[#D4AF37]/20 bg-[#0c100e] p-3 space-y-4">
            <p className="font-mono text-[0.55rem] tracking-[0.25em] text-[#C5A059] uppercase text-center mt-4">
              SUITE PIECES
            </p>
            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar py-2">
              {complementarySuite.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  title={item.name}
                  className="group relative block size-16 overflow-hidden rounded-xs border border-[#D4AF37]/30 transition-all hover:border-[#D4AF37] hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[0.6rem] text-[#D4AF37]">View</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* FOOTER TRANSITION: NEXT CREATION IN THIS SUITE              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#D4AF37]/30 bg-[#0d1210] py-8 px-6 text-center">
        <div className="mx-auto max-w-md space-y-3">
          <p className="font-mono text-xs tracking-[0.3em] text-[#C5A059] uppercase">
            NEXT CREATION IN THIS SUITE
          </p>
          <button
            type="button"
            onClick={() => onSelectProduct(nextProduct)}
            className="group inline-flex items-center gap-4 rounded-sm border border-[#D4AF37]/40 bg-[#141b18] p-3 transition-all hover:border-[#D4AF37] hover:bg-[#1a231f]"
          >
            <img
              src={nextProduct.image}
              alt={nextProduct.name}
              className="h-12 w-12 object-cover rounded-xs border border-[#D4AF37]/30"
            />
            <div className="text-left">
              <h4 className="font-serif text-sm font-semibold text-[#FAF9F6] group-hover:text-[#D4AF37]">
                {nextProduct.name}
              </h4>
              <p className="font-mono text-[0.62rem] text-[#C5A059] uppercase tracking-wider">
                {nextProduct.purity} · {nextProduct.category} →
              </p>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
