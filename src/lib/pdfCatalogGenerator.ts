import { jsPDF } from "jspdf";
import type { Product } from "@/data/products";

export interface CatalogPdfOptions {
  title?: string;
  subtitle?: string;
  categoryFilter?: string;
  includeGoldRate?: boolean;
  goldRate22k?: string;
  goldRate24k?: string;
  storePhone?: string;
  whatsappNumber?: string;
  storeAddress?: string;
}

// Convert image URL to Base64 JPEG data URL with solid background
// This eliminates ALL PNG alpha channel artifacts (black lines/stripes) in PDF renderers
async function loadImageAsDataUrl(url: string, bgColor: string = "#ffffff"): Promise<string | null> {
  return new Promise((resolve) => {
    let fullUrl = url;
    if (typeof window !== "undefined" && url.startsWith("/")) {
      fullUrl = window.location.origin + url;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = img.naturalWidth || 400;
        const h = img.naturalHeight || 400;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);

        // Fill solid background matching destination PDF area
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, h);

        // Draw image over solid background
        ctx.drawImage(img, 0, 0, w, h);

        // Export as JPEG to avoid alpha mask line artifacts in jsPDF
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        resolve(dataUrl);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = fullUrl;
  });
}

export async function generateCatalogPdf(
  products: Product[],
  options: CatalogPdfOptions = {},
  onProgress?: (progressText: string) => void
): Promise<Blob> {
  const {
    subtitle = "Exquisite Gold & Solitaire Diamond Collection",
    categoryFilter = "ALL",
    includeGoldRate = true,
    goldRate22k = "Rs. 7,380 / gram",
    goldRate24k = "Rs. 8,050 / gram",
    storePhone = "090151 55615",
    whatsappNumber = "+91 90151 55615",
    storeAddress = "Sarafa Market, New Delhi - 110006",
  } = options;

  onProgress?.("Loading store logo & branding...");
  // Load logo composited on dark burgundy (#3b060d) background to eliminate black lines
  const darkLogoDataUrl = await loadImageAsDataUrl("/logo-transparent.png", "#3b060d");

  // Create A4 PDF (Portrait, 210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;

  // Pre-load images for all products composited on light parchment background
  onProgress?.("Loading high-definition product images...");
  const imageMap = new Map<string, string | null>();

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    onProgress?.(`Processing image ${i + 1} of ${products.length}: ${p.name}`);
    if (p.image) {
      const dataUrl = await loadImageAsDataUrl(p.image, "#f5f2eb");
      imageMap.set(p.slug, dataUrl);
    }
  }

  // Calculate page mapping:
  // Page 1: Cover Page
  // Page 2: Store Guarantee & Hallmark Pillars
  // Page 3: Detailed Catalogue Index Table
  // Page 4+: Product Items (2 per page)
  const itemsPerPage = 2;
  const startProductPage = 4;
  const totalProductPages = Math.ceil(products.length / itemsPerPage);
  const totalPages = startProductPage + totalProductPages;

  onProgress?.("Formatting cover page with store logo & gold rates...");

  // ==========================================
  // PAGE 1: LUXURY COVER PAGE (Burgundy & Gold)
  // ==========================================
  doc.setFillColor(59, 6, 13); // Royal Burgundy #3b060d
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Double Gold Borders
  doc.setDrawColor(212, 175, 55); // Gold #d4af37
  doc.setLineWidth(1);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  doc.setLineWidth(0.3);
  doc.rect(margin + 2, margin + 2, pageWidth - margin * 2 - 4, pageHeight - margin * 2 - 8);

  let y = 22;

  // Store Logo Branding (Seamlessly blended JPEG, NO black lines)
  if (darkLogoDataUrl) {
    try {
      doc.addImage(darkLogoDataUrl, "JPEG", (pageWidth - 32) / 2, y, 32, 32);
      y += 35;
    } catch {
      y += 10;
    }
  } else {
    y += 10;
  }

  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ESTABLISHED AT SARAFA MARKET · NEW DELHI", pageWidth / 2, y, { align: "center" });

  y += 10;
  doc.setFontSize(26);
  doc.text("A.P.P. JEWELLERS", pageWidth / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(235, 215, 175);
  doc.text("FINE GOLD & SOLITAIRE DIAMOND ATELIER", pageWidth / 2, y, { align: "center" });

  // Gold Line Separator with Emblem
  y += 9;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.line(margin + 25, y, pageWidth - margin - 25, y);
  doc.setFillColor(212, 175, 55);
  doc.circle(pageWidth / 2, y, 2.5, "F");

  // Main Catalogue Title Box
  y += 18;
  doc.setFillColor(20, 2, 5);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin + 12, y, pageWidth - margin * 2 - 24, 45, 3, 3, "FD");

  let boxY = y + 14;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(17);
  doc.setFont("helvetica", "bold");
  doc.text("2026 MASTER JEWELLERY CATALOGUE", pageWidth / 2, boxY, { align: "center" });

  boxY += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(240, 240, 240);
  const splitSub = doc.splitTextToSize(subtitle, pageWidth - margin * 2 - 30);
  doc.text(splitSub, pageWidth / 2, boxY, { align: "center" });

  boxY += (splitSub.length * 5) + 2;
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.text(`Category Scope: ${categoryFilter.toUpperCase()} · ${products.length} Certified Pieces`, pageWidth / 2, boxY, { align: "center" });

  // Live Store Gold Rate Banner (Centered & 100% inside container)
  y += 56;
  if (includeGoldRate) {
    const boxWidth = 170;
    const boxX = (pageWidth - boxWidth) / 2; // 20mm
    doc.setFillColor(75, 12, 22);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.4);
    doc.roundedRect(boxX, y, boxWidth, 22, 2, 2, "FD");

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(212, 175, 55);
    doc.text("TODAY'S STORE GOLD RATES (SARAFA MARKET, NEW DELHI)", pageWidth / 2, y + 7, { align: "center" });

    // Format clean ASCII text to avoid unicode rupee symbol clipping
    const rate22Text = goldRate22k.includes("Rs.") ? goldRate22k : `Rs. ${goldRate22k.replace(/[^0-9,]/g, "")} / gram`;
    const rate24Text = goldRate24k.includes("Rs.") ? goldRate24k : `Rs. ${goldRate24k.replace(/[^0-9,]/g, "")} / gram`;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(`22K Hallmarked Gold: ${rate22Text}   |   24K Pure Gold: ${rate24Text}`, pageWidth / 2, y + 15, { align: "center" });
  }

  // Trust Badges
  y += 32;
  const badges = [
    "100% BIS 916 Hallmarked",
    "Certified Solitaires",
    "Custom Karigar Atelier",
    "Lifetime Purity Guarantee",
  ];

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(235, 215, 175);
  const badgeWidth = (pageWidth - margin * 2 - 15) / 2;

  badges.forEach((b, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = margin + 5 + col * (badgeWidth + 5);
    const by = y + row * 15;

    doc.setFillColor(30, 4, 8);
    doc.setDrawColor(180, 140, 40);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, by, badgeWidth, 11, 1.5, 1.5, "FD");

    doc.setFillColor(212, 175, 55);
    doc.circle(bx + 6, by + 5.5, 2, "F");
    doc.text(b, bx + 12, by + 7);
  });

  // Cover Footer & Contact Box
  y = pageHeight - margin - 32;
  doc.setFillColor(15, 2, 4);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 10, y, pageWidth - margin * 2 - 20, 23, 2, 2, "FD");

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(212, 175, 55);
  doc.text("FOR PRICE QUOTES & IN-STORE APPOINTMENTS", pageWidth / 2, y + 7, { align: "center" });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text(`Call Store: ${storePhone}   |   WhatsApp: ${whatsappNumber}`, pageWidth / 2, y + 13.5, { align: "center" });
  doc.text(`Store Address: ${storeAddress}`, pageWidth / 2, y + 18.5, { align: "center" });

  // ==========================================
  // PAGE 2: STORE CERTIFICATION & GUARANTEE
  // ==========================================
  doc.addPage();
  onProgress?.("Adding Store Guarantee & Hallmark Certificate...");

  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Header Bar with Logo
  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, 20, "F");
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 20, pageWidth, 1.2, "F");

  if (darkLogoDataUrl) {
    try {
      doc.addImage(darkLogoDataUrl, "JPEG", margin, 2.5, 15, 15);
    } catch {}
  }

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text("A.P.P. JEWELLERS — SARAFA MARKET, NEW DELHI", darkLogoDataUrl ? margin + 18 : margin, 12);
  doc.setFontSize(8);
  doc.setTextColor(235, 215, 175);
  doc.text("HALLMARK CERTIFICATION & BUYER GUARANTEE", pageWidth - margin, 12, { align: "right" });

  let interiorY = 32;

  doc.setTextColor(59, 6, 13);
  doc.setFontSize(17);
  doc.setFont("helvetica", "bold");
  doc.text("Our 4 Pillars of Jewellery Trust", margin, interiorY);

  interiorY += 5;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(margin, interiorY, margin + 55, interiorY);

  interiorY += 8;
  const pillars = [
    {
      title: "1. 100% BIS 916 Hallmarked Gold",
      desc: "Every gold piece sold at A.P.P. Jewellers bears the official Bureau of Indian Standards (BIS) hallmark, unique HUID laser engraving, and purity stamp confirming 22 Carat (91.6% pure gold) standard.",
    },
    {
      title: "2. Certified Natural Solitaire Diamonds",
      desc: "Our diamond solitaires and cluster ornaments are certified by international assay labs (IGI/GIA) with guaranteed VVS clarity, EF color grading, and ethically sourced conflict-free diamonds.",
    },
    {
      title: "3. Master Goldsmiths & Custom Orders",
      desc: "Located in the historic Sarafa Market of New Delhi, our master karigars craft bespoke bridal neckwear, Kundan heritage ornaments, and customized name rings with precision hand-forging.",
    },
    {
      title: "4. Transparent Pricing & Lifetime Guarantee",
      desc: "Enjoy zero hidden charges with complete breakdown of gold weight, purity, gemstone weight, and making charges. Includes lifetime free cleaning, polishing, and purity verification.",
    },
  ];

  pillars.forEach((p) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 200, 160);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, interiorY, pageWidth - margin * 2, 24, 2, 2, "FD");

    doc.setFillColor(212, 175, 55);
    doc.roundedRect(margin, interiorY, 3, 24, 1, 1, "F");

    doc.setTextColor(59, 6, 13);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(p.title, margin + 7, interiorY + 6.5);

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - margin * 2 - 12);
    doc.text(splitDesc, margin + 7, interiorY + 12.5);

    interiorY += 28;
  });

  // Store Overview Card
  interiorY += 2;
  doc.setFillColor(59, 6, 13);
  doc.roundedRect(margin, interiorY, pageWidth - margin * 2, 45, 2, 2, "F");

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Sarafa Market Showroom Assurance", margin + 8, interiorY + 9);

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(margin + 8, interiorY + 12, pageWidth - margin - 8, interiorY + 12);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(240, 240, 240);
  const overviewText = "A.P.P. Jewellers is a premier goldsmith atelier based in Sarafa Market, New Delhi. Every piece listed in this catalogue is crafted in compliance with national BIS purity benchmarks. Customers can inspect, test, or customize any piece by visiting our showroom or connecting with our master Karigars via WhatsApp.";
  const splitOverview = doc.splitTextToSize(overviewText, pageWidth - margin * 2 - 16);
  doc.text(splitOverview, margin + 8, interiorY + 18);

  // Footer Page 2
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Page 2 of CATALOGUE", pageWidth / 2, pageHeight - 8, { align: "center" });

  // ==========================================
  // PAGE 3: CATALOGUE INDEX & PAGE DIRECTORY
  // ==========================================
  doc.addPage();
  onProgress?.("Building Detailed Item Index Directory (Page 3)...");

  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Header Bar
  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, 20, "F");
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 20, pageWidth, 1.2, "F");

  if (darkLogoDataUrl) {
    try {
      doc.addImage(darkLogoDataUrl, "JPEG", margin, 2.5, 15, 15);
    } catch {}
  }

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text("A.P.P. JEWELLERS — CATALOGUE INDEX DIRECTORY", darkLogoDataUrl ? margin + 18 : margin, 12);
  doc.setFontSize(8);
  doc.setTextColor(235, 215, 175);
  doc.text("PAGE 3 OF CATALOGUE", pageWidth - margin, 12, { align: "right" });

  let indexY = 30;

  doc.setTextColor(59, 6, 13);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Item Index & Page Directory", margin, indexY);

  indexY += 5;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(margin, indexY, margin + 60, indexY);

  indexY += 8;

  // Table Header
  const colX = {
    code: margin + 2,
    name: margin + 35,
    category: margin + 115,
    purity: margin + 148,
    page: margin + 172,
  };

  doc.setFillColor(59, 6, 13);
  doc.roundedRect(margin, indexY, pageWidth - margin * 2, 8, 1, 1, "F");

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.text("ITEM CODE", colX.code, indexY + 5.5);
  doc.text("PRODUCT NAME", colX.name, indexY + 5.5);
  doc.text("CATEGORY", colX.category, indexY + 5.5);
  doc.text("PURITY", colX.purity, indexY + 5.5);
  doc.text("PAGE NO.", colX.page, indexY + 5.5);

  indexY += 10;

  // Render Index Rows with Clickable Links to item pages
  const maxIndexRowsPerPage = 32;
  const indexProducts = products.slice(0, maxIndexRowsPerPage);

  indexProducts.forEach((p, idx) => {
    const itemPageNum = startProductPage + Math.floor(idx / itemsPerPage);

    // Alternate row background tint
    if (idx % 2 === 0) {
      doc.setFillColor(245, 240, 230);
      doc.rect(margin, indexY - 1.5, pageWidth - margin * 2, 6.5, "F");
    }

    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 6, 13);

    const cleanSlug = p.slug.toUpperCase().replace("APP-ITEM-", "#");
    doc.text(cleanSlug.substring(0, 16), colX.code, indexY + 3);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    const cleanName = p.name.length > 42 ? `${p.name.substring(0, 40)}...` : p.name;
    doc.text(cleanName, colX.name, indexY + 3);

    doc.setTextColor(140, 100, 20);
    doc.text(p.category.substring(0, 16), colX.category, indexY + 3);

    doc.setTextColor(70, 70, 70);
    doc.text((p.purity || "22K").substring(0, 10), colX.purity, indexY + 3);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 6, 13);
    doc.text(`Page ${itemPageNum}`, colX.page, indexY + 3);

    // Clickable link to target page
    doc.link(margin, indexY - 1.5, pageWidth - margin * 2, 6.5, { pageNumber: itemPageNum });

    indexY += 6.5;
  });

  if (products.length > maxIndexRowsPerPage) {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120, 120, 120);
    doc.text(`... and ${products.length - maxIndexRowsPerPage} additional items detailed in following pages.`, margin + 2, indexY + 4);
  }

  // Footer Page 3
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Page 3 of CATALOGUE", pageWidth / 2, pageHeight - 8, { align: "center" });

  // ==========================================
  // PAGES 4+: DETAILED PRODUCT CARDS (2 ITEMS PER PAGE)
  // ==========================================
  for (let pageIdx = 0; pageIdx < totalProductPages; pageIdx++) {
    const currentPageNum = startProductPage + pageIdx;
    onProgress?.(`Building Catalogue Page ${currentPageNum} of ${totalPages}...`);
    doc.addPage();

    // Background
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Header Bar
    doc.setFillColor(59, 6, 13);
    doc.rect(0, 0, pageWidth, 18, "F");
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 18, pageWidth, 1.2, "F");

    if (darkLogoDataUrl) {
      try {
        doc.addImage(darkLogoDataUrl, "JPEG", margin, 2, 14, 14);
      } catch {}
    }

    doc.setTextColor(255, 215, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("A.P.P. JEWELLERS · SARAFA MARKET COLLECTION DIRECTORY", darkLogoDataUrl ? margin + 16 : margin, 11.5);
    doc.setTextColor(235, 215, 175);
    doc.setFontSize(8);
    doc.text(`PAGE ${currentPageNum} OF ${totalPages}`, pageWidth - margin, 11.5, { align: "right" });

    // Render 2 items on this page
    const pageItems = products.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);
    let cardY = 24;

    for (let itemIdx = 0; itemIdx < pageItems.length; itemIdx++) {
      const p = pageItems[itemIdx];
      const cardHeight = 124;

      // Product Outer Card Frame
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, cardY, pageWidth - margin * 2, cardHeight, 3, 3, "FD");

      // Left Column: Product Image Box
      const imgBoxX = margin + 5;
      const imgBoxY = cardY + 5;
      const imgBoxSize = 58;

      doc.setFillColor(245, 242, 235);
      doc.setDrawColor(220, 190, 130);
      doc.setLineWidth(0.3);
      doc.roundedRect(imgBoxX, imgBoxY, imgBoxSize, imgBoxSize, 2, 2, "FD");

      // Insert Loaded Base64 Image
      const base64Img = imageMap.get(p.slug);
      if (base64Img) {
        try {
          doc.addImage(base64Img, "JPEG", imgBoxX + 2, imgBoxY + 2, imgBoxSize - 4, imgBoxSize - 4);
        } catch {
          // Fallback box
          doc.setFillColor(59, 6, 13);
          doc.rect(imgBoxX + 3, imgBoxY + 3, imgBoxSize - 6, imgBoxSize - 6, "F");
          doc.setTextColor(212, 175, 55);
          doc.setFontSize(8);
          doc.text("A.P.P. JEWELLERS", imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize / 2, { align: "center" });
        }
      } else {
        doc.setFillColor(59, 6, 13);
        doc.rect(imgBoxX + 3, imgBoxY + 3, imgBoxSize - 6, imgBoxSize - 6, "F");
        doc.setTextColor(212, 175, 55);
        doc.setFontSize(8);
        doc.text("A.P.P. JEWELLERS", imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize / 2, { align: "center" });
      }

      // Purity Badge under Image
      doc.setFillColor(59, 6, 13);
      doc.setDrawColor(212, 175, 55);
      doc.roundedRect(imgBoxX, imgBoxY + imgBoxSize + 4, imgBoxSize, 9, 1.5, 1.5, "FD");

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text(p.purity ? p.purity.toUpperCase() : "22K BIS HALLMARKED", imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize + 10, { align: "center" });

      // Code / Ref Tag under Purity
      const formattedCode = p.slug.toUpperCase().replace("APP-ITEM-", "ITEM #");
      doc.setFillColor(240, 235, 220);
      doc.roundedRect(imgBoxX, imgBoxY + imgBoxSize + 15, imgBoxSize, 8, 1, 1, "F");
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "bold");
      doc.text(formattedCode.substring(0, 22), imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize + 20.5, { align: "center" });

      // Right Column: Details & Specs
      const detailsX = imgBoxX + imgBoxSize + 7;
      const maxDetailsWidth = pageWidth - margin - 5 - detailsX; // ~116mm
      let dY = cardY + 8;

      // Category Pill
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 130, 20);
      doc.text(`${p.category.toUpperCase()} · ${p.metal.toUpperCase()} · ${p.collection.toUpperCase()}`, detailsX, dY);

      // Product Name (Auto-wrap so text never overflows right edge!)
      dY += 5.5;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 6, 13);
      const splitTitle = doc.splitTextToSize(p.name, maxDetailsWidth);
      doc.text(splitTitle, detailsX, dY);

      // Tagline
      dY += (splitTitle.length * 4.5) + 1;
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(90, 90, 90);
      const splitTag = doc.splitTextToSize(p.tagline || p.story || "", maxDetailsWidth);
      doc.text(splitTag, detailsX, dY);

      // Specifications Table Box
      dY += (splitTag.length * 3.8) + 2;
      doc.setFillColor(250, 247, 240);
      doc.setDrawColor(230, 215, 180);
      doc.setLineWidth(0.3);
      doc.roundedRect(detailsX, dY, maxDetailsWidth, 32, 1.5, 1.5, "FD");

      let specY = dY + 5.5;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 6, 13);
      doc.text("ITEM SPECIFICATIONS & ARTISANAL CERTIFICATE", detailsX + 4, specY);

      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.line(detailsX + 4, specY + 2, detailsX + maxDetailsWidth - 4, specY + 2);

      specY += 6.5;

      const col1X = detailsX + 4;
      const col2X = detailsX + 58;

      // Row 1
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Metal Base:", col1X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text((p.metal || "Gold").substring(0, 15), col1X + 16, specY);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Purity Grade:", col2X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text((p.purity || "22K BIS").substring(0, 15), col2X + 18, specY);

      // Row 2
      specY += 6;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Craftsmanship:", col1X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text((p.craftsmanship?.[0]?.[1] || "80 Hours").substring(0, 15), col1X + 21, specY);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Assay Lab:", col2X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text("BIS-Recognised", col2X + 16, specY);

      // Row 3
      specY += 6;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Guarantee:", col1X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text("100% BIS Hallmarked", col1X + 16, specY);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 100, 20);
      doc.text("Atelier:", col2X, specY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text("Sarafa Market", col2X + 16, specY);

      // Price on Request & Direct WhatsApp Action Button
      dY += 35;
      doc.setFillColor(59, 6, 13);
      doc.setDrawColor(212, 175, 55);
      doc.roundedRect(detailsX, dY, maxDetailsWidth, 11, 1.5, 1.5, "FD");

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text("PRICE ON REQUEST · CLICK TO INQUIRE VIA WHATSAPP", detailsX + maxDetailsWidth / 2, dY + 7, { align: "center" });

      // Add clickable WhatsApp URL link annotation
      const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");
      const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi A.P.P. Jewellers, I would like price details for catalogue item: "${p.name}" (Code: ${p.slug})`)}`;
      doc.link(detailsX, dY, maxDetailsWidth, 11, { url: waUrl });

      cardY += cardHeight + 6;
    }

    // Page Footer
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(`A.P.P. Jewellers · Sarafa Market, New Delhi · Call: ${storePhone} / WhatsApp: ${whatsappNumber}`, margin, pageHeight - 8);
    doc.text(`Page ${currentPageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  }

  // ==========================================
  // FINAL PAGE: STORE VISIT & CONTACT DIRECTORY
  // ==========================================
  doc.addPage();
  onProgress?.("Creating Store Visit & Showroom Page...");

  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Gold Inner Frame
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  let finalY = 25;

  if (darkLogoDataUrl) {
    try {
      doc.addImage(darkLogoDataUrl, "JPEG", (pageWidth - 28) / 2, finalY, 28, 28);
      finalY += 32;
    } catch {
      finalY += 10;
    }
  } else {
    finalY += 10;
  }

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("VISIT OUR SHOWROOM", pageWidth / 2, finalY, { align: "center" });

  finalY += 7;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(235, 215, 175);
  doc.text("Experience High-Purity Gold & Solitaires in Person", pageWidth / 2, finalY, { align: "center" });

  finalY += 12;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(margin + 30, finalY, pageWidth - margin - 30, finalY);

  // Address & Hours Card
  finalY += 12;
  doc.setFillColor(20, 2, 5);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 15, finalY, pageWidth - margin * 2 - 30, 85, 3, 3, "FD");

  let cardTextY = finalY + 14;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(12.5);
  doc.setFont("helvetica", "bold");
  doc.text("A.P.P. JEWELLERS — SARAFA MARKET ATELIER", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 9;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.text("Main Sarafa Market, Near Chandni Chowk / Seelampur", pageWidth / 2, cardTextY, { align: "center" });
  cardTextY += 5.5;
  doc.text("New Delhi - 110006, India", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 11;
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.text("STORE HOURS & TIMINGS", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 6.5;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text("Monday – Sunday: 11:00 AM – 8:30 PM (Open 7 Days)", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 11;
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.text("DIRECT CONTACT & APPOINTMENTS", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 6.5;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(`Phone: ${storePhone}   |   WhatsApp: ${whatsappNumber}`, pageWidth / 2, cardTextY, { align: "center" });

  // Custom Goldsmithing Callout Box
  finalY += 98;
  doc.setFillColor(75, 12, 22);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 15, finalY, pageWidth - margin * 2 - 30, 42, 2, 2, "FD");

  let customY = finalY + 11;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(11.5);
  doc.setFont("helvetica", "bold");
  doc.text("CUSTOM BRIDAL & ANTIQUE ORDERS", pageWidth / 2, customY, { align: "center" });

  customY += 7.5;
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  const customText = "Have a specific design, picture, or family heirloom you want to recreate in Gold or Diamond? Send us a message on WhatsApp or visit our Sarafa Market store for custom karigar crafting.";
  const splitCustom = doc.splitTextToSize(customText, pageWidth - margin * 2 - 45);
  doc.text(splitCustom, pageWidth / 2, customY, { align: "center" });

  // Final Thank You Signature
  finalY = pageHeight - margin - 22;
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(11.5);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for choosing A.P.P. Jewellers — Crafting Memories in Pure Gold", pageWidth / 2, finalY, { align: "center" });

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 160, 120);
  doc.text(`Catalogue Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · Confidential & Copyright A.P.P. Jewellers`, pageWidth / 2, finalY + 7, { align: "center" });

  onProgress?.("Finalizing PDF file download...");
  return doc.output("blob");
}
