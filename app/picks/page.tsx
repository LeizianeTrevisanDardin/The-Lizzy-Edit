"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import { products } from "@/app/data/products";

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

export default function PicksPage() {
  const searchParams = useSearchParams();

  const urlFilter = searchParams.get("filter");

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const activeFilter =
    selectedFilter ?? urlFilter ?? "All";

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
                  onClick={() => setSelectedFilter(filter)}
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

        {/* RESULT INFO */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-stone-500">
              {activeFilter === "All"
                ? "All beauty picks"
                : `${activeFilter} picks`}
            </p>

            {urlFilter &&
              activeFilter === urlFilter &&
              !filters.includes(urlFilter) && (
                <p className="mt-1 text-xs text-[#b77b72]">
                  Curated for {urlFilter}
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

        {/* PRODUCT GRID */}
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
              onClick={() => setSelectedFilter("All")}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-700"
            >
              View All Picks
            </button>
          </div>
        )}
      </section>

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