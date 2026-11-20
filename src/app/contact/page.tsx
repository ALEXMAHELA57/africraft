import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/SimpleForms";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" blurb="Questions about a booking, an order or joining Africraft?" crumbs={[{ label: "Contact" }]} />
      <Container className="max-w-2xl">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </Container>
    </>
  );
}
