"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateUndertonePage(
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
      buttonText:
        formData.get("heroButtonText")?.toString() || "",
      buttonLink:
        formData.get("heroButtonLink")?.toString() || "",
      privacyText:
        formData.get("heroPrivacyText")?.toString() || "",
    },

    howItWorks: {
      eyebrow:
        formData.get("howEyebrow")?.toString() || "",
      titleBefore:
        formData.get("howTitleBefore")?.toString() || "",
      highlight:
        formData.get("howHighlight")?.toString() || "",

      items: Array.from({ length: 3 }, (_, index) => ({
        number:
          formData
            .get(`step${index + 1}Number`)
            ?.toString() || "",
        title:
          formData
            .get(`step${index + 1}Title`)
            ?.toString() || "",
        description:
          formData
            .get(`step${index + 1}Description`)
            ?.toString() || "",
      })),
    },

    beforeStart: {
      eyebrow:
        formData.get("beforeEyebrow")?.toString() || "",
      titleBefore:
        formData.get("beforeTitleBefore")?.toString() || "",
      highlight:
        formData.get("beforeHighlight")?.toString() || "",

      tips: Array.from({ length: 4 }, (_, index) =>
        formData
          .get(`beforeTip${index + 1}`)
          ?.toString() || "",
      ),
    },

    privacy: {
      eyebrow:
        formData.get("privacyEyebrow")?.toString() || "",
      titleBefore:
        formData.get("privacyTitleBefore")?.toString() || "",
      highlight:
        formData.get("privacyHighlight")?.toString() || "",
      description:
        formData.get("privacyDescription")?.toString() || "",
      disclaimer:
        formData.get("privacyDisclaimer")?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "undertone",
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

  revalidatePath("/undertone");
  revalidatePath("/admin/content/undertone");

  redirect("/admin/content/undertone");
}