import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

// =================================
// TYPES
// =================================

type ChecklistItem = {
  number: string;
  title: string;
  description: string;
  note: string;
};

type ValueItem = {
  number: string;
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

  checklist: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    noteLabel: string;
    items: ChecklistItem[];
  };

  saveSplurge: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;

    splurge: {
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
    };

    save: {
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
    };
  };

  costPerUse: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    paragraphs: string[];

    exampleOneLabel: string;
    exampleOneFormula: string;
    exampleOneResult: string;

    exampleTwoLabel: string;
    exampleTwoFormula: string;
    exampleTwoResult: string;
  };

  value: {
    eyebrow: string;
    titleBefore: string;
    highlight: string;
    items: ValueItem[];
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
    eyebrow: "Beauty Tips • Guide 06",
    titleBefore: "When Is a Beauty Product",
    highlight: "Worth the Splurge?",
    description:
      "A higher price does not always mean a better product. The real question is whether the formula, experience and performance are worth paying more for in your routine.",
    image: "/images/6.png",
    imageAlt: "Beauty products and shopping notes",
  },

  intro: {
    eyebrow: "Before you buy",
    titleBefore: "Ask whether you are paying for",
    highlight: "real value.",
    paragraphs: [
      "Beauty can be one of those categories where two products that look almost identical can have completely different prices.",
      "Sometimes the more expensive option really does offer something special. Other times, a beautifully marketed product performs almost exactly like a much more affordable alternative.",
      "Before spending more, it helps to think about what you are actually getting for the extra money.",
    ],
  },

  checklist: {
    eyebrow: "The checklist",
    titleBefore: "Four questions to ask before you",
    highlight: "splurge.",
    noteLabel: "Lizzy's note",
    items: [
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
    ],
  },

  saveSplurge: {
    eyebrow: "Save or splurge?",
    titleBefore: "Think about where the extra money makes a",
    highlight: "difference to you.",

    splurge: {
      eyebrow: "Worth Considering a Splurge",
      title: "When performance matters.",
      description:
        "Spending more can make sense when you notice a meaningful difference in texture, wear, formulation or how often you use the product.",
      items: [
        "Daily SPF",
        "Foundation",
        "Signature Fragrance",
        "Treatment",
      ],
    },

    save: {
      eyebrow: "Easy Places to Save",
      title: "When affordable works beautifully.",
      description:
        "If you already love an affordable formula and it gives you the result you want, there is no need to replace it just because a luxury version exists.",
      items: [
        "Mascara",
        "Lip Products",
        "Body Wash",
        "Basic Cleanser",
      ],
    },
  },

  costPerUse: {
    eyebrow: "Another way to think about it",
    titleBefore: "Consider the",
    highlight: "cost per use.",
    paragraphs: [
      "A $70 product you use almost every day may offer more value to you than a $25 product you use twice and forget about.",
      "That does not mean expensive products are automatically a better purchase. It simply means price makes more sense when you look at it alongside how much use and enjoyment you actually get from the product.",
    ],

    exampleOneLabel: "Example",
    exampleOneFormula: "$70 ÷ 100 uses",
    exampleOneResult: "About $0.70 per use",

    exampleTwoLabel: "Compare",
    exampleTwoFormula: "$25 ÷ 5 uses",
    exampleTwoResult: "About $5.00 per use",
  },

  value: {
    eyebrow: "What are you paying for?",
    titleBefore: "Look beyond the",
    highlight: "packaging.",
    items: [
      {
        number: "01",
        title: "Formula",
        description:
          "Ingredients, texture and how the formula performs.",
      },
      {
        number: "02",
        title: "Experience",
        description:
          "How enjoyable and easy the product is to use.",
      },
      {
        number: "03",
        title: "Performance",
        description:
          "Wear time, finish and whether it does what you need.",
      },
      {
        number: "04",
        title: "Packaging",
        description:
          "Beautiful packaging is lovely, but it should not be the only value.",
      },
    ],
  },

  beautyNotes: {
    eyebrow: "Beauty Notes",
    titleBefore: "Spend with a little more",
    highlight: "intention.",
    items: [
      "Higher price does not automatically mean better performance.",
      "Think about how often you will realistically use the product.",
      "Spend more where the experience or formula genuinely matters to you.",
      "Save where affordable options already give you the result you want.",
    ],
  },

  finalNote: {
    eyebrow: "Lizzy's take",
    titleBefore: "Splurge where it makes your routine",
    highlight: "better.",
    description:
      "There is nothing wrong with loving a luxury beauty product. There is also nothing wrong with choosing the $12 option when it works just as well for you. The goal is not to always save or always splurge — it is to know why you are spending more.",
  },

  cta: {
    eyebrow: "The Lizzy Edit",
    title: "Want to see what made my list?",
    description:
      "Browse my curated beauty picks and discover products I think are worth considering.",
    buttonText: "See Lizzy's Picks →",
    buttonLink: "/picks",
  },

  navigation: {
    previousText: "← Previous Guide",
    previousLink: "/beauty-guide/05",
    allGuidesText: "All Beauty Guides",
    allGuidesLink: "/beauty-guide",
    nextGuideText: "Lizzy's Picks",
    nextGuideLink: "/picks",
  },
};

