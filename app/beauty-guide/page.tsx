import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";

const guides = [
  {
    category: "Skincare",
    title: "How to Build a Simple Skincare Routine",
    description:
      "A practical guide to cleanser, treatment, moisturizer and SPF without overcomplicating your routine.",
    image: "/images/1.png",
    href: "/beauty-guide/01",
  },
  {
    category: "Makeup",
    title: "Everyday Makeup That Still Looks Like You",
    description:
      "Simple product categories and techniques for a polished everyday look.",
    image: "/images/2.png",
    href: "/beauty-guide/02",
  },
  {
    category: "Skincare",
    title: "Dry vs. Dehydrated Skin",
    description:
      "Why they are not exactly the same and what to look for when choosing your routine.",
    image: "/images/3.png",
    href: "/beauty-guide/03",
  },
  {
    category: "Makeup",
    title: "How to Choose Your Foundation Finish",
    description:
      "Natural, matte, radiant or skin-like? Start with the finish you actually enjoy wearing.",
    image: "/images/4.png",
    href: "/beauty-guide/04",
  },
  {
    category: "Self-Care",
    title: "The Everything Shower, Simplified",
    description:
      "A realistic approach to hair, body and skincare when you want a little extra self-care.",
    image: "/images/5.png",
    href: "/beauty-guide/05",
  },
  {
    category: "Beauty Tips",
    title: "When Is a Beauty Product Worth the Splurge?",
    description:
      "A Beauty Advisor's approach to deciding where to save and where spending more may make sense.",
    image: "/images/6.png",
    href: "/beauty-guide/06",
  },
];

const quickTips = [
  "Introduce new skincare products gradually.",
  "SPF is one of the most important steps in a morning skincare routine.",
  "Choose makeup based on the finish you enjoy, not just what is trending.",
  "Your routine does not need to be long to be effective.",
];

export default function BeautyGuidePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-white/50 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
            The Beauty Guide
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Beauty advice, made{" "}
              <span className="italic text-[#c78f86]">
                simpler.
              </span>
            </h1>

            <p className="max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              Straightforward beauty guides, practical tips and product
              education from a Beauty Advisor&apos;s perspective.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED GUIDE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid overflow-hidden rounded-[30px] border border-stone-200 bg-white lg:grid-cols-2">
          
          {/* IMAGE */}
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px] lg:min-h-[520px]">
            <Image
              src="/images/beauty-finds.png"
              alt="Simple skincare routine essentials"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Featured • Skincare
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              How to Build a Simple Skincare Routine
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
              Skincare can feel overwhelming when every product seems
              essential. Start with the basics, understand what your skin needs
              and build from there.
            </p>

            <Link
              href="/beauty-guide/01"
              className="mt-7 inline-flex min-h-12 self-start items-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-1 hover:bg-stone-800"
            >
              Read Full Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Learn with Lizzy
            </p>

            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
              Beauty{" "}
              <span className="italic text-[#c78f86]">
                guides.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group overflow-hidden rounded-[26px] border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                  {guide.category}
                </p>

                <h3 className="mt-3 font-serif text-2xl leading-tight">
                  {guide.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {guide.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em]">
                  Read guide

                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUICK TIPS */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
            
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                Beauty Notes
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                A few things I&apos;d tell a{" "}
                <span className="italic text-[#c78f86]">
                  friend.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                Beauty doesn&apos;t need to feel intimidating. A little product
                knowledge can make shopping much easier.
              </p>
            </div>

            <div className="divide-y divide-stone-300 border-y border-stone-300">
              {quickTips.map((tip, index) => (
                <div
                  key={tip}
                  className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_1fr] sm:items-center"
                >
                  <span className="font-serif text-xl text-[#c78f86]">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-6 text-stone-700 sm:text-base">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Explore The Edit
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            What would you like to{" "}
            <span className="italic text-[#c78f86]">
              explore?
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          
          {/* SKINCARE */}
          <Link
            href="/skincare"
            className="group rounded-[26px] bg-[#efe0da] p-7 transition duration-500 hover:-translate-y-2"
          >
            <span className="text-2xl">
              ◌
            </span>

            <h3 className="mt-10 font-serif text-3xl">
              Skincare
            </h3>

            <span className="mt-3 inline-flex items-center gap-2 text-sm">
              Explore

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>

          {/* MAKEUP */}
          <Link
            href="/makeup"
            className="group rounded-[26px] bg-[#efd9d7] p-7 transition duration-500 hover:-translate-y-2"
          >
            <span className="text-2xl">
              ✦
            </span>

            <h3 className="mt-10 font-serif text-3xl">
              Makeup
            </h3>

            <span className="mt-3 inline-flex items-center gap-2 text-sm">
              Explore

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>

          {/* SELF CARE */}
          <Link
            href="/self-care"
            className="group rounded-[26px] bg-[#e8dfd9] p-7 transition duration-500 hover:-translate-y-2"
          >
            <span className="text-2xl">
              ♡
            </span>

            <h3 className="mt-10 font-serif text-3xl">
              Self-Care
            </h3>

            <span className="mt-3 inline-flex items-center gap-2 text-sm">
              Explore

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative overflow-hidden rounded-[30px] bg-[#211d1b] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#c78f86] opacity-25 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
                The Lizzy List
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">
                Prefer to skip the research?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                Browse my curated beauty picks and start from products I think
                are worth considering.
              </p>
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