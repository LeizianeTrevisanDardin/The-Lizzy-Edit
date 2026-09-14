import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateProductDetailPage } from "./actions";

export default async function AdminProductDetailContentPage() {
  const supabase = await createClient();

  // =================================
  // AUTH
  // =================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // =================================
  // ADMIN CHECK
  // =================================

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // =================================
  // LOAD CONTENT
  // =================================

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "product-detail")
    .eq("section", "page")
    .maybeSingle();

  if (error) {
    console.error(
      "Error loading product detail admin content:",
      error,
    );
  }

  const content = data?.content ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* =================================
            HEADER
        ================================= */}

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
            Edit Product Detail
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
            Manage the shared text displayed on individual
            product pages.
          </p>
        </div>

        {/* =================================
            FORM
        ================================= */}

        <form
          action={updateProductDetailPage}
          className="mt-8 space-y-8"
        >
          {/* =================================
              NAVIGATION
          ================================= */}

          <Section title="Navigation">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Back Button Text"
                name="backText"
                value={
                  content.backText ??
                  "← Back to Lizzy's Picks"
                }
              />

              <Field
                label="Back Button Link"
                name="backLink"
                value={
                  content.backLink ??
                  "/picks"
                }
              />
            </div>
          </Section>

          {/* =================================
              PRODUCT IMAGE
          ================================= */}

          <Section title="Product Image">
            <Field
              label="Missing Image Text"
              name="imageComingSoon"
              value={
                content.imageComingSoon ??
                "Product image coming soon"
              }
            />
          </Section>

          {/* =================================
              PRODUCT INFORMATION
          ================================= */}

          <Section title="Product Information">
            <Field
              label="Why I Like It Title"
              name="whyILikeItTitle"
              value={
                content.whyILikeItTitle ??
                "Why I Like It"
              }
            />
          </Section>

          {/* =================================
              SHOPPING
          ================================= */}

          <Section title="Shopping">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Shop Button Text"
                name="shopButtonText"
                value={
                  content.shopButtonText ??
                  "Shop This Product →"
                }
              />

              <Field
                label="Product Link Coming Soon Text"
                name="linkComingSoonText"
                value={
                  content.linkComingSoonText ??
                  "Product Link Coming Soon"
                }
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Affiliate Note Under Shop Button"
                  name="affiliateShortText"
                  value={
                    content.affiliateShortText ??
                    "This link may be an affiliate link. I may earn a commission at no additional cost to you."
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Coming Soon Description"
                  name="linkComingSoonDescription"
                  value={
                    content.linkComingSoonDescription ??
                    "Shopping link coming soon."
                  }
                />
              </div>
            </div>
          </Section>

          {/* =================================
              DISCLOSURE
          ================================= */}

          <Section title="Affiliate Disclosure">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Disclosure Eyebrow"
                name="disclosureEyebrow"
                value={
                  content.disclosureEyebrow ??
                  "Affiliate Disclosure"
                }
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Disclosure Text"
                  name="disclosureText"
                  value={
                    content.disclosureText ??
                    "As an Amazon Associate, I earn from qualifying purchases. Some links on The Lizzy Edit may be affiliate links, which means I may earn a commission at no additional cost to you."
                  }
                />
              </div>
            </div>
          </Section>

          {/* =================================
              MORE PICKS
          ================================= */}

          <Section title="More Picks">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="moreEyebrow"
                value={
                  content.moreEyebrow ??
                  "Keep Exploring"
                }
              />

              <Field
                label="Title"
                name="moreTitle"
                value={
                  content.moreTitle ??
                  "More of Lizzy's beauty picks."
                }
              />

              <Field
                label="Button Text"
                name="moreButtonText"
                value={
                  content.moreButtonText ??
                  "See All Picks →"
                }
              />

              <Field
                label="Button Link"
                name="moreButtonLink"
                value={
                  content.moreButtonLink ??
                  "/picks"
                }
              />
            </div>
          </Section>

          {/* =================================
              SAVE
          ================================= */}

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Product Detail Page
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// =================================
// SECTION
// =================================

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

// =================================
// FIELD
// =================================

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

// =================================
// TEXTAREA
// =================================

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
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}