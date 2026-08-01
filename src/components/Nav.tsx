import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";
import { PhoneIcon, WhatsAppIcon } from "@/components/LuxuryIcons";

const LINKS = [
  { label: "Featured", href: "/#collections" },
  { label: "All Jewellery", href: "/collections" },
  { label: "Monthly Gold Plan", href: "/scheme" },
  { label: "Book Store Visit", href: "/appointment" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      if (currentY > lastY && currentY > 120) {
        setVisible(false); // Hide bar on scroll down deep
      } else {
        setVisible(true); // Show bar on scroll up or near top
      }
      lastY = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main Navigation Header */}
      <div className={`transition-all duration-500 ${scrolled ? "py-1.5" : "py-2 sm:py-4"}`}>
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav
            className={`flex items-center justify-between rounded-sm px-4 sm:px-6 py-2.5 transition-all duration-500 ${
              scrolled
                ? "glass-panel shadow-2xl bg-onyx/90 border border-gold/40"
                : "bg-onyx/75 border border-gold/20 backdrop-blur-md shadow-xl"
            }`}
          >
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gold p-1 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <div className="space-y-1.5 w-6">
                <span
                  className={`block h-0.5 bg-gold transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gold transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gold transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-500 hover:text-gold"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CENTERED VIBRANT LOGO — ALWAYS VISIBLE */}
            <a
              href="/"
              className="flex items-center justify-center transition-transform duration-500 hover:scale-105 pointer-events-auto px-2"
            >
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-10 sm:h-14 w-auto object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
              />
            </a>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <a
                href="/#store-info"
                className="hidden md:inline-block text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
              >
                Store Info
              </a>
              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center gap-1.5 rounded-sm border border-gold/70 bg-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-gold transition-all duration-500 hover:bg-gold hover:text-primary-foreground font-semibold shadow-md"
              >
                <PhoneIcon className="size-3" />
                <span>Call Store</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-onyx/95 border-b border-gold/40 backdrop-blur-xl p-6 shadow-2xl animate-fadeIn z-40">
          <ul className="space-y-4 text-center">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-[0.28em] text-foreground font-semibold hover:text-gold py-2 border-b border-gold/20"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#store-info"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-[0.28em] text-gold font-semibold py-2"
              >
                Store Location & Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}


