import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Languages, Users } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { ExperienceCard } from "@/components/cards";
import { Badge, Container, Cover, Rating } from "@/components/ui";
import { DESTINATION_LABELS, EXPERIENCES, getExperience } from "@/data/tourism";

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getExperience(slug)?.title ?? "Experience" };
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();

  const more = EXPERIENCES.filter((x) => x.destination === e.destination && x.slug !== e.slug).slice(0, 4);

  return (
    <Container className="space-y-10">
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <Link href="/tourism" className="hover:text-ink">
          Tourism
        </Link>{" "}
        / <Link href={`/tourism?d=${e.destination}`} className="hover:text-ink">{DESTINATION_LABELS[e.destination]}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Cover slug={e.slug} fallback={e.destination} className="h-64 overflow-hidden rounded-2xl sm:h-96" />
          <div className="space-y-3">
            <Badge tone="brand">{DESTINATION_LABELS[e.destination]}</Badge>
            <h1 className="font-display text-3xl font-extrabold">{e.title}</h1>
            <p className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <Rating value={e.rating} count={e.reviews} />
              <span className="flex items-center gap-1">
                <Clock size={14} aria-hidden /> {e.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} aria-hidden /> {e.groupSize}
              </span>
              <span className="flex items-center gap-1">
                <Languages size={14} aria-hidden /> {e.languages.join(", ")}
              </span>
            </p>
            <p className="text-neutral-700">{e.summary}</p>
            <p className="text-sm text-neutral-500">Hosted by {e.provider}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="mb-2 text-lg font-bold">Highlights</h2>
              <ul className="space-y-1.5 text-sm">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden /> {h}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="mb-2 text-lg font-bold">What&apos;s included</h2>
              <ul className="space-y-1.5 text-sm">
                {e.includes.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden /> {h}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookingForm e={e} />
        </div>
      </div>

      {more.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">More in {DESTINATION_LABELS[e.destination]}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m) => (
              <ExperienceCard key={m.slug} e={m} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
