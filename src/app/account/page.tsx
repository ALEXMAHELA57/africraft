import type { Metadata } from "next";
import AccountView from "@/components/AccountView";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <>
      <PageHero title="Your account" crumbs={[{ label: "Account" }]} />
      <Container>
        <AccountView />
      </Container>
    </>
  );
}
