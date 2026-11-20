export type Category = "clothing" | "crafts" | "art" | "jewelry" | "food" | "beauty" | "carvings";
export type SaleType = "buy" | "auction" | "quote";
export type Availability = "local" | "international" | "made-to-order";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "clothing", label: "Clothing & fabrics" },
  { id: "crafts", label: "Crafts & decor" },
  { id: "art", label: "Art & paintings" },
  { id: "jewelry", label: "Jewelry" },
  { id: "carvings", label: "Wood carvings" },
  { id: "food", label: "Food products" },
  { id: "beauty", label: "Beauty products" },
];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** USD. For auctions this is the starting price; for quotes it is the "from" price. */
  price: number;
  saleType: SaleType;
  seller: string;
  location: string;
  community: boolean;
  rating: number;
  reviews: number;
  availability: Availability[];
  description: string;
  details: string[];
  auction?: { currentBid: number; bids: number; endsIn: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: "sisal-basket-large",
    name: "Hand-woven sisal basket (large)",
    category: "crafts",
    price: 28,
    saleType: "buy",
    seller: "Sample Women's Weaving Group",
    location: "Arusha",
    community: true,
    rating: 4.8,
    reviews: 41,
    availability: ["local", "international"],
    description:
      "A sturdy storage and display basket woven by hand from natural sisal and dyed with colourful patterns. Each piece is slightly different.",
    details: ["Natural sisal fibre", "Approx. 35 cm wide", "Made by a women's group", "Ships in 5–7 days"],
  },
  {
    slug: "beaded-collar-necklace",
    name: "Beaded collar necklace",
    category: "jewelry",
    price: 35,
    saleType: "buy",
    seller: "Sample Beadwork Collective",
    location: "Arusha",
    community: true,
    rating: 4.9,
    reviews: 63,
    availability: ["local", "international", "made-to-order"],
    description:
      "A bold, layered beaded collar in traditional colour combinations. Colours can be adjusted on request as a made-to-order item.",
    details: ["Glass seed beads", "Adjustable leather tie", "Made to order: 10–14 days"],
  },
  {
    slug: "kitenge-fabric-6-yards",
    name: "Kitenge print fabric (6 yards)",
    category: "clothing",
    price: 24,
    saleType: "buy",
    seller: "Sample Fabric House",
    location: "Dar es Salaam",
    community: false,
    rating: 4.6,
    reviews: 118,
    availability: ["local", "international"],
    description: "Bright cotton kitenge with a bold print, sold as a 6-yard piece, ready to be tailored into clothing or home items.",
    details: ["100% cotton", "6 yards (about 5.5 m)", "Colour-fast print"],
  },
  {
    slug: "hardwood-carving-auction",
    name: "Makonde-style hardwood carving",
    category: "carvings",
    price: 90,
    saleType: "auction",
    seller: "Sample Carvers' Cooperative",
    location: "Mtwara",
    community: true,
    rating: 5,
    reviews: 12,
    availability: ["local", "international"],
    description:
      "A one-of-a-kind sculpture carved from a single block of sustainably sourced hardwood in the Makonde carving tradition.",
    details: ["Single-piece carving", "Approx. 45 cm tall", "Certificate of origin included"],
    auction: { currentBid: 120, bids: 7, endsIn: "2 days 4 hours" },
  },
  {
    slug: "tingatinga-painting",
    name: "Tingatinga-style painting",
    category: "art",
    price: 65,
    saleType: "buy",
    seller: "Sample Art Studio",
    location: "Dar es Salaam",
    community: false,
    rating: 4.7,
    reviews: 29,
    availability: ["local", "international", "made-to-order"],
    description: "A colourful enamel painting in the Tingatinga style, showing wildlife in bright, flat colours. Ships rolled in a tube.",
    details: ["Enamel on board", "Approx. 40 × 40 cm", "Signed by the artist"],
  },
  {
    slug: "zanzibar-spice-gift-set",
    name: "Zanzibar spice gift set",
    category: "food",
    price: 18,
    saleType: "buy",
    seller: "Sample Spice Farm Co-op",
    location: "Zanzibar",
    community: true,
    rating: 4.8,
    reviews: 87,
    availability: ["local", "international"],
    description: "A gift box of whole spices from island farms, with a small card of simple recipe ideas.",
    details: ["Six spices", "Sealed packs", "Check your country's food import rules"],
  },
  {
    slug: "baobab-body-butter",
    name: "Baobab body butter",
    category: "beauty",
    price: 16,
    saleType: "buy",
    seller: "Sample Natural Beauty",
    location: "Dodoma",
    community: false,
    rating: 4.5,
    reviews: 34,
    availability: ["local", "international"],
    description: "A rich moisturiser made with baobab oil and plant butters. No added fragrance.",
    details: ["200 ml jar", "Plant-based ingredients"],
  },
  {
    slug: "maasai-shuka-blanket",
    name: "Shuka blanket",
    category: "clothing",
    price: 32,
    saleType: "buy",
    seller: "Sample Textile Traders",
    location: "Arusha",
    community: false,
    rating: 4.7,
    reviews: 52,
    availability: ["local", "international"],
    description: "A warm, brightly checked shuka cloth, used as a wrap, blanket or throw.",
    details: ["Soft woven cloth", "Approx. 160 × 110 cm"],
  },
  {
    slug: "carved-giraffe",
    name: "Hand-carved giraffe",
    category: "carvings",
    price: 22,
    saleType: "buy",
    seller: "Sample Carvers' Cooperative",
    location: "Dar es Salaam",
    community: true,
    rating: 4.4,
    reviews: 76,
    availability: ["local", "international"],
    description: "A small decorative giraffe carved and polished by hand. A classic souvenir.",
    details: ["Approx. 25 cm tall", "Polished finish"],
  },
  {
    slug: "kilimanjaro-coffee-500g",
    name: "Kilimanjaro-grown coffee (500 g)",
    category: "food",
    price: 14,
    saleType: "buy",
    seller: "Sample Coffee Growers",
    location: "Moshi",
    community: true,
    rating: 4.9,
    reviews: 140,
    availability: ["local", "international"],
    description: "Medium-roast whole beans from smallholder farms on the slopes of the mountain.",
    details: ["500 g whole beans", "Roasted to order"],
  },
  {
    slug: "trade-bead-necklace-auction",
    name: "Vintage-style trade bead necklace",
    category: "jewelry",
    price: 70,
    saleType: "auction",
    seller: "Sample Beadwork Collective",
    location: "Arusha",
    community: true,
    rating: 4.9,
    reviews: 8,
    availability: ["local", "international"],
    description: "A long strand of mixed glass beads in the trade-bead style. A collector's piece.",
    details: ["Single strand", "About 90 cm long"],
    auction: { currentBid: 90, bids: 4, endsIn: "5 days 9 hours" },
  },
  {
    slug: "bulk-kitenge-order",
    name: "Bulk kitenge orders (shops & tailors)",
    category: "clothing",
    price: 18,
    saleType: "quote",
    seller: "Sample Fabric House",
    location: "Dar es Salaam",
    community: false,
    rating: 4.6,
    reviews: 19,
    availability: ["made-to-order", "international"],
    description: "Wholesale fabric for shops, tailors and event organisers. Request a quote with your quantity and preferred prints.",
    details: ["Price per yard from $18", "Minimum order applies", "Custom colours available"],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
