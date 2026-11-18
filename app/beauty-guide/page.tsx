
import type { Metadata } from "next";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TextReveal, {
  RevealWord,
} from "@/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "Beauty Guide | The Lizzy Edit",
  description:
    "Explore beauty guides, skincare routines, makeup tips and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",
  alternates: {
    canonical: "/beauty-guide",
  },
  openGraph: {
    title: "Beauty Guide | The Lizzy Edit",
    description:
      "Discover practical beauty guides and recommendations curated by Lizzy.",
    url: "/beauty-guide",
    type: "website",
  },
};

// =================================
// TYPES
// =================================

type GuideItem = {
  category?: string;
  title?: string;
  description?: string;
  image?: string;
  href?: string;
};

type ExploreItem = {
  title?: string;
  symbol?: string;
  href?: string;
};

type BeautyGuideContent = {
  hero?: {
    eyebrow?: string;
    titleBefore?: string;
    highlight?: string;
    description?: string;
  };

  featured?: {
    image?: string;
    imageAlt?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };

  articles?: {
    eyebrow?: string;
    titleBefore?: string;
    highlight?: string;
    buttonText?: string;
    items?: GuideItem[];
  };

  quickTips?: {
    eyebrow?: string;
    titleBefore?: string;
    highlight?: string;
    description?: string;
    items?: string[];
  };

  explore?: {
    eyebrow?: string;
    titleBefore?: string;
    highlight?: string;
    buttonText?: string;
    items?: ExploreItem[];
  };

  darkCta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };

  cta?: {
    eyebrow?: string;
    title?: string;
    buttonText?: string;
    href?: string;
  };
};

// =================================
// FALLBACK CONTENT
// =================================

const fallbackGuides: GuideItem[] = [
  {
    category: "Skincare",
    title: "How to Build a Simple Skincare Routine",
    description:
      "Learn how to create a simple morning and evening skincare routine.",
    href: "/beauty-guide/01",
  },
  {
    category: "Makeup",
    title: "Everyday Makeup That Still Looks Like You",
    description:
      "Discover an effortless everyday makeup routine.",
    href: "/beauty-guide/02",
  },
  {
    category: "Skincare",
    title: "Dry vs. Dehydrated Skin",
    description:
      "Understand the difference and what your skin may need.",
    href: "/beauty-guide/03",
  },
  {
    category: "Makeup",
    title: "How to Choose Your Foundation Finish",
    description:
      "Explore different foundation finishes and how to choose one.",
    href: "/beauty-guide/04",
  },
  {
    category: "Self-Care",
    title: "The Everything Shower, Simplified",
    description:
      "A little guide to hair care, body care and everyday rituals.",
    href: "/beauty-guide/05",
  },
  {
    category: "Beauty Tips",
    title: "When Is a Beauty Product Worth the Splurge?",
    description:
      "Learn when to save, when to splurge and how to evaluate value.",
    href: "/beauty-guide/06",
  },
];

const fallbackExplore: ExploreItem[] = [
  {
    title: "Skincare",
    symbol: "01",
    href: "/skincare",
  },
  {
    title: "Makeup",
    symbol: "02",
    href: "/makeup",
  },
  {
    title: "Self-Care",
    symbol: "03",
    href: "/self-care",
  },
];

// =================================
// PAGE
// =================================

