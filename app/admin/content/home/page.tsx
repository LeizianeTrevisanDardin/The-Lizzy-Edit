import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
  updateHomeAbout,
  updateHomeCategories,
  updateHomeHero,
  updateHomePicks,
} from "./actions";

export default async function AdminHomeContentPage() {
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

  // ================================
  // HERO
  // ================================

  const { data: heroData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "hero")
    .maybeSingle();

  const hero = heroData?.content ?? {};

  // ================================
  // CATEGORIES
  // ================================

  const { data: categoriesData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "categories")
    .maybeSingle();

  const categories = categoriesData?.content ?? {};
  const categoryItems = categories.items ?? [];

  // ================================
  // ABOUT
  // ================================

  const { data: aboutData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "about")
    .maybeSingle();

  const about = aboutData?.content ?? {};

  // ================================
  // PICKS
  // ================================

  const { data: picksData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "picks")
    .maybeSingle();

  const picks = picksData?.content ?? {};

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
            Homepage
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Home
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Manage the main content displayed on your homepage.
          </p>
        </div>

        {/* ================================
            HERO
        ================================= */}

        <form
          action={updateHomeHero}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Hero
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Edit the main heading, description, buttons and image.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field
              label="Eyebrow"
              name="eyebrow"
              value={hero.eyebrow}
            />

            <Field
              label="Highlight Word"
              name="highlight"
              value={hero.highlight}
            />

            <Field
              label="Title Before"
              name="titleBefore"
              value={hero.titleBefore}
            />

            <Field
              label="Title After"
              name="titleAfter"
              value={hero.titleAfter}
            />

            <div className="sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={hero.description ?? ""}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
              />
            </div>

            <Field
              label="Primary Button Text"
              name="primaryButtonText"
              value={hero.primaryButtonText}
            />

            <Field
              label="Primary Button Link"
              name="primaryButtonLink"
              value={hero.primaryButtonLink}
            />

            <Field
              label="Secondary Button Text"
              name="secondaryButtonText"
              value={hero.secondaryButtonText}
            />

            <Field
              label="Secondary Button Link"
              name="secondaryButtonLink"
              value={hero.secondaryButtonLink}
            />

            <Field
              label="Feature One"
              name="featureOne"
              value={hero.featureOne}
            />

            <Field
              label="Feature Two"
              name="featureTwo"
              value={hero.featureTwo}
            />

            <Field
              label="Feature Three"
              name="featureThree"
              value={hero.featureThree}
            />

            <Field
              label="Badge"
              name="badge"
              value={hero.badge}
            />

            <div className="sm:col-span-2">
              <Field
                label="Hero Image"
                name="image"
                value={hero.image}
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Image Alt Text"
                name="imageAlt"
                value={hero.imageAlt}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save Hero
            </button>
          </div>
        </form>

        {/* ================================
            CATEGORIES
        ================================= */}

        <form
          action={updateHomeCategories}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Categories
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Edit the category section displayed below the hero.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field
              label="Eyebrow"
              name="eyebrow"
              value={categories.eyebrow}
            />

            <Field
              label="Highlight Word"
              name="highlight"
              value={categories.highlight}
            />

            <Field
              label="Title Before"
              name="titleBefore"
              value={categories.titleBefore}
            />

            <Field
              label="Title After"
              name="titleAfter"
              value={categories.titleAfter}
            />

            <div className="sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={categories.description ?? ""}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
              />
            </div>

            <Field
              label="Card Eyebrow"
              name="cardEyebrow"
              value={
                categories.cardEyebrow ??
                "The Lizzy Edit"
              }
            />

            <Field
              label="Explore Text"
              name="exploreText"
              value={
                categories.exploreText ??
                "Explore"
              }
            />
          </div>

          {/* SKINCARE */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Skincare Card
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Title"
                name="skincareTitle"
                value={categoryItems[0]?.title}
              />

              <Field
                label="Description"
                name="skincareDescription"
                value={categoryItems[0]?.description}
              />

              <Field
                label="Image"
                name="skincareImage"
                value={categoryItems[0]?.image}
              />

              <Field
                label="Link"
                name="skincareHref"
                value={categoryItems[0]?.href}
              />
            </div>
          </div>

          {/* MAKEUP */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Makeup Card
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Title"
                name="makeupTitle"
                value={categoryItems[1]?.title}
              />

              <Field
                label="Description"
                name="makeupDescription"
                value={categoryItems[1]?.description}
              />

              <Field
                label="Image"
                name="makeupImage"
                value={categoryItems[1]?.image}
              />

              <Field
                label="Link"
                name="makeupHref"
                value={categoryItems[1]?.href}
              />
            </div>
          </div>

          {/* SELF CARE */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Self-Care Card
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Title"
                name="selfCareTitle"
                value={categoryItems[2]?.title}
              />

              <Field
                label="Description"
                name="selfCareDescription"
                value={categoryItems[2]?.description}
              />

              <Field
                label="Image"
                name="selfCareImage"
                value={categoryItems[2]?.image}
              />

              <Field
                label="Link"
                name="selfCareHref"
                value={categoryItems[2]?.href}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save Categories
            </button>
          </div>
        </form>

        {/* ================================
            ABOUT LIZZY
        ================================= */}

        <form
          action={updateHomeAbout}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              About Lizzy
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Edit your introduction, image, feature cards and button.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field
              label="Image"
              name="image"
              value={about.image}
            />

            <Field
              label="Image Alt Text"
              name="imageAlt"
              value={about.imageAlt}
            />

            <Field
              label="Badge Eyebrow"
              name="badgeEyebrow"
              value={about.badgeEyebrow}
            />

            <Field
              label="Badge Text"
              name="badgeText"
              value={about.badgeText}
            />

            <Field
              label="Eyebrow"
              name="eyebrow"
              value={about.eyebrow}
            />

            <Field
              label="Name"
              name="name"
              value={about.name}
            />

            <Field
              label="Name Accent"
              name="nameAccent"
              value={about.nameAccent}
            />

            <div className="sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Paragraph One
              </label>

              <textarea
                name="paragraphOne"
                defaultValue={about.paragraphOne ?? ""}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Paragraph Two
              </label>

              <textarea
                name="paragraphTwo"
                defaultValue={about.paragraphTwo ?? ""}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
              />
            </div>
          </div>

          {/* FEATURE CARD 1 */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Feature Card 1
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <Field
                label="Icon"
                name="cardOneIcon"
                value={about.cardOneIcon}
              />

              <Field
                label="Title"
                name="cardOneTitle"
                value={about.cardOneTitle}
              />

              <Field
                label="Text"
                name="cardOneText"
                value={about.cardOneText}
              />
            </div>
          </div>

          {/* FEATURE CARD 2 */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Feature Card 2
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <Field
                label="Icon"
                name="cardTwoIcon"
                value={about.cardTwoIcon}
              />

              <Field
                label="Title"
                name="cardTwoTitle"
                value={about.cardTwoTitle}
              />

              <Field
                label="Text"
                name="cardTwoText"
                value={about.cardTwoText}
              />
            </div>
          </div>

          {/* FEATURE CARD 3 */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Feature Card 3
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <Field
                label="Icon"
                name="cardThreeIcon"
                value={about.cardThreeIcon}
              />

              <Field
                label="Title"
                name="cardThreeTitle"
                value={about.cardThreeTitle}
              />

              <Field
                label="Text"
                name="cardThreeText"
                value={about.cardThreeText}
              />
            </div>
          </div>

          {/* ABOUT BUTTON */}
          <div className="mt-8 grid gap-6 border-t border-stone-200 pt-6 sm:grid-cols-2">
            <Field
              label="Button Text"
              name="buttonText"
              value={about.buttonText}
            />

            <Field
              label="Button Link"
              name="buttonLink"
              value={about.buttonLink}
            />
          </div>

          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save About
            </button>
          </div>
        </form>

        {/* ================================
            LIZZY PICKS
        ================================= */}

        <form
          action={updateHomePicks}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Lizzy Picks
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Edit the heading, button, empty state and affiliate note.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field
              label="Eyebrow"
              name="eyebrow"
              value={picks.eyebrow}
            />

            <Field
              label="Title Before"
              name="titleBefore"
              value={picks.titleBefore}
            />

            <Field
              label="Highlight"
              name="highlight"
              value={picks.highlight}
            />

            <div className="sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={picks.description ?? ""}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
              />
            </div>

            <Field
              label="Button Text"
              name="buttonText"
              value={picks.buttonText}
            />

            <Field
              label="Button Link"
              name="buttonLink"
              value={picks.buttonLink}
            />
          </div>

          {/* EMPTY STATE */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Empty State
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Empty Title"
                name="emptyTitle"
                value={picks.emptyTitle}
              />

              <Field
                label="Empty Description"
                name="emptyDescription"
                value={picks.emptyDescription}
              />
            </div>
          </div>

          {/* AFFILIATE NOTE */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Affiliate Note
            </h3>

            <div className="mt-5 grid gap-6">
              <Field
                label="Note Label"
                name="noteLabel"
                value={picks.noteLabel}
              />

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Note Text
                </label>

                <textarea
                  name="noteText"
                  defaultValue={picks.noteText ?? ""}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save Lizzy Picks
            </button>
          </div>
        </form>
      </div>
    </main>
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