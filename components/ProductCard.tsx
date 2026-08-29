import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/app/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl">
      {/* PRODUCT IMAGE */}
      <Link
        href={`/picks/${product.slug}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f5eee9]">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            quality={95}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />

          {product.homeTag && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
              {product.homeTag}
            </span>
          )}
        </div>
      </Link>

      {/* PRODUCT INFO */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-stone-400 sm:text-[9px]">
          {product.category}
        </p>

        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500 sm:text-[10px]">
          {product.brand}
        </p>

        <Link href={`/picks/${product.slug}`}>
          <h3 className="mt-1 font-serif text-xl leading-tight transition hover:text-[#b76f70] sm:text-2xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 hidden text-sm leading-6 text-stone-500 sm:block">
          {product.description}
        </p>

        {/* ACTIONS */}
        <div className="mt-auto pt-5">
          {product.affiliateUrl ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#211d1b] px-4 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#b76f70]"
            >
              Shop This Product →
            </a>
            ) : (
              <Link
                href={`/picks/${product.slug}`}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#211d1b] px-4 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#b76f70]"
              >
                View Product →
              </Link>
            )}
        </div>
      </div>
    </article>
  );
}