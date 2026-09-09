import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateBeautyGuide02 } from "./actions";

export default async function AdminBeautyGuide02Page() {
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
    .eq("page", "beauty-guide-02")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const intro = content.intro ?? {};
  const routine = content.routine ?? {};
  const quickRoutineOne = content.quickRoutineOne ?? {};
  const quickRoutineTwo = content.quickRoutineTwo ?? {};
  const beautyNotes = content.beautyNotes ?? {};
  const personalStyle = content.personalStyle ?? {};
  const cta = content.cta ?? {};
  const navigation = content.navigation ?? {};

  const routineSteps = routine.steps ?? [];
  const introParagraphs = intro.paragraphs ?? [];
  const quickOneSteps = quickRoutineOne.steps ?? [];
  const quickTwoSteps = quickRoutineTwo.steps ?? [];
  const noteItems = beautyNotes.items ?? [];

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin/content/beauty-guide"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Beauty Guide
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Guide 02
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Everyday Makeup
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
            Edit all content displayed on Beauty Guide 02.
          </p>

          <div className="mt-6">
            <Link
              href="/beauty-guide/02"
              target="_blank"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              View Guide ↗
            </Link>
          </div>
        </div>

        <form
          action={updateBeautyGuide02}
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

          {/* ROUTINE */}
          <Section title="Routine">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="routineEyebrow"
                value={routine.eyebrow}
              />

              <Field
                label="Title Before"
                name="routineTitleBefore"
                value={routine.titleBefore}
              />

              <Field
                label="Highlight"
                name="routineHighlight"
                value={routine.highlight}
              />

              <Field
                label="Note Label"
                name="routineNoteLabel"
                value={routine.noteLabel}
              />
            </div>

            {Array.from({ length: 4 }, (_, index) => {
              const item = routineSteps[index] ?? {};
              const number = index + 1;

              return (
                <div
                  key={number}
                  className="mt-8 border-t border-stone-200 pt-8"
                >
                  <h3 className="font-serif text-2xl">
                    Step {number}
                  </h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Number"
                      name={`routineStep${number}Number`}
                      value={item.number}
                    />

                    <Field
                      label="Title"
                      name={`routineStep${number}Title`}
                      value={item.title}
                    />

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Description"
                        name={`routineStep${number}Description`}
                        value={item.description}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Textarea
                        label="Lizzy Note"
                        name={`routineStep${number}Note`}
                        value={item.note}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>

          {/* QUICK ROUTINE 1 */}
          <Section title="Five-Minute Makeup">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="quickOneEyebrow"
                value={quickRoutineOne.eyebrow}
              />

              <Field
                label="Title"
                name="quickOneTitle"
                value={quickRoutineOne.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="quickOneDescription"
                  value={quickRoutineOne.description}
                />
              </div>

              <Field
                label="Step 1"
                name="quickOneStep1"
                value={quickOneSteps[0]}
              />

              <Field
                label="Step 2"
                name="quickOneStep2"
                value={quickOneSteps[1]}
              />

              <Field
                label="Step 3"
                name="quickOneStep3"
                value={quickOneSteps[2]}
              />

              <Field
                label="Step 4"
                name="quickOneStep4"
                value={quickOneSteps[3]}
              />
            </div>
          </Section>

          {/* QUICK ROUTINE 2 */}
          <Section title="Polished Everyday">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="quickTwoEyebrow"
                value={quickRoutineTwo.eyebrow}
              />

              <Field
                label="Title"
                name="quickTwoTitle"
                value={quickRoutineTwo.title}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="quickTwoDescription"
                  value={quickRoutineTwo.description}
                />
              </div>

              <Field
                label="Step 1"
                name="quickTwoStep1"
                value={quickTwoSteps[0]}
              />

              <Field
                label="Step 2"
                name="quickTwoStep2"
                value={quickTwoSteps[1]}
              />

              <Field
                label="Step 3"
                name="quickTwoStep3"
                value={quickTwoSteps[2]}
              />

              <Field
                label="Step 4"
                name="quickTwoStep4"
                value={quickTwoSteps[3]}
              />

              <Field
                label="Step 5"
                name="quickTwoStep5"
                value={quickTwoSteps[4]}
              />

              <Field
                label="Step 6"
                name="quickTwoStep6"
                value={quickTwoSteps[5]}
              />
            </div>
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

          {/* PERSONAL STYLE */}
          <Section title="Personal Style">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="personalEyebrow"
                value={personalStyle.eyebrow}
              />

              <Field
                label="Title Before"
                name="personalTitleBefore"
                value={personalStyle.titleBefore}
              />

              <Field
                label="Highlight"
                name="personalHighlight"
                value={personalStyle.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="personalDescription"
                  value={personalStyle.description}
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
                label="Next Guide Text"
                name="nextGuideText"
                value={navigation.nextGuideText}
              />

              <Field
                label="Next Guide Link"
                name="nextGuideLink"
                value={navigation.nextGuideLink}
              />
            </div>
          </Section>

          <div className="sticky bottom-5 z-20 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Guide 02
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
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}