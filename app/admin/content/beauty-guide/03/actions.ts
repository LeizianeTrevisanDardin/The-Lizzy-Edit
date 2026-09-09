"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuide03(
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

    differences: {
      eyebrow:
        formData.get("differencesEyebrow")?.toString() || "",

      titleBefore:
        formData.get("differencesTitleBefore")?.toString() || "",

      highlight:
        formData.get("differencesHighlight")?.toString() || "",

      noteLabel:
        formData.get("differencesNoteLabel")?.toString() || "",

      items: Array.from({ length: 4 }, (_, index) => {
        const number = index + 1;

        return {
          number:
            formData
              .get(`difference${number}Number`)
              ?.toString() || "",

          title:
            formData
              .get(`difference${number}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`difference${number}Description`)
              ?.toString() || "",

          note:
            formData
              .get(`difference${number}Note`)
              ?.toString() || "",
        };
      }),
    },

    drySkin: {
      eyebrow:
        formData.get("drySkinEyebrow")?.toString() || "",

      title:
        formData.get("drySkinTitle")?.toString() || "",

      description:
        formData.get("drySkinDescription")?.toString() || "",

      items: [
        formData.get("drySkinItem1")?.toString() || "",
        formData.get("drySkinItem2")?.toString() || "",
        formData.get("drySkinItem3")?.toString() || "",
        formData.get("drySkinItem4")?.toString() || "",
      ].filter(Boolean),
    },

    dehydratedSkin: {
      eyebrow:
        formData.get("dehydratedEyebrow")?.toString() || "",

      title:
        formData.get("dehydratedTitle")?.toString() || "",

      description:
        formData.get("dehydratedDescription")?.toString() || "",

      items: [
        formData.get("dehydratedItem1")?.toString() || "",
        formData.get("dehydratedItem2")?.toString() || "",
        formData.get("dehydratedItem3")?.toString() || "",
        formData.get("dehydratedItem4")?.toString() || "",
      ].filter(Boolean),
    },

    both: {
      eyebrow:
        formData.get("bothEyebrow")?.toString() || "",

      titleBefore:
        formData.get("bothTitleBefore")?.toString() || "",

      highlight:
        formData.get("bothHighlight")?.toString() || "",

      paragraphs: [
        formData.get("bothParagraph1")?.toString() || "",
        formData.get("bothParagraph2")?.toString() || "",
        formData.get("bothParagraph3")?.toString() || "",
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
        page: "beauty-guide-03",
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

  revalidatePath("/beauty-guide/03");
  revalidatePath("/admin/content/beauty-guide/03");

  redirect("/admin/content/beauty-guide/03");
}