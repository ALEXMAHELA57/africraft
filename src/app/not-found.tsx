import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="font-display mt-2 text-4xl font-extrabold">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-neutral-600">It may have moved, or the link may be wrong.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-sun px-6 py-2.5 font-semibold text-ink hover:bg-brand">
        Back to home
      </Link>
    </div>
  );
}
