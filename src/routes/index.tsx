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
  StoreLocation,
} from "@/components/Sections";
import { HeritageShowcaseSection } from "@/components/HeritageShowcaseSection";

const title = "A.P.P. Jewellers — Sarafa Market, New Seelampur, Delhi | Fine Gold & Diamonds";
const description =
  "A.P.P. Jewellers: BIS Hallmarked gold, GIA certified solitaires, Kundan bridal jewellery. Visit us at Shop No. D-155, Sarafa Market, New Seelampur Phase II, New Delhi. Call: 090151 55615.";

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
  return (
    <>
      <Nav />
      <main className="page-enter">
        <Hero />
        <Collections />
        <SchemeTeaser />
        <HeritageShowcaseSection />
        <InstaReels />
        <Maison />
        <StoreLocation />
        <Appointment />
      </main>
      <Footer />
    </>
  );
}

