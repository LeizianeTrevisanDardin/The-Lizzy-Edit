"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateAboutPage(
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
        formData
          .get("heroPrimaryButtonText")
          ?.toString() || "",

      primaryButtonLink:
        formData
          .get("heroPrimaryButtonLink")
          ?.toString() || "",

      secondaryButtonText:
        formData
          .get("heroSecondaryButtonText")
          ?.toString() || "",

      secondaryButtonLink:
        formData
          .get("heroSecondaryButtonLink")
          ?.toString() || "",

      image:
        formData.get("heroImage")?.toString() || "",

      imageAlt:
        formData.get("heroImageAlt")?.toString() || "",

      imageLabel:
        formData.get("heroImageLabel")?.toString() || "",
    },

    story: {
      eyebrow:
        formData.get("storyEyebrow")?.toString() || "",

      titleBefore:
        formData.get("storyTitleBefore")?.toString() || "",

      highlight:
        formData.get("storyHighlight")?.toString() || "",

      paragraphOne:
        formData.get("storyParagraphOne")?.toString() || "",

      paragraphTwo:
        formData.get("storyParagraphTwo")?.toString() || "",

      paragraphThree:
        formData.get("storyParagraphThree")?.toString() || "",

      quote:
        formData.get("storyQuote")?.toString() || "",
    },

    values: {
      eyebrow:
        formData.get("valuesEyebrow")?.toString() || "",

      titleBefore:
        formData.get("valuesTitleBefore")?.toString() || "",

      highlight:
        formData.get("valuesHighlight")?.toString() || "",

      items: Array.from(
        { length: 3 },
        (_, index) => ({
          title:
            formData
              .get(`value${index + 1}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`value${index + 1}Description`)
              ?.toString() || "",

          symbol:
            formData
              .get(`value${index + 1}Symbol`)
              ?.toString() || "",
        }),
      ),
    },

    insideEdit: {
      eyebrow:
        formData.get("insideEyebrow")?.toString() || "",

      titleBefore:
        formData
          .get("insideTitleBefore")
          ?.toString() || "",

      highlight:
        formData.get("insideHighlight")?.toString() || "",

      description:
        formData
          .get("insideDescription")
          ?.toString() || "",

      items: Array.from(
        { length: 4 },
        (_, index) => ({
          title:
            formData
              .get(`inside${index + 1}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`inside${index + 1}Description`)
              ?.toString() || "",

          href:
            formData
              .get(`inside${index + 1}Href`)
              ?.toString() || "",
        }),
      ),
    },

    transparency: {
      eyebrow:
        formData
          .get("transparencyEyebrow")
          ?.toString() || "",

      title:
        formData
          .get("transparencyTitle")
          ?.toString() || "",

      description:
        formData
          .get("transparencyDescription")
          ?.toString() || "",

      buttonText:
        formData
          .get("transparencyButtonText")
          ?.toString() || "",

      buttonLink:
        formData
          .get("transparencyButtonLink")
          ?.toString() || "",
    },

    cta: {
      eyebrow:
        formData.get("ctaEyebrow")?.toString() || "",

      title:
        formData.get("ctaTitle")?.toString() || "",

      buttonText:
        formData.get("ctaButtonText")?.toString() || "",

      href:
        formData.get("ctaHref")?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "about",
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

  revalidatePath("/about");
  revalidatePath("/admin/content/about");

  redirect("/admin/content/about");
}