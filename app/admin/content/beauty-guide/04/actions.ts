"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuide04(
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

    finishes: {
      eyebrow:
        formData.get("finishesEyebrow")?.toString() || "",

      titleBefore:
        formData.get("finishesTitleBefore")?.toString() || "",

      highlight:
        formData.get("finishesHighlight")?.toString() || "",

      noteLabel:
        formData.get("finishesNoteLabel")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`finish${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`finish${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`finish${number}Description`)
              ?.toString() || "",

          note:
            formData
              .get(`finish${number}Note`)
              ?.toString() || "",
        };
      }),
    },

    comparison: {
      eyebrow:
        formData.get("comparisonEyebrow")?.toString() || "",

      titleBefore:
        formData.get("comparisonTitleBefore")?.toString() || "",

      highlight:
        formData.get("comparisonHighlight")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          eyebrow:
            formData
              .get(`comparison${number}Eyebrow`)
              ?.toString() || "",

          title:
            formData
              .get(`comparison${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`comparison${number}Description`)
              ?.toString() || "",
        };
      }),
    },

    coverage: {
      eyebrow:
        formData.get("coverageEyebrow")?.toString() || "",

      titleBefore:
        formData.get("coverageTitleBefore")?.toString() || "",

      highlight:
        formData.get("coverageHighlight")?.toString() || "",

      paragraphs: [
        formData.get("coverageParagraph1")?.toString() || "",
        formData.get("coverageParagraph2")?.toString() || "",
        formData.get("coverageParagraph3")?.toString() || "",
      ].filter(Boolean),
    },

    beforeFoundation: {
      eyebrow:
        formData.get("beforeEyebrow")?.toString() || "",

      title:
        formData.get("beforeTitle")?.toString() || "",

      description:
        formData.get("beforeDescription")?.toString() || "",

      items: [
        formData.get("beforeItem1")?.toString() || "",
        formData.get("beforeItem2")?.toString() || "",
        formData.get("beforeItem3")?.toString() || "",
      ].filter(Boolean),
    },

    afterFoundation: {
      eyebrow:
        formData.get("afterEyebrow")?.toString() || "",

      title:
        formData.get("afterTitle")?.toString() || "",

      description:
        formData.get("afterDescription")?.toString() || "",

      items: [
        formData.get("afterItem1")?.toString() || "",
        formData.get("afterItem2")?.toString() || "",
        formData.get("afterItem3")?.toString() || "",
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
        page: "beauty-guide-04",
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

  revalidatePath("/beauty-guide/04");
  revalidatePath("/admin/content/beauty-guide/04");

  redirect("/admin/content/beauty-guide/04");
}