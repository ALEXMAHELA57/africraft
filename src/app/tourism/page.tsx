import { Suspense } from "react";
import type { Metadata } from "next";
import ExperienceBrowser from "@/components/ExperienceBrowser";
import { Container, PageHero, SampleNote } from "@/components/ui";

export const metadata: Metadata = { title: "Tourism & Experiences" };

export default function TourismPage() {
  return (
    <>
      <PageHero
        title="Tourism & Experiences"
        blurb="Book real local experiences, guides, stays and transport before you arrive."
        crumbs={[{ label: "Tourism" }]}
      />
      <Container className="space-y-5">
        <SampleNote />
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading experiences…</p>}>
          <ExperienceBrowser />
        </Suspense>
      </Container>
    </>
  );
}
