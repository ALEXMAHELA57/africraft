export type Destination = "zanzibar" | "arusha" | "serengeti" | "dar-es-salaam" | "kilimanjaro";
export type ExperienceType = "safari" | "cultural" | "boat" | "hiking" | "workshop" | "food";

export const DESTINATION_LABELS: Record<Destination, string> = {
  zanzibar: "Zanzibar",
  arusha: "Arusha",
  serengeti: "Serengeti",
  "dar-es-salaam": "Dar es Salaam",
  kilimanjaro: "Kilimanjaro",
};

export const EXPERIENCE_TYPES: { id: ExperienceType; label: string }[] = [
  { id: "safari", label: "Safaris" },
  { id: "cultural", label: "Cultural visits" },
  { id: "boat", label: "Boat trips" },
  { id: "hiking", label: "Hiking" },
  { id: "workshop", label: "Workshops" },
  { id: "food", label: "Food & cooking" },
];

export type Experience = {
  slug: string;
  title: string;
  destination: Destination;
  type: ExperienceType;
  duration: string;
  /** USD per person */
  price: number;
  groupSize: string;
  languages: string[];
  rating: number;
  reviews: number;
  provider: string;
  summary: string;
  highlights: string[];
  includes: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "stone-town-spice-walk",
    title: "Stone Town heritage and spice walk",
    destination: "zanzibar",
    type: "cultural",
    duration: "3 hours",
    price: 35,
    groupSize: "Up to 10",
    languages: ["English", "Swahili"],
    rating: 4.8,
    reviews: 212,
    provider: "Sample Island Guides",
    summary: "Wander the old town's narrow streets with a local guide, then taste spices and fruit at a small market stop.",
    highlights: ["Old town streets and doors", "Local market tasting", "Stories from a local guide"],
    includes: ["Local guide", "Tastings", "Bottled water"],
  },
  {
    slug: "dhow-sunset-cruise",
    title: "Traditional dhow sunset cruise",
    destination: "zanzibar",
    type: "boat",
    duration: "2.5 hours",
    price: 40,
    groupSize: "Up to 14",
    languages: ["English", "Swahili", "Italian"],
    rating: 4.7,
    reviews: 158,
    provider: "Sample Dhow Co.",
    summary: "Sail on a wooden dhow at golden hour with music, snacks and swimming stops.",
    highlights: ["Sunset on the water", "Live music", "Swim stop"],
    includes: ["Snacks and drinks", "Life jackets", "Hotel pickup (Stone Town area)"],
  },
  {
    slug: "boma-visit-bush-walk",
    title: "Village boma visit and bush walk",
    destination: "arusha",
    type: "cultural",
    duration: "4 hours",
    price: 45,
    groupSize: "Up to 8",
    languages: ["English", "Swahili"],
    rating: 4.9,
    reviews: 97,
    provider: "Sample Community Tours",
    summary: "A community-hosted visit with a guided walk and an introduction to everyday life and crafts. Part of the fee goes directly to the host community.",
    highlights: ["Hosted by the community", "Craft demonstration", "Guided bush walk"],
    includes: ["Community host fee", "Guide", "Refreshments"],
  },
  {
    slug: "serengeti-3-day-safari",
    title: "Serengeti 3-day camping safari",
    destination: "serengeti",
    type: "safari",
    duration: "3 days",
    price: 520,
    groupSize: "Up to 6",
    languages: ["English", "Swahili", "German"],
    rating: 4.9,
    reviews: 64,
    provider: "Sample Safari Company",
    summary: "Game drives with an experienced driver-guide, with nights in a tented camp. Park fees are included.",
    highlights: ["Morning and evening game drives", "Tented camp", "Experienced driver-guide"],
    includes: ["Park fees", "Meals", "Camping gear", "4x4 vehicle"],
  },
  {
    slug: "ngorongoro-2-day-safari",
    title: "Lake Manyara and Ngorongoro 2-day safari",
    destination: "arusha",
    type: "safari",
    duration: "2 days",
    price: 340,
    groupSize: "Up to 6",
    languages: ["English", "Swahili"],
    rating: 4.8,
    reviews: 121,
    provider: "Sample Safari Company",
    summary: "A short safari from Arusha covering a lakeside park and the famous crater.",
    highlights: ["Crater game drive", "Lakeside park", "Overnight lodge"],
    includes: ["Park fees", "Lodge stay", "Meals", "Driver-guide"],
  },
  {
    slug: "kilimanjaro-foothills-hike",
    title: "Kilimanjaro foothills day hike",
    destination: "kilimanjaro",
    type: "hiking",
    duration: "6 hours",
    price: 60,
    groupSize: "Up to 8",
    languages: ["English", "Swahili"],
    rating: 4.7,
    reviews: 73,
    provider: "Sample Mountain Guides",
    summary: "A gentle day hike through farmland and forest on the lower slopes, with a stop at a local coffee farm.",
    highlights: ["Forest trail", "Coffee farm visit", "Local lunch"],
    includes: ["Guide", "Lunch", "Farm visit"],
  },
  {
    slug: "swahili-cooking-class",
    title: "Swahili home-cooking class",
    destination: "dar-es-salaam",
    type: "food",
    duration: "3.5 hours",
    price: 38,
    groupSize: "Up to 8",
    languages: ["English", "Swahili"],
    rating: 4.9,
    reviews: 55,
    provider: "Sample Kitchen Collective",
    summary: "Shop for ingredients, then cook and eat a coastal Swahili meal with a local family.",
    highlights: ["Market visit", "Hands-on cooking", "Eat together"],
    includes: ["Ingredients", "Recipe card", "Meal"],
  },
  {
    slug: "batik-tingatinga-workshop",
    title: "Batik and Tingatinga art workshop",
    destination: "dar-es-salaam",
    type: "workshop",
    duration: "3 hours",
    price: 30,
    groupSize: "Up to 12",
    languages: ["English", "Swahili"],
    rating: 4.6,
    reviews: 41,
    provider: "Sample Art Studio",
    summary: "Learn the basics from working artists and take your own piece home.",
    highlights: ["Learn from local artists", "Take your piece home"],
    includes: ["Materials", "Instruction"],
  },
];

