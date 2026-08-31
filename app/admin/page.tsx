import Link from "next/link";
import { redirect } from "next/navigation";

import AdminLogoutButton from "@/components/AdminLogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              The Lizzy Edit
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-sm text-stone-500">
              Welcome, {profile.display_name || "Lizzy"}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72] hover:text-[#b77b72]"
            >
              View Website →
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/products"
            className="group rounded-[28px] border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Catalog
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Products
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Add, edit, publish and manage your beauty recommendations.
            </p>

            <span className="mt-6 inline-block text-sm transition group-hover:translate-x-2">
              Manage products →
            </span>
          </Link>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6 opacity-60">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">
              Coming Soon
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Beauty Guides
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Create and manage editorial beauty content.
            </p>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6 opacity-60">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">
              Coming Soon
            </p>

            <h2 className="mt-4 font-serif text-3xl">
              Analytics
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Track product clicks and affiliate performance.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}