import { useState } from "react";
import { getCustomerBookings, type CustomerBooking } from "@/data/storeState";

export function AdminAppointments() {
  const [bookings] = useState<CustomerBooking[]>(getCustomerBookings());

  return (
    <div className="bg-onyx/90 border border-gold/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl text-left">
      <div className="border-b border-gold/30 pb-4">
        <h2 className="font-display text-xl sm:text-2xl text-gold font-bold uppercase tracking-wider">
          Store Visit & Private Salon Bookings ({bookings.length})
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Review appointment requests submitted by clients for Sarafa Market showroom viewings.
        </p>
      </div>

      <div className="overflow-x-auto border border-gold/20 rounded">
        <table className="w-full text-left text-xs text-muted-foreground">
          <thead className="bg-black/60 text-gold uppercase tracking-widest text-[0.6rem] border-b border-gold/20">
            <tr>
              <th className="p-3">Client Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Preferred Slot</th>
              <th className="p-3">Format</th>
              <th className="p-3">Piece of Interest</th>
              <th className="p-3 text-right">Quick Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gold/5 transition-colors">
                <td className="p-3">
                  <div className="font-semibold text-white text-sm">{b.fullName}</div>
                  <div className="text-[0.65rem] text-gold">{b.id} · {b.createdAt}</div>
                </td>
                <td className="p-3">
                  <div className="text-white font-medium">{b.phone || "No phone"}</div>
                  <div className="text-[0.65rem] text-muted-foreground">{b.email}</div>
                </td>
                <td className="p-3">
                  <div className="text-amber-200 font-bold">{b.preferredDate}</div>
                  <div className="text-[0.65rem] text-gold">{b.preferredTime}</div>
                </td>
                <td className="p-3">
                  <span className="bg-gold/10 border border-gold/30 text-gold px-2 py-0.5 rounded text-[0.55rem] uppercase font-semibold">
                    {b.format === "boutique" ? "Store Visit" : "Video Call"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-white font-medium">{b.pieceOfInterest || "General Jewellery Visit"}</div>
                  {b.notes && <div className="text-[0.65rem] text-muted-foreground italic truncate max-w-xs">{b.notes}</div>}
                </td>
                <td className="p-3 text-right space-x-2">
                  <a
                    href={`https://wa.me/91${b.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(b.fullName)},%20confirming%20your%20appointment%20at%20A.P.P.%20Jewellers`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[0.6rem] uppercase tracking-wider text-emerald-400 border border-emerald-500/50 px-2.5 py-1 rounded hover:bg-emerald-500/20"
                  >
                    💬 WhatsApp
                  </a>
                  {b.phone && (
                    <a
                      href={`tel:${b.phone}`}
                      className="inline-block text-[0.6rem] uppercase tracking-wider text-gold border border-gold/50 px-2.5 py-1 rounded hover:bg-gold/20"
                    >
                      📞 Call
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No appointment bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
