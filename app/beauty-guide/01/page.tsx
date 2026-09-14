import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

// =================================
// TYPES
// =================================

type RoutineStep = {
  number: string;
  title: string;
  description: string;
  note: string;
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

  routine: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    noteLabel: string;
    steps: RoutineStep[];
  };

  morning: {
    eyebrow: string;
    title: string;
    description: string;
    steps: string[];
  };

  evening: {
    eyebrow: string;
    title: string;
    description: string;
    steps: string[];
  };

  beautyNotes: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    items: string[];
  };

  skinTypeNote: {
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
    eyebrow: "Skincare • Guide 01",
    titleBefore: "How to Build a Simple",
    highlight: "Skincare Routine",
    description:
      "You do not need ten different products to take good care of your skin. A simple routine built around a few essential steps can be easier to follow, easier to understand and much less overwhelming.",
    image: "/images/1.png",
    imageAlt: "Simple skincare routine essentials",
  },

  intro: {
    eyebrow: "Start with the basics",
    titleBefore:
      "Skincare does not have to feel",
    highlight: "complicated.",
    paragraphs: [
      "With so many cleansers, toners, serums, acids, creams and masks available, it is easy to feel like your routine is missing something.",
      "But before adding more products, it helps to create a strong foundation. For most people, that means focusing on cleansing, targeted treatment when needed, moisturizing and daily sun protection.",
      "Once those basics feel comfortable and consistent, you can decide whether your routine actually needs anything else.",
    ],
  },

  routine: {
    eyebrow: "The routine",
    titleBefore: "Four steps are a great",
    highlight: "place to start.",
    noteLabel: "Lizzy's note",

    steps: [
      {
        number: "01",
        title: "Cleanser",
        description:
          "Start with a gentle cleanser that removes makeup, sunscreen and daily buildup without leaving your skin feeling tight.",
        note:
          "Your cleanser should leave your skin feeling comfortable, not squeaky-clean.",
      },
      {
        number: "02",
        title: "Treatment",
        description:
          "This is where you can focus on a specific concern, such as hydration, uneven tone, texture or breakouts.",
        note:
          "You do not need multiple serums at once. One well-chosen treatment can be enough.",
      },
      {
        number: "03",
        title: "Moisturizer",
        description:
          "A moisturizer helps support your skin barrier and keep hydration in. Choose the texture based on what feels best for your skin.",
        note:
          "Lighter gels may feel better on oily skin, while richer creams can be more comfortable for dry skin.",
      },
      {
        number: "04",
        title: "SPF",
        description:
          "In the morning, finish with broad-spectrum sunscreen. This is one of the most important steps in a simple skincare routine.",
        note:
          "Consistency matters more than having a complicated routine.",
      },
    ],
  },

  morning: {
    eyebrow: "Morning",
    title: "Keep it simple.",
    description:
      "Cleanse if your skin needs it, apply your treatment or hydrating product, moisturize and finish with SPF.",
    steps: [
      "Cleanser",
      "Treatment",
      "Moisturizer",
      "SPF",
    ],
  },

  evening: {
    eyebrow: "Evening",
    title: "Focus on cleansing and recovery.",
    description:
      "Remove makeup and sunscreen, use your chosen treatment if appropriate and finish with moisturizer.",
    steps: [
      "Cleanser",
      "Treatment",
      "Moisturizer",
    ],
  },

  beautyNotes: {
    eyebrow: "Beauty Notes",
    titleBefore: "A few things worth",
    highlight: "remembering.",
    items: [
      "Introduce new products gradually instead of changing your entire routine at once.",
      "Pay attention to how your skin feels after cleansing.",
      "A longer routine is not automatically a better routine.",
      "Your morning and evening routines do not need to be identical.",
    ],
  },

  skinTypeNote: {
    eyebrow: "One more thing",
    titleBefore:
      "Your routine should still feel like",
    highlight: "your routine.",
    description:
      "Skin type, sensitivity, climate, lifestyle and personal preference can all affect which textures and ingredients feel best. Use a simple routine as a starting point, then adjust it based on how your skin responds.",
  },

  cta: {
    eyebrow: "The Lizzy Edit",
    title: "Ready to explore skincare picks?",
    description:
      "Browse curated skincare favorites and discover products that may fit more easily into your routine.",
    buttonText: "Explore Skincare →",
    buttonLink: "/skincare",
  },

  navigation: {
    allGuidesText: "← All Beauty Guides",
    allGuidesLink: "/beauty-guide",
    nextGuideText: "Next Guide",
    nextGuideLink: "/beauty-guide/02",
  },
};

