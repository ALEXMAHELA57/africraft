import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Truck, Heart } from "lucide-react";
import ProductActions from "@/components/ProductActions";
import { ProductCard } from "@/components/cards";
import { Badge, Container, Cover, Rating, usd } from "@/components/ui";
import { CATEGORIES, PRODUCTS, getProduct } from "@/data/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getProduct(slug)?.name ?? "Product" };
}

const AVAIL: Record<string, string> = {
  local: "Available in Tanzania",
  international: "Ships internationally",
  "made-to-order": "Made to order",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label;

  return (
    <Container className="space-y-10">
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <Link href="/marketplace" className="hover:text-ink">
          Marketplace
        </Link>{" "}
        / <Link href={`/marketplace?c=${p.category}`} className="hover:text-ink">{catLabel}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <Cover slug={p.slug} fallback="marketplace" photoFallback={false} className="h-72 overflow-hidden rounded-2xl sm:h-96" />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {p.community && (
              <Badge tone="leaf">
                <span className="inline-flex items-center gap-1">
                  <Heart size={11} aria-hidden /> Supports a community
                </span>
              </Badge>
            )}
            {p.availability.map((a) => (
              <Badge key={a}>{AVAIL[a]}</Badge>
            ))}
          </div>
          <h1 className="font-display text-3xl font-extrabold">{p.name}</h1>
          <p className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <Rating value={p.rating} count={p.reviews} />
            <span className="flex items-center gap-1">
              <MapPin size={14} aria-hidden /> {p.location}
            </span>
            <span>Sold by {p.seller}</span>
          </p>
          {p.saleType === "buy" && <p className="text-3xl font-extrabold">{usd(p.price)}</p>}
          {p.saleType === "quote" && (
            <p className="text-3xl font-extrabold">
              <span className="text-base font-semibold text-neutral-500">From </span>
              {usd(p.price)}
              <span className="text-base font-semibold text-neutral-500"> / yard</span>
            </p>
          )}
          <p className="text-neutral-700">{p.description}</p>
          <ProductActions p={p} />
          <ul className="space-y-1 border-t border-black/10 pt-4 text-sm text-neutral-700">
            {p.details.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
          <p className="flex items-start gap-2 rounded-xl bg-sand p-3 text-xs text-neutral-600">
            <Truck size={16} className="mt-0.5 shrink-0" aria-hidden />
            Shipping cost and delivery time are confirmed at checkout. International delivery depends on your country&apos;s
            customs rules.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">More in {catLabel}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
