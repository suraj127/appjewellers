import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllProducts, getLiveGoldRates } from "@/data/storeState";
import type { Product } from "@/data/products";
import logoImg from "@/assets/logo.png";
import craftImg from "@/assets/craft.jpg";
import {
  WhatsAppIcon,
  HeartIcon,
  PhoneIcon,
  CrownIcon,
  DiamondIcon,
  RingIcon,
  EarringIcon,
  NecklaceIcon,
} from "@/components/LuxuryIcons";
import {
  Search,
  Camera,
  Mic,
  SlidersHorizontal,
  ArrowUpDown,
  Menu,
  X,
  Store,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  Check,
  RotateCcw,
  Sparkle,
} from "lucide-react";

const title = "Collections — A.P.P. Jewellers, Sarafa Market, New Delhi";
const description =
  "Browse fine 22K BIS Hallmarked gold, solitaire diamond, and royal Delhi heritage jewelry collections from A.P.P. Jewellers.";

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
  component: CollectionPage,
});

/* ── Category Configuration for Drawer & Filter Chips ─────────────── */
const CATEGORIES = [
  { id: "ALL", label: "All Jewellery", tagLabel: "All", icon: CrownIcon },
  { id: "GOLD", label: "Gold", tagLabel: "Gold", icon: CrownIcon },
  { id: "DIAMOND", label: "Diamond", tagLabel: "Diamond", icon: DiamondIcon },
  { id: "EARRINGS", label: "Earrings", tagLabel: "Earrings", icon: EarringIcon },
  { id: "RINGS", label: "Rings", tagLabel: "Rings", icon: RingIcon },
  { id: "DAILY WEAR", label: "Daily Wear", tagLabel: "Daily Wear", icon: NecklaceIcon },
  { id: "GEMSTONE", label: "Gemstone", tagLabel: "Gemstone", icon: Sparkles },
  { id: "WEDDING", label: "Wedding", tagLabel: "Wedding", icon: CrownIcon },
  { id: "GIFTING", label: "Gifting", tagLabel: "Gifting", icon: Sparkle },
  { id: "UNDER 50K", label: "Under 50K", tagLabel: "Under 50K", icon: CrownIcon },
];

/* Helper to estimate formatted INR price */
function formatProductPrice(product: Product): { priceFormatted: string; numericPrice: number } {
  const weightStr = product.dimensions?.find((d) =>
    d[0].toLowerCase().includes("weight")
  )?.[1];
  let weight = 7.5;
  if (weightStr) {
    const match = weightStr.match(/([\d.]+)/);
    if (match) weight = parseFloat(match[1]);
  }

  const liveRates = getLiveGoldRates();
  let rate = liveRates.rate22k || 7380;
  if (product.purity?.includes("18")) rate = liveRates.rate18k || 6040;
  else if (product.purity?.includes("24")) rate = liveRates.rate24k || 8050;

  let base = weight * rate;
  if (product.metal === "DIAMOND") base *= 1.42;
  else if (product.metal === "PLATINUM") base *= 1.35;
  else if (product.metal === "GEMSTONE") base *= 1.25;

  const total = Math.round(base * 1.14);
  return {
    numericPrice: total,
    priceFormatted: `₹ ${total.toLocaleString("en-IN")}`,
  };
}

/* Helper stock/urgency badge */
function getProductBadge(product: Product, index: number): string | null {
  if (index % 5 === 1) return "ONLY 1 LEFT!";
  if (index % 7 === 2) return "BIS 22K (916) CERTIFIED";
  if (index % 4 === 3) return "ATELIER EXCLUSIVE";
  if (product.isExclusive) return "LIMITED EDITION";
  return null;
}

