"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Pills from "./Pills";
import { ArticleCard, EventCard } from "./cards";
import { Badge, EmptyState } from "./ui";
import { postThread, type Result } from "@/lib/api";
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  EVENTS,
  EVENT_CATEGORIES,
  THREADS,
  THREAD_CATEGORIES,
} from "@/data/content";

export function ArticleBrowser() {
  const c = useSearchParams().get("c");
  const list = ARTICLES.filter((a) => !c || a.category === c);
  return (
    <div className="space-y-5">
      <Pills param="c" options={ARTICLE_CATEGORIES} />
      {list.length === 0 ? (
        <EmptyState text="No articles in this category yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}

export function EventBrowser() {
  const c = useSearchParams().get("c");
  const list = EVENTS.filter((e) => !c || e.category === c);
  return (
    <div className="space-y-5">
      <Pills param="c" options={EVENT_CATEGORIES} />
      {list.length === 0 ? (
        <EmptyState text="No events in this category yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <EventCard key={e.slug} e={e} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommunityBrowser() {
  const c = useSearchParams().get("c");
  const list = THREADS.filter((t) => !c || t.category === c);
  const [res, setRes] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const label = (id: string) => THREAD_CATEGORIES.find((x) => x.id === id)?.label;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <Pills param="c" options={THREAD_CATEGORIES} allLabel="All discussions" />
        {list.length === 0 ? (
          <EmptyState text="No discussions here yet." />
        ) : (
          <ul className="divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5">
            {list.map((t) => (
              <li key={t.id} className="space-y-1 p-4">
                <div className="flex items-center gap-2">
                  <Badge>{label(t.category)}</Badge>
                  <span className="text-xs text-neutral-500">{t.author}</span>
                </div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-sm text-neutral-600">{t.excerpt}</p>
                <p className="flex items-center gap-1 text-xs text-neutral-500">
                  <MessageCircle size={12} aria-hidden /> {t.replies} replies
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <aside className="h-fit rounded-2xl bg-sand p-5">
        <h2 className="text-lg font-bold">Ask the community</h2>
        {res?.ok ? (
          <p role="status" className="mt-3 text-sm text-leaf">
            {res.message}
          </p>
        ) : (
          <form
            className="mt-3 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const f = new FormData(e.currentTarget);
              setRes(
                await postThread({
                  title: String(f.get("title")).trim(),
                  body: String(f.get("body") ?? "").trim(),
                  author: String(f.get("author") ?? "").trim(),
                }),
              );
              setBusy(false);
            }}
          >
            <input name="author" placeholder="Your name (optional)" maxLength={80} className="w-full rounded-lg bg-white px-3 py-2.5 ring-1 ring-black/15" />
            <input required name="title" minLength={5} maxLength={200} placeholder="Your question" className="w-full rounded-lg bg-white px-3 py-2.5 ring-1 ring-black/15" />
            <textarea name="body" rows={4} maxLength={3000} placeholder="Add details (optional)" className="w-full rounded-lg bg-white px-3 py-2.5 ring-1 ring-black/15" />
            {res && !res.ok && <p role="alert" className="text-sm text-red-700">{res.message}</p>}
            <button disabled={busy} className="w-full rounded-full bg-sun py-2.5 font-bold text-ink hover:bg-brand disabled:opacity-60">
              {busy ? "Posting…" : "Post question"}
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
