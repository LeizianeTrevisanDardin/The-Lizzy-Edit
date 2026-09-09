"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateSkincarePage(
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
    hero: {
      eyebrow:
        formData.get("heroEyebrow")?.toString() || "",
      titleBefore:
        formData.get("heroTitleBefore")?.toString() || "",
      highlight:
        formData.get("heroHighlight")?.toString() || "",
      description:
        formData.get("heroDescription")?.toString() || "",
      primaryButtonText:
        formData.get("heroPrimaryButtonText")?.toString() || "",
      primaryButtonLink:
        formData.get("heroPrimaryButtonLink")?.toString() || "",
      secondaryButtonText:
        formData.get("heroSecondaryButtonText")?.toString() || "",
      secondaryButtonLink:
        formData.get("heroSecondaryButtonLink")?.toString() || "",
      image:
        formData.get("heroImage")?.toString() || "",
      imageAlt:
        formData.get("heroImageAlt")?.toString() || "",
      badge:
        formData.get("heroBadge")?.toString() || "",
    },

    concerns: {
      eyebrow:
        formData.get("concernsEyebrow")?.toString() || "",
      titleBefore:
        formData.get("concernsTitleBefore")?.toString() || "",
      highlight:
        formData.get("concernsHighlight")?.toString() || "",
      description:
        formData.get("concernsDescription")?.toString() || "",

      items: Array.from({ length: 6 }, (_, index) => ({
        title:
          formData.get(`concern${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`concern${index + 1}Description`)
            ?.toString() || "",
        symbol:
          formData.get(`concern${index + 1}Symbol`)?.toString() || "",
        filter:
          formData.get(`concern${index + 1}Filter`)?.toString() || "",
      })),
    },

    skinTypes: {
      eyebrow:
        formData.get("skinTypesEyebrow")?.toString() || "",
      titleBefore:
        formData.get("skinTypesTitleBefore")?.toString() || "",
      highlight:
        formData.get("skinTypesHighlight")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => ({
        title:
          formData.get(`skinType${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`skinType${index + 1}Description`)
            ?.toString() || "",
        symbol:
          formData.get(`skinType${index + 1}Symbol`)?.toString() || "",
        filter:
          formData.get(`skinType${index + 1}Filter`)?.toString() || "",
      })),
    },

    products: {
      eyebrow:
        formData.get("productsEyebrow")?.toString() || "",
      titleBefore:
        formData.get("productsTitleBefore")?.toString() || "",
      highlight:
        formData.get("productsHighlight")?.toString() || "",
      description:
        formData.get("productsDescription")?.toString() || "",
      buttonText:
        formData.get("productsButtonText")?.toString() || "",
      buttonLink:
        formData.get("productsButtonLink")?.toString() || "",
      emptyTitle:
        formData.get("productsEmptyTitle")?.toString() || "",
      emptyDescription:
        formData.get("productsEmptyDescription")?.toString() || "",
    },

    routine: {
      eyebrow:
        formData.get("routineEyebrow")?.toString() || "",
      titleBefore:
        formData.get("routineTitleBefore")?.toString() || "",
      highlight:
        formData.get("routineHighlight")?.toString() || "",
      description:
        formData.get("routineDescription")?.toString() || "",
      buttonText:
        formData.get("routineButtonText")?.toString() || "",
      buttonLink:
        formData.get("routineButtonLink")?.toString() || "",

      steps: Array.from({ length: 4 }, (_, index) => ({
        number:
          formData.get(`routine${index + 1}Number`)?.toString() || "",
        title:
          formData.get(`routine${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`routine${index + 1}Description`)
            ?.toString() || "",
      })),
    },

    cta: {
      eyebrow:
        formData.get("ctaEyebrow")?.toString() || "",
      title:
        formData.get("ctaTitle")?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "skincare",
        section: "page",
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

  revalidatePath("/skincare");
  revalidatePath("/admin/content/skincare");

  redirect("/admin/content/skincare");
}