import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

// =================================
// TYPES
// =================================

type RitualItem = {
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

  ritual: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    noteLabel: string;
    items: RitualItem[];
  };

  simpleRoutine: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  fullRoutine: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };

  order: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    items: string[];
    description: string;
  };

  afterShower: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
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
    eyebrow: "Self-Care • Guide 05",
    titleBefore: "The Everything Shower,",
    highlight: "Simplified",
    description:
      "The everything shower can be a lovely way to slow down and reset, but it does not need to become a two-hour checklist. A few thoughtful steps can make the routine feel special without making it exhausting.",
    image: "/images/5.png",
    imageAlt: "Everything shower hair and body care essentials",
  },

  intro: {
    eyebrow: "Make it realistic",
    titleBefore: "Self-care should not feel like another",
    highlight: "obligation.",
    paragraphs: [
      "The idea behind an everything shower is simple: give yourself a little more time than usual for hair, body and skincare.",
      "But that does not mean every product in your bathroom needs to make an appearance. The routine can be as simple or as detailed as you want.",
      "Think of it as choosing a few extra steps that make you feel refreshed, polished and cared for.",
    ],
  },

  ritual: {
    eyebrow: "The ritual",
    titleBefore: "Build it around what actually feels",
    highlight: "worth doing.",
    noteLabel: "Lizzy's note",

    items: [
      {
        number: "01",
        title: "Start with Hair",
        description:
          "Begin with shampoo and follow with conditioner or a hair mask if your hair needs a little extra care. Doing hair first gives treatments time to sit while you move through the rest of your routine.",
        note:
          "You do not need a hair mask every time. Save it for when your hair actually feels dry, stressed or in need of extra softness.",
      },
      {
        number: "02",
        title: "Cleanse the Body",
        description:
          "Use a body wash or cleanser that feels comfortable on your skin and works well with your everyday routine.",
        note:
          "A body cleanser does not need to feel stripping or extremely foamy to work well.",
      },
      {
        number: "03",
        title: "Exfoliate When Needed",
        description:
          "A body scrub or gentle exfoliating product can help smooth the skin, but it does not need to be used every shower.",
        note:
          "More exfoliation is not always better. Pay attention to how your skin responds.",
      },
      {
        number: "04",
        title: "Finish with Body Care",
        description:
          "After showering, apply body lotion, cream or oil while your skin still feels slightly damp to help lock in moisture.",
        note:
          "This is often the step that makes an everything shower feel more like a self-care ritual.",
      },
    ],
  },

  simpleRoutine: {
    eyebrow: "The Simple Version",
    title: "When you want the reset without the marathon.",
    description:
      "Focus on the essentials and add just one or two extras that make the shower feel a little more special.",
    items: [
      "Shampoo",
      "Conditioner",
      "Body Wash",
      "Body Lotion",
    ],
  },

  fullRoutine: {
    eyebrow: "The Full Ritual",
    title: "When you actually have the time.",
    description:
      "Add treatments and exfoliation when they make sense for your hair and skin rather than simply because they are part of a trend.",
    items: [
      "Hair Mask",
      "Body Scrub",
      "Body Oil",
      "Skincare",
    ],
  },

  order: {
    eyebrow: "A simple order",
    titleBefore: "You do not need to overthink the",
    highlight: "sequence.",
    items: [
      "01 — Shampoo",
      "02 — Hair treatment or conditioner",
      "03 — Body cleanse",
      "04 — Exfoliate if needed",
      "05 — Rinse thoroughly",
      "06 — Moisturize after showering",
    ],
    description:
      "If you use a richer hair treatment, rinsing your body afterward can also help remove any product that may have run down your back or shoulders.",
  },

  afterShower: {
    eyebrow: "Don't forget the after",
    titleBefore: "The shower may end, but the",
    highlight: "ritual doesn't.",
    description:
      "Applying body lotion, cream or oil afterward can be one of the most satisfying parts of the routine. You can also finish with your normal facial skincare and a fragrance if that is part of what makes you feel put together.",
    items: [
      "Body Cream",
      "Body Oil",
      "Skincare",
      "Hair Care",
      "Fragrance",
    ],
  },

  beautyNotes: {
    eyebrow: "Beauty Notes",
    titleBefore: "Keep the ritual",
    highlight: "enjoyable.",
    items: [
      "An everything shower does not need to include every possible step.",
      "Choose the extra steps that actually make you feel good.",
      "Hair masks and exfoliation do not need to happen every shower.",
      "Body moisturizer is often easier to remember when you keep it near the shower.",
    ],
  },

  finalNote: {
    eyebrow: "Lizzy's take",
    titleBefore: "The best everything shower is the one you",
    highlight: "actually enjoy.",
    description:
      "You do not need ten products, candles and an elaborate routine for self-care to count. Sometimes shampoo, a body scrub, a great body cream and a little extra time are more than enough.",
  },

  cta: {
    eyebrow: "The Lizzy Edit",
    title: "Ready for a little more self-care?",
    description:
      "Explore body, hair and self-care favorites for routines that feel a little more special.",
    buttonText: "Explore Self-Care →",
    buttonLink: "/self-care",
  },

  navigation: {
    previousText: "← Previous Guide",
    previousLink: "/beauty-guide/04",
    allGuidesText: "All Beauty Guides",
    allGuidesLink: "/beauty-guide",
    nextGuideText: "Next Guide",
    nextGuideLink: "/beauty-guide/06",
  },
};

