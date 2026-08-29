"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import { products } from "@/app/data/products";

type PicksCatalogProps = {
  initialFilter?: string;
};

const filters = [
  "All",
  "Skincare",
  "Makeup",
  "Self-Care",
  "Fragrance",
  "Under $25",
  "Everyday",
  "Worth the Splurge",
];

export default function PicksCatalog({
  initialFilter = "All",
}: PicksCatalogProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filteredProducts = products.filter((product) => {
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
  });

  return (
    <>
      {/* FILTERS */}
      <section className="sticky top-0 z-20 border-b border-stone-200 bg-[#fffaf7]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-11 shrink-0 rounded-full px-5 text-[10px] font-medium uppercase tracking-[0.13em] transition ${
                    isActive
                      ? "bg-black text-white"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
                  }`}
                >
                  {filter}
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
                ? "All beauty picks"
                : `${activeFilter} picks`}
            </p>

            {!filters.includes(activeFilter) &&
              activeFilter !== "All" && (
                <p className="mt-1 text-xs text-[#b77b72]">
                  Curated for {activeFilter}
                </p>
              )}
          </div>

          <p className="shrink-0 text-xs text-stone-400">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-serif text-3xl">
              More picks are coming.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              I&apos;m still curating recommendations for this collection.
            </p>

            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-700"
            >
              View All Picks
            </button>
          </div>
        )}
      </section>
    </>
  );
}