import Link from "next/link";
import {
  ArrowRight,
  Bed,
  Car,
  CalendarDays,
  MapPin,
  Music,
  Newspaper,
  Play,
  Search,
  ShoppingBag,
  Tag,
  Users,
  Drama,
  Plane,
  Calendar,
  Heart,
} from "lucide-react";
import { DESTINATIONS, bg } from "@/lib/site";
import { ARTICLES } from "@/data/content";

const STRIP = [
  { label: "Marketplace", sub: "Buy & Sell", href: "/marketplace", Icon: ShoppingBag },
  { label: "Tourism", sub: "Tours & Experiences", href: "/tourism", Icon: Plane },
  { label: "Accommodation", sub: "Hotels & Lodges", href: "/tourism/accommodation", Icon: Bed },
  { label: "Transport", sub: "Flights & Transfers", href: "/tourism/transport", Icon: Car },
  { label: "Culture", sub: "Traditions & Heritage", href: "/culture", Icon: Drama },
  { label: "Entertainment", sub: "Music & Movies", href: "/entertainment", Icon: Music },
  { label: "Events", sub: "Festivals & More", href: "/events", Icon: Calendar },
  { label: "Community", sub: "Connect & Share", href: "/community", Icon: Users },
];

const FEATURES = [
  {
    title: "Marketplace",
    badge: "bg-brand text-white",
    heading: "Authentic African Crafts",
    text: "Support local artisans and craftsmen.",
    cta: "Shop Now",
    href: "/marketplace",
    img: "marketplace",
  },
  {
    title: "Tourism",
    badge: "bg-leaf text-white",
    heading: "Explore Zanzibar",
    text: "Paradise awaits you.",
    cta: "Book Now",
    href: "/tourism",
    img: "tourism",
  },
  {
    title: "Culture",
    badge: "bg-purple-600 text-white",
    heading: "Experience Our Culture",
    text: "Traditions that inspire.",
    cta: "Learn More",
    href: "/culture",
    img: "culture",
  },
  {
    title: "Entertainment",
    badge: "bg-sky-600 text-white",
    heading: "African Sounds & Arts",
    text: "Music, films and talent.",
    cta: "Explore",
    href: "/entertainment",
    img: "entertainment",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: bg("hero") }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
          <div className="min-w-0 max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Discover the beauty, culture and opportunities of <span className="text-sun">Africa.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              Shop local products, book amazing experiences, and explore Africa&apos;s rich heritage, all in one place.
            </p>

            <form action="/search" className="mt-7 flex max-w-xl items-center rounded-full bg-white p-1.5 shadow-lg focus-within:ring-4 focus-within:ring-sun/60">
              <Search size={20} className="ml-3 shrink-0 text-neutral-500" aria-hidden />
              <label htmlFor="q" className="sr-only">
                Search
              </label>
              <input
                id="q"
                name="q"
                placeholder="Search for products, destinations, articles..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-ink outline-none placeholder:text-neutral-500"
              />
              <button className="rounded-full bg-sun px-6 py-2.5 font-semibold text-ink hover:bg-brand">
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { l: "Explore Africa", h: "/tourism", I: Tag },
                { l: "Shop Local", h: "/marketplace", I: ShoppingBag },
                { l: "Book a Tour", h: "/tourism", I: Plane },
                { l: "Watch Culture", h: "/culture", I: Play },
              ].map(({ l, h, I }) => (
                <Link
                  key={l}
                  href={h}
                  className="flex items-center gap-2 rounded-full border border-white/70 px-4 py-1.5 text-sm font-medium hover:bg-white/15"
                >
                  <I size={15} aria-hidden /> {l}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 sm:grid-cols-4 lg:grid-cols-8">
          {STRIP.map(({ label, sub, href, Icon }) => (
            <li key={label} className="bg-sand">
              <Link href={href} className="flex h-full flex-col items-center gap-1 px-2 py-4 text-center hover:bg-white">
                <Icon size={24} aria-hidden />
                <span className="text-sm font-bold">{label}</span>
                <span className="text-xs text-neutral-500">{sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FEATURE CARDS */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="relative flex h-52 flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center p-4 text-white shadow"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0) 60%), ${bg(f.img)}`,
              }}
            >
              <div className="flex items-start justify-between">
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${f.badge}`}>{f.title}</span>
                <Link href={f.href} className="rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-ink">
                  View All →
                </Link>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold leading-tight">{f.heading}</h3>
                  <p className="text-xs text-white/85">{f.text}</p>
                </div>
                <Link
                  href={f.href}
                  className="shrink-0 rounded-full border border-white/80 bg-black/30 px-3 py-1.5 text-xs font-semibold hover:bg-black/50"
                >
                  {f.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DESTINATIONS / ARTICLES / SUPPORT LOCAL */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-[1.1fr_1fr_1.1fr]">
        <div className="rounded-2xl bg-sand p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <MapPin size={20} aria-hidden /> Popular Destinations
            </h2>
            <Link href="/tourism" className="text-xs font-semibold hover:text-brand">
              View All →
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <li key={d.name}>
                <Link
                  href={`/tourism?d=${encodeURIComponent(d.name)}`}
                  className="flex h-24 items-end rounded-lg bg-cover bg-center p-2 text-xs font-semibold text-white shadow-sm"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 65%), ${bg(d.img)}`,
                  }}
                >
                  <span className="flex items-center gap-1 drop-shadow">
                    <MapPin size={12} aria-hidden /> {d.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-sand p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Newspaper size={20} aria-hidden /> Latest Articles
            </h2>
            <Link href="/articles" className="text-xs font-semibold hover:text-brand">
              View All →
            </Link>
          </div>
          {ARTICLES.slice(0, 1).map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="flex gap-3">
              <span
                aria-hidden
                className="h-24 w-28 shrink-0 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: bg(a.cover) }}
              />
              <span>
                <span className="block font-bold leading-snug">{a.title}</span>
                <span className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} aria-hidden /> {a.date}
                  </span>
                  <span className="flex items-center gap-1">
                    {a.readMins} min read
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-cover bg-right p-6 text-white"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20,17,15,.85), rgba(20,17,15,.2) 70%), ${bg("support-local")}`,
          }}>
          <Heart size={96} aria-hidden className="absolute -right-4 -top-4 text-white/10" />
          <h2 className="font-display text-3xl font-extrabold leading-tight">
            Support Local.
            <br />
            <span className="text-sun">Grow Together.</span>
          </h2>
          <p className="mt-2 text-sm text-white/80">Buy African. Empower Communities.</p>
          <Link
            href="/marketplace?c=community"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink hover:bg-brand"
          >
            Learn More <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      {/* CLOSING BANNER */}
      <section className="bg-gradient-to-r from-amber-950 via-ink to-amber-950">
        <div className="py-10 text-center text-white">
          <p className="font-display text-2xl italic sm:text-3xl">Discover Africa, one experience at a time.</p>
          <Link
            href="/tourism"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink hover:bg-brand"
          >
            Explore Now <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
