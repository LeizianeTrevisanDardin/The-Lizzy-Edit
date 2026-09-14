import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
  updateGlobalFooter,
  updateGlobalHeader,
  updateGlobalProductCard,
} from "./actions";

export default async function AdminGlobalContentPage() {
  const supabase = await createClient();

  // ================================
  // AUTH
  // ================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ================================
  // ADMIN CHECK
  // ================================

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // ================================
  // HEADER CONTENT
  // ================================

  const { data: headerData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "global")
    .eq("section", "header")
    .maybeSingle();

  const header = headerData?.content ?? {};

  // ================================
  // FOOTER CONTENT
  // ================================

  const { data: footerData } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "global")
    .eq("section", "footer")
    .maybeSingle();

  const footer = footerData?.content ?? {};

  // ================================
// PRODUCT CARD CONTENT
// ================================

const { data: productCardData } = await supabase
  .from("site_content")
  .select("content")
  .eq("page", "global")
  .eq("section", "product-card")
  .maybeSingle();

const productCard =
  productCardData?.content ?? {};

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
            Website
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Global Content
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
            Edit content that appears across multiple pages of The Lizzy Edit.
          </p>
        </div>

        {/* ================================
            HEADER
        ================================= */}

        <form
          action={updateGlobalHeader}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Global Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Header
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Edit the announcement bar, logo, navigation and menu buttons
              displayed across the website.
            </p>
          </div>

          {/* ANNOUNCEMENT */}
          <div className="mt-6">
            <Field
              label="Announcement Bar"
              name="announcement"
              value={header.announcement}
            />
          </div>

          {/* LOGO */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Logo
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Edit the text displayed in the website logo.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Logo Title"
                name="logoTitle"
                value={header.logoTitle}
              />

              <Field
                label="Logo Subtitle"
                name="logoSubtitle"
                value={header.logoSubtitle}
              />
            </div>
          </div>

          {/* MAIN NAVIGATION */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Main Navigation
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Change the names and destinations of your navigation links.
            </p>

            <NavigationFields
              title="Home"
              textName="homeText"
              textValue={header.homeText}
              linkName="homeLink"
              linkValue={header.homeLink}
            />

            <NavigationFields
              title="Skincare"
              textName="skincareText"
              textValue={header.skincareText}
              linkName="skincareLink"
              linkValue={header.skincareLink}
            />

            <NavigationFields
              title="Makeup"
              textName="makeupText"
              textValue={header.makeupText}
              linkName="makeupLink"
              linkValue={header.makeupLink}
            />

            <NavigationFields
              title="Self-Care"
              textName="selfCareText"
              textValue={header.selfCareText}
              linkName="selfCareLink"
              linkValue={header.selfCareLink}
            />

            <NavigationFields
              title="Fragrances"
              textName="fragrancesText"
              textValue={header.fragrancesText}
              linkName="fragrancesLink"
              linkValue={header.fragrancesLink}
            />

            <NavigationFields
              title="Beauty Guide"
              textName="beautyGuideText"
              textValue={header.beautyGuideText}
              linkName="beautyGuideLink"
              linkValue={header.beautyGuideLink}
            />

            <NavigationFields
              title="Find Your Undertone"
              textName="undertoneText"
              textValue={header.undertoneText}
              linkName="undertoneLink"
              linkValue={header.undertoneLink}
            />

            <NavigationFields
              title="About"
              textName="aboutText"
              textValue={header.aboutText}
              linkName="aboutLink"
              linkValue={header.aboutLink}
            />

            <NavigationFields
              title="Admin"
              textName="adminText"
              textValue={header.adminText}
              linkName="adminLink"
              linkValue={header.adminLink}
            />
          </div>

          {/* PICKS BUTTON */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Picks Button
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Edit the My Picks button used in desktop and mobile navigation.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Desktop Button Text"
                name="picksText"
                value={header.picksText}
              />

              <Field
                label="Button Link"
                name="picksLink"
                value={header.picksLink}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Mobile Button Text"
                  name="mobilePicksText"
                  value={header.mobilePicksText}
                />
              </div>
            </div>
          </div>

          {/* MOBILE MENU LINKS */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Mobile Menu Links
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              Edit the Privacy and Disclosure links displayed at the bottom of
              the mobile menu.
            </p>

            <div className="mt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
                Privacy
              </p>

              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Text"
                  name="privacyText"
                  value={header.privacyText}
                />

                <Field
                  label="Link"
                  name="privacyLink"
                  value={header.privacyLink}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
                Disclosure
              </p>

              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Text"
                  name="disclosureText"
                  value={header.disclosureText}
                />

                <Field
                  label="Link"
                  name="disclosureLink"
                  value={header.disclosureLink}
                />
              </div>
            </div>
          </div>

          {/* MOBILE MENU ACCESSIBILITY */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Mobile Menu Accessibility
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
              These labels are used by screen readers for the mobile menu
              button.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Open Menu Label"
                name="openMenuLabel"
                value={
                  header.openMenuLabel ??
                  "Open menu"
                }
              />

              <Field
                label="Close Menu Label"
                name="closeMenuLabel"
                value={
                  header.closeMenuLabel ??
                  "Close menu"
                }
              />
            </div>
          </div>

          {/* SAVE HEADER */}
          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save Header
            </button>
          </div>
        </form>

        {/* ================================
            FOOTER
        ================================= */}

        <form
          action={updateGlobalFooter}
          className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Global Section
            </p>

            <h2 className="mt-2 font-serif text-3xl">
              Footer
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Edit the brand text, navigation links, social links and legal
              text displayed at the bottom of the website.
            </p>
          </div>

          {/* BRAND */}
          <div className="mt-6">
            <h3 className="font-serif text-2xl">
              Brand
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Brand Title"
                name="brandTitle"
                value={footer.brandTitle}
              />

              <Field
                label="Brand Subtitle"
                name="brandSubtitle"
                value={footer.brandSubtitle}
              />

              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Brand Description
                </label>

                <textarea
                  name="brandDescription"
                  defaultValue={footer.brandDescription ?? ""}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
                />
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Explore
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Section Title"
                name="exploreTitle"
                value={footer.exploreTitle}
              />

              <div />

              <Field
                label="Skincare Text"
                name="skincareText"
                value={footer.skincareText}
              />

              <Field
                label="Skincare Link"
                name="skincareLink"
                value={footer.skincareLink}
              />

              <Field
                label="Makeup Text"
                name="makeupText"
                value={footer.makeupText}
              />

              <Field
                label="Makeup Link"
                name="makeupLink"
                value={footer.makeupLink}
              />

              <Field
                label="Self-Care Text"
                name="selfCareText"
                value={footer.selfCareText}
              />

              <Field
                label="Self-Care Link"
                name="selfCareLink"
                value={footer.selfCareLink}
              />

              <Field
                label="Picks Text"
                name="picksText"
                value={footer.picksText}
              />

              <Field
                label="Picks Link"
                name="picksLink"
                value={footer.picksLink}
              />
            </div>
          </div>

          {/* THE LIZZY EDIT LINKS */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              The Lizzy Edit Links
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Section Title"
                name="aboutSectionTitle"
                value={footer.aboutSectionTitle}
              />

              <div />

              <Field
                label="About Text"
                name="aboutText"
                value={footer.aboutText}
              />

              <Field
                label="About Link"
                name="aboutLink"
                value={footer.aboutLink}
              />

              <Field
                label="Beauty Guide Text"
                name="beautyGuideText"
                value={footer.beautyGuideText}
              />

              <Field
                label="Beauty Guide Link"
                name="beautyGuideLink"
                value={footer.beautyGuideLink}
              />

              <Field
                label="Privacy Text"
                name="privacyText"
                value={footer.privacyText}
              />

              <Field
                label="Privacy Link"
                name="privacyLink"
                value={footer.privacyLink}
              />

              <Field
                label="Disclosure Text"
                name="disclosureText"
                value={footer.disclosureText}
              />

              <Field
                label="Disclosure Link"
                name="disclosureLink"
                value={footer.disclosureLink}
              />
            </div>
          </div>

          {/* SOCIAL */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Social
            </h3>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <Field
                label="Section Title"
                name="followTitle"
                value={footer.followTitle}
              />

              <div />

              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                  Description
                </label>

                <textarea
                  name="followDescription"
                  defaultValue={footer.followDescription ?? ""}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
                />
              </div>

              <Field
                label="Instagram Text"
                name="instagramText"
                value={footer.instagramText}
              />

              <Field
                label="Instagram Link"
                name="instagramLink"
                value={footer.instagramLink}
              />

              <Field
                label="TikTok Text"
                name="tiktokText"
                value={footer.tiktokText}
              />

              <Field
                label="TikTok Link"
                name="tiktokLink"
                value={footer.tiktokLink}
              />
            </div>
          </div>

          {/* LEGAL */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-serif text-2xl">
              Legal & Bottom Bar
            </h3>

            <div className="mt-5 grid gap-6">
              <Field
                label="Affiliate Text"
                name="affiliateText"
                value={footer.affiliateText}
              />

              <Field
                label="Copyright Text"
                name="copyrightText"
                value={footer.copyrightText}
              />

              <Field
                label="Bottom Text"
                name="bottomText"
                value={footer.bottomText}
              />
            </div>
          </div>

          {/* SAVE FOOTER */}
          <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
            >
              Save Footer
            </button>
          </div>
        </form>

        {/* ================================
    PRODUCT CARDS
================================= */}

<form
  action={updateGlobalProductCard}
  className="mt-8 rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8"
>
  <div className="border-b border-stone-200 pb-5">
    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
      Global Section
    </p>

    <h2 className="mt-2 font-serif text-3xl">
      Product Cards
    </h2>

    <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
      Edit the shared button text and accessibility label used
      by product cards across the website.
    </p>
  </div>

  <div className="mt-6 grid gap-6 sm:grid-cols-2">
    <Field
      label="Shop Button Text"
      name="shopButtonText"
      value={
        productCard.shopButtonText ??
        "Shop This Product →"
      }
    />

    <Field
      label="View Button Text"
      name="viewButtonText"
      value={
        productCard.viewButtonText ??
        "View Product →"
      }
    />

    <div className="sm:col-span-2">
      <Field
        label="View Product Accessibility Label"
        name="viewAriaLabel"
        value={
          productCard.viewAriaLabel ??
          "View"
        }
      />
    </div>
    </div>

    <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
      <button
        type="submit"
        className="rounded-full bg-[#211d1b] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72]"
      >
        Save Product Cards
      </button>
    </div>
  </form>
      </div>
    </main>
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
// NAVIGATION FIELD
// =================================

type NavigationFieldsProps = {
  title: string;

  textName: string;
  textValue?: string;

  linkName: string;
  linkValue?: string;
};

function NavigationFields({
  title,
  textName,
  textValue,
  linkName,
  linkValue,
}: NavigationFieldsProps) {
  return (
    <div className="mt-6 rounded-[22px] border border-stone-200 bg-[#fffaf7] p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
        {title}
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Field
          label="Text"
          name={textName}
          value={textValue}
        />

        <Field
          label="Link"
          name={linkName}
          value={linkValue}
        />
      </div>
    </div>
  );
}