export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Marketplace",
    href: "/marketplace",
    children: [
      { label: "All products", href: "/marketplace" },
      { label: "Clothing & fabrics", href: "/marketplace?c=clothing" },
      { label: "Crafts & decor", href: "/marketplace?c=crafts" },
      { label: "Art & paintings", href: "/marketplace?c=art" },
      { label: "Jewelry", href: "/marketplace?c=jewelry" },
      { label: "Support local communities", href: "/marketplace?c=community" },
    ],
  },
  {
    label: "Tourism",
    href: "/tourism",
    children: [
      { label: "Experiences", href: "/tourism" },
      { label: "Accommodation", href: "/tourism/accommodation" },
      { label: "Transport", href: "/tourism/transport" },
      { label: "Tour operators", href: "/tourism/operators" },
      { label: "Local guides", href: "/tourism/guides" },
    ],
  },
  {
    label: "Culture",
    href: "/culture",
    children: [
      { label: "Traditions & heritage", href: "/culture" },
      { label: "Dance & music", href: "/culture/dance-music" },
      { label: "Food & recipes", href: "/culture/food" },
      { label: "Languages", href: "/culture/languages" },
    ],
  },
  {
    label: "Entertainment",
    href: "/entertainment",
    children: [
      { label: "Music", href: "/entertainment" },
      { label: "Films & documentaries", href: "/entertainment/films" },
      { label: "Artists", href: "/entertainment/artists" },
    ],
  },
  {
    label: "Articles",
    href: "/articles",
    children: [
      { label: "Destination guides", href: "/articles" },
      { label: "History", href: "/articles?c=history" },
      { label: "Business stories", href: "/articles?c=business" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Festivals", href: "/events" },
      { label: "Exhibitions", href: "/events?c=exhibition" },
      { label: "Community events", href: "/events?c=community" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Discussions", href: "/community" },
      { label: "Travel Q&A", href: "/community?c=qa" },
    ],
  },
];

export const QUICK_SERVICES = [
  { label: "Book a Safari Tour", sub: "from $120", href: "/tourism", icon: "safari" },
  { label: "Find Hotels", sub: "from $50/night", href: "/tourism/accommodation", icon: "hotel" },
  { label: "Arrange Transport", sub: "Airport & Local", href: "/tourism/transport", icon: "car" },
  { label: "Explore Culture", sub: "Music, Dance & More", href: "/culture", icon: "culture" },
] as const;

/**
 * Image helper. Drop a real photo at public/images/<name>.jpg and it is used
 * automatically; if that file does not exist the browser skips it and shows
 * the bundled illustration public/images/<name>.svg instead.
 */
export const bg = (name: string) => `url(/images/${name}.jpg), url(/images/${name}.svg)`;

/**
 * Cover for a specific item. Tries, in order: the item's own photo, the shared photo for its
 * place/topic (e.g. zanzibar.jpg), then the bundled illustration. Pass photoFallback=false to skip
 * the shared photo, which is right for products (one market photo must not stand in for every product).
 */
export const cover = (slug: string, fallback: string, photoFallback = true) =>
  photoFallback
    ? `url(/images/${slug}.jpg), url(/images/${fallback}.jpg), url(/images/${fallback}.svg)`
    : `url(/images/${slug}.jpg), url(/images/${fallback}.svg)`;

export const DESTINATIONS = [
  { name: "Zanzibar", img: "zanzibar" },
  { name: "Arusha", img: "arusha" },
  { name: "Serengeti", img: "serengeti" },
  { name: "Dar es Salaam", img: "dar-es-salaam" },
];

