import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";
import ProductCard from "@/components/ProductCard";

import { createClient } from "@/lib/supabase/server";

type Product = {
  id: number;
  slug: string;
  brand: string;
  name: string;
  category:
    | "Skincare"
    | "Makeup"
    | "Self-Care"
    | "Fragrance";
  tags: string[];
  type: string | null;
  image_url: string | null;
  description: string | null;
  why_i_like_it: string[] | null;
  affiliate_url: string | null;
  featured: boolean;
  home_tag: string | null;
  skin_tones: string[];
  undertones: string[];
  concerns: string[];
  status: "draft" | "published";
};

type FamilyItem = {
  title: string;
  description: string;
  symbol: string;
};

type WardrobeItem = {
  title: string;
  description: string;
  tag: string;
};

type FragranceNoteItem = {
  number: string;
  title: string;
  description: string;
};

const fallbackContent = {
  hero: {
    eyebrow: "The Fragrance Edit",
    titleBefore: "Find a fragrance that feels",
    highlight: "like you.",
    description:
      "From soft everyday scents to unforgettable statement perfumes, discover fragrance recommendations, scent families and simple guides to help you find your next favorite.",
    primaryButtonText: "Find Your Scent →",
    primaryButtonLink: "#fragrance-families",
    secondaryButtonText: "See My Picks",
    secondaryButtonLink: "/picks?filter=Fragrance",
    image: "/images/fragrances.png",
    imageAlt:
      "Fragrance favorites curated by The Lizzy Edit",
  },

  intro: {
    eyebrow: "Fragrance, made simpler",
    titleBefore:
      "Perfume is personal — and that's what makes it",
    highlight: "fun.",
    paragraphOne:
      "Fragrance can completely change how you feel. Some scents feel clean and effortless, others warm and comforting, and some are made for those moments when you want to make an entrance.",
    paragraphTwo:
      "You do not need to know every perfume note or understand every fragrance category to find something you love.",
    paragraphThree:
      "Start with the types of scents you naturally enjoy, then build from there.",
  },

  families: {
    eyebrow: "Find your fragrance family",
    titleBefore: "What do you naturally",
    highlight: "gravitate toward?",
    description:
      "Fragrance families are a simple way to understand the overall personality of a perfume before you even smell it.",

    items: [
      {
        title: "Fresh",
        description:
          "Clean, airy and easy to wear. Think citrus, green notes, soft musks and crisp compositions.",
        symbol: "◌",
      },
      {
        title: "Floral",
        description:
          "Romantic, feminine and versatile, from soft petals to richer white florals.",
        symbol: "✿",
      },
      {
        title: "Warm",
        description:
          "Comforting and sensual with amber, vanilla, spices and cozy woods.",
        symbol: "✦",
      },
      {
        title: "Gourmand",
        description:
          "Sweet and addictive scents inspired by vanilla, caramel, coffee and dessert-like notes.",
        symbol: "♡",
      },
      {
        title: "Woody",
        description:
          "Smooth, elegant and grounded with sandalwood, cedar, vetiver and deeper woods.",
        symbol: "◇",
      },
    ] as FamilyItem[],
  },

  wardrobe: {
    eyebrow: "The Fragrance Wardrobe",
    titleBefore:
      "One scent does not have to do",
    highlight: "everything.",
    description:
      "Think of fragrance like clothing — different scents can fit different moods, seasons and moments.",

    items: [
      {
        title: "Everyday",
        description:
          "Easy, polished fragrances that feel effortless for work, errands and everyday life.",
        tag: "Easy Reach",
      },
      {
        title: "Date Night",
        description:
          "Warmer, sensual fragrances with a little more depth and presence.",
        tag: "After Dark",
      },
      {
        title: "Soft & Cozy",
        description:
          "Comforting musks, vanilla and skin scents for quiet days and evenings at home.",
        tag: "Comfort Scent",
      },
      {
        title: "Statement",
        description:
          "Fragrances with stronger projection and personality for when you want to be remembered.",
        tag: "Make an Entrance",
      },
    ] as WardrobeItem[],
  },

  products: {
    eyebrow: "Lizzy's Fragrance Picks",
    titleBefore: "Scents worth",
    highlight: "discovering.",
    description:
      "A curated selection of fragrances I think are worth discovering.",
    buttonText: "See All Fragrances →",
    buttonLink: "/picks?filter=Fragrance",
    emptyTitle:
      "More fragrance picks are coming.",
    emptyDescription:
      "I'm still curating fragrances for this collection.",
  },

  fragrance101: {
    eyebrow: "Fragrance 101",
    titleBefore:
      "Why perfume smells different after a few",
    highlight: "hours.",
    description:
      "Perfumes develop in layers. What you smell immediately after spraying may be very different from the fragrance that remains later in the day.",

    items: [
      {
        number: "01",
        title: "Top Notes",
        description:
          "The first impression of a fragrance. These notes are usually lighter and are the first thing you smell after spraying.",
      },
      {
        number: "02",
        title: "Heart Notes",
        description:
          "The character of the fragrance begins to develop here, often with florals, spices, fruits or aromatic notes.",
      },
      {
        number: "03",
        title: "Base Notes",
        description:
          "The notes that remain longest on the skin, often including woods, vanilla, amber and musk.",
      },
    ] as FragranceNoteItem[],
  },

  concentration: {
    eyebrow: "Good to know",
    titleBefore:
      "Eau de Parfum vs. Eau de",
    highlight: "Toilette.",

    edpTag: "EDP",
    edpTitle: "Eau de Parfum",
    edpDescription:
      "Often has a higher concentration of fragrance oils and may feel richer or last longer, although performance varies by formula.",

    edtTag: "EDT",
    edtTitle: "Eau de Toilette",
    edtDescription:
      "Often feels lighter and fresher, making it a nice choice when you prefer a softer fragrance experience.",
  },

  tips: {
    eyebrow: "Fragrance Notes",
    titleBefore:
      "A few things I'd tell a",
    highlight: "friend.",

    items: [
      "Give a fragrance time to dry down before deciding whether you love it.",
      "Test perfume on skin when possible because body chemistry can affect the scent.",
      "Projection and longevity do not always mean a fragrance is better.",
      "You do not need one signature scent — a small fragrance wardrobe can be more fun.",
    ],
  },

  finalNote: {
    eyebrow: "Lizzy's take",
    titleBefore:
      "Wear the fragrance that makes you feel",
    highlight: "something.",
    description:
      "Fragrance is one of the most personal parts of beauty. Trends and compliments are fun, but the perfume that matters most is the one you genuinely look forward to wearing.",
  },

 cta: {
  eyebrow: "Lizzy's Fragrance Picks",

  title:
    "Looking for your next favorite fragrance?",

  buttonText:
    "Explore My Picks",

  href:
    "/picks?filter=Fragrance",
},
};

  export const metadata: Metadata = {
    title: "Fragrance Recommendations",

    description:
      "Discover curated fragrance recommendations, scent families, perfume guides and fragrance tips from The Lizzy Edit.",

    alternates: {
      canonical: "/fragrances",
    },

    openGraph: {
      title: "Fragrance Recommendations | The Lizzy Edit",

      description:
        "Discover curated fragrance recommendations, scent families, perfume guides and fragrance tips from The Lizzy Edit.",

      url: "/fragrances",

      type: "website",
    },
  };

