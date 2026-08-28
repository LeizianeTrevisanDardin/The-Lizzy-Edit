import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const showerSteps = [
  {
    number: "01",
    title: "Start with Hair",
    description:
      "Begin with shampoo and follow with conditioner or a hair mask if your hair needs a little extra care. Doing hair first gives treatments time to sit while you move through the rest of your routine.",
    note:
      "You do not need a hair mask every time. Save it for when your hair actually feels dry, stressed or in need of extra softness.",
  },
  {
    number: "02",
    title: "Cleanse the Body",
    description:
      "Use a body wash or cleanser that feels comfortable on your skin and works well with your everyday routine.",
    note:
      "A body cleanser does not need to feel stripping or extremely foamy to work well.",
  },
  {
    number: "03",
    title: "Exfoliate When Needed",
    description:
      "A body scrub or gentle exfoliating product can help smooth the skin, but it does not need to be used every shower.",
    note:
      "More exfoliation is not always better. Pay attention to how your skin responds.",
  },
  {
    number: "04",
    title: "Finish with Body Care",
    description:
      "After showering, apply body lotion, cream or oil while your skin still feels slightly damp to help lock in moisture.",
    note:
      "This is often the step that makes an everything shower feel more like a self-care ritual.",
  },
];

const reminders = [
  "An everything shower does not need to include every possible step.",
  "Choose the extra steps that actually make you feel good.",
  "Hair masks and exfoliation do not need to happen every shower.",
  "Body moisturizer is often easier to remember when you keep it near the shower.",
];

export default function EverythingShowerPage() {
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
              Self-Care • Guide 05
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              The Everything Shower,{" "}
              <span className="italic text-[#c78f86]">
                Simplified
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              The everything shower can be a lovely way to slow down and reset,
              but it does not need to become a two-hour checklist. A few
              thoughtful steps can make the routine feel special without making
              it exhausting.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src="/images/5.png"
            alt="Everything shower hair and body care essentials"
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
          Make it realistic
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Self-care should not feel like another{" "}
          <span className="italic text-[#c78f86]">
            obligation.
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            The idea behind an everything shower is simple: give yourself a
            little more time than usual for hair, body and skincare.
          </p>

          <p>
            But that does not mean every product in your bathroom needs to make
            an appearance. The routine can be as simple or as detailed as you
            want.
          </p>

          <p>
            Think of it as choosing a few extra steps that make you feel
            refreshed, polished and cared for.
          </p>
        </div>
      </section>

      {/* SHOWER STEPS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              The ritual
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Build it around what actually feels{" "}
              <span className="italic text-[#c78f86]">
                worth doing.
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {showerSteps.map((step) => (
              <div
                key={step.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-3xl text-[#c78f86]">
                  {step.number}
                </span>

                <div>
                  <h3 className="font-serif text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                    {step.description}
                  </p>

                  <div className="mt-5 rounded-[20px] bg-[#f8f1ed] px-5 py-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                      Lizzy&apos;s note
                    </p>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {step.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO ROUTINE OPTIONS */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              The Simple Version
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When you want the reset without the marathon.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Focus on the essentials and add just one or two extras that make
              the shower feel a little more special.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Shampoo",
                "Conditioner",
                "Body Wash",
                "Body Lotion",
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

          <div className="rounded-[28px] bg-[#e8dfd9] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              The Full Ritual
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When you actually have the time.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Add treatments and exfoliation when they make sense for your hair
              and skin rather than simply because they are part of a trend.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Hair Mask",
                "Body Scrub",
                "Body Oil",
                "Skincare",
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

      {/* ORDER OF STEPS */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            A simple order
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            You do not need to overthink the{" "}
            <span className="italic text-[#c78f86]">
              sequence.
            </span>
          </h2>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {[
              "01 — Shampoo",
              "02 — Hair treatment or conditioner",
              "03 — Body cleanse",
              "04 — Exfoliate if needed",
              "05 — Rinse thoroughly",
              "06 — Moisturize after showering",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-white/60 bg-white/60 px-5 py-4 text-sm text-stone-700"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-7 text-sm leading-7 text-stone-600 sm:text-base">
            If you use a richer hair treatment, rinsing your body afterward can
            also help remove any product that may have run down your back or
            shoulders.
          </p>
        </div>
      </section>

      {/* AFTER SHOWER */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Don&apos;t forget the after
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            The shower may end, but the{" "}
            <span className="italic text-[#c78f86]">
              ritual doesn&apos;t.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Applying body lotion, cream or oil afterward can be one of the most
            satisfying parts of the routine. You can also finish with your
            normal facial skincare and a fragrance if that is part of what makes
            you feel put together.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "Body Cream",
              "Body Oil",
              "Skincare",
              "Hair Care",
              "Fragrance",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#f6eee9] px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
              >
                {item}
              </span>
            ))}
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
                Keep the ritual{" "}
                <span className="italic text-[#c78f86]">
                  enjoyable.
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
            The best everything shower is the one you{" "}
            <span className="italic text-[#c78f86]">
              actually enjoy.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            You do not need ten products, candles and an elaborate routine for
            self-care to count. Sometimes shampoo, a body scrub, a great body
            cream and a little extra time are more than enough.
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
                Ready for a little more self-care?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                Explore body, hair and self-care favorites for routines that
                feel a little more special.
              </p>
            </div>

            <Link
              href="/self-care"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-900 transition hover:-translate-y-1"
            >
              Explore Self-Care →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE NAVIGATION */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3 sm:items-center">
          <Link
            href="/beauty-guide/04"
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
            href="/beauty-guide/06"
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