// =================================
// PAGE
// =================================

export const metadata: Metadata = {
  title: "The Everything Shower, Simplified",

  description:
    "Learn how to build a realistic everything shower routine with hair care, body care, exfoliation and post-shower steps without overcomplicating it.",

  alternates: {
    canonical: "/beauty-guide/05",
  },

  openGraph: {
    title:
      "The Everything Shower, Simplified | The Lizzy Edit",

    description:
      "Learn how to build a realistic everything shower routine with hair care, body care, exfoliation and post-shower steps without overcomplicating it.",

    url: "/beauty-guide/05",

    type: "article",

    images: [
      {
        url: "/images/5.png",
        alt: "Everything shower hair and body care essentials",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "The Everything Shower, Simplified | The Lizzy Edit",

    description:
      "Learn how to build a realistic everything shower routine with hair care, body care, exfoliation and post-shower steps without overcomplicating it.",

    images: ["/images/5.png"],
  },
};


export default async function EverythingShowerPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide-05")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE 05 CONTENT LOAD ERROR:",
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

  const ritual = {
    ...fallbackContent.ritual,
    ...(savedContent.ritual ?? {}),
    items:
      savedContent.ritual?.items?.length
        ? savedContent.ritual.items
        : fallbackContent.ritual.items,
  };

  const simpleRoutine = {
    ...fallbackContent.simpleRoutine,
    ...(savedContent.simpleRoutine ?? {}),
    items:
      savedContent.simpleRoutine?.items?.length
        ? savedContent.simpleRoutine.items
        : fallbackContent.simpleRoutine.items,
  };

  const fullRoutine = {
    ...fallbackContent.fullRoutine,
    ...(savedContent.fullRoutine ?? {}),
    items:
      savedContent.fullRoutine?.items?.length
        ? savedContent.fullRoutine.items
        : fallbackContent.fullRoutine.items,
  };

  const order = {
    ...fallbackContent.order,
    ...(savedContent.order ?? {}),
    items:
      savedContent.order?.items?.length
        ? savedContent.order.items
        : fallbackContent.order.items,
  };

  const afterShower = {
    ...fallbackContent.afterShower,
    ...(savedContent.afterShower ?? {}),
    items:
      savedContent.afterShower?.items?.length
        ? savedContent.afterShower.items
        : fallbackContent.afterShower.items,
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

      {/* SHOWER STEPS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {ritual.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {ritual.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {ritual.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {ritual.items.map(
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
                        {ritual.noteLabel}
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

      {/* TWO ROUTINE OPTIONS */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {simpleRoutine.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {simpleRoutine.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {simpleRoutine.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {simpleRoutine.items.map(
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

          <div className="rounded-[28px] bg-[#e8dfd9] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {fullRoutine.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {fullRoutine.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {fullRoutine.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {fullRoutine.items.map(
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

      {/* ORDER OF STEPS */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {order.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {order.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {order.highlight}
            </span>
          </h2>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {order.items.map(
              (item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-[20px] border border-white/60 bg-white/60 px-5 py-4 text-sm text-stone-700"
                >
                  {item}
                </div>
              ),
            )}
          </div>

          <p className="mt-7 text-sm leading-7 text-stone-600 sm:text-base">
            {order.description}
          </p>
        </div>
      </section>

      {/* AFTER SHOWER */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {afterShower.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            {afterShower.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {afterShower.highlight}
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {afterShower.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {afterShower.items.map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full bg-[#f6eee9] px-4 py-2 text-[9px] font-medium uppercase tracking-[0.14em]"
                >
                  {item}
                </span>
              ),
            )}
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
                      {String(index + 1).padStart(2, "0")}
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