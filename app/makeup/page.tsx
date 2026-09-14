import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";
import ExploreCard from "@/components/ExploreCard";
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

type CategoryItem = {
  title: string;
  description: string;
  symbol: string;
  filter: string;
};

type LookItem = {
  title: string;
  description: string;
  image: string;
  filter: string;
};

type GuideStep = {
  number: string;
  title: string;
  description: string;
};

// =================================
// FALLBACK CONTENT
// =================================

const fallbackContent = {
  hero: {
    eyebrow: "The Makeup Edit",
    titleBefore: "Makeup that feels",
    highlight: "like you.",
    description:
      "Discover complexion, lips, eyes and everyday makeup picks curated to make getting ready feel easier, more personal and more fun.",
    primaryButtonText: "Explore Makeup ↓",
    primaryButtonLink: "#makeup-categories",
    secondaryButtonText: "Lizzy's Picks",
    secondaryButtonLink: "/picks?filter=Makeup",
    image: "/images/makeup-hero.png",
    imageAlt:
      "Makeup products curated by The Lizzy Edit",
    badge: "Makeup, the Lizzy way ✦",
  },

  categories: {
    eyebrow: "Shop by category",
    titleBefore: "Build your beauty",
    highlight: "edit.",
    description:
      "Whether you love minimal makeup or a full look, start with the category you're shopping for.",

    items: [
      {
        title: "Face",
        description:
          "Foundation, concealer, powder & skin tints",
        symbol: "◌",
        filter: "Face",
      },
      {
        title: "Cheeks",
        description:
          "Blush, bronzer, contour & highlighter",
        symbol: "♡",
        filter: "Cheeks",
      },
      {
        title: "Eyes",
        description:
          "Mascara, liner, shadows & brows",
        symbol: "✦",
        filter: "Eyes",
      },
      {
        title: "Lips",
        description:
          "Lip oils, glosses, liners & lipstick",
        symbol: "◇",
        filter: "Lips",
      },
      {
        title: "Everyday Makeup",
        description:
          "Easy essentials for quick daily looks",
        symbol: "☼",
        filter: "Everyday Makeup",
      },
      {
        title: "Beauty Tools",
        description:
          "Brushes, sponges & makeup accessories",
        symbol: "⌁",
        filter: "Beauty Tools",
      },
    ] as CategoryItem[],
  },

  products: {
    eyebrow: "Lizzy's Makeup Picks",
    titleBefore: "Makeup worth",
    highlight: "discovering.",
    description:
      "A curated selection of makeup favorites from The Lizzy Edit.",
    buttonText: "View All Makeup →",
    buttonLink: "/picks?filter=Makeup",
    emptyTitle:
      "More makeup picks are coming.",
    emptyDescription:
      "I'm still curating products for this collection.",
  },

  looks: {
    eyebrow: "Beauty inspiration",
    titleBefore: "Choose your",
    highlight: "mood.",
    buttonText: "Shop the look →",

    items: [
      {
        title: "No-Makeup Makeup",
        description:
          "Fresh skin, soft cheeks and easy products for a polished everyday look.",
        image:
          "/images/makeup-no-makeup.png",
        filter:
          "No-Makeup Makeup",
      },
      {
        title: "Soft Glam",
        description:
          "Neutral tones, defined eyes and luminous skin without feeling overdone.",
        image:
          "/images/soft-glam.png",
        filter:
          "Soft Glam",
      },
      {
        title: "Statement Lip",
        description:
          "Keep the rest simple and let a beautiful lip color do the work.",
        image:
          "/images/statement-lip.png",
        filter:
          "Statement Lip",
      },
    ] as LookItem[],
  },

  guide: {
    eyebrow:
      "Lizzy's Makeup Guide",
    titleBefore:
      "Makeup doesn't need to be",
    highlight:
      "complicated.",
    description:
      "Start with a few products you enjoy using and build your routine around the finish, coverage and style you actually like.",
    buttonText:
      "Read Beauty Guide →",
    buttonLink:
      "/beauty-guide",

    steps: [
      {
        number: "01",
        title: "Prep",
        description:
          "Start with hydrated skin so makeup applies more smoothly.",
      },
      {
        number: "02",
        title: "Perfect",
        description:
          "Use complexion products only where you actually want coverage.",
      },
      {
        number: "03",
        title: "Add Color",
        description:
          "Blush, bronzer or highlighter can bring dimension back to the face.",
      },
      {
        number: "04",
        title: "Define",
        description:
          "Finish with brows, mascara, lips or whatever makes the look feel like you.",
      },
    ] as GuideStep[],
  },


  cta: {
      eyebrow:
        "Lizzy's Makeup Picks",

      title:
        "Ready to find your next beauty favorite?",

      buttonText:
        "Explore My Picks",

      href:
        "/picks?filter=Makeup",
    },
};

