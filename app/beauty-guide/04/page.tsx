import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

// =================================
// TYPES
// =================================

type FinishItem = {
  number: string;
  title: string;
  description: string;
  note: string;
};

type ComparisonItem = {
  eyebrow: string;
  title: string;
  description: string;
};

type GuideContent = {
  hero: {
    backText: string;
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    description: string;
    image: string;
    imageAlt: string;
  };

  intro: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    paragraphs: string[];
  };

  finishes: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    noteLabel: string;
    items: FinishItem[];
  };

  comparison: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    items: ComparisonItem[];
  };

  coverage: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    paragraphs: string[];
  };

  beforeFoundation: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  afterFoundation: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  beautyNotes: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    items: string[];
  };

  finalNote: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    description: string;
  };

  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };

  navigation: {
    previousText: string;
    previousLink: string;
    allGuidesText: string;
    allGuidesLink: string;
    nextGuideText: string;
    nextGuideLink: string;
  };
};

// =================================
// FALLBACK CONTENT
// =================================

const fallbackContent: GuideContent = {
  hero: {
    backText: "← Beauty Guide",
    eyebrow: "Makeup • Guide 04",
    titleBefore: "How to Choose Your",
    highlight: "Foundation Finish",
    description:
      "Natural, matte, radiant or skin-like? Choosing foundation becomes much easier when you start with the finish you actually enjoy seeing on your skin.",
    image: "/images/4.png",
    imageAlt: "Foundation and complexion makeup products",
  },

  intro: {
    eyebrow: "Start with the finish",
    titleBefore: "How do you want your skin to",
    highlight: "look?",
    paragraphs: [
      "Foundation shopping can feel confusing because formulas are often described by coverage, finish, wear time and skin type all at once.",
      "A simpler place to begin is with the final look. Do you like your complexion to look soft and matte, fresh and luminous or almost like you are not wearing foundation at all?",
      "Once you know the finish you enjoy, it becomes much easier to narrow down the options.",
    ],
  },

  finishes: {
    eyebrow: "Foundation finishes",
    titleBefore: "Find the look that feels",
    highlight: "most like you.",
    noteLabel: "Lizzy's note",
    items: [
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
    ],
  },

  comparison: {
    eyebrow: "Quick comparison",
    titleBefore: "What kind of result are you",
    highlight: "looking for?",
    items: [
      {
        eyebrow: "Natural",
        title: "Balanced",
        description:
          "Not too matte and not too luminous.",
      },
      {
        eyebrow: "Matte",
        title: "Polished",
        description:
          "Less visible shine with a smoother-looking finish.",
      },
      {
        eyebrow: "Radiant",
        title: "Luminous",
        description:
          "Fresh-looking skin with more visible glow.",
      },
      {
        eyebrow: "Skin-Like",
        title: "Effortless",
        description:
          "Lightweight coverage that allows skin to look like skin.",
      },
    ],
  },

  coverage: {
    eyebrow: "Good to know",
    titleBefore: "Finish and coverage are",
    highlight: "not the same thing.",
    paragraphs: [
      "Coverage tells you how much of your natural complexion remains visible. Finish describes how the foundation looks once it is on your skin.",
      "That means you can find a lightweight foundation with a matte finish or a fuller-coverage foundation with a radiant finish.",
      "Thinking about those two features separately can make comparing foundations much easier.",
    ],
  },

  beforeFoundation: {
    eyebrow: "Before Foundation",
    title: "Prep can change the finish.",
    description:
      "Hydrating skincare underneath can make foundation look fresher, while mattifying products can reduce shine in specific areas.",
    items: [
      "Moisturizer",
      "SPF",
      "Primer",
    ],
  },

  afterFoundation: {
    eyebrow: "After Foundation",
    title: "Adjust where you need it.",
    description:
      "You do not have to change the entire finish of your face. Powder only the areas where you want less shine and leave the rest looking fresh.",
    items: [
      "Powder",
      "Setting Spray",
      "Blotting",
    ],
  },

  beautyNotes: {
    eyebrow: "Beauty Notes",
    titleBefore: "A few things worth",
    highlight: "remembering.",
    items: [
      "Finish and coverage are two different things.",
      "Your preferred foundation may change with the season.",
      "Skin preparation can change how a foundation looks.",
      "The finish you enjoy wearing matters more than what is currently trending.",
    ],
  },

  finalNote: {
    eyebrow: "Lizzy's take",
    titleBefore:
      "Choose the foundation you will actually",
    highlight: "enjoy wearing.",
    description:
      "Skin type can help guide your choices, but it does not have to decide them for you. If you have oily skin and love a radiant finish, you can still wear one. The same goes for dry skin and matte foundation. Makeup is also about preference.",
  },

  cta: {
    eyebrow: "The Lizzy Edit",
    title: "Ready to explore makeup picks?",
    description:
      "Browse makeup favorites and discover complexion products for different finishes and everyday looks.",
    buttonText: "Explore Makeup →",
    buttonLink: "/makeup",
  },

  navigation: {
    previousText: "← Previous Guide",
    previousLink: "/beauty-guide/03",
    allGuidesText: "All Beauty Guides",
    allGuidesLink: "/beauty-guide",
    nextGuideText: "Next Guide",
    nextGuideLink: "/beauty-guide/05",
  },
};

