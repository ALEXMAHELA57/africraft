import type { Metadata } from "next";
import CartView from "@/components/CartView";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <>
      <PageHero title="Your cart" crumbs={[{ label: "Cart" }]} />
      <Container>
        <CartView />
      </Container>
    </>
  );
}
