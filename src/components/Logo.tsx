import Link from "next/link";

/**
 * Africraft logo.
 *  - light=false (white header): full logo with tagline from 640px up, a compact mark + wordmark on phones,
 *    where the tagline would be too small to read. Only the version that fits is downloaded.
 *  - light=true (dark footer): white-text version of the full logo.
 * Files live in /public/brand. width/height are the real pixel sizes so the page does not jump while loading.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Africraft home" className="block min-w-0 shrink sm:shrink-0">
      {light ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/brand/logo-full-light.png" width={807} height={240} alt="Africraft" className="h-12 w-auto sm:h-14" />
      ) : (
        <picture>
          <source media="(min-width: 640px)" srcSet="/brand/logo-full.png" width={807} height={240} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-compact.png"
            width={658}
            height={144}
            alt="Africraft"
            fetchPriority="high"
            className="h-9 w-auto max-w-full object-contain object-left sm:h-14"
          />
        </picture>
      )}
    </Link>
  );
}
