import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X, Search, MapPin, Heart, Sparkles, Phone, Camera, Mic } from "lucide-react";
import logoImg from "@/assets/logo.png";

/* ── Custom Fine Jewelry Line Art Icons ──────────────────────────── */
function AllJewelleryIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 6c0 6.6 3.6 12 8 12s8-5.4 8-12" />
      <path d="M12 18v3" />
      <circle cx="12" cy="22" r="1" fill="currentColor" />
      <circle cx="7" cy="11" r="1.5" />
      <circle cx="17" cy="11" r="1.5" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
}

function GoldIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="9" cy="12" rx="6" ry="8" transform="rotate(-20 9 12)" />
      <ellipse cx="15" cy="12" rx="6" ry="8" transform="rotate(20 15 12)" />
    </svg>
  );
}

function DiamondIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      <path d="M10 3l-2 6 4 12 4-12-2-6" />
    </svg>
  );
}

function EarringsIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8" cy="5" r="2.5" />
      <path d="M8 7.5v4" />
      <path d="M5.5 14.5l2.5 4 2.5-4z" />
      <circle cx="16" cy="5" r="2.5" />
      <path d="M16 7.5v4" />
      <path d="M13.5 14.5l2.5 4 2.5-4z" />
    </svg>
  );
}

function DailyWearIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8" cy="12" r="5.5" />
      <circle cx="16" cy="12" r="5.5" />
      <path d="M11 9.5l2 5" />
    </svg>
  );
}

function GemstoneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 20 7 20 17 12 22 4 17 4 7 12 2" />
      <line x1="12" y1="22" x2="12" y2="12" />
      <polyline points="20 7 12 12 4 7" />
      <polyline points="20 17 12 12 4 17" />
    </svg>
  );
}

function WeddingIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l3 5h5l-4 4 1.5 6L12 14l-5.5 3L8 11 4 7h5z" />
      <path d="M3 21h18" />
    </svg>
  );
}

function GiftingIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13" />
      <path d="M3 13h18" />
      <path d="M12 8a3 3 0 1 0-3-3c0 2 3 3 3 3z" />
      <path d="M12 8a3 3 0 1 1 3-3c0 2-3 3-3 3z" />
    </svg>
  );
}

function Under50KIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function SchemeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
      <path d="M8 3h8" />
    </svg>
  );
}

