import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      note="Draft placeholder text. Have a lawyer review and complete the policy, including how data is stored, before launch."
      sections={[
        { heading: "What we collect", body: "Details you give us, such as your name, contact details, orders and booking requests." },
        { heading: "How we use it", body: "To run your orders and bookings, contact you about them, and improve the platform. We do not sell your personal data." },
        { heading: "Your choices", body: "You can ask us to see, correct or delete your data by using the contact page." },
      ]}
    />
  );
}
