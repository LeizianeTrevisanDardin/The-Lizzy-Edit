import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

type DisclosureSection = {
  title: string;
  paragraphs: string[];
};

const fallbackContent = {
  hero: {
    eyebrow: "Transparency",
    title: "Affiliate Disclosure",
    description:
      "Transparency matters. Here is how affiliate links and partnerships may work on The Lizzy Edit.",
  },

  amazon: {
    eyebrow: "Amazon Associates",
    title: "Amazon Affiliate Disclosure",
    strongText:
      "As an Amazon Associate, I earn from qualifying purchases.",
    paragraphOne:
      "This means that if you click an eligible Amazon link on The Lizzy Edit and make a qualifying purchase, I may receive a commission from Amazon.",
    paragraphTwo:
      "There is no additional cost to you for using an affiliate link.",
  },

  sections: [
    {
      title: "Other Affiliate Programs",
      paragraphs: [
        "The Lizzy Edit may participate in additional affiliate programs with retailers, brands or affiliate networks.",
        "When an affiliate link is used, The Lizzy Edit may receive a commission or referral fee if a purchase is made through that link.",
      ],
    },
    {
      title: "Editorial Independence",
      paragraphs: [
        "Affiliate relationships do not determine which products appear on The Lizzy Edit.",
        "The goal is to share useful beauty recommendations, product discoveries and educational content that may help readers make more informed purchasing decisions.",
      ],
    },
    {
      title: "Product Prices & Availability",
      paragraphs: [
        "Product prices, availability, promotions and product information can change at any time.",
        "Always confirm the current price, ingredients, product details and retailer policies directly with the retailer before making a purchase.",
      ],
    },
    {
      title: "Beauty & Skincare Information",
      paragraphs: [
        "Content on The Lizzy Edit is intended for general beauty education and informational purposes.",
        "Product experiences can vary from person to person, particularly with skincare. Recommendations on this website are not medical advice and should not replace advice from a qualified healthcare professional.",
      ],
    },
    {
      title: "Sponsored Content",
      paragraphs: [
        "If The Lizzy Edit publishes sponsored or paid content in the future, that relationship will be disclosed clearly within the relevant content.",
      ],
    },
  ] as DisclosureSection[],

  philosophy: {
    eyebrow: "The Lizzy Edit",
    title:
      "Recommendations should still feel personal — not promotional.",
    description:
      "Affiliate links can help support the site, but the purpose of The Lizzy Edit is to curate, educate and help make beauty easier to navigate.",
  },

  questions: {
    title: "Questions",
    description:
      "If you have questions about affiliate relationships or content on The Lizzy Edit, please use the contact information available on this website.",
    buttonText:
      "Learn more about The Lizzy Edit →",
    buttonLink: "/about",
  },

  lastUpdated: "Last updated: August 2026",
};

export default async function DisclosurePage() {
  const supabase = await createClient();

  const {
    data: contentData,
    error: contentError,
  } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "disclosure")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading Disclosure content:",
      contentError,
    );
  }

  const savedContent =
    contentData?.content ?? {};

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const amazon = {
    ...fallbackContent.amazon,
    ...(savedContent.amazon ?? {}),
  };

  const sections =
    savedContent.sections ??
    fallbackContent.sections;

  const philosophy = {
    ...fallbackContent.philosophy,
    ...(savedContent.philosophy ?? {}),
  };

  const questions = {
    ...fallbackContent.questions,
    ...(savedContent.questions ?? {}),
  };

  const lastUpdated =
    savedContent.lastUpdated ??
    fallbackContent.lastUpdated;

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {hero.description}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12">
          {/* AMAZON */}
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
              {amazon.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              {amazon.title}
            </h2>

            <p className="mt-5 text-base font-medium leading-7">
              {amazon.strongText}
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              {amazon.paragraphOne}
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              {amazon.paragraphTwo}
            </p>
          </section>

          {/* OTHER DISCLOSURE SECTIONS */}
          {sections.map(
            (
              section: DisclosureSection,
              index: number,
            ) => (
              <section
                key={`${index}-${section.title}`}
              >
                <h2 className="font-serif text-3xl">
                  {section.title}
                </h2>

                {section.paragraphs.map(
                  (
                    paragraph: string,
                    paragraphIndex: number,
                  ) => (
                    <p
                      key={`${paragraphIndex}-${paragraph}`}
                      className="mt-4 text-sm leading-7 text-stone-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </section>
            ),
          )}

          {/* PHILOSOPHY */}
          <section className="relative overflow-hidden rounded-[28px] bg-[#211d1b] p-7 text-white sm:p-10">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#c78f86] opacity-20 blur-3xl" />

            <div className="relative">
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
                {philosophy.eyebrow}
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">
                {philosophy.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
                {philosophy.description}
              </p>
            </div>
          </section>

          {/* QUESTIONS */}
          <section>
            <h2 className="font-serif text-3xl">
              {questions.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              {questions.description}
            </p>

            <Link
              href={questions.buttonLink}
              className="mt-6 inline-flex text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
            >
              {questions.buttonText}
            </Link>
          </section>

          {/* LAST UPDATED */}
          <div className="rounded-[24px] bg-[#f6eee9] p-6 text-xs leading-6 text-stone-500 sm:p-8">
            <p>
              {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}