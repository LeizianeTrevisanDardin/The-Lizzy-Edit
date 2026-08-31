import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProductsPage() {
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

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-xs text-stone-500 transition hover:text-[#b77b72]"
            >
              ← Dashboard
            </Link>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Catalog
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Products
            </h1>

            <p className="mt-3 text-sm text-stone-500">
              Manage your beauty recommendations.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#b77b72]"
          >
            + Add Product
          </Link>
        </div>

        {!products || products.length === 0 ? (
          <div className="mt-10 rounded-[28px] border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <p className="font-serif text-3xl">
              No products yet
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Your Supabase catalog is empty. Add your first product to start
              building The Lizzy Edit catalog.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-white">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_120px_100px] gap-4 border-b border-stone-200 bg-[#faf6f3] px-6 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500 md:grid">
              <span>Product</span>
              <span>Category</span>
              <span>Brand</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-stone-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[1.4fr_1fr_1fr_120px_100px] md:items-center md:px-6"
                >
                  <div>
                    <p className="font-serif text-xl">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-stone-400">
                      {product.slug}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-400 md:hidden">
                      Category
                    </p>

                    <p className="mt-1 text-sm md:mt-0">
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-400 md:hidden">
                      Brand
                    </p>

                    <p className="mt-1 text-sm md:mt-0">
                      {product.brand}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] ${
                        product.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-xs font-medium text-[#b77b72] transition hover:text-[#211d1b]"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}