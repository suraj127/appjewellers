import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
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
    image: "/assets/items/antique_temple_earrings.jpg",
    videoUrl: "/assets/categories/earring.mp4",
    categoryFilter: "EARRINGS",
  },
  {
    id: "bracelet",
    name: "Bracelet",
    image: "/assets/items/antique_temple_kada.jpg",
    videoUrl: "/assets/categories/bracelet.mp4",
    categoryFilter: "BRACELETS",
  },
  {
    id: "ring",
    name: "Ring",
    image: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    videoUrl: "/assets/categories/ring.mp4",
    categoryFilter: "RINGS",
  },
  {
    id: "diamond",
    name: "Diamond",
    image: "/assets/items/diamond_cluster_necklace_102.png",
    videoUrl: "/assets/categories/diamond.mp4",
    categoryFilter: "DIAMOND",
  },
  {
    id: "anklet",
    name: "Anklet",
    image: "/assets/items/royal_gold_chain_101.png",
    videoUrl: "/assets/categories/anklet.mp4",
    categoryFilter: "ANKLETS",
  },
  {
    id: "nose-pin",
    name: "Nose Pin",
    image: "/assets/items/diamond_solitaire_ring_1785608029662.png",
    videoUrl: "/assets/categories/nosepin.mp4",
    categoryFilter: "NOSE STUDS",
  },
  {
    id: "bangles",
    name: "Bangles",
    image: "/assets/items/emerald_gold_bangles_1785608060682.png",
    videoUrl: "/assets/categories/bangles.mp4",
    categoryFilter: "BANGLES",
  },
  {
    id: "jhumka",
    name: "Jhumka",
    image: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    videoUrl: "/assets/categories/jhumka.mp4",
    categoryFilter: "JHUMKA",
  },
  {
    id: "necklace",
    name: "Necklace",
    image: "/assets/items/royal_diamond_haar_103.jpg",
    videoUrl: "/assets/categories/necklace.mp4",
    categoryFilter: "NECKLACE",
  },
  {
    id: "gold-coin",
    name: "Gold Coin",
    image: "/assets/items/gold_lakshmi_coin_1785608088525.png",
    videoUrl: "/assets/categories/gold-coin.mp4",
    categoryFilter: "GOLD COIN",
  },
];

function CategoryCard({ cat }: { cat: CategoryItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // IntersectionObserver: only load & play video when card is near the viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" } // start loading 200px before entering view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause video based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (isVisible) {
      // Set src only when visible (lazy-load the actual bytes)
      if (!video.src && cat.videoUrl) {
        video.src = cat.videoUrl;
      }
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      // Pause & release memory when off-screen
      video.pause();
      video.removeAttribute("src");
      video.load(); // reset the video element to free buffered data
    }
  }, [isVisible, videoError, cat.videoUrl]);

  return (
    <Link
      to="/collections"
      search={{ category: cat.categoryFilter }}
      className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none select-none px-3 sm:px-4"
    >
      {/* Outer Circular Frame with Double-Ring Styling and Gold Glow on Hover */}
      <div ref={cardRef} className="relative p-1 sm:p-1.5 rounded-full border-2 border-zinc-200/90 group-hover:border-[#b8860b] group-hover:shadow-[0_0_22px_rgba(184,134,11,0.3)] transition-all duration-300 bg-white">
        {/* Inner Circle Media Container */}
        <div className="size-24 sm:size-28 md:size-32 lg:size-36 rounded-full overflow-hidden bg-zinc-950 relative shadow-inner">
          {cat.videoUrl && !videoError ? (
            <video
              ref={videoRef}
              poster={cat.image}
              loop
              muted
              playsInline
              preload="none"
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
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items twice to ensure endless continuous loop across all screen widths
  const loopedCategories = [...POPULAR_CATEGORIES, ...POPULAR_CATEGORIES];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-background border-b border-gold/15 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center pb-2 mb-8 sm:mb-12">
          <p className="eyebrow text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold">
            Curated Collections
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-zinc-900">
            Popular Categories
          </h2>
          <p className="mt-3 text-sm sm:text-base font-normal leading-relaxed text-zinc-600 max-w-2xl mx-auto px-4">
            Explore our exquisite collection of handcrafted jewelry pieces
          </p>
          <div className="mx-auto mt-4 w-28 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-[#b8860b] to-transparent" />
        </div>
      </div>

      {/* Seamless Infinite Auto-Scroll Loop Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Soft Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex w-max py-3"
          style={{
            animation: `categoryInfiniteScroll 35s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {loopedCategories.map((cat, idx) => (
            <CategoryCard key={`${cat.id}-${idx}`} cat={cat} />
          ))}
        </div>
      </div>

      {/* Inline styles for hardware-accelerated smooth marquee */}
      <style>{`
        @keyframes categoryInfiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
