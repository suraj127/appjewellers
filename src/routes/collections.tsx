import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS, CATEGORY_GROUPS, type Product } from "@/data/products";
import bridalBannerImg from "@/assets/coll-bridal.jpg";
import craftImg from "@/assets/craft.jpg";

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
                className="shine-sweep flex items-center justify-center gap-2 w-full rounded bg-emerald-600 px-4 py-3 text-xs uppercase tracking-widest text-white font-bold text-center hover:bg-emerald-500 transition-colors shadow-lg"
              >
                <WhatsAppIcon className="size-4" /> Price on Request via WhatsApp
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
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeMetal, setActiveMetal] = useState<string>("ALL");
  const [activePurity, setActivePurity] = useState<string>("ALL");
  const [activeOccasion, setActiveOccasion] = useState<string>("ALL");
  const [activeForWhom, setActiveForWhom] = useState<string>("ALL");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("BEST_MATCHES");

  const [megaMenuTab, setMegaMenuTab] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  // Toggle Wishlist
  const toggleWishlist = (slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Efficient Filtering Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
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

      return matchCat && matchMetal && matchPurity && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "NEWEST") return b.slug.localeCompare(a.slug);
      if (sortBy === "PURITY") return b.purity.localeCompare(a.purity);
      return 0; // BEST_MATCHES default
    });
  }, [activeCategory, activeMetal, activePurity, searchQuery, sortBy]);

  return (
    <>
      <Nav />
      <main className="px-4 sm:px-8 pb-32 pt-36 bg-background text-foreground min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* SLEEK MINIMAL HEADER WITH ROYAL BURGUNDY RED GRADIENT */}
          <div className="bg-gradient-to-r from-[#4a0810] via-[#210406] to-[#4a0810] border border-gold/50 rounded-lg p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
            {/* Search Input */}
            <div className="relative flex items-center w-full md:max-w-md">
              <SearchIcon className="absolute left-3.5 size-4 text-gold" />
              <input
                type="text"
                placeholder="Search rings, bangles, haram, kundan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-onyx/90 border border-gold/40 focus:border-gold rounded-full pl-10 pr-9 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-gold hover:text-white"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              )}
            </div>

            {/* Single-Row Horizontally Scrollable Category Pills (Hidden Native Scrollbar) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1 max-w-full">
              {MEGA_NAV_ITEMS.map((item) => {
                const isActive =
                  activeCategory === item.id ||
                  (item.id === "GOLD" && activeMetal === "GOLD") ||
                  (item.id === "DIAMOND" && activeMetal === "DIAMOND");
                const IconComp = item.IconComponent;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(item.id);
                      if (item.id === "GOLD") setActiveMetal("GOLD");
                      if (item.id === "DIAMOND") setActiveMetal("DIAMOND");
                      if (item.id === "ALL") {
                        setActiveCategory("ALL");
                        setActiveMetal("ALL");
                        setActivePurity("ALL");
                      }
                    }}
                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.68rem] font-bold uppercase tracking-wider transition-all border ${
                      isActive
                        ? "bg-gold text-primary-foreground border-gold shadow-md"
                        : "bg-onyx/80 text-amber-100/80 border-gold/40 hover:border-gold hover:text-gold"
                    }`}
                  >
                    <IconComp className={`size-3.5 ${isActive ? "text-primary-foreground" : "text-gold"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE SPLIT LAYOUT MATCHING USER REFERENCE SCREENSHOT (Left Vertical Rail + Right 2-Col Grid) */}
          <div className="lg:hidden mt-4 flex gap-2 min-h-screen">
            {/* Left Vertical Category Rail */}
            <aside className="w-20 sm:w-24 shrink-0 bg-onyx/95 border-r border-gold/30 flex flex-col gap-1.5 p-1 max-h-[calc(100vh-100px)] sticky top-20 overflow-y-auto z-20 rounded-r-md">
              <p className="text-[0.52rem] uppercase tracking-widest text-gold font-bold text-center py-1 border-b border-gold/20">
                Categories
              </p>
              {[
                { label: "All", cat: "ALL", Icon: SparklesIcon },
                { label: "22K Gold", cat: "GOLD", metal: "GOLD", Icon: CrownIcon },
                { label: "Solitaire", cat: "DIAMOND", metal: "DIAMOND", Icon: DiamondIcon },
                { label: "Rings", cat: "RINGS", Icon: RingIcon },
                { label: "Bangles", cat: "BANGLES", Icon: RingIcon },
                { label: "Earrings", cat: "EARRINGS", Icon: EarringIcon },
                { label: "Jhumka", cat: "JHUMKA", Icon: EarringIcon },
                { label: "Necklace", cat: "NECKLACE", Icon: NecklaceIcon },
                { label: "Haram", cat: "HARAM", Icon: NecklaceIcon },
                { label: "Bridal", cat: "BRIDAL SET", Icon: CrownIcon },
                { label: "Gold Coins", cat: "GOLD COIN", Icon: CoinIcon },
              ].map((item) => {
                const isActive = activeCategory === item.cat;
                const IconComp = item.Icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setActiveCategory(item.cat);
                      if (item.metal) setActiveMetal(item.metal);
                    }}
                    className={`flex flex-col items-center text-center p-2 rounded transition-all ${
                      isActive
                        ? "bg-gold/20 border-l-4 border-gold text-gold font-bold shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-onyx"
                    }`}
                  >
                    <IconComp className={`size-4 ${isActive ? "text-gold" : "text-muted-foreground"}`} />
                    <span className="text-[0.55rem] uppercase tracking-wider font-semibold mt-1 leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </aside>

            {/* Right Product Grid for Mobile */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[0.62rem] uppercase tracking-widest text-gold font-bold">
                  {filteredProducts.length} Items
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-gold/40 rounded px-2 py-0.5 text-[0.6rem] text-gold font-bold outline-none"
                >
                  <option value="BEST_MATCHES">Sort: Matches</option>
                  <option value="NEWEST">Sort: Newest</option>
                  <option value="PURITY">Sort: Purity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map((product, idx) => {
                  const isWishlisted = wishlist.includes(product.slug);
                  return (
                    <div
                      key={product.slug}
                      className="group relative flex flex-col justify-between bg-onyx/80 border border-border/80 rounded overflow-hidden shadow"
                    >
                      <div className="relative block h-36 w-full overflow-hidden bg-black/40">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-1.5 left-1.5">
                          {product.purity && (
                            <span className="glass-panel text-gold font-bold text-[0.48rem] uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
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
                            className={`size-3 ${isWishlisted ? "text-rose-500" : "text-gold/80"}`}
                          />
                        </button>
                      </div>

                      <div className="p-2 flex flex-col justify-between flex-1 text-center">
                        <div>
                          <p className="text-[0.5rem] uppercase tracking-wider text-gold font-medium truncate">
                            {product.category}
                          </p>
                          <h3 className="mt-0.5 font-display text-xs text-foreground font-semibold leading-tight line-clamp-1">
                            {product.name}
                          </h3>
                        </div>

                        <div className="mt-2 pt-1 border-t border-border/40">
                          <button
                            type="button"
                            onClick={() => setInquiryProduct(product)}
                            className="shine-sweep w-full rounded bg-gold/15 border border-gold/50 py-1 text-[0.52rem] uppercase tracking-widest text-gold font-bold text-center"
                          >
                            INQUIRE
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DESKTOP CONTENT AREA: Left Facet Filter Sidebar + Right Product Grid */}
          <div className="hidden lg:grid mt-8 gap-6 lg:grid-cols-[260px_1fr]">
            {/* Left Filter Sidebar matching Tanishq Screenshot 2 */}
            <aside className="bg-onyx/90 border border-gold/30 rounded-sm p-5 space-y-6 h-fit sticky top-24">
              <div className="flex items-center justify-between border-b border-gold/30 pb-3">
                <h3 className="font-display text-base text-gold font-bold uppercase tracking-wider">
                  Filter Facets
                </h3>
                {(activeCategory !== "ALL" || activeMetal !== "ALL" || activePurity !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("ALL");
                      setActiveMetal("ALL");
                      setActivePurity("ALL");
                    }}
                    className="text-[0.6rem] text-gold underline hover:text-white uppercase tracking-widest"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Facet */}
              <div>
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
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/50">
                <p className="text-xs uppercase tracking-widest text-gold font-semibold">
                  Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> Jewellery Items
                </p>
                <span className="text-[0.62rem] text-muted-foreground">
                  Contact us for current gold rate & best price
                </span>
              </div>

              {/* Product Grid showcasing cards without pricing - 2 cols on mobile */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                {filteredProducts.map((product, idx) => {
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
                          {/* 1st Picture */}
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                          />
                          {/* 2nd Picture on hover */}
                          {product.hoverImage && (
                            <img
                              src={product.hoverImage}
                              alt={`${product.name} alternate view`}
                              loading="lazy"
                              className="absolute inset-0 size-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent opacity-80" />

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
                            <button
                              type="button"
                              onClick={() => setInquiryProduct(product)}
                              className="shine-sweep w-full rounded bg-[#e8e2d5]/10 border border-gold/50 px-2 sm:px-4 py-1.5 sm:py-2.5 text-[0.55rem] sm:text-[0.62rem] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold font-bold text-center transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
                            >
                              PRICE ON REQUEST
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

      {/* Quick Inquiry Modal */}
      {inquiryProduct && (
        <QuickInquiryModal
          product={inquiryProduct}
          onClose={() => setInquiryProduct(null)}
        />
      )}



      <Footer />
    </>
  );
}
