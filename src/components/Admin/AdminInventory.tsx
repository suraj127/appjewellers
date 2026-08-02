import { useState } from "react";
import { getAllProducts, addOrUpdateProduct, deleteProductBySlug, bulkAddProducts, clearCustomProducts } from "@/data/storeState";
import type { Product } from "@/data/products";
import { parseExcelFile, parseExcelRowsToProducts } from "@/lib/excelImporter";
import { EXCEL_STOCK_RAW_ROWS } from "@/data/excelStockData";
import { toast } from "sonner";

export function AdminInventory() {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Rings");
  const [metal, setMetal] = useState("Gold");
  const [purity, setPurity] = useState("22K Gold");
  const [collection, setCollection] = useState("Classic Essentials");
  const [primaryImage, setPrimaryImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [tagline, setTagline] = useState("");
  const [story, setStory] = useState("");
  const [isExclusive, setIsExclusive] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.metal.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setName("");
    setCategory("Rings");
    setMetal("Gold");
    setPurity("22K Gold");
    setCollection("Classic Essentials");
    setPrimaryImage("");
    setHoverImage("");
    setTagline("");
    setStory("");
    setIsExclusive(false);
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setMetal(p.metal);
    setPurity(p.purity);
    setCollection(p.collection);
    setPrimaryImage(p.image);
    setHoverImage(p.hoverImage || "");
    setTagline(p.tagline || "");
    setStory(p.story || "");
    setIsExclusive(!!p.isExclusive);
    setIsModalOpen(true);
  };

  const handleDelete = (slug: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from your store catalog?`)) {
      const updated = deleteProductBySlug(slug);
      setProducts(updated);
      toast.success(`"${name}" removed from inventory.`);
    }
  };

  // Excel Upload Import Handler
  const handleImportExcelFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      toast.loading(`Reading "${file.name}"...`);
      const newProds = await parseExcelFile(file);
      if (newProds.length === 0) {
        toast.dismiss();
        toast.error("No valid stock rows found in Excel file.");
        return;
      }
      const updated = bulkAddProducts(newProds);
      setProducts(updated);
      toast.dismiss();
      toast.success(`Successfully imported ${newProds.length} items from Excel!`);
    } catch (err) {
      console.error("Excel import error:", err);
      toast.dismiss();
      toast.error("Failed to parse Excel file. Please check file format.");
    } finally {
      e.target.value = "";
    }
  };

  // Preset 1-Click Import Handler for ExcelGOLD STOCK LIST.xlsx
  const handleImportDefaultExcelStock = () => {
    try {
      const newProds = parseExcelRowsToProducts(EXCEL_STOCK_RAW_ROWS);
      const updated = bulkAddProducts(newProds);
      setProducts(updated);
      toast.success(`Imported ${newProds.length} items from "ExcelGOLD STOCK LIST.xlsx"!`);
    } catch (err) {
      console.error("Default Excel stock import error:", err);
      toast.error("Failed to import stock list.");
    }
  };

  const handleResetImportedStock = () => {
    if (confirm("Reset custom imported stock items back to default collection?")) {
      const updated = clearCustomProducts();
      setProducts(updated);
      toast.success("Imported stock items reset.");
    }
  };

  // Automatic HD Image Compressor
  const compressAndSetImage = (file: File, isHover: boolean) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.82);
          if (isHover) {
            setHoverImage(compressedBase64);
          } else {
            setPrimaryImage(compressedBase64);
          }
          toast.success(`Photo compressed & attached (${Math.round(compressedBase64.length / 1024)} KB)`);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter an ornament name.");
    if (!primaryImage) return toast.error("Please upload or provide an ornament photo.");

    const slug = editingProduct?.slug || `custom-${Date.now()}`;
    const newProd: Product = {
      slug,
      name,
      category,
      metal,
      purity,
      collection,
      eyebrow: `${collection} · A.P.P. Jewellers`,
      image: primaryImage,
      hoverImage: hoverImage || primaryImage,
      tagline: tagline || `${purity} ${metal} ${category} from A.P.P. Jewellers.`,
      story: story || `Exclusive handcrafted ${name} available at Sarafa Market showroom.`,
      priceOnRequest: true,
      isExclusive,
      materials: [
        ["Metal Base", metal],
        ["Purity Grade", purity],
      ],
      craftsmanship: [
        ["Artisan Hours", "80 Hours"],
        ["Technique", "Hand-Forged Karigar Atelier"],
      ],
      dimensions: [["Guarantee", "100% BIS Hallmarked"]],
      certificate: [
        ["BIS Hallmark", purity],
        ["Assay Lab", "BIS-Recognised, Delhi"],
      ],
      atelierNotes: ["Individually inspected and certified."],
    };

    const updated = addOrUpdateProduct(newProd);
    setProducts(updated);
    setIsModalOpen(false);
    resetForm();
    toast.success(editingProduct ? "Ornament updated successfully!" : "New Ornament added to inventory!");
  };

  return (
    <div className="bg-onyx/90 border border-gold/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl text-left">
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gold/30 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-gold font-bold uppercase tracking-wider">
            Store Inventory Manager ({products.length} Items)
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Add new gold & diamond ornaments, import Excel stock lists, edit details or manage store catalog.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Excel Upload File Input */}
          <label className="shine-sweep bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition-all hover:bg-emerald-900 cursor-pointer flex items-center gap-1.5 shadow">
            <span>📄</span> Import Excel (.xlsx)
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleImportExcelFile}
              className="hidden"
            />
          </label>

          {/* Quick 1-Click Import for ExcelGOLD STOCK LIST.xlsx */}
          <button
            type="button"
            onClick={handleImportDefaultExcelStock}
            className="shine-sweep bg-amber-950/80 text-amber-300 border border-gold/60 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition-all hover:bg-amber-900 cursor-pointer flex items-center gap-1.5 shadow"
          >
            <span>📊</span> Import Stock List (117 Items)
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="shine-sweep bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-all hover:opacity-90 cursor-pointer flex items-center gap-1.5 shadow"
          >
            <span>✨</span> Add Ornament
          </button>
        </div>
      </div>

      {/* Excel Import Info Banner */}
      <div className="p-3 rounded bg-gradient-to-r from-[#4a0810]/40 via-onyx to-[#4a0810]/40 border border-gold/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <span className="bg-gold text-primary-foreground font-bold px-1.5 py-0.5 rounded text-[0.5rem] uppercase tracking-wider">
            EXCEL AUTO-IMPORT
          </span>
          <span className="text-[0.68rem]">
            Upload any stock Excel file (like <strong className="text-white">ExcelGOLD STOCK LIST.xlsx</strong>) to auto-extract Gross Weight, Net Weight, Purity %, Category & Item codes without images.
          </span>
        </div>
        <button
          type="button"
          onClick={handleResetImportedStock}
          className="text-[0.6rem] text-gold underline hover:text-white uppercase font-bold shrink-0 ml-2"
        >
          Reset Stock
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by ornament name, PID code (e.g. GBN1, GLB1), category or metal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-background border border-gold/30 rounded px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold"
        />
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto border border-gold/20 rounded">
        <table className="w-full text-left text-xs text-muted-foreground">
          <thead className="bg-black/60 text-gold uppercase tracking-widest text-[0.6rem] border-b border-gold/20">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Ornament Name & Code</th>
              <th className="p-3">Category</th>
              <th className="p-3">Metal & Purity</th>
              <th className="p-3">Specifications</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {filteredProducts.map((p) => (
              <tr key={p.slug} className="hover:bg-gold/5 transition-colors">
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="size-12 object-cover rounded border border-gold/30 bg-black"
                  />
                </td>
                <td className="p-3">
                  <div className="font-semibold text-white text-sm">{p.name}</div>
                  <div className="text-[0.65rem] text-muted-foreground truncate max-w-xs">{p.tagline}</div>
                </td>
                <td className="p-3 text-amber-200 uppercase font-medium">{p.category}</td>
                <td className="p-3">
                  <span className="text-white font-medium">{p.metal}</span>
                  <span className="block text-[0.65rem] text-gold">{p.purity}</span>
                </td>
                <td className="p-3">
                  <span className="text-[0.65rem] text-white/80 block">
                    {p.materials?.[2]?.[0]}: <strong className="text-amber-200">{p.materials?.[2]?.[1]}</strong>
                  </span>
                  <span className="text-[0.6rem] text-muted-foreground block">
                    {p.materials?.[3]?.[0]}: {p.materials?.[3]?.[1]}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="text-[0.6rem] uppercase tracking-wider text-amber-300 hover:text-white border border-amber-300/40 px-2.5 py-1 rounded hover:bg-amber-300/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.slug, p.name)}
                    className="text-[0.6rem] uppercase tracking-wider text-rose-400 hover:text-white border border-rose-500/40 px-2.5 py-1 rounded hover:bg-rose-500/20"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No ornaments found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-onyx border border-gold/50 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-gold text-xl"
            >
              ✕
            </button>
            <h3 className="font-display text-xl text-gold font-bold uppercase tracking-wider mb-6">
              {editingProduct ? "Edit Store Ornament" : "Add New Store Ornament"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gold mb-1 font-semibold">Ornament Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal 22K Kundan Choker"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold mb-1 font-semibold">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                  >
                    {["RINGS", "BANGLES", "BRACELETS", "EARRINGS", "JHUMKA", "NECKLACE", "HARAM", "CHAIN", "GOLD COIN", "STUDS", "ANKLETS", "BRIDAL SET", "MANGALSUTRA"].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gold mb-1 font-semibold">Metal *</label>
                  <select
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                  >
                    {["GOLD", "DIAMOND", "PLATINUM", "SILVER", "GEMSTONE"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gold mb-1 font-semibold">Purity Grade *</label>
                  <select
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                  >
                    {["24 CARAT", "22 CARAT", "20 CARAT", "18 CARAT"].map((pur) => (
                      <option key={pur} value={pur}>
                        {pur}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gold mb-1 font-semibold">Collection Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Heritage Kundan"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Photo Upload Box */}
              <div className="p-4 rounded border border-gold/30 bg-black/40 space-y-3">
                <label className="block text-gold font-semibold uppercase tracking-wider text-[0.68rem]">
                  Ornament Photo (Auto Compress & Optimize) *
                </label>
                <div className="grid sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && compressAndSetImage(e.target.files[0], false)}
                      className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                    />
                    <p className="text-[0.6rem] text-muted-foreground mt-1">
                      Upload camera photo or image file. Automatically compressed to high-res.
                    </p>
                  </div>

                  {primaryImage && (
                    <div className="flex items-center gap-3">
                      <img
                        src={primaryImage}
                        alt="Preview"
                        className="size-16 object-cover rounded border border-gold/50"
                      />
                      <span className="text-[0.6rem] text-emerald-400 font-bold">Photo Attached ✓</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gold mb-1 font-semibold">Tagline / Short Summary</label>
                <input
                  type="text"
                  placeholder="e.g. Certified 22K Gold handcrafted by master goldsmiths."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-white outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="exclusiveCheck"
                  checked={isExclusive}
                  onChange={(e) => setIsExclusive(e.target.checked)}
                  className="accent-gold size-4"
                />
                <label htmlFor="exclusiveCheck" className="text-white text-xs font-semibold">
                  Mark as Exclusive / Featured Piece
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs text-muted-foreground uppercase tracking-widest hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="shine-sweep bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded hover:opacity-90"
                >
                  {editingProduct ? "Save Changes" : "Publish Ornament"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
