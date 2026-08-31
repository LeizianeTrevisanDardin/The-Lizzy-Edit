import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

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

export default async function LizzyPicks() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    })
    .limit(6);

  if (error) {
    console.error("Error loading home products:", error);
  }

  const products = (data ?? []) as Product[];

  return (
    <section
      id="picks"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            The Lizzy List
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Editor&apos;s{" "}
            <span className="italic text-[#c78f86]">
              favorites.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            A few of my latest beauty finds — from skincare staples to makeup,
            fragrance and self-care favorites.
          </p>
        </div>

        <Link
          href="/picks"
          className="inline-flex min-h-11 items-center text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
        >
          View All Picks →
        </Link>
      </div>

      {/* LATEST 6 PRODUCTS */}
      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {products.map((product) => (
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
                description: product.description ?? "",
                whyILikeIt: product.why_i_like_it ?? [],
                affiliateUrl: product.affiliate_url ?? undefined,
                featured: product.featured,
                homeTag: product.home_tag ?? undefined,
                skinTones: product.skin_tones ?? [],
                undertones: product.undertones ?? [],
                concerns: product.concerns ?? [],
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-stone-200 bg-white px-6 py-14 text-center">
          <p className="font-serif text-3xl">
            New beauty picks are coming.
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
            I&apos;m curating more skincare, makeup, fragrance and self-care
            favorites.
          </p>
        </div>
      )}

      {/* AFFILIATE NOTE */}
      <div className="mt-8 rounded-[22px] bg-[#f6eee9] p-5 sm:p-6">
        <p className="text-xs leading-6 text-stone-600 sm:text-sm">
          <span className="font-medium text-stone-800">
            ♡ A note from Lizzy:
          </span>{" "}
          Some products featured on The Lizzy Edit may be purchased through
          affiliate links. As an Amazon Associate, I earn from qualifying
          purchases at no additional cost to you. ♡
        </p>
      </div>
    </section>
  );
}