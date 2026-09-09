import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateBeautyGuide06 } from "./actions";

export default async function AdminBeautyGuide06Page() {
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
    .eq("page", "beauty-guide-06")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};

  const intro = content.intro ?? {};
  const introParagraphs = intro.paragraphs ?? [];

  const checklist = content.checklist ?? {};
  const checklistItems = checklist.items ?? [];

  const saveSplurge = content.saveSplurge ?? {};
  const splurge = saveSplurge.splurge ?? {};
  const splurgeItems = splurge.items ?? [];

  const save = saveSplurge.save ?? {};
  const saveItems = save.items ?? [];

  const costPerUse = content.costPerUse ?? {};
  const costParagraphs = costPerUse.paragraphs ?? [];

  const value = content.value ?? {};
  const valueItems = value.items ?? [];

  const beautyNotes = content.beautyNotes ?? {};
  const noteItems = beautyNotes.items ?? [];

  const finalNote = content.finalNote ?? {};

  const cta = content.cta ?? {};

  const navigation = content.navigation ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADER */}
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin/content/beauty-guide"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Beauty Guide
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Guide 06
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Worth the Splurge
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
            Edit all content displayed on Beauty Guide 06.
          </p>

          <div className="mt-6">
            <Link
              href="/beauty-guide/06"
              target="_blank"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              View Guide ↗
            </Link>
          </div>
        </div>

        <form
          action={updateBeautyGuide06}
          className="mt-8 space-y-8"
        >
          {/* HERO */}
          <Section title="Hero">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Back Text"
                name="heroBackText"
                value={hero.backText}
              />

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
                label="Image"
                name="heroImage"
                value={hero.image}
              />

              <Field
                label="Image Alt"
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
            </div>

            <div className="mt-6 grid gap-6">
              <Textarea
                label="Paragraph 1"
                name="introParagraph1"
                value={introParagraphs[0]}
              />

              <Textarea
                label="Paragraph 2"
                name="introParagraph2"
                value={introParagraphs[1]}
              />

              <Textarea
                label="Paragraph 3"
                name="introParagraph3"
                value={introParagraphs[2]}
              />
            </div>
          </Section>

          {/* CHECKLIST */}
          <Section title="Checklist">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="checklistEyebrow"
                value={checklist.eyebrow}
              />

              <Field
                label="Title Before"
                name="checklistTitleBefore"
                value={checklist.titleBefore}
              />

              <Field
                label="Highlight"
                name="checklistHighlight"
                value={checklist.highlight}
              />

              <Field
                label="Note Label"
                name="checklistNoteLabel"
                value={checklist.noteLabel}
              />
            </div>

            {Array.from({ length: 4 }, (_, index) => {
              const item = checklistItems[index] ?? {};
              const number = index + 1;

              return (
                <div
                  key={number}
                  className="mt-8 border-t border-stone-200 pt-8"
                >
                  <h3 className="font-serif text-2xl">
                    Question {number}
                  </h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Number"
                      name={`question${number}Number`}
                      value={item.number}
                    />

                    <Field
                      label="Title"
                      name={`question${number}Title`}
                      value={item.title}
                    />

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Description"
                        name={`question${number}Description`}
                        value={item.description}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Lizzy Note"
                        name={`question${number}Note`}
                        value={item.note}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>

          {/* SAVE OR SPLURGE */}
          <Section title="Save or Splurge">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="saveSplurgeEyebrow"
                value={saveSplurge.eyebrow}
              />

              <Field
                label="Title Before"
                name="saveSplurgeTitleBefore"
                value={saveSplurge.titleBefore}
              />

              <Field
                label="Highlight"
                name="saveSplurgeHighlight"
                value={saveSplurge.highlight}
              />
            </div>
          </Section>

          {/* SPLURGE CARD */}
          <Section title="Worth Considering a Splurge">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="splurgeEyebrow"
                value={splurge.eyebrow}
              />

              <Field
                label="Title"
                name="splurgeTitle"
                value={splurge.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="splurgeDescription"
                  value={splurge.description}
                />
              </div>

              {Array.from({ length: 4 }, (_, index) => (
                <Field
                  key={index}
                  label={`Item ${index + 1}`}
                  name={`splurgeItem${index + 1}`}
                  value={splurgeItems[index]}
                />
              ))}
            </div>
          </Section>

          {/* SAVE CARD */}
          <Section title="Easy Places to Save">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="saveEyebrow"
                value={save.eyebrow}
              />

              <Field
                label="Title"
                name="saveTitle"
                value={save.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="saveDescription"
                  value={save.description}
                />
              </div>

              {Array.from({ length: 4 }, (_, index) => (
                <Field
                  key={index}
                  label={`Item ${index + 1}`}
                  name={`saveItem${index + 1}`}
                  value={saveItems[index]}
                />
              ))}
            </div>
          </Section>

          {/* COST PER USE */}
          <Section title="Cost Per Use">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="costEyebrow"
                value={costPerUse.eyebrow}
              />

              <Field
                label="Title Before"
                name="costTitleBefore"
                value={costPerUse.titleBefore}
              />

              <Field
                label="Highlight"
                name="costHighlight"
                value={costPerUse.highlight}
              />
            </div>

            <div className="mt-6 grid gap-6">
              <Textarea
                label="Paragraph 1"
                name="costParagraph1"
                value={costParagraphs[0]}
              />

              <Textarea
                label="Paragraph 2"
                name="costParagraph2"
                value={costParagraphs[1]}
              />
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Example 1
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                <Field
                  label="Label"
                  name="exampleOneLabel"
                  value={costPerUse.exampleOneLabel}
                />

                <Field
                  label="Formula"
                  name="exampleOneFormula"
                  value={costPerUse.exampleOneFormula}
                />

                <Field
                  label="Result"
                  name="exampleOneResult"
                  value={costPerUse.exampleOneResult}
                />
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Example 2
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                <Field
                  label="Label"
                  name="exampleTwoLabel"
                  value={costPerUse.exampleTwoLabel}
                />

                <Field
                  label="Formula"
                  name="exampleTwoFormula"
                  value={costPerUse.exampleTwoFormula}
                />

                <Field
                  label="Result"
                  name="exampleTwoResult"
                  value={costPerUse.exampleTwoResult}
                />
              </div>
            </div>
          </Section>

          {/* WHAT ARE YOU PAYING FOR */}
          <Section title="What Are You Paying For?">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="valueEyebrow"
                value={value.eyebrow}
              />

              <Field
                label="Title Before"
                name="valueTitleBefore"
                value={value.titleBefore}
              />

              <Field
                label="Highlight"
                name="valueHighlight"
                value={value.highlight}
              />
            </div>

            {Array.from({ length: 4 }, (_, index) => {
              const item = valueItems[index] ?? {};
              const number = index + 1;

              return (
                <div
                  key={number}
                  className="mt-8 border-t border-stone-200 pt-8"
                >
                  <h3 className="font-serif text-2xl">
                    Value Card {number}
                  </h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Number"
                      name={`value${number}Number`}
                      value={item.number}
                    />

                    <Field
                      label="Title"
                      name={`value${number}Title`}
                      value={item.title}
                    />

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Description"
                        name={`value${number}Description`}
                        value={item.description}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>

          {/* BEAUTY NOTES */}
          <Section title="Beauty Notes">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="notesEyebrow"
                value={beautyNotes.eyebrow}
              />

              <Field
                label="Title Before"
                name="notesTitleBefore"
                value={beautyNotes.titleBefore}
              />

              <Field
                label="Highlight"
                name="notesHighlight"
                value={beautyNotes.highlight}
              />
            </div>

            <div className="mt-6 grid gap-6">
              <Textarea
                label="Note 1"
                name="noteItem1"
                value={noteItems[0]}
              />

              <Textarea
                label="Note 2"
                name="noteItem2"
                value={noteItems[1]}
              />

              <Textarea
                label="Note 3"
                name="noteItem3"
                value={noteItems[2]}
              />

              <Textarea
                label="Note 4"
                name="noteItem4"
                value={noteItems[3]}
              />
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
          <Section title="CTA">
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

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="ctaDescription"
                  value={cta.description}
                />
              </div>

              <Field
                label="Button Text"
                name="ctaButtonText"
                value={cta.buttonText}
              />

              <Field
                label="Button Link"
                name="ctaButtonLink"
                value={cta.buttonLink}
              />
            </div>
          </Section>

          {/* NAVIGATION */}
          <Section title="Article Navigation">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Previous Text"
                name="previousText"
                value={navigation.previousText}
              />

              <Field
                label="Previous Link"
                name="previousLink"
                value={navigation.previousLink}
              />

              <Field
                label="All Guides Text"
                name="allGuidesText"
                value={navigation.allGuidesText}
              />

              <Field
                label="All Guides Link"
                name="allGuidesLink"
                value={navigation.allGuidesLink}
              />

              <Field
                label="Last Link Text"
                name="nextGuideText"
                value={navigation.nextGuideText}
              />

              <Field
                label="Last Link"
                name="nextGuideLink"
                value={navigation.nextGuideLink}
              />
            </div>
          </Section>

          {/* SAVE */}
          <div className="sticky bottom-5 z-20 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Guide 06
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