"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updatePicksPage(
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

    note: {
      eyebrow:
        formData.get("noteEyebrow")?.toString() || "",

      title:
        formData.get("noteTitle")?.toString() || "",

      description:
        formData.get("noteDescription")?.toString() || "",
    },

    catalog: {
      filterAll:
        formData.get("filterAll")?.toString() || "",

      filterSkincare:
        formData.get("filterSkincare")?.toString() || "",

      filterMakeup:
        formData.get("filterMakeup")?.toString() || "",

      filterSelfCare:
        formData.get("filterSelfCare")?.toString() || "",

      filterFragrance:
        formData.get("filterFragrance")?.toString() || "",

      filterUnder25:
        formData.get("filterUnder25")?.toString() || "",

      filterEveryday:
        formData.get("filterEveryday")?.toString() || "",

      filterSplurge:
        formData.get("filterSplurge")?.toString() || "",

      allPicksLabel:
        formData.get("allPicksLabel")?.toString() || "",

      picksSuffix:
        formData.get("picksSuffix")?.toString() || "",

      curatedForLabel:
        formData.get("curatedForLabel")?.toString() || "",

      productSingular:
        formData.get("productSingular")?.toString() || "",

      productPlural:
        formData.get("productPlural")?.toString() || "",

      emptyTitle:
        formData.get("emptyTitle")?.toString() || "",

      emptyDescription:
        formData.get("emptyDescription")?.toString() || "",

      viewAllText:
        formData.get("viewAllText")?.toString() || "",

      shopButtonText:
        formData.get("shopButtonText")?.toString() || "",

      viewButtonText:
        formData.get("viewButtonText")?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "picks",
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

  revalidatePath("/picks");
  revalidatePath("/admin/content/picks");

  redirect("/admin/content/picks");
}