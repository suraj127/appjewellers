import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  fallbackImage?: string;
  categoryFilter?: string;
  badge?: string;
}

const POPULAR_CATEGORIES: CategoryItem[] = [
  {
    id: "earring",
    name: "Earring",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/antique_temple_earrings.jpg",
    categoryFilter: "EARRINGS",
  },
  {
    id: "bracelet",
    name: "Bracelet",
    image: "https://images.unsplash.com/photo-1611591475838-8c10fa8c8c2c?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/antique_temple_kada.jpg",
    categoryFilter: "BRACELETS",
  },
  {
    id: "ring",
    name: "Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    categoryFilter: "RINGS",
  },
  {
    id: "diamond",
    name: "Diamond",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/diamond_cluster_necklace_102.png",
    categoryFilter: "DIAMOND",
  },
  {
    id: "anklet",
    name: "Anklet",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/royal_gold_chain_101.png",
    categoryFilter: "ANKLETS",
  },
  {
    id: "nose-pin",
    name: "Nose Pin",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    categoryFilter: "NOSE STUDS",
  },
  {
    id: "bangles",
    name: "Bangles",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    fallbackImage: "/assets/coll-bangles.jpg",
    categoryFilter: "BANGLES",
  },
  {
    id: "jhumka",
    name: "Jhumka",
    image: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    fallbackImage: "/assets/items/antique_temple_earrings.jpg",
    categoryFilter: "JHUMKA",
  },
  {
    id: "necklace",
    name: "Necklace",
    image: "/assets/items/royal_diamond_haar_103.jpg",
    fallbackImage: "/assets/coll-bridal.jpg",
    categoryFilter: "NECKLACE",
  },
  {
    id: "gold-coin",
    name: "Gold Coin",
    image: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    fallbackImage: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    categoryFilter: "GOLD COIN",
  },
];

export function PopularCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-background border-b border-gold/15 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
              Popular Categories
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-500 font-sans max-w-xl mx-auto">
              Explore our exquisite collection of handcrafted jewelry pieces
            </p>
          </div>
        </Reveal>

        {/* Carousel Container with Left/Right Arrows */}
        <div className="relative group/slider px-2 sm:px-6">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            className={`absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 size-9 sm:size-11 rounded-full bg-white/95 border border-zinc-200 shadow-md text-[#9b2226] hover:text-[#b8860b] hover:border-[#b8860b]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed pointer-events-none" : "opacity-90 hover:opacity-100"
            }`}
          >
            <ChevronLeft className="size-5 sm:size-6 stroke-[2.5]" />
          </button>

          {/* Categories Horizontal Scroll List */}
          <div
            ref={scrollRef}
            className="flex items-center gap-5 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {POPULAR_CATEGORIES.map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 0.05}>
                <Link
                  to="/collections"
                  search={{ category: cat.categoryFilter }}
                  className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
                >
                  {/* Outer Circular Frame with Elegant Double Ring */}
                  <div className="relative p-1 sm:p-1.5 rounded-full border-2 border-zinc-200 group-hover:border-[#b8860b] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.25)] transition-all duration-300 bg-white">
                    {/* Inner Image Container */}
                    <div className="size-24 sm:size-28 md:size-32 rounded-full overflow-hidden bg-zinc-100 relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          if (cat.fallbackImage && e.currentTarget.src !== cat.fallbackImage) {
                            e.currentTarget.src = cat.fallbackImage;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Category Name Label */}
                  <span className="mt-3 text-sm sm:text-base font-medium text-zinc-800 group-hover:text-[#b8860b] transition-colors duration-200 text-center whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next categories"
            className={`absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 size-9 sm:size-11 rounded-full bg-white/95 border border-zinc-200 shadow-md text-[#9b2226] hover:text-[#b8860b] hover:border-[#b8860b]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer ${
              !canScrollRight ? "opacity-30 cursor-not-allowed pointer-events-none" : "opacity-90 hover:opacity-100"
            }`}
          >
            <ChevronRight className="size-5 sm:size-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
