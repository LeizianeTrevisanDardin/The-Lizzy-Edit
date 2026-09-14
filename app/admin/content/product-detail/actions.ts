"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateProductDetailPage(
  formData: FormData,
) {
  const supabase = await createClient();

  // =================================
  // AUTH
  // =================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // =================================
  // ADMIN CHECK
  // =================================

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // =================================
  // CONTENT
  // =================================

  const content = {
    backText:
      formData.get("backText")?.toString() ||
      "← Back to Lizzy's Picks",

    backLink:
      formData.get("backLink")?.toString() ||
      "/picks",

    imageComingSoon:
      formData
        .get("imageComingSoon")
        ?.toString() ||
      "Product image coming soon",

    whyILikeItTitle:
      formData
        .get("whyILikeItTitle")
        ?.toString() ||
      "Why I Like It",

    shopButtonText:
      formData
        .get("shopButtonText")
        ?.toString() ||
      "Shop This Product →",

    affiliateShortText:
      formData
        .get("affiliateShortText")
        ?.toString() ||
      "This link may be an affiliate link. I may earn a commission at no additional cost to you.",

    linkComingSoonText:
      formData
        .get("linkComingSoonText")
        ?.toString() ||
      "Product Link Coming Soon",

    linkComingSoonDescription:
      formData
        .get("linkComingSoonDescription")
        ?.toString() ||
      "Shopping link coming soon.",

    disclosureEyebrow:
      formData
        .get("disclosureEyebrow")
        ?.toString() ||
      "Affiliate Disclosure",

    disclosureText:
      formData
        .get("disclosureText")
        ?.toString() ||
      "As an Amazon Associate, I earn from qualifying purchases. Some links on The Lizzy Edit may be affiliate links, which means I may earn a commission at no additional cost to you.",

    moreEyebrow:
      formData
        .get("moreEyebrow")
        ?.toString() ||
      "Keep Exploring",

    moreTitle:
      formData
        .get("moreTitle")
        ?.toString() ||
      "More of Lizzy's beauty picks.",

    moreButtonText:
      formData
        .get("moreButtonText")
        ?.toString() ||
      "See All Picks →",

    moreButtonLink:
      formData
        .get("moreButtonLink")
        ?.toString() ||
      "/picks",
  };

  // =================================
  // SAVE
  // =================================

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "product-detail",
        section: "page",
        content,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    console.error(
      "PRODUCT DETAIL UPDATE ERROR:",
      error,
    );

    throw new Error(
      `Could not update product detail content: ${error.message}`,
    );
  }

  // =================================
  // REFRESH
  // =================================

  revalidatePath("/picks", "layout");
  revalidatePath(
    "/admin/content/product-detail",
  );

  redirect(
    "/admin/content/product-detail",
  );
}