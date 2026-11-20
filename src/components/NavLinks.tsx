"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/site";

export default function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <div key={item.href} className="has-dropdown relative">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                active ? "bg-sun text-ink shadow-sm" : "text-ink hover:bg-sand"
              }`}
            >
              {item.label}
              {item.children && <ChevronDown size={14} aria-hidden />}
            </Link>
            {item.children && (
              <div className="dropdown">
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-sand hover:text-ink"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
