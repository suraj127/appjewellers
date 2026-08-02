import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";
import { PhoneIcon } from "@/components/LuxuryIcons";

const LEFT_LINKS = [
  { label: "Featured", href: "/#collections" },
  { label: "Collection", href: "/collections" },
  { label: "Monthly Scheme", href: "/scheme" },
];

const RIGHT_LINKS = [
  { label: "Book Store Visit", href: "/appointment" },
  { label: "Store Info", href: "/#store-info" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const isSubpage = window.location.pathname !== "/";
      setScrolled(isSubpage || currentY > 100);
      if (currentY > lastY && currentY > 220) {
        setVisible(false); // Hide bar on scroll down deep
      } else {
        setVisible(true); // Show bar on scroll up
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
            className={`flex items-center justify-between rounded-sm px-3 sm:px-6 py-2 transition-all duration-500 ${
              scrolled
                ? "glass-panel shadow-2xl bg-onyx/95 border border-gold/50"
                : "bg-onyx/85 border border-gold/30 backdrop-blur-md shadow-xl"
            }`}
          >
            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gold p-1 focus:outline-none"
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
            </div>

            {/* LEFT SIDE LINKS: Featured | Collection | Monthly Scheme */}
            <ul className="hidden lg:flex items-center gap-6">
              {LEFT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-gold font-medium"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CENTER BRAND LOGO (ALWAYS VISIBLE & CENTERED) */}
            <a
              href="/"
              className="flex items-center justify-center shrink-0 px-2 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logoImg}
                alt="A.P.P. Jewellers Logo"
                className="h-9 sm:h-12 w-auto object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              />
            </a>

            {/* RIGHT SIDE LINKS & CALL US: Book Store Visit | Store Info | Call Us */}
            <div className="flex items-center gap-3 sm:gap-6">
              <ul className="hidden lg:flex items-center gap-6">
                {RIGHT_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group relative text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-gold font-medium"
                    >
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center gap-1.5 rounded-sm border border-gold/70 bg-gold/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground font-bold shadow-md"
              >
                <PhoneIcon className="size-3" />
                <span>Call Us</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-onyx/95 border-b border-gold/40 backdrop-blur-xl p-6 shadow-2xl animate-fadeIn z-40">
          <ul className="space-y-3 text-center">
            {LEFT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-[0.25em] text-foreground font-semibold hover:text-gold py-2 border-b border-gold/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {RIGHT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-[0.25em] text-gold font-semibold py-2 border-b border-gold/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="tel:09015155615"
                className="shine-sweep flex items-center justify-center gap-2 w-full rounded bg-gold py-2.5 text-xs uppercase tracking-widest text-primary-foreground font-bold"
              >
                <PhoneIcon className="size-3.5" /> Call Us: 090151 55615
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
