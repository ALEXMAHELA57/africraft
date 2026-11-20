import type { Metadata } from "next";
import { PartnerForm } from "@/components/SimpleForms";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Sell or list with Africraft" };

const POINTS = [
  { t: "Reach visitors before they arrive", d: "Show your products, tours or stay to people who are planning their trip." },
  { t: "We help you get started", d: "Send us your photos and prices and our team can set up your first listings." },
  { t: "Fair, simple fees", d: "You only pay a commission when you make a sale or a confirmed booking." },
];

export default function SellPage() {
  return (
    <>
      <PageHero
        title="Sell or list with Africraft"
        blurb="Artisans, guides, hotels, operators and artists: tell us about your work."
        crumbs={[{ label: "Sell with us" }]}
      />
      <Container className="space-y-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.t} className="rounded-2xl bg-sand p-5">
              <h2 className="font-bold">{p.t}</h2>
              <p className="mt-1 text-sm text-neutral-700">{p.d}</p>
            </div>
          ))}
        </div>
        <section className="max-w-3xl">
          <h2 className="mb-4 text-xl font-bold">Apply to join</h2>
          <PartnerForm />
        </section>
      </Container>
    </>
  );
}
