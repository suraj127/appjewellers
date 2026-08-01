import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { bookAppointment } from "@/lib/appointments.functions";
import { appointmentSchema } from "@/lib/appointment-schema";
import { BOUTIQUES, TIME_SLOTS } from "@/data/products";

const fieldClass =
  "mt-2 w-full rounded-sm border border-border bg-transparent px-4 py-3 text-sm font-light text-foreground outline-none transition-colors duration-500 placeholder:text-muted-foreground/70 focus:border-gold/70";
const labelClass = "text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function AppointmentForm({ piece }: { piece?: string }) {
  const submit = useServerFn(bookAppointment);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const [format, setFormat] = useState<"boutique" | "video">("boutique");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = appointmentSchema.safeParse({
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      boutique: String(fd.get("boutique") ?? ""),
      preferredDate: String(fd.get("preferredDate") ?? ""),
      preferredTime: String(fd.get("preferredTime") ?? ""),
      format,
      pieceOfInterest: String(fd.get("pieceOfInterest") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }

    setPending(true);
    try {
      const res = await submit({ data: parsed.data });
      setDone({ reference: res.id.slice(0, 8).toUpperCase() });
      toast.success(
        res.emailed
          ? "Your private viewing is reserved — a confirmation is on its way."
          : "Your private viewing is reserved. A client advisor will confirm shortly.",
      );
    } catch {
      toast.error("We could not record your request. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="glass-panel rounded-sm p-10 text-center">
        <p className="eyebrow">Reserved</p>
        <h3 className="mt-5 font-display text-3xl">
          Your salon is <span className="italic shimmer-text">held</span>
        </h3>
        <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
          Reference {done.reference}. A confirmation for your private viewing has been
          issued to your email, and a client advisor will call to finalise the hour.
        </p>
        <button
          type="button"
          onClick={() => setDone(null)}
          className="mt-8 text-[0.62rem] uppercase tracking-[0.3em] text-gold underline-offset-8 hover:underline"
        >
          Book another viewing
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-sm p-8 text-left sm:p-10">
      <div className="flex gap-2">
        {(
          [
            ["boutique", "In boutique"],
            ["video", "Video consultation"],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setFormat(v)}
            className={`flex-1 rounded-sm border px-4 py-3 text-[0.6rem] uppercase tracking-[0.28em] transition-colors duration-500 ${
              format === v
                ? "border-gold/70 text-gold"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full name
          </label>
          <input id="fullName" name="fullName" required maxLength={100} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Telephone (optional)
          </label>
          <input id="phone" name="phone" maxLength={30} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="boutique">
            Preferred boutique
          </label>
          <select id="boutique" name="boutique" required className={fieldClass}>
            {BOUTIQUES.map((b) => (
              <option key={b} value={b} className="bg-background">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="preferredDate">
            Preferred date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={today()}
            defaultValue={today()}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="preferredTime">
            Preferred time
          </label>
          <select id="preferredTime" name="preferredTime" required className={fieldClass}>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t} className="bg-background">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="pieceOfInterest">
            Piece of interest (optional)
          </label>
          <input
            id="pieceOfInterest"
            name="pieceOfInterest"
            defaultValue={piece ?? ""}
            maxLength={120}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="notes">
            Notes for your advisor (optional)
          </label>
          <textarea id="notes" name="notes" rows={4} maxLength={800} className={fieldClass} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="shine-sweep mt-10 w-full rounded-sm bg-gold px-10 py-4 text-[0.65rem] uppercase tracking-[0.32em] text-primary-foreground transition-opacity duration-500 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Reserving…" : "Reserve private viewing"}
      </button>
      <p className="mt-5 text-center text-[0.58rem] uppercase tracking-[0.26em] text-muted-foreground">
        Confirmation issued by email · Discretion assured
      </p>
    </form>
  );
}
