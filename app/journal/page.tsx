import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "The Lizzy Journal",
  description:
    "Beauty articles, product features and curated recommendations from The Lizzy Edit.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "The Lizzy Journal | The Lizzy Edit",
    description:
      "Beauty articles, product features and curated recommendations from The Lizzy Edit.",
    url: "/journal",
    type: "website",
  },
};

export default async function JournalPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("journal_posts")
    .select(
      `
        id,
        title,
        slug,
        category,
        excerpt,
        image_url,
        image_alt,
        created_at
      `,
    )
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "JOURNAL LOAD ERROR:",
      error,
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      <section className="border-b border-stone-200 bg-[#f3e7e2]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
            Editorial
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            The Lizzy{" "}
            <span className="italic text-[#c78f86]">
              Journal
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
            Beauty notes, product features and personal recommendations from The Lizzy Edit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {!posts || posts.length === 0 ? (
          <div className="rounded-[28px] border border-stone-200 bg-white p-10 text-center">
            <p className="text-sm text-stone-500">
              No journal posts yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {post.image_url && (
                  <Link
                    href={`/journal/${post.slug}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f5eee9]">
                      <Image
                        src={post.image_url}
                        alt={
                          post.image_alt ||
                          post.title
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                    {post.category || "Journal"}
                  </p>

                  <Link
                    href={`/journal/${post.slug}`}
                  >
                    <h2 className="mt-3 font-serif text-3xl leading-tight transition hover:text-[#b77b72]">
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p className="mt-4 text-sm leading-7 text-stone-500">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/journal/${post.slug}`}
                      className="text-[10px] font-medium uppercase tracking-[0.16em] transition hover:text-[#b77b72]"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}