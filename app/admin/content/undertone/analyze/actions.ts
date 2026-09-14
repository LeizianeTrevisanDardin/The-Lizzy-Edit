"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateUndertoneAnalyzePage(
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
    camera: {
      backText:
        formData.get("cameraBackText")?.toString() || "",

      brand:
        formData.get("cameraBrand")?.toString() || "",

      eyebrow:
        formData.get("cameraEyebrow")?.toString() || "",

      titleBefore:
        formData.get("cameraTitleBefore")?.toString() || "",

      highlight:
        formData.get("cameraHighlight")?.toString() || "",

      description:
        formData.get("cameraDescription")?.toString() || "",

      readyTitle:
        formData.get("cameraReadyTitle")?.toString() || "",

      readyDescription:
        formData
          .get("cameraReadyDescription")
          ?.toString() || "",

      openCameraText:
        formData
          .get("cameraOpenCameraText")
          ?.toString() || "",

      openingCameraText:
        formData
          .get("cameraOpeningCameraText")
          ?.toString() || "",

      cameraGuideText:
        formData
          .get("cameraGuideText")
          ?.toString() || "",

      tipOne:
        formData.get("cameraTipOne")?.toString() || "",

      tipTwo:
        formData.get("cameraTipTwo")?.toString() || "",

      tipThree:
        formData.get("cameraTipThree")?.toString() || "",

      analyzeButtonText:
        formData
          .get("cameraAnalyzeButtonText")
          ?.toString() || "",

      analyzingButtonText:
        formData
          .get("cameraAnalyzingButtonText")
          ?.toString() || "",

      closeCameraText:
        formData
          .get("cameraCloseCameraText")
          ?.toString() || "",

      privacyText:
        formData.get("cameraPrivacyText")?.toString() || "",

      // CAMERA ERRORS
      accessError:
        formData
          .get("cameraAccessError")
          ?.toString() || "",

      notReadyError:
        formData
          .get("cameraNotReadyError")
          ?.toString() || "",

      analysisError:
        formData
          .get("cameraAnalysisError")
          ?.toString() || "",

      sampleError:
        formData
          .get("cameraSampleError")
          ?.toString() || "",
    },

    questionnaire: {
      eyebrow:
        formData
          .get("questionnaireEyebrow")
          ?.toString() || "",

      titleBefore:
        formData
          .get("questionnaireTitleBefore")
          ?.toString() || "",

      highlight:
        formData
          .get("questionnaireHighlight")
          ?.toString() || "",

      description:
        formData
          .get("questionnaireDescription")
          ?.toString() || "",

      cameraEstimateLabel:
        formData
          .get("questionnaireCameraEstimateLabel")
          ?.toString() || "",

      questionOne:
        formData
          .get("questionnaireQuestionOne")
          ?.toString() || "",

      questionOneOptionOne:
        formData
          .get("questionnaireQuestionOneOptionOne")
          ?.toString() || "",

      questionOneOptionTwo:
        formData
          .get("questionnaireQuestionOneOptionTwo")
          ?.toString() || "",

      questionOneOptionThree:
        formData
          .get("questionnaireQuestionOneOptionThree")
          ?.toString() || "",

      questionTwo:
        formData
          .get("questionnaireQuestionTwo")
          ?.toString() || "",

      questionTwoOptionOne:
        formData
          .get("questionnaireQuestionTwoOptionOne")
          ?.toString() || "",

      questionTwoOptionTwo:
        formData
          .get("questionnaireQuestionTwoOptionTwo")
          ?.toString() || "",

      questionTwoOptionThree:
        formData
          .get("questionnaireQuestionTwoOptionThree")
          ?.toString() || "",

      questionThree:
        formData
          .get("questionnaireQuestionThree")
          ?.toString() || "",

      questionThreeOptionOne:
        formData
          .get("questionnaireQuestionThreeOptionOne")
          ?.toString() || "",

      questionThreeOptionTwo:
        formData
          .get("questionnaireQuestionThreeOptionTwo")
          ?.toString() || "",

      questionThreeOptionThree:
        formData
          .get("questionnaireQuestionThreeOptionThree")
          ?.toString() || "",

      retakeText:
        formData
          .get("questionnaireRetakeText")
          ?.toString() || "",

      resultsButtonText:
        formData
          .get("questionnaireResultsButtonText")
          ?.toString() || "",

      disclaimer:
        formData
          .get("questionnaireDisclaimer")
          ?.toString() || "",
    },

    results: {
      eyebrow:
        formData.get("resultsEyebrow")?.toString() || "",

      titleBefore:
        formData.get("resultsTitleBefore")?.toString() || "",

      highlight:
        formData.get("resultsHighlight")?.toString() || "",

      description:
        formData.get("resultsDescription")?.toString() || "",

      skinToneLabel:
        formData
          .get("resultsSkinToneLabel")
          ?.toString() || "",

      qualityLabel:
        formData
          .get("resultsQualityLabel")
          ?.toString() || "",

      // UNDERTONE DISPLAY LABELS
      coolLabel:
        formData
          .get("resultsCoolLabel")
          ?.toString() || "",

      neutralCoolLabel:
        formData
          .get("resultsNeutralCoolLabel")
          ?.toString() || "",

      neutralLabel:
        formData
          .get("resultsNeutralLabel")
          ?.toString() || "",

      neutralWarmLabel:
        formData
          .get("resultsNeutralWarmLabel")
          ?.toString() || "",

      warmLabel:
        formData
          .get("resultsWarmLabel")
          ?.toString() || "",

      // RESULT MESSAGES
      warmMessage:
        formData
          .get("resultsWarmMessage")
          ?.toString() || "",

      neutralWarmMessage:
        formData
          .get("resultsNeutralWarmMessage")
          ?.toString() || "",

      neutralMessage:
        formData
          .get("resultsNeutralMessage")
          ?.toString() || "",

      neutralCoolMessage:
        formData
          .get("resultsNeutralCoolMessage")
          ?.toString() || "",

      coolMessage:
        formData
          .get("resultsCoolMessage")
          ?.toString() || "",

      bestColorsEyebrow:
        formData
          .get("resultsBestColorsEyebrow")
          ?.toString() || "",

      bestColorsTitleBefore:
        formData
          .get("resultsBestColorsTitleBefore")
          ?.toString() || "",

      bestColorsHighlight:
        formData
          .get("resultsBestColorsHighlight")
          ?.toString() || "",

      // BEST COLOR LISTS
      bestColorsWarm:
        formData
          .get("resultsBestColorsWarm")
          ?.toString() || "",

      bestColorsNeutralWarm:
        formData
          .get("resultsBestColorsNeutralWarm")
          ?.toString() || "",

      bestColorsNeutral:
        formData
          .get("resultsBestColorsNeutral")
          ?.toString() || "",

      bestColorsNeutralCool:
        formData
          .get("resultsBestColorsNeutralCool")
          ?.toString() || "",

      bestColorsCool:
        formData
          .get("resultsBestColorsCool")
          ?.toString() || "",

      categoriesEyebrow:
        formData
          .get("resultsCategoriesEyebrow")
          ?.toString() || "",

      categoriesTitleBefore:
        formData
          .get("resultsCategoriesTitleBefore")
          ?.toString() || "",

      categoriesHighlight:
        formData
          .get("resultsCategoriesHighlight")
          ?.toString() || "",

      categoriesDescription:
        formData
          .get("resultsCategoriesDescription")
          ?.toString() || "",

      categoryButtonText:
        formData
          .get("resultsCategoryButtonText")
          ?.toString() || "",

      // BEAUTY CATEGORY LABELS
      foundationLabel:
        formData
          .get("resultsFoundationLabel")
          ?.toString() || "",

      blushLabel:
        formData
          .get("resultsBlushLabel")
          ?.toString() || "",

      lipstickLabel:
        formData
          .get("resultsLipstickLabel")
          ?.toString() || "",

      bronzerLabel:
        formData
          .get("resultsBronzerLabel")
          ?.toString() || "",

      loadingEyebrow:
        formData
          .get("resultsLoadingEyebrow")
          ?.toString() || "",

      loadingText:
        formData
          .get("resultsLoadingText")
          ?.toString() || "",

      productsEyebrow:
        formData
          .get("resultsProductsEyebrow")
          ?.toString() || "",

      productsTitleBefore:
        formData
          .get("resultsProductsTitleBefore")
          ?.toString() || "",

      productsHighlight:
        formData
          .get("resultsProductsHighlight")
          ?.toString() || "",

      productsDescription:
        formData
          .get("resultsProductsDescription")
          ?.toString() || "",

      tryAgainText:
        formData
          .get("resultsTryAgainText")
          ?.toString() || "",

      explorePicksText:
        formData
          .get("resultsExplorePicksText")
          ?.toString() || "",

      finalDisclaimer:
        formData
          .get("resultsFinalDisclaimer")
          ?.toString() || "",
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert(
      {
        page: "undertone",
        section: "analyze",
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

  revalidatePath("/undertone/analyze");
  revalidatePath(
    "/admin/content/undertone/analyze",
  );

  redirect(
    "/admin/content/undertone/analyze",
  );
}