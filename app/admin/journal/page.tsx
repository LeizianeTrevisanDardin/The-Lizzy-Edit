import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "The Lizzy Journal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminJournalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const {
    data: posts,
    error,
  } = await supabase
    .from("journal_posts")
    .select(
      `
        id,
        title,
        slug,
        category,
        status,
        created_at,
        updated_at
      `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "JOURNAL POSTS LOAD ERROR:",
      error,
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
            >
              ← Back to Dashboard
            </Link>

            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Editorial
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              The Lizzy Journal
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
              Create and manage beauty articles, product features and affiliate recommendations.
            </p>
          </div>

          <Link
            href="/admin/journal/new"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
          >
            New Post +
          </Link>
        </div>

        {/* EMPTY STATE */}
        {!posts || posts.length === 0 ? (
          <section className="mt-8 rounded-[28px] border border-stone-200 bg-white p-8 text-center sm:p-12">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              The Lizzy Journal
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              No posts yet.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
              Create your first journal post and add a product recommendation, image and affiliate link.
            </p>

            <Link
              href="/admin/journal/new"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Create First Post →
            </Link>
          </section>
        ) : (
          <section className="mt-8 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-5 rounded-[24px] border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                      {post.category || "Journal"}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-[8px] font-medium uppercase tracking-[0.14em] ${
                        post.status ===
                        "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-xs text-stone-400">
                    /journal/{post.slug}
                  </p>

                  <p className="mt-3 text-xs text-stone-400">
                    Created{" "}
                    {new Date(
                      post.created_at,
                    ).toLocaleDateString(
                      "en-CA",
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  {post.status ===
                    "published" && (
                    <Link
                      href={`/journal/${post.slug}`}
                      target="_blank"
                      className="inline-flex min-h-10 items-center justify-center rounded-full border border-stone-200 px-5 text-[9px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72] hover:text-[#b77b72]"
                    >
                      View
                    </Link>
                  )}

                  <Link
                    href={`/admin/journal/${post.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#211d1b] px-5 text-[9px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
                  >
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}