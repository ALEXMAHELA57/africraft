import Link from "next/link";
import { Star } from "lucide-react";
import { cover } from "@/lib/site";

export const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** Image block: own photo if present, else a shared illustration, with a bottom fade. */
export function Cover({
  slug,
  fallback,
  className = "h-44",
  fade = false,
  photoFallback = true,
  children,
}: {
  slug: string;
  fallback: string;
  className?: string;
  fade?: boolean;
  /** false = never borrow the shared photo for this topic (used for products) */
  photoFallback?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label=""
      className={`relative bg-cover bg-center ${className}`}
      style={{
        backgroundImage: fade
          ? `linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0) 60%), ${cover(slug, fallback, photoFallback)}`
          : cover(slug, fallback, photoFallback),
      }}
    >
      {children}
    </div>
  );
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
      <Star size={13} className="fill-sun text-sun" aria-hidden />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}

export function Badge({ children, tone = "sand" }: { children: React.ReactNode; tone?: "sand" | "leaf" | "brand" | "ink" }) {
  const tones = {
    sand: "bg-sand text-ink",
    leaf: "bg-leaf text-white",
    brand: "bg-brand text-white",
    ink: "bg-ink/80 text-white",
  } as const;
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

export function PageHero({
  title,
  blurb,
  crumbs,
}: {
  title: string;
  blurb?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-gradient-to-r from-amber-950 via-ink to-amber-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {blurb && <p className="mt-2 max-w-2xl text-white/75">{blurb}</p>}
      </div>
    </section>
  );
}

export function SampleNote() {
  return (
    <p className="rounded-xl bg-sun/25 px-4 py-2.5 text-sm text-ink">
      <strong>Sample listings.</strong> Names, prices and sellers shown here are examples for the design preview, not
      real businesses.
    </p>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 py-8 ${className}`}>{children}</div>;
}

export function EmptyState({ text }: { text: string }) {
  return <p className="rounded-xl bg-sand px-4 py-10 text-center text-neutral-600">{text}</p>;
}
