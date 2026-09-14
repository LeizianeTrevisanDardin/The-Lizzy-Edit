"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateGlobalHeader(
  formData: FormData,
) {
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

  const content = {
    announcement:
      formData.get("announcement")?.toString() || "",

    logoTitle:
      formData.get("logoTitle")?.toString() || "",

    logoSubtitle:
      formData.get("logoSubtitle")?.toString() || "",

    // HOME
    homeText:
      formData.get("homeText")?.toString() || "",

    homeLink:
      formData.get("homeLink")?.toString() || "",

    // SKINCARE
    skincareText:
      formData.get("skincareText")?.toString() || "",

    skincareLink:
      formData.get("skincareLink")?.toString() || "",

    // MAKEUP
    makeupText:
      formData.get("makeupText")?.toString() || "",

    makeupLink:
      formData.get("makeupLink")?.toString() || "",

    // SELF CARE
    selfCareText:
      formData.get("selfCareText")?.toString() || "",

    selfCareLink:
      formData.get("selfCareLink")?.toString() || "",

    // FRAGRANCES
    fragrancesText:
      formData.get("fragrancesText")?.toString() || "",

    fragrancesLink:
      formData.get("fragrancesLink")?.toString() || "",

    // BEAUTY GUIDE
    beautyGuideText:
      formData.get("beautyGuideText")?.toString() || "",

    beautyGuideLink:
      formData.get("beautyGuideLink")?.toString() || "",

    // UNDERTONE
    undertoneText:
      formData.get("undertoneText")?.toString() || "",

    undertoneLink:
      formData.get("undertoneLink")?.toString() || "",

    // ABOUT
    aboutText:
      formData.get("aboutText")?.toString() || "",

    aboutLink:
      formData.get("aboutLink")?.toString() || "",

    // ADMIN
    adminText:
      formData.get("adminText")?.toString() || "",

    adminLink:
      formData.get("adminLink")?.toString() || "",

    // PICKS
    picksText:
      formData.get("picksText")?.toString() || "",

    picksLink:
      formData.get("picksLink")?.toString() || "",

    mobilePicksText:
      formData.get("mobilePicksText")?.toString() || "",

    // PRIVACY
    privacyText:
      formData.get("privacyText")?.toString() || "",

    privacyLink:
      formData.get("privacyLink")?.toString() || "",

    // DISCLOSURE
    disclosureText:
      formData.get("disclosureText")?.toString() || "",

    disclosureLink:
      formData.get("disclosureLink")?.toString() || "",

    // MOBILE MENU ACCESSIBILITY
    openMenuLabel:
      formData.get("openMenuLabel")?.toString() ||
      "Open menu",

    closeMenuLabel:
      formData.get("closeMenuLabel")?.toString() ||
      "Close menu",
  };

  // ================================
  // SAVE
  // ================================

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "global",
        section: "header",
        content,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    console.error(
      "GLOBAL HEADER UPDATE ERROR:",
      error,
    );

    throw new Error(
      `Could not update header: ${error.message}`,
    );
  }

  // ================================
  // REFRESH WEBSITE
  // ================================

  revalidatePath("/", "layout");
  revalidatePath("/admin/content/global");

  redirect("/admin/content/global");
}

export async function updateGlobalFooter(
  formData: FormData,
) {
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

  const content = {
    brandTitle:
      formData.get("brandTitle")?.toString() || "",

    brandSubtitle:
      formData.get("brandSubtitle")?.toString() || "",

    brandDescription:
      formData.get("brandDescription")?.toString() || "",

    exploreTitle:
      formData.get("exploreTitle")?.toString() || "",

    skincareText:
      formData.get("skincareText")?.toString() || "",

    skincareLink:
      formData.get("skincareLink")?.toString() || "",

    makeupText:
      formData.get("makeupText")?.toString() || "",

    makeupLink:
      formData.get("makeupLink")?.toString() || "",

    selfCareText:
      formData.get("selfCareText")?.toString() || "",

    selfCareLink:
      formData.get("selfCareLink")?.toString() || "",

    picksText:
      formData.get("picksText")?.toString() || "",

    picksLink:
      formData.get("picksLink")?.toString() || "",

    aboutSectionTitle:
      formData.get("aboutSectionTitle")?.toString() || "",

    aboutText:
      formData.get("aboutText")?.toString() || "",

    aboutLink:
      formData.get("aboutLink")?.toString() || "",

    beautyGuideText:
      formData.get("beautyGuideText")?.toString() || "",

    beautyGuideLink:
      formData.get("beautyGuideLink")?.toString() || "",

    privacyText:
      formData.get("privacyText")?.toString() || "",

    privacyLink:
      formData.get("privacyLink")?.toString() || "",

    disclosureText:
      formData.get("disclosureText")?.toString() || "",

    disclosureLink:
      formData.get("disclosureLink")?.toString() || "",

    followTitle:
      formData.get("followTitle")?.toString() || "",

    followDescription:
      formData.get("followDescription")?.toString() || "",

    instagramText:
      formData.get("instagramText")?.toString() || "",

    instagramLink:
      formData.get("instagramLink")?.toString() || "",

    tiktokText:
      formData.get("tiktokText")?.toString() || "",

    tiktokLink:
      formData.get("tiktokLink")?.toString() || "",

    affiliateText:
      formData.get("affiliateText")?.toString() || "",

    copyrightText:
      formData.get("copyrightText")?.toString() || "",

    bottomText:
      formData.get("bottomText")?.toString() || "",
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "global",
        section: "footer",
        content,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/content/global");

  redirect("/admin/content/global");
}

// =================================
// PRODUCT CARD
// =================================

export async function updateGlobalProductCard(
  formData: FormData,
) {
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
  // PRODUCT CARD CONTENT
  // ================================

  const content = {
    shopButtonText:
      formData.get("shopButtonText")?.toString() ||
      "Shop This Product →",

    viewButtonText:
      formData.get("viewButtonText")?.toString() ||
      "View Product →",

    viewAriaLabel:
      formData.get("viewAriaLabel")?.toString() ||
      "View",
  };

  // ================================
  // SAVE
  // ================================

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "global",
        section: "product-card",
        content,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    console.error(
      "GLOBAL PRODUCT CARD UPDATE ERROR:",
      error,
    );

    throw new Error(
      `Could not update product card: ${error.message}`,
    );
  }

  // ================================
  // REFRESH PRODUCT PAGES
  // ================================

  revalidatePath("/picks");
  revalidatePath("/skincare");
  revalidatePath("/makeup");
  revalidatePath("/self-care");
  revalidatePath("/fragrances");
  revalidatePath("/admin/content/global");

  redirect("/admin/content/global");
}