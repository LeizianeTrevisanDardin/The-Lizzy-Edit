import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UndertonePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#ead0c8]/40 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#f1ddd6]/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
              The Lizzy Edit · Beauty Tool
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Find your{" "}
              <span className="italic text-[#c78f86]">
                undertone.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Discover your estimated skin tone and undertone with a quick,
              private analysis designed to help you make easier beauty choices.
            </p>

            <Link
              href="/undertone/analyze"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b76f70]"
            >
              Start Skin Analysis →
            </Link>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-stone-500">
              <span aria-hidden="true">♡</span>
              <span>Your camera image will not be stored.</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            How it works
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Your result in{" "}
            <span className="italic text-[#c78f86]">
              three steps.
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-[26px] border border-stone-200 bg-white p-6 sm:p-8">
            <span className="font-serif text-4xl italic text-[#c78f86]">
              01
            </span>

            <h3 className="mt-8 font-serif text-2xl">
              Check your lighting
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Natural daylight helps us get a more accurate estimate of your
              skin tone.
            </p>
          </article>

          <article className="rounded-[26px] border border-stone-200 bg-white p-6 sm:p-8">
            <span className="font-serif text-4xl italic text-[#c78f86]">
              02
            </span>

            <h3 className="mt-8 font-serif text-2xl">
              Use your camera
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Position your face in the guide and we&apos;ll analyze visible
              skin color without saving your photo.
            </p>
          </article>

          <article className="rounded-[26px] border border-stone-200 bg-white p-6 sm:p-8">
            <span className="font-serif text-4xl italic text-[#c78f86]">
              03
            </span>

            <h3 className="mt-8 font-serif text-2xl">
              Discover your match
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Get your estimated skin tone, undertone and beauty colors that
              may complement you.
            </p>
          </article>
        </div>
      </section>

      {/* BEFORE YOU START */}
      <section className="bg-[#f5e9e4]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
                Before you start
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Good light makes a{" "}
                <span className="italic">
                  better match.
                </span>
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Face a window with natural daylight",
                "Avoid direct, harsh sunlight",
                "Remove makeup if possible",
                "Turn off camera beauty filters",
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex min-h-20 items-center gap-3 rounded-[20px] bg-white/80 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ead0c8] text-sm">
                    ✓
                  </span>

                  <p className="text-sm leading-5 text-stone-600">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="overflow-hidden rounded-[30px] bg-[#211d1b] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#d4a59d]">
                Privacy first
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Your face belongs to{" "}
                <span className="italic text-[#d4a59d]">
                  you.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-stone-300">
                Your camera will only be used during the analysis. The goal of
                this tool is to process the image temporarily without adding
                your photo to your account or photo library.
              </p>

              <p className="mt-4 text-xs leading-6 text-stone-400">
                Results are estimates and may vary depending on lighting,
                camera settings and surrounding colors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}