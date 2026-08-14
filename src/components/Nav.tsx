import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { X, Phone, MapPin, Calendar, Sparkles, MessageCircle, Clock } from "lucide-react";
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

const LEFT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collections" },
  { label: "Monthly Scheme", href: "/scheme" },
];

const RIGHT_LINKS = [
  { label: "Book Visit", href: "/appointment", icon: Calendar },
  { label: "Store Info", href: "/#store-info", icon: MapPin },
];

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
  { label: "SwarnaNidhi Scheme", Icon: SchemeIcon, href: "/scheme" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const showSubNav = location.pathname === "/" || location.pathname === "/collections" || location.pathname.startsWith("/collections");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const isSubpage = window.location.pathname !== "/";
      setScrolled(isSubpage || currentY > 50);

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentY > lastY && currentY > 200) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-in-out ${
        visible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ── FULL WIDTH MASTER CONTAINER (Frosted Obsidian Glass) ── */}
      <div
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0c0c0e]/95 backdrop-blur-2xl border-b border-gold/35 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-b from-black/90 via-black/80 to-black/70 backdrop-blur-xl border-b border-gold/25 shadow-2xl"
        }`}
      >
        {/* ── TOP TIER: Brand Logo, Main Links, Action Buttons (Full Width) ── */}
        <div className="w-full px-3 sm:px-8 md:px-12">
          <div className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3.5">
            {/* Mobile Hamburger Toggle & Quick Search */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-amber-200 p-2 focus:outline-none hover:text-gold transition-colors rounded-lg active:bg-white/10"
                aria-label="Toggle Navigation Menu"
              >
                <div className="space-y-1.5 w-5 sm:w-6">
                  <span
                    className={`block h-0.5 bg-amber-200 transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2 bg-gold" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-amber-200 transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-amber-200 transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-gold" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* LEFT SIDE BRAND LINKS (Desktop) */}
            <ul className="hidden lg:flex items-center gap-7">
              {LEFT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative text-[0.72rem] uppercase tracking-[0.24em] text-white/90 transition-colors duration-300 hover:text-amber-200 font-medium py-1"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CENTER BRAND LOGO */}
            <a
              href="/"
              className="flex items-center justify-center shrink-0 px-2 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-8 sm:h-12 md:h-13 w-auto object-contain filter drop-shadow-[0_0_18px_rgba(212,175,55,0.65)]"
              />
            </a>

            {/* RIGHT SIDE LINKS & LUXURY CALL DESK */}
            <div className="flex items-center gap-2 sm:gap-7">
              <ul className="hidden lg:flex items-center gap-7">
                {RIGHT_LINKS.map((l) => {
                  const Icon = l.icon;
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group relative flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.24em] text-white/90 transition-colors duration-300 hover:text-amber-200 font-medium py-1"
                      >
                        <Icon className="size-3.5 text-gold group-hover:scale-110 transition-transform" />
                        <span>{l.label}</span>
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Call Desk Button (Responsive on mobile & desktop) */}
              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-3 sm:px-5 py-1.5 sm:py-2 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform"
              >
                <Phone className="size-3 sm:size-3.5 fill-black" />
                <span className="hidden sm:inline">090151 55615</span>
                <span className="sm:hidden font-bold">Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM TIER: Category Sub-Navigation (Only on Home & Collection pages) ── */}
        {showSubNav && (
          <div className="w-full border-t border-gold/20 py-2 bg-black/40 backdrop-blur-md overflow-x-auto no-scrollbar touch-pan-x">
            <div className="w-full px-3 sm:px-8 md:px-12">
              <nav className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 md:gap-11 min-w-max mx-auto px-1">
                {SUB_NAV_ITEMS.map((item) => {
                  const IconComponent = item.Icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group relative flex items-center gap-1.5 text-[0.65rem] sm:text-[0.74rem] font-medium tracking-wide text-white/90 hover:text-amber-200 transition-colors py-1 cursor-pointer active:scale-95"
                    >
                      <IconComponent className="size-3.5 sm:size-4 text-gold group-hover:scale-115 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] shrink-0" />
                      <span className="whitespace-nowrap font-medium group-hover:font-semibold transition-all">
                        {item.label}
                      </span>
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* ── LUXURY MOBILE NAVIGATION DRAWER MODAL ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            onTouchStart={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-3 top-16 sm:top-20 bg-[#121215] border border-gold/50 rounded-2xl backdrop-blur-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Header with Title & Close Button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold/25">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="A.P.P. Jewellers" className="h-7 w-auto object-contain" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  A.P.P. Jewellers
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-all cursor-pointer active:scale-95"
                aria-label="Close Menu"
              >
                <X className="size-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Quick Primary Navigation Links */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-white/10 text-center">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold text-[0.68rem] font-semibold text-white/90 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold text-[0.68rem] font-semibold text-white/90 hover:text-gold transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/scheme"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-gold/10 border border-gold/40 text-[0.68rem] font-bold text-amber-200"
              >
                Gold Scheme
              </Link>
            </div>

            {/* Jewellery Categories 2-Column Grid with Vector Icons */}
            <span className="text-[0.58rem] uppercase tracking-[0.25em] text-gold font-bold block mb-2 px-1">
              Explore Collections
            </span>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {SUB_NAV_ITEMS.map((item) => {
                const IconComponent = item.Icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 border border-gold/20 hover:bg-gold/15 hover:border-gold transition-all text-xs font-semibold text-white/95 active:scale-95"
                  >
                    <IconComponent className="size-4 text-gold shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Bottom Direct Contact CTAs */}
            <div className="pt-3 border-t border-gold/20 space-y-2.5">
              <Link
                to="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-lg bg-zinc-900 border border-gold/40 text-amber-200 text-xs uppercase tracking-widest font-bold hover:border-gold"
              >
                Book Private Showroom Visit
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919015155615"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600/90 text-white text-xs uppercase tracking-wider font-bold shadow active:scale-95"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:09015155615"
                  className="shine-sweep flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] text-black text-xs uppercase tracking-wider font-extrabold shadow active:scale-95"
                >
                  <Phone className="size-3.5 fill-black" />
                  <span>090151 55615</span>
                </a>
              </div>

              {/* Showroom Hours Hint */}
              <div className="flex items-center justify-center gap-1.5 text-[0.62rem] text-zinc-400 font-light pt-1">
                <Clock className="size-3 text-gold" />
                <span>Sarafa Market Delhi · Open Daily 11:00 AM – 8:30 PM</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
