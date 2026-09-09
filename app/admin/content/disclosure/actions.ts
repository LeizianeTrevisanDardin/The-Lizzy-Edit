"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateDisclosurePage(
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
      title:
        formData.get("heroTitle")?.toString() || "",
      description:
        formData.get("heroDescription")?.toString() || "",
    },

    amazon: {
      eyebrow:
        formData.get("amazonEyebrow")?.toString() || "",
      title:
        formData.get("amazonTitle")?.toString() || "",
      strongText:
        formData.get("amazonStrongText")?.toString() || "",
      paragraphOne:
        formData.get("amazonParagraphOne")?.toString() || "",
      paragraphTwo:
        formData.get("amazonParagraphTwo")?.toString() || "",
    },

    sections: Array.from(
      { length: 5 },
      (_, index) => {
        const sectionNumber = index + 1;

        const paragraphOne =
          formData
            .get(`section${sectionNumber}Paragraph1`)
            ?.toString() || "";

        const paragraphTwo =
          formData
            .get(`section${sectionNumber}Paragraph2`)
            ?.toString() || "";

        return {
          title:
            formData
              .get(`section${sectionNumber}Title`)
              ?.toString() || "",

          paragraphs: [
            paragraphOne,
            paragraphTwo,
          ].filter(Boolean),
        };
      },
    ),

    philosophy: {
      eyebrow:
        formData.get("philosophyEyebrow")?.toString() || "",
      title:
        formData.get("philosophyTitle")?.toString() || "",
      description:
        formData.get("philosophyDescription")?.toString() || "",
    },

    questions: {
      title:
        formData.get("questionsTitle")?.toString() || "",
      description:
        formData.get("questionsDescription")?.toString() || "",
      buttonText:
        formData.get("questionsButtonText")?.toString() || "",
      buttonLink:
        formData.get("questionsButtonLink")?.toString() || "",
    },

    lastUpdated:
      formData.get("lastUpdated")?.toString() || "",
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "disclosure",
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

  revalidatePath("/disclosure");
  revalidatePath("/admin/content/disclosure");

  redirect("/admin/content/disclosure");
}