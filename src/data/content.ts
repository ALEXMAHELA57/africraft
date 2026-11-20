/* ---------- Articles ---------- */
export type ArticleCategory = "destinations" | "culture" | "history" | "business" | "travel-tips";

export const ARTICLE_CATEGORIES: { id: ArticleCategory; label: string }[] = [
  { id: "destinations", label: "Destination guides" },
  { id: "culture", label: "Culture" },
  { id: "history", label: "History" },
  { id: "business", label: "Business stories" },
  { id: "travel-tips", label: "Travel tips" },
];

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string;
  readMins: number;
  excerpt: string;
  body: string[];
  cover: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "kilimanjaro-journey",
    title: "Mount Kilimanjaro: A Journey to the Roof of Africa",
    category: "destinations",
    date: "Oct 25, 2026",
    readMins: 5,
    excerpt: "Africa's highest mountain rises from farmland to glaciers. Here is how to think about visiting it.",
    cover: "kilimanjaro",
    body: [
      "Kilimanjaro, in northern Tanzania, is the highest mountain in Africa at 5,895 metres, and it stands alone rather than as part of a range. A climb passes through farmland, rainforest, moorland and alpine desert before reaching the summit area.",
      "Not everyone has to reach the top to enjoy the mountain. Day hikes on the lower slopes pass coffee farms, waterfalls and villages, and are a good way to meet the communities who live there.",
      "If you do plan a summit climb, choose an operator that pays its porters fairly and is open about group sizes and safety. Allow enough days to acclimatise, because rushing is the most common reason climbers turn back.",
    ],
  },
  {
    slug: "stone-town-guide",
    title: "A first-timer's guide to Stone Town",
    category: "destinations",
    date: "Oct 12, 2026",
    readMins: 4,
    excerpt: "Narrow lanes, carved doors and a long trading history: how to spend a day in Zanzibar's old town.",
    cover: "zanzibar",
    body: [
      "Stone Town is the historic centre of Zanzibar City and a UNESCO World Heritage Site. Its maze of lanes is best explored on foot, ideally with a local guide who can explain the architecture and the island's trading past.",
      "Look out for the large carved wooden doors, the old markets and the waterfront at sunset. Food is a highlight: try street snacks and seafood, and ask your guide for places locals eat.",
      "Dress modestly, ask before photographing people, and buy crafts directly from makers where you can.",
    ],
  },
  {
    slug: "swahili-phrases",
    title: "Ten Swahili phrases to learn before you arrive",
    category: "travel-tips",
    date: "Sep 30, 2026",
    readMins: 3,
    excerpt: "A few words go a long way. Start with these.",
    cover: "culture",
    body: [
      "Swahili is spoken across much of East Africa, and visitors who try a few phrases are almost always met with warmth.",
      "Start with Jambo or Habari for hello, Asante for thank you, and Karibu for welcome. Pole pole means slowly, a handy attitude for travel. Kwaheri means goodbye.",
      "Don't worry about pronunciation. Speak slowly, smile, and people will help you.",
    ],
  },
  {
    slug: "buying-crafts-responsibly",
    title: "How to buy crafts so the money reaches the maker",
    category: "business",
    date: "Sep 18, 2026",
    readMins: 4,
    excerpt: "Simple habits that make your souvenirs support the people who made them.",
    cover: "marketplace",
    body: [
      "Many souvenirs pass through several sellers before reaching a shop, and the maker often earns the least. Buying directly from artisans, cooperatives or community shops keeps more of the price with them.",
      "Ask who made the item and what it is made from. Be wary of anything that suggests endangered wood, ivory or animal products, and check your own country's rules on bringing goods home.",
      "Bargaining is common in markets, but be fair: a few extra shillings mean little to you and a lot to a maker.",
    ],
  },
  {
    slug: "swahili-coast-history",
    title: "The Swahili Coast: a short history of trade and language",
    category: "history",
    date: "Aug 29, 2026",
    readMins: 6,
    excerpt: "How centuries of trading across the Indian Ocean shaped the coast's culture.",
    cover: "dar-es-salaam",
    body: [
      "For many centuries, towns along the East African coast traded with partners across the Indian Ocean. Goods, ideas and people moved with the monsoon winds.",
      "That long contact shaped the Swahili language, local architecture, food and music, and its legacy is still visible in coastal towns today.",
      "Understanding this history makes a visit richer, and local guides are the best people to tell it.",
    ],
  },
  {
    slug: "when-to-visit-tanzania",
    title: "When to visit Tanzania: a simple seasons guide",
    category: "travel-tips",
    date: "Aug 10, 2026",
    readMins: 4,
    excerpt: "Dry seasons, rainy seasons and what each means for safaris, beaches and hiking.",
    cover: "serengeti",
    body: [
      "Tanzania has long and short rainy seasons, and the best time to visit depends on what you want to do. The drier months are generally the easiest for safaris and hiking, because wildlife gathers near water and trails are firmer.",
      "Beach destinations like Zanzibar are pleasant for much of the year, but heavy rain periods can make some activities harder.",
      "Always check with your operator for current conditions before booking, since weather patterns vary from year to year.",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/* ---------- Events (sample listings) ---------- */
export type EventCategory = "festival" | "exhibition" | "community" | "music";
export const EVENT_CATEGORIES: { id: EventCategory; label: string }[] = [
  { id: "festival", label: "Festivals" },
  { id: "exhibition", label: "Exhibitions" },
  { id: "community", label: "Community" },
  { id: "music", label: "Music & dance" },
];

export type EventItem = {
  slug: string;
  title: string;
  category: EventCategory;
  place: string;
  when: string;
  price: string;
  summary: string;
  cover: string;
};

export const EVENTS: EventItem[] = [
  { slug: "coastal-culture-festival", title: "Coastal Culture Festival (sample)", category: "festival", place: "Zanzibar", when: "Sample date", price: "From $10", summary: "Music, food and craft stalls by the sea.", cover: "zanzibar" },
  { slug: "artisan-market-weekend", title: "Artisan Market Weekend (sample)", category: "community", place: "Arusha", when: "Sample date", price: "Free entry", summary: "Meet makers, watch demonstrations and buy direct.", cover: "marketplace" },
  { slug: "coffee-harvest-day", title: "Coffee Harvest Day (sample)", category: "community", place: "Moshi", when: "Sample date", price: "From $12", summary: "Pick, roast and taste coffee with local farmers.", cover: "kilimanjaro" },
  { slug: "traditional-dance-night", title: "Traditional Dance Night (sample)", category: "music", place: "Dar es Salaam", when: "Sample date", price: "From $8", summary: "An evening of live drumming and dance from several communities.", cover: "entertainment" },
  { slug: "wildlife-photo-exhibition", title: "Wildlife Photography Exhibition (sample)", category: "exhibition", place: "Arusha", when: "Sample date", price: "Free entry", summary: "Photographs by Tanzanian wildlife photographers.", cover: "serengeti" },
];

/* ---------- Community (sample threads) ---------- */
export type ThreadCategory = "qa" | "tips" | "culture";
export const THREAD_CATEGORIES: { id: ThreadCategory; label: string }[] = [
  { id: "qa", label: "Travel Q&A" },
  { id: "tips", label: "Tips & recommendations" },
  { id: "culture", label: "Culture talk" },
];

export type Thread = {
  id: string;
  title: string;
  category: ThreadCategory;
  author: string;
  replies: number;
  excerpt: string;
};

export const THREADS: Thread[] = [
  { id: "1", title: "Which cultural experiences should I try in Arusha?", category: "qa", author: "Sample visitor", replies: 8, excerpt: "I have 3 days before my safari starts and want to see something beyond the parks." },
  { id: "2", title: "Is it better to book a safari before arriving or in town?", category: "qa", author: "Sample traveller", replies: 12, excerpt: "Trying to decide between planning ahead and finding a deal on arrival." },
  { id: "3", title: "Best place to buy beadwork directly from makers?", category: "tips", author: "Sample shopper", replies: 5, excerpt: "I'd like the money to go to the women making it, not a middleman." },
  { id: "4", title: "What is the meaning behind the colours in shuka cloth?", category: "culture", author: "Sample reader", replies: 6, excerpt: "I keep hearing different explanations. Does anyone know?" },
];

/* ---------- Culture ---------- */
export const COMMUNITIES = [
  { id: "maasai", name: "Maasai", region: "Northern Tanzania and southern Kenya", blurb: "Pastoralist people known for beadwork, bright cloth and a rich oral tradition." },
  { id: "chagga", name: "Chagga", region: "Slopes of Kilimanjaro", blurb: "Farming communities famous for banana and coffee growing and irrigation channels on the mountain." },
  { id: "sukuma", name: "Sukuma", region: "South of Lake Victoria", blurb: "The largest ethnic group in Tanzania, with strong traditions of music, dance and societies." },
  { id: "makonde", name: "Makonde", region: "South-east Tanzania", blurb: "Renowned for sculpture and carving traditions that are known around the world." },
  { id: "zaramo", name: "Zaramo", region: "Around Dar es Salaam", blurb: "A coastal community whose home region became Tanzania's largest city." },
  { id: "hadzabe", name: "Hadzabe", region: "Near Lake Eyasi", blurb: "One of the few remaining hunter-gatherer communities in East Africa." },
];

export const CULTURE_TOPICS: Record<string, { title: string; blurb: string; items: { name: string; text: string }[] }> = {
  "dance-music": {
    title: "Dance and music",
    blurb: "Rhythm runs through everyday life, from village ceremonies to city studios.",
    items: [
      { name: "Ngoma", text: "A word for drum and the dances that go with it. Styles and meanings differ from community to community." },
      { name: "Adumu", text: "The jumping dance performed by young Maasai men, in which dancers leap as high as they can." },
      { name: "Taarab", text: "A music style from the Swahili coast and Zanzibar that blends local and Indian Ocean influences." },
      { name: "Bongo Flava", text: "Tanzanian hip-hop and pop, born in Dar es Salaam." },
      { name: "Singeli", text: "A very fast street music style from Dar es Salaam." },
    ],
  },
  food: {
    title: "Food and recipes",
    blurb: "Tanzanian cooking mixes inland staples with coastal spices.",
    items: [
      { name: "Ugali", text: "A firm maize porridge eaten with stews, greens or grilled meat." },
      { name: "Nyama choma", text: "Grilled meat, usually shared with friends." },
      { name: "Pilau", text: "Spiced rice cooked with meat and whole spices, a coastal favourite." },
      { name: "Chapati and mandazi", text: "Everyday breads and fried dough, perfect with tea." },
      { name: "Urojo", text: "A tangy Zanzibar street soup served with crispy toppings." },
    ],
  },
  languages: {
    title: "Languages",
    blurb: "Swahili is the national language, alongside English and more than a hundred local languages.",
    items: [
      { name: "Habari", text: "Hello, literally “news?”" },
      { name: "Asante", text: "Thank you." },
      { name: "Karibu", text: "Welcome, or you're welcome." },
      { name: "Pole pole", text: "Slowly, slowly." },
      { name: "Kwaheri", text: "Goodbye." },
    ],
  },
};

/* ---------- Entertainment ---------- */
export const ENTERTAINMENT_TOPICS: Record<string, { title: string; blurb: string; cards: { name: string; text: string }[] }> = {
  music: {
    title: "Music",
    blurb: "Discover genres and the artists who make them.",
    cards: [
      { name: "Bongo Flava", text: "Tanzanian hip-hop and pop." },
      { name: "Taarab", text: "Swahili coast orchestral and vocal music." },
      { name: "Singeli", text: "High-speed dance music from Dar es Salaam." },
      { name: "Traditional ngoma", text: "Community drumming and dance." },
    ],
  },
  films: {
    title: "Films and documentaries",
    blurb: "Stories from across Africa. Africraft links to official, licensed sources rather than hosting video.",
    cards: [
      { name: "Documentaries", text: "Features on people, places and traditions." },
      { name: "Short films", text: "Independent filmmakers and festival selections." },
      { name: "Submit your film", text: "Filmmakers can ask to be featured once profiles open." },
    ],
  },
  artists: {
    title: "Artists",
    blurb: "Profiles for musicians, dancers, painters and performers.",
    cards: [
      { name: "Musicians", text: "Profiles with links to official streaming pages." },
      { name: "Dancers and troupes", text: "Book performances for events and hotels." },
      { name: "Visual artists", text: "Painters and sculptors linked to the marketplace." },
    ],
  },
};
