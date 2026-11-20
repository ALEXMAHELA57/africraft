import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/ui";
import { ENTERTAINMENT_TOPICS } from "@/data/content";

const TOPICS = ["films", "artists"] as const;

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  return { title: ENTERTAINMENT_TOPICS[topic]?.title ?? "Entertainment" };
}

export default async function EntertainmentTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!(TOPICS as readonly string[]).includes(topic)) notFound();
  const t = ENTERTAINMENT_TOPICS[topic];

  return (
    <>
      <PageHero
        title={t.title}
        blurb={t.blurb}
        crumbs={[{ label: "Entertainment", href: "/entertainment" }, { label: t.title }]}
      />
      <Container className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.cards.map((c) => (
            <article key={c.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-bold">{c.name}</h2>
              <p className="mt-1 text-sm text-neutral-700">{c.text}</p>
            </article>
          ))}
        </div>
        <div className="rounded-2xl bg-sun/25 p-6">
          <h2 className="text-lg font-bold">Are you an artist or filmmaker?</h2>
          <p className="mt-1 text-sm text-neutral-700">Tell us about your work and we&apos;ll contact you when profiles open.</p>
          <Link href="/sell" className="mt-3 inline-block rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink hover:bg-brand">
            Join Africraft
          </Link>
        </div>
      </Container>
    </>
  );
}
