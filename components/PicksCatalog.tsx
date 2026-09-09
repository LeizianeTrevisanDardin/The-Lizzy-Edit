"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";

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

type PicksCatalogContent = {
  filterAll: string;
  filterSkincare: string;
  filterMakeup: string;
  filterSelfCare: string;
  filterFragrance: string;
  filterUnder25: string;
  filterEveryday: string;
  filterSplurge: string;

  allPicksLabel: string;
  picksSuffix: string;
  curatedForLabel: string;

  productSingular: string;
  productPlural: string;

  emptyTitle: string;
  emptyDescription: string;
  viewAllText: string;

  shopButtonText: string;
  viewButtonText: string;
};

type PicksCatalogProps = {
  initialFilter?: string;
  products: Product[];
  content: PicksCatalogContent;
};

const filterValues = [
  {
    value: "All",
    key: "filterAll",
  },
  {
    value: "Skincare",
    key: "filterSkincare",
  },
  {
    value: "Makeup",
    key: "filterMakeup",
  },
  {
    value: "Self-Care",
    key: "filterSelfCare",
  },
  {
    value: "Fragrance",
    key: "filterFragrance",
  },
  {
    value: "Under $25",
    key: "filterUnder25",
  },
  {
    value: "Everyday",
    key: "filterEveryday",
  },
  {
    value: "Worth the Splurge",
    key: "filterSplurge",
  },
] as const;

export default function PicksCatalog({
  initialFilter = "All",
  products,
  content,
}: PicksCatalogProps) {
  const [activeFilter, setActiveFilter] =
    useState(initialFilter);

  const filteredProducts = products.filter(
    (product) => {
      if (activeFilter === "All") {
        return true;
      }

      if (product.category === activeFilter) {
        return true;
      }

      if (product.tags.includes(activeFilter)) {
        return true;
      }

      return false;
    },
  );

  return (
    <>
      {/* FILTERS */}
      <section className="sticky top-0 z-20 border-b border-stone-200 bg-[#fffaf7]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterValues.map((filter) => {
              const isActive =
                activeFilter === filter.value;

              const label =
                content[filter.key];

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter.value)
                  }
                  className={`min-h-11 shrink-0 rounded-full px-5 text-[10px] font-medium uppercase tracking-[0.13em] transition ${
                    isActive
                      ? "bg-black text-white"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-stone-500">
              {activeFilter === "All"
                ? content.allPicksLabel
                : `${getFilterLabel(
                    activeFilter,
                    content,
                  )} ${content.picksSuffix}`}
            </p>

            {!filterValues.some(
              (filter) =>
                filter.value === activeFilter,
            ) &&
              activeFilter !== "All" && (
                <p className="mt-1 text-xs text-[#b77b72]">
                  {content.curatedForLabel}{" "}
                  {activeFilter}
                </p>
              )}
          </div>

          <p className="shrink-0 text-xs text-stone-400">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? content.productSingular
              : content.productPlural}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {filteredProducts.map((product) => (
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
                  content.shopButtonText
                }
                viewButtonText={
                  content.viewButtonText
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-serif text-3xl">
              {content.emptyTitle}
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              {content.emptyDescription}
            </p>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("All")
              }
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-700"
            >
              {content.viewAllText}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function getFilterLabel(
  value: string,
  content: PicksCatalogContent,
) {
  const filter = filterValues.find(
    (item) => item.value === value,
  );

  if (!filter) {
    return value;
  }

  return content[filter.key];
}