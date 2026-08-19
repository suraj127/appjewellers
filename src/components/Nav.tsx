import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { X, Phone, MapPin, Calendar, MessageCircle, Clock } from "lucide-react";
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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collections" },
  { label: "Scheme", href: "/scheme" },
  { label: "Book Visit", href: "/appointment", icon: Calendar },
  { label: "Store", href: "/#store-info", icon: MapPin },
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

  const showSubNav = location.pathname !== "/" && location.pathname.startsWith("/collections");

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
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP: Floating Glass Pill Navbar (lg+)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block w-full px-6 pt-4">
        <nav
          className={`mx-auto max-w-5xl flex items-center justify-between gap-4 rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-[#fcfaf2]/90 backdrop-blur-xl border border-[#b8860b]/25 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(184,134,11,0.1)]"
              : "bg-white/60 backdrop-blur-lg border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logoImg}
              alt="A.P.P. Jewellers Logo"
              className="h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(184,134,11,0.2)]"
            />
          </a>

          {/* Center Links */}
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-zinc-800 transition-colors duration-300 hover:text-[#b8860b] font-semibold py-1"
                  >
                    {Icon && (
                      <Icon className="size-3.5 text-[#b8860b] group-hover:scale-110 transition-transform" />
                    )}
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#b8860b] transition-all duration-300 group-hover:w-full rounded-full" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Call CTA */}
          <a
            href="tel:09015155615"
            className="shine-sweep flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-5 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-black font-extrabold shadow-md hover:scale-105 transition-transform"
          >
            <Phone className="size-3.5 fill-black" />
            <span>090151 55615</span>
          </a>
        </nav>

        {/* ── BOTTOM TIER: Category Sub-Navigation (collections page) ── */}
        {showSubNav && (
          <div className="mx-auto max-w-5xl mt-2 rounded-full bg-[#fcfaf2]/85 backdrop-blur-xl border border-[#b8860b]/15 py-2 px-4 overflow-x-auto no-scrollbar touch-pan-x shadow-sm">
            <nav className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 min-w-max mx-auto px-1">
              {SUB_NAV_ITEMS.map((item) => {
                const IconComponent = item.Icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative flex items-center gap-1.5 text-[0.65rem] sm:text-[0.72rem] font-semibold tracking-wide text-zinc-800 hover:text-[#b8860b] transition-colors py-1 cursor-pointer active:scale-95"
                  >
                    <IconComponent className="size-3.5 sm:size-4 text-[#b8860b] group-hover:scale-115 transition-transform duration-300 shrink-0" />
                    <span className="whitespace-nowrap font-semibold">
                      {item.label}
                    </span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#b8860b] transition-all duration-300 group-hover:w-full rounded-full" />
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE: Slim Top Bar (< lg)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`lg:hidden w-full transition-colors duration-500 ${
          scrolled
            ? "bg-[#fcfaf2]/90 backdrop-blur-md border-b border-[#b8860b]/20 shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full px-3 sm:px-6">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-900 p-2 focus:outline-none hover:text-[#b8860b] transition-colors rounded-lg active:bg-black/5"
              aria-label="Toggle Navigation Menu"
            >
              <div className="space-y-1.5 w-5 sm:w-6">
                <span
                  className={`block h-0.5 bg-zinc-900 transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2 bg-[#b8860b]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-zinc-900 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-zinc-900 transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#b8860b]" : ""
                  }`}
                />
              </div>
            </button>

            {/* Center Logo */}
            <a
              href="/"
              className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(184,134,11,0.25)]"
              />
            </a>

            {/* Call Button */}
            <a
              href="tel:09015155615"
              className="shine-sweep flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-black font-extrabold shadow-md hover:scale-105 transition-transform"
            >
              <Phone className="size-3 fill-black" />
              <span className="font-bold">Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── LUXURY MOBILE NAVIGATION DRAWER MODAL ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            onTouchStart={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-3 top-16 sm:top-20 bg-[#fcfaf2] border border-[#b8860b]/40 rounded-2xl backdrop-blur-2xl p-5 shadow-2xl z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Header with Title & Close Button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#b8860b]/20">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="A.P.P. Jewellers" className="h-7 w-auto object-contain" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-bold">
                  A.P.P. Jewellers
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/5 border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider hover:bg-[#b8860b] hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Close Menu"
              >
                <X className="size-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Quick Primary Navigation Links */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-[#b8860b]/15 text-center">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-zinc-200 hover:border-[#b8860b] text-[0.68rem] font-bold text-zinc-900 hover:text-[#b8860b] transition-colors shadow-sm"
              >
                Home
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white border border-zinc-200 hover:border-[#b8860b] text-[0.68rem] font-bold text-zinc-900 hover:text-[#b8860b] transition-colors shadow-sm"
              >
                Collections
              </Link>
              <Link
                to="/scheme"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#f7f4ea] border border-[#b8860b]/40 text-[0.68rem] font-bold text-[#b8860b]"
              >
                Gold Scheme
              </Link>
            </div>

            {/* Jewellery Categories 2-Column Grid with Vector Icons */}
            <span className="text-[0.58rem] uppercase tracking-[0.25em] text-[#b8860b] font-bold block mb-2 px-1">
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
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-zinc-200 hover:bg-[#f7f4ea] hover:border-[#b8860b] transition-all text-xs font-semibold text-zinc-900 active:scale-95 shadow-sm"
                  >
                    <IconComponent className="size-4 text-[#b8860b] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Bottom Direct Contact CTAs */}
            <div className="pt-3 border-t border-[#b8860b]/20 space-y-2.5">
              <Link
                to="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="shine-sweep block text-center py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#aa771c] text-black text-xs uppercase tracking-[0.24em] font-extrabold shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                Book Private Showroom Visit →
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919015155615"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#25D366]/60 bg-[#25D366]/15 hover:bg-[#25D366] text-white hover:text-black text-xs uppercase tracking-wider font-extrabold shadow-xs active:scale-95 transition-all"
                >
                  <MessageCircle className="size-3.5 text-current" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:09015155615"
                  className="shine-sweep flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#b8860b] bg-[#fcfaf2] hover:bg-[#121212] hover:text-white text-[#121212] text-xs uppercase tracking-wider font-extrabold shadow-xs active:scale-95 transition-all"
                >
                  <Phone className="size-3.5 text-[#b8860b]" />
                  <span>090151 55615</span>
                </a>
              </div>

              {/* Showroom Hours Hint */}
              <div className="flex items-center justify-center gap-1.5 text-[0.62rem] text-zinc-600 font-medium pt-1">
                <Clock className="size-3 text-[#b8860b]" />
                <span>Sarafa Market Delhi · Open Daily 11:00 AM – 8:30 PM</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
