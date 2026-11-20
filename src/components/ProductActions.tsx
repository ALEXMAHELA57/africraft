"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "./CartProvider";
import { usd } from "./ui";
import { getAuction, placeBid, requestQuote } from "@/lib/api";
import type { Product } from "@/data/products";

export default function ProductActions({ p }: { p: Product }) {
  if (p.saleType === "auction" && p.auction) return <BidBox p={p} />;
  if (p.saleType === "quote") return <QuoteBox p={p} />;
  return <BuyBox p={p} />;
}

function BuyBox({ p }: { p: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="qty" className="text-sm font-semibold">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={20}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
          className="w-20 rounded-lg px-3 py-2 ring-1 ring-black/15"
        />
      </div>
      <button
        onClick={() => {
          add({ slug: p.slug, name: p.name, price: p.price, seller: p.seller }, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 2500);
        }}
        className="w-full rounded-full bg-sun py-3 font-bold text-ink hover:bg-brand sm:w-auto sm:px-10"
      >
        Add to cart · {usd(p.price * qty)}
      </button>
      {added && (
        <p role="status" className="flex items-center gap-2 text-sm text-leaf">
          <Check size={16} aria-hidden /> Added.{" "}
          <Link href="/cart" className="font-semibold underline">
            View cart
          </Link>
        </p>
      )}
    </div>
  );
}

function BidBox({ p }: { p: Product }) {
  const a = p.auction!;
  // Start from the sample numbers, then replace with live numbers if the database is connected.
  const [current, setCurrent] = useState(a.currentBid);
  const [bids, setBids] = useState(a.bids);
  const [ends, setEnds] = useState(a.endsIn);
  const min = current + 5;
  const [bid, setBid] = useState(String(min));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    getAuction(p.slug).then((live) => {
      if (!live) return;
      setCurrent(live.currentBid);
      setBids(live.bids);
      setBid(String(live.currentBid + 5));
      const ms = new Date(live.endsAt).getTime() - Date.now();
      const days = Math.floor(ms / 864e5);
      const hours = Math.floor((ms % 864e5) / 36e5);
      setEnds(ms <= 0 ? "Ended" : `${days} days ${hours} hours`);
    });
  }, [p.slug]);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const n = Number(bid);
        if (!Number.isFinite(n) || n < min) return setMsg({ ok: false, text: `Your bid must be at least ${usd(min)}.` });
        setBusy(true);
        const res = await placeBid(p.slug, n);
        setBusy(false);
        if (res.ok) {
          const live = await getAuction(p.slug);
          if (live) {
            setCurrent(live.currentBid);
            setBids(live.bids);
            setBid(String(live.currentBid + 5));
          }
        }
        setMsg({ ok: res.ok, text: res.message });
      }}
    >
      <div className="rounded-xl bg-sand p-4 text-sm">
        <p>
          Current bid: <strong className="text-lg">{usd(current)}</strong> · {bids} bids
        </p>
        <p className="text-neutral-600">Ends in {ends}</p>
      </div>
      <div className="flex gap-2">
        <label htmlFor="bid" className="sr-only">
          Your bid in US dollars
        </label>
        <input
          id="bid"
          inputMode="numeric"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          className="w-32 rounded-lg px-3 py-2 ring-1 ring-black/15"
        />
        <button disabled={busy} className="rounded-full bg-sun px-8 py-2.5 font-bold text-ink hover:bg-brand disabled:opacity-60">
          {busy ? "Bidding…" : "Place bid"}
        </button>
      </div>
      <p className="text-xs text-neutral-500">
        You need to be <Link href="/login" className="underline">logged in</Link> to bid.
      </p>
      {msg && (
        <p role="status" className={`text-sm ${msg.ok ? "text-leaf" : "text-red-700"}`}>
          {msg.text}
        </p>
      )}
    </form>
  );
}

function QuoteBox({ p }: { p: Product }) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  if (msg?.ok)
    return (
      <p role="status" className="rounded-xl bg-leaf/10 p-4 text-sm text-leaf">
        {msg.text}
      </p>
    );
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const f = new FormData(e.currentTarget);
        const res = await requestQuote({
          slug: p.slug,
          quantity: String(f.get("qty")).trim(),
          email: String(f.get("email")).trim(),
          notes: String(f.get("notes") ?? "").trim(),
        });
        setBusy(false);
        setMsg({ ok: res.ok, text: res.message });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="qty" placeholder="Quantity (e.g. 200 yards)" className="rounded-lg px-3 py-2 ring-1 ring-black/15" />
        <input required type="email" name="email" placeholder="Your email" className="rounded-lg px-3 py-2 ring-1 ring-black/15" />
      </div>
      <textarea name="notes" rows={3} placeholder="Colours, deadlines, delivery country…" className="w-full rounded-lg px-3 py-2 ring-1 ring-black/15" />
      {msg && !msg.ok && (
        <p role="alert" className="text-sm text-red-700">
          {msg.text}
        </p>
      )}
      <button disabled={busy} className="rounded-full bg-sun px-8 py-2.5 font-bold text-ink hover:bg-brand disabled:opacity-60">
        {busy ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
