import { Suspense } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import CartLink from "./CartLink";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { NAV } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20">
        <Logo />

        <Suspense fallback={<div className="hidden h-10 flex-1 xl:block" />}>
          <NavLinks items={NAV} />
        </Suspense>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search" className="rounded-full p-2 hover:bg-sand">
            <Search size={22} />
          </Link>
          <CartLink />

          <MobileMenu items={NAV} />
        </div>
      </div>
    </header>
  );
}
