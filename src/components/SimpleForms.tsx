"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { applyPartner, sendContact, subscribe, type Result } from "@/lib/api";

const field = "w-full rounded-lg px-3 py-2.5 ring-1 ring-black/15";

function Done({ text }: { text: string }) {
  return (
    <p role="status" className="rounded-xl bg-leaf/10 p-4 text-sm text-leaf">
      {text}
    </p>
  );
}

function Err({ text }: { text: string }) {
  return (
    <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
      {text}
    </p>
  );
}

const val = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export function ContactForm() {
  const topic = useSearchParams().get("topic") ?? "";
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  if (res?.ok) return <Done text={res.message} />;
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const f = new FormData(e.currentTarget);
        setRes(await sendContact({ name: val(f, "name"), email: val(f, "email"), topic: val(f, "topic"), message: val(f, "message") }));
        setBusy(false);
      }}
    >
      <input required name="name" placeholder="Your name" autoComplete="name" className={field} />
      <input required type="email" name="email" placeholder="Email" autoComplete="email" className={field} />
      <input name="topic" defaultValue={topic} placeholder="Topic (optional)" className={field} />
      <textarea required name="message" rows={5} maxLength={5000} placeholder="How can we help?" className={field} />
      {res && !res.ok && <Err text={res.message} />}
      <button disabled={busy} className="rounded-full bg-sun px-8 py-3 font-bold text-ink hover:bg-brand disabled:opacity-60">
        {busy ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const BUSINESS_TYPES = [
  "Artisan / craft maker",
  "Product seller",
  "Tour operator",
  "Hotel or lodge",
  "Local guide",
  "Transport provider",
  "Musician or artist",
  "Event organiser",
  "Community group or cooperative",
];

export function PartnerForm() {
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  if (res?.ok) return <Done text={res.message} />;
  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const f = new FormData(e.currentTarget);
        setRes(
          await applyPartner({
            business: val(f, "business"),
            contact: val(f, "contact"),
            phone: val(f, "phone"),
            email: val(f, "email"),
            type: val(f, "type"),
            location: val(f, "location"),
            about: val(f, "about"),
          }),
        );
        setBusy(false);
      }}
    >
      <input required name="business" placeholder="Business or group name" className={field} />
      <input required name="contact" placeholder="Your name" autoComplete="name" className={field} />
      <input required type="tel" name="phone" minLength={5} placeholder="Phone / WhatsApp" autoComplete="tel" className={field} />
      <input type="email" name="email" placeholder="Email (optional)" autoComplete="email" className={field} />
      <select name="type" aria-label="What do you offer?" className={field}>
        {BUSINESS_TYPES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <input required name="location" placeholder="Where are you based?" className={field} />
      <textarea name="about" rows={4} placeholder="Tell us what you make or offer" className={`${field} sm:col-span-2`} />
      {res && !res.ok && (
        <div className="sm:col-span-2">
          <Err text={res.message} />
        </div>
      )}
      <button disabled={busy} className="rounded-full bg-sun px-8 py-3 font-bold text-ink hover:bg-brand disabled:opacity-60 sm:col-span-2 sm:w-fit">
        {busy ? "Sending…" : "Apply to join"}
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  if (res?.ok) return <p role="status" className="text-sm text-sun">{res.message}</p>;
  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const f = new FormData(e.currentTarget);
        setRes(await subscribe(val(f, "email")));
        setBusy(false);
      }}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="newsletter" className="sr-only">
          Your email address
        </label>
        <input
          id="newsletter"
          name="email"
          required
          type="email"
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white ring-1 ring-white/15 placeholder:text-white/50 focus:outline-none focus:ring-sun"
        />
        <button disabled={busy} className="rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-ink hover:bg-brand disabled:opacity-60">
          {busy ? "…" : "Subscribe"}
        </button>
      </div>
      {res && !res.ok && <p role="alert" className="text-xs text-red-300">{res.message}</p>}
    </form>
  );
}
