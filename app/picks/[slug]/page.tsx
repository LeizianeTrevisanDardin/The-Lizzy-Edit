import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
  {
    slug: "cicaplast-baume-b5",
    brand: "La Roche-Posay",
    name: "Cicaplast Baume B5+",
    category: "Skincare",
    type: "Soothing • Barrier Support",
    image: "/images/cicaplast.png",
    description:
      "A comforting multi-purpose balm I love for dry or sensitive-feeling skin.",
    whyILikeIt: [
      "Comforting texture",
      "Great for dry-feeling areas",
      "Easy to add to a simple routine",
    ],
  },
  {
    slug: "elf-halo-glow",
    brand: "e.l.f.",
    name: "Halo Glow Liquid Filter",
    category: "Makeup",
    type: "Glow • Everyday Makeup",
    image: "/images/elf.png",
    description:
      "An easy way to add a fresh, luminous finish to everyday makeup.",
    whyILikeIt: [
      "Beautiful luminous finish",
      "Easy for everyday makeup",
      "Works well for a fresh, natural look",
    ],
  },
  {
    slug: "sol-de-janeiro-bum-bum-cream",
    brand: "Sol de Janeiro",
    name: "Brazilian Bum Bum Cream",
    category: "Self-Care",
    type: "Body Care • Indulgent",
    image: "/images/bumbum.png",
    description:
      "A body-care favorite for when you want your routine to feel a little more luxurious.",
    whyILikeIt: [
      "Makes body care feel special",
      "Rich, indulgent texture",
      "A fun addition to a self-care routine",
    ],
  },
  {
    slug: "narciso-rodriguez-pure-musc",
    brand: "Narciso Rodriguez",
    name: "For Her Pure Musc",
    category: "Fragrance",
    type: "Fresh • Soft Musk",
    image: "/images/narciso.png",
    description:
      "Clean, soft and effortlessly feminine. A beautiful everyday musk that feels polished without being overpowering.",
    whyILikeIt: [
      "Soft and feminine",
      "Easy for daytime",
      "Polished without feeling heavy",
    ],
  },
  {
    slug: "burberry-goddess",
    brand: "Burberry",
    name: "Goddess Eau de Parfum",
    category: "Fragrance",
    type: "Vanilla • Warm • Gourmand",
    image: "/images/burberry.png",
    description:
      "Warm, creamy and beautifully feminine. A sophisticated vanilla fragrance with a soft, comforting sweetness.",
    whyILikeIt: [
      "Warm vanilla profile",
      "Comforting but elegant",
      "Beautiful for cooler days and evenings",
    ],
  },
  {
    slug: "rabanne-million-gold-for-her",
    brand: "Rabanne",
    name: "Million Gold For Her Parfum",
    category: "Fragrance",
    type: "Floral • Warm • Sensual",
    image: "/images/pacco.png",
    description:
      "Bold, glamorous and effortlessly feminine with a warm, sensual finish.",
    whyILikeIt: [
      "Has more presence",
      "Feels glamorous and feminine",
      "Great when you want a statement scent",
    ],
  },
  {
    slug: "dior-jadore",
    brand: "Dior",
    name: "J’adore Eau de Parfum",
    category: "Fragrance",
    type: "Floral • Elegant • Feminine",
    image: "/images/dior.png",
    description:
      "Radiant, elegant and beautifully feminine. A sophisticated floral fragrance with a timeless feel.",
    whyILikeIt: [
      "Classic floral profile",
      "Elegant and polished",
      "A timeless feminine fragrance",
    ],
  },
];

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

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/picks"
          className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-black"
        >
          ← Back to Lizzy&apos;s Picks
        </Link>
      </section>

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

            {/* SHOP BUTTON */}
            <div className="mt-8">
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-black px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-white opacity-70 sm:w-auto"
              >
                Product Link Coming Soon
              </button>

              <p className="mt-4 max-w-md text-xs leading-5 text-stone-500">
                Shopping links will be added as affiliate partnerships become available.
              </p>
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