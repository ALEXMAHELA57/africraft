"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavItem } from "@/lib/site";

/** Mobile menu. Closes after you pick a page, when you tap outside it, or press Escape. */
export default function MobileMenu({ items }: { items: NavItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  const close = () => ref.current?.removeAttribute("open");

  // close whenever the page changes
  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="group relative xl:hidden">
      <summary
        aria-label="Menu"
        className="list-none rounded-full p-2 hover:bg-sand [&::-webkit-details-marker]:hidden"
      >
        <Menu size={22} />
      </summary>
      <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-sand"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
