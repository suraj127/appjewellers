import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { isAdminAuthenticated, verifyAdminPasscode, logoutAdmin } from "@/data/storeState";
import { AdminLiveRates } from "@/components/Admin/AdminLiveRates";
import { AdminInventory } from "@/components/Admin/AdminInventory";
import { AdminAppointments } from "@/components/Admin/AdminAppointments";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<"rates" | "inventory" | "appointments">("inventory");

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setAuthed(true);
      setPasscode("");
      toast.success("Welcome to A.P.P. Jewellers Admin Portal");
    } else {
      toast.error("Incorrect Passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
    toast.info("Logged out of Admin Portal.");
  };

  // PASSCODE LOCK SCREEN FOR UNAUTHENTICATED VISITORS
  if (!authed) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-[#ffffff] via-[#fdf0f2] to-[#fff5f6]">
        <div className="bg-white/95 border border-[#9b111e]/30 rounded-lg p-8 sm:p-10 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="mx-auto size-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold text-2xl shadow-inner">
            🔐
          </div>

          <div>
            <h1 className="font-display text-2xl text-[#9b111e] font-bold uppercase tracking-wider">
              A.P.P. Jewellers Admin
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Private Management Portal. Enter master passcode to access inventory & live rate controls.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[0.62rem] uppercase tracking-widest text-gold font-bold block mb-1.5">
                Master Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. 7380)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                autoFocus
                className="w-full bg-background border border-gold/40 rounded px-4 py-3 text-center text-lg text-[#9b111e] tracking-widest font-mono outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="shine-sweep w-full bg-gold text-primary-foreground font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-all hover:opacity-90 shadow-lg cursor-pointer"
            >
              Access Admin Portal
            </button>
          </form>

          <p className="text-[0.6rem] text-muted-foreground">
            Default PIN: <code className="text-gold">7380</code> · Protected session
          </p>
        </div>
      </div>
    );
  }

  // DASHBOARD PANEL FOR LOGGED-IN STORE MANAGERS
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-8 space-y-8">
      {/* Top Header Navigation Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold/30 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👑</span>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-[#9b111e] font-bold uppercase tracking-wider">
              A.P.P. Jewellers Backend
            </h1>
            <p className="text-xs text-muted-foreground">
              Sarafa Market Store Portal · Live Rates, Inventory & Customer Bookings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-[0.62rem] uppercase tracking-widest text-gold border border-gold/40 px-4 py-2 rounded hover:bg-gold/10 transition-colors"
          >
            ↗ Preview Live Website
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="text-[0.62rem] uppercase tracking-widest text-rose-400 border border-rose-500/40 px-4 py-2 rounded hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 border-b border-border pb-4">
        {[
          { id: "inventory", label: "💍 Inventory Catalog Manager", desc: "Add/Edit Ornaments & Photos" },
          { id: "rates", label: "💰 Live Gold Rates", desc: "24K, 22K, 18K, 14K Rates" },
          { id: "appointments", label: "📅 Customer Bookings", desc: "Store Visit Inquiries" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-gold/20 border-gold text-gold font-bold shadow-lg"
                : "bg-onyx/40 border-gold/20 text-muted-foreground hover:text-white hover:border-gold/50"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider">{tab.label}</div>
            <div className="text-[0.6rem] text-muted-foreground mt-0.5">{tab.desc}</div>
          </button>
        ))}
      </div>

      {/* Active Tab Component */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "rates" && <AdminLiveRates />}
        {activeTab === "inventory" && <AdminInventory />}
        {activeTab === "appointments" && <AdminAppointments />}
      </div>
    </div>
  );
}