export default async function FragrancePage() {
  const supabase = await createClient();

  // =================================
  // PRODUCTS
  // =================================

  const {
    data: productData,
    error: productError,
  } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .eq("category", "Fragrance")
    .order("created_at", {
      ascending: false,
    });

  if (productError) {
    console.error(
      "Error loading fragrance products:",
      productError,
    );
  }

  const fragranceProducts =
    (productData ?? []) as Product[];

  // =================================
  // CMS CONTENT
  // =================================

  const {
    data: contentData,
    error: contentError,
  } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "fragrances")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading fragrances content:",
      contentError,
    );
  }

  const savedContent =
    contentData?.content ?? {};

  // =================================
// LOAD GLOBAL PRODUCT CARD CONTENT
// =================================

const {
  data: productCardData,
  error: productCardError,
} = await supabase
  .from("site_content")
  .select("content")
  .eq("page", "global")
  .eq("section", "product-card")
  .maybeSingle();

if (productCardError) {
  console.error(
    "Error loading global product card content:",
    productCardError,
  );
}

const productCard = {
  shopButtonText:
    "Shop This Product →",

  viewButtonText:
    "View Product →",

  viewAriaLabel:
    "View",

  ...(productCardData?.content ?? {}),
};

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const intro = {
    ...fallbackContent.intro,
    ...(savedContent.intro ?? {}),
  };

  const families = {
    ...fallbackContent.families,
    ...(savedContent.families ?? {}),
    items:
      savedContent.families?.items ??
      fallbackContent.families.items,
  };

  const wardrobe = {
    ...fallbackContent.wardrobe,
    ...(savedContent.wardrobe ?? {}),
    items:
      savedContent.wardrobe?.items ??
      fallbackContent.wardrobe.items,
  };

  const products = {
    ...fallbackContent.products,
    ...(savedContent.products ?? {}),
  };

  const fragrance101 = {
    ...fallbackContent.fragrance101,
    ...(savedContent.fragrance101 ?? {}),
    items:
      savedContent.fragrance101?.items ??
      fallbackContent.fragrance101.items,
  };

  const concentration = {
    ...fallbackContent.concentration,
    ...(savedContent.concentration ?? {}),
  };

  const tips = {
    ...fallbackContent.tips,
    ...(savedContent.tips ?? {}),
    items:
      savedContent.tips?.items ??
      fallbackContent.tips.items,
  };

  const finalNote = {
    ...fallbackContent.finalNote,
    ...(savedContent.finalNote ?? {}),
  };

  const cta = {
    ...fallbackContent.cta,
    ...(savedContent.cta ?? {}),
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-white/50 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {hero.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.primaryButtonLink}
                className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                {hero.primaryButtonText}
              </a>

              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/40 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                {hero.secondaryButtonText}
              </Link>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-[#d6b7ad]/30 blur-3xl" />

            <div className="relative mx-auto aspect-[4/5] max-w-[470px] overflow-hidden rounded-[34px] border border-white/60 bg-[#ead7d0] shadow-xl">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 90vw, 470px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
          {intro.eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          {intro.titleBefore}{" "}

          <span className="italic text-[#c78f86]">
            {intro.highlight}
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>{intro.paragraphOne}</p>
          <p>{intro.paragraphTwo}</p>
          <p>{intro.paragraphThree}</p>
        </div>
      </section>

      {/* FRAGRANCE FAMILIES */}
      <section
        id="fragrance-families"
        className="bg-[#f6eee9]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {families.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {families.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {families.highlight}
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              {families.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {families.items.map(
              (family: FamilyItem) => (
                <article
                  key={family.title}
                  className="group rounded-[28px] border border-white/70 bg-white/70 p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
                >
                  <span className="text-2xl text-[#c78f86]">
                    {family.symbol}
                  </span>

                  <h3 className="mt-8 font-serif text-3xl">
                    {family.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-stone-600">
                    {family.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FRAGRANCE WARDROBE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {wardrobe.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {wardrobe.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {wardrobe.highlight}
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {wardrobe.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {wardrobe.items.map(
              (item: WardrobeItem) => (
                <article
                  key={item.title}
                  className="group rounded-[28px] border border-stone-200 bg-white p-6 transition duration-500 hover:-translate-y-2 hover:shadow-lg sm:p-7"
                >
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                    {item.tag}
                  </p>

                  <h3 className="mt-4 font-serif text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {item.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                {products.eyebrow}
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                {products.titleBefore}{" "}

                <span className="italic text-[#c78f86]">
                  {products.highlight}
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
                {products.description}
              </p>
            </div>

            <Link
              href={products.buttonLink}
              className="inline-flex min-h-11 items-center text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
            >
              {products.buttonText}
            </Link>
          </div>

          {fragranceProducts.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {fragranceProducts.map(
                (product) => (
                  <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        slug: product.slug,
                        brand: product.brand,
                        name: product.name,
                        category: product.category,
                        tags: product.tags ?? [],
                        type: product.type ?? "",
                        image: product.image_url ?? "",
                        description:
                          product.description ?? "",
                        whyILikeIt:
                          product.why_i_like_it ?? [],
                        affiliateUrl:
                          product.affiliate_url ??
                          undefined,
                        featured: product.featured,
                        homeTag:
                          product.home_tag ??
                          undefined,
                        skinTones:
                          product.skin_tones ?? [],
                        undertones:
                          product.undertones ?? [],
                        concerns:
                          product.concerns ?? [],
                      }}
                      shopButtonText={
                        productCard.shopButtonText
                      }
                      viewButtonText={
                        productCard.viewButtonText
                      }
                      viewAriaLabel={
                        productCard.viewAriaLabel
                      }
                    />
                ),
              )}
            </div>
          ) : (
            <div className="mt-10 rounded-[28px] border border-stone-200 bg-[#fffaf7] px-6 py-14 text-center">
              <p className="font-serif text-3xl">
                {products.emptyTitle}
              </p>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                {products.emptyDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FRAGRANCE 101 */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {fragrance101.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            {fragrance101.titleBefore}{" "}

            <span className="italic text-[#c78f86]">
              {fragrance101.highlight}
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {fragrance101.description}
          </p>
        </div>

        <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
          {fragrance101.items.map(
            (note: FragranceNoteItem) => (
              <div
                key={note.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_180px_1fr] sm:items-start sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-3xl text-[#c78f86]">
                  {note.number}
                </span>

                <h3 className="font-serif text-3xl">
                  {note.title}
                </h3>

                <p className="text-sm leading-7 text-stone-600 sm:text-base">
                  {note.description}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* EDP VS EDT */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {concentration.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {concentration.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {concentration.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] bg-white/70 p-6 sm:p-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                {concentration.edpTag}
              </p>

              <h3 className="mt-3 font-serif text-3xl">
                {concentration.edpTitle}
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {concentration.edpDescription}
              </p>
            </div>

            <div className="rounded-[28px] bg-white/70 p-6 sm:p-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
                {concentration.edtTag}
              </p>

              <h3 className="mt-3 font-serif text-3xl">
                {concentration.edtTitle}
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {concentration.edtDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {tips.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {tips.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {tips.highlight}
              </span>
            </h2>
          </div>

          <div className="divide-y divide-stone-300 border-y border-stone-300">
            {tips.items.map(
              (tip: string, index: number) => (
                <div
                  key={`${index}-${tip}`}
                  className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_1fr]"
                >
                  <span className="font-serif text-xl text-[#c78f86]">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-7 text-stone-700 sm:text-base">
                    {tip}
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

      <PicksCTA
      eyebrow={cta.eyebrow}
      title={cta.title}
      buttonText={cta.buttonText}
      href={cta.href}
      />

      <Footer />
    </main>
  );
}