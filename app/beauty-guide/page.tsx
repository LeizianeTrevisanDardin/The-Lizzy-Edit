import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Manage Beauty Guides",
  robots: {
    index: false,
    follow: false,
  },
};

const guides = [
  {
    number: "01",
    category: "Skincare",
    title: "How to Build a Simple Skincare Routine",
    description:
      "Edit the skincare routine guide, including the intro, routine steps, morning and evening sections.",
    href: "/admin/content/beauty-guide-01",
  },
  {
    number: "02",
    category: "Makeup",
    title: "Everyday Makeup That Still Looks Like You",
    description:
      "Edit the everyday makeup guide, including routine steps, quick routines and beauty notes.",
    href: "/admin/content/beauty-guide-02",
  },
  {
    number: "03",
    category: "Skincare",
    title: "Dry vs. Dehydrated Skin",
    description:
      "Edit the guide explaining the differences between dry and dehydrated skin.",
    href: "/admin/content/beauty-guide-03",
  },
  {
    number: "04",
    category: "Makeup",
    title: "How to Choose Your Foundation Finish",
    description:
      "Edit foundation finish types, comparison sections, skin prep and beauty notes.",
    href: "/admin/content/beauty-guide-04",
  },
  {
    number: "05",
    category: "Self-Care",
    title: "The Everything Shower, Simplified",
    description:
      "Edit the everything shower guide, including hair care, body care and post-shower steps.",
    href: "/admin/content/beauty-guide-05",
  },
  {
    number: "06",
    category: "Beauty Tips",
    title: "When Is a Beauty Product Worth the Splurge?",
    description:
      "Edit the guide about value, cost per use, saving and splurging on beauty products.",
    href: "/admin/content/beauty-guide-06",
  },
];

export default async function BeautyGuidesAdminPage() {
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
            Editorial
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Beauty Guides
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
            Choose a guide below to edit its content.
          </p>
        </div>

        {/* GUIDE CARDS */}
        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.number}
              href={guide.href}
              className="group flex min-h-[280px] flex-col rounded-[28px] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d9b3a8] hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                  {guide.category}
                </p>

                <span className="font-serif text-2xl text-stone-300">
                  {guide.number}
                </span>
              </div>

              <h2 className="mt-6 font-serif text-3xl leading-tight">
                {guide.title}
              </h2>

              <p className="mt-4 text-sm leading-6 text-stone-500">
                {guide.description}
              </p>

              <span className="mt-auto pt-8 text-sm transition-transform duration-300 group-hover:translate-x-2">
                Edit guide →
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}