export function CollectionPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(getAllProducts());
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedMetal, setSelectedMetal] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<"featured" | "price-low" | "price-high" | "newest">("featured");
  
  // UI States
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

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

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Category check
      if (selectedCategory !== "ALL") {
        if (selectedCategory === "GOLD" && p.metal !== "GOLD") return false;
        if (selectedCategory === "DIAMOND" && p.metal !== "DIAMOND" && !p.category.includes("SOLITAIRE")) return false;
        if (selectedCategory === "EARRINGS" && !p.category.includes("EAR") && !p.category.includes("JHUMKA") && !p.category.includes("STUD")) return false;
        if (selectedCategory === "RINGS" && !p.category.includes("RING")) return false;
        if (selectedCategory === "DAILY WEAR" && !p.category.includes("DAILY") && !p.category.includes("CHAIN")) return false;
        if (selectedCategory === "GEMSTONE" && p.metal !== "GEMSTONE") return false;
        if (selectedCategory === "WEDDING" && !p.category.includes("BRIDAL") && !p.category.includes("HARAM") && !p.category.includes("CHOKER")) return false;
        if (selectedCategory === "UNDER 50K") {
          const { numericPrice } = formatProductPrice(p);
          if (numericPrice > 50000) return false;
        }
      }

      // Metal check
      if (selectedMetal !== "ALL" && p.metal !== selectedMetal) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesMetal = p.metal.toLowerCase().includes(q);
        const matchesStory = p.story?.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesMetal && !matchesStory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price-low") {
        return formatProductPrice(a).numericPrice - formatProductPrice(b).numericPrice;
      }
      if (sortOption === "price-high") {
        return formatProductPrice(b).numericPrice - formatProductPrice(a).numericPrice;
      }
      if (sortOption === "newest") {
        return b.slug.localeCompare(a.slug);
      }
      return 0; // featured
    });
  }, [allProducts, selectedCategory, selectedMetal, searchQuery, sortOption]);

  // Voice recognition
  const handleVoiceSearch = () => {
    setIsVoiceModalOpen(true);
    setIsListening(true);
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.start();
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsListening(false);
          setTimeout(() => setIsVoiceModalOpen(false), 800);
        };
        recognition.onerror = () => {
          setIsListening(false);
        };
      } catch (e) {
        console.log("Speech recognition not supported", e);
      }
    }
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans antialiased pb-20 selection:bg-[#E8DFC8]">
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. LUXURY STICKY HEADER (Tanishq Mobile Layout + Brand Tokens) */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#fcfaf2]/95 backdrop-blur-xl border-b border-[#b8860b]/30 shadow-xs">
        {/* Top bar: Hamburger, Logo, Store/Wishlist/Cart Icons */}
        <div className="flex items-center justify-between px-3 sm:px-8 py-2.5">
          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="p-1.5 text-zinc-900 hover:text-[#b8860b] transition-colors rounded-lg active:bg-black/5"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="size-5.5 sm:size-6 stroke-[1.8]" />
          </button>

          {/* Center Brand Identity */}
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img
              src={logoImg}
              alt="A.P.P. Jewellers Logo"
              className="h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(184,134,11,0.25)]"
            />
            <span className="font-display text-lg sm:text-2xl font-bold tracking-widest text-[#121212] uppercase">
              A.P.P.
            </span>
          </Link>

          {/* Right Action Icons: Store, Wishlist, Cart */}
          <div className="flex items-center gap-3 text-zinc-900">
            <Link
              to="/appointment"
              title="Store Locator & Visit"
              className="p-1 text-zinc-800 hover:text-[#b8860b] transition-colors"
            >
              <Store className="size-5 stroke-[1.8]" />
            </Link>

            <button
              type="button"
              onClick={() => {
                if (wishlist.length > 0) {
                  setSearchQuery("");
                }
              }}
              title="Wishlist"
              className="relative p-1 text-zinc-800 hover:text-[#b8860b] transition-colors"
            >
              <HeartIcon className="size-5 text-current" filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[#b8860b] text-[0.6rem] font-bold text-white shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCartCount((prev) => prev + 1)}
              title="Shopping Cart"
              className="relative p-1 text-zinc-800 hover:text-[#b8860b] transition-colors"
            >
              <ShoppingBag className="size-5 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[#b8860b] text-[0.6rem] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar Input Row */}
        <div className="px-3 sm:px-8 pb-3 pt-0.5">
          <div className="relative flex items-center w-full rounded-full border border-[#b8860b]/30 bg-[#FFFFFF] px-3.5 py-2 shadow-xs transition-all focus-within:border-[#b8860b] focus-within:ring-1 focus-within:ring-[#b8860b]">
            <Search className="size-4 text-[#b8860b] shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 22K gold rings, diamond necklace..."
              className="w-full bg-transparent font-sans text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 text-zinc-400 hover:text-zinc-700 mr-1"
              >
                <X className="size-3.5" />
              </button>
            )}
            <div className="flex items-center gap-2 border-l border-[#b8860b]/20 pl-2 shrink-0 text-[#b8860b]">
              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                title="Visual Search / Upload Image"
                className="p-1 hover:text-[#8b5a00] transition-colors"
              >
                <Camera className="size-4 stroke-[1.8]" />
              </button>
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className="p-1 hover:text-[#8b5a00] transition-colors"
              >
                <Mic className="size-4 stroke-[1.8]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. COLLECTION PAGE TITLE & STATS COUNTER                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="px-3.5 sm:px-8 pt-5 pb-2">
        <div className="flex items-baseline gap-2.5">
          <h1 className="font-display text-2xl sm:text-4xl text-[#121212] font-semibold tracking-tight">
            {searchQuery ? `Search: "${searchQuery}"` : activeCategoryObj.label}
          </h1>
          <span className="font-sans text-[0.72rem] sm:text-xs text-[#777] font-semibold tracking-widest uppercase">
            ({filteredProducts.length} CREATIONS)
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. FILTER & SORT CONTROL BAR + Quick Filter Tags               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="px-3.5 sm:px-8 py-2 border-b border-[#b8860b]/15 bg-[#FAF8F5]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Round Filter Icon Button */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex size-9 items-center justify-center rounded-full border transition-all shrink-0 active:scale-95 ${
              selectedMetal !== "ALL"
                ? "border-[#b8860b] bg-[#b8860b] text-white shadow-xs"
                : "border-[#b8860b]/30 bg-white text-zinc-900 hover:border-[#b8860b]"
            }`}
            aria-label="Filter products"
          >
            <SlidersHorizontal className="size-3.5 stroke-[1.8]" />
          </button>

          {/* Round Sort Icon Button */}
          <button
            type="button"
            onClick={() => setIsSortModalOpen(true)}
            className={`flex size-9 items-center justify-center rounded-full border transition-all shrink-0 active:scale-95 ${
              sortOption !== "featured"
                ? "border-[#b8860b] bg-[#b8860b] text-white shadow-xs"
                : "border-[#b8860b]/30 bg-white text-zinc-900 hover:border-[#b8860b]"
            }`}
            aria-label="Sort products"
          >
            <ArrowUpDown className="size-3.5 stroke-[1.8]" />
          </button>

          {/* "+Show More" / Category Pill Tags */}
          <button
            type="button"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="px-3.5 py-1.5 rounded-full border border-[#b8860b]/40 bg-[#f7f4ea] font-sans text-[0.68rem] font-bold tracking-wider uppercase text-[#8b5a00] hover:bg-[#b8860b] hover:text-white transition-colors shrink-0"
          >
            {showMoreCategories ? "Less" : "+Show More"}
          </button>

          {CATEGORIES.slice(0, showMoreCategories ? CATEGORIES.length : 6).map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-[0.68rem] font-bold uppercase tracking-wider transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#121212] text-[#FAF8F5] shadow-xs"
                    : "bg-white border border-[#b8860b]/20 text-zinc-800 hover:bg-[#f7f4ea] hover:border-[#b8860b]/50"
                }`}
              >
                {cat.tagLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. LUXURY PRODUCT GRID (2 Columns Mobile, 3-4 Desktop)        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <main className="px-2.5 sm:px-8 pt-4">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <CrownIcon className="size-12 mx-auto text-[#b8860b]/40" />
            <h3 className="font-display text-xl font-medium text-zinc-800">
              No creations match your current search.
            </h3>
            <p className="font-sans text-xs text-[#777] max-w-sm mx-auto leading-relaxed">
              Try adjusting your filter criteria or search query to explore our royal Delhi atelier inventory.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedMetal("ALL");
                setSearchQuery("");
                setSortOption("featured");
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#121212] px-6 py-2.5 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#FAF8F5] shadow-md hover:bg-[#b8860b] hover:text-white transition-all"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredProducts.map((product, idx) => {
              const isWishlisted = wishlist.includes(product.slug);
              const { priceFormatted } = formatProductPrice(product);
              const badgeText = getProductBadge(product, idx);

              const whatsappEnquiryMsg = encodeURIComponent(
                `Hi A.P.P. Jewellers, I am interested in inquiring about "${product.name}" (${product.purity || "22K"}, SKU: ${product.slug.toUpperCase()}). Please share the exact price breakdown and availability.`
              );

              return (
                <div
                  key={product.slug}
                  className="group relative flex flex-col justify-between rounded-xs border border-[#b8860b]/20 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#b8860b]/60 transition-all duration-300"
                >
                  {/* Card Top: Image Box */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative w-full aspect-[3/4] bg-[#FAF8F5] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Wishlist Heart Icon Top Right */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.slug);
                      }}
                      aria-label="Wishlist piece"
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-xs transition-transform active:scale-90 shadow-xs hover:scale-110"
                    >
                      <HeartIcon
                        filled={isWishlisted}
                        className={`size-3.5 sm:size-4 ${
                          isWishlisted ? "text-rose-600" : "text-[#121212]"
                        }`}
                      />
                    </button>

                    {/* Stock / Urgent Tag Badge Banner */}
                    {badgeText && (
                      <div className="absolute inset-x-0 bottom-0 bg-[#fcfaf2]/95 border-t border-[#b8860b]/30 py-1 text-center backdrop-blur-xs">
                        <span className="font-sans text-[0.54rem] sm:text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#8b5a00]">
                          {badgeText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content: Title, Price & WHATSAPP ENQUIRY Button */}
                  <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2.5 bg-white">
                    <div className="space-y-0.5">
                      <p className="font-sans text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] uppercase text-[#888] font-semibold truncate">
                        {product.purity || "22K GOLD"} · {product.metal}
                      </p>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="font-display text-sm sm:text-lg font-normal text-[#121212] line-clamp-2 leading-snug cursor-pointer group-hover:text-[#b8860b] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="font-display text-sm sm:text-base font-bold text-[#8b5a00] pt-0.5">
                        {priceFormatted}
                      </p>
                    </div>

                    {/* WHATSAPP ENQUIRY BUTTON (User directive: NOT FIND IN STORE, JUST WHATSAPP ENQUIRY) */}
                    <a
                      href={`https://wa.me/919015155615?text=${whatsappEnquiryMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 w-full py-2 sm:py-2.5 rounded-full border border-[#b8860b] bg-[#fcfaf2] text-[#121212] font-sans text-[0.58rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all hover:bg-[#b8860b] hover:text-white active:scale-95 shadow-2xs"
                    >
                      <WhatsAppIcon className="size-3 sm:size-3.5 text-current shrink-0" />
                      <span>WHATSAPP ENQUIRY</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 5. LUXURY CATEGORY DRAWER (Matching Nav and Design Tokens)     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {isCategoryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setIsCategoryDrawerOpen(false)}
          />

          {/* Drawer container */}
          <aside className="relative w-[82%] max-w-sm bg-[#fcfaf2] border-r border-[#b8860b]/40 h-full shadow-2xl z-50 flex flex-col overflow-y-auto animate-slideRight">
            {/* Header: Brand Title */}
            <div className="p-4 bg-[#f7f4ea] border-b border-[#b8860b]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={logoImg}
                  alt="A.P.P. Jewellers"
                  className="h-6 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(184,134,11,0.25)]"
                />
                <div>
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-[#121212] block">
                    A.P.P. JEWELLERS
                  </span>
                  <span className="font-sans text-[0.5rem] tracking-[0.2em] text-[#8b5a00] uppercase font-semibold">
                    Sarafa Market, Delhi
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="p-1.5 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition-all"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Category Navigation Items List */}
            <nav className="flex-1 py-2 divide-y divide-[#b8860b]/10">
              {CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsCategoryDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-left font-display text-base transition-colors ${
                      isSelected
                        ? "bg-[#f7f4ea] text-[#b8860b] font-bold"
                        : "text-[#121212] hover:bg-[#FAF8F5] hover:text-[#b8860b]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <IconComp className={`size-4.5 ${isSelected ? "text-[#b8860b]" : "text-[#8b5a00]"}`} />
                      <span>{cat.label}</span>
                    </div>
                    <ChevronRight className="size-4 text-[#b8860b]/50" />
                  </button>
                );
              })}
            </nav>

            {/* Drawer Bottom Quick Action */}
            <div className="p-4 border-t border-[#b8860b]/20 bg-[#f7f4ea] space-y-2.5">
              <Link
                to="/appointment"
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="block text-center py-2.5 rounded-full bg-[#121212] text-[#FAF8F5] font-sans text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:bg-[#b8860b] hover:text-white transition-all"
              >
                Book Atelier Visit
              </Link>
              <a
                href="tel:09015155615"
                className="flex items-center justify-center gap-1.5 py-1.5 font-sans text-xs font-bold text-zinc-800 hover:text-[#b8860b] tracking-wider uppercase"
              >
                <PhoneIcon className="size-3.5 text-[#b8860b]" />
                <span>Call: 090151 55615</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 6. FILTER MODAL DRAWER                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsFilterModalOpen(false)}
          />
          <div className="relative w-full max-w-xs sm:max-w-md bg-[#fcfaf2] border-l border-[#b8860b]/40 h-full shadow-2xl z-50 flex flex-col justify-between p-5 animate-slideLeft overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#b8860b]/20">
                <h3 className="font-display text-xl font-bold text-[#121212]">
                  Filter Jewellery
                </h3>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1 text-zinc-500 hover:text-zinc-900"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Metal Filter */}
              <div className="space-y-2.5">
                <label className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#8b5a00]">
                  Metal & Material
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["ALL", "GOLD", "DIAMOND", "PLATINUM", "SILVER", "GEMSTONE"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMetal(m)}
                      className={`py-2 px-3 rounded-full font-sans text-xs font-semibold border transition-all ${
                        selectedMetal === m
                          ? "border-[#b8860b] bg-[#b8860b] text-white shadow-xs"
                          : "border-[#b8860b]/20 bg-white text-zinc-800 hover:border-[#b8860b]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5">
                <label className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#8b5a00]">
                  Jewellery Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      className={`py-2 px-3 rounded-full font-sans text-xs font-semibold border text-left transition-all ${
                        selectedCategory === c.id
                          ? "border-[#b8860b] bg-[#b8860b] text-white shadow-xs"
                          : "border-[#b8860b]/20 bg-white text-zinc-800 hover:border-[#b8860b]"
                      }`}
                    >
                      {c.tagLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#b8860b]/20 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedMetal("ALL");
                  setIsFilterModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-full border border-zinc-300 font-sans text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-100"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#121212] text-[#FAF8F5] font-sans text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#b8860b] hover:text-white transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 7. SORT MODAL                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {isSortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsSortModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#fcfaf2] border border-[#b8860b]/30 rounded-t-2xl sm:rounded-2xl shadow-2xl z-50 p-5 space-y-4 animate-slideUp">
            <div className="flex items-center justify-between pb-2 border-b border-[#b8860b]/20">
              <h3 className="font-display text-xl font-bold text-[#121212]">
                Sort Jewellery By
              </h3>
              <button
                type="button"
                onClick={() => setIsSortModalOpen(false)}
                className="p-1 text-zinc-500 hover:text-zinc-900"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-1">
              {[
                { id: "featured", label: "Featured & Atelier Curation" },
                { id: "price-low", label: "Price: Low to High" },
                { id: "price-high", label: "Price: High to Low" },
                { id: "newest", label: "Newest Arrivals" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSortOption(opt.id as any);
                    setIsSortModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg font-sans text-xs font-semibold tracking-wide transition-colors ${
                    sortOption === opt.id
                      ? "bg-[#f7f4ea] text-[#8b5a00] font-bold border border-[#b8860b]/30"
                      : "text-zinc-800 hover:bg-black/5"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortOption === opt.id && <Check className="size-4 text-[#b8860b]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 8. VOICE SEARCH MODAL                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsVoiceModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#fcfaf2] border border-[#b8860b]/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl z-50 animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700"
            >
              <X className="size-5" />
            </button>
            <div className="flex size-16 mx-auto items-center justify-center rounded-full bg-[#b8860b]/15 text-[#b8860b] animate-pulse">
              <Mic className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#121212]">
              {isListening ? "Listening..." : "Voice Search"}
            </h3>
            <p className="font-sans text-xs text-[#666]">
              Say &quot;Gold Necklace&quot;, &quot;Solitaire Ring&quot; or &quot;Bridal Set&quot;
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 9. CAMERA / VISUAL SEARCH MODAL                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCameraModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#fcfaf2] border border-[#b8860b]/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl z-50 animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700"
            >
              <X className="size-5" />
            </button>
            <div className="flex size-16 mx-auto items-center justify-center rounded-full bg-[#b8860b]/15 text-[#b8860b]">
              <Camera className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#121212]">
              Visual Jewellery Search
            </h3>
            <p className="font-sans text-xs text-[#666] leading-relaxed">
              Upload or snap a photo of any design to match with our Sarafa Market Delhi archive.
            </p>
            <label className="block w-full py-3 rounded-full border border-[#b8860b] bg-[#f7f4ea] text-[#8b5a00] font-sans text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#b8860b] hover:text-white transition-colors">
              <span>Choose Photo / Take Picture</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSearchQuery("Ring");
                    setIsCameraModalOpen(false);
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 10. PRODUCT DETAIL MODAL                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
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

/* ── Full Product Detail Reader Component ────────────────────────────── */
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
  const { priceFormatted } = formatProductPrice(product);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const whatsappInquiry = encodeURIComponent(
    `Hi A.P.P. Jewellers, I am interested in inquiring about "${product.name}" (${product.purity || "22K Gold"}, Price: ${priceFormatted}, SKU: ${product.slug.toUpperCase()}). Please share details and availability.`
  );

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-[#FAF8F5] text-[#121212] animate-fadeIn">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#b8860b]/20 bg-[#fcfaf2]/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="A.P.P. Jewellers" className="h-6 w-auto object-contain" />
          <span className="font-display font-bold text-lg text-[#121212] tracking-wider">
            A.P.P. Atelier
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-full border border-[#121212]/30 px-3.5 py-1 font-sans text-xs font-bold uppercase tracking-wider text-zinc-800 hover:bg-[#121212] hover:text-[#FAF8F5] transition-all"
        >
          <span>CLOSE</span>
          <X className="size-3.5" />
        </button>
      </header>

      {/* Body Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-1.5">
          <p className="font-sans text-[0.62rem] uppercase tracking-[0.25em] text-[#8b5a00] font-bold">
            {product.purity || "22K BIS HALLMARKED"} · {product.metal}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-normal text-[#121212]">
            {product.name}
          </h1>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#8b5a00]">
            {priceFormatted}
          </p>
        </div>

        {/* Large Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-[#FAF8F5] border border-[#b8860b]/20 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Description Story */}
        <p className="font-display text-base leading-relaxed text-[#444] text-center max-w-xl mx-auto italic">
          {product.story ||
            product.tagline ||
            "Masterpiece handcrafted at our Sarafa Market Delhi atelier using certified gold purity and master artisan setting techniques."}
        </p>

        {/* Actions: WHATSAPP ENQUIRY & Call */}
        <div className="space-y-2.5 pt-2">
          <a
            href={`https://wa.me/919015155615?text=${whatsappInquiry}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#121212] text-[#FAF8F5] font-sans text-xs font-bold uppercase tracking-[0.18em] shadow-md hover:bg-[#b8860b] hover:text-white transition-all active:scale-95"
          >
            <WhatsAppIcon className="size-4 text-current" />
            <span>WHATSAPP ENQUIRY NOW</span>
          </a>

          <a
            href="tel:09015155615"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-[#b8860b]/40 bg-white text-zinc-900 font-sans text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#f7f4ea] transition-all active:scale-95"
          >
            <PhoneIcon className="size-4 text-[#b8860b]" />
            <span>CALL ATELIER: 090151 55615</span>
          </a>
        </div>
      </div>
    </div>
  );
}
