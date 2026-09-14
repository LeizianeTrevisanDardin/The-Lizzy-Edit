import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const pages = [
  {
    title: "Global Content",
    description: "Edit shared content used across the entire website.",
    href: "/admin/content/global",
    status: "Available",
    label: "Global",
  },
  {
    title: "Home",
    description: "Edit the homepage hero and featured sections.",
    href: "/admin/content/home",
    status: "Available",
    label: "Page",
  },
  {
    title: "Skincare",
    description: "Edit skincare page content.",
    href: "/admin/content/skincare",
    status: "Available",
    label: "Page",
  },
  {
    title: "Makeup",
    description: "Edit makeup page content.",
    href: "/admin/content/makeup",
    status: "Available",
    label: "Page",
  },
  {
    title: "Self-Care",
    description: "Edit self-care page content.",
    href: "/admin/content/self-care",
    status: "Available",
    label: "Page",
  },
  {
    title: "Fragrances",
    description: "Edit fragrance page content.",
    href: "/admin/content/fragrances",
    status: "Available",
    label: "Page",
  },
  {
    title: "Beauty Guide",
    description: "Edit your beauty guide landing page.",
    href: "/admin/content/beauty-guide",
    status: "Available",
    label: "Page",
  },
  {
    title: "Find Your Undertone",
    description: "Edit the undertone tool introduction.",
    href: "/admin/content/undertone",
    status: "Available",
    label: "Page",
  },
  {
    title: "About",
    description: "Edit your About page and personal introduction.",
    href: "/admin/content/about",
    status: "Available",
    label: "Page",
  },
  {
    title: "Picks",
    description: "Edit the main content of the beauty picks page.",
    href: "/admin/content/picks",
    status: "Available",
    label: "Page",
  },
  {
  title: "Product Detail",
  description: "Edit shared text used on individual product pages.",
  href: "/admin/content/product-detail",
  status: "Available",
  label: "Page",
  },
  {
    title: "Privacy",
    description: "Edit the Privacy Policy page.",
    href: "/admin/content/privacy",
    status: "Available",
    label: "Page",
  },
  {
    title: "Disclosure",
    description: "Edit the Affiliate Disclosure page.",
    href: "/admin/content/disclosure",
    status: "Available",
    label: "Page",
  },
  
];

export default async function AdminContentPage() {
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

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Admin Dashboard
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Website
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Site Content
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Edit the text, images and content displayed throughout The Lizzy
            Edit.
          </p>
        </div>

        {/* CONTENT CARDS */}
        <section className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const available = page.status === "Available";

            if (available) {
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex h-full flex-col rounded-[28px] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                    {page.label}
                  </p>

                  <h2 className="mt-4 font-serif text-3xl">
                    {page.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    {page.description}
                  </p>

                  <span className="mt-auto pt-6 text-sm transition group-hover:translate-x-2">
                    {page.title === "Global Content"
                      ? "Manage global content →"
                      : "Edit page →"}
                  </span>
                </Link>
              );
            }

            return (
              <div
                key={page.title}
                className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-white p-6 opacity-60"
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">
                  Coming Soon
                </p>

                <h2 className="mt-4 font-serif text-3xl">
                  {page.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                  {page.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}