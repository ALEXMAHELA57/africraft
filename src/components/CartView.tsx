"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { EmptyState, usd } from "./ui";

export default function CartView() {
  const { items, total, setQty, remove } = useCart();

  if (items.length === 0)
    return (
      <div className="space-y-4 text-center">
        <EmptyState text="Your cart is empty." />
        <Link href="/marketplace" className="inline-block rounded-full bg-sun px-6 py-2.5 font-semibold text-ink hover:bg-brand">
          Browse the marketplace
        </Link>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5">
        {items.map((i) => (
          <li key={i.slug} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <Link href={`/marketplace/${i.slug}`} className="font-bold hover:text-brand-dark">
                {i.name}
              </Link>
              <p className="text-xs text-neutral-500">Sold by {i.seller}</p>
            </div>
            <div className="flex items-center gap-1">
              <button aria-label="Decrease quantity" onClick={() => setQty(i.slug, i.qty - 1)} className="rounded-full p-1.5 ring-1 ring-black/15">
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                {i.qty}
              </span>
              <button aria-label="Increase quantity" onClick={() => setQty(i.slug, i.qty + 1)} className="rounded-full p-1.5 ring-1 ring-black/15">
                <Plus size={14} />
              </button>
            </div>
            <p className="w-20 text-right font-bold">{usd(i.price * i.qty)}</p>
            <button aria-label={`Remove ${i.name}`} onClick={() => remove(i.slug)} className="rounded-full p-2 text-neutral-500 hover:bg-sand hover:text-red-700">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-3 rounded-2xl bg-sand p-5">
        <h2 className="text-lg font-bold">Order summary</h2>
        <p className="flex justify-between text-sm">
          <span>Subtotal</span>
          <strong>{usd(total)}</strong>
        </p>
        <p className="text-xs text-neutral-600">Shipping is calculated at checkout.</p>
        <Link href="/checkout" className="block rounded-full bg-sun py-3 text-center font-bold text-ink hover:bg-brand">
          Checkout
        </Link>
      </aside>
    </div>
  );
}
