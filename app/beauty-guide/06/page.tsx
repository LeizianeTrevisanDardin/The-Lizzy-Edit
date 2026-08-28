import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const questions = [
  {
    number: "01",
    title: "Will You Use It Often?",
    description:
      "A product you reach for every day can sometimes justify a higher price more easily than something you only use occasionally.",
    note:
      "Cost per use can be more useful than looking at the price tag alone.",
  },
  {
    number: "02",
    title: "Does the Formula Feel Special?",
    description:
      "Sometimes you are paying for a texture, finish, ingredient combination or performance that is genuinely difficult to find at a lower price.",
    note:
      "Luxury packaging alone is not always a reason to spend more.",
  },
  {
    number: "03",
    title: "Is There a Good Alternative?",
    description:
      "If a more affordable product gives you the same result and you enjoy using it, there may be no reason to spend extra.",
    note:
      "A dupe does not need to be identical to be a better value for your routine.",
  },
  {
    number: "04",
    title: "Does It Fit Your Priorities?",
    description:
      "Some people prefer to spend more on skincare and save on makeup. Others care more about complexion products, fragrance or hair care.",
    note:
      "The right place to splurge depends on what matters most to you.",
  },
];

const reminders = [
  "Higher price does not automatically mean better performance.",
  "Think about how often you will realistically use the product.",
  "Spend more where the experience or formula genuinely matters to you.",
  "Save where affordable options already give you the result you want.",
];

export default function WorthTheSplurgePage() {
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
              Beauty Tips • Guide 06
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              When Is a Beauty Product{" "}
              <span className="italic text-[#c78f86]">
                Worth the Splurge?
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              A higher price does not always mean a better product. The real
              question is whether the formula, experience and performance are
              worth paying more for in your routine.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src="/images/6.png"
            alt="Beauty products and shopping notes"
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
          Before you buy
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Ask whether you are paying for{" "}
          <span className="italic text-[#c78f86]">
            real value.
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            Beauty can be one of those categories where two products that look
            almost identical can have completely different prices.
          </p>

          <p>
            Sometimes the more expensive option really does offer something
            special. Other times, a beautifully marketed product performs almost
            exactly like a much more affordable alternative.
          </p>

          <p>
            Before spending more, it helps to think about what you are actually
            getting for the extra money.
          </p>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              The checklist
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Four questions to ask before you{" "}
              <span className="italic text-[#c78f86]">
                splurge.
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {questions.map((item) => (
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

      {/* SAVE VS SPLURGE */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            Save or splurge?
          </p>

          <h2 className="mt-3 max-w-3xl font-serif text-4xl sm:text-5xl">
            Think about where the extra money makes a{" "}
            <span className="italic text-[#c78f86]">
              difference to you.
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Worth Considering a Splurge
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When performance matters.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Spending more can make sense when you notice a meaningful
              difference in texture, wear, formulation or how often you use the
              product.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Daily SPF",
                "Foundation",
                "Signature Fragrance",
                "Treatment",
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
              Easy Places to Save
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              When affordable works beautifully.
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              If you already love an affordable formula and it gives you the
              result you want, there is no need to replace it just because a
              luxury version exists.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Mascara",
                "Lip Products",
                "Body Wash",
                "Basic Cleanser",
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

      {/* COST PER USE */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            Another way to think about it
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Consider the{" "}
            <span className="italic text-[#c78f86]">
              cost per use.
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            <p>
              A $70 product you use almost every day may offer more value to you
              than a $25 product you use twice and forget about.
            </p>

            <p>
              That does not mean expensive products are automatically a better
              purchase. It simply means price makes more sense when you look at
              it alongside how much use and enjoyment you actually get from the
              product.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/70 p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                Example
              </p>

              <p className="mt-3 font-serif text-3xl">
                $70 ÷ 100 uses
              </p>

              <p className="mt-2 text-sm text-stone-600">
                About $0.70 per use
              </p>
            </div>

            <div className="rounded-[24px] bg-white/70 p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                Compare
              </p>

              <p className="mt-3 font-serif text-3xl">
                $25 ÷ 5 uses
              </p>

              <p className="mt-2 text-sm text-stone-600">
                About $5.00 per use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU PAY FOR */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            What are you paying for?
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Look beyond the{" "}
            <span className="italic text-[#c78f86]">
              packaging.
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[26px] border border-stone-200 bg-white p-6">
            <span className="font-serif text-2xl text-[#c78f86]">01</span>

            <h3 className="mt-5 font-serif text-2xl">
              Formula
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Ingredients, texture and how the formula performs.
            </p>
          </div>

          <div className="rounded-[26px] border border-stone-200 bg-white p-6">
            <span className="font-serif text-2xl text-[#c78f86]">02</span>

            <h3 className="mt-5 font-serif text-2xl">
              Experience
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              How enjoyable and easy the product is to use.
            </p>
          </div>

          <div className="rounded-[26px] border border-stone-200 bg-white p-6">
            <span className="font-serif text-2xl text-[#c78f86]">03</span>

            <h3 className="mt-5 font-serif text-2xl">
              Performance
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Wear time, finish and whether it does what you need.
            </p>
          </div>

          <div className="rounded-[26px] border border-stone-200 bg-white p-6">
            <span className="font-serif text-2xl text-[#c78f86]">04</span>

            <h3 className="mt-5 font-serif text-2xl">
              Packaging
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Beautiful packaging is lovely, but it should not be the only value.
            </p>
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
                Spend with a little more{" "}
                <span className="italic text-[#c78f86]">
                  intention.
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
            Splurge where it makes your routine{" "}
            <span className="italic text-[#c78f86]">
              better.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            There is nothing wrong with loving a luxury beauty product. There is
            also nothing wrong with choosing the $12 option when it works just
            as well for you. The goal is not to always save or always splurge —
            it is to know why you are spending more.
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
                Want to see what made my list?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                Browse my curated beauty picks and discover products I think are
                worth considering.
              </p>
            </div>

            <Link
              href="/picks"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-900 transition hover:-translate-y-1"
            >
              See Lizzy&apos;s Picks →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE NAVIGATION */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3 sm:items-center">
          <Link
            href="/beauty-guide/05"
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
            href="/picks"
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] sm:justify-self-end"
          >
            Lizzy&apos;s Picks

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