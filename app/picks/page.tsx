import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCatalog from "@/components/PicksCatalog";

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

type PicksPageProps = {
  searchParams?: Promise<{
    filter?: string;
  }>;
};

const fallbackContent = {
  hero: {
    eyebrow: "The Lizzy List",
    titleBefore: "Lizzy's beauty",
    highlight: "picks.",
    description:
      "A curated collection of skincare, makeup, self-care and fragrance products I think are worth discovering.",
  },

  note: {
    eyebrow: "A note from Lizzy",
    title:
      "I'd rather recommend fewer products that actually make sense.",
    description:
      "These collections are designed to make beauty shopping easier — with practical recommendations for different routines, budgets and preferences.",
  },

  catalog: {
    filterAll: "All",
    filterSkincare: "Skincare",
    filterMakeup: "Makeup",
    filterSelfCare: "Self-Care",
    filterFragrance: "Fragrance",
    filterUnder25: "Under $25",
    filterEveryday: "Everyday",
    filterSplurge: "Worth the Splurge",

    allPicksLabel: "All beauty picks",
    picksSuffix: "picks",
    curatedForLabel: "Curated for",

    productSingular: "product",
    productPlural: "products",

    emptyTitle: "More picks are coming.",
    emptyDescription:
      "I'm still curating recommendations for this collection.",

    viewAllText: "View All Picks",

    shopButtonText:
      "Shop This Product →",

    viewButtonText:
      "View Product →",
  },
};

export default async function PicksPage({
  searchParams,
}: PicksPageProps) {
  const supabase = await createClient();

  const params = searchParams
    ? await searchParams
    : {};

  const initialFilter =
    params?.filter || "All";

  const [
    productsResponse,
    contentResponse,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("site_content")
      .select("content")
      .eq("page", "picks")
      .eq("section", "page")
      .maybeSingle(),
  ]);

  if (productsResponse.error) {
    console.error(
      "Error loading picks:",
      productsResponse.error,
    );
  }

  if (contentResponse.error) {
    console.error(
      "Error loading Picks content:",
      contentResponse.error,
    );
  }

  const products =
    (productsResponse.data ?? []) as Product[];

  const savedContent =
    contentResponse.data?.content ?? {};

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const note = {
    ...fallbackContent.note,
    ...(savedContent.note ?? {}),
  };

  const catalog = {
    ...fallbackContent.catalog,
    ...(savedContent.catalog ?? {}),
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            {hero.titleBefore}{" "}

            <span className="italic text-[#c78f86]">
              {hero.highlight}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {hero.description}
          </p>
        </div>
      </section>

      {/* CATALOG */}
      <PicksCatalog
        initialFilter={initialFilter}
        products={products}
        content={catalog}
      />

      {/* LIZZY NOTE */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[30px] bg-[#211d1b] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#d4a59d]">
            {note.eyebrow}
          </p>

          <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {note.title}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
            {note.description}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}