"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuide05(
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

    ritual: {
      eyebrow:
        formData.get("ritualEyebrow")?.toString() || "",

      titleBefore:
        formData.get("ritualTitleBefore")?.toString() || "",

      highlight:
        formData.get("ritualHighlight")?.toString() || "",

      noteLabel:
        formData.get("ritualNoteLabel")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`ritual${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`ritual${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`ritual${number}Description`)
              ?.toString() || "",

          note:
            formData
              .get(`ritual${number}Note`)
              ?.toString() || "",
        };
      }),
    },

    simpleRoutine: {
      eyebrow:
        formData.get("simpleEyebrow")?.toString() || "",

      title:
        formData.get("simpleTitle")?.toString() || "",

      description:
        formData.get("simpleDescription")?.toString() || "",

      items: [
        formData.get("simpleItem1")?.toString() || "",
        formData.get("simpleItem2")?.toString() || "",
        formData.get("simpleItem3")?.toString() || "",
        formData.get("simpleItem4")?.toString() || "",
      ].filter(Boolean),
    },

    fullRoutine: {
      eyebrow:
        formData.get("fullEyebrow")?.toString() || "",

      title:
        formData.get("fullTitle")?.toString() || "",

      description:
        formData.get("fullDescription")?.toString() || "",

      items: [
        formData.get("fullItem1")?.toString() || "",
        formData.get("fullItem2")?.toString() || "",
        formData.get("fullItem3")?.toString() || "",
        formData.get("fullItem4")?.toString() || "",
      ].filter(Boolean),
    },

    order: {
      eyebrow:
        formData.get("orderEyebrow")?.toString() || "",

      titleBefore:
        formData.get("orderTitleBefore")?.toString() || "",

      highlight:
        formData.get("orderHighlight")?.toString() || "",

      items: [
        formData.get("orderItem1")?.toString() || "",
        formData.get("orderItem2")?.toString() || "",
        formData.get("orderItem3")?.toString() || "",
        formData.get("orderItem4")?.toString() || "",
        formData.get("orderItem5")?.toString() || "",
        formData.get("orderItem6")?.toString() || "",
      ].filter(Boolean),

      description:
        formData.get("orderDescription")?.toString() || "",
    },

    afterShower: {
      eyebrow:
        formData.get("afterEyebrow")?.toString() || "",

      titleBefore:
        formData.get("afterTitleBefore")?.toString() || "",

      highlight:
        formData.get("afterHighlight")?.toString() || "",

      description:
        formData.get("afterDescription")?.toString() || "",

      items: [
        formData.get("afterItem1")?.toString() || "",
        formData.get("afterItem2")?.toString() || "",
        formData.get("afterItem3")?.toString() || "",
        formData.get("afterItem4")?.toString() || "",
        formData.get("afterItem5")?.toString() || "",
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
        page: "beauty-guide-05",
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

  revalidatePath("/beauty-guide/05");
  revalidatePath("/admin/content/beauty-guide/05");

  redirect("/admin/content/beauty-guide/05");
}