// =================================
// PAGE
// =================================
  export const metadata: Metadata = {
    title: "Makeup Recommendations",

    description:
      "Discover curated makeup recommendations for face, cheeks, eyes, lips and everyday looks from The Lizzy Edit.",

    alternates: {
      canonical: "/makeup",
    },

    openGraph: {
      title: "Makeup Recommendations | The Lizzy Edit",

      description:
        "Discover curated makeup recommendations for face, cheeks, eyes, lips and everyday looks from The Lizzy Edit.",

      url: "/makeup",

      type: "website",
    },
  };

export default async function MakeupPage() {
  const supabase = await createClient();

  // =================================
  // LOAD PRODUCTS
  // =================================

  const {
    data: productData,
    error: productError,
  } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .eq("category", "Makeup")
    .order("created_at", {
      ascending: false,
    });

  if (productError) {
    console.error(
      "Error loading makeup products:",
      productError,
    );
  }

  const makeupProducts =
    (productData ?? []) as Product[];

  // =================================
  // LOAD CMS CONTENT
  // =================================

  const {
    data: contentData,
    error: contentError,
  } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "makeup")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading makeup content:",
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

  // =================================
  // MERGE FALLBACK + CMS
  // =================================

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const categories = {
    ...fallbackContent.categories,
    ...(savedContent.categories ?? {}),
    items:
      savedContent.categories?.items ??
      fallbackContent.categories.items,
  };

  const products = {
    ...fallbackContent.products,
    ...(savedContent.products ?? {}),
  };

  const looks = {
    ...fallbackContent.looks,
    ...(savedContent.looks ?? {}),
    items:
      savedContent.looks?.items ??
      fallbackContent.looks.items,
  };

  const guide = {
    ...fallbackContent.guide,
    ...(savedContent.guide ?? {}),
    steps:
      savedContent.guide?.steps ??
      fallbackContent.guide.steps,
  };

  const cta = {
    ...fallbackContent.cta,
    ...(savedContent.cta ?? {}),
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* =================================
          HERO
      ================================= */}

      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f2dfdc]">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/40 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#c88986]/20 blur-3xl sm:h-80 sm:w-80" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.titleBefore}{" "}

              <span className="italic text-[#b76f70]">
                {hero.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
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
            <div className="absolute -inset-5 rounded-[36px] bg-[#d9aaa5] opacity-25 blur-3xl sm:-inset-7" />

            <div className="relative overflow-hidden rounded-[28px] shadow-xl sm:rounded-[36px]">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                width={1536}
                height={1024}
                priority
                quality={95}
                className="h-auto w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
            </div>

            <div className="absolute -bottom-4 left-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">
              {hero.badge}
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          CATEGORIES
      ================================= */}

      <section
        id="makeup-categories"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {categories.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            {categories.titleBefore}{" "}

            <span className="italic text-[#b76f70]">
              {categories.highlight}
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
            {categories.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.items.map(
            (category: CategoryItem) => (
              <ExploreCard
                key={category.title}
                title={category.title}
                description={
                  category.description
                }
                symbol={category.symbol}
                filter={category.filter}
              />
            ),
          )}
        </div>
      </section>

      {/* =================================
          MAKEUP PRODUCTS
      ================================= */}

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                {products.eyebrow}
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                {products.titleBefore}{" "}

                <span className="italic text-[#b76f70]">
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

          {makeupProducts.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {makeupProducts.map(
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

      {/* =================================
          LOOKS
      ================================= */}

      <section className="bg-[#f6e9e6]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {looks.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {looks.titleBefore}{" "}

              <span className="italic text-[#b76f70]">
                {looks.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {looks.items.map(
              (look: LookItem) => (
                <article
                  key={look.title}
                  className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={look.image}
                      alt={`${look.title} makeup look`}
                      fill
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl">
                      {look.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {look.description}
                    </p>

                    <Link
                      href={`/picks?filter=${encodeURIComponent(
                        look.filter,
                      )}`}
                      className="mt-5 inline-flex text-[10px] font-medium uppercase tracking-[0.15em]"
                    >
                      {looks.buttonText}
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =================================
          MAKEUP GUIDE
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {guide.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {guide.titleBefore}{" "}

              <span className="italic text-[#b76f70]">
                {guide.highlight}
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              {guide.description}
            </p>

            <div className="mt-7 flex justify-center lg:justify-start">
              <Link
                href={guide.buttonLink}
                className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                {guide.buttonText}
              </Link>
            </div>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {guide.steps.map(
              (step: GuideStep) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_160px_1fr] sm:items-center"
                >
                  <span className="font-serif text-xl text-[#b76f70]">
                    {step.number}
                  </span>

                  <h3 className="font-serif text-2xl">
                    {step.title}
                  </h3>

                  <p className="col-start-2 text-sm leading-6 text-stone-500 sm:col-start-auto">
                    {step.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =================================
          CTA
      ================================= */}

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