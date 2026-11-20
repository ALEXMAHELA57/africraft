"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { EmptyState, usd } from "./ui";
import { placeOrder } from "@/lib/api";
import { backendReady } from "@/lib/supabase";

const field = "w-full rounded-lg px-3 py-2.5 ring-1 ring-black/15";

export default function CheckoutView() {
  const { items, total, clear } = useCart();
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (done)
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl bg-leaf/10 p-8 text-center">
        <h2 className="text-2xl font-bold text-leaf">{backendReady ? "Order received" : "Order received (demo)"}</h2>
        <p className="text-sm text-neutral-700">
          Reference <strong>{done}</strong>.{" "}
          {backendReady
            ? "No payment has been taken. The seller will contact you by phone or email to confirm payment and delivery."
            : "This is a design preview: nothing was saved and no payment was taken."}
        </p>
        <Link href="/marketplace" className="inline-block rounded-full bg-sun px-6 py-2.5 font-semibold text-ink hover:bg-brand">
          Continue shopping
        </Link>
      </div>
    );

  if (items.length === 0) return <EmptyState text="Your cart is empty, so there is nothing to check out." />;

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_340px]"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        const f = new FormData(e.currentTarget);
        const get = (k: string) => String(f.get(k) ?? "").trim();
        const res = await placeOrder(
          {
            name: get("name"),
            email: get("email"),
            phone: get("phone"),
            country: get("country"),
            city: get("city"),
            address: get("address"),
            payment: get("pay"),
          },
          items.map((i) => ({ slug: i.slug, qty: i.qty })),
        );
        setBusy(false);
        if (!res.ok) return setError(res.message);
        clear();
        setDone(res.ref ?? "");
      }}
    >
      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Contact</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required name="name" placeholder="Full name" autoComplete="name" className={field} />
            <input required name="phone" placeholder="Phone (for delivery updates)" autoComplete="tel" className={field} />
            <input required type="email" name="email" placeholder="Email" autoComplete="email" className={`${field} sm:col-span-2`} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">Delivery address</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required name="country" placeholder="Country" autoComplete="country-name" className={field} />
            <input required name="city" placeholder="City / town" autoComplete="address-level2" className={field} />
            <input required name="address" placeholder="Street address or pickup point" autoComplete="street-address" className={`${field} sm:col-span-2`} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">Preferred payment method</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Mobile money", "Card", "Pay on delivery"].map((m, i) => (
              <label key={m} className="flex items-center gap-2 rounded-xl p-3 text-sm ring-1 ring-black/15 has-[:checked]:bg-sun/30 has-[:checked]:ring-brand">
                <input type="radio" name="pay" value={m} defaultChecked={i === 0} />
                {m}
              </label>
            ))}
          </div>
          <p className="text-xs text-neutral-500">
            Online payment is not connected yet. Nothing is charged now; the seller confirms payment with you.
          </p>
        </section>
      </div>

      <aside className="h-fit space-y-3 rounded-2xl bg-sand p-5">
        <h2 className="text-lg font-bold">Your order</h2>
        <ul className="space-y-1 text-sm">
          {items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-2">
              <span>
                {i.name} × {i.qty}
              </span>
              <span>{usd(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="flex justify-between border-t border-black/10 pt-3 font-bold">
          <span>Subtotal</span>
          <span>{usd(total)}</span>
        </p>
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button disabled={busy} className="w-full rounded-full bg-sun py-3 font-bold text-ink hover:bg-brand disabled:opacity-60">
          {busy ? "Placing order…" : "Place order"}
        </button>
      </aside>
    </form>
  );
}
