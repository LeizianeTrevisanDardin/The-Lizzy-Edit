import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Analytics",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AnalyticsPage() {
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

  // =================================
  // PRODUCTS
  // =================================

  const {
    count: totalProducts,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    });

  const {
    count: publishedProducts,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "published");

  const {
    count: draftProducts,
  } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "draft");

  // =================================
  // SITE CONTENT
  // =================================

  const {
    count: contentSections,
  } = await supabase
    .from("site_content")
    .select("*", {
      count: "exact",
      head: true,
    });

  const stats = [
    {
      label: "Total Products",
      value: totalProducts ?? 0,
      description:
        "All products currently stored in your catalog.",
    },
    {
      label: "Published",
      value: publishedProducts ?? 0,
      description:
        "Products currently visible on the website.",
    },
    {
      label: "Drafts",
      value: draftProducts ?? 0,
      description:
        "Products saved but not currently published.",
    },
    {
      label: "Content Sections",
      value: contentSections ?? 0,
      description:
        "Editable website content sections stored in the CMS.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Overview
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Analytics
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
            A simple overview of your products and website content.
          </p>
        </div>

        {/* STATS */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-stone-200 bg-white p-6"
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">
                {stat.label}
              </p>

              <p className="mt-5 font-serif text-5xl text-[#b77b72]">
                {stat.value}
              </p>

              <p className="mt-4 text-sm leading-6 text-stone-500">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* QUICK LINKS */}
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            href="/admin/products"
            className="group rounded-[28px] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Catalog
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Manage Products
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Add new products, edit existing recommendations and manage publication status.
            </p>

            <span className="mt-6 inline-block text-sm transition-transform group-hover:translate-x-2">
              Open products →
            </span>
          </Link>

          <Link
            href="/admin/content"
            className="group rounded-[28px] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Website
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Manage Content
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Update your homepage, category pages, beauty guides and other website content.
            </p>

            <span className="mt-6 inline-block text-sm transition-transform group-hover:translate-x-2">
              Open content →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}