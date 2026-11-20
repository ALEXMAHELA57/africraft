import Link from "next/link";
import Logo from "./Logo";
import { NewsletterForm } from "./SimpleForms";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Tourism", href: "/tourism" },
      { label: "Culture", href: "/culture" },
      { label: "Entertainment", href: "/entertainment" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* thin brand accent line */}
      <div
        aria-hidden
        className="h-1.5 bg-[linear-gradient(90deg,#f28c1b_0_25%,#ffc21a_25%_50%,#0f5b3a_50%_75%,#7a2e0e_75%_100%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="min-w-0 max-w-sm">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            A marketplace, culture and tourism platform connecting African makers, guides and communities with the world.
          </p>

          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-sun">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 md:text-left">
          © 2026 Africraft. All rights reserved. Building a more connected and prosperous Africa.
        </p>
      </div>
    </footer>
  );
}
