import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <InfoPage
      title="About Africraft"
      intro="Discover Africa. Experience Africa. Support Africa."
      sections={[
        {
          heading: "What we are building",
          body: "Africraft connects African makers, guides, hotels and communities with visitors and buyers around the world. People can discover culture, buy handmade products and arrange their trip online before they arrive.",
        },
        {
          heading: "Why it matters",
          body: "Many talented makers and small tourism businesses only sell to people nearby. Africraft helps them reach customers they could not reach alone, and keeps more of the value with the people who create it.",
        },
        {
          heading: "Our principles",
          body: "Authenticity, inclusion, easy use on a mobile phone, global reach, and fair benefit for the communities whose work and culture attract visitors.",
        },
      ]}
    />
  );
}
