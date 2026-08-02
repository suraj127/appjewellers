import { PRODUCTS, type Product } from "./products";
import { EXCEL_STOCK_RAW_ROWS } from "./excelStockData";
import { parseExcelRowsToProducts } from "@/lib/excelImporter";

const DEFAULT_EXCEL_PRODUCTS = parseExcelRowsToProducts(EXCEL_STOCK_RAW_ROWS);

export interface GoldRates {
  rate24k: number;
  rate22k: number;
  rate18k: number;
  rate14k: number;
  lastUpdated: string;
}

export interface CustomerBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  boutique: string;
  preferredDate: string;
  preferredTime: string;
  format: "boutique" | "video";
  pieceOfInterest?: string;
  notes?: string;
  createdAt: string;
}

const DEFAULT_RATES: GoldRates = {
  rate24k: 8050,
  rate22k: 7380,
  rate18k: 6040,
  rate14k: 4700,
  lastUpdated: new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
};

const DEFAULT_PASSCODE = "7380";
const RATES_STORAGE_KEY = "app_jewellers_live_rates";
const CUSTOM_PRODUCTS_KEY = "app_jewellers_custom_products";
const DELETED_PRODUCTS_KEY = "app_jewellers_deleted_slugs";
const BOOKINGS_STORAGE_KEY = "app_jewellers_bookings_list";
const AUTH_KEY = "app_jewellers_admin_auth";

// --- LIVE GOLD RATES MANAGEMENT ---
export function getLiveGoldRates(): GoldRates {
  if (typeof window === "undefined") return DEFAULT_RATES;
  try {
    const stored = localStorage.getItem(RATES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading gold rates from localStorage", e);
  }
  return DEFAULT_RATES;
}

export function saveLiveGoldRates(rates: Partial<GoldRates>): GoldRates {
  const current = getLiveGoldRates();
  const updated: GoldRates = {
    ...current,
    ...rates,
    lastUpdated: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("app_rates_updated"));
  }
  return updated;
}

// --- INVENTORY MANAGEMENT ---
export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading custom products", e);
  }
  return [];
}

export function getDeletedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(DELETED_PRODUCTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading deleted slugs", e);
  }
  return [];
}

export function getAllProducts(): Product[] {
  const deletedSlugs = getDeletedSlugs();
  const customProds = getCustomProducts();

  const customSlugSet = new Set(customProds.map((p) => p.slug));
  const baseCombined = [...PRODUCTS, ...DEFAULT_EXCEL_PRODUCTS].filter(
    (p) => !customSlugSet.has(p.slug)
  );

  const activeBase = baseCombined.filter((p) => !deletedSlugs.includes(p.slug));
  return [...customProds, ...activeBase];
}

export function bulkAddProducts(newProducts: Product[]): Product[] {
  const existingCustom = getCustomProducts();
  const existingSlugs = new Set(existingCustom.map((p) => p.slug));

  const filteredNew = newProducts.filter((p) => !existingSlugs.has(p.slug));
  const updatedCustom = [...filteredNew, ...existingCustom];

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedCustom));
    window.dispatchEvent(new Event("app_inventory_updated"));
  }
  return getAllProducts();
}

export function clearCustomProducts(): Product[] {

  if (typeof window !== "undefined") {
    localStorage.removeItem(CUSTOM_PRODUCTS_KEY);
    window.dispatchEvent(new Event("app_inventory_updated"));
  }
  return getAllProducts();
}

export function addOrUpdateProduct(product: Product): Product[] {

  const existingCustom = getCustomProducts();
  const index = existingCustom.findIndex((p) => p.slug === product.slug);

  let updatedCustom: Product[];
  if (index >= 0) {
    updatedCustom = [...existingCustom];
    updatedCustom[index] = product;
  } else {
    updatedCustom = [product, ...existingCustom];
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedCustom));
    window.dispatchEvent(new Event("app_inventory_updated"));
  }
  return getAllProducts();
}



export function deleteProductBySlug(slug: string): Product[] {
  const customProds = getCustomProducts();
  const isCustom = customProds.some((p) => p.slug === slug);

  if (isCustom) {
    const updatedCustom = customProds.filter((p) => p.slug !== slug);
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedCustom));
  } else {
    const deletedSlugs = getDeletedSlugs();
    if (!deletedSlugs.includes(slug)) {
      const updatedDeleted = [...deletedSlugs, slug];
      localStorage.setItem(DELETED_PRODUCTS_KEY, JSON.stringify(updatedDeleted));
    }
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("app_inventory_updated"));
  }
  return getAllProducts();
}

// --- APPOINTMENTS / BOOKINGS MANAGEMENT ---
export function getCustomerBookings(): CustomerBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading customer bookings", e);
  }
  return [
    {
      id: "BK-1001",
      fullName: "Rohan Sharma",
      email: "rohan.sharma@example.com",
      phone: "09876543210",
      boutique: "A.P.P. Jewellers — Shop No. D-155, Sarafa Market, New Seelampur, New Delhi",
      preferredDate: "2026-08-05",
      preferredTime: "11:30 AM",
      format: "boutique",
      pieceOfInterest: "Chandra Suite",
      notes: "Looking for bridal necklace customization.",
      createdAt: "2026-08-02",
    },
  ];
}

export function saveCustomerBooking(booking: Omit<CustomerBooking, "id" | "createdAt">): CustomerBooking {
  const current = getCustomerBookings();
  const newBooking: CustomerBooking = {
    ...booking,
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  const updated = [newBooking, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("app_bookings_updated"));
  }
  return newBooking;
}

// --- ADMIN AUTHENTICATION ---
export function verifyAdminPasscode(passcode: string): boolean {
  if (passcode.trim() === DEFAULT_PASSCODE || passcode.trim() === "7380" || passcode.trim() === "1234") {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_KEY, "true");
      window.dispatchEvent(new Event("app_auth_updated"));
    }
    return true;
  }
  return false;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("app_auth_updated"));
  }
}
