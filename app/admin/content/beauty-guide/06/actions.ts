"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuide06(
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

    checklist: {
      eyebrow:
        formData.get("checklistEyebrow")?.toString() || "",

      titleBefore:
        formData.get("checklistTitleBefore")?.toString() || "",

      highlight:
        formData.get("checklistHighlight")?.toString() || "",

      noteLabel:
        formData.get("checklistNoteLabel")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`question${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`question${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`question${number}Description`)
              ?.toString() || "",

          note:
            formData
              .get(`question${number}Note`)
              ?.toString() || "",
        };
      }),
    },

    saveSplurge: {
      eyebrow:
        formData.get("saveSplurgeEyebrow")?.toString() || "",

      titleBefore:
        formData
          .get("saveSplurgeTitleBefore")
          ?.toString() || "",

      highlight:
        formData
          .get("saveSplurgeHighlight")
          ?.toString() || "",

      splurge: {
        eyebrow:
          formData.get("splurgeEyebrow")?.toString() || "",

        title:
          formData.get("splurgeTitle")?.toString() || "",

        description:
          formData
            .get("splurgeDescription")
            ?.toString() || "",

        items: [
          formData.get("splurgeItem1")?.toString() || "",
          formData.get("splurgeItem2")?.toString() || "",
          formData.get("splurgeItem3")?.toString() || "",
          formData.get("splurgeItem4")?.toString() || "",
        ].filter(Boolean),
      },

      save: {
        eyebrow:
          formData.get("saveEyebrow")?.toString() || "",

        title:
          formData.get("saveTitle")?.toString() || "",

        description:
          formData
            .get("saveDescription")
            ?.toString() || "",

        items: [
          formData.get("saveItem1")?.toString() || "",
          formData.get("saveItem2")?.toString() || "",
          formData.get("saveItem3")?.toString() || "",
          formData.get("saveItem4")?.toString() || "",
        ].filter(Boolean),
      },
    },

    costPerUse: {
      eyebrow:
        formData.get("costEyebrow")?.toString() || "",

      titleBefore:
        formData.get("costTitleBefore")?.toString() || "",

      highlight:
        formData.get("costHighlight")?.toString() || "",

      paragraphs: [
        formData.get("costParagraph1")?.toString() || "",
        formData.get("costParagraph2")?.toString() || "",
      ].filter(Boolean),

      exampleOneLabel:
        formData.get("exampleOneLabel")?.toString() || "",

      exampleOneFormula:
        formData.get("exampleOneFormula")?.toString() || "",

      exampleOneResult:
        formData.get("exampleOneResult")?.toString() || "",

      exampleTwoLabel:
        formData.get("exampleTwoLabel")?.toString() || "",

      exampleTwoFormula:
        formData.get("exampleTwoFormula")?.toString() || "",

      exampleTwoResult:
        formData.get("exampleTwoResult")?.toString() || "",
    },

    value: {
      eyebrow:
        formData.get("valueEyebrow")?.toString() || "",

      titleBefore:
        formData.get("valueTitleBefore")?.toString() || "",

      highlight:
        formData.get("valueHighlight")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`value${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`value${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`value${number}Description`)
              ?.toString() || "",
        };
      }),
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

      description:
        formData.get("ctaDescription")?.toString() || "",

      buttonText:
        formData.get("ctaButtonText")?.toString() || "",

      buttonLink:
        formData.get("ctaButtonLink")?.toString() || "",
    },

    navigation: {
      previousText:
        formData.get("previousText")?.toString() || "",

      previousLink:
        formData.get("previousLink")?.toString() || "",

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
        page: "beauty-guide-06",
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

  revalidatePath("/beauty-guide/06");
  revalidatePath("/admin/content/beauty-guide/06");

  redirect("/admin/content/beauty-guide/06");
}