"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Pills from "./Pills";
import { ProductCard } from "./cards";
import { EmptyState } from "./ui";
import { CATEGORIES, PRODUCTS, type SaleType } from "@/data/products";

const TYPES: { id: SaleType | "all"; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "buy", label: "Buy now" },
  { id: "auction", label: "Auctions" },
  { id: "quote", label: "Request a quote" },
];

export default function MarketplaceBrowser() {
  const sp = useSearchParams();
  const c = sp.get("c");
  const [q, setQ] = useState("");
  const [type, setType] = useState<SaleType | "all">("all");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let r = PRODUCTS.filter((p) => {
      if (c === "community") {
        if (!p.community) return false;
      } else if (c && p.category !== c) return false;
      if (type !== "all" && p.saleType !== type) return false;
      if (q.trim()) {
        const t = `${p.name} ${p.seller} ${p.location} ${p.category}`.toLowerCase();
        if (!t.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [c, q, type, sort]);

  return (
    <div className="space-y-5">
      <Pills
        param="c"
        allLabel="All products"
        options={[...CATEGORIES.map((x) => ({ id: x.id, label: x.label })), { id: "community", label: "Support local communities" }]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-black/10">
          <Search size={16} className="text-neutral-400" aria-hidden />
          <span className="sr-only">Search products</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, sellers, places"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <select
          aria-label="Sale type"
          value={type}
          onChange={(e) => setType(e.target.value as SaleType | "all")}
          className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/10"
        >
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/10"
        >
          <option value="featured">Featured</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <p className="text-sm text-neutral-500">{list.length} products</p>
      {list.length === 0 ? (
        <EmptyState text="No products match. Try a different category or search." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
