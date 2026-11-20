import Link from "next/link";
import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ENTERTAINMENT_TOPICS } from "@/data/content";

export const metadata: Metadata = { title: "Entertainment" };

export default function EntertainmentPage() {
  const music = ENTERTAINMENT_TOPICS.music;
  return (
    <>
      <PageHero
        title="Entertainment"
        blurb="African music, film and creative arts, with artist profiles and links to official platforms."
        crumbs={[{ label: "Entertainment" }]}
      />
      <Container className="space-y-10">
        <section>
          <h2 className="mb-4 text-xl font-bold">{music.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {music.cards.map((c) => (
              <article key={c.name} className="rounded-2xl bg-gradient-to-br from-indigo-900 to-fuchsia-700 p-5 text-white">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-white/80">{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {(["films", "artists"] as const).map((id) => (
            <Link
              key={id}
              href={`/entertainment/${id}`}
              className="rounded-2xl bg-sand p-6 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-lg font-bold">{ENTERTAINMENT_TOPICS[id].title}</h2>
              <p className="mt-1 text-sm text-neutral-700">{ENTERTAINMENT_TOPICS[id].blurb}</p>
            </Link>
          ))}
        </section>
      </Container>
    </>
  );
}
