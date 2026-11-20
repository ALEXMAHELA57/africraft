import Link from "next/link";
import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { COMMUNITIES, CULTURE_TOPICS } from "@/data/content";

export const metadata: Metadata = { title: "Culture & Heritage" };

export default function CulturePage() {
  return (
    <>
      <PageHero
        title="Culture & Heritage"
        blurb="A growing library of traditions, music, food and stories, shaped by the communities themselves."
        crumbs={[{ label: "Culture" }]}
      />
      <Container className="space-y-10">
        <section>
          <h2 className="mb-4 text-xl font-bold">Explore by topic</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(CULTURE_TOPICS).map(([id, t]) => (
              <Link
                key={id}
                href={`/culture/${id}`}
                className="rounded-2xl bg-gradient-to-br from-amber-100 to-sun/40 p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="mt-1 text-sm text-neutral-700">{t.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-1 text-xl font-bold">Communities of Tanzania</h2>
          <p className="mb-4 text-sm text-neutral-600">
            Short introductions. Each community will have its own page, written and approved with that community.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITIES.map((c) => (
              <article key={c.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="text-xs font-semibold text-brand-dark">{c.region}</p>
                <p className="mt-2 text-sm text-neutral-700">{c.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-leaf p-6 text-white">
          <h2 className="text-xl font-bold">Culture belongs to its people</h2>
          <p className="mt-2 max-w-3xl text-white/85">
            Africraft&apos;s rule: communities decide how their heritage is shown, and they are paid fairly whenever their
            content or experiences earn money.
          </p>
        </section>
      </Container>
    </>
  );
}
