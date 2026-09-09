"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuide01(
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
      backText:
        formData.get("heroBackText")?.toString() || "",

      eyebrow:
        formData.get("heroEyebrow")?.toString() || "",

      titleBefore:
        formData.get("heroTitleBefore")?.toString() || "",

      highlight:
        formData.get("heroHighlight")?.toString() || "",

      description:
        formData.get("heroDescription")?.toString() || "",

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

      paragraphs: [
        formData.get("introParagraph1")?.toString() || "",
        formData.get("introParagraph2")?.toString() || "",
        formData.get("introParagraph3")?.toString() || "",
      ].filter(Boolean),
    },

    routine: {
      eyebrow:
        formData.get("routineEyebrow")?.toString() || "",

      titleBefore:
        formData.get("routineTitleBefore")?.toString() || "",

      highlight:
        formData.get("routineHighlight")?.toString() || "",

      noteLabel:
        formData.get("routineNoteLabel")?.toString() || "",

      steps: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`routineStep${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`routineStep${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`routineStep${number}Description`)
              ?.toString() || "",

          note:
            formData
              .get(`routineStep${number}Note`)
              ?.toString() || "",
        };
      }),
    },

    morning: {
      eyebrow:
        formData.get("morningEyebrow")?.toString() || "",

      title:
        formData.get("morningTitle")?.toString() || "",

      description:
        formData.get("morningDescription")?.toString() || "",

      steps: [
        formData.get("morningStep1")?.toString() || "",
        formData.get("morningStep2")?.toString() || "",
        formData.get("morningStep3")?.toString() || "",
        formData.get("morningStep4")?.toString() || "",
      ].filter(Boolean),
    },

    evening: {
      eyebrow:
        formData.get("eveningEyebrow")?.toString() || "",

      title:
        formData.get("eveningTitle")?.toString() || "",

      description:
        formData.get("eveningDescription")?.toString() || "",

      steps: [
        formData.get("eveningStep1")?.toString() || "",
        formData.get("eveningStep2")?.toString() || "",
        formData.get("eveningStep3")?.toString() || "",
      ].filter(Boolean),
    },

    beautyNotes: {
      eyebrow:
        formData.get("notesEyebrow")?.toString() || "",

      titleBefore:
        formData.get("notesTitleBefore")?.toString() || "",

      highlight:
        formData.get("notesHighlight")?.toString() || "",

      items: [
        formData.get("noteItem1")?.toString() || "",
        formData.get("noteItem2")?.toString() || "",
        formData.get("noteItem3")?.toString() || "",
        formData.get("noteItem4")?.toString() || "",
      ].filter(Boolean),
    },

    skinTypeNote: {
      eyebrow:
        formData.get("skinNoteEyebrow")?.toString() || "",

      titleBefore:
        formData.get("skinNoteTitleBefore")?.toString() || "",

      highlight:
        formData.get("skinNoteHighlight")?.toString() || "",

      description:
        formData.get("skinNoteDescription")?.toString() || "",
    },

    cta: {
      eyebrow:
        formData.get("ctaEyebrow")?.toString() || "",

      title:
        formData.get("ctaTitle")?.toString() || "",

      description:
        formData.get("ctaDescription")?.toString() || "",

      buttonText:
        formData.get("ctaButtonText")?.toString() || "",

      buttonLink:
        formData.get("ctaButtonLink")?.toString() || "",
    },

    navigation: {
      allGuidesText:
        formData.get("allGuidesText")?.toString() || "",

      allGuidesLink:
        formData.get("allGuidesLink")?.toString() || "",

      nextGuideText:
        formData.get("nextGuideText")?.toString() || "",

      nextGuideLink:
        formData.get("nextGuideLink")?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "beauty-guide-01",
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

  revalidatePath("/beauty-guide/01");
  revalidatePath("/admin/content/beauty-guide/01");

  redirect("/admin/content/beauty-guide/01");
}