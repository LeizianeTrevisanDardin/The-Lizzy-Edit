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

type ExploreItem = {
  title: string;
  description: string;
  symbol: string;
  filter: string;
};

type RoutineStep = {
  number: string;
  title: string;
  description: string;
};

// =================================
// FALLBACK CONTENT
// =================================

const fallbackContent = {
  hero: {
    eyebrow: "The Skincare Edit",
    titleBefore: "Skincare made",
    highlight: "simpler.",
    description:
      "Explore skincare by concern, skin type and routine — with practical recommendations curated through a Beauty Advisor's perspective.",
    primaryButtonText: "Find Your Concern ↓",
    primaryButtonLink: "#concerns",
    secondaryButtonText: "Lizzy's Picks",
    secondaryButtonLink:
      "/picks?filter=Skincare",
    image: "/images/skincare-hero.png",
    imageAlt:
      "Skincare products curated by The Lizzy Edit",
    badge: "Skincare, simplified ✦",
  },

  concerns: {
    eyebrow: "Shop by concern",
    titleBefore: "What does your skin",
    highlight: "need?",
    description:
      "Start with what you want to address and explore products designed around that goal.",

    items: [
      {
        title: "Dryness",
        description:
          "Hydration, barrier support & comfort",
        symbol: "◌",
        filter: "Dryness",
      },
      {
        title: "Sensitivity",
        description:
          "Gentle care for easily irritated skin",
        symbol: "♡",
        filter: "Sensitivity",
      },
      {
        title: "Breakouts",
        description:
          "Balance, clarify & support your skin",
        symbol: "✦",
        filter: "Breakouts",
      },
      {
        title: "Fine Lines",
        description:
          "Smooth, hydrate & support renewal",
        symbol: "⌁",
        filter: "Fine Lines",
      },
      {
        title: "Dark Spots",
        description:
          "Brighten & improve uneven-looking tone",
        symbol: "◇",
        filter: "Dark Spots",
      },
      {
        title: "Dullness",
        description:
          "Bring back glow & radiance",
        symbol: "☼",
        filter: "Dullness",
      },
    ] as ExploreItem[],
  },

  skinTypes: {
    eyebrow: "Know your skin",
    titleBefore: "Shop by",
    highlight: "skin type.",

    items: [
      {
        title: "Dry",
        description:
          "Comforting hydration and barrier-focused care.",
        symbol: "D",
        filter: "Dry",
      },
      {
        title: "Oily",
        description:
          "Lightweight hydration and balanced formulas.",
        symbol: "O",
        filter: "Oily",
      },
      {
        title: "Combination",
        description:
          "Flexible care for both dry and oily areas.",
        symbol: "C",
        filter: "Combination",
      },
      {
        title: "Sensitive",
        description:
          "Gentle formulas with a simpler approach.",
        symbol: "S",
        filter: "Sensitive",
      },
    ] as ExploreItem[],
  },

  products: {
    eyebrow: "Lizzy's Skincare Picks",
    titleBefore: "Skincare worth",
    highlight: "discovering.",
    description:
      "A curated selection of skincare products from The Lizzy Edit.",
    buttonText: "View All Skincare →",
    buttonLink:
      "/picks?filter=Skincare",
    emptyTitle:
      "More skincare picks are coming.",
    emptyDescription:
      "I'm still curating products for this collection.",
  },

  routine: {
    eyebrow: "Lizzy's Guide",
    titleBefore:
      "A simple routine is often a",
    highlight: "good routine.",
    description:
      "You don't necessarily need ten different products. Start with the essentials and build around what your skin actually needs.",
    buttonText: "Read Beauty Guide →",
    buttonLink: "/beauty-guide",

    steps: [
      {
        number: "01",
        title: "Cleanse",
        description:
          "Start with a cleanser suited to your skin and routine.",
      },
      {
        number: "02",
        title: "Treat",
        description:
          "Choose targeted products based on your main concern.",
      },
      {
        number: "03",
        title: "Moisturize",
        description:
          "Support hydration and your skin barrier.",
      },
      {
        number: "04",
        title: "Protect",
        description:
          "Finish your morning routine with sunscreen.",
      },
    ] as RoutineStep[],
  },

  cta: {
    eyebrow:
      "Lizzy's Skincare Picks",
    title:
      "Ready to discover products for your routine?",
  },
};

