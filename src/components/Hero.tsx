import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles, ShieldCheck, Award, Gem, ChevronLeft, ChevronRight } from "lucide-react";
import logoImg from "@/assets/logo.png";

interface HeroSlide {
  image: string;
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  badge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/assets/hero/slide1.jpg",
    eyebrow: "SARAFA MARKET · NEW SEELAMPUR · DELHI",
    titleMain: "Where Heritage ",
    titleAccent: "Meets Luxury",
    subtitle: "Discover 100% BIS Hallmarked pure gold, GIA certified solitaires, royal Kundan bridal suites, and bespoke handmade jewellery in Delhi.",
    badge: "HAUTE JOAILLERIE",
  },
  {
    image: "/assets/hero/slide2.jpg",
    eyebrow: "ROYAL WEDDING COLLECTION",
    titleMain: "Imperial Bridal ",
    titleAccent: "Masterpieces",
    subtitle: "Ornate Kundan chokers, uncut Polki jewels, and certified 22K hallmarked gold bridal suites designed for royal celebrations.",
    badge: "BRIDAL ATELIER",
  },
  {
    image: "/assets/hero/slide3.jpg",
    eyebrow: "FINE DIAMOND CURATION",
    titleMain: "Certified Solitaire ",
    titleAccent: "Brilliance",
    subtitle: "GIA & IGI certified solitaires, precision pavé necklaces, and signature diamond jewellery cut for breathtaking light return.",
    badge: "SOLITAIRES",
  },
  {
    image: "/assets/hero/slide4.jpg",
    eyebrow: "SACRED ARTISTRY & MEENAKARI",
    titleMain: "Legacy of Master ",
    titleAccent: "Karigars",
    subtitle: "Preserving the ancient craft of hand-forged nakshi, temple gold repoussé, and heirloom Delhi craftsmanship since generations.",
    badge: "PURE HANDCRAFT",
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, title: "BIS 916 Hallmarked", sub: "100% Guaranteed Purity" },
  { icon: Gem, title: "GIA & IGI Certified", sub: "Real Solitaire Diamonds" },
  { icon: Award, title: "Lifetime Exchange", sub: "Transparent Valuation" },
  { icon: Sparkles, title: "Custom Atelier", sub: "Bespoke Karigar Orders" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Parallax subtle tilt effect
  useEffect(() => {
    const onMove = (e: MouseEvent | PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = touchStartX.current - e.changedTouches[0].clientX;
    if (distance > 40) nextSlide();
    else if (distance < -40) prevSlide();
    touchStartX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex min-h-[92vh] sm:min-h-screen flex-col justify-between overflow-hidden bg-[#0e0c0a] pt-24 sm:pt-32 pb-8 sm:pb-12 text-foreground border-b border-gold/30 select-none"
    >
      {/* ── BACKGROUND MULTI-SLIDE CROSS-FADE WITH SMOOTH KEN BURNS ZOOM ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={s.image}
              className={`absolute inset-0 size-full transition-all duration-1000 ease-out ${
                isActive ? "opacity-100 scale-105" : "opacity-0 scale-100 pointer-events-none"
              }`}
              style={{
                transform: `scale(${isActive ? 1.04 : 1}) translate3d(${tilt.x * -6}px, ${tilt.y * -6}px, 0)`,
                transition: "opacity 1.2s ease-in-out, transform 8s ease-out",
              }}
            >
              <img
                src={s.image}
                alt={s.titleMain}
                className="size-full object-cover object-center"
              />
            </div>
          );
        })}

        {/* ── LUXURY DUAL GRADIENT VEIL FOR 100% TEXT READABILITY ── */}
        {/* Top-to-bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90 pointer-events-none" />

        {/* Warm radial center spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(196, 147, 36, 0.18) 0%, rgba(10, 10, 10, 0.5) 60%, rgba(0, 0, 0, 0.9) 100%)",
          }}
        />

        {/* Interactive gold aura */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${50 + tilt.x * 20}% ${40 + tilt.y * 20}%, rgba(212, 175, 55, 0.22), transparent 70%)`,
          }}
        />
      </div>

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center my-auto flex flex-col items-center">
        {/* BRAND LOGO WITH GLOSS EFFECT */}
        <div className="relative flex justify-center mb-4 sm:mb-6 mx-auto">
          <img
            src={logoImg}
            alt="A.P.P. Jewellers Brand Logo"
            className="relative z-10 h-28 sm:h-36 md:h-40 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700 select-none"
          />
        </div>

        {/* EYEBROW BADGE */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">⊰⊱</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C49324]/80 bg-black/60 backdrop-blur-md px-4 sm:px-6 py-1 text-[0.68rem] sm:text-xs uppercase tracking-[0.28em] text-[#f5d77f] font-display font-semibold shadow-lg">
            <span className="size-1.5 rounded-full bg-[#d4af37] animate-ping" />
            {slide.eyebrow}
          </span>
          <span className="text-[#C49324] text-xs font-display select-none hidden sm:inline">⊰⊱</span>
        </div>

        {/* MAIN HEADLINE */}
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,5.2rem)] leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-4xl">
          <span className="font-semibold">{slide.titleMain}</span>
          <span className="italic font-normal luxury-sparkle-text text-[#f5d77f] block sm:inline">
            {slide.titleAccent}
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-xs sm:text-base font-normal leading-relaxed text-zinc-200 px-2 drop-shadow-md">
          {slide.subtitle}
        </p>

        {/* LUXURY CTA BUTTONS */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
          <Link
            to="/collections"
            className="shine-sweep group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-9 py-4 text-xs text-black font-extrabold uppercase tracking-[0.26em] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-[0_10px_35px_rgba(196,147,36,0.55)] hover:shadow-[0_15px_45px_rgba(196,147,36,0.8)] hover:brightness-110"
          >
            <span>Explore Collections</span>
            <ArrowRight className="size-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="#store-info"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#b8860b]/70 bg-black/60 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#aa771c] hover:text-black hover:border-transparent px-9 py-4 text-xs uppercase tracking-[0.24em] text-amber-100 font-bold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto text-center shadow-lg"
          >
            <MapPin className="size-4 text-[#d4af37] group-hover:text-black" />
            <span>Visit Showroom</span>
          </a>
        </div>
      </div>

      {/* ── BOTTOM NAVIGATION CONTROLS & TRUST BADGES ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 mt-6 sm:mt-10">
        {/* SLIDE PROGRESS SELECTORS */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="size-8 rounded-full bg-black/60 border border-gold/40 text-amber-100 hover:text-gold hover:border-gold transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.badge}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Slide ${idx + 1}: ${s.badge}`}
                  className={`group relative h-9 px-3 sm:px-4 rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#d4af37]/25 border-[#d4af37] text-amber-100 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-black/40 border-white/15 text-zinc-400 hover:border-gold/50 hover:text-zinc-200"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full transition-colors ${
                      isActive ? "bg-[#d4af37]" : "bg-zinc-500 group-hover:bg-gold/80"
                    }`}
                  />
                  <span className="text-[0.62rem] sm:text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap">
                    {s.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="size-8 rounded-full bg-black/60 border border-gold/40 text-amber-100 hover:text-gold hover:border-gold transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* TRUST BADGES BAR */}
        <div className="hidden md:grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
          {TRUST_BADGES.map((b) => (
            <div key={b.title} className="flex items-center gap-3 justify-center text-left">
              <div className="size-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                <b.icon className="size-4" />
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-zinc-100 leading-tight">
                  {b.title}
                </p>
                <p className="text-[0.62rem] text-zinc-400 font-medium">
                  {b.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
