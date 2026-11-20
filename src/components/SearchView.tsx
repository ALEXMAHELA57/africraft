"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ArticleCard, ExperienceCard, ProductCard } from "./cards";
import { EmptyState } from "./ui";
import { PRODUCTS } from "@/data/products";
import { EXPERIENCES } from "@/data/tourism";
import { ARTICLES } from "@/data/content";

export default function SearchView() {
  const initial = useSearchParams().get("q") ?? "";
  const [q, setQ] = useState(initial);
  const term = q.trim().toLowerCase();

  const has = (s: string) => s.toLowerCase().includes(term);
  const products = term ? PRODUCTS.filter((p) => has(`${p.name} ${p.seller} ${p.location} ${p.category} ${p.description}`)) : [];
  const experiences = term ? EXPERIENCES.filter((e) => has(`${e.title} ${e.destination} ${e.type} ${e.summary} ${e.provider}`)) : [];
  const articles = term ? ARTICLES.filter((a) => has(`${a.title} ${a.excerpt} ${a.category}`)) : [];
  const total = products.length + experiences.length + articles.length;

  return (
    <div className="space-y-8">
      <label className="flex max-w-2xl items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-black/10">
        <Search size={18} className="text-neutral-400" aria-hidden />
        <span className="sr-only">Search Africraft</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, experiences, articles…"
          className="w-full bg-transparent outline-none"
        />
      </label>

      {!term ? (
        <EmptyState text="Type something to search products, experiences and articles." />
      ) : total === 0 ? (
        <EmptyState text={`Nothing found for "${q}". Try another word, like "basket", "safari" or "Zanzibar".`} />
      ) : (
        <>
          {products.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-bold">Products ({products.length})</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          )}
          {experiences.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-bold">Experiences ({experiences.length})</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {experiences.map((e) => (
                  <ExperienceCard key={e.slug} e={e} />
                ))}
              </div>
            </section>
          )}
          {articles.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-bold">Articles ({articles.length})</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <ArticleCard key={a.slug} a={a} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
