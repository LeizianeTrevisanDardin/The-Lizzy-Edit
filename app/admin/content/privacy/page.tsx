import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updatePrivacyPage } from "./actions";

export default async function AdminPrivacyContentPage() {
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
    .eq("page", "privacy")
    .eq("section", "page")
    .maybeSingle();

  const content = data?.content ?? {};

  const hero = content.hero ?? {};
  const sections = content.sections ?? [];
  const lastUpdated = content.lastUpdated ?? "";

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
            Edit Privacy Policy
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Manage the Privacy Policy content shown on your website.
          </p>
        </div>

        <form
          action={updatePrivacyPage}
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
                label="Title"
                name="heroTitle"
                value={hero.title}
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

          {/* POLICY SECTIONS */}
          <Section title="Policy Sections">
            {Array.from(
              { length: 9 },
              (_, index) => {
                const section =
                  sections[index] ?? {};

                const paragraphs =
                  section.paragraphs ?? [];

                return (
                  <div
                    key={index}
                    className={
                      index === 0
                        ? ""
                        : "mt-8 border-t border-stone-200 pt-8"
                    }
                  >
                    <h3 className="font-serif text-2xl">
                      Section {index + 1}
                    </h3>

                    <div className="mt-5 grid gap-6">
                      <Field
                        label="Title"
                        name={`section${index + 1}Title`}
                        value={section.title}
                      />

                      <Textarea
                        label="Paragraph 1"
                        name={`section${index + 1}Paragraph1`}
                        value={paragraphs[0]}
                      />

                      <Textarea
                        label="Paragraph 2"
                        name={`section${index + 1}Paragraph2`}
                        value={paragraphs[1]}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </Section>

          {/* LAST UPDATED */}
          <Section title="Last Updated">
            <Field
              label="Last Updated Text"
              name="lastUpdated"
              value={lastUpdated}
            />
          </Section>

          <div className="sticky bottom-5 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Privacy Policy
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