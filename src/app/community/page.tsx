import { Suspense } from "react";
import type { Metadata } from "next";
import { CommunityBrowser } from "@/components/ContentBrowsers";
import { Container, PageHero, SampleNote } from "@/components/ui";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <>
      <PageHero
        title="Community"
        blurb="Ask questions, share recommendations and connect with locals and fellow travellers."
        crumbs={[{ label: "Community" }]}
      />
      <Container className="space-y-5">
        <SampleNote />
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading discussions…</p>}>
          <CommunityBrowser />
        </Suspense>
      </Container>
    </>
  );
}