// =================================
// PAGE
// =================================

export const metadata: Metadata = {
  title: "How to Choose Your Foundation Finish",

  description:
    "Learn how to choose between natural, matte, radiant and skin-like foundation finishes, plus how coverage and skin prep affect the final look.",

  alternates: {
    canonical: "/beauty-guide/04",
  },

  openGraph: {
    title:
      "How to Choose Your Foundation Finish | The Lizzy Edit",

    description:
      "Learn how to choose between natural, matte, radiant and skin-like foundation finishes, plus how coverage and skin prep affect the final look.",

    url: "/beauty-guide/04",

    type: "article",

    images: [
      {
        url: "/images/4.png",
        alt: "Foundation and complexion makeup products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "How to Choose Your Foundation Finish | The Lizzy Edit",

    description:
      "Learn how to choose between natural, matte, radiant and skin-like foundation finishes, plus how coverage and skin prep affect the final look.",

    images: ["/images/4.png"],
  },
};

export default async function FoundationFinishPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide-04")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE 04 CONTENT LOAD ERROR:",
      error,
    );
  }

  const savedContent =
    (data?.content ?? {}) as Partial<GuideContent>;

  // =================================
  // MERGE CMS + FALLBACK
  // =================================

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const intro = {
    ...fallbackContent.intro,
    ...(savedContent.intro ?? {}),
    paragraphs:
      savedContent.intro?.paragraphs?.length
        ? savedContent.intro.paragraphs
        : fallbackContent.intro.paragraphs,
  };

  const finishes = {
    ...fallbackContent.finishes,
    ...(savedContent.finishes ?? {}),
    items:
      savedContent.finishes?.items?.length
        ? savedContent.finishes.items
        : fallbackContent.finishes.items,
  };

  const comparison = {
    ...fallbackContent.comparison,
    ...(savedContent.comparison ?? {}),
    items:
      savedContent.comparison?.items?.length
        ? savedContent.comparison.items
        : fallbackContent.comparison.items,
  };

  const coverage = {
    ...fallbackContent.coverage,
    ...(savedContent.coverage ?? {}),
    paragraphs:
      savedContent.coverage?.paragraphs?.length
        ? savedContent.coverage.paragraphs
        : fallbackContent.coverage.paragraphs,
  };

  const beforeFoundation = {
    ...fallbackContent.beforeFoundation,
    ...(savedContent.beforeFoundation ?? {}),
    items:
      savedContent.beforeFoundation?.items?.length
        ? savedContent.beforeFoundation.items
        : fallbackContent.beforeFoundation.items,
  };

  const afterFoundation = {
    ...fallbackContent.afterFoundation,
    ...(savedContent.afterFoundation ?? {}),
    items:
      savedContent.afterFoundation?.items?.length
        ? savedContent.afterFoundation.items
        : fallbackContent.afterFoundation.items,
  };

  const beautyNotes = {
    ...fallbackContent.beautyNotes,
    ...(savedContent.beautyNotes ?? {}),
    items:
      savedContent.beautyNotes?.items?.length
        ? savedContent.beautyNotes.items
        : fallbackContent.beautyNotes.items,
  };

  const finalNote = {
    ...fallbackContent.finalNote,
    ...(savedContent.finalNote ?? {}),
  };

  const cta = {
    ...fallbackContent.cta,
    ...(savedContent.cta ?? {}),
  };

  const navigation = {
    ...fallbackContent.navigation,
    ...(savedContent.navigation ?? {}),
  };

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
            {hero.backText}
          </Link>

          <div className="mt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {hero.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#ead8d0] shadow-sm sm:rounded-[36px]">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
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
          {intro.eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          {intro.titleBefore}{" "}
          <span className="italic text-[#c78f86]">
            {intro.highlight}
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          {intro.paragraphs.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ),
          )}
        </div>
      </section>

      {/* FINISH TYPES */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {finishes.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {finishes.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {finishes.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {finishes.items.map(
              (finish, index) => (
                <div
                  key={`${finish.number}-${index}`}
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
                        {finishes.noteLabel}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {finish.note}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* QUICK COMPARISON */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {comparison.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            {comparison.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {comparison.highlight}
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comparison.items.map(
            (item, index) => (
              <div
                key={`${item.eyebrow}-${index}`}
                className={`rounded-[26px] p-6 ${
                  index === 0
                    ? "bg-[#efe3dc]"
                    : index === 1
                      ? "bg-[#e6ddd7]"
                      : index === 2
                        ? "bg-[#f2dfd5]"
                        : "bg-[#eee9e4]"
                }`}
              >
                <span
                  className={`text-[9px] font-medium uppercase tracking-[0.18em] ${
                    index === 0 || index === 2
                      ? "text-[#b77b72]"
                      : "text-stone-500"
                  }`}
                >
                  {item.eyebrow}
                </span>

                <h3 className="mt-4 font-serif text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* COVERAGE VS FINISH */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {coverage.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {coverage.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {coverage.highlight}
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            {coverage.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* SKIN PREP */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {/* BEFORE */}
          <div className="rounded-[28px] bg-[#f0dfd8] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {beforeFoundation.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {beforeFoundation.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {beforeFoundation.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {beforeFoundation.items.map(
                (item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* AFTER */}
          <div className="rounded-[28px] bg-[#ebe3de] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {afterFoundation.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {afterFoundation.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {afterFoundation.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {afterFoundation.items.map(
                (item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
                  >
                    {item}
                  </span>
                ),
              )}
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
                {beautyNotes.eyebrow}
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                {beautyNotes.titleBefore}{" "}
                <span className="italic text-[#c78f86]">
                  {beautyNotes.highlight}
                </span>
              </h2>
            </div>

            <div className="divide-y divide-stone-300 border-y border-stone-300">
              {beautyNotes.items.map(
                (item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_1fr]"
                  >
                    <span className="font-serif text-xl text-[#c78f86]">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-7 text-stone-700 sm:text-base">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {finalNote.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            {finalNote.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {finalNote.highlight}
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {finalNote.description}
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
                {cta.eyebrow}
              </p>

              <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
                {cta.title}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">
                {cta.description}
              </p>
            </div>

            <Link
              href={cta.buttonLink}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-900 transition hover:-translate-y-1"
            >
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE NAVIGATION */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3 sm:items-center">
          <Link
            href={navigation.previousLink}
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            {navigation.previousText}
          </Link>

          <Link
            href={navigation.allGuidesLink}
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900 sm:text-center"
          >
            {navigation.allGuidesText}
          </Link>

          <Link
            href={navigation.nextGuideLink}
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] sm:justify-self-end"
          >
            {navigation.nextGuideText}

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