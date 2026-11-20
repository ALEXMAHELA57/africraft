import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & Conditions"
      note="Draft placeholder text. Have a lawyer review and complete the terms before the site goes live."
      sections={[
        { heading: "Using Africraft", body: "Africraft is a platform that connects buyers, visitors and providers. Sellers and providers are responsible for their listings, products and services." },
        { heading: "Orders and bookings", body: "Orders and bookings are agreements between the buyer and the seller or provider. Prices, availability, cancellation and refund rules will be shown on each listing." },
        { heading: "Content and culture", body: "Content about communities and cultural heritage is published with the involvement and consent of the people concerned." },
        { heading: "Changes", body: "We may update these terms as the platform grows. The date of the latest version will be shown here." },
      ]}
    />
  );
}
