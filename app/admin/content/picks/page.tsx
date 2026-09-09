import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updatePicksPage } from "./actions";

export default async function AdminPicksContentPage() {
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

  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "picks")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const note = content.note ?? {};
  const catalog = content.catalog ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin/content"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Site Content
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Page
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Picks
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the text content displayed on the Picks page.
          </p>
        </div>

        <form
          action={updatePicksPage}
          className="mt-8 space-y-8"
        >
          {/* HERO */}
          <Section title="Hero">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="heroEyebrow"
                value={hero.eyebrow}
              />

              <Field
                label="Title Before"
                name="heroTitleBefore"
                value={hero.titleBefore}
              />

              <Field
                label="Highlight"
                name="heroHighlight"
                value={hero.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="heroDescription"
                  value={hero.description}
                />
              </div>
            </div>
          </Section>

          {/* LIZZY NOTE */}
          <Section title="Lizzy Note">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="noteEyebrow"
                value={note.eyebrow}
              />

              <Field
                label="Title"
                name="noteTitle"
                value={note.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="noteDescription"
                  value={note.description}
                />
              </div>
            </div>
          </Section>

          {/* CATALOG FILTERS */}
          <Section title="Catalog Filters">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="All"
                name="filterAll"
                value={catalog.filterAll}
              />

              <Field
                label="Skincare"
                name="filterSkincare"
                value={catalog.filterSkincare}
              />

              <Field
                label="Makeup"
                name="filterMakeup"
                value={catalog.filterMakeup}
              />

              <Field
                label="Self-Care"
                name="filterSelfCare"
                value={catalog.filterSelfCare}
              />

              <Field
                label="Fragrance"
                name="filterFragrance"
                value={catalog.filterFragrance}
              />

              <Field
                label="Under $25"
                name="filterUnder25"
                value={catalog.filterUnder25}
              />

              <Field
                label="Everyday"
                name="filterEveryday"
                value={catalog.filterEveryday}
              />

              <Field
                label="Worth the Splurge"
                name="filterSplurge"
                value={catalog.filterSplurge}
              />
            </div>
          </Section>

          {/* CATALOG LABELS */}
          <Section title="Catalog Labels">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="All Picks Label"
                name="allPicksLabel"
                value={catalog.allPicksLabel}
              />

              <Field
                label="Picks Suffix"
                name="picksSuffix"
                value={catalog.picksSuffix}
              />

              <Field
                label="Curated For Label"
                name="curatedForLabel"
                value={catalog.curatedForLabel}
              />

              <Field
                label="Product Singular"
                name="productSingular"
                value={catalog.productSingular}
              />

              <Field
                label="Product Plural"
                name="productPlural"
                value={catalog.productPlural}
              />
            </div>
          </Section>

          {/* PRODUCT CARD BUTTONS */}
          <Section title="Product Card Buttons">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Shop Button Text"
                name="shopButtonText"
                value={
                  catalog.shopButtonText ??
                  "Shop This Product →"
                }
              />

              <Field
                label="View Button Text"
                name="viewButtonText"
                value={
                  catalog.viewButtonText ??
                  "View Product →"
                }
              />
            </div>
          </Section>

          {/* EMPTY STATE */}
          <Section title="Empty Catalog">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Empty Title"
                name="emptyTitle"
                value={catalog.emptyTitle}
              />

              <Field
                label="View All Button"
                name="viewAllText"
                value={catalog.viewAllText}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Empty Description"
                  name="emptyDescription"
                  value={catalog.emptyDescription}
                />
              </div>
            </div>
          </Section>

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Picks Page
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
      <div className="border-b border-stone-200 pb-5">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
          Section
        </p>

        <h2 className="mt-2 font-serif text-3xl">
          {title}
        </h2>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value?: string;
};

function Field({
  label,
  name,
  value,
}: FieldProps) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
        {label}
      </label>

      <input
        name={name}
        defaultValue={value ?? ""}
        className="mt-2 w-full rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}

type TextareaProps = {
  label: string;
  name: string;
  value?: string;
};

function Textarea({
  label,
  name,
  value,
}: TextareaProps) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
        {label}
      </label>

      <textarea
        name={name}
        defaultValue={value ?? ""}
        rows={3}
        className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}