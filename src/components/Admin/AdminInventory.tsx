import { useState } from "react";
import { getAllProducts, addOrUpdateProduct, deleteProductBySlug } from "@/data/storeState";
import type { Product } from "@/data/products";
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
      p.metal.toLowerCase().includes(search.toLowerCase())
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

  // Automatic HD Image Compressor (Compresses 5-6MB camera photos down to ~150-250KB crisp HD WebP/JPEG)
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
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          if (isHover) {
            setHoverImage(compressedDataUrl);
          } else {
            setPrimaryImage(compressedDataUrl);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isHover = false) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndSetImage(file, isHover);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter an ornament name.");
      return;
    }
    if (!primaryImage.trim()) {
      toast.error("Please provide or upload a primary ornament image.");
      return;
    }

    const slug = editingProduct
      ? editingProduct.slug
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(1000 + Math.random() * 9000);

    const newProd: Product = {
      slug,
      name,
      category,
      metal,
      purity,
      collection,
      image: primaryImage,
      hoverImage: hoverImage || primaryImage,
      tagline: tagline || `${purity} Handcrafted ${category}`,
      story: story || `Exquisite handcrafted ${name} made with ${purity} purity gold at our Sarafa Market workshop.`,
      isExclusive,
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/30 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-gold font-bold uppercase tracking-wider">
            Store Inventory Manager ({products.length} Items)
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Add new gold & diamond ornaments, upload photos, edit descriptions or manage exclusivity.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="shine-sweep bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest px-6 py-3 rounded transition-all hover:opacity-90 cursor-pointer flex items-center gap-2"
        >
          <span>✨</span> Add New Ornament
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by ornament name, category (Rings, Bangles...) or metal..."
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
              <th className="p-3">Ornament Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Metal & Purity</th>
              <th className="p-3">Exclusive</th>
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
                  {p.isExclusive ? (
                    <span className="bg-gold/20 text-gold border border-gold/50 px-2 py-0.5 rounded text-[0.55rem] uppercase font-bold">
                      ★ Featured
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-[0.6rem]">Standard</span>
                  )}
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

      {/* ADD / EDIT ORNAMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-onyx border border-gold/50 rounded-lg p-6 sm:p-8 max-w-2xl w-full my-8 text-left space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <h3 className="font-display text-lg text-gold font-bold uppercase tracking-wider">
                {editingProduct ? "Edit Ornament Details" : "Add New Gold / Diamond Ornament"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Name */}
              <div>
                <label className="text-gold uppercase tracking-wider font-semibold block mb-1">
                  Ornament Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Kundan Peacock Necklace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                />
              </div>

              {/* Category & Metal & Purity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-gold uppercase tracking-wider font-semibold block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                  >
                    {[
                      "Rings",
                      "Bangles",
                      "Earrings",
                      "Jhumka",
                      "Necklace",
                      "Haram",
                      "Pendant",
                      "Bridal Set",
                      "Mangalsutra",
                      "Gold Coin",
                      "Chain",
                      "Kada",
                    ].map((c) => (
                      <option key={c} value={c} className="bg-background text-foreground">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gold uppercase tracking-wider font-semibold block mb-1">Metal *</label>
                  <select
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                  >
                    {["Gold", "Diamond", "Platinum", "Silver", "Gemstone"].map((m) => (
                      <option key={m} value={m} className="bg-background text-foreground">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gold uppercase tracking-wider font-semibold block mb-1">Purity Grade *</label>
                  <select
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                  >
                    {["24K Gold", "22K Gold", "20K Gold", "18K Gold", "14K Gold", "VVS Diamond", "925 Silver"].map((p) => (
                      <option key={p} value={p} className="bg-background text-foreground">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Primary Image Upload & Preview */}
              <div className="border border-gold/30 p-4 rounded bg-black/40 space-y-3">
                <label className="text-gold uppercase tracking-wider font-semibold block">
                  Primary Ornament Photo *
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt="Primary preview"
                      className="size-20 object-cover rounded border border-gold/50 bg-black"
                    />
                  ) : (
                    <div className="size-20 rounded border border-dashed border-gold/40 flex items-center justify-center text-[0.6rem] text-muted-foreground text-center p-1">
                      No Photo Selected
                    </div>
                  )}

                  <div className="space-y-2 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="block w-full text-[0.65rem] text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-gold/40 file:bg-gold/10 file:text-gold file:font-semibold hover:file:bg-gold/20 cursor-pointer"
                    />
                    <div className="text-[0.6rem] text-muted-foreground">OR enter photo URL link below:</div>
                    <input
                      type="text"
                      placeholder="https://example.com/ornament.jpg"
                      value={primaryImage}
                      onChange={(e) => setPrimaryImage(e.target.value)}
                      className="w-full bg-background border border-gold/20 rounded px-3 py-1.5 text-foreground outline-none focus:border-gold text-[0.65rem]"
                    />
                  </div>
                </div>
              </div>

              {/* Hover Image Upload & Preview */}
              <div className="border border-gold/20 p-4 rounded bg-black/40 space-y-3">
                <label className="text-amber-200 uppercase tracking-wider font-semibold block">
                  Secondary Alternate / Hover Photo (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {hoverImage ? (
                    <img
                      src={hoverImage}
                      alt="Hover preview"
                      className="size-20 object-cover rounded border border-gold/50 bg-black"
                    />
                  ) : (
                    <div className="size-20 rounded border border-dashed border-gold/30 flex items-center justify-center text-[0.6rem] text-muted-foreground text-center p-1">
                      Same as Primary
                    </div>
                  )}

                  <div className="space-y-2 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="block w-full text-[0.65rem] text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-gold/40 file:bg-gold/10 file:text-gold file:font-semibold hover:file:bg-gold/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="Secondary angle photo URL (Optional)"
                      value={hoverImage}
                      onChange={(e) => setHoverImage(e.target.value)}
                      className="w-full bg-background border border-gold/20 rounded px-3 py-1.5 text-foreground outline-none focus:border-gold text-[0.65rem]"
                    />
                  </div>
                </div>
              </div>

              {/* Tagline & Story */}
              <div>
                <label className="text-gold uppercase tracking-wider font-semibold block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Certified 22K Gold hallmarked with Burmese Rubies"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-gold uppercase tracking-wider font-semibold block mb-1">Craft Story / Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe craftsmanship details, stones, or polish..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-background border border-gold/30 rounded px-3 py-2 text-foreground outline-none focus:border-gold"
                />
              </div>

              {/* Exclusive Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isExclusive"
                  checked={isExclusive}
                  onChange={(e) => setIsExclusive(e.target.checked)}
                  className="size-4 accent-gold cursor-pointer"
                />
                <label htmlFor="isExclusive" className="text-gold font-semibold tracking-wide cursor-pointer">
                  Feature in Homepage Exclusive Showcase Carousel ★
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded border border-border text-muted-foreground hover:text-white uppercase tracking-wider text-[0.65rem]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="shine-sweep bg-gold text-primary-foreground font-bold px-6 py-2.5 rounded uppercase tracking-wider text-[0.65rem]"
                >
                  {editingProduct ? "Save Changes" : "Publish Ornament to Site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
