"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/** URL-driven filter pills: each pill links to ?<param>=<id>, "All" clears it. */
export default function Pills({
  param,
  options,
  allLabel = "All",
}: {
  param: string;
  options: { id: string; label: string }[];
  allLabel?: string;
}) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const active = sp.get(param);

  const href = (id: string | null) => {
    const next = new URLSearchParams(sp.toString());
    if (id) next.set(param, id);
    else next.delete(param);
    const q = next.toString();
    return q ? `${pathname}?${q}` : pathname;
  };

  const cls = (on: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      on ? "bg-ink text-white" : "bg-sand text-ink hover:bg-sun/60"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <Link href={href(null)} className={cls(!active)} scroll={false}>
        {allLabel}
      </Link>
      {options.map((o) => (
        <Link key={o.id} href={href(o.id)} className={cls(active === o.id)} scroll={false}>
          {o.label}
        </Link>
      ))}
    </div>
  );
}
