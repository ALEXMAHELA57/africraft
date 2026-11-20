import { Suspense } from "react";
import type { Metadata } from "next";
import SearchView from "@/components/SearchView";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <>
      <PageHero title="Search" crumbs={[{ label: "Search" }]} />
      <Container>
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading…</p>}>
          <SearchView />
        </Suspense>
      </Container>
    </>
  );
}
