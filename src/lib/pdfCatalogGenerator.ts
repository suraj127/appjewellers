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

// Convert image URL to Base64 data URL via HTML Canvas
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve(dataUrl);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export async function generateCatalogPdf(
  products: Product[],
  options: CatalogPdfOptions = {},
  onProgress?: (progressText: string) => void
): Promise<Blob> {
  const {
    title = "A.P.P. JEWELLERS — LUXURY CATALOGUE",
    subtitle = "Exquisite 22K Gold & Solitaire Diamond Collection",
    categoryFilter = "ALL",
    includeGoldRate = true,
    goldRate22k = "₹7,380 / gram",
    goldRate24k = "₹8,050 / gram",
    storePhone = "090151 55615",
    whatsappNumber = "+91 90151 55615",
    storeAddress = "Sarafa Market, New Delhi - 110006",
  } = options;

  onProgress?.("Initializing high-resolution PDF document...");

  // Create A4 PDF (Portrait, 210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;

  // Pre-load images for all selected products
  onProgress?.("Processing high-definition product images...");
  const imageMap = new Map<string, string | null>();

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    onProgress?.(`Loading product image ${i + 1} of ${products.length}: ${p.name}`);
    if (p.image) {
      const dataUrl = await loadImageAsDataUrl(p.image);
      imageMap.set(p.slug, dataUrl);
    }
  }

  onProgress?.("Formatting luxury cover page...");

  // ==========================================
  // PAGE 1: LUXURY COVER PAGE (Burgundy & Gold)
  // ==========================================
  // Background Fill - Royal Burgundy (#3b060d)
  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Double Gold Borders
  doc.setDrawColor(212, 175, 55); // Gold #d4af37
  doc.setLineWidth(1);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  doc.setLineWidth(0.3);
  doc.rect(margin + 2, margin + 2, pageWidth - margin * 2 - 4, pageHeight - margin * 2 - 8);

  // Top Store Seal Crest
  let y = 35;
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ESTABLISHED AT SARAFA MARKET · NEW DELHI", pageWidth / 2, y, { align: "center" });

  y += 12;
  doc.setFontSize(28);
  doc.text("A.P.P. JEWELLERS", pageWidth / 2, y, { align: "center" });

  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(235, 215, 175);
  doc.text("FINE 22K GOLD & SOLITAIRE DIAMOND ATELIER", pageWidth / 2, y, { align: "center" });

  // Gold Line Separator with Emblem
  y += 10;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.line(margin + 25, y, pageWidth - margin - 25, y);
  doc.setFillColor(212, 175, 55);
  doc.circle(pageWidth / 2, y, 2.5, "F");

  // Main Catalogue Title Box
  y += 22;
  doc.setFillColor(20, 2, 5);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin + 15, y, pageWidth - margin * 2 - 30, 45, 3, 3, "FD");

  let boxY = y + 14;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("2026 MASTER CATALOGUE", pageWidth / 2, boxY, { align: "center" });

  boxY += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(240, 240, 240);
  doc.text(subtitle, pageWidth / 2, boxY, { align: "center" });

  boxY += 8;
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text(`Category Focus: ${categoryFilter.toUpperCase()} · ${products.length} Featured Items`, pageWidth / 2, boxY, { align: "center" });

  // Live Store Gold Rate Banner
  y += 58;
  if (includeGoldRate) {
    doc.setFillColor(75, 12, 22);
    doc.setDrawColor(212, 175, 55);
    doc.roundedRect(margin + 20, y, pageWidth - margin * 2 - 40, 22, 2, 2, "FD");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(212, 175, 55);
    doc.text("TODAY'S STORE GOLD RATES (SARAFA MARKET, NEW DELHI)", pageWidth / 2, y + 7, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`22K Hallmarked Gold: ${goldRate22k}   |   24K Pure Gold: ${goldRate24k}`, pageWidth / 2, y + 15, { align: "center" });
  }

  // Highlights & Trust Badges
  y += 34;
  const badges = [
    "100% BIS 916 Hallmarked",
    "Certified Solitaires",
    "Custom Karigar Atelier",
    "Lifetime Purity Assurance",
  ];

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(235, 215, 175);
  const badgeWidth = (pageWidth - margin * 2 - 15) / 2;

  badges.forEach((b, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = margin + 10 + col * (badgeWidth + 5);
    const by = y + row * 16;

    doc.setFillColor(30, 4, 8);
    doc.setDrawColor(180, 140, 40);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, by, badgeWidth, 12, 1.5, 1.5, "FD");

    doc.setFillColor(212, 175, 55);
    doc.circle(bx + 6, by + 6, 2, "F");
    doc.text(b, bx + 12, by + 7.5);
  });

  // Cover Footer & Contact Box
  y = pageHeight - margin - 35;
  doc.setFillColor(15, 2, 4);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 10, y, pageWidth - margin * 2 - 20, 24, 2, 2, "FD");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(212, 175, 55);
  doc.text("FOR DIRECT PRICE QUOTES & IN-STORE APPOINTMENTS", pageWidth / 2, y + 7, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text(`Call Store: ${storePhone}   |   WhatsApp: ${whatsappNumber}`, pageWidth / 2, y + 14, { align: "center" });
  doc.text(`Store Location: ${storeAddress}`, pageWidth / 2, y + 19, { align: "center" });

  // ==========================================
  // PAGE 2: STORE CERTIFICATION & GUARANTEE
  // ==========================================
  doc.addPage();
  onProgress?.("Adding Store Guarantee & Hallmark Certificate...");

  // Light Parchment Background for readable interior pages
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Header Bar
  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, 20, "F");
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 20, pageWidth, 1.5, "F");

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("A.P.P. JEWELLERS — SARAFA MARKET, NEW DELHI", margin, 13);
  doc.setFontSize(8);
  doc.setTextColor(235, 215, 175);
  doc.text("HALLMARK CERTIFICATION & BUYER GUARANTEE", pageWidth - margin, 13, { align: "right" });

  let interiorY = 32;

  doc.setTextColor(59, 6, 13);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Our 4 Pillars of Jewellery Trust", margin, interiorY);

  interiorY += 6;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(margin, interiorY, margin + 60, interiorY);

  interiorY += 10;
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
      title: "4. Transparent Pricing & Lifetime Maintenance",
      desc: "Enjoy zero hidden charges with complete breakdown of gold weight, purity, gemstone weight, and making charges. Includes lifetime free cleaning, polishing, and purity verification.",
    },
  ];

  pillars.forEach((p) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 200, 160);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, interiorY, pageWidth - margin * 2, 25, 2, 2, "FD");

    // Gold Accent Bar on Left
    doc.setFillColor(212, 175, 55);
    doc.roundedRect(margin, interiorY, 3, 25, 1, 1, "F");

    doc.setTextColor(59, 6, 13);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(p.title, margin + 8, interiorY + 7);

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - margin * 2 - 14);
    doc.text(splitDesc, margin + 8, interiorY + 13);

    interiorY += 29;
  });

  // Table of Categories Summary Box
  interiorY += 5;
  doc.setFillColor(59, 6, 13);
  doc.roundedRect(margin, interiorY, pageWidth - margin * 2, 50, 2, 2, "F");

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Catalogue Content & Category Summary", margin + 8, interiorY + 10);

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(margin + 8, interiorY + 13, pageWidth - margin - 8, interiorY + 13);

  // Summarize count by category
  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const catEntries = Object.entries(categoryCounts);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(240, 240, 240);

  let catX = margin + 10;
  let catY = interiorY + 22;
  const colWidth = (pageWidth - margin * 2 - 20) / 3;

  catEntries.forEach(([catName, count], idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const currX = catX + col * colWidth;
    const currY = catY + row * 8;

    if (currY < interiorY + 45) {
      doc.setTextColor(212, 175, 55);
      doc.text("•", currX, currY);
      doc.setTextColor(255, 255, 255);
      doc.text(`${catName}:`, currX + 3, currY);
      doc.setTextColor(255, 215, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`${count} items`, currX + 3 + doc.getTextWidth(`${catName}: `), currY);
      doc.setFont("helvetica", "normal");
    }
  });

  // Footer Page 2
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Page 2 of CATALOGUE", pageWidth / 2, pageHeight - 8, { align: "center" });

  // ==========================================
  // PAGES 3+: DETAILED PRODUCT CARDS (2 ITEMS PER PAGE)
  // ==========================================
  const itemsPerPage = 2;
  const totalProductPages = Math.ceil(products.length / itemsPerPage);

  for (let pageIdx = 0; pageIdx < totalProductPages; pageIdx++) {
    onProgress?.(`Building Catalogue Page ${pageIdx + 3} of ${totalProductPages + 3}...`);
    doc.addPage();

    // Background
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Header Bar
    doc.setFillColor(59, 6, 13);
    doc.rect(0, 0, pageWidth, 18, "F");
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 18, pageWidth, 1.2, "F");

    doc.setTextColor(255, 215, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("A.P.P. JEWELLERS · SARAFA MARKET COLLECTION DIRECTORY", margin, 12);
    doc.setTextColor(235, 215, 175);
    doc.setFontSize(8);
    doc.text(`PAGE ${pageIdx + 3} OF ${totalProductPages + 2}`, pageWidth - margin, 12, { align: "right" });

    // Render 2 items on this page
    const pageItems = products.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);
    let cardY = 24;

    for (let itemIdx = 0; itemIdx < pageItems.length; itemIdx++) {
      const p = pageItems[itemIdx];
      const cardHeight = 124;

      // Product Outer Card Frame
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, cardY, pageWidth - margin * 2, cardHeight, 3, 3, "FD");

      // Left Column: Product Image Box
      const imgBoxX = margin + 5;
      const imgBoxY = cardY + 5;
      const imgBoxSize = 64;

      doc.setFillColor(245, 242, 235);
      doc.setDrawColor(220, 190, 130);
      doc.setLineWidth(0.3);
      doc.roundedRect(imgBoxX, imgBoxY, imgBoxSize, imgBoxSize, 2, 2, "FD");

      // Insert Loaded Base64 Image or Gold Placeholder
      const base64Img = imageMap.get(p.slug);
      if (base64Img) {
        try {
          doc.addImage(base64Img, "JPEG", imgBoxX + 2, imgBoxY + 2, imgBoxSize - 4, imgBoxSize - 4);
        } catch {
          // Fallback box
          doc.setFillColor(59, 6, 13);
          doc.rect(imgBoxX + 4, imgBoxY + 4, imgBoxSize - 8, imgBoxSize - 8, "F");
          doc.setTextColor(212, 175, 55);
          doc.setFontSize(8);
          doc.text(p.name.substring(0, 15), imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize / 2, { align: "center" });
        }
      } else {
        doc.setFillColor(59, 6, 13);
        doc.rect(imgBoxX + 4, imgBoxY + 4, imgBoxSize - 8, imgBoxSize - 8, "F");
        doc.setTextColor(212, 175, 55);
        doc.setFontSize(8);
        doc.text("A.P.P. JEWELLERS", imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize / 2, { align: "center" });
      }

      // Purity Badge under Image
      doc.setFillColor(59, 6, 13);
      doc.setDrawColor(212, 175, 55);
      doc.roundedRect(imgBoxX, imgBoxY + imgBoxSize + 4, imgBoxSize, 10, 1.5, 1.5, "FD");

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text(p.purity ? p.purity.toUpperCase() : "22K BIS HALLMARKED", imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize + 10.5, { align: "center" });

      // Code / Ref Tag under Purity
      doc.setFillColor(240, 235, 220);
      doc.roundedRect(imgBoxX, imgBoxY + imgBoxSize + 16, imgBoxSize, 8, 1, 1, "F");
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(`CODE: ${p.slug.toUpperCase().substring(0, 18)}`, imgBoxX + imgBoxSize / 2, imgBoxY + imgBoxSize + 21.5, { align: "center" });

      // Right Column: Details & Specs
      const detailsX = imgBoxX + imgBoxSize + 7;
      let dY = cardY + 9;

      // Category Pill
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 130, 20);
      doc.text(`${p.category.toUpperCase()} · ${p.metal.toUpperCase()} · ${p.collection.toUpperCase()}`, detailsX, dY);

      // Product Name
      dY += 6;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 6, 13);
      doc.text(p.name, detailsX, dY);

      // Tagline
      dY += 5;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(90, 90, 90);
      const splitTag = doc.splitTextToSize(p.tagline || p.story || "", pageWidth - detailsX - margin - 5);
      doc.text(splitTag, detailsX, dY);

      // Specifications Table Box
      dY += (splitTag.length * 4) + 2;
      doc.setFillColor(250, 247, 240);
      doc.setDrawColor(230, 215, 180);
      doc.setLineWidth(0.3);
      doc.roundedRect(detailsX, dY, pageWidth - detailsX - margin - 5, 34, 1.5, 1.5, "FD");

      let specY = dY + 6;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 6, 13);
      doc.text("ITEM SPECIFICATIONS & ARTISANAL CERTIFICATE", detailsX + 4, specY);

      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.line(detailsX + 4, specY + 2, pageWidth - margin - 9, specY + 2);

      specY += 7;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);

      // Specs Rows
      const specData = [
        ["Metal Base:", p.metal || "22K Solid Gold", "Purity Grade:", p.purity || "BIS Hallmarked 916"],
        ["Craftsmanship:", p.craftsmanship?.[0]?.[1] || "Hand-forged Karigar Atelier", "Assay Lab:", "BIS-Recognised, Delhi"],
      ];

      specData.forEach((row) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(140, 100, 20);
        doc.text(row[0], detailsX + 4, specY);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        doc.text(row[1], detailsX + 23, specY);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(140, 100, 20);
        doc.text(row[2], detailsX + 60, specY);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        doc.text(row[3], detailsX + 80, specY);

        specY += 6;
      });

      // Price on Request & Direct WhatsApp Action Button
      dY += 38;
      doc.setFillColor(59, 6, 13);
      doc.setDrawColor(212, 175, 55);
      doc.roundedRect(detailsX, dY, pageWidth - detailsX - margin - 5, 12, 1.5, 1.5, "FD");

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("PRICE ON REQUEST · INQUIRE VIA WHATSAPP / CALL", detailsX + 6, dY + 7.5);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(`Phone: ${storePhone}`, pageWidth - margin - 10, dY + 7.5, { align: "right" });

      // Add clickable link annotation to WhatsApp
      const cleanWa = whatsappNumber.replace(/[^0-9]/g, "");
      const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi A.P.P. Jewellers, I would like price details for catalogue item: "${p.name}" (Code: ${p.slug})`)}`;
      doc.link(detailsX, dY, pageWidth - detailsX - margin - 5, 12, { url: waUrl });

      cardY += cardHeight + 6;
    }

    // Page Footer
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(`A.P.P. Jewellers · Sarafa Market, New Delhi · Call: ${storePhone} / WhatsApp: ${whatsappNumber}`, margin, pageHeight - 8);
    doc.text(`Page ${pageIdx + 3} of ${totalProductPages + 2}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  }

  // ==========================================
  // FINAL PAGE: STORE VISIT & CONTACT DIRECTORY
  // ==========================================
  doc.addPage();
  onProgress?.("Creating Store Visit & Contact Directory page...");

  doc.setFillColor(59, 6, 13);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Gold Inner Frame
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  let finalY = 35;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("VISIT OUR SHOWROOM", pageWidth / 2, finalY, { align: "center" });

  finalY += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(235, 215, 175);
  doc.text("Experience High-Purity 22K Gold & Solitaires in Person", pageWidth / 2, finalY, { align: "center" });

  finalY += 15;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(margin + 30, finalY, pageWidth - margin - 30, finalY);

  // Address & Hours Card
  finalY += 15;
  doc.setFillColor(20, 2, 5);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 15, finalY, pageWidth - margin * 2 - 30, 85, 3, 3, "FD");

  let cardTextY = finalY + 15;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("A.P.P. JEWELLERS — SARAFA MARKET ATELIER", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 10;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Main Sarafa Market, Near Chandni Chowk / Seelampur", pageWidth / 2, cardTextY, { align: "center" });
  cardTextY += 6;
  doc.text("New Delhi - 110006, India", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 12;
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.text("STORE HOURS & TIMINGS", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 7;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text("Monday – Sunday: 11:00 AM – 8:30 PM (Open 7 Days)", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 12;
  doc.setTextColor(212, 175, 55);
  doc.setFont("helvetica", "bold");
  doc.text("DIRECT CONTACT & APPOINTMENTS", pageWidth / 2, cardTextY, { align: "center" });

  cardTextY += 7;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(`Phone: ${storePhone}   |   WhatsApp: ${whatsappNumber}`, pageWidth / 2, cardTextY, { align: "center" });

  // Custom Goldsmithing Callout Box
  finalY += 105;
  doc.setFillColor(75, 12, 22);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin + 15, finalY, pageWidth - margin * 2 - 30, 45, 2, 2, "FD");

  let customY = finalY + 12;
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("CUSTOM BRIDAL & ANTIQUE ORDERS", pageWidth / 2, customY, { align: "center" });

  customY += 8;
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const customText = "Have a specific design, picture, or family heirloom you want to recreate in 22K Gold or Diamond? Send us a message on WhatsApp or visit our Sarafa Market store for custom karigar crafting.";
  const splitCustom = doc.splitTextToSize(customText, pageWidth - margin * 2 - 45);
  doc.text(splitCustom, pageWidth / 2, customY, { align: "center" });

  // Final Thank You Signature
  finalY = pageHeight - margin - 25;
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for choosing A.P.P. Jewellers — Crafting Memories in Pure Gold", pageWidth / 2, finalY, { align: "center" });

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 160, 120);
  doc.text(`Catalogue Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · Confidential & Copyright A.P.P. Jewellers`, pageWidth / 2, finalY + 8, { align: "center" });

  onProgress?.("Finalizing PDF file download...");
  return doc.output("blob");
}
