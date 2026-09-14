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
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-5 text-[#211d1b]">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
          Something Went Wrong
        </p>

        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          We hit a small{" "}
          <span className="italic text-[#c78f86]">
            snag.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-stone-500">
          Something unexpected happened while loading this page.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}