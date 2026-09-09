"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateHomeHero(
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
    eyebrow:
      String(
        formData.get("eyebrow") ?? "",
      ),

    titleBefore:
      String(
        formData.get("titleBefore") ?? "",
      ),

    highlight:
      String(
        formData.get("highlight") ?? "",
      ),

    titleAfter:
      String(
        formData.get("titleAfter") ?? "",
      ),

    description:
      String(
        formData.get("description") ?? "",
      ),

    primaryButtonText:
      String(
        formData.get("primaryButtonText") ?? "",
      ),

    primaryButtonLink:
      String(
        formData.get("primaryButtonLink") ?? "",
      ),

    secondaryButtonText:
      String(
        formData.get("secondaryButtonText") ?? "",
      ),

    secondaryButtonLink:
      String(
        formData.get("secondaryButtonLink") ?? "",
      ),

    featureOne:
      String(
        formData.get("featureOne") ?? "",
      ),

    featureTwo:
      String(
        formData.get("featureTwo") ?? "",
      ),

    featureThree:
      String(
        formData.get("featureThree") ?? "",
      ),

    image:
      String(
        formData.get("image") ?? "",
      ),

    imageAlt:
      String(
        formData.get("imageAlt") ?? "",
      ),

    badge:
      String(
        formData.get("badge") ?? "",
      ),
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "home",
        section: "hero",
        content,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(
    "/admin/content/home",
  );
}

export async function updateHomeCategories(
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
    eyebrow:
      formData
        .get("eyebrow")
        ?.toString() || "",

    titleBefore:
      formData
        .get("titleBefore")
        ?.toString() || "",

    highlight:
      formData
        .get("highlight")
        ?.toString() || "",

    titleAfter:
      formData
        .get("titleAfter")
        ?.toString() || "",

    description:
      formData
        .get("description")
        ?.toString() || "",

    cardEyebrow:
      formData
        .get("cardEyebrow")
        ?.toString() || "",

    exploreText:
      formData
        .get("exploreText")
        ?.toString() || "",

    items: [
      {
        id: "skincare",

        title:
          formData
            .get("skincareTitle")
            ?.toString() || "",

        description:
          formData
            .get(
              "skincareDescription",
            )
            ?.toString() || "",

        image:
          formData
            .get("skincareImage")
            ?.toString() || "",

        href:
          formData
            .get("skincareHref")
            ?.toString() || "",
      },

      {
        id: "makeup",

        title:
          formData
            .get("makeupTitle")
            ?.toString() || "",

        description:
          formData
            .get(
              "makeupDescription",
            )
            ?.toString() || "",

        image:
          formData
            .get("makeupImage")
            ?.toString() || "",

        href:
          formData
            .get("makeupHref")
            ?.toString() || "",
      },

      {
        id: "self-care",

        title:
          formData
            .get("selfCareTitle")
            ?.toString() || "",

        description:
          formData
            .get(
              "selfCareDescription",
            )
            ?.toString() || "",

        image:
          formData
            .get("selfCareImage")
            ?.toString() || "",

        href:
          formData
            .get("selfCareHref")
            ?.toString() || "",
      },
    ],
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "home",
        section: "categories",
        content,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(
    "/admin/content/home",
  );

  redirect(
    "/admin/content/home",
  );
}

export async function updateHomeAbout(
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
    image:
      formData
        .get("image")
        ?.toString() || "",

    imageAlt:
      formData
        .get("imageAlt")
        ?.toString() || "",

    badgeEyebrow:
      formData
        .get("badgeEyebrow")
        ?.toString() || "",

    badgeText:
      formData
        .get("badgeText")
        ?.toString() || "",

    eyebrow:
      formData
        .get("eyebrow")
        ?.toString() || "",

    name:
      formData
        .get("name")
        ?.toString() || "",

    nameAccent:
      formData
        .get("nameAccent")
        ?.toString() || "",

    paragraphOne:
      formData
        .get("paragraphOne")
        ?.toString() || "",

    paragraphTwo:
      formData
        .get("paragraphTwo")
        ?.toString() || "",

    cardOneIcon:
      formData
        .get("cardOneIcon")
        ?.toString() || "",

    cardOneTitle:
      formData
        .get("cardOneTitle")
        ?.toString() || "",

    cardOneText:
      formData
        .get("cardOneText")
        ?.toString() || "",

    cardTwoIcon:
      formData
        .get("cardTwoIcon")
        ?.toString() || "",

    cardTwoTitle:
      formData
        .get("cardTwoTitle")
        ?.toString() || "",

    cardTwoText:
      formData
        .get("cardTwoText")
        ?.toString() || "",

    cardThreeIcon:
      formData
        .get("cardThreeIcon")
        ?.toString() || "",

    cardThreeTitle:
      formData
        .get("cardThreeTitle")
        ?.toString() || "",

    cardThreeText:
      formData
        .get("cardThreeText")
        ?.toString() || "",

    buttonText:
      formData
        .get("buttonText")
        ?.toString() || "",

    buttonLink:
      formData
        .get("buttonLink")
        ?.toString() || "",
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "home",
        section: "about",
        content,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(
    "/admin/content/home",
  );

  redirect(
    "/admin/content/home",
  );
}

export async function updateHomePicks(
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
    eyebrow:
      formData
        .get("eyebrow")
        ?.toString() || "",

    titleBefore:
      formData
        .get("titleBefore")
        ?.toString() || "",

    highlight:
      formData
        .get("highlight")
        ?.toString() || "",

    description:
      formData
        .get("description")
        ?.toString() || "",

    buttonText:
      formData
        .get("buttonText")
        ?.toString() || "",

    buttonLink:
      formData
        .get("buttonLink")
        ?.toString() || "",

    emptyTitle:
      formData
        .get("emptyTitle")
        ?.toString() || "",

    emptyDescription:
      formData
        .get("emptyDescription")
        ?.toString() || "",

    noteLabel:
      formData
        .get("noteLabel")
        ?.toString() || "",

    noteText:
      formData
        .get("noteText")
        ?.toString() || "",
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "home",
        section: "picks",
        content,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "page,section",
      },
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(
    "/admin/content/home",
  );

  redirect(
    "/admin/content/home",
  );
}