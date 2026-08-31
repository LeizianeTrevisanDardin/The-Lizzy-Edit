import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCatalog from "@/components/PicksCatalog";

import { createClient } from "@/lib/supabase/server";

type PicksPageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

type Product = {
  id: number;
  slug: string;
  brand: string;
  name: string;
  category: "Skincare" | "Makeup" | "Self-Care" | "Fragrance";
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

export default async function PicksPage({
  searchParams,
}: PicksPageProps) {
  const params = await searchParams;

  const initialFilter =
    typeof params.filter === "string"
      ? params.filter
      : "All";

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error loading products:", error);
  }

  const products = (data ?? []) as Product[];

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="border-y border-stone-200 bg-[#f5e9e4]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
            The Lizzy List
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Lizzy&apos;s beauty{" "}
              <span className="italic text-[#c78f86]">
                picks.
              </span>
            </h1>

            <p className="max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              A curated collection of skincare, makeup, self-care and fragrance
              products I think are worth discovering.
            </p>
          </div>
        </div>
      </section>

      <PicksCatalog
        initialFilter={initialFilter}
        products={products}
      />

      {/* LIZZY NOTE */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[28px] bg-[#211d1b] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
              A note from Lizzy
            </p>

            <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
              I&apos;d rather recommend fewer products that actually make
              sense.
            </h2>
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-stone-400 lg:mt-0">
            These collections are designed to make beauty shopping easier —
            with practical recommendations for different routines, budgets and
            preferences.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}