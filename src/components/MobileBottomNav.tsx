import { useLocation } from "@tanstack/react-router";
import { Home, Diamond, Calendar, Phone, MessageCircle } from "lucide-react";

const BOTTOM_TABS = [
  { label: "Home", href: "/", icon: Home, isLink: true },
  { label: "Collections", href: "/collections", icon: Diamond, isLink: true },
  { label: "Book Visit", href: "/appointment", icon: Calendar, isLink: true },
  { label: "Call", href: "tel:09015155615", icon: Phone, isLink: false },
  {
    label: "WhatsApp",
    href: "https://wa.me/919015155615?text=Hi%20A.P.P.%20Jewellers%2C%20I%20am%20interested%20in%20your%20jewellery%20collection.%20Please%20share%20details.",
    icon: MessageCircle,
    isLink: false,
    external: true,
  },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#fcfaf2]/95 backdrop-blur-xl border-t border-[#b8860b]/25 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-1 py-1.5">
        {BOTTOM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.isLink &&
            (tab.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.href));

          // WhatsApp gets special green styling
          const isWhatsApp = tab.label === "WhatsApp";

          return (
            <a
              key={tab.label}
              href={tab.href}
              {...(tab.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-200 active:scale-90 min-w-[3.5rem] ${
                isActive
                  ? "text-[#b8860b]"
                  : isWhatsApp
                    ? "text-[#25D366]"
                    : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Icon
                className={`size-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span
                className={`text-[0.58rem] font-semibold tracking-wide ${
                  isActive ? "text-[#b8860b]" : ""
                }`}
              >
                {tab.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-0.5 w-5 h-0.5 bg-[#b8860b] rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
