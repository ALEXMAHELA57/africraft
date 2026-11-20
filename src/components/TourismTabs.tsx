"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Experiences", href: "/tourism" },
  { label: "Accommodation", href: "/tourism/accommodation" },
  { label: "Transport", href: "/tourism/transport" },
  { label: "Tour operators", href: "/tourism/operators" },
  { label: "Local guides", href: "/tourism/guides" },
];

export default function TourismTabs() {
  const path = usePathname();
  return (
    <nav aria-label="Tourism sections" className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
        {TABS.map((t) => {
          const on = t.href === "/tourism" ? path === "/tourism" || path.startsWith("/tourism/experience") : path === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={on ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${
                on ? "border-brand text-ink" : "border-transparent text-neutral-500 hover:text-ink"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
