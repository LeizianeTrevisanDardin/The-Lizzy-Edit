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

  // =================================
  // AFFILIATE CLICKS
  // =================================

  const {
    data: clickData,
    count: totalClicks,
  } = await supabase
    .from("affiliate_clicks")
    .select(
      "product_slug, product_name, source_page, created_at",
      {
        count: "exact",
      },
    )
    .order("created_at", {
      ascending: false,
    });

  const clicks = clickData ?? [];

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7,
  );

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30,
  );

  const clicksToday = clicks.filter(
    (click) =>
      new Date(click.created_at) >=
      startOfToday,
  ).length;

  const clicksLast7Days = clicks.filter(
    (click) =>
      new Date(click.created_at) >=
      sevenDaysAgo,
  ).length;

  const clicksLast30Days = clicks.filter(
    (click) =>
      new Date(click.created_at) >=
      thirtyDaysAgo,
  ).length;

  // =================================
  // TOP PRODUCTS
  // =================================

  const productClickMap = new Map<
    string,
    {
      name: string;
      slug: string;
      clicks: number;
    }
  >();

  for (const click of clicks) {
    const slug =
      click.product_slug || "unknown";

    const name =
      click.product_name ||
      click.product_slug ||
      "Unknown Product";

    const existing =
      productClickMap.get(slug);

    if (existing) {
      existing.clicks += 1;
    } else {
      productClickMap.set(slug, {
        name,
        slug,
        clicks: 1,
      });
    }
  }

  const topProducts = Array.from(
    productClickMap.values(),
  )
    .sort(
      (a, b) =>
        b.clicks - a.clicks,
    )
    .slice(0, 5);

  // =================================
  // CLICK SOURCES
  // =================================

  const sourceMap = new Map<
    string,
    number
  >();

  for (const click of clicks) {
    const source =
      click.source_page ||
      "unknown";

    sourceMap.set(
      source,
      (sourceMap.get(source) ?? 0) + 1,
    );
  }

  const topSources = Array.from(
    sourceMap.entries(),
  )
    .map(([source, count]) => ({
      source,
      count,
    }))
    .sort(
      (a, b) =>
        b.count - a.count,
    )
    .slice(0, 5);

  // =================================
  // STATS
  // =================================

  const productStats = [
    {
      label: "Total Products",
      value: totalProducts ?? 0,
      description:
        "All products stored in your catalog.",
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

  const clickStats = [
    {
      label: "Total Clicks",
      value: totalClicks ?? 0,
    },
    {
      label: "Today",
      value: clicksToday,
    },
    {
      label: "Last 7 Days",
      value: clicksLast7Days,
    },
    {
      label: "Last 30 Days",
      value: clicksLast30Days,
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
            Track your product catalog, website content and affiliate clicks.
          </p>
        </div>

        {/* AFFILIATE CLICKS */}
        <section className="mt-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Affiliate Performance
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Link Clicks
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clickStats.map((stat) => (
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
              </div>
            ))}
          </div>
        </section>

        {/* TOP PRODUCTS + SOURCES */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* TOP PRODUCTS */}
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Affiliate Performance
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Top Products
            </h2>

            <div className="mt-6 divide-y divide-stone-200">
              {topProducts.length > 0 ? (
                topProducts.map(
                  (product, index) => (
                    <div
                      key={product.slug}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="font-serif text-xl text-[#c78f86]">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-stone-400">
                            {product.slug}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-sm text-stone-500">
                        {product.clicks}{" "}
                        {product.clicks === 1
                          ? "click"
                          : "clicks"}
                      </span>
                    </div>
                  ),
                )
              ) : (
                <p className="py-6 text-sm text-stone-500">
                  No affiliate clicks yet.
                </p>
              )}
            </div>
          </div>

          {/* CLICK SOURCES */}
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Traffic
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Click Sources
            </h2>

            <div className="mt-6 divide-y divide-stone-200">
              {topSources.length > 0 ? (
                topSources.map(
                  (source) => (
                    <div
                      key={source.source}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <p className="min-w-0 truncate text-sm text-stone-600">
                        {source.source}
                      </p>

                      <span className="shrink-0 text-sm text-stone-500">
                        {source.count}{" "}
                        {source.count === 1
                          ? "click"
                          : "clicks"}
                      </span>
                    </div>
                  ),
                )
              ) : (
                <p className="py-6 text-sm text-stone-500">
                  No click sources yet.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* PRODUCT / CMS STATS */}
        <section className="mt-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Website
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Content Overview
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productStats.map(
              (stat) => (
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
              ),
            )}
          </div>
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
              Add new products, edit recommendations and manage publication status.
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