import { useState } from "react";
import { type Product, CATEGORY_GROUPS } from "@/data/products";
import { generateCatalogPdf } from "@/lib/pdfCatalogGenerator";
import {
  CrownIcon,
  DiamondIcon,
  SparklesIcon,
  RingIcon,
  EarringIcon,
  NecklaceIcon,
  CoinIcon,
  WhatsAppIcon,
  CloseIcon,
} from "@/components/LuxuryIcons";

interface CatalogPdfModalProps {
  isOpen?: boolean;
  allProducts?: Product[];
  currentFilteredProducts?: Product[];
  activeCategory?: string;
  onClose: () => void;
}

export function CatalogPdfModal({
  isOpen = true,
  allProducts,
  currentFilteredProducts,
  activeCategory = "ALL",
  onClose,
}: CatalogPdfModalProps) {
  if (!isOpen) return null;

  const safeAll = allProducts && allProducts.length > 0 ? allProducts : PRODUCTS;
  const safeFiltered = currentFilteredProducts && currentFilteredProducts.length > 0 ? currentFilteredProducts : safeAll;

  const [downloadMode, setDownloadMode] = useState<"FILTERED" | "ALL" | "CATEGORY">("FILTERED");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeCategory !== "ALL" ? activeCategory : "BRIDAL SET"
  );
  const [includeGoldRate, setIncludeGoldRate] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressMessage, setProgressMessage] = useState<string>("");

  // Determine items to include
  const selectedProducts = (() => {
    if (downloadMode === "FILTERED") return safeFiltered;
    if (downloadMode === "ALL") return safeAll;
    return safeAll.filter(
      (p) =>
        p.category.toUpperCase() === selectedCategory.toUpperCase() ||
        p.collection.toUpperCase().includes(selectedCategory.toUpperCase())
    );
  })();

  const estimatedPages = Math.ceil((selectedProducts.length || 1) / 2) + 3;

  const handleDownload = async () => {
    if (selectedProducts.length === 0) return;
    setIsGenerating(true);

    try {
      const categoryLabel =
        downloadMode === "ALL"
          ? "Full 2026 Master Catalogue"
          : downloadMode === "FILTERED"
          ? `Filtered Selection (${activeCategory})`
          : `${selectedCategory} Edition`;

      const pdfBlob = await generateCatalogPdf(
        selectedProducts,
        {
          subtitle: `Exquisite Gold & Solitaire Diamond Collection · ${categoryLabel}`,
          categoryFilter: downloadMode === "ALL" ? "All Jewellery" : downloadMode === "FILTERED" ? activeCategory : selectedCategory,
          includeGoldRate,
          goldRate22k: "₹7,380 / gram",
          goldRate24k: "₹8,050 / gram",
        },
        (msg) => setProgressMessage(msg)
      );

      // Create download anchor
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      const cleanCatName = categoryLabel.replace(/[^a-zA-Z0-9]/g, "_");
      a.href = url;
      a.download = `APP_Jewellers_Catalogue_${cleanCatName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF catalogue:", err);
    } finally {
      setIsGenerating(false);
      setProgressMessage("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-onyx border border-gold/60 rounded-lg p-5 sm:p-8 shadow-2xl overflow-hidden text-foreground">
        {/* Decorative Top Red & Gold Ribbon */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold via-amber-200 to-gold" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isGenerating}
          className="absolute top-4 right-4 text-muted-foreground hover:text-gold transition-colors p-1.5 rounded-full hover:bg-gold/10"
        >
          <CloseIcon className="size-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center sm:text-left pr-8">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CrownIcon className="size-5 text-gold" />
            <span className="eyebrow text-[0.6rem] uppercase tracking-widest text-gold font-bold">
              Official PDF Catalogue Generator
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-amber-200 font-bold mt-1">
            Download A.P.P. Jewellers Catalogue
          </h2>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Get an ultra-high resolution, beautifully formatted PDF catalogue with complete item specs, purity grades, and direct WhatsApp inquiry links for offline viewing or printing.
          </p>
        </div>

        {/* Catalogue Options Form */}
        <div className="mt-5 space-y-4 text-xs">
          {/* Mode Selection */}
          <div>
            <label className="block text-[0.68rem] uppercase tracking-wider text-gold font-semibold mb-2">
              Select Catalogue Scope
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "FILTERED", label: "Current View", count: currentFilteredProducts.length, sub: "Filtered items" },
                { id: "ALL", label: "Master Book", count: allProducts.length, sub: "Full collection" },
                { id: "CATEGORY", label: "By Category", count: selectedProducts.length, sub: "Specific section" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDownloadMode(opt.id as any)}
                  className={`flex flex-col items-center justify-center p-3 rounded border text-center transition-all ${
                    downloadMode === opt.id
                      ? "bg-gradient-to-b from-[#4a0810] to-[#210406] border-gold text-amber-200 shadow-md font-bold"
                      : "bg-onyx/90 border-gold/30 text-muted-foreground hover:border-gold/60 hover:text-foreground"
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider font-bold">{opt.label}</span>
                  <span className="text-[0.62rem] text-gold font-semibold mt-0.5">{opt.count} items</span>
                  <span className="text-[0.55rem] text-muted-foreground mt-0.5">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown if BY CATEGORY is active */}
          {downloadMode === "CATEGORY" && (
            <div className="p-3 rounded border border-gold/30 bg-black/40">
              <label className="block text-[0.65rem] uppercase tracking-wider text-gold font-semibold mb-1.5">
                Choose Specific Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-onyx border border-gold/40 rounded px-3 py-2 text-xs text-foreground font-semibold outline-none focus:border-gold"
              >
                {[
                  "BRIDAL SET",
                  "RINGS",
                  "BANGLES",
                  "EARRINGS",
                  "JHUMKA",
                  "NECKLACE",
                  "HARAM",
                  "CHAIN",
                  "GOLD COIN",
                  "DAILY WEAR",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} Catalogue ({allProducts.filter((p) => p.category.toUpperCase().includes(cat)).length} items)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Gold Rate Toggle */}
          <div className="p-3 rounded border border-gold/30 bg-black/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Include Live Store Gold Rate</p>
              <p className="text-[0.62rem] text-muted-foreground">
                Today's 22K Gold Rate: <strong className="text-amber-200">₹7,380 / g</strong> | Sarafa Market
              </p>
            </div>
            <input
              type="checkbox"
              checked={includeGoldRate}
              onChange={(e) => setIncludeGoldRate(e.target.checked)}
              className="size-4 accent-gold cursor-pointer"
            />
          </div>

          {/* Catalogue Summary Preview Box */}
          <div className="p-3 rounded bg-gradient-to-r from-[#4a0810]/40 via-onyx to-[#4a0810]/40 border border-gold/40 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <p className="text-[0.62rem] uppercase tracking-widest text-gold font-bold">
                ESTIMATED CATALOGUE SIZE
              </p>
              <p className="text-foreground font-semibold">
                <span className="text-amber-200 font-bold">{selectedProducts.length}</span> Items · ~
                <span className="text-amber-200 font-bold">{estimatedPages}</span> A4 PDF Pages
              </p>
              <p className="text-[0.6rem] text-muted-foreground">
                Includes 100% BIS Hallmark Guarantee & Direct WhatsApp Links
              </p>
            </div>
            <div className="shrink-0 p-2 rounded-full bg-gold/10 border border-gold/30">
              <SparklesIcon className="size-5 text-gold" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating || selectedProducts.length === 0}
            className="shine-sweep flex items-center justify-center gap-2 w-full rounded bg-gradient-to-r from-gold via-amber-300 to-gold px-4 py-3.5 text-xs uppercase tracking-widest text-primary-foreground font-bold text-center transition-all shadow-xl hover:brightness-110 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin size-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                Generating Luxury PDF...
              </span>
            ) : (
              <>
                <CrownIcon className="size-4 text-primary-foreground" />
                Download PDF Catalogue ({selectedProducts.length} Items)
              </>
            )}
          </button>

          {isGenerating && progressMessage && (
            <p className="text-[0.65rem] text-amber-200 text-center animate-pulse font-medium">
              {progressMessage}
            </p>
          )}

          <p className="text-[0.58rem] text-muted-foreground text-center">
            A.P.P. Jewellers, Sarafa Market, New Delhi · Tel: 090151 55615 · WhatsApp: +91 90151 55615
          </p>
        </div>
      </div>
    </div>
  );
}
