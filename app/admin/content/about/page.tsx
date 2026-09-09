import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateAboutPage } from "./actions";

export default async function AdminAboutContentPage() {
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
    .eq("page", "about")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const story = content.story ?? {};

  const values = content.values ?? {};
  const valueItems = values.items ?? [];

  const insideEdit = content.insideEdit ?? {};
  const insideItems = insideEdit.items ?? [];

  const transparency =
    content.transparency ?? {};

  const cta = content.cta ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
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
            Edit About
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage your About page, story, values,
            photo and transparency information.
          </p>
        </div>

        <form
          action={updateAboutPage}
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
                label="Photo"
                name="heroImage"
                value={hero.image}
              />

              <Field
                label="Photo Alt Text"
                name="heroImageAlt"
                value={hero.imageAlt}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Photo Label"
                  name="heroImageLabel"
                  value={hero.imageLabel}
                />
              </div>
            </div>
          </Section>

          {/* STORY */}
          <Section title="My Story">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="storyEyebrow"
                value={story.eyebrow}
              />

              <Field
                label="Title Before"
                name="storyTitleBefore"
                value={story.titleBefore}
              />

              <Field
                label="Highlight"
                name="storyHighlight"
                value={story.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 1"
                  name="storyParagraphOne"
                  value={story.paragraphOne}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 2"
                  name="storyParagraphTwo"
                  value={story.paragraphTwo}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 3"
                  name="storyParagraphThree"
                  value={story.paragraphThree}
                />
              </div>

              <div className="sm:col-span-2">
                <Field
                  label="Closing Quote"
                  name="storyQuote"
                  value={story.quote}
                />
              </div>
            </div>
          </Section>

          {/* VALUES */}
          <Section title="The Lizzy Approach">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="valuesEyebrow"
                value={values.eyebrow}
              />

              <Field
                label="Title Before"
                name="valuesTitleBefore"
                value={values.titleBefore}
              />

              <Field
                label="Highlight"
                name="valuesHighlight"
                value={values.highlight}
              />
            </div>

            {Array.from(
              { length: 3 },
              (_, index) => (
                <div
                  key={index}
                  className="mt-8 border-t border-stone-200 pt-6"
                >
                  <h3 className="font-serif text-2xl">
                    Value {index + 1}
                  </h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Title"
                      name={`value${index + 1}Title`}
                      value={
                        valueItems[index]?.title
                      }
                    />

                    <Field
                      label="Symbol"
                      name={`value${index + 1}Symbol`}
                      value={
                        valueItems[index]?.symbol
                      }
                    />

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Description"
                        name={`value${index + 1}Description`}
                        value={
                          valueItems[index]
                            ?.description
                        }
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </Section>

          {/* INSIDE THE EDIT */}
          <Section title="Inside The Edit">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="insideEyebrow"
                value={insideEdit.eyebrow}
              />

              <Field
                label="Title Before"
                name="insideTitleBefore"
                value={insideEdit.titleBefore}
              />

              <Field
                label="Highlight"
                name="insideHighlight"
                value={insideEdit.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="insideDescription"
                  value={insideEdit.description}
                />
              </div>
            </div>

            {Array.from(
              { length: 4 },
              (_, index) => (
                <div
                  key={index}
                  className="mt-8 border-t border-stone-200 pt-6"
                >
                  <h3 className="font-serif text-2xl">
                    Section {index + 1}
                  </h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Title"
                      name={`inside${index + 1}Title`}
                      value={
                        insideItems[index]?.title
                      }
                    />

                    <Field
                      label="Link"
                      name={`inside${index + 1}Href`}
                      value={
                        insideItems[index]?.href
                      }
                    />

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Description"
                        name={`inside${index + 1}Description`}
                        value={
                          insideItems[index]
                            ?.description
                        }
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </Section>

          {/* TRANSPARENCY */}
          <Section title="Transparency">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="transparencyEyebrow"
                value={transparency.eyebrow}
              />

              <Field
                label="Title"
                name="transparencyTitle"
                value={transparency.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="transparencyDescription"
                  value={transparency.description}
                />
              </div>

              <Field
                label="Button Text"
                name="transparencyButtonText"
                value={transparency.buttonText}
              />

              <Field
                label="Button Link"
                name="transparencyButtonLink"
                value={transparency.buttonLink}
              />
            </div>
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

          {/* SAVE */}
          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save About Page
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