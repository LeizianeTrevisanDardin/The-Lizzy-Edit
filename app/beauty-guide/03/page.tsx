import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

// =================================
// TYPES
// =================================

type DifferenceItem = {
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

  differences: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    noteLabel: string;
    items: DifferenceItem[];
  };

  drySkin: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  dehydratedSkin: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  both: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    paragraphs: string[];
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
// FALLBACK
// =================================

const fallbackContent: GuideContent = {
  hero: {
    backText: "← Beauty Guide",
    eyebrow: "Skincare • Guide 03",
    titleBefore: "Dry vs.",
    highlight: "Dehydrated Skin",
    description:
      "They can look and feel similar, but dry skin and dehydrated skin are not exactly the same. Understanding the difference can make choosing products feel much easier.",
    image: "/images/3.png",
    imageAlt: "Dry versus dehydrated skin comparison",
  },

  intro: {
    eyebrow: "Know the difference",
    titleBefore: "Think oil versus",
    highlight: "water.",
    paragraphs: [
      "One of the easiest ways to understand the difference is to think about what the skin may be lacking.",
      "Dry skin is generally associated with a lack of natural oils, while dehydrated skin is lacking water. Because of that, dehydration can happen even if your skin is oily.",
      "This is why two people who both describe their skin as feeling tight may actually benefit from different types of products.",
    ],
  },

  differences: {
    eyebrow: "Dry vs. dehydrated",
    titleBefore: "What to look",
    highlight: "for.",
    noteLabel: "Lizzy's note",

    items: [
      {
        number: "01",
        title: "Dry Skin",
        description:
          "Dry skin is generally linked to a lower level of natural oils. It may feel tight, rough or uncomfortable and can sometimes look flaky or dull.",
        note:
          "Dry skin is usually considered a skin type, so it can be something you experience consistently.",
      },
      {
        number: "02",
        title: "Dehydrated Skin",
        description:
          "Dehydrated skin is lacking water rather than oil. It can feel tight or look dull while still producing oil, especially in areas like the forehead, nose and chin.",
        note:
          "Dehydration is a skin condition that can affect different skin types, including oily skin.",
      },
      {
        number: "03",
        title: "Texture & Feel",
        description:
          "Dry skin may feel rough or flaky, while dehydrated skin can feel tight and appear less plump or more tired than usual.",
        note:
          "The way your skin feels after cleansing can give you useful clues about what it may need.",
      },
      {
        number: "04",
        title: "What Your Routine May Need",
        description:
          "Dry skin often benefits from nourishing moisturizers and barrier-supporting ingredients, while dehydrated skin may benefit from lightweight hydration paired with a moisturizer that helps keep that hydration in.",
        note:
          "Many people can experience both dryness and dehydration at the same time.",
      },
    ],
  },

  drySkin: {
    eyebrow: "Dry Skin",
    title: "Often needs more nourishment.",
    description:
      "Look for comfortable textures that help support the skin barrier and reduce that dry, tight feeling.",
    items: [
      "Cream Cleanser",
      "Ceramides",
      "Moisturizer",
      "Facial Oil",
    ],
  },

  dehydratedSkin: {
    eyebrow: "Dehydrated Skin",
    title: "Often needs more hydration.",
    description:
      "Hydrating layers can help add water back into the routine, while moisturizer helps reduce the loss of that hydration.",
    items: [
      "Hydrating Serum",
      "Hyaluronic Acid",
      "Essence",
      "Moisturizer",
    ],
  },

  both: {
    eyebrow: "A common question",
    titleBefore: "Can your skin be dry",
    highlight: "and dehydrated?",
    paragraphs: [
      "Yes. Because dryness and dehydration describe different things, they can happen together.",
      "Someone with naturally dry skin can also become dehydrated due to weather, over-cleansing, environmental conditions or changes in a skincare routine.",
      "In that situation, the routine may need both hydration and richer moisturizing products rather than choosing only one or the other.",
    ],
  },

  beautyNotes: {
    eyebrow: "Beauty Notes",
    titleBefore: "A few things worth",
    highlight: "remembering.",
    items: [
      "Dry skin and dehydrated skin are not exactly the same thing.",
      "Oily skin can still be dehydrated.",
      "Hydration and moisture play different roles in your routine.",
      "How your skin feels can change with weather, environment and your routine.",
    ],
  },

  finalNote: {
    eyebrow: "One more thing",
    titleBefore: "Pay attention to how your skin",
    highlight: "responds.",
    description:
      "Skin can change over time and with the seasons. Instead of trying to fit perfectly into one label, use these differences as a guide for understanding what your skin may need right now.",
  },

  cta: {
    eyebrow: "The Lizzy Edit",
    title: "Looking for skincare picks?",
    description:
      "Explore skincare favorites and find textures that may fit more comfortably into your routine.",
    buttonText: "Explore Skincare →",
    buttonLink: "/skincare",
  },

  navigation: {
    previousText: "← Previous Guide",
    previousLink: "/beauty-guide/02",
    allGuidesText: "All Beauty Guides",
    allGuidesLink: "/beauty-guide",
    nextGuideText: "Next Guide",
    nextGuideLink: "/beauty-guide/04",
  },
};

