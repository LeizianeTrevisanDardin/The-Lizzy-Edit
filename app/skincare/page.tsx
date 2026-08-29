import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";
import ExploreCard from "@/components/ExploreCard";

const concerns = [
  {
    title: "Dryness",
    description: "Hydration, barrier support & comfort",
    symbol: "◌",
    filter: "Dryness",
  },
  {
    title: "Sensitivity",
    description: "Gentle care for easily irritated skin",
    symbol: "♡",
    filter: "Sensitivity",
  },
  {
    title: "Breakouts",
    description: "Balance, clarify & support your skin",
    symbol: "✦",
    filter: "Breakouts",
  },
  {
    title: "Fine Lines",
    description: "Smooth, hydrate & support renewal",
    symbol: "⌁",
    filter: "Fine Lines",
  },
  {
    title: "Dark Spots",
    description: "Brighten & improve uneven-looking tone",
    symbol: "◇",
    filter: "Dark Spots",
  },
  {
    title: "Dullness",
    description: "Bring back glow & radiance",
    symbol: "☼",
    filter: "Dullness",
  },
];

const skinTypes = [
  {
    title: "Dry",
    description: "Comforting hydration and barrier-focused care.",
    symbol: "D",
    filter: "Dry",
  },
  {
    title: "Oily",
    description: "Lightweight hydration and balanced formulas.",
    symbol: "O",
    filter: "Oily",
  },
  {
    title: "Combination",
    description: "Flexible care for both dry and oily areas.",
    symbol: "C",
    filter: "Combination",
  },
  {
    title: "Sensitive",
    description: "Gentle formulas with a simpler approach.",
    symbol: "S",
    filter: "Sensitive",
  },
];

const routineSteps = [
  {
    number: "01",
    title: "Cleanse",
    description: "Start with a cleanser suited to your skin and routine.",
  },
  {
    number: "02",
    title: "Treat",
    description: "Choose targeted products based on your main concern.",
  },
  {
    number: "03",
    title: "Moisturize",
    description: "Support hydration and your skin barrier.",
  },
  {
    number: "04",
    title: "Protect",
    description: "Finish your morning routine with sunscreen.",
  },
];

export default function SkincarePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f4e8e2]">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white/60 blur-3xl sm:h-96 sm:w-96" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              The Skincare Edit
            </p>

            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Skincare made{" "}
              <span className="italic text-[#c78f86]">
                simpler.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
              Explore skincare by concern, skin type and routine — with
              practical recommendations curated through a Beauty
              Advisor&apos;s perspective.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#concerns"
                className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                Find Your Concern ↓
              </a>

              <Link
                href="/picks"
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/50 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                Lizzy&apos;s Picks
              </Link>
            </div>
          </div>

          {/* Skincare Hero Image */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-[#e5d0c7] opacity-30 blur-3xl sm:-inset-7" />

            <div className="relative overflow-hidden rounded-[28px] shadow-xl sm:rounded-[36px]">
              <Image
                src="/images/skincare-hero.png"
                alt="Skincare products curated by The Lizzy Edit"
                width={1536}
                height={1024}
                priority
                quality={95}
                className="h-auto w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
            </div>

            <div className="absolute -bottom-4 left-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">
              Skincare, simplified ✦
            </div>
          </div>
        </div>
      </section>

      {/* CONCERNS */}
      <section
        id="concerns"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Shop by concern
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            What does your skin{" "}
            <span className="italic text-[#c78f86]">
              need?
            </span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-stone-600 sm:text-base">
            Start with what you want to address and explore products designed
            around that goal.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {concerns.map((concern) => (
            <ExploreCard
              key={concern.title}
              title={concern.title}
              description={concern.description}
              symbol={concern.symbol}
              filter={concern.filter}
            />
          ))}
        </div>
      </section>

      {/* SKIN TYPES */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Know your skin
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Shop by{" "}
              <span className="italic text-[#c78f86]">
                skin type.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skinTypes.map((skin) => (
              <ExploreCard
                key={skin.title}
                title={skin.title}
                description={skin.description}
                symbol={skin.symbol}
                filter={skin.filter}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROUTINE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Lizzy&apos;s Guide
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              A simple routine is often a{" "}
              <span className="italic text-[#c78f86]">
                good routine.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              You don&apos;t necessarily need ten different products. Start
              with the essentials and build around what your skin actually
              needs.
            </p>

            <div className="mt-7 flex justify-center lg:justify-start">
              <Link
                href="/beauty-guide"
                className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                Read Beauty Guide →
              </Link>
            </div>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {routineSteps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_160px_1fr] sm:items-center"
              >
                <span className="font-serif text-xl text-[#c78f86]">
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
        eyebrow="Lizzy's Skincare Picks"
        title="Ready to discover products for your routine?"
      />

      <Footer />
    </main>
  );
}