export const getExperience = (slug: string) => EXPERIENCES.find((e) => e.slug === slug);

export type ServiceKind = "accommodation" | "transport" | "operators" | "guides";

export const SERVICE_KINDS: Record<ServiceKind, { title: string; blurb: string; cta: string }> = {
  accommodation: {
    title: "Accommodation",
    blurb: "Hotels, lodges, guest houses and beach stays run by local hosts.",
    cta: "Request a stay",
  },
  transport: {
    title: "Transport",
    blurb: "Airport pickups, car rental with driver, and transfers between destinations.",
    cta: "Request transport",
  },
  operators: {
    title: "Tour operators",
    blurb: "Registered safari companies and travel agencies.",
    cta: "Contact operator",
  },
  guides: {
    title: "Local guides",
    blurb: "Independent guides who know their area well.",
    cta: "Ask this guide",
  },
};

export type Service = {
  slug: string;
  kind: ServiceKind;
  name: string;
  location: string;
  from: string;
  rating: number;
  tags: string[];
  summary: string;
  destination: Destination;
};

export const SERVICES: Service[] = [
  { slug: "beach-bungalows", kind: "accommodation", name: "Sample Beach Bungalows", location: "Zanzibar", destination: "zanzibar", from: "from $55 / night", rating: 4.6, tags: ["Beachfront", "Breakfast"], summary: "Simple, clean bungalows steps from the sand, run by a local family." },
  { slug: "crater-view-lodge", kind: "accommodation", name: "Sample Crater View Lodge", location: "Arusha", destination: "arusha", from: "from $140 / night", rating: 4.8, tags: ["Safari base", "Dinner"], summary: "A comfortable lodge used as a base for northern-circuit safaris." },
  { slug: "town-guest-house", kind: "accommodation", name: "Sample Town Guest House", location: "Dar es Salaam", destination: "dar-es-salaam", from: "from $35 / night", rating: 4.3, tags: ["Budget", "Wi-Fi"], summary: "Affordable rooms near the city centre and ferry terminal." },
  { slug: "mountain-homestay", kind: "accommodation", name: "Sample Mountain Homestay", location: "Moshi", destination: "kilimanjaro", from: "from $45 / night", rating: 4.9, tags: ["Homestay", "Home cooking"], summary: "Stay with a host family on the lower slopes and eat what the farm grows." },
  { slug: "airport-pickup-jro", kind: "transport", name: "Airport pickup (Kilimanjaro)", location: "Arusha / Moshi", destination: "arusha", from: "from $40", rating: 4.8, tags: ["Meet & greet", "Fixed price"], summary: "A driver meets you at arrivals with your name on a sign." },
  { slug: "airport-pickup-znz", kind: "transport", name: "Airport pickup (Zanzibar)", location: "Zanzibar", destination: "zanzibar", from: "from $25", rating: 4.7, tags: ["Fixed price"], summary: "Private transfer to Stone Town or the beach resorts." },
  { slug: "car-with-driver", kind: "transport", name: "4x4 with driver", location: "Nationwide", destination: "serengeti", from: "from $120 / day", rating: 4.7, tags: ["Daily hire", "Safari-ready"], summary: "A safari-ready vehicle with an experienced driver for self-planned trips." },
  { slug: "city-transfers", kind: "transport", name: "City and ferry transfers", location: "Dar es Salaam", destination: "dar-es-salaam", from: "from $15", rating: 4.4, tags: ["Ferry port", "Hourly"], summary: "Short transfers across the city and to the ferry terminal." },
  { slug: "sample-safari-company", kind: "operators", name: "Sample Safari Company", location: "Arusha", destination: "arusha", from: "Safaris from $170 / day", rating: 4.9, tags: ["Licensed", "Small groups"], summary: "Northern-circuit specialists with experienced driver-guides." },
  { slug: "island-travel", kind: "operators", name: "Sample Island Travel", location: "Zanzibar", destination: "zanzibar", from: "Tours from $30", rating: 4.6, tags: ["Day tours", "Boat trips"], summary: "Island tours, boat trips and transfers booked together." },
  { slug: "mountain-outfitters", kind: "operators", name: "Sample Mountain Outfitters", location: "Moshi", destination: "kilimanjaro", from: "Day hikes from $55", rating: 4.8, tags: ["Hiking", "Porters paid fairly"], summary: "Hiking trips with well-trained guides and fairly paid porters." },
  { slug: "guide-amina", kind: "guides", name: "Sample guide: Stone Town walks", location: "Zanzibar", destination: "zanzibar", from: "from $25 / half day", rating: 4.9, tags: ["English", "Swahili", "History"], summary: "Licensed local guide specialising in old-town history and food." },
  { slug: "guide-bush", kind: "guides", name: "Sample guide: wildlife and birds", location: "Serengeti", destination: "serengeti", from: "from $60 / day", rating: 4.8, tags: ["English", "German", "Birding"], summary: "Naturalist guide with many years of experience in the parks." },
  { slug: "guide-culture", kind: "guides", name: "Sample guide: cultural visits", location: "Arusha", destination: "arusha", from: "from $30 / half day", rating: 4.7, tags: ["English", "Swahili", "Community visits"], summary: "Arranges respectful visits hosted by local communities." },
];
