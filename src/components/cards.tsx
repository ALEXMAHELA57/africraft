import Link from "next/link";
import { MapPin, Clock, Users, Gavel, Heart } from "lucide-react";
import { Badge, Cover, Rating, usd } from "./ui";
import type { Product } from "@/data/products";
import { DESTINATION_LABELS, type Experience, type Service } from "@/data/tourism";
import type { Article, EventItem } from "@/data/content";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/marketplace/${p.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Cover slug={p.slug} fallback="marketplace" photoFallback={false} className="h-44">
        <div className="absolute left-2 top-2 flex gap-1.5">
          {p.saleType === "auction" && (
            <Badge tone="ink">
              <span className="inline-flex items-center gap-1">
                <Gavel size={11} aria-hidden /> Auction
              </span>
            </Badge>
          )}
          {p.saleType === "quote" && <Badge tone="ink">Request a quote</Badge>}
          {p.community && (
            <Badge tone="leaf">
              <span className="inline-flex items-center gap-1">
                <Heart size={11} aria-hidden /> Community
              </span>
            </Badge>
          )}
        </div>
      </Cover>
      <div className="p-4">
        <h3 className="font-bold leading-snug group-hover:text-brand-dark">{p.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
          <MapPin size={12} aria-hidden /> {p.location} · {p.seller}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold">
            {p.saleType === "auction" && p.auction ? (
              <>
                <span className="text-xs font-semibold text-neutral-500">Current bid </span>
                {usd(p.auction.currentBid)}
              </>
            ) : p.saleType === "quote" ? (
              <>
                <span className="text-xs font-semibold text-neutral-500">From </span>
                {usd(p.price)}
              </>
            ) : (
              usd(p.price)
            )}
          </span>
          <Rating value={p.rating} count={p.reviews} />
        </div>
      </div>
    </Link>
  );
}

export function ExperienceCard({ e }: { e: Experience }) {
  return (
    <Link
      href={`/tourism/experience/${e.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Cover slug={e.slug} fallback={e.destination} className="h-44">
        <div className="absolute left-2 top-2">
          <Badge tone="brand">{DESTINATION_LABELS[e.destination]}</Badge>
        </div>
      </Cover>
      <div className="p-4">
        <h3 className="font-bold leading-snug group-hover:text-brand-dark">{e.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{e.summary}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden /> {e.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} aria-hidden /> {e.groupSize}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold">
            {usd(e.price)} <span className="text-xs font-semibold text-neutral-500">/ person</span>
          </span>
          <Rating value={e.rating} count={e.reviews} />
        </div>
      </div>
    </Link>
  );
}

export function ServiceCard({ s, cta }: { s: Service; cta: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <Cover slug={s.slug} fallback={s.destination} className="h-36" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug">{s.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
          <MapPin size={12} aria-hidden /> {s.location}
        </p>
        <p className="mt-2 text-sm text-neutral-600">{s.summary}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-bold">{s.from}</span>
          <Rating value={s.rating} />
        </div>
        <Link
          href={`/contact?topic=${encodeURIComponent(s.name)}`}
          className="mt-3 rounded-full bg-sun px-4 py-2 text-center text-sm font-semibold text-ink hover:bg-brand"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Cover slug={a.slug} fallback={a.cover} className="h-40" />
      <div className="p-4">
        <p className="text-xs text-neutral-500">
          {a.date} · {a.readMins} min read
        </p>
        <h3 className="mt-1 font-bold leading-snug group-hover:text-brand-dark">{a.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{a.excerpt}</p>
      </div>
    </Link>
  );
}

export function EventCard({ e }: { e: EventItem }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <Cover slug={e.slug} fallback={e.cover} className="h-36" fade />
      <div className="p-4">
        <h3 className="font-bold leading-snug">{e.title}</h3>
        <p className="mt-1 text-xs text-neutral-500">
          {e.place} · {e.when}
        </p>
        <p className="mt-2 text-sm text-neutral-600">{e.summary}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold">{e.price}</span>
          <Link
            href={`/contact?topic=${encodeURIComponent(e.title)}`}
            className="rounded-full bg-sun px-4 py-1.5 text-sm font-semibold text-ink hover:bg-brand"
          >
            Get notified
          </Link>
        </div>
      </div>
    </article>
  );
}
