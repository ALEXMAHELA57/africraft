"use client";

import { useEffect, useState } from "react";
import { usd } from "./ui";
import { createBooking } from "@/lib/api";
import { backendReady } from "@/lib/supabase";
import type { Experience } from "@/data/tourism";

const field = "w-full rounded-lg px-3 py-2.5 ring-1 ring-black/15";

export default function BookingForm({ e }: { e: Experience }) {
  const [guests, setGuests] = useState(2);
  const [ref, setRef] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const total = guests * e.price;
  // Set in the browser so the minimum date is "today" for the visitor, not the build day.
  const [today, setToday] = useState<string | undefined>(undefined);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  if (ref)
    return (
      <div role="status" className="space-y-2 rounded-2xl bg-leaf/10 p-5 text-sm">
        <p className="text-base font-bold text-leaf">{backendReady ? "Booking request sent" : "Request noted (demo)"}</p>
        <p className="text-neutral-700">
          Reference <strong>{ref}</strong> · {guests} guests · estimated {usd(total)}.{" "}
          {backendReady
            ? `${e.provider} will confirm availability by email before any payment.`
            : "Design preview: nothing was saved yet."}
        </p>
        <button onClick={() => setRef(null)} className="font-semibold underline">
          Make another request
        </button>
      </div>
    );

  return (
    <form
      className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
      onSubmit={async (ev) => {
        ev.preventDefault();
        setBusy(true);
        setError("");
        const f = new FormData(ev.currentTarget);
        const res = await createBooking({
          slug: e.slug,
          date: String(f.get("date")),
          guests,
          name: String(f.get("name")).trim(),
          email: String(f.get("email")).trim(),
          notes: String(f.get("notes") ?? "").trim(),
        });
        setBusy(false);
        if (res.ok) setRef(res.ref ?? "");
        else setError(res.message);
      }}
    >
      <p className="text-2xl font-extrabold">
        {usd(e.price)} <span className="text-sm font-semibold text-neutral-500">/ person</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className="mb-1 block text-xs font-semibold">
            Date
          </label>
          <input id="date" name="date" required type="date" min={today} className={field} />
        </div>
        <div>
          <label htmlFor="guests" className="mb-1 block text-xs font-semibold">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={20}
            value={guests}
            onChange={(ev) => setGuests(Math.max(1, Math.min(20, Number(ev.target.value) || 1)))}
            className={field}
          />
        </div>
      </div>
      <input required name="name" placeholder="Your name" autoComplete="name" className={field} />
      <input required type="email" name="email" placeholder="Email" autoComplete="email" className={field} />
      <textarea name="notes" rows={2} placeholder="Pickup place, dietary needs, questions…" className={field} />
      <p className="flex justify-between border-t border-black/10 pt-3 text-sm">
        <span>Estimated total</span>
        <strong>{usd(total)}</strong>
      </p>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button disabled={busy} className="w-full rounded-full bg-sun py-3 font-bold text-ink hover:bg-brand disabled:opacity-60">
        {busy ? "Sending…" : "Send booking request"}
      </button>
      <p className="text-xs text-neutral-500">You won&apos;t be charged now. The provider confirms availability first.</p>
    </form>
  );
}
