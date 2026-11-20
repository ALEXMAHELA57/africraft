import { Container, PageHero } from "./ui";

export default function InfoPage({
  title,
  intro,
  sections,
  note,
}: {
  title: string;
  intro?: string;
  sections: { heading: string; body: string }[];
  note?: string;
}) {
  return (
    <>
      <PageHero title={title} blurb={intro} crumbs={[{ label: title }]} />
      <Container className="max-w-3xl space-y-6">
        {note && <p className="rounded-xl bg-sun/25 px-4 py-3 text-sm">{note}</p>}
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-bold">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-neutral-700">{s.body}</p>
          </section>
        ))}
      </Container>
    </>
  );
}
