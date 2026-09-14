import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { updateUndertoneAnalyzePage } from "./actions";

export default async function AdminUndertoneAnalyzePage() {
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

  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "undertone")
    .eq("section", "analyze")
    .maybeSingle();

  const content = data?.content ?? {};

  const camera = content.camera ?? {};
  const questionnaire = content.questionnaire ?? {};
  const results = content.results ?? {};

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin/content/undertone"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Find Your Undertone
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Beauty Tool
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Analysis Tool
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
            Edit the text shown during the camera analysis,
            undertone questionnaire and results experience.
          </p>

          <div className="mt-6">
            <Link
              href="/undertone/analyze"
              target="_blank"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              View Analysis Tool ↗
            </Link>
          </div>
        </div>

        <form
          action={updateUndertoneAnalyzePage}
          className="mt-8 space-y-8"
        >
          {/* CAMERA */}
          <Section
            title="Camera"
            description="Text shown before and during the camera analysis."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Back Text"
                name="cameraBackText"
                value={camera.backText}
              />

              <Field
                label="Brand"
                name="cameraBrand"
                value={camera.brand}
              />

              <Field
                label="Eyebrow"
                name="cameraEyebrow"
                value={camera.eyebrow}
              />

              <Field
                label="Title Before"
                name="cameraTitleBefore"
                value={camera.titleBefore}
              />

              <Field
                label="Highlight"
                name="cameraHighlight"
                value={camera.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="cameraDescription"
                  value={camera.description}
                />
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Camera Start
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Ready Title"
                  name="cameraReadyTitle"
                  value={camera.readyTitle}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Ready Description"
                    name="cameraReadyDescription"
                    value={camera.readyDescription}
                  />
                </div>

                <Field
                  label="Open Camera Button"
                  name="cameraOpenCameraText"
                  value={camera.openCameraText}
                />

                <Field
                  label="Opening Camera Text"
                  name="cameraOpeningCameraText"
                  value={camera.openingCameraText}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Camera Guide Text"
                    name="cameraGuideText"
                    value={camera.cameraGuideText}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Camera Tips
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                <Field
                  label="Tip 1"
                  name="cameraTipOne"
                  value={camera.tipOne}
                />

                <Field
                  label="Tip 2"
                  name="cameraTipTwo"
                  value={camera.tipTwo}
                />

                <Field
                  label="Tip 3"
                  name="cameraTipThree"
                  value={camera.tipThree}
                />
              </div>
            </div>

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Camera Actions
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Analyze Button"
                  name="cameraAnalyzeButtonText"
                  value={camera.analyzeButtonText}
                />

                <Field
                  label="Analyzing Text"
                  name="cameraAnalyzingButtonText"
                  value={camera.analyzingButtonText}
                />

                <Field
                  label="Close Camera Button"
                  name="cameraCloseCameraText"
                  value={camera.closeCameraText}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Privacy Text"
                    name="cameraPrivacyText"
                    value={camera.privacyText}
                  />
                </div>
              </div>
            </div>

            {/* CAMERA ERRORS */}
              <div className="mt-8 border-t border-stone-200 pt-8">
                <h3 className="font-serif text-2xl">
                  Camera Errors
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Messages shown when the camera or skin analysis cannot continue.
                </p>

                <div className="mt-5 grid gap-6">
                  <Textarea
                    label="Camera Access Error"
                    name="cameraAccessError"
                    value={camera.accessError}
                  />

                  <Textarea
                    label="Camera Not Ready Error"
                    name="cameraNotReadyError"
                    value={camera.notReadyError}
                  />

                  <Textarea
                    label="Image Analysis Error"
                    name="cameraAnalysisError"
                    value={camera.analysisError}
                  />

                  <Textarea
                    label="Skin Sample Error"
                    name="cameraSampleError"
                    value={camera.sampleError}
                  />
                </div>
              </div>
          </Section>

          {/* QUESTIONNAIRE */}
          <Section
            title="Questionnaire"
            description="Text and answer labels shown after the camera estimate."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="questionnaireEyebrow"
                value={questionnaire.eyebrow}
              />

              <Field
                label="Title Before"
                name="questionnaireTitleBefore"
                value={questionnaire.titleBefore}
              />

              <Field
                label="Highlight"
                name="questionnaireHighlight"
                value={questionnaire.highlight}
              />

              <Field
                label="Camera Estimate Label"
                name="questionnaireCameraEstimateLabel"
                value={questionnaire.cameraEstimateLabel}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="questionnaireDescription"
                  value={questionnaire.description}
                />
              </div>
            </div>

            {/* QUESTION 1 */}
            <QuestionSection
              number="1"
              questionName="questionnaireQuestionOne"
              questionValue={questionnaire.questionOne}
              optionOneName="questionnaireQuestionOneOptionOne"
              optionOneValue={questionnaire.questionOneOptionOne}
              optionTwoName="questionnaireQuestionOneOptionTwo"
              optionTwoValue={questionnaire.questionOneOptionTwo}
              optionThreeName="questionnaireQuestionOneOptionThree"
              optionThreeValue={questionnaire.questionOneOptionThree}
            />

            {/* QUESTION 2 */}
            <QuestionSection
              number="2"
              questionName="questionnaireQuestionTwo"
              questionValue={questionnaire.questionTwo}
              optionOneName="questionnaireQuestionTwoOptionOne"
              optionOneValue={questionnaire.questionTwoOptionOne}
              optionTwoName="questionnaireQuestionTwoOptionTwo"
              optionTwoValue={questionnaire.questionTwoOptionTwo}
              optionThreeName="questionnaireQuestionTwoOptionThree"
              optionThreeValue={questionnaire.questionTwoOptionThree}
            />

            {/* QUESTION 3 */}
            <QuestionSection
              number="3"
              questionName="questionnaireQuestionThree"
              questionValue={questionnaire.questionThree}
              optionOneName="questionnaireQuestionThreeOptionOne"
              optionOneValue={questionnaire.questionThreeOptionOne}
              optionTwoName="questionnaireQuestionThreeOptionTwo"
              optionTwoValue={questionnaire.questionThreeOptionTwo}
              optionThreeName="questionnaireQuestionThreeOptionThree"
              optionThreeValue={questionnaire.questionThreeOptionThree}
            />

            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Questionnaire Actions
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Retake Button"
                  name="questionnaireRetakeText"
                  value={questionnaire.retakeText}
                />

                <Field
                  label="Results Button"
                  name="questionnaireResultsButtonText"
                  value={questionnaire.resultsButtonText}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Disclaimer"
                    name="questionnaireDisclaimer"
                    value={questionnaire.disclaimer}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* RESULTS */}
          <Section
            title="Results"
            description="Headings, recommendations and disclaimers displayed after analysis."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                name="resultsEyebrow"
                value={results.eyebrow}
              />

              <Field
                label="Title Before"
                name="resultsTitleBefore"
                value={results.titleBefore}
              />

              <Field
                label="Highlight"
                name="resultsHighlight"
                value={results.highlight}
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="resultsDescription"
                  value={results.description}
                />
              </div>

              <Field
                label="Skin Tone Label"
                name="resultsSkinToneLabel"
                value={results.skinToneLabel}
              />

              <Field
                label="Quality Label"
                name="resultsQualityLabel"
                value={results.qualityLabel}
              />
            </div>

            {/* UNDERTONE LABELS */}
              <div className="sm:col-span-2 mt-4 border-t border-stone-200 pt-8">
                <h3 className="font-serif text-2xl">
                  Undertone Labels
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Change how each undertone name is displayed without changing the analysis logic.
                </p>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Cool"
                    name="resultsCoolLabel"
                    value={results.coolLabel}
                  />

                  <Field
                    label="Neutral Cool"
                    name="resultsNeutralCoolLabel"
                    value={results.neutralCoolLabel}
                  />

                  <Field
                    label="Neutral"
                    name="resultsNeutralLabel"
                    value={results.neutralLabel}
                  />

                  <Field
                    label="Neutral Warm"
                    name="resultsNeutralWarmLabel"
                    value={results.neutralWarmLabel}
                  />

                  <Field
                    label="Warm"
                    name="resultsWarmLabel"
                    value={results.warmLabel}
                  />
                </div>
              </div>

              {/* RESULT MESSAGES */}
              <div className="sm:col-span-2 mt-4 border-t border-stone-200 pt-8">
                <h3 className="font-serif text-2xl">
                  Undertone Result Messages
                </h3>

                <div className="mt-5 grid gap-6">
                  <Textarea
                    label="Warm Message"
                    name="resultsWarmMessage"
                    value={results.warmMessage}
                  />

                  <Textarea
                    label="Neutral Warm Message"
                    name="resultsNeutralWarmMessage"
                    value={results.neutralWarmMessage}
                  />

                  <Textarea
                    label="Neutral Message"
                    name="resultsNeutralMessage"
                    value={results.neutralMessage}
                  />

                  <Textarea
                    label="Neutral Cool Message"
                    name="resultsNeutralCoolMessage"
                    value={results.neutralCoolMessage}
                  />

                  <Textarea
                    label="Cool Message"
                    name="resultsCoolMessage"
                    value={results.coolMessage}
                  />
                </div>
              </div>

            {/* BEST COLORS */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Best Colors
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Eyebrow"
                  name="resultsBestColorsEyebrow"
                  value={results.bestColorsEyebrow}
                />

                <Field
                  label="Title Before"
                  name="resultsBestColorsTitleBefore"
                  value={results.bestColorsTitleBefore}
                />

                <Field
                  label="Highlight"
                  name="resultsBestColorsHighlight"
                  value={results.bestColorsHighlight}
                />

                <div className="sm:col-span-2 mt-4 border-t border-stone-200 pt-8">
                  <h4 className="font-serif text-xl">
                    Color Lists
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Separate each color with a comma.
                  </p>

                  <div className="mt-5 grid gap-6">
                    <Textarea
                      label="Warm Colors"
                      name="resultsBestColorsWarm"
                      value={results.bestColorsWarm}
                    />

                    <Textarea
                      label="Neutral Warm Colors"
                      name="resultsBestColorsNeutralWarm"
                      value={results.bestColorsNeutralWarm}
                    />

                    <Textarea
                      label="Neutral Colors"
                      name="resultsBestColorsNeutral"
                      value={results.bestColorsNeutral}
                    />

                    <Textarea
                      label="Neutral Cool Colors"
                      name="resultsBestColorsNeutralCool"
                      value={results.bestColorsNeutralCool}
                    />

                    <Textarea
                      label="Cool Colors"
                      name="resultsBestColorsCool"
                      value={results.bestColorsCool}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* BEAUTY CATEGORIES */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Beauty Categories
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Eyebrow"
                  name="resultsCategoriesEyebrow"
                  value={results.categoriesEyebrow}
                />

                <Field
                  label="Title Before"
                  name="resultsCategoriesTitleBefore"
                  value={results.categoriesTitleBefore}
                />

                <Field
                  label="Highlight"
                  name="resultsCategoriesHighlight"
                  value={results.categoriesHighlight}
                />

                <Field
                  label="Explore Button"
                  name="resultsCategoryButtonText"
                  value={results.categoryButtonText}
                />

                <div className="sm:col-span-2 mt-4 border-t border-stone-200 pt-8">
                  <h4 className="font-serif text-xl">
                    Category Names
                  </h4>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field
                      label="Foundation"
                      name="resultsFoundationLabel"
                      value={results.foundationLabel}
                    />

                    <Field
                      label="Blush"
                      name="resultsBlushLabel"
                      value={results.blushLabel}
                    />

                    <Field
                      label="Lipstick"
                      name="resultsLipstickLabel"
                      value={results.lipstickLabel}
                    />

                    <Field
                      label="Bronzer"
                      name="resultsBronzerLabel"
                      value={results.bronzerLabel}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Description"
                    name="resultsCategoriesDescription"
                    value={results.categoriesDescription}
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT PICKS */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Product Recommendations
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Loading Eyebrow"
                  name="resultsLoadingEyebrow"
                  value={results.loadingEyebrow}
                />

                <Field
                  label="Loading Text"
                  name="resultsLoadingText"
                  value={results.loadingText}
                />

                <Field
                  label="Products Eyebrow"
                  name="resultsProductsEyebrow"
                  value={results.productsEyebrow}
                />

                <Field
                  label="Products Title Before"
                  name="resultsProductsTitleBefore"
                  value={results.productsTitleBefore}
                />

                <Field
                  label="Products Highlight"
                  name="resultsProductsHighlight"
                  value={results.productsHighlight}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Products Description"
                    name="resultsProductsDescription"
                    value={results.productsDescription}
                  />
                </div>
              </div>
            </div>

            {/* RESULT ACTIONS */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <h3 className="font-serif text-2xl">
                Result Actions
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <Field
                  label="Try Again Button"
                  name="resultsTryAgainText"
                  value={results.tryAgainText}
                />

                <Field
                  label="Explore Picks Button"
                  name="resultsExplorePicksText"
                  value={results.explorePicksText}
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Final Disclaimer"
                    name="resultsFinalDisclaimer"
                    value={results.finalDisclaimer}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* SAVE */}
          <div className="sticky bottom-5 z-20 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#211d1b] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#b77b72]"
            >
              Save Analysis Tool
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Section({
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
      <div className="border-b border-stone-200 pb-5">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
          Section
        </p>

        <h2 className="mt-2 font-serif text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value?: string;
};

function Field({
  label,
  name,
  value,
}: FieldProps) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
        {label}
      </label>

      <input
        name={name}
        defaultValue={value ?? ""}
        className="mt-2 w-full rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}

type TextareaProps = {
  label: string;
  name: string;
  value?: string;
};

function Textarea({
  label,
  name,
  value,
}: TextareaProps) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
        {label}
      </label>

      <textarea
        name={name}
        defaultValue={value ?? ""}
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-[#b77b72]"
      />
    </div>
  );
}

type QuestionSectionProps = {
  number: string;

  questionName: string;
  questionValue?: string;

  optionOneName: string;
  optionOneValue?: string;

  optionTwoName: string;
  optionTwoValue?: string;

  optionThreeName: string;
  optionThreeValue?: string;
};

function QuestionSection({
  number,
  questionName,
  questionValue,
  optionOneName,
  optionOneValue,
  optionTwoName,
  optionTwoValue,
  optionThreeName,
  optionThreeValue,
}: QuestionSectionProps) {
  return (
    <div className="mt-8 border-t border-stone-200 pt-8">
      <h3 className="font-serif text-2xl">
        Question {number}
      </h3>

      <div className="mt-5 grid gap-6">
        <Field
          label="Question"
          name={questionName}
          value={questionValue}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <Field
            label="Option 1"
            name={optionOneName}
            value={optionOneValue}
          />

          <Field
            label="Option 2"
            name={optionTwoName}
            value={optionTwoValue}
          />

          <Field
            label="Option 3"
            name={optionThreeName}
            value={optionThreeValue}
          />
        </div>
      </div>
    </div>
  );
}