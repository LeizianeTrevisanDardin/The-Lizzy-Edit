import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AffiliateLink from "@/components/AffiliateLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("journal_posts")
    .select(
      `
        title,
        excerpt,
        image_url,
        image_alt
      `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!post) {
    return {
      title: "Journal Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description:
      post.excerpt ||
      "Read the latest beauty article from The Lizzy Journal.",
    alternates: {
      canonical: `/journal/${slug}`,
    },
    openGraph: {
      title: `${post.title} | The Lizzy Edit`,
      description:
        post.excerpt ||
        "Read the latest beauty article from The Lizzy Journal.",
      url: `/journal/${slug}`,
      type: "article",
      images: post.image_url
        ? [
            {
              url: post.image_url,
              alt:
                post.image_alt ||
                post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | The Lizzy Edit`,
      description:
        post.excerpt ||
        "Read the latest beauty article from The Lizzy Journal.",
      images: post.image_url
        ? [post.image_url]
        : undefined,
    },
  };
}

export default async function JournalPostPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post, error } =
    await supabase
      .from("journal_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

  if (error) {
    console.error(
      "JOURNAL POST LOAD ERROR:",
      error,
    );
  }

  if (!post) {
    notFound();
  }

  const paragraphs = (
    post.content || ""
  )
    .split(/\n\s*\n/)
    .map((paragraph: string) =>
      paragraph.trim(),
    )
    .filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description:
      post.excerpt || undefined,
    image: post.image_url
      ? [post.image_url]
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        `https://the-lizzy-edit.vercel.app/journal/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Lizzy Trevisan",
      url:
        "https://the-lizzy-edit.vercel.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "The Lizzy Edit",
      url:
        "https://the-lizzy-edit.vercel.app",
    },
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd,
          ),
        }}
      />

      <Header />

      <article>
        <section className="border-b border-stone-200 bg-[#f3e7e2]">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/journal"
              className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
            >
              ← The Lizzy Journal
            </Link>

            <p className="mt-9 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {post.category ||
                "Journal"}
            </p>

            <h1 className="mt-4 font-serif text-5xl leading-[1] sm:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                {post.excerpt}
              </p>
            )}
          </div>
        </section>

        {post.image_url && (
          <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[30px] bg-[#ead8d0]">
              <Image
                src={post.image_url}
                alt={
                  post.image_alt ||
                  post.title
                }
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="space-y-6 text-base leading-8 text-stone-700">
            {paragraphs.map(
              (
                paragraph: string,
                index: number,
              ) => (
                <p key={index}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </section>

        {post.product_name &&
          post.affiliate_url && (
            <section className="mx-auto max-w-3xl px-5 pb-14 sm:px-6 sm:pb-20 lg:px-8">
              <div className="rounded-[30px] bg-[#211d1b] p-7 text-white sm:p-9">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-stone-400">
                  Lizzy&apos;s Pick
                </p>

                <h2 className="mt-3 font-serif text-3xl">
                  {post.product_name}
                </h2>

                <AffiliateLink
                  href={
                    post.affiliate_url
                  }
                  productSlug={
                    post.slug
                  }
                  productName={
                    post.product_name
                  }
                  sourcePage={`/journal/${post.slug}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-[#211d1b] transition hover:-translate-y-0.5"
                >
                  Shop This Product →
                </AffiliateLink>
              </div>
            </section>
          )}
      </article>

      <Footer />
    </main>
  );
}