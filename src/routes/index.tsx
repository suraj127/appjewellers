import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import logoImg from "@/assets/logo.png";
import {
  Appointment,
  Collections,
  Footer,
  InstaReels,
  Maison,
  SchemeTeaser,
  Signature,
  StoreLocation,
} from "@/components/Sections";

const title = "A.P.P. Jewellers — Sarafa Market, New Seelampur, Delhi | Fine Gold & Diamonds";
const description =
  "A.P.P. Jewellers: 22K BIS Hallmarked gold, GIA certified solitaires, Kundan bridal jewellery. Visit us at Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Delhi. Call: 090151 55615.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 3-SECOND LOGO-ONLY HOME PAGE LOADER */}
      {pageLoading && (
        <div className="fixed inset-0 z-[100] bg-[#0a0203] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-700 animate-fadeIn">
          {/* Ambient Glow Backdrop */}
          <div className="absolute size-[500px] bg-gradient-to-r from-rose-900/30 via-gold/20 to-amber-900/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Spinning Gold Halo Ring with Brand Crest Logo */}
            <div className="relative size-32 sm:size-44 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 border-t-gold animate-spin shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
              <div className="absolute inset-2 rounded-full border border-gold/40 border-b-amber-300 animate-spin [animation-duration:4s]" />
              <img
                src={logoImg}
                alt="A.P.P. Jewellers"
                className="size-20 sm:size-28 object-contain animate-pulse filter brightness-110 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
              />
            </div>

            {/* Live Animated 3-Second Gold Progress Bar */}
            <div className="w-48 sm:w-64 h-1 bg-onyx/90 rounded-full overflow-hidden border border-gold/40 shadow-inner">
              <div className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold animate-progress-3s shadow-[0_0_12px_rgba(255,215,0,0.9)]" />
            </div>
          </div>
        </div>
      )}

      <Nav />
      <main className="page-enter">
        <Hero />
        <Collections />
        <SchemeTeaser />
        <Signature />
        <InstaReels />
        <Maison />
        <StoreLocation />
        <Appointment />
      </main>
      <Footer />
    </>
  );
}

