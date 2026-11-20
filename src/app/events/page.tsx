import { Suspense } from "react";
import type { Metadata } from "next";
import { EventBrowser } from "@/components/ContentBrowsers";
import { Container, PageHero, SampleNote } from "@/components/ui";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events"
        blurb="Festivals, exhibitions and community events across Africa."
        crumbs={[{ label: "Events" }]}
      />
      <Container className="space-y-5">
        <SampleNote />
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading events…</p>}>
          <EventBrowser />
        </Suspense>
      </Container>
    </>
  );
}
