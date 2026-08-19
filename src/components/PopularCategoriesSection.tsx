import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  videoUrl?: string;
  fallbackImage?: string;
  categoryFilter?: string;
}

const POPULAR_CATEGORIES: CategoryItem[] = [
  {
    id: "earring",
    name: "Earring",
    image: "/assets/categories/earring.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/04/18/36423-412217623_tiny.mp4",
    fallbackImage: "/assets/items/antique_temple_earrings.jpg",
    categoryFilter: "EARRINGS",
  },
  {
    id: "bracelet",
    name: "Bracelet",
    image: "/assets/categories/bracelet.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2022/12/12/142646-781034444_tiny.mp4",
    fallbackImage: "/assets/items/antique_temple_kada.jpg",
    categoryFilter: "BRACELETS",
  },
  {
    id: "ring",
    name: "Ring",
    image: "/assets/categories/ring.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83866-584777501_tiny.mp4",
    fallbackImage: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    categoryFilter: "RINGS",
  },
  {
    id: "diamond",
    name: "Diamond",
    image: "/assets/categories/diamond.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2020/09/25/51139-463283259_tiny.mp4",
    fallbackImage: "/assets/items/diamond_cluster_necklace_102.png",
    categoryFilter: "DIAMOND",
  },
  {
    id: "anklet",
    name: "Anklet",
    image: "/assets/categories/anklet.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2023/07/28/173665-849767784_tiny.mp4",
    fallbackImage: "/assets/items/royal_gold_chain_101.png",
    categoryFilter: "ANKLETS",
  },
  {
    id: "nose-pin",
    name: "Nose Pin",
    image: "/assets/categories/nosepin.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2024/02/10/200030-911802951_tiny.mp4",
    fallbackImage: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    categoryFilter: "NOSE STUDS",
  },
  {
    id: "bangles",
    name: "Bangles",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    videoUrl: "https://cdn.pixabay.com/video/2022/12/12/142646-781034444_tiny.mp4",
    fallbackImage: "/assets/coll-bangles.jpg",
    categoryFilter: "BANGLES",
  },
  {
    id: "jhumka",
    name: "Jhumka",
    image: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    videoUrl: "/assets/karigar/v2.mp4",
    fallbackImage: "/assets/items/antique_temple_earrings.jpg",
    categoryFilter: "JHUMKA",
  },
  {
    id: "necklace",
    name: "Necklace",
    image: "/assets/items/royal_diamond_haar_103.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2023/08/17/176465-855523910_tiny.mp4",
    fallbackImage: "/assets/coll-bridal.jpg",
    categoryFilter: "NECKLACE",
  },
  {
    id: "gold-coin",
    name: "Gold Coin",
    image: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    videoUrl: "/assets/karigar/v1.mp4",
    fallbackImage: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    categoryFilter: "GOLD COIN",
  },
];

function CategoryCard({ cat }: { cat: CategoryItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    // Ensure muted & inline autoplay for mobile compatibility
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted on some devices until interaction
      });
    }
  }, [videoError]);

  return (
    <Link
      to="/collections"
      search={{ category: cat.categoryFilter }}
      className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none select-none"
    >
      {/* Outer Circular Frame with Double-Ring Styling and Gold Glow on Hover */}
      <div className="relative p-1 sm:p-1.5 rounded-full border-2 border-zinc-200/90 group-hover:border-[#b8860b] group-hover:shadow-[0_0_22px_rgba(184,134,11,0.3)] transition-all duration-300 bg-white">
        {/* Inner Circle Media Container */}
        <div className="size-24 sm:size-28 md:size-32 lg:size-36 rounded-full overflow-hidden bg-zinc-950 relative shadow-inner">
          {cat.videoUrl && !videoError ? (
            <video
              ref={videoRef}
              src={cat.videoUrl}
              poster={cat.image}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700 ease-out pointer-events-none"
            />
          ) : (
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-500 ease-out"
              onError={(e) => {
                if (cat.fallbackImage && e.currentTarget.src !== cat.fallbackImage) {
                  e.currentTarget.src = cat.fallbackImage;
                }
              }}
            />
          )}

          {/* Subtle glossy glass ring overlay on hover */}
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-gold/40 pointer-events-none transition-colors duration-300" />
        </div>
      </div>

      {/* Category Label */}
      <span className="mt-3 text-sm sm:text-base font-medium text-zinc-800 group-hover:text-[#b8860b] transition-colors duration-200 text-center whitespace-nowrap">
        {cat.name}
      </span>
    </Link>
  );
}

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
    const offset = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-background border-b border-gold/15 overflow-hidden">
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

        {/* Carousel Container with Perfectly Aligned Arrow Navigation */}
        <div className="relative group/slider">
          {/* Left Arrow Button - Aligned with the center of the circular thumbnails */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            disabled={!canScrollLeft}
            className={`absolute left-0 sm:-left-2 md:-left-4 top-[3rem] sm:top-[3.5rem] md:top-[4rem] lg:top-[4.5rem] -translate-y-1/2 z-30 p-1.5 sm:p-2 text-[#9b2226] hover:text-[#b8860b] hover:scale-125 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              !canScrollLeft ? "opacity-20 pointer-events-none" : "opacity-90 hover:opacity-100"
            }`}
          >
            <ChevronLeft className="size-7 sm:size-9 md:size-10 stroke-[2.5]" />
          </button>

          {/* Categories Horizontal Scroll List */}
          <div
            ref={scrollRef}
            className="flex items-center gap-5 sm:gap-8 md:gap-10 overflow-x-auto scrollbar-none py-3 px-6 sm:px-8 md:px-10 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {POPULAR_CATEGORIES.map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 0.04}>
                <CategoryCard cat={cat} />
              </Reveal>
            ))}
          </div>

          {/* Right Arrow Button - Aligned with the center of the circular thumbnails */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next categories"
            disabled={!canScrollRight}
            className={`absolute right-0 sm:-right-2 md:-right-4 top-[3rem] sm:top-[3.5rem] md:top-[4rem] lg:top-[4.5rem] -translate-y-1/2 z-30 p-1.5 sm:p-2 text-[#9b2226] hover:text-[#b8860b] hover:scale-125 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              !canScrollRight ? "opacity-20 pointer-events-none" : "opacity-90 hover:opacity-100"
            }`}
          >
            <ChevronRight className="size-7 sm:size-9 md:size-10 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
