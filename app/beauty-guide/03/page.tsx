import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const differences = [
  {
    number: "01",
    title: "Dry Skin",
    description:
      "Dry skin is generally linked to a lower level of natural oils. It may feel tight, rough or uncomfortable and can sometimes look flaky or dull.",
    note:
      "Dry skin is usually considered a skin type, so it can be something you experience consistently.",
  },
  {
    number: "02",
    title: "Dehydrated Skin",
    description:
      "Dehydrated skin is lacking water rather than oil. It can feel tight or look dull while still producing oil, especially in areas like the forehead, nose and chin.",
    note:
      "Dehydration is a skin condition that can affect different skin types, including oily skin.",
  },
  {
    number: "03",
    title: "Texture & Feel",
    description:
      "Dry skin may feel rough or flaky, while dehydrated skin can feel tight and appear less plump or more tired than usual.",
    note:
      "The way your skin feels after cleansing can give you useful clues about what it may need.",
  },
  {
    number: "04",
    title: "What Your Routine May Need",
    description:
      "Dry skin often benefits from nourishing moisturizers and barrier-supporting ingredients, while dehydrated skin may benefit from lightweight hydration paired with a moisturizer that helps keep that hydration in.",
    note:
      "Many people can experience both dryness and dehydration at the same time.",
  },
];

const reminders = [
  "Dry skin and dehydrated skin are not exactly the same thing.",
  "Oily skin can still be dehydrated.",
  "Hydration and moisture play different roles in your routine.",
  "How your skin feels can change with weather, environment and your routine.",
];

export default function DryVsDehydratedSkinPage() {
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
              Skincare • Guide 03
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Dry vs.{" "}
              <span className="italic text-[#c78f86]">
                Dehydrated Skin
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              They can look and feel similar, but dry skin and dehydrated skin
              are not exactly the same. Understanding the difference can make
              choosing products feel much easier.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src="/images/3.png"
            alt="Dry versus dehydrated skin comparison"
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
          Know the difference
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Think oil versus{" "}
          <span className="italic text-[#c78f86]">
            water.
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            One of the easiest ways to understand the difference is to think
            about what the skin may be lacking.
          </p>

          <p>
            Dry skin is generally associated with a lack of natural oils,
            while dehydrated skin is lacking water. Because of that,
            dehydration can happen even if your skin is oily.
          </p>

          <p>
            This is why two people who both describe their skin as feeling
            tight may actually benefit from different types of products.
          </p>
        </div>
      </section>

      {/* DIFFERENCES */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              Dry vs. dehydrated
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              What to look{" "}
              <span className="italic text-[#c78f86]">
                for.
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {differences.map((item) => (
              <div
                key={item.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-3xl text-[#c78f86]">
                  {item.number}
                </span>

                <div>
                  <h3 className="font-serif text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                    {item.description}
                  </p>

                  <div className="mt-5 rounded-[20px] bg-[#f8f1ed] px-5 py-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                      Lizzy&apos;s note
                    </p>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Dry Skin
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              Often needs more nourishment.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Look for comfortable textures that help support the skin barrier
              and reduce that dry, tight feeling.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Cream Cleanser",
                "Ceramides",
                "Moisturizer",
                "Facial Oil",
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

          <div className="rounded-[28px] bg-[#e5e8e4] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              Dehydrated Skin
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              Often needs more hydration.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Hydrating layers can help add water back into the routine, while
              moisturizer helps reduce the loss of that hydration.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Hydrating Serum",
                "Hyaluronic Acid",
                "Essence",
                "Moisturizer",
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

      {/* CAN YOU HAVE BOTH */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            A common question
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Can your skin be dry{" "}
            <span className="italic text-[#c78f86]">
              and dehydrated?
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            <p>
              Yes. Because dryness and dehydration describe different things,
              they can happen together.
            </p>

            <p>
              Someone with naturally dry skin can also become dehydrated due to
              weather, over-cleansing, environmental conditions or changes in a
              skincare routine.
            </p>

            <p>
              In that situation, the routine may need both hydration and richer
              moisturizing products rather than choosing only one or the other.
            </p>
          </div>
        </div>
      </section>

      {/* BEAUTY NOTES */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
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
      </section>

      {/* FINAL NOTE */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            One more thing
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            Pay attention to how your skin{" "}
            <span className="italic text-[#c78f86]">
              responds.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Skin can change over time and with the seasons. Instead of trying
            to fit perfectly into one label, use these differences as a guide
            for understanding what your skin may need right now.
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
                Looking for skincare picks?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                Explore skincare favorites and find textures that may fit more
                comfortably into your routine.
              </p>
            </div>

            <Link
              href="/skincare"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-900 transition hover:-translate-y-1"
            >
              Explore Skincare →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE NAVIGATION */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3 sm:items-center">
          <Link
            href="/beauty-guide/02"
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
            href="/beauty-guide/04"
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