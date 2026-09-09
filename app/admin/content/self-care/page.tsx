import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateSelfCarePage } from "./actions";

export default async function AdminSelfCareContentPage() {
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
    .eq("page", "self-care")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const categories = content.categories ?? {};
  const categoryItems = categories.items ?? [];
  const rituals = content.rituals ?? {};
  const ritualItems = rituals.items ?? [];
  const products = content.products ?? {};
  const guide = content.guide ?? {};
  const guideSteps = guide.steps ?? [];
  const cta = content.cta ?? {};

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
            Edit Self-Care
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the content displayed on your self-care page.
          </p>
        </div>

        <form
          action={updateSelfCarePage}
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

              <Field
                label="Primary Button Text"
                name="heroPrimaryButtonText"
                value={hero.primaryButtonText}
              />

              <Field
                label="Primary Button Link"
                name="heroPrimaryButtonLink"
                value={hero.primaryButtonLink}
              />

              <Field
                label="Secondary Button Text"
                name="heroSecondaryButtonText"
                value={hero.secondaryButtonText}
              />

              <Field
                label="Secondary Button Link"
                name="heroSecondaryButtonLink"
                value={hero.secondaryButtonLink}
              />

              <Field
                label="Hero Image"
                name="heroImage"
                value={hero.image}
              />

              <Field
                label="Image Alt Text"
                name="heroImageAlt"
                value={hero.imageAlt}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Badge"
                  name="heroBadge"
                  value={hero.badge}
                />
              </div>
            </div>
          </Section>

          {/* CATEGORIES */}
          <Section title="Self-Care Categories">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="categoriesEyebrow"
                value={categories.eyebrow}
              />

              <Field
                label="Title Before"
                name="categoriesTitleBefore"
                value={categories.titleBefore}
              />

              <Field
                label="Highlight"
                name="categoriesHighlight"
                value={categories.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="categoriesDescription"
                  value={categories.description}
                />
              </div>
            </div>

            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Category {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Title"
                    name={`category${index + 1}Title`}
                    value={categoryItems[index]?.title}
                  />

                  <Field
                    label="Symbol"
                    name={`category${index + 1}Symbol`}
                    value={categoryItems[index]?.symbol}
                  />

                  <Field
                    label="Description"
                    name={`category${index + 1}Description`}
                    value={categoryItems[index]?.description}
                  />

                  <Field
                    label="Filter"
                    name={`category${index + 1}Filter`}
                    value={categoryItems[index]?.filter}
                  />
                </div>
              </div>
            ))}
          </Section>

          {/* RITUALS */}
          <Section title="Self-Care Rituals">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="ritualsEyebrow"
                value={rituals.eyebrow}
              />

              <Field
                label="Title Before"
                name="ritualsTitleBefore"
                value={rituals.titleBefore}
              />

              <Field
                label="Highlight"
                name="ritualsHighlight"
                value={rituals.highlight}
              />

              <Field
                label="Button Text"
                name="ritualsButtonText"
                value={rituals.buttonText}
              />
            </div>

            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Ritual {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Title"
                    name={`ritual${index + 1}Title`}
                    value={ritualItems[index]?.title}
                  />

                  <Field
                    label="Filter"
                    name={`ritual${index + 1}Filter`}
                    value={ritualItems[index]?.filter}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`ritual${index + 1}Description`}
                      value={ritualItems[index]?.description}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      label="Image"
                      name={`ritual${index + 1}Image`}
                      value={ritualItems[index]?.image}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* PRODUCTS */}
          <Section title="Self-Care Products">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="productsEyebrow"
                value={products.eyebrow}
              />

              <Field
                label="Title Before"
                name="productsTitleBefore"
                value={products.titleBefore}
              />

              <Field
                label="Highlight"
                name="productsHighlight"
                value={products.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="productsDescription"
                  value={products.description}
                />
              </div>

              <Field
                label="Button Text"
                name="productsButtonText"
                value={products.buttonText}
              />

              <Field
                label="Button Link"
                name="productsButtonLink"
                value={products.buttonLink}
              />

              <Field
                label="Empty Title"
                name="productsEmptyTitle"
                value={products.emptyTitle}
              />

              <Field
                label="Empty Description"
                name="productsEmptyDescription"
                value={products.emptyDescription}
              />
            </div>
          </Section>

          {/* GUIDE */}
          <Section title="Self-Care Guide">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="guideEyebrow"
                value={guide.eyebrow}
              />

              <Field
                label="Title Before"
                name="guideTitleBefore"
                value={guide.titleBefore}
              />

              <Field
                label="Highlight"
                name="guideHighlight"
                value={guide.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="guideDescription"
                  value={guide.description}
                />
              </div>

              <Field
                label="Button Text"
                name="guideButtonText"
                value={guide.buttonText}
              />

              <Field
                label="Button Link"
                name="guideButtonLink"
                value={guide.buttonLink}
              />
            </div>

            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Guide Step {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Number"
                    name={`guide${index + 1}Number`}
                    value={guideSteps[index]?.number}
                  />

                  <Field
                    label="Title"
                    name={`guide${index + 1}Title`}
                    value={guideSteps[index]?.title}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`guide${index + 1}Description`}
                      value={guideSteps[index]?.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* CTA */}
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
            </div>
          </Section>

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Self-Care Page
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