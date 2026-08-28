import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const finishes = [
  {
    number: "01",
    title: "Natural Finish",
    description:
      "A natural finish sits somewhere between matte and radiant. It is designed to look balanced and skin-like without appearing too flat or too glowy.",
    note:
      "This is often a great starting point if you are not sure which finish you prefer.",
  },
  {
    number: "02",
    title: "Matte Finish",
    description:
      "Matte foundations reduce visible shine and usually give the skin a smoother, more polished appearance.",
    note:
      "If your skin feels dry, prep well and avoid using too much product in areas that already feel tight.",
  },
  {
    number: "03",
    title: "Radiant Finish",
    description:
      "Radiant foundations create a luminous, fresh-looking effect and can make the complexion appear more hydrated.",
    note:
      "You can always add a little powder only where you need it instead of mattifying the whole face.",
  },
  {
    number: "04",
    title: "Skin-Like Finish",
    description:
      "Skin-like formulas are designed to blend into the complexion while allowing your natural skin texture to remain visible.",
    note:
      "This finish can be especially nice when you prefer makeup that looks effortless and lightweight.",
  },
];

const reminders = [
  "Finish and coverage are two different things.",
  "Your preferred foundation may change with the season.",
  "Skin preparation can change how a foundation looks.",
  "The finish you enjoy wearing matters more than what is currently trending.",
];

export default function FoundationFinishPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* ARTICLE HEADER */}
      <section className="border-b border-stone-200 bg-[#f3e7e2]">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Link
            href="/beauty-guide"
            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 transition hover:text-stone-900"
          >
            ← Beauty Guide
          </Link>

          <div className="mt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
              Makeup • Guide 04
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              How to Choose Your{" "}
              <span className="italic text-[#c78f86]">
                Foundation Finish
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              Natural, matte, radiant or skin-like? Choosing foundation becomes
              much easier when you start with the finish you actually enjoy
              seeing on your skin.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src="/images/4.png"
            alt="Foundation and complexion makeup products"
            fill
            priority
            quality={95}
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
          Start with the finish
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          How do you want your skin to{" "}
          <span className="italic text-[#c78f86]">
            look?
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            Foundation shopping can feel confusing because formulas are often
            described by coverage, finish, wear time and skin type all at once.
          </p>

          <p>
            A simpler place to begin is with the final look. Do you like your
            complexion to look soft and matte, fresh and luminous or almost
            like you are not wearing foundation at all?
          </p>

          <p>
            Once you know the finish you enjoy, it becomes much easier to narrow
            down the options.
          </p>
        </div>
      </section>

      {/* FINISH TYPES */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              Foundation finishes
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Find the look that feels{" "}
              <span className="italic text-[#c78f86]">
                most like you.
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {finishes.map((finish) => (
              <div
                key={finish.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-3xl text-[#c78f86]">
                  {finish.number}
                </span>

                <div>
                  <h3 className="font-serif text-3xl">
                    {finish.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                    {finish.description}
                  </p>

                  <div className="mt-5 rounded-[20px] bg-[#f8f1ed] px-5 py-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                      Lizzy&apos;s note
                    </p>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {finish.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINISH COMPARISON */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            Quick comparison
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            What kind of result are you{" "}
            <span className="italic text-[#c78f86]">
              looking for?
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[26px] bg-[#efe3dc] p-6">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Natural
            </span>

            <h3 className="mt-4 font-serif text-2xl">
              Balanced
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Not too matte and not too luminous.
            </p>
          </div>

          <div className="rounded-[26px] bg-[#e6ddd7] p-6">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">
              Matte
            </span>

            <h3 className="mt-4 font-serif text-2xl">
              Polished
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Less visible shine with a smoother-looking finish.
            </p>
          </div>

          <div className="rounded-[26px] bg-[#f2dfd5] p-6">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Radiant
            </span>

            <h3 className="mt-4 font-serif text-2xl">
              Luminous
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Fresh-looking skin with more visible glow.
            </p>
          </div>

          <div className="rounded-[26px] bg-[#eee9e4] p-6">
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">
              Skin-Like
            </span>

            <h3 className="mt-4 font-serif text-2xl">
              Effortless
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Lightweight coverage that allows skin to look like skin.
            </p>
          </div>
        </div>
      </section>

      {/* COVERAGE VS FINISH */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            Good to know
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Finish and coverage are{" "}
            <span className="italic text-[#c78f86]">
              not the same thing.
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            <p>
              Coverage tells you how much of your natural complexion remains
              visible. Finish describes how the foundation looks once it is on
              your skin.
            </p>

            <p>
              That means you can find a lightweight foundation with a matte
              finish or a fuller-coverage foundation with a radiant finish.
            </p>

            <p>
              Thinking about those two features separately can make comparing
              foundations much easier.
            </p>
          </div>
        </div>
      </section>

      {/* SKIN PREP */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#f0dfd8] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Before Foundation
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              Prep can change the finish.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Hydrating skincare underneath can make foundation look fresher,
              while mattifying products can reduce shine in specific areas.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Moisturizer",
                "SPF",
                "Primer",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#ebe3de] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              After Foundation
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              Adjust where you need it.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              You do not have to change the entire finish of your face. Powder
              only the areas where you want less shine and leave the rest
              looking fresh.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Powder",
                "Setting Spray",
                "Blotting",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEAUTY NOTES */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
                Beauty Notes
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                A few things worth{" "}
                <span className="italic text-[#c78f86]">
                  remembering.
                </span>
              </h2>
            </div>

            <div className="divide-y divide-stone-300 border-y border-stone-300">
              {reminders.map((reminder, index) => (
                <div
                  key={reminder}
                  className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_1fr]"
                >
                  <span className="font-serif text-xl text-[#c78f86]">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-7 text-stone-700 sm:text-base">
                    {reminder}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Lizzy&apos;s take
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            Choose the foundation you will actually{" "}
            <span className="italic text-[#c78f86]">
              enjoy wearing.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Skin type can help guide your choices, but it does not have to
            decide them for you. If you have oily skin and love a radiant
            finish, you can still wear one. The same goes for dry skin and
            matte foundation. Makeup is also about preference.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
        <div className="relative overflow-hidden rounded-[30px] bg-[#211d1b] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#c78f86] opacity-25 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
                The Lizzy Edit
              </p>

              <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
                Ready to explore makeup picks?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                Browse makeup favorites and discover complexion products for
                different finishes and everyday looks.
              </p>
            </div>

            <Link
              href="/makeup"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-900 transition hover:-translate-y-1"
            >
              Explore Makeup →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE NAVIGATION */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3 sm:items-center">
          <Link
            href="/beauty-guide/03"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            ← Previous Guide
          </Link>

          <Link
            href="/beauty-guide"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900 sm:text-center"
          >
            All Beauty Guides
          </Link>

          <Link
            href="/beauty-guide/05"
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] sm:justify-self-end"
          >
            Next Guide

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}