import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateFragrancesPage } from "./actions";

export default async function AdminFragrancesContentPage() {
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
    .eq("page", "fragrances")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const intro = content.intro ?? {};
  const families = content.families ?? {};
  const familyItems = families.items ?? [];
  const wardrobe = content.wardrobe ?? {};
  const wardrobeItems = wardrobe.items ?? [];
  const products = content.products ?? {};
  const fragrance101 = content.fragrance101 ?? {};
  const noteItems = fragrance101.items ?? [];
  const concentration = content.concentration ?? {};
  const tips = content.tips ?? {};
  const tipItems = tips.items ?? [];
  const finalNote = content.finalNote ?? {};
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
            Edit Fragrances
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the content displayed on your fragrance page.
          </p>
        </div>

        <form
          action={updateFragrancesPage}
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
            </div>
          </Section>

          {/* INTRO */}
          <Section title="Introduction">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="introEyebrow"
                value={intro.eyebrow}
              />

              <Field
                label="Title Before"
                name="introTitleBefore"
                value={intro.titleBefore}
              />

              <Field
                label="Highlight"
                name="introHighlight"
                value={intro.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 1"
                  name="introParagraphOne"
                  value={intro.paragraphOne}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 2"
                  name="introParagraphTwo"
                  value={intro.paragraphTwo}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Paragraph 3"
                  name="introParagraphThree"
                  value={intro.paragraphThree}
                />
              </div>
            </div>
          </Section>

          {/* FAMILIES */}
          <Section title="Fragrance Families">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="familiesEyebrow"
                value={families.eyebrow}
              />

              <Field
                label="Title Before"
                name="familiesTitleBefore"
                value={families.titleBefore}
              />

              <Field
                label="Highlight"
                name="familiesHighlight"
                value={families.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="familiesDescription"
                  value={families.description}
                />
              </div>
            </div>

            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Family {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Title"
                    name={`family${index + 1}Title`}
                    value={familyItems[index]?.title}
                  />

                  <Field
                    label="Symbol"
                    name={`family${index + 1}Symbol`}
                    value={familyItems[index]?.symbol}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`family${index + 1}Description`}
                      value={familyItems[index]?.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* WARDROBE */}
          <Section title="Fragrance Wardrobe">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="wardrobeEyebrow"
                value={wardrobe.eyebrow}
              />

              <Field
                label="Title Before"
                name="wardrobeTitleBefore"
                value={wardrobe.titleBefore}
              />

              <Field
                label="Highlight"
                name="wardrobeHighlight"
                value={wardrobe.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="wardrobeDescription"
                  value={wardrobe.description}
                />
              </div>
            </div>

            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Wardrobe Item {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Title"
                    name={`wardrobe${index + 1}Title`}
                    value={wardrobeItems[index]?.title}
                  />

                  <Field
                    label="Tag"
                    name={`wardrobe${index + 1}Tag`}
                    value={wardrobeItems[index]?.tag}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`wardrobe${index + 1}Description`}
                      value={wardrobeItems[index]?.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* PRODUCTS */}
          <Section title="Fragrance Products">
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

          {/* FRAGRANCE 101 */}
          <Section title="Fragrance 101">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="fragrance101Eyebrow"
                value={fragrance101.eyebrow}
              />

              <Field
                label="Title Before"
                name="fragrance101TitleBefore"
                value={fragrance101.titleBefore}
              />

              <Field
                label="Highlight"
                name="fragrance101Highlight"
                value={fragrance101.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="fragrance101Description"
                  value={fragrance101.description}
                />
              </div>
            </div>

            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Note {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Number"
                    name={`note${index + 1}Number`}
                    value={noteItems[index]?.number}
                  />

                  <Field
                    label="Title"
                    name={`note${index + 1}Title`}
                    value={noteItems[index]?.title}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`note${index + 1}Description`}
                      value={noteItems[index]?.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* EDP VS EDT */}
          <Section title="EDP vs EDT">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="concentrationEyebrow"
                value={concentration.eyebrow}
              />

              <Field
                label="Title Before"
                name="concentrationTitleBefore"
                value={concentration.titleBefore}
              />

              <Field
                label="Highlight"
                name="concentrationHighlight"
                value={concentration.highlight}
              />
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <h3 className="font-serif text-2xl">
                Eau de Parfum
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Tag"
                  name="edpTag"
                  value={concentration.edpTag}
                />

                <Field
                  label="Title"
                  name="edpTitle"
                  value={concentration.edpTitle}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Description"
                    name="edpDescription"
                    value={concentration.edpDescription}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <h3 className="font-serif text-2xl">
                Eau de Toilette
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Tag"
                  name="edtTag"
                  value={concentration.edtTag}
                />

                <Field
                  label="Title"
                  name="edtTitle"
                  value={concentration.edtTitle}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Description"
                    name="edtDescription"
                    value={concentration.edtDescription}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* TIPS */}
          <Section title="Fragrance Tips">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="tipsEyebrow"
                value={tips.eyebrow}
              />

              <Field
                label="Title Before"
                name="tipsTitleBefore"
                value={tips.titleBefore}
              />

              <Field
                label="Highlight"
                name="tipsHighlight"
                value={tips.highlight}
              />
            </div>

            <div className="mt-8 grid gap-6">
              {Array.from({ length: 4 }, (_, index) => (
                <Textarea
                  key={index}
                  label={`Tip ${index + 1}`}
                  name={`tip${index + 1}`}
                  value={tipItems[index]}
                />
              ))}
            </div>
          </Section>

          {/* FINAL NOTE */}
          <Section title="Final Note">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="finalNoteEyebrow"
                value={finalNote.eyebrow}
              />

              <Field
                label="Title Before"
                name="finalNoteTitleBefore"
                value={finalNote.titleBefore}
              />

              <Field
                label="Highlight"
                name="finalNoteHighlight"
                value={finalNote.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="finalNoteDescription"
                  value={finalNote.description}
                />
              </div>
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

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Fragrances Page
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