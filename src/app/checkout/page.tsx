import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHero title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <Container>
        <CheckoutView />
      </Container>
    </>
  );
}
