"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateFragrancesPage(
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
    },

    intro: {
      eyebrow:
        formData.get("introEyebrow")?.toString() || "",
      titleBefore:
        formData.get("introTitleBefore")?.toString() || "",
      highlight:
        formData.get("introHighlight")?.toString() || "",
      paragraphOne:
        formData.get("introParagraphOne")?.toString() || "",
      paragraphTwo:
        formData.get("introParagraphTwo")?.toString() || "",
      paragraphThree:
        formData.get("introParagraphThree")?.toString() || "",
    },

    families: {
      eyebrow:
        formData.get("familiesEyebrow")?.toString() || "",
      titleBefore:
        formData.get("familiesTitleBefore")?.toString() || "",
      highlight:
        formData.get("familiesHighlight")?.toString() || "",
      description:
        formData.get("familiesDescription")?.toString() || "",

      items: Array.from({ length: 5 }, (_, index) => ({
        title:
          formData.get(`family${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`family${index + 1}Description`)
            ?.toString() || "",
        symbol:
          formData.get(`family${index + 1}Symbol`)?.toString() || "",
      })),
    },

    wardrobe: {
      eyebrow:
        formData.get("wardrobeEyebrow")?.toString() || "",
      titleBefore:
        formData.get("wardrobeTitleBefore")?.toString() || "",
      highlight:
        formData.get("wardrobeHighlight")?.toString() || "",
      description:
        formData.get("wardrobeDescription")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => ({
        title:
          formData.get(`wardrobe${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`wardrobe${index + 1}Description`)
            ?.toString() || "",
        tag:
          formData.get(`wardrobe${index + 1}Tag`)?.toString() || "",
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

    fragrance101: {
      eyebrow:
        formData.get("fragrance101Eyebrow")?.toString() || "",
      titleBefore:
        formData.get("fragrance101TitleBefore")?.toString() || "",
      highlight:
        formData.get("fragrance101Highlight")?.toString() || "",
      description:
        formData.get("fragrance101Description")?.toString() || "",

      items: Array.from({ length: 3 }, (_, index) => ({
        number:
          formData.get(`note${index + 1}Number`)?.toString() || "",
        title:
          formData.get(`note${index + 1}Title`)?.toString() || "",
        description:
          formData
            .get(`note${index + 1}Description`)
            ?.toString() || "",
      })),
    },

    concentration: {
      eyebrow:
        formData.get("concentrationEyebrow")?.toString() || "",
      titleBefore:
        formData.get("concentrationTitleBefore")?.toString() || "",
      highlight:
        formData.get("concentrationHighlight")?.toString() || "",

      edpTag:
        formData.get("edpTag")?.toString() || "",
      edpTitle:
        formData.get("edpTitle")?.toString() || "",
      edpDescription:
        formData.get("edpDescription")?.toString() || "",

      edtTag:
        formData.get("edtTag")?.toString() || "",
      edtTitle:
        formData.get("edtTitle")?.toString() || "",
      edtDescription:
        formData.get("edtDescription")?.toString() || "",
    },

    tips: {
      eyebrow:
        formData.get("tipsEyebrow")?.toString() || "",
      titleBefore:
        formData.get("tipsTitleBefore")?.toString() || "",
      highlight:
        formData.get("tipsHighlight")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) =>
        formData.get(`tip${index + 1}`)?.toString() || "",
      ),
    },

    finalNote: {
      eyebrow:
        formData.get("finalNoteEyebrow")?.toString() || "",
      titleBefore:
        formData.get("finalNoteTitleBefore")?.toString() || "",
      highlight:
        formData.get("finalNoteHighlight")?.toString() || "",
      description:
        formData.get("finalNoteDescription")?.toString() || "",
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
        page: "fragrances",
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

  revalidatePath("/fragrances");
  revalidatePath("/admin/content/fragrances");

  redirect("/admin/content/fragrances");
}