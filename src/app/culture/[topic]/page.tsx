import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/ui";
import { CULTURE_TOPICS } from "@/data/content";

export function generateStaticParams() {
  return Object.keys(CULTURE_TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  return { title: CULTURE_TOPICS[topic]?.title ?? "Culture" };
}

export default async function CultureTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = CULTURE_TOPICS[topic];
  if (!t) notFound();

  return (
    <>
      <PageHero title={t.title} blurb={t.blurb} crumbs={[{ label: "Culture", href: "/culture" }, { label: t.title }]} />
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((i) => (
            <li key={i.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-bold">{i.name}</h2>
              <p className="mt-1 text-sm text-neutral-700">{i.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
