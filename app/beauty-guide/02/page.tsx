import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const makeupSteps = [
  {
    number: "01",
    title: "Start with Skin",
    description:
      "Use a lightweight base that evens out your complexion without covering everything. Skin tints, light foundations and strategic concealer can help keep the finish natural.",
    note:
      "You do not need full coverage everywhere. Apply product where you actually want it.",
  },
  {
    number: "02",
    title: "Add Soft Color",
    description:
      "A little blush can bring life back into the face and make everyday makeup feel fresh and polished.",
    note:
      "Cream and liquid blushes can be especially easy when you want a soft, skin-like finish.",
  },
  {
    number: "03",
    title: "Define the Eyes",
    description:
      "Mascara, softly defined brows and a neutral shadow can create definition without making your makeup feel heavy.",
    note:
      "You can skip eyeshadow completely and still create a polished look with brows and mascara.",
  },
  {
    number: "04",
    title: "Finish with Lips",
    description:
      "Choose a lip product that feels comfortable enough to wear throughout your day, whether that is a balm, gloss, tint or lipstick.",
    note:
      "A shade close to your natural lip color is one of the easiest options for everyday makeup.",
  },
];

const reminders = [
  "Your skin does not need to look completely flawless to look polished.",
  "Choose textures you actually enjoy wearing.",
  "You do not need every makeup category in one routine.",
  "The best everyday makeup is the makeup you can recreate easily.",
];

export default function EverydayMakeupPage() {
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
              Makeup • Guide 02
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Everyday Makeup That Still{" "}
              <span className="italic text-[#c78f86]">
                Looks Like You
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              Everyday makeup does not have to mean covering your skin or
              creating a completely different face. A few well-chosen products
              can help you look polished while still feeling like yourself.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src="/images/2.png"
            alt="Everyday makeup essentials"
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
          Everyday beauty
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          The goal is polished, not{" "}
          <span className="italic text-[#c78f86]">
            perfect.
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            Everyday makeup should work with your routine, not make your
            morning harder.
          </p>

          <p>
            Instead of thinking about how many products you need, think about
            what you actually want your makeup to do. Maybe that is evening out
            your complexion, adding a little color or defining your eyes.
          </p>

          <p>
            Once you know the effect you want, the routine becomes much easier
            to build.
          </p>
        </div>
      </section>

      {/* MAKEUP STEPS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              The routine
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Build your look in{" "}
              <span className="italic text-[#c78f86]">
                simple layers.
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {makeupSteps.map((step) => (
              <div
                key={step.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-3xl text-[#c78f86]">
                  {step.number}
                </span>

                <div>
                  <h3 className="font-serif text-3xl">{step.title}</h3>

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

      {/* QUICK ROUTINES */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#f0dfd8] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Five-Minute Makeup
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When you want something quick.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Keep only the products that make the biggest difference for you.
              This might be concealer, blush, mascara and a lip product.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Concealer", "Blush", "Mascara", "Lip"].map((item) => (
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
              Polished Everyday
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When you have a little more time.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Add a lightweight base, brows and a simple eye product while
              keeping the overall finish soft and wearable.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Skin Tint",
                "Concealer",
                "Blush",
                "Brows",
                "Mascara",
                "Lip",
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
                Everyday makeup should feel{" "}
                <span className="italic text-[#c78f86]">
                  easy.
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

      {/* PERSONAL STYLE */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            One more thing
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            There is no single definition of{" "}
            <span className="italic text-[#c78f86]">
              everyday makeup.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            For one person, everyday makeup might be mascara and lip balm. For
            someone else, it might include foundation, bronzer and eyeliner.
            The best routine is the one that feels comfortable, realistic and
            enjoyable for you.
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
                Browse makeup favorites for easy, wearable looks and find
                products that fit your everyday routine.
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
            href="/beauty-guide/01"
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
            href="/beauty-guide/03"
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