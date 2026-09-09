"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateBeautyGuidePage(
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
    },

    featured: {
      image:
        formData.get("featuredImage")?.toString() || "",

      imageAlt:
        formData.get("featuredImageAlt")?.toString() || "",

      eyebrow:
        formData.get("featuredEyebrow")?.toString() || "",

      title:
        formData.get("featuredTitle")?.toString() || "",

      description:
        formData
          .get("featuredDescription")
          ?.toString() || "",

      buttonText:
        formData.get("featuredButtonText")?.toString() || "",

      buttonLink:
        formData.get("featuredButtonLink")?.toString() || "",
    },

    articles: {
      eyebrow:
        formData.get("articlesEyebrow")?.toString() || "",

      titleBefore:
        formData.get("articlesTitleBefore")?.toString() || "",

      highlight:
        formData.get("articlesHighlight")?.toString() || "",

      buttonText:
        formData.get("articlesButtonText")?.toString() || "",

      items: Array.from(
        { length: 6 },
        (_, index) => ({
          category:
            formData
              .get(`article${index + 1}Category`)
              ?.toString() || "",

          title:
            formData
              .get(`article${index + 1}Title`)
              ?.toString() || "",

          description:
            formData
              .get(`article${index + 1}Description`)
              ?.toString() || "",

          image:
            formData
              .get(`article${index + 1}Image`)
              ?.toString() || "",

          href:
            formData
              .get(`article${index + 1}Href`)
              ?.toString() || "",
        }),
      ),
    },

    quickTips: {
      eyebrow:
        formData.get("quickTipsEyebrow")?.toString() || "",

      titleBefore:
        formData
          .get("quickTipsTitleBefore")
          ?.toString() || "",

      highlight:
        formData
          .get("quickTipsHighlight")
          ?.toString() || "",

      description:
        formData
          .get("quickTipsDescription")
          ?.toString() || "",

      items: Array.from(
        { length: 4 },
        (_, index) =>
          formData
            .get(`quickTip${index + 1}`)
            ?.toString() || "",
      ),
    },

    explore: {
      eyebrow:
        formData.get("exploreEyebrow")?.toString() || "",

      titleBefore:
        formData
          .get("exploreTitleBefore")
          ?.toString() || "",

      highlight:
        formData.get("exploreHighlight")?.toString() || "",

      buttonText:
        formData.get("exploreButtonText")?.toString() || "",

      items: Array.from(
        { length: 3 },
        (_, index) => ({
          title:
            formData
              .get(`explore${index + 1}Title`)
              ?.toString() || "",

          symbol:
            formData
              .get(`explore${index + 1}Symbol`)
              ?.toString() || "",

          href:
            formData
              .get(`explore${index + 1}Href`)
              ?.toString() || "",
        }),
      ),
    },

    darkCta: {
      eyebrow:
        formData.get("darkCtaEyebrow")?.toString() || "",

      title:
        formData.get("darkCtaTitle")?.toString() || "",

      description:
        formData
          .get("darkCtaDescription")
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
        page: "beauty-guide",
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

  revalidatePath("/beauty-guide");
  revalidatePath("/admin/content/beauty-guide");

  redirect("/admin/content/beauty-guide");
}