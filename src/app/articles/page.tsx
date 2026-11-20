import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/ContentBrowsers";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Articles" };

export default function ArticlesPage() {
  return (
    <>
      <PageHero title="Articles" blurb="Destination guides, history and stories about Africa." crumbs={[{ label: "Articles" }]} />
      <Container>
        <Suspense fallback={<p className="py-10 text-center text-neutral-500">Loading articles…</p>}>
          <ArticleBrowser />
        </Suspense>
      </Container>
    </>
  );
}
