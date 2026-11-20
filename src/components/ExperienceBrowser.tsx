"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pills from "./Pills";
import { ExperienceCard } from "./cards";
import { EmptyState } from "./ui";
import { DESTINATION_LABELS, EXPERIENCES, EXPERIENCE_TYPES, type Destination } from "@/data/tourism";

export default function ExperienceBrowser() {
  const sp = useSearchParams();
  const d = sp.get("d");
  const t = sp.get("t");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let r = EXPERIENCES.filter((e) => (!d || e.destination === d) && (!t || e.type === t));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [d, t, sort]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">Destination</p>
          <Pills
            param="d"
            allLabel="Anywhere"
            options={(Object.keys(DESTINATION_LABELS) as Destination[]).map((k) => ({ id: k, label: DESTINATION_LABELS[k] }))}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">Type</p>
          <Pills param="t" allLabel="All types" options={EXPERIENCE_TYPES} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{list.length} experiences</p>
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

      {list.length === 0 ? (
        <EmptyState text="No experiences match those filters yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((e) => (
            <ExperienceCard key={e.slug} e={e} />
          ))}
        </div>
      )}
    </div>
  );
}
