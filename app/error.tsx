"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console and server logs for diagnosis.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 text-3xl tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-lg bg-teal-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-teal-200"
      >
        Try again
      </button>
    </div>
  );
}
