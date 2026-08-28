import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";

const categories = [
  {
    title: "Body Care",
    description: "Lotions, oils, scrubs & everyday body essentials",
    symbol: "♡",
  },
  {
    title: "Hair Care",
    description: "Shampoo, masks, treatments & styling favorites",
    symbol: "⌁",
  },
  {
    title: "Fragrance",
    description: "Scents, body mists & little luxuries",
    symbol: "✦",
  },
  {
    title: "Bath & Shower",
    description: "Cleansers, bath oils & relaxing rituals",
    symbol: "◌",
  },
  {
    title: "Hands & Feet",
    description: "Creams, treatments & simple care essentials",
    symbol: "◇",
  },
  {
    title: "Beauty Tools",
    description: "Accessories that make your routine easier",
    symbol: "☼",
  },
];

const rituals = [
  {
    title: "Slow Morning",
    description:
      "Simple body care, soft fragrance and an easy routine to start the day feeling polished.",
    image: "/images/slow-morning.png",
  },
  {
    title: "Everything Shower",
    description:
      "Hair, body and skincare favorites for when you want the full self-care ritual.",
    image: "/images/everything-shower.png",
  },
  {
    title: "Wind Down",
    description:
      "Comforting textures and relaxing products for a calm end-of-day routine.",
    image: "/images/wind-down.png",
  },
];

const steps = [
  {
    number: "01",
    title: "Cleanse",
    description:
      "Choose gentle body and hair cleansers that fit your routine and preferences.",
  },
  {
    number: "02",
    title: "Treat",
    description:
      "Add masks, oils, scrubs or targeted treatments where they actually help.",
  },
  {
    number: "03",
    title: "Moisturize",
    description:
      "Lock in comfort with body lotions, creams and nourishing hair care.",
  },
  {
    number: "04",
    title: "Finish",
    description:
      "Add fragrance or a small ritual that makes your routine feel more personal.",
  },
];

export default function SelfCarePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#eee7e1]">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-white/50 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#cbb7ab]/30 blur-3xl sm:h-80 sm:w-80" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              The Self-Care Edit
            </p>

            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Little rituals,{" "}
              <span className="italic text-[#aa8778]">
                big difference.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
              Body care, hair care, fragrance and everyday rituals curated to
              make your routine feel a little more intentional.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#self-care-categories"
                className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                Explore Self-Care ↓
              </a>

              <Link
                href="/picks"
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/40 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                Lizzy&apos;s Picks
              </Link>
            </div>
          </div>

          {/* Self-Care Hero Image */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[36px] bg-[#d8c7bd] opacity-30 blur-3xl sm:-inset-7" />

              <div className="relative overflow-hidden rounded-[28px] shadow-xl sm:rounded-[36px]">
                <Image
                  src="/images/skincare-hero-page.png"
                  alt="Self-care products curated by The Lizzy Edit"
                  width={1536}
                  height={1024}
                  priority
                  quality={95}
                  className="h-auto w-full object-contain"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
              </div>

              <div className="absolute -bottom-4 left-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">
                Your little reset ♡
              </div>
            </div>
          </div>
     
      </section>

      {/* CATEGORIES */}
      <section
        id="self-care-categories"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Shop by category
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Make time for{" "}
            <span className="italic text-[#aa8778]">
              yourself.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
            Explore body, hair and wellness-inspired beauty picks designed to
            make everyday care feel a little more special.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href="/picks"
              className="group relative min-h-[190px] overflow-hidden rounded-[24px] border border-stone-200 bg-white p-5 transition duration-500 hover:-translate-y-2 hover:shadow-lg sm:min-h-[220px] sm:p-6"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e5d8cf] opacity-65 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative flex h-full flex-col justify-between">
                <span className="text-2xl text-[#aa8778]">
                  {category.symbol}
                </span>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-stone-500 sm:text-sm">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-block text-sm transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RITUALS */}
      <section className="bg-[#f4eee9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Self-care inspiration
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Choose your{" "}
              <span className="italic text-[#aa8778]">
                ritual.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {rituals.map((ritual) => (
              <article
                key={ritual.title}
                className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={ritual.image}
                    alt={`${ritual.title} self-care ritual`}
                    fill
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl">
                    {ritual.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {ritual.description}
                  </p>

                  <Link
                    href="/picks"
                    className="mt-5 inline-flex text-[10px] font-medium uppercase tracking-[0.15em]"
                  >
                    Explore products →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Lizzy&apos;s Self-Care Guide
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Self-care can be{" "}
              <span className="italic text-[#aa8778]">
                simple.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              It doesn&apos;t need to be a huge routine. A few products you
              genuinely enjoy using can make everyday care feel much better.
            </p>

            <Link
              href="/beauty-guide"
              className="mt-7 inline-flex min-h-12 items-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-stone-800"
            >
              Read Beauty Guide →
            </Link>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_160px_1fr] sm:items-center"
              >
                <span className="font-serif text-xl text-[#aa8778]">
                  {step.number}
                </span>

                <h3 className="font-serif text-2xl">
                  {step.title}
                </h3>

                <p className="col-start-2 text-sm leading-6 text-stone-500 sm:col-start-auto">
                  {step.description}
                </p>
              </div>
            ))}
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