// =================================
// PAGE
// =================================

export default async function SkincarePage() {
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
    .eq("category", "Skincare")
    .order("created_at", {
      ascending: false,
    });

  if (productError) {
    console.error(
      "Error loading skincare products:",
      productError,
    );
  }

  const skincareProducts =
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
    .eq("page", "skincare")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading skincare page content:",
      contentError,
    );
  }

  const savedContent =
    contentData?.content ?? {};

  // =================================
  // MERGE FALLBACK + CMS
  // =================================

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const concerns = {
    ...fallbackContent.concerns,
    ...(savedContent.concerns ?? {}),
    items:
      savedContent.concerns?.items ??
      fallbackContent.concerns.items,
  };

  const skinTypes = {
    ...fallbackContent.skinTypes,
    ...(savedContent.skinTypes ?? {}),
    items:
      savedContent.skinTypes?.items ??
      fallbackContent.skinTypes.items,
  };

  const products = {
    ...fallbackContent.products,
    ...(savedContent.products ?? {}),
  };

  const routine = {
    ...fallbackContent.routine,
    ...(savedContent.routine ?? {}),
    steps:
      savedContent.routine?.steps ??
      fallbackContent.routine.steps,
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

      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f4e8e2]">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white/60 blur-3xl sm:h-96 sm:w-96" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
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
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/50 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                {hero.secondaryButtonText}
              </Link>
            </div>
          </div>

          {/* HERO IMAGE */}

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-[#e5d0c7] opacity-30 blur-3xl sm:-inset-7" />

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
          CONCERNS
      ================================= */}

      <section
        id="concerns"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {concerns.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            {concerns.titleBefore}{" "}

            <span className="italic text-[#c78f86]">
              {concerns.highlight}
            </span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-stone-600 sm:text-base">
            {concerns.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {concerns.items.map(
            (concern: ExploreItem) => (
              <ExploreCard
                key={concern.title}
                title={concern.title}
                description={
                  concern.description
                }
                symbol={concern.symbol}
                filter={concern.filter}
              />
            ),
          )}
        </div>
      </section>

      {/* =================================
          SKIN TYPES
      ================================= */}

      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              {skinTypes.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              {skinTypes.titleBefore}{" "}

              <span className="italic text-[#c78f86]">
                {skinTypes.highlight}
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skinTypes.items.map(
              (skin: ExploreItem) => (
                <ExploreCard
                  key={skin.title}
                  title={skin.title}
                  description={
                    skin.description
                  }
                  symbol={skin.symbol}
                  filter={skin.filter}
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* =================================
          SKINCARE PRODUCTS
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
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

        {skincareProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {skincareProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    slug: product.slug,
                    brand: product.brand,
                    name: product.name,
                    category:
                      product.category,
                    tags:
                      product.tags ?? [],
                    type:
                      product.type ?? "",
                    image:
                      product.image_url ?? "",
                    description:
                      product.description ?? "",
                    whyILikeIt:
                      product.why_i_like_it ??
                      [],
                    affiliateUrl:
                      product.affiliate_url ??
                      undefined,
                    featured:
                      product.featured,
                    homeTag:
                      product.home_tag ??
                      undefined,
                    skinTones:
                      product.skin_tones ??
                      [],
                    undertones:
                      product.undertones ??
                      [],
                    concerns:
                      product.concerns ?? [],
                  }}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] border border-stone-200 bg-white px-6 py-14 text-center">
            <p className="font-serif text-3xl">
              {products.emptyTitle}
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              {products.emptyDescription}
            </p>
          </div>
        )}
      </section>

      {/* =================================
          ROUTINE
      ================================= */}

      <section className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                {routine.eyebrow}
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                {routine.titleBefore}{" "}

                <span className="italic text-[#c78f86]">
                  {routine.highlight}
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                {routine.description}
              </p>

              <div className="mt-7 flex justify-center lg:justify-start">
                <Link
                  href={routine.buttonLink}
                  className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
                >
                  {routine.buttonText}
                </Link>
              </div>
            </div>

            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {routine.steps.map(
                (step: RoutineStep) => (
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
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          CTA
      ================================= */}

      <PicksCTA
        eyebrow={cta.eyebrow}
        title={cta.title}
      />

      <Footer />
    </main>
  );
}