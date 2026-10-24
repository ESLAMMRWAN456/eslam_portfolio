import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-3xl tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
        That page does not exist. This portfolio is a single page, so everything
        lives on the home page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-teal-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-teal-200"
      >
        Back to home
      </Link>
    </div>
  );
}
