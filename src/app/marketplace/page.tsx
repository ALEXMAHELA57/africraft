import { Suspense } from "react";
import type { Metadata } from "next";
import MarketplaceBrowser from "@/components/MarketplaceBrowser";
import { Container, PageHero, SampleNote } from "@/components/ui";

export const metadata: Metadata = { title: "Marketplace" };

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        title="Marketplace"
        blurb="Handmade products from African artisans, sold directly by the people who make them."
        crumbs={[{ label: "Marketplace" }]}
      />
      <Container className="space-y-5">
        <SampleNote />
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading products…</p>}>
          <MarketplaceBrowser />
        </Suspense>
      </Container>
    </>
  );
}
