"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateSelfCarePage(
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

    categories: {
      eyebrow:
        formData.get("categoriesEyebrow")?.toString() || "",
      titleBefore:
        formData.get("categoriesTitleBefore")?.toString() || "",
      highlight:
        formData.get("categoriesHighlight")?.toString() || "",
      description:
        formData.get("categoriesDescription")?.toString() || "",

      items: Array.from({ length: 6 }, (_, index) => ({
        title:
          formData.get(`category${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`category${index + 1}Description`)
            ?.toString() || "",
        symbol:
          formData.get(`category${index + 1}Symbol`)?.toString() || "",
        filter:
          formData.get(`category${index + 1}Filter`)?.toString() || "",
      })),
    },

    rituals: {
      eyebrow:
        formData.get("ritualsEyebrow")?.toString() || "",
      titleBefore:
        formData.get("ritualsTitleBefore")?.toString() || "",
      highlight:
        formData.get("ritualsHighlight")?.toString() || "",
      buttonText:
        formData.get("ritualsButtonText")?.toString() || "",

      items: Array.from({ length: 3 }, (_, index) => ({
        title:
          formData.get(`ritual${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`ritual${index + 1}Description`)
            ?.toString() || "",
        image:
          formData.get(`ritual${index + 1}Image`)?.toString() || "",
        filter:
          formData.get(`ritual${index + 1}Filter`)?.toString() || "",
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

    guide: {
      eyebrow:
        formData.get("guideEyebrow")?.toString() || "",
      titleBefore:
        formData.get("guideTitleBefore")?.toString() || "",
      highlight:
        formData.get("guideHighlight")?.toString() || "",
      description:
        formData.get("guideDescription")?.toString() || "",
      buttonText:
        formData.get("guideButtonText")?.toString() || "",
      buttonLink:
        formData.get("guideButtonLink")?.toString() || "",

      steps: Array.from({ length: 4 }, (_, index) => ({
        number:
          formData.get(`guide${index + 1}Number`)?.toString() || "",
        title:
          formData.get(`guide${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`guide${index + 1}Description`)
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
        page: "self-care",
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

  revalidatePath("/self-care");
  revalidatePath("/admin/content/self-care");

  redirect("/admin/content/self-care");
}