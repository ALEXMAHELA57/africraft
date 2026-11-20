import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/cards";
import { Container, PageHero, SampleNote } from "@/components/ui";
import { SERVICES, SERVICE_KINDS, type ServiceKind } from "@/data/tourism";

export function generateStaticParams() {
  return (Object.keys(SERVICE_KINDS) as ServiceKind[]).map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  return { title: SERVICE_KINDS[kind as ServiceKind]?.title ?? "Tourism" };
}

export default async function ServiceListPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const info = SERVICE_KINDS[kind as ServiceKind];
  if (!info) notFound();

  const list = SERVICES.filter((s) => s.kind === kind);

  return (
    <>
      <PageHero
        title={info.title}
        blurb={info.blurb}
        crumbs={[{ label: "Tourism", href: "/tourism" }, { label: info.title }]}
      />
      <Container className="space-y-5">
        <SampleNote />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <ServiceCard key={s.slug} s={s} cta={info.cta} />
          ))}
        </div>
      </Container>
    </>
  );
}
