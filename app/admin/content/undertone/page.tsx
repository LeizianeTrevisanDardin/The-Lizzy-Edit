import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateUndertonePage } from "./actions";

export default async function AdminUndertoneContentPage() {
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
    .eq("page", "undertone")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const howItWorks = content.howItWorks ?? {};
  const howItems = howItWorks.items ?? [];
  const beforeStart = content.beforeStart ?? {};
  const beforeTips = beforeStart.tips ?? [];
  const privacy = content.privacy ?? {};

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
            Edit Find Your Undertone
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the content displayed on the undertone landing page.
          </p>

          <div className="mt-6">
            <Link
              href="/admin/content/undertone/analyze"
              className="inline-flex rounded-full bg-[#211d1b] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Edit Analysis Tool →
            </Link>
          </div>
        </div>

        <form
          action={updateUndertonePage}
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
                label="Button Text"
                name="heroButtonText"
                value={hero.buttonText}
              />

              <Field
                label="Button Link"
                name="heroButtonLink"
                value={hero.buttonLink}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Privacy Text"
                  name="heroPrivacyText"
                  value={hero.privacyText}
                />
              </div>
            </div>
          </Section>

          {/* HOW IT WORKS */}
          <Section title="How It Works">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="howEyebrow"
                value={howItWorks.eyebrow}
              />

              <Field
                label="Title Before"
                name="howTitleBefore"
                value={howItWorks.titleBefore}
              />

              <Field
                label="Highlight"
                name="howHighlight"
                value={howItWorks.highlight}
              />
            </div>

            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="mt-8 border-t border-stone-200 pt-6"
              >
                <h3 className="font-serif text-2xl">
                  Step {index + 1}
                </h3>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Number"
                    name={`step${index + 1}Number`}
                    value={howItems[index]?.number}
                  />

                  <Field
                    label="Title"
                    name={`step${index + 1}Title`}
                    value={howItems[index]?.title}
                  />

                  <div className="sm:col-span-2">
                    <Textarea
                      label="Description"
                      name={`step${index + 1}Description`}
                      value={howItems[index]?.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* BEFORE YOU START */}
          <Section title="Before You Start">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="beforeEyebrow"
                value={beforeStart.eyebrow}
              />

              <Field
                label="Title Before"
                name="beforeTitleBefore"
                value={beforeStart.titleBefore}
              />

              <Field
                label="Highlight"
                name="beforeHighlight"
                value={beforeStart.highlight}
              />
            </div>

            <div className="mt-8 grid gap-6">
              {Array.from({ length: 4 }, (_, index) => (
                <Field
                  key={index}
                  label={`Tip ${index + 1}`}
                  name={`beforeTip${index + 1}`}
                  value={beforeTips[index]}
                />
              ))}
            </div>
          </Section>

          {/* PRIVACY */}
          <Section title="Privacy">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="privacyEyebrow"
                value={privacy.eyebrow}
              />

              <Field
                label="Title Before"
                name="privacyTitleBefore"
                value={privacy.titleBefore}
              />

              <Field
                label="Highlight"
                name="privacyHighlight"
                value={privacy.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="privacyDescription"
                  value={privacy.description}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Disclaimer"
                  name="privacyDisclaimer"
                  value={privacy.disclaimer}
                />
              </div>
            </div>
          </Section>

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Undertone Page
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