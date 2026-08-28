import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/app/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* BACK */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/picks"
          className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-black"
        >
          ← Back to Lizzy&apos;s Picks
        </Link>
      </section>

      {/* PRODUCT */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-[#d6b7ad]/20 blur-3xl" />

            <div className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden rounded-[30px] border border-stone-200 bg-[#f2e4de] shadow-sm">
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="lg:sticky lg:top-24">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {product.category}
            </p>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              {product.brand}
            </p>

            <h1 className="mt-3 max-w-xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              {product.type}
            </p>

            <p className="mt-7 max-w-xl text-base leading-8 text-stone-600">
              {product.description}
            </p>

            {/* WHY I LIKE IT */}
            <div className="mt-10 border-y border-stone-200 py-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
                Why I Like It
              </p>

              <div className="mt-5 space-y-4">
                {product.whyILikeIt.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-[#c78f86]">
                      ✦
                    </span>

                    <p className="text-sm leading-6 text-stone-700 sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SHOP */}
            <div className="mt-8">
              {product.affiliateUrl ? (
                <>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#b76f70] sm:w-auto"
                  >
                    Shop This Product →
                  </a>

                  <p className="mt-4 max-w-md text-xs leading-5 text-stone-500">
                    This link may be an affiliate link. I may earn a commission
                    at no additional cost to you.
                  </p>
                </>
              ) : (
                <div>
                  <span className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-stone-300 px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-500 sm:w-auto">
                    Product Link Coming Soon
                  </span>

                  <p className="mt-4 max-w-md text-xs leading-5 text-stone-500">
                    Shopping link coming soon.
                  </p>
                </div>
              )}
            </div>

            {/* DISCLOSURE */}
            <div className="mt-10 rounded-[24px] bg-[#f6eee9] p-5 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                Affiliate Disclosure
              </p>

              <p className="mt-3 text-xs leading-6 text-stone-600">
                As an Amazon Associate, I earn from qualifying purchases.
                Some links on The Lizzy Edit may be affiliate links, which
                means I may earn a commission at no additional cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE PICKS */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-500">
                Keep Exploring
              </p>

              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                More of Lizzy&apos;s beauty picks.
              </h2>
            </div>

            <Link
              href="/picks"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:bg-stone-100"
            >
              See All Picks →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}