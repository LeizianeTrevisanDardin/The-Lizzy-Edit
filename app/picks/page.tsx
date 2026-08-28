"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  const [activeFilter, setActiveFilter] = useState("All");

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
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-stone-500">
            {activeFilter === "All"
              ? "All beauty picks"
              : `${activeFilter} picks`}
          </p>

          <p className="text-xs text-stone-400">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[22px] border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl sm:rounded-[28px]"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f2e4de]">
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />

                  <button
                    type="button"
                    aria-label={`Save ${product.name}`}
                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg shadow-sm backdrop-blur-md transition hover:scale-105 hover:bg-white"
                  >
                    ♡
                  </button>

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[8px] font-medium uppercase tracking-[0.15em] text-stone-600 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                {/* PRODUCT INFO */}
                <div className="p-4 sm:p-6">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                    {product.brand}
                  </p>

                  <h2 className="mt-2 font-serif text-xl leading-tight sm:text-2xl">
                    {product.name}
                  </h2>

                  <p className="mt-3 hidden text-sm leading-6 text-stone-600 sm:block">
                    {product.description}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={`/picks/${product.slug}`}
                      className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-black px-4 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-stone-700 sm:w-auto sm:px-5 sm:text-[10px]"
                    >
                      View Product →
                    </Link>
                  </div>
                </div>
              </article>
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