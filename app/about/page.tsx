import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";

const values = [
  {
    title: "Curated, not overwhelming",
    description:
      "Beauty should feel exciting, not confusing. I focus on products and routines that make sense in real life.",
    symbol: "✦",
  },
  {
    title: "Beauty with intention",
    description:
      "I care about how a product fits into your routine, not just whether it is trending.",
    symbol: "♡",
  },
  {
    title: "Practical recommendations",
    description:
      "My goal is to help you discover products worth considering without making beauty feel complicated.",
    symbol: "◌",
  },
];

const editSections = [
  {
    title: "Skincare",
    description:
      "Routine basics, skin concerns, product education and curated skincare finds.",
    href: "/skincare",
  },
  {
    title: "Makeup",
    description:
      "Everyday makeup, complexion, lips, eyes and products that make getting ready easier.",
    href: "/makeup",
  },
  {
    title: "Self-Care",
    description:
      "Body care, hair care, fragrance and small rituals that make everyday routines feel better.",
    href: "/self-care",
  },
  {
    title: "Fragrance",
    description:
      "Perfumes for everyday wear, special occasions and different moods — from soft skin scents to statement fragrances.",
    href: "/fragrances",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/50 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_.85fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              About The Lizzy Edit
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="italic text-[#c78f86]">
                Lizzy.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              I created The Lizzy Edit as a space to make beauty feel a little
              easier — with skincare, makeup and self-care recommendations
              curated through my perspective as a Beauty Advisor.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/picks"
                className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                Explore My Picks →
              </Link>

              <Link
                href="/beauty-guide"
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/40 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                Read Beauty Guide
              </Link>
            </div>
          </div>

          {/* LIZZY PHOTO */}
            <div className="relative">
              <div className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-[#d6b7ad]/40 blur-3xl" />

              <div className="relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-[34px] border border-white/60 bg-[#ead7d0] shadow-xl">
                <Image
                  src="/images/Liz.png"
                  alt="Lizzy Trevisan"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-[center-50%] scale-[1.06]"
                />

                {/* subtle overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

                {/* bottom label */}
                <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/30 bg-white/20 p-4 shadow-sm backdrop-blur-md">
                  <p className="text-xs leading-5 text-white">
                    Beauty Advisor • Beauty Lover • Curator
                  </p>
                </div>
              </div>
              </div>
            </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              My Story
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Beauty should feel{" "}
              <span className="italic text-[#c78f86]">
                personal.
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-stone-600 sm:text-base">
            <p>
              I have always loved the little details of beauty — discovering a
              great skincare product, finding the perfect everyday makeup
              staple or recommending something that becomes someone&apos;s new
              favorite.
            </p>

            <p>
              Working in beauty made me realize how easy it is to feel
              overwhelmed by products, ingredients, trends and endless choices.
              The Lizzy Edit is my way of simplifying that experience.
            </p>

            <p>
              This space is about thoughtful recommendations, approachable
              beauty education and products that can fit into real routines.
              You do not need everything. Sometimes you just need the right
              few things for you.
            </p>

            <p className="font-serif text-2xl italic leading-relaxed text-[#9f6f68] sm:text-3xl">
              Beauty, curated the Lizzy way.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              The Lizzy Approach
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              What you can expect{" "}
              <span className="italic text-[#c78f86]">
                here.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[28px] border border-white/70 bg-white/65 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg sm:p-8"
              >
                <span className="text-2xl text-[#c78f86]">
                  {value.symbol}
                </span>

                <h3 className="mt-10 font-serif text-3xl">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Inside The Edit
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              A little bit of{" "}
              <span className="italic text-[#c78f86]">
                everything beauty.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              Browse by category, explore beauty guides or go straight to my
              curated product picks.
            </p>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {editSections.map((section, index) => (
              <Link
                key={section.title}
                href={section.href}
                className="group grid gap-4 py-7 transition sm:grid-cols-[60px_160px_1fr_30px] sm:items-center"
              >
                <span className="font-serif text-xl text-[#c78f86]">
                  0{index + 1}
                </span>

                <h3 className="font-serif text-2xl">
                  {section.title}
                </h3>

                <p className="text-sm leading-6 text-stone-500">
                  {section.description}
                </p>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLOSURE NOTE */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr] lg:items-start">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                Transparency
              </p>

              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                A note about recommendations.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-stone-600 sm:text-base">
                Some links on The Lizzy Edit may be affiliate links. That means
                I may earn a commission from qualifying purchases, at no extra
                cost to you. Affiliate relationships do not change the goal of
                this site: sharing useful beauty recommendations and resources.
              </p>

              <Link
                href="/disclosure"
                className="mt-5 inline-flex text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
              >
                Read Affiliate Disclosure →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
            <PicksCTA
              eyebrow="Lizzy's Self-Care Picks"
              title="Find the little things that make your routine better."
            />

      <Footer />
    </main>
  );
}