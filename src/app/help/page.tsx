import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <InfoPage
      title="Help"
      intro="Quick answers. Can't find yours? Use the contact page."
      sections={[
        { heading: "How do I book an experience?", body: "Open any experience, choose a date and number of guests, and send a booking request. The provider confirms availability before any payment is taken." },
        { heading: "How do auctions work?", body: "Auction items show the current bid and the time left. You place a bid above the current amount, and the highest bid when the auction ends wins." },
        { heading: "Can items be shipped abroad?", body: "Many sellers ship internationally. Each listing says whether it is available locally, internationally or made to order. Shipping cost and customs rules are shown at checkout." },
        { heading: "I'm a maker or tour provider. How do I join?", body: "Use the Sell with us page. Send a few details about your work and the Africraft team will help you set up your first listings." },
      ]}
    />
  );
}
