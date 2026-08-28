import Image from "next/image";
import Link from "next/link";

const products = [
  {
    brand: "La Roche-Posay",
    name: "Cicaplast Baume B5+",
    category: "Skincare",
    description:
      "A comforting multi-purpose balm I love for dry or sensitive-feeling skin.",
    tag: "Lizzy Loves",
    image: "/images/cicaplast.png",
  },
  {
    brand: "e.l.f.",
    name: "Halo Glow Liquid Filter",
    category: "Makeup",
    description:
      "An easy way to add a fresh, luminous finish to everyday makeup.",
    tag: "Everyday Pick",
    image: "/images/elf.png",
  },
  {
    brand: "COSRX",
    name: "Advanced Snail 96 Mucin Power Essence",
    category: "Skincare",
    description:
      "A lightweight hydrating essence that fits easily into a simple routine.",
    tag: "Trending",
    image: "/images/snail.png",
  },
  {
    brand: "Sol de Janeiro",
    name: "Brazilian Bum Bum Cream",
    category: "Self-Care",
    description:
      "A body-care favorite for when you want your routine to feel a little more luxurious.",
    tag: "Worth the Splurge",
    image: "/images/bumbum.png",
  },
];

export default function LizzyPicks() {
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
            A few beauty products currently on my radar — from skincare
            staples to makeup and self-care favorites.
          </p>
        </div>

        <Link
          href="/picks"
          className="inline-flex min-h-11 items-center text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
        >
          View All Picks →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.name}
            className="group overflow-hidden rounded-[24px] border border-stone-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* PRODUCT IMAGE */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5eee9]">
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                fill
                quality={95}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />

              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
                {product.tag}
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-stone-400 sm:text-[9px]">
                {product.category}
              </p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500 sm:text-[10px]">
                {product.brand}
              </p>

              <h3 className="mt-1 font-serif text-xl leading-tight sm:text-2xl">
                {product.name}
              </h3>

              <p className="mt-3 hidden text-sm leading-6 text-stone-500 sm:block">
                {product.description}
              </p>

              <div className="mt-5">
                <span className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-stone-300 px-4 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-stone-500">
                  Product Link Coming Soon
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[22px] bg-[#f6eee9] p-5 sm:p-6">
        <p className="text-xs leading-6 text-stone-600 sm:text-sm">
          <span className="font-medium text-stone-800">
            A note from Lizzy:
          </span>{" "}
          Product links are being added soon. In the meantime, The Lizzy Edit
          is being built as a curated space for beauty recommendations,
          education and product discovery.
        </p>
      </div>
    </section>
  );
}