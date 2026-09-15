import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import AffiliateLink from "@/components/AffiliateLink";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

const fallbackContent = {
  backText:
    "← Back to Lizzy's Picks",

  imageComingSoon:
    "Product image coming soon",

  whyILikeItTitle:
    "Why I Like It",

  shopButtonText:
    "Shop This Product →",

  affiliateShortText:
    "This link may be an affiliate link. I may earn a commission at no additional cost to you.",

  linkComingSoonText:
    "Product Link Coming Soon",

  linkComingSoonDescription:
    "Shopping link coming soon.",

  disclosureEyebrow:
    "Affiliate Disclosure",

  disclosureText:
    "As an Amazon Associate, I earn from qualifying purchases. Some links on The Lizzy Edit may be affiliate links, which means I may earn a commission at no additional cost to you.",

  moreEyebrow:
    "Keep Exploring",

  moreTitle:
    "More of Lizzy's beauty picks.",

  moreButtonText:
    "See All Picks →",

  backLink:
    "/picks",

  moreButtonLink:
    "/picks",
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select(
      "slug, brand, name, description, image_url, category, status",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${data.brand} ${data.name}`;

  const description =
    data.description?.trim() ||
    `Discover ${data.brand} ${data.name}, a ${data.category.toLowerCase()} pick featured on The Lizzy Edit.`;

  return {
    title,

    description,

    alternates: {
      canonical: `/picks/${data.slug}`,
    },

    openGraph: {
      title: `${title} | The Lizzy Edit`,
      description,
      url: `/picks/${data.slug}`,
      type: "website",
      images: data.image_url
        ? [
            {
              url: data.image_url,
              alt: title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | The Lizzy Edit`,
      description,
      images: data.image_url
        ? [data.image_url]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // =================================
  // LOAD PRODUCT
  // =================================

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Error loading product:",
      error,
    );
  }

  if (!data) {
    notFound();
  }

  const product = data as Product;

  const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  brand: {
    "@type": "Brand",
    name: product.brand,
  },
  description:
    product.description ??
    `${product.brand} ${product.name}`,
  image: product.image_url
    ? [product.image_url]
    : undefined,
  url: `https://the-lizzy-edit.vercel.app/picks/${product.slug}`,
  category: product.category,
};

  // =================================
  // LOAD PRODUCT DETAIL CMS CONTENT
  // =================================

  const {
    data: contentData,
    error: contentError,
  } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "product-detail")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading product detail content:",
      contentError,
    );
  }

  // =================================
  // MERGE FALLBACK + CMS
  // =================================

  const content = {
    ...fallbackContent,
    ...(contentData?.content ?? {}),
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <Header />

      {/* =================================
          BACK
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href={content.backLink}
          className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-black"
        >
          {content.backText}
        </Link>
      </section>

      {/* =================================
          PRODUCT
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-[#d6b7ad]/20 blur-3xl" />

            <div className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden rounded-[30px] border border-stone-200 bg-[#f2e4de] shadow-sm">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={`${product.brand} ${product.name}`}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-stone-400">
                  {content.imageComingSoon}
                </div>
              )}
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

            {product.type && (
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                {product.type}
              </p>
            )}

            {product.description && (
              <p className="mt-7 max-w-xl text-base leading-8 text-stone-600">
                {product.description}
              </p>
            )}

            {/* =================================
                WHY I LIKE IT
            ================================= */}

            {product.why_i_like_it &&
              product.why_i_like_it.length >
                0 && (
                <div className="mt-10 border-y border-stone-200 py-8">
                  <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500">
                    {content.whyILikeItTitle}
                  </p>

                  <div className="mt-5 space-y-4">
                    {product.why_i_like_it.map(
                      (item) => (
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
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* =================================
                SHOP
            ================================= */}

            <div className="mt-8">
              {product.affiliate_url ? (
                <>
                  <AffiliateLink
                    href={product.affiliate_url}
                    productSlug={product.slug}
                    productName={product.name}
                    sourcePage={`/picks/${product.slug}`}
                    className="SEU CLASSNAME ATUAL AQUI"
                  >
                    {content.shopButtonText}
                  </AffiliateLink>

                  <p className="mt-4 max-w-md text-xs leading-5 text-stone-500">
                    {content.affiliateShortText}
                  </p>
                </>
              ) : (
                <div>
                  <span className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-stone-300 px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-500 sm:w-auto">
                    {
                      content.linkComingSoonText
                    }
                  </span>

                  <p className="mt-4 max-w-md text-xs leading-5 text-stone-500">
                    {
                      content.linkComingSoonDescription
                    }
                  </p>
                </div>
              )}
            </div>

            {/* =================================
                DISCLOSURE
            ================================= */}

            <div className="mt-10 rounded-[24px] bg-[#f6eee9] p-5 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                {content.disclosureEyebrow}
              </p>

              <p className="mt-3 text-xs leading-6 text-stone-600">
                {content.disclosureText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          MORE PICKS
      ================================= */}

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-500">
                {content.moreEyebrow}
              </p>

              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                {content.moreTitle}
              </h2>
            </div>

            <Link
              href={
                content.moreButtonLink
              }
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:bg-stone-100"
            >
              {content.moreButtonText}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}