import * as XLSX from "xlsx";
import type { Product, Spec } from "@/data/products";
import { addOrUpdateProduct, bulkAddProducts } from "@/data/storeState";

// Fallback images based on category when imported without images
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  BANGLES: "/assets/items/emerald_gold_bangles_1785608060682.png",
  BRACELET: "/assets/items/emerald_gold_bangles_1785608060682.png",
  "LADIES BRACELET": "/assets/items/emerald_gold_bangles_1785608060682.png",
  CHAIN: "/assets/items/kundan_choker_set_1785608015801.png",
  NECKLACE: "/assets/items/kundan_choker_set_1785608015801.png",
  HARAM: "/assets/items/temple_gold_haram_1785608046359.png",
  CHOKER: "/assets/items/kundan_choker_set_1785608015801.png",
  "CHOKER SET": "/assets/items/kundan_choker_set_1785608015801.png",
  RINGS: "/assets/items/diamond_solitaire_ring_1785608029662.png",
  RING: "/assets/items/diamond_solitaire_ring_1785608029662.png",
  JHUMKA: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
  EARRINGS: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
  STUDS: "/assets/items/ruby_jhumka_earrings_1785608073617.png",
  COIN: "/assets/items/gold_lakshmi_coin_1785608088525.png",
  "GOLD COIN": "/assets/items/gold_lakshmi_coin_1785608088525.png",
  VADDANAM: "/assets/items/temple_gold_haram_1785608046359.png",
  DEFAULT: "/assets/items/kundan_choker_set_1785608015801.png",
};

export function getFallbackImageForCategory(cat: string): string {
  const upperCat = (cat || "").toUpperCase();
  for (const key of Object.keys(CATEGORY_IMAGE_MAP)) {
    if (upperCat.includes(key)) {
      return CATEGORY_IMAGE_MAP[key];
    }
  }
  return CATEGORY_IMAGE_MAP.DEFAULT;
}

export function parsePurityPercentage(pr: any): string {
  const str = String(pr || "").trim();
  if (str.includes("91.6") || str.includes("916")) return "22 CARAT";
  if (str.includes("75") || str.includes("750")) return "18 CARAT";
  if (str.includes("99.9") || str.includes("999") || str.includes("100")) return "24 CARAT";
  if (str.includes("83.3") || str.includes("833")) return "20 CARAT";
  if (str) return `${str} CARAT`;
  return "22 CARAT";
}

export function parseExcelRowsToProducts(rows: any[]): Product[] {
  if (!rows || rows.length === 0) return [];

  // Find header row or key mapping
  const parsedProducts: Product[] = [];

  rows.forEach((row, idx) => {
    // Skip empty or header rows
    const pid = String(row.PID || row["PID"] || row.A || row[0] || "").trim();
    if (!pid || pid.toUpperCase() === "PID" || pid.startsWith("Row ")) return;

    const metal = String(row.METAL || row["METAL"] || row.B || row[1] || "GOLD").trim().toUpperCase();
    const categoryRaw = String(row.CATEGORY || row["CATEGORY"] || row.C || row[2] || "JEWELLERY").trim().toUpperCase();
    const itemDet = String(row["ITEM DET"] || row.ITEM_DET || row.D || row[3] || `${metal} ${categoryRaw}`).trim();
    const grossWt = String(row["GS WT"] || row.GS_WT || row.F || row[5] || "0.00").trim();
    const lessWt = String(row["LESS WT"] || row.LESS_WT || row.G || row[6] || "0.00").trim();
    const netWt = String(row["NT WT"] || row.NT_WT || row.I || row[8] || grossWt).trim();
    const purityRaw = row["P.R."] || row.PR || row.J || row[9] || "91.6 %";
    const stoneWt = String(row["STONE WT"] || row.STONE_WT || row.Q || row[16] || "").trim();
    const stoneQty = String(row["STONE QYT"] || row["STONE QTY"] || row.R || row[17] || "").trim();

    const purity = parsePurityPercentage(purityRaw);

    // Normalize category
    let category = categoryRaw;
    if (categoryRaw.includes("BANGLES")) category = "BANGLES";
    else if (categoryRaw.includes("BRACELET")) category = "BRACELETS";
    else if (categoryRaw.includes("CHAIN")) category = "CHAIN";
    else if (categoryRaw.includes("HARAM")) category = "HARAM";
    else if (categoryRaw.includes("COIN")) category = "GOLD COIN";
    else if (categoryRaw.includes("RING")) category = "RINGS";
    else if (categoryRaw.includes("JHUMKA")) category = "JHUMKA";
    else if (categoryRaw.includes("STUD")) category = "STUDS";
    else if (categoryRaw.includes("PAYAL") || categoryRaw.includes("ANKLET")) category = "ANKLETS";
    else if (categoryRaw.includes("LOCKET") || categoryRaw.includes("PENDANT")) category = "PENDANT";
    else if (categoryRaw.includes("CHOKER")) category = "BRIDAL SET";

    const defaultImg = getFallbackImageForCategory(category);
    const slug = `app-stock-${pid.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

    const materials: Spec[] = [
      ["Metal Base", metal],
      ["Purity Grade", purity],
      ["Gross Weight", `${grossWt} g`],
      ["Net Weight", `${netWt} g`],
      ["Less Weight", `${lessWt} g`],
    ];

    if (stoneWt) materials.push(["Stone Weight", stoneWt]);
    if (stoneQty) materials.push(["Stone Quantity", stoneQty]);

    const product: Product = {
      slug,
      name: `${itemDet} #${pid.toUpperCase()}`,
      collection: `${categoryRaw} Collection`,
      category,
      metal,
      purity,
      eyebrow: `Piece #${pid.toUpperCase()} · Sarafa Market Stock`,
      image: defaultImg,
      hoverImage: defaultImg,
      priceOnRequest: true,
      isExclusive: true,
      tagline: `Gross Wt: ${grossWt}g · Net Wt: ${netWt}g · Purity: ${purity} · BIS Hallmarked.`,
      story: `Stock Ref #${pid.toUpperCase()} from A.P.P. Jewellers inventory. Gross Weight: ${grossWt}g, Net Weight: ${netWt}g, Purity: ${purity}. Certified 100% BIS Hallmarked.`,
      materials,
      craftsmanship: [
        ["Artisan Hours", "80 Hours"],
        ["Technique", "Hand-Forged Karigar Atelier"],
      ],
      dimensions: [
        ["Gross Weight", `${grossWt} g`],
        ["Net Weight", `${netWt} g`],
      ],
      certificate: [
        ["BIS Hallmark", purity],
        ["Assay Lab", "BIS-Recognised, Delhi"],
      ],
      atelierNotes: [`Stock ID #${pid.toUpperCase()} stored at Sarafa Market showroom.`],
    };

    parsedProducts.push(product);
  });

  return parsedProducts;
}

export async function parseExcelFile(file: File): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonRows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        const products = parseExcelRowsToProducts(jsonRows);
        resolve(products);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
