"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updatePrivacyPage(
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

    sections: Array.from(
      { length: 9 },
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

    lastUpdated:
      formData.get("lastUpdated")?.toString() || "",
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "privacy",
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

  revalidatePath("/privacy");
  revalidatePath("/admin/content/privacy");

  redirect("/admin/content/privacy");
}