export default async function BeautyGuidePage() {
  const supabase = await createClient();

  // PUBLIC CONTENT
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE CONTENT LOAD ERROR:",
      error,
    );
  }

  const saved =
    (data?.content ?? {}) as BeautyGuideContent;

  // HERO
  const hero = {
    eyebrow: "THE LIZZY EDIT",
    titleBefore: "A little space for",
    highlight: "everything beauty.",
    description:
      "Discover practical beauty guides, skincare tips, makeup inspiration and little self-care rituals.",
    ...saved.hero,
  };

  // FEATURED
  const featured = {
    eyebrow: "FEATURED GUIDE",
    title: "How to Build a Simple Skincare Routine",
    description:
      "A simple approach to understanding your skin and creating a routine that works for you.",
    buttonText: "Explore Guide →",
    buttonLink: "/beauty-guide/01",
    ...saved.featured,
  };

  // ARTICLES
  const articles = {
    eyebrow: "THE BEAUTY LIBRARY",
    titleBefore: "Beauty knowledge,",
    highlight: "made simple.",
    buttonText: "Read Guide →",
    ...saved.articles,
  };

  const guideItems =
    saved.articles?.items?.length
      ? saved.articles.items
      : fallbackGuides;

  // QUICK TIPS
  const quickTips = {
    eyebrow: "A LITTLE BEAUTY WISDOM",
    titleBefore: "Little things",
    highlight: "worth knowing.",
    description:
      "A few thoughtful reminders to make your beauty routine feel simpler.",
    ...saved.quickTips,
  };

  const tips =
    saved.quickTips?.items?.length
      ? saved.quickTips.items
      : [
          "Consistency matters more than having a complicated skincare routine.",
          "Always consider your skin type when choosing new products.",
          "A good makeup routine starts with well-prepared skin.",
          "Give new skincare products time before judging the results.",
        ];

  // EXPLORE
  const explore = {
    eyebrow: "EXPLORE THE EDIT",
    titleBefore: "A little bit of",
    highlight: "everything.",
    buttonText: "Explore →",
    ...saved.explore,
  };

  const exploreItems =
    saved.explore?.items?.length
      ? saved.explore.items
      : fallbackExplore;

  // DARK CTA
  const darkCta = {
    eyebrow: "THE LIZZY EDIT",
    title: "Beauty should feel like you.",
    description:
      "Discover recommendations, explore new finds and enjoy the little things that make your routine yours.",
    ...saved.darkCta,
  };

  // FINAL CTA
  const cta = {
    eyebrow: "READY TO EXPLORE?",
    title: "Find your next beauty favorite.",
    buttonText: "Explore My Picks →",
    href: "/picks",
    ...saved.cta,
  };

  return (

    <main className="min-h-screen overflow-hidden bg-[#fffaf7] text-[#211d1b]">
      <Header />
      {/* =================================
          HERO
      ================================= */}

      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:py-36">

        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#ead0c8] opacity-30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            <TextReveal>
              {hero.titleBefore.split(" ").map((word, index) => (
                <RevealWord
                  key={`hero-${index}`}
                  text={word}
                />
              ))}
              {" "}
              <RevealWord
                text={hero.highlight}
                className="italic text-[#c78f86]"
              />
            </TextReveal>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
            {hero.description}
          </p>

          <Link
            href="#beauty-guides"
            className="mt-9 inline-flex min-h-12 items-center justify-center bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b77b72]"
          >
            Explore Beauty Guides →
          </Link>

        </div>
      </section>

      {/* =================================
          FEATURED GUIDE
      ================================= */}

      <section className="border-y border-stone-200 bg-[#f4e8e2]">

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">

          {/* IMAGE */}

          <div className="relative overflow-hidden rounded-[28px] bg-[#ead5cf]">

            {featured.image ? (
              <img
                src={featured.image}
                alt={
                  featured.imageAlt ??
                  featured.title
                }
                className="h-full max-h-[520px] min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-[#ead5cf] to-[#d9b5aa] sm:min-h-[420px]">
                <span className="font-serif text-4xl italic text-white/80">
                  The Beauty Guide
                </span>
              </div>
            )}

          </div>

          {/* CONTENT */}

          <div>

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {featured.eyebrow}
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <TextReveal>
              {featured.title.split(" ").map((word, index) => (
                <RevealWord
                  key={`featured-${index}`}
                  text={`${word} `}
                />
              ))}
            </TextReveal>
</h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
              {featured.description}
            </p>

            <Link
              href={featured.buttonLink}
              className="mt-8 inline-flex min-h-12 items-center justify-center border border-[#211d1b] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.16em] transition duration-300 hover:bg-[#211d1b] hover:text-white"
            >
              {featured.buttonText}
            </Link>

          </div>
        </div>
      </section>

      {/* =================================
          BEAUTY GUIDES
      ================================= */}

      <section
        id="beauty-guides"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
      >

        <div className="mb-12 max-w-2xl">

          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {articles.eyebrow}
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <TextReveal>
              {articles.titleBefore.split(" ").map((word, index) => (
                <RevealWord
                  key={`articles-${index}`}
                  text={word}
                />
              ))}
              {" "}
              <RevealWord
                text={articles.highlight}
                className="italic text-[#c78f86]"
              />
            </TextReveal>
          </h2>

        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {guideItems.map((guide, index) => {

            const fallback = fallbackGuides[index];

            const href =
              guide.href &&
              !guide.href.startsWith("/admin")
                ? guide.href
                : fallback?.href ??
                  `/beauty-guide/${String(index + 1).padStart(2, "0")}`;

            return (
              <Link
                key={index}
                href={href}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:border-[#d9b3a8] hover:shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0e2dc]">

                  {guide.image ? (
                    <img
                      src={guide.image}
                      alt={guide.title ?? "Beauty guide"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f3e7e2] to-[#e5cbc2]">
                      <span className="font-serif text-5xl italic text-[#c78f86]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                </div>

                {/* TEXT */}

                <div className="flex flex-1 flex-col p-6">

                  <div className="flex items-center justify-between">

                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                      {guide.category ?? fallback?.category}
                    </p>

                    <span className="font-serif text-xl text-stone-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <h3 className="mt-5 font-serif text-2xl leading-tight transition-colors group-hover:text-[#b77b72]">
                    {guide.title ?? fallback?.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    {guide.description ?? fallback?.description}
                  </p>

                  <span className="mt-auto pt-7 text-[10px] font-medium uppercase tracking-[0.16em]">
                    {articles.buttonText}{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </span>

                </div>

              </Link>
            );
          })}

        </div>
      </section>

      {/* =================================
          BEAUTY NOTES
      ================================= */}

      <section className="border-y border-stone-200 bg-[#f4e8e2]">

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">

          <div>

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {quickTips.eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              <TextReveal>
                {quickTips.titleBefore.split(" ").map((word, index) => (
                  <RevealWord
                    key={`beauty-notes-${index}`}
                    text={`${word} `}
                  />
                ))}

                <RevealWord
                  text={quickTips.highlight}
                  className="italic text-[#c78f86]"
                />
              </TextReveal>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {quickTips.description}
            </p>

          </div>

          <div className="space-y-0">

            {tips.map((tip, index) => (

              <div
                key={index}
                className="flex gap-5 border-b border-stone-300 py-6 first:pt-0 last:border-0"
              >

                <span className="font-serif text-2xl text-[#c78f86]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-7 text-stone-600">
                  {tip}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* =================================
          EXPLORE THE EDIT
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">

        <div className="mb-12">

          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {explore.eyebrow}
          </p>

          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          <TextReveal>
            {explore.titleBefore.split(" ").map((word, index) => (
              <RevealWord
                key={`explore-${index}`}
                text={word}
              />
            ))}
            {" "}
            <RevealWord
              text={explore.highlight}
              className="italic text-[#c78f86]"
            />
          </TextReveal>
        </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {exploreItems.map((item, index) => (

            <Link
              key={index}
              href={item.href ?? "#beauty-guides"}
              className="group flex min-h-[200px] flex-col justify-between border border-stone-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c78f86] hover:bg-[#f4e8e2]"
            >

              <span className="font-serif text-3xl text-[#c78f86]">
                {item.symbol ??
                  String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center justify-between gap-3">

                <h3 className="font-serif text-3xl">
                  {item.title}
                </h3>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>

              </div>

            </Link>

          ))}

        </div>

        <div className="mt-9">
          <Link
            href="/picks"
            className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] transition hover:text-[#b77b72]"
          >
            {explore.buttonText}
            <span>→</span>
          </Link>
        </div>

      </section>

      {/* =================================
          DARK CTA
      ================================= */}

      <section className="bg-[#211d1b] px-5 py-20 text-center text-stone-200 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-3xl">

          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#d6a59a]">
            {darkCta.eyebrow}
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {darkCta.title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
            {darkCta.description}
          </p>

        </div>

      </section>

      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="px-5 py-20 text-center sm:px-8 lg:py-28">

        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
          {cta.eyebrow}
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {cta.title}
        </h2>

        <Link
          href={cta.href}
          className="mt-9 inline-flex min-h-12 items-center justify-center bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b77b72]"
        >
          {cta.buttonText}
        </Link>

      </section>

      <Footer />

    </main>
  );
}
