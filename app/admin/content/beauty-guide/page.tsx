import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateBeautyGuidePage } from "./actions";

export default async function AdminBeautyGuideContentPage() {
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
    .eq("page", "beauty-guide")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const featured = content.featured ?? {};
  const articles = content.articles ?? {};
  const articleItems = articles.items ?? [];
  const quickTips = content.quickTips ?? {};
  const quickTipItems = quickTips.items ?? [];
  const explore = content.explore ?? {};
  const exploreItems = explore.items ?? [];
  const darkCta = content.darkCta ?? {};
  const cta = content.cta ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADER */}
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
            Edit Beauty Guide
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the content displayed on your Beauty Guide landing page.
          </p>

          {/* GUIDE EDIT BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/content/beauty-guide/01"
              className="inline-flex items-center justify-center rounded-full bg-[#211d1b] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Edit Guide 01 →
            </Link>

            <Link
              href="/admin/content/beauty-guide/02"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Edit Guide 02 →
            </Link>

            <Link
              href="/admin/content/beauty-guide/03"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Edit Guide 03 →
            </Link>

            <Link
              href="/admin/content/beauty-guide/04"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Edit Guide 04 →
            </Link>

            <Link
              href="/admin/content/beauty-guide/05"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Edit Guide 05 →
            </Link>

            <Link
              href="/admin/content/beauty-guide/06"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Edit Guide 06 →
            </Link>
          </div>
        </div>

        <form
          action={updateBeautyGuidePage}
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

          {/* FEATURED GUIDE */}
          <Section title="Featured Guide">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Image"
                name="featuredImage"
                value={featured.image}
              />

              <Field
                label="Image Alt"
                name="featuredImageAlt"
                value={featured.imageAlt}
              />

              <Field
                label="Eyebrow"
                name="featuredEyebrow"
                value={featured.eyebrow}
              />

              <Field
                label="Title"
                name="featuredTitle"
                value={featured.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="featuredDescription"
                  value={featured.description}
                />
              </div>

              <Field
                label="Button Text"
                name="featuredButtonText"
                value={featured.buttonText}
              />

              <Field
                label="Button Link"
                name="featuredButtonLink"
                value={featured.buttonLink}
              />
            </div>
          </Section>

          {/* ARTICLES */}
          <Section title="Beauty Guides">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="articlesEyebrow"
                value={articles.eyebrow}
              />

              <Field
                label="Title Before"
                name="articlesTitleBefore"
                value={articles.titleBefore}
              />

              <Field
                label="Highlight"
                name="articlesHighlight"
                value={articles.highlight}
              />

              <Field
                label="Card Button Text"
                name="articlesButtonText"
                value={articles.buttonText}
              />
            </div>

            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Guide {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Category"
                    name={`article${index + 1}Category`}
                    value={articleItems[index]?.category}
                  />

                  <Field
                    label="Title"
                    name={`article${index + 1}Title`}
                    value={articleItems[index]?.title}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`article${index + 1}Description`}
                      value={articleItems[index]?.description}
                    />
                  </div>

                  <Field
                    label="Image"
                    name={`article${index + 1}Image`}
                    value={articleItems[index]?.image}
                  />

                  <Field
                    label="Link"
                    name={`article${index + 1}Href`}
                    value={articleItems[index]?.href}
                  />
                </div>
              </div>
            ))}
          </Section>

          {/* QUICK TIPS */}
          <Section title="Beauty Notes">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="quickTipsEyebrow"
                value={quickTips.eyebrow}
              />

              <Field
                label="Title Before"
                name="quickTipsTitleBefore"
                value={quickTips.titleBefore}
              />

              <Field
                label="Highlight"
                name="quickTipsHighlight"
                value={quickTips.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="quickTipsDescription"
                  value={quickTips.description}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              {Array.from({ length: 4 }, (_, index) => (
                <Textarea
                  key={index}
                  label={`Tip ${index + 1}`}
                  name={`quickTip${index + 1}`}
                  value={quickTipItems[index]}
                />
              ))}
            </div>
          </Section>

          {/* EXPLORE */}
          <Section title="Explore The Edit">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="exploreEyebrow"
                value={explore.eyebrow}
              />

              <Field
                label="Title Before"
                name="exploreTitleBefore"
                value={explore.titleBefore}
              />

              <Field
                label="Highlight"
                name="exploreHighlight"
                value={explore.highlight}
              />

              <Field
                label="Button Text"
                name="exploreButtonText"
                value={explore.buttonText}
              />
            </div>

            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Explore Card {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Title"
                    name={`explore${index + 1}Title`}
                    value={exploreItems[index]?.title}
                  />

                  <Field
                    label="Symbol"
                    name={`explore${index + 1}Symbol`}
                    value={exploreItems[index]?.symbol}
                  />

                  <div className="sm:col-span-2">
                    <Field
                      label="Link"
                      name={`explore${index + 1}Href`}
                      value={exploreItems[index]?.href}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* DARK CTA */}
          <Section title="Dark CTA">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="darkCtaEyebrow"
                value={darkCta.eyebrow}
              />

              <Field
                label="Title"
                name="darkCtaTitle"
                value={darkCta.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="darkCtaDescription"
                  value={darkCta.description}
                />
              </div>
            </div>
          </Section>

          {/* FINAL CTA */}
          <Section title="Final CTA">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="ctaEyebrow"
                value={cta.eyebrow}
              />

              <Field
                label="Title"
                name="ctaTitle"
                value={cta.title}
              />

              <Field
                label="Button Text"
                name="ctaButtonText"
                value={
                  cta.buttonText ??
                  "Explore My Picks"
                }
              />

              <Field
                label="Button Link"
                name="ctaHref"
                value={cta.href ?? "/picks"}
              />
            </div>
          </Section>

          {/* SAVE */}
          <div className="sticky bottom-5 z-20 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Beauty Guide
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
        rows={3}
        className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}