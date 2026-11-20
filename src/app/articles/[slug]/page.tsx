import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { Container, Cover } from "@/components/ui";
import { ARTICLES, ARTICLE_CATEGORIES, getArticle } from "@/data/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return { title: a?.title ?? "Article", description: a?.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const cat = ARTICLE_CATEGORIES.find((c) => c.id === a.category)?.label;

  return (
    <Container className="space-y-10">
      <article className="mx-auto max-w-3xl space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <Link href="/articles" className="hover:text-ink">
            Articles
          </Link>{" "}
          / <Link href={`/articles?c=${a.category}`} className="hover:text-ink">{cat}</Link>
        </nav>
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{a.title}</h1>
        <p className="text-sm text-neutral-500">
          {a.date} · {a.readMins} min read · By Africraft Editorial
        </p>
        <Cover slug={a.slug} fallback={a.cover} className="h-64 overflow-hidden rounded-2xl sm:h-80" />
        <div className="space-y-4 text-lg leading-relaxed text-neutral-800">
          {a.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <section>
        <h2 className="mb-4 text-xl font-bold">Keep reading</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((m) => (
            <ArticleCard key={m.slug} a={m} />
          ))}
        </div>
      </section>
    </Container>
  );
}