/* ── Category Sub Navigation Items ─────────────────────────────── */
const SUB_NAV_ITEMS = [
  { label: "All Jewellery", Icon: AllJewelleryIcon, href: "/collections" },
  { label: "Gold", Icon: GoldIcon, href: "/collections?metal=Gold" },
  { label: "Diamond", Icon: DiamondIcon, href: "/collections?category=Solitaires" },
  { label: "Earrings", Icon: EarringsIcon, href: "/collections?category=Earrings" },
  { label: "Daily Wear", Icon: DailyWearIcon, href: "/collections?category=Daily+Wear" },
  { label: "Gemstone", Icon: GemstoneIcon, href: "/collections?category=Bridal+%26+Temple" },
  { label: "Wedding", Icon: WeddingIcon, href: "/collections?category=Bridal+%26+Temple" },
  { label: "Gifting", Icon: GiftingIcon, href: "/collections" },
  { label: "Under 50K", Icon: Under50KIcon, href: "/collections" },
  { label: "Monthly Scheme", Icon: SchemeIcon, href: "/scheme" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const isSubpage = window.location.pathname !== "/";
      setScrolled(isSubpage || currentY > 100);

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentY > lastY && currentY > 220) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/collections",
        search: { search: searchQuery.trim() } as any,
      });
    } else {
      navigate({ to: "/collections" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-in-out ${
        visible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full bg-white/95 backdrop-blur-xl border-b border-gold/30 shadow-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          {/* ── TOP TIER BAR: Logo, Pill Search Bar, Action Icons ── */}
          <div className="flex items-center justify-between gap-3 sm:gap-6 py-2.5 sm:py-3">
            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground hover:text-gold p-1 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <div className="space-y-1.5 w-6">
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2 bg-gold" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-gold" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* BRAND LOGO */}
            <a
              href="/"
              className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-9 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
              />
            </a>

            {/* CENTER LUXURY PILL SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl items-center relative"
            >
              <div className="relative w-full flex items-center">
                <Search className="absolute left-4 size-4 text-gold" />
                <input
                  type="text"
                  placeholder="Search for gold necklaces, solitaire rings, bridal kundan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8f8f9] border border-gold/30 hover:border-gold focus:border-gold rounded-full pl-11 pr-20 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-inner focus:bg-white"
                />
                <div className="absolute right-3.5 flex items-center gap-2 text-muted-foreground">
                  <button type="button" title="Search by Visual" className="hover:text-gold transition-colors">
                    <Camera className="size-3.5" />
                  </button>
                  <button type="button" title="Voice Search" className="hover:text-gold transition-colors">
                    <Mic className="size-3.5" />
                  </button>
                </div>
              </div>
            </form>

            {/* RIGHT SIDE ACTION ICONS */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                to="/collections"
                title="Virtual Jewellery Try-On"
                className="hidden sm:flex flex-col items-center gap-0.5 text-foreground/80 hover:text-gold transition-colors group"
              >
                <Sparkles className="size-4.5 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[0.55rem] uppercase tracking-wider font-semibold">Try-On</span>
              </Link>

              <a
                href="#store-info"
                title="Sarafa Market Showroom Location"
                className="hidden sm:flex flex-col items-center gap-0.5 text-foreground/80 hover:text-gold transition-colors group"
              >
                <MapPin className="size-4.5 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[0.55rem] uppercase tracking-wider font-semibold">Stores</span>
              </a>

              <Link
                to="/appointment"
                title="Book Private Viewing Appointment"
                className="hidden lg:flex flex-col items-center gap-0.5 text-foreground/80 hover:text-gold transition-colors group"
              >
                <Heart className="size-4.5 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[0.55rem] uppercase tracking-wider font-semibold">Book Visit</span>
              </Link>

              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center gap-1.5 rounded-full border border-gold/70 bg-[#b8860b] px-3 sm:px-4 py-1.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:opacity-95 font-bold shadow-md"
              >
                <Phone className="size-3" />
                <span>090151 55615</span>
              </a>
            </div>
          </div>

          {/* ── BOTTOM TIER BAR: Tanishq-Style Category Sub-Navigation ── */}
          <div className="border-t border-zinc-200/80 py-2 overflow-x-auto no-scrollbar">
            <nav className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 min-w-max px-2">
              {SUB_NAV_ITEMS.map((item) => {
                const IconComponent = item.Icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative flex items-center gap-1.5 text-[0.68rem] sm:text-[0.74rem] font-medium tracking-wide text-zinc-800 hover:text-[#b8860b] transition-colors py-1 cursor-pointer"
                  >
                    <IconComponent className="size-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                    <span className="whitespace-nowrap font-medium group-hover:font-semibold transition-all">
                      {item.label}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#b8860b] transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
            onTouchStart={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-3 top-20 bg-white border border-gold/40 rounded-2xl backdrop-blur-2xl p-5 shadow-2xl z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold/20">
              <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-bold">
                Jewellery Categories
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-300 text-foreground text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-white transition-all cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="size-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {SUB_NAV_ITEMS.map((item) => {
                const IconComponent = item.Icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#fafafa] border border-gold/20 hover:bg-gold/10 hover:border-gold transition-all text-xs font-semibold text-foreground"
                  >
                    <IconComponent className="size-4 text-gold shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-200 space-y-2">
              <Link
                to="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded bg-zinc-900 text-white text-xs uppercase tracking-widest font-bold"
              >
                Book Private Viewing
              </Link>
              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center justify-center gap-2 w-full rounded bg-[#b8860b] py-2.5 text-xs uppercase tracking-widest text-white font-bold shadow"
              >
                <Phone className="size-3.5" /> Call: 090151 55615
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