// =================================
// PAGE
// =================================

export const metadata: Metadata = {
  title: "How to Build a Simple Skincare Routine",

  description:
    "Learn how to build a simple skincare routine with cleanser, treatment, moisturizer and SPF, plus practical tips from The Lizzy Edit.",

  alternates: {
    canonical: "/beauty-guide/01",
  },

  openGraph: {
    title:
      "How to Build a Simple Skincare Routine | The Lizzy Edit",

    description:
      "Learn how to build a simple skincare routine with cleanser, treatment, moisturizer and SPF, plus practical tips from The Lizzy Edit.",

    url: "/beauty-guide/01",

    type: "article",

    images: [
      {
        url: "/images/1.png",
        alt: "Simple skincare routine essentials",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "How to Build a Simple Skincare Routine | The Lizzy Edit",

    description:
      "Learn how to build a simple skincare routine with cleanser, treatment, moisturizer and SPF, plus practical tips from The Lizzy Edit.",

    images: ["/images/1.png"],
  },
};

export default async function SimpleSkincareRoutinePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide-01")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE 01 CONTENT LOAD ERROR:",
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

  const routine = {
    ...fallbackContent.routine,
    ...(savedContent.routine ?? {}),
    steps:
      savedContent.routine?.steps?.length
        ? savedContent.routine.steps
        : fallbackContent.routine.steps,
  };

  const morning = {
    ...fallbackContent.morning,
    ...(savedContent.morning ?? {}),
    steps:
      savedContent.morning?.steps?.length
        ? savedContent.morning.steps
        : fallbackContent.morning.steps,
  };

  const evening = {
    ...fallbackContent.evening,
    ...(savedContent.evening ?? {}),
    steps:
      savedContent.evening?.steps?.length
        ? savedContent.evening.steps
        : fallbackContent.evening.steps,
  };

  const beautyNotes = {
    ...fallbackContent.beautyNotes,
    ...(savedContent.beautyNotes ?? {}),
    items:
      savedContent.beautyNotes?.items?.length
        ? savedContent.beautyNotes.items
        : fallbackContent.beautyNotes.items,
  };

  const skinTypeNote = {
    ...fallbackContent.skinTypeNote,
    ...(savedContent.skinTypeNote ?? {}),
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

      {/* ================================
          ARTICLE HEADER
      ================================= */}
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

      {/* ================================
          HERO IMAGE
      ================================= */}
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

      {/* ================================
          INTRODUCTION
      ================================= */}
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

      {/* ================================
          ROUTINE
      ================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {routine.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {routine.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {routine.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {routine.steps.map(
              (step, index) => (
                <div
                  key={`${step.number}-${index}`}
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
                        {routine.noteLabel}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {step.note}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================================
          MORNING / EVENING
      ================================= */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {/* MORNING */}
          <div className="rounded-[28px] bg-[#f0dfd8] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {morning.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {morning.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {morning.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {morning.steps.map(
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

          {/* EVENING */}
          <div className="rounded-[28px] bg-[#ebe3de] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {evening.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {evening.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {evening.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {evening.steps.map(
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

      {/* ================================
          BEAUTY NOTES
      ================================= */}
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

      {/* ================================
          SKIN TYPE NOTE
      ================================= */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {skinTypeNote.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            {skinTypeNote.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {skinTypeNote.highlight}
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {skinTypeNote.description}
          </p>
        </div>
      </section>

      {/* ================================
          CTA
      ================================= */}
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

      {/* ================================
          ARTICLE NAVIGATION
      ================================= */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={navigation.allGuidesLink}
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            {navigation.allGuidesText}
          </Link>

          <Link
            href={navigation.nextGuideLink}
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em]"
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