// =================================
// PAGE
// =================================

export const metadata: Metadata = {
  title: "Dry vs. Dehydrated Skin",

  description:
    "Learn the difference between dry and dehydrated skin, how to spot the signs and what each skin concern may need in a skincare routine.",

  alternates: {
    canonical: "/beauty-guide/03",
  },

  openGraph: {
    title:
      "Dry vs. Dehydrated Skin | The Lizzy Edit",

    description:
      "Learn the difference between dry and dehydrated skin, how to spot the signs and what each skin concern may need in a skincare routine.",

    url: "/beauty-guide/03",

    type: "article",

    images: [
      {
        url: "/images/3.png",
        alt: "Dry versus dehydrated skin comparison",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Dry vs. Dehydrated Skin | The Lizzy Edit",

    description:
      "Learn the difference between dry and dehydrated skin, how to spot the signs and what each skin concern may need in a skincare routine.",

    images: ["/images/3.png"],
  },
};

export default async function DryVsDehydratedSkinPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide-03")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE 03 CONTENT LOAD ERROR:",
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

  const differences = {
    ...fallbackContent.differences,
    ...(savedContent.differences ?? {}),
    items:
      savedContent.differences?.items?.length
        ? savedContent.differences.items
        : fallbackContent.differences.items,
  };

  const drySkin = {
    ...fallbackContent.drySkin,
    ...(savedContent.drySkin ?? {}),
    items:
      savedContent.drySkin?.items?.length
        ? savedContent.drySkin.items
        : fallbackContent.drySkin.items,
  };

  const dehydratedSkin = {
    ...fallbackContent.dehydratedSkin,
    ...(savedContent.dehydratedSkin ?? {}),
    items:
      savedContent.dehydratedSkin?.items?.length
        ? savedContent.dehydratedSkin.items
        : fallbackContent.dehydratedSkin.items,
  };

  const both = {
    ...fallbackContent.both,
    ...(savedContent.both ?? {}),
    paragraphs:
      savedContent.both?.paragraphs?.length
        ? savedContent.both.paragraphs
        : fallbackContent.both.paragraphs,
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

      {/* DIFFERENCES */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {differences.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {differences.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {differences.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {differences.items.map(
              (item, index) => (
                <div
                  key={`${item.number}-${index}`}
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
                        {differences.noteLabel}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* SIDE BY SIDE */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {/* DRY SKIN */}
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {drySkin.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {drySkin.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {drySkin.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {drySkin.items.map(
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

          {/* DEHYDRATED SKIN */}
          <div className="rounded-[28px] bg-[#e5e8e4] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {dehydratedSkin.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {dehydratedSkin.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {dehydratedSkin.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {dehydratedSkin.items.map(
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

      {/* CAN YOU HAVE BOTH */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {both.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {both.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {both.highlight}
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            {both.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* BEAUTY NOTES */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
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
      </section>

      {/* FINAL NOTE */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
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