// =================================
// PAGE
// =================================

export default async function WorthTheSplurgePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "beauty-guide-06")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "BEAUTY GUIDE 06 CONTENT LOAD ERROR:",
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

  const checklist = {
    ...fallbackContent.checklist,
    ...(savedContent.checklist ?? {}),
    items:
      savedContent.checklist?.items?.length
        ? savedContent.checklist.items
        : fallbackContent.checklist.items,
  };

  const saveSplurge = {
    ...fallbackContent.saveSplurge,
    ...(savedContent.saveSplurge ?? {}),

    splurge: {
      ...fallbackContent.saveSplurge.splurge,
      ...(savedContent.saveSplurge?.splurge ?? {}),
      items:
        savedContent.saveSplurge?.splurge?.items?.length
          ? savedContent.saveSplurge.splurge.items
          : fallbackContent.saveSplurge.splurge.items,
    },

    save: {
      ...fallbackContent.saveSplurge.save,
      ...(savedContent.saveSplurge?.save ?? {}),
      items:
        savedContent.saveSplurge?.save?.items?.length
          ? savedContent.saveSplurge.save.items
          : fallbackContent.saveSplurge.save.items,
    },
  };

  const costPerUse = {
    ...fallbackContent.costPerUse,
    ...(savedContent.costPerUse ?? {}),
    paragraphs:
      savedContent.costPerUse?.paragraphs?.length
        ? savedContent.costPerUse.paragraphs
        : fallbackContent.costPerUse.paragraphs,
  };

  const value = {
    ...fallbackContent.value,
    ...(savedContent.value ?? {}),
    items:
      savedContent.value?.items?.length
        ? savedContent.value.items
        : fallbackContent.value.items,
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

      {/* QUESTIONS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {checklist.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {checklist.titleBefore}{" "}
              <span className="italic text-[#c78f86]">
                {checklist.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
            {checklist.items.map(
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
                        {checklist.noteLabel}
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

      {/* SAVE VS SPLURGE */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {saveSplurge.eyebrow}
          </p>

          <h2 className="mt-3 max-w-3xl font-serif text-4xl sm:text-5xl">
            {saveSplurge.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {saveSplurge.highlight}
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* SPLURGE */}
          <div className="rounded-[28px] bg-[#efe1da] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {saveSplurge.splurge.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {saveSplurge.splurge.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {saveSplurge.splurge.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {saveSplurge.splurge.items.map(
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

          {/* SAVE */}
          <div className="rounded-[28px] bg-[#e8dfd9] p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
              {saveSplurge.save.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              {saveSplurge.save.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {saveSplurge.save.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {saveSplurge.save.items.map(
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

      {/* COST PER USE */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {costPerUse.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {costPerUse.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {costPerUse.highlight}
            </span>
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            {costPerUse.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ),
            )}
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/70 p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                {costPerUse.exampleOneLabel}
              </p>

              <p className="mt-3 font-serif text-3xl">
                {costPerUse.exampleOneFormula}
              </p>

              <p className="mt-2 text-sm text-stone-600">
                {costPerUse.exampleOneResult}
              </p>
            </div>

            <div className="rounded-[24px] bg-white/70 p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                {costPerUse.exampleTwoLabel}
              </p>

              <p className="mt-3 font-serif text-3xl">
                {costPerUse.exampleTwoFormula}
              </p>

              <p className="mt-2 text-sm text-stone-600">
                {costPerUse.exampleTwoResult}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU PAY FOR */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
            {value.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            {value.titleBefore}{" "}
            <span className="italic text-[#c78f86]">
              {value.highlight}
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {value.items.map(
            (item, index) => (
              <div
                key={`${item.number}-${index}`}
                className="rounded-[26px] border border-stone-200 bg-white p-6"
              >
                <span className="font-serif text-2xl text-[#c78f86]">
                  {item.number}
                </span>

                <h3 className="mt-5 font-serif text-2xl">
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