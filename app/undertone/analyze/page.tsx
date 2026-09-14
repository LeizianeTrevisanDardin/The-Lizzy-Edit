"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import ProductCard, {
  type Product,
} from "@/components/ProductCard";

import { createClient } from "@/lib/supabase/client";

type AnalysisResult = {
  tone: string;
  undertone: string;
  confidence: number;
  color: string;
  message: string;
};

type QuestionnaireAnswers = {
  jewelry: string;
  sun: string;
  colors: string;
};

type CameraContent = {
  backText: string;
  brand: string;
  eyebrow: string;
  titleBefore: string;
  highlight: string;
  description: string;
  readyTitle: string;
  readyDescription: string;
  openCameraText: string;
  openingCameraText: string;
  cameraGuideText: string;
  tipOne: string;
  tipTwo: string;
  tipThree: string;
  analyzeButtonText: string;
  analyzingButtonText: string;
  closeCameraText: string;
  privacyText: string;

  accessError: string;
  notReadyError: string;
  analysisError: string;
  sampleError: string;
};

type QuestionnaireContent = {
  eyebrow: string;
  titleBefore: string;
  highlight: string;
  description: string;
  cameraEstimateLabel: string;

  questionOne: string;
  questionOneOptionOne: string;
  questionOneOptionTwo: string;
  questionOneOptionThree: string;

  questionTwo: string;
  questionTwoOptionOne: string;
  questionTwoOptionTwo: string;
  questionTwoOptionThree: string;

  questionThree: string;
  questionThreeOptionOne: string;
  questionThreeOptionTwo: string;
  questionThreeOptionThree: string;

  retakeText: string;
  resultsButtonText: string;
  disclaimer: string;
};

type ResultsContent = {
  eyebrow: string;
  titleBefore: string;
  highlight: string;
  description: string;

  skinToneLabel: string;
  qualityLabel: string;

  coolLabel: string;
  neutralCoolLabel: string;
  neutralLabel: string;
  neutralWarmLabel: string;
  warmLabel: string;

  warmMessage: string;
  neutralWarmMessage: string;
  neutralMessage: string;
  neutralCoolMessage: string;
  coolMessage: string;

  bestColorsEyebrow: string;
  bestColorsTitleBefore: string;
  bestColorsHighlight: string;

  bestColorsWarm: string;
  bestColorsNeutralWarm: string;
  bestColorsNeutral: string;
  bestColorsNeutralCool: string;
  bestColorsCool: string;

  categoriesEyebrow: string;
  categoriesTitleBefore: string;
  categoriesHighlight: string;
  categoriesDescription: string;
  categoryButtonText: string;

  foundationLabel: string;
  blushLabel: string;
  lipstickLabel: string;
  bronzerLabel: string;

  loadingEyebrow: string;
  loadingText: string;

  productsEyebrow: string;
  productsTitleBefore: string;
  productsHighlight: string;
  productsDescription: string;

  tryAgainText: string;
  explorePicksText: string;
  finalDisclaimer: string;
};

type AnalyzeContent = {
  camera: CameraContent;
  questionnaire: QuestionnaireContent;
  results: ResultsContent;
};

type ProductCardContent = {
  shopButtonText: string;
  viewButtonText: string;
  viewAriaLabel: string;
};

const emptyAnswers: QuestionnaireAnswers = {
  jewelry: "",
  sun: "",
  colors: "",
};

const fallbackContent: AnalyzeContent = {
  camera: {
    backText: "← Back",
    brand: "The Lizzy Edit",
    eyebrow: "Skin Analysis",
    titleBefore: "Let's find your",
    highlight: "undertone.",
    description:
      "Position your face inside the guide and use soft natural daylight for the best result.",
    readyTitle: "Ready when you are.",
    readyDescription:
      "Your browser will ask for permission to use your front camera.",
    openCameraText: "Open Camera",
    openingCameraText: "Opening Camera...",
    cameraGuideText:
      "Keep your face centered and look directly at the camera.",
    tipOne: "Natural daylight",
    tipTwo: "No beauty filters",
    tipThree: "Minimal makeup",
    analyzeButtonText: "Analyze My Skin →",
    analyzingButtonText: "Analyzing...",
    closeCameraText: "Close Camera",
    privacyText:
      "Analysis happens temporarily in your browser. Your image is not uploaded or stored.",
    accessError:
      "We couldn't access your camera. Please allow camera access in your browser settings.",

    notReadyError:
      "Camera is not ready yet. Please try again.",

    analysisError:
      "We couldn't analyze the image. Please try again.",

    sampleError:
      "We couldn't get a clear skin sample. Try facing a window with soft natural light and keep your face centered.",
      },

  questionnaire: {
    eyebrow: "Quick Undertone Check",
    titleBefore: "Just a few",
    highlight: "quick questions.",
    description:
      "Your answers help refine the estimate from your camera analysis.",
    cameraEstimateLabel: "Camera estimate",

    questionOne:
      "Which jewelry tends to look best on you?",
    questionOneOptionOne: "Gold",
    questionOneOptionTwo: "Silver",
    questionOneOptionThree: "Both",

    questionTwo:
      "What usually happens when you're in the sun?",
    questionTwoOptionOne: "I tan easily",
    questionTwoOptionTwo: "I burn easily",
    questionTwoOptionThree:
      "A little of both",

    questionThree:
      "Which colors usually make you feel your best?",
    questionThreeOptionOne:
      "Cream, camel & warm browns",
    questionThreeOptionTwo:
      "White, grey & cool tones",
    questionThreeOptionThree:
      "Both seem to work",

    retakeText: "Retake Photo",
    resultsButtonText: "See My Results →",
    disclaimer:
      "These questions are used only to refine your undertone estimate.",
  },

  results: {
    eyebrow: "Your Result",
    titleBefore: "Your beauty",
    highlight: "profile.",
    description:
      "Based on your camera analysis and your quick undertone check.",

    skinToneLabel:
      "Estimated Skin Tone",
    qualityLabel:
      "Analysis Quality",
    coolLabel: "Cool",
    neutralCoolLabel: "Neutral Cool",
    neutralLabel: "Neutral",
    neutralWarmLabel: "Neutral Warm",
    warmLabel: "Warm",

    warmMessage:
      "Your skin appears to lean warm, with golden or peachy characteristics.",

    neutralWarmMessage:
      "Your skin appears balanced with a subtle golden warmth.",

    neutralMessage:
      "Your skin appears to have a balanced mix of warm and cool characteristics.",

    neutralCoolMessage:
      "Your skin appears balanced with a subtle cool or rosy quality.",

    coolMessage:
      "Your skin appears to lean cool, with pink, rosy or bluish characteristics.",

    bestColorsEyebrow:
      "Your Best Colors",
    bestColorsTitleBefore:
      "Shades that may",
    bestColorsHighlight:
      "flatter you.",

    bestColorsWarm:
        "Peach, Coral, Camel, Bronze, Terracotta, Warm Red",

    bestColorsNeutralWarm:
        "Peach, Warm Rose, Coral, Caramel, Bronze, Terracotta",

    bestColorsNeutral:
        "Rose Beige, Soft Peach, Taupe, Mauve, Cocoa, Champagne",

    bestColorsNeutralCool:
        "Dusty Rose, Mauve, Berry, Cool Taupe, Plum, Soft Pink",

    bestColorsCool:
        "Cool Pink, Berry, Blue Red, Plum, Silver, Mauve",
        
    categoriesEyebrow:
      "Beauty Categories",
    categoriesTitleBefore:
      "Recommended",
    categoriesHighlight:
      "for you.",
    categoriesDescription:
      "These are great places to start when choosing colors for your undertone.",
    categoryButtonText:
      "Explore →",
    foundationLabel: "Foundation",
    blushLabel: "Blush",
    lipstickLabel: "Lipstick",
    bronzerLabel: "Bronzer",

    loadingEyebrow:
      "Lizzy's Picks",
    loadingText:
      "Finding your product matches...",

    productsEyebrow:
      "Lizzy's Picks",
    productsTitleBefore:
      "Products selected",
    productsHighlight:
      "for your result.",
    productsDescription:
      "Beauty picks that may complement your estimated skin tone and undertone.",

    tryAgainText:
      "Try Again",
    explorePicksText:
      "Explore Beauty Picks →",

    finalDisclaimer:
      "Skin tone, undertone, color and product recommendations are estimates and can be affected by lighting, camera settings, makeup and surrounding colors. Always check the brand's shade guide when selecting a specific shade.",
  },
};

const fallbackProductCardContent: ProductCardContent = {
  shopButtonText: "Shop This Product →",
  viewButtonText: "View Product →",
  viewAriaLabel: "View",
};


export default function UndertoneAnalyzePage() {
  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null,
    );

  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [content, setContent] =
    useState<AnalyzeContent>(
      fallbackContent,
    );

  const [products, setProducts] =
    useState<Product[]>([]);

  const [
    productCardContent,
    setProductCardContent,
  ] = useState<ProductCardContent>(
    fallbackProductCardContent,
  );

  const [
    productsLoading,
    setProductsLoading,
  ] = useState(true);

  const [stream, setStream] =
    useState<MediaStream | null>(
      null,
    );

  const [
    cameraError,
    setCameraError,
  ] = useState("");

  const [
    isStarting,
    setIsStarting,
  ] = useState(false);

  const [
    isAnalyzing,
    setIsAnalyzing,
  ] = useState(false);

  const [
    cameraResult,
    setCameraResult,
  ] =
    useState<AnalysisResult | null>(
      null,
    );

  const [
    finalResult,
    setFinalResult,
  ] =
    useState<AnalysisResult | null>(
      null,
    );

  const [answers, setAnswers] =
    useState<QuestionnaireAnswers>(
      emptyAnswers,
    );

  const camera =
    content.camera;

  const questionnaire =
    content.questionnaire;

  const results =
    content.results;

  // =================================
  // CAMERA
  // =================================

  async function startCamera() {
    try {
      setCameraError("");
      setCameraResult(null);
      setFinalResult(null);
      setAnswers(emptyAnswers);
      setIsStarting(true);

      const mediaStream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              facingMode: "user",
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 1280,
              },
            },
            audio: false,
          },
        );

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject =
          mediaStream;
      }
    } catch {
      setCameraError(camera.accessError);
    } finally {
      setIsStarting(false);
    }
  }

  function stopCamera() {
    stream
      ?.getTracks()
      .forEach((track) =>
        track.stop(),
      );

    setStream(null);

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }
  }

  function rgbToHex(
    r: number,
    g: number,
    b: number,
  ) {
    return (
      "#" +
      [r, g, b]
        .map((value) =>
          Math.round(value)
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    );
  }

  // =================================
  // SKIN ANALYSIS
  // =================================

  function analyzeSkin() {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (
      !video ||
      !canvas ||
      video.videoWidth === 0
    ) {
        setCameraError(camera.notReadyError);
      return;
    }

    setIsAnalyzing(true);
    setCameraError("");

    const context =
      canvas.getContext("2d", {
        willReadFrequently: true,
      });

    if (!context) {
      setCameraError(camera.analysisError);

      setIsAnalyzing(false);

      return;
    }

    /*
      Smaller temporary image
      for analysis.

      Nothing is uploaded
      or stored.
    */

    const width = 400;

    const height = Math.round(
      (video.videoHeight /
        video.videoWidth) *
        width,
    );

    canvas.width = width;
    canvas.height = height;

    context.drawImage(
      video,
      0,
      0,
      width,
      height,
    );

    /*
      Approximate sampling regions:

      forehead
      left cheek
      right cheek
    */

    const regions = [
      {
        x: 0.43,
        y: 0.24,
        width: 0.14,
        height: 0.08,
      },

      {
        x: 0.29,
        y: 0.47,
        width: 0.12,
        height: 0.1,
      },

      {
        x: 0.59,
        y: 0.47,
        width: 0.12,
        height: 0.1,
      },
    ];

    const colors: {
      r: number;
      g: number;
      b: number;
    }[] = [];

    regions.forEach(
      (region) => {
        const x = Math.floor(
          width * region.x,
        );

        const y = Math.floor(
          height * region.y,
        );

        const regionWidth =
          Math.floor(
            width *
              region.width,
          );

        const regionHeight =
          Math.floor(
            height *
              region.height,
          );

        const imageData =
          context.getImageData(
            x,
            y,
            regionWidth,
            regionHeight,
          );

        const data =
          imageData.data;

        for (
          let i = 0;
          i < data.length;
          i += 16
        ) {
          const r = data[i];
          const g =
            data[i + 1];
          const b =
            data[i + 2];

          const brightness =
            0.299 * r +
            0.587 * g +
            0.114 * b;

          if (
            brightness < 45 ||
            brightness > 245
          ) {
            continue;
          }

          const max = Math.max(
            r,
            g,
            b,
          );

          const min = Math.min(
            r,
            g,
            b,
          );

          if (
            max - min <
            8
          ) {
            continue;
          }

          colors.push({
            r,
            g,
            b,
          });
        }
      },
    );

    if (
      colors.length < 50
    ) {
      setCameraError(camera.sampleError);

      setIsAnalyzing(false);

      return;
    }

    const average =
      colors.reduce(
        (
          total,
          color,
        ) => {
          total.r +=
            color.r;

          total.g +=
            color.g;

          total.b +=
            color.b;

          return total;
        },
        {
          r: 0,
          g: 0,
          b: 0,
        },
      );

    const r =
      average.r /
      colors.length;

    const g =
      average.g /
      colors.length;

    const b =
      average.b /
      colors.length;

    const brightness =
      0.299 * r +
      0.587 * g +
      0.114 * b;

    // =================================
    // SKIN TONE
    // =================================

    let tone = "Medium";

    if (brightness >= 205) {
      tone = "Fair";
    } else if (
      brightness >= 180
    ) {
      tone = "Light";
    } else if (
      brightness >= 155
    ) {
      tone =
        "Light-Medium";
    } else if (
      brightness >= 125
    ) {
      tone = "Medium";
    } else if (
      brightness >= 90
    ) {
      tone =
        "Medium-Deep";
    } else {
      tone = "Deep";
    }

    // =================================
    // CAMERA UNDERTONE
    // =================================

    const warmth =
      r - b;

    const redGreenBalance =
      r - g;

    let undertone =
      "Neutral";

    if (
      warmth > 45 &&
      redGreenBalance > 12
    ) {
      undertone =
        "Warm";
    } else if (
      warmth > 30 &&
      redGreenBalance > 7
    ) {
      undertone =
        "Neutral-Warm";
    } else if (
      warmth < 15
    ) {
      undertone =
        "Cool";
    } else if (
      warmth < 25
    ) {
      undertone =
        "Neutral-Cool";
    }

    // =================================
    // CONFIDENCE
    // =================================

    let confidence = 72;

    if (
      colors.length > 500
    ) {
      confidence += 8;
    }

    if (
      brightness > 80 &&
      brightness < 220
    ) {
      confidence += 7;
    }

    confidence = Math.min(
      confidence,
      90,
    );

    const sampledColor =
      rgbToHex(
        r,
        g,
        b,
      );

    setTimeout(() => {
      setCameraResult({
        tone,
        undertone,
        confidence,
        color:
          sampledColor,
        message:
          getResultMessage(
            undertone,
          ),
      });

      setIsAnalyzing(false);

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      stopCamera();
    }, 650);
  }

 function getResultMessage(
  undertone: string,
) {
  switch (undertone) {
    case "Warm":
      return results.warmMessage;

    case "Neutral-Warm":
      return results.neutralWarmMessage;

    case "Cool":
      return results.coolMessage;

    case "Neutral-Cool":
      return results.neutralCoolMessage;

    default:
      return results.neutralMessage;
  }
}

  // =================================
  // QUESTIONNAIRE LOGIC
  // =================================

  function refineUndertone(
    cameraUndertone: string,
    questionnaireAnswers:
      QuestionnaireAnswers,
  ) {
    const cameraScores: Record<
      string,
      number
    > = {
      Cool: -2,
      "Neutral-Cool": -1,
      Neutral: 0,
      "Neutral-Warm": 1,
      Warm: 2,
    };

    let score =
      cameraScores[
        cameraUndertone
      ] ?? 0;

    /*
      IMPORTANT:

      These internal values
      are intentionally NOT
      editable in the CMS.

      Only their visible labels
      are editable.
    */

    if (
      questionnaireAnswers.jewelry ===
      "Gold"
    ) {
      score += 1;
    }

    if (
      questionnaireAnswers.jewelry ===
      "Silver"
    ) {
      score -= 1;
    }

    if (
      questionnaireAnswers.sun ===
      "Tan"
    ) {
      score += 1;
    }

    if (
      questionnaireAnswers.sun ===
      "Burn"
    ) {
      score -= 1;
    }

    if (
      questionnaireAnswers.colors ===
      "Warm"
    ) {
      score += 1;
    }

    if (
      questionnaireAnswers.colors ===
      "Cool"
    ) {
      score -= 1;
    }

    if (score >= 2) {
      return "Warm";
    }

    if (
      score >= 0.75
    ) {
      return "Neutral-Warm";
    }

    if (
      score <= -2
    ) {
      return "Cool";
    }

    if (
      score <= -0.75
    ) {
      return "Neutral-Cool";
    }

    return "Neutral";
  }

  function finishQuestionnaire() {
    if (!cameraResult) {
      return;
    }

    const finalUndertone =
      refineUndertone(
        cameraResult.undertone,
        answers,
      );

    setFinalResult({
      ...cameraResult,
      undertone:
        finalUndertone,
      message:
        getResultMessage(
          finalUndertone,
        ),
    });
  }

  function tryAgain() {
    stopCamera();

    setCameraResult(null);
    setFinalResult(null);
    setAnswers(
      emptyAnswers,
    );
    setCameraError("");
  }

  const questionnaireComplete =
    answers.jewelry !==
      "" &&
    answers.sun !== "" &&
    answers.colors !== "";

  // =================================
  // LOAD PRODUCTS + CMS
  // =================================

  useEffect(() => {
    async function loadPageData() {
      setProductsLoading(
        true,
      );

      const [
        productsResponse,
        contentResponse,
        productCardResponse,
      ] =
        await Promise.all([
          supabase
            .from(
              "products",
            )
            .select("*")
            .eq(
              "status",
              "published",
            )
            .order(
              "created_at",
              {
                ascending:
                  false,
              },
            ),

          supabase
            .from(
              "site_content",
            )
            .select(
              "content",
            )
            .eq(
              "page",
              "undertone",
            )
            .eq(
              "section",
              "analyze",
            )
            .maybeSingle(),

          supabase
            .from(
              "site_content",
            )
            .select(
              "content",
            )
            .eq(
              "page",
              "global",
            )
            .eq(
              "section",
              "product-card",
            )
            .maybeSingle(),
        ]);

      // PRODUCTS
      if (
        productsResponse.error
      ) {
        console.error(
          "Error loading undertone recommendations:",
          productsResponse.error,
        );

        setProducts([]);
      } else {
        const mappedProducts: Product[] =
          (
            productsResponse.data ??
            []
          ).map(
            (product) => ({
              id:
                product.id,

              slug:
                product.slug,

              brand:
                product.brand,

              name:
                product.name,

              category:
                product.category,

              tags:
                product.tags ??
                [],

              type:
                product.type ??
                "",

              image:
                product.image_url ??
                "",

              description:
                product.description ??
                "",

              whyILikeIt:
                product.why_i_like_it ??
                [],

              affiliateUrl:
                product.affiliate_url ??
                undefined,

              featured:
                product.featured,

              homeTag:
                product.home_tag ??
                undefined,

              skinTones:
                product.skin_tones ??
                [],

              undertones:
                product.undertones ??
                [],

              concerns:
                product.concerns ??
                [],
            }),
          );

        setProducts(
          mappedProducts,
        );
      }

      // CMS
      if (
        contentResponse.error
      ) {
        console.error(
          "Error loading Undertone Analyze content:",
          contentResponse.error,
        );
      } else {
        const saved =
          contentResponse.data
            ?.content ??
          {};

        setContent({
          camera: {
            ...fallbackContent.camera,
            ...(saved.camera ??
              {}),
          },

          questionnaire: {
            ...fallbackContent.questionnaire,
            ...(saved.questionnaire ??
              {}),
          },

          results: {
            ...fallbackContent.results,
            ...(saved.results ??
              {}),
          },
        });
      }

      if (productCardResponse.error) {
        console.error(
          "Error loading global product card content:",
          productCardResponse.error,
        );
      } else {
        setProductCardContent({
          ...fallbackProductCardContent,
          ...(productCardResponse.data?.content ?? {}),
        });
      }

      setProductsLoading(
        false,
      );
    }

    loadPageData();
  }, [supabase]);

  useEffect(() => {
    return () => {
      stream
        ?.getTracks()
        .forEach(
          (track) =>
            track.stop(),
        );
    };
  }, [stream]);

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl">
        {/* TOP */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/undertone"
            className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500 transition hover:text-[#211d1b]"
          >
            {camera.backText}
          </Link>

          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
            {camera.brand}
          </p>
        </div>

        {/* =================================
            CAMERA
        ================================= */}

        {!cameraResult &&
        !finalResult ? (
          <>
            <section className="mt-10 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
                {camera.eyebrow}
              </p>

              <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                {camera.titleBefore}{" "}

                <span className="italic text-[#c78f86]">
                  {camera.highlight}
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
                {camera.description}
              </p>
            </section>

            <section className="mt-8 overflow-hidden rounded-[30px] border border-stone-200 bg-[#211d1b]">
              <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/3]">
                {!stream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl">
                      ◌
                    </div>

                    <p className="mt-5 font-serif text-3xl">
                      {
                        camera.readyTitle
                      }
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-stone-300">
                      {
                        camera.readyDescription
                      }
                    </p>

                    <button
                      type="button"
                      onClick={
                        startCamera
                      }
                      disabled={
                        isStarting
                      }
                      className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.14em] text-[#211d1b] transition hover:bg-[#f5e9e4] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isStarting
                        ? camera.openingCameraText
                        : camera.openCameraText}
                    </button>
                  </div>
                )}

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${
                    stream
                      ? "block"
                      : "hidden"
                  }`}
                />

                {stream && (
                  <>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-[72%] w-[68%] rounded-[48%] border border-white/80 shadow-[0_0_0_999px_rgba(0,0,0,0.18)] sm:h-[78%] sm:w-[48%]" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-center text-white">
                      <p className="text-xs">
                        {
                          camera.cameraGuideText
                        }
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>

            {cameraError && (
              <div className="mt-4 rounded-[20px] border border-[#e4c2bd] bg-[#fff3f0] p-4">
                <p className="text-sm leading-6 text-[#8a4f4a]">
                  {cameraError}
                </p>
              </div>
            )}

            {/* CAMERA TIPS */}
            <section className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                camera.tipOne,
                camera.tipTwo,
                camera.tipThree,
              ].map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={`${index}-${item}`}
                    className="flex min-h-14 items-center gap-3 rounded-[18px] border border-stone-200 bg-white px-4"
                  >
                    <span className="text-[#b77b72]">
                      ✓
                    </span>

                    <p className="text-xs text-stone-600">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </section>

            {stream && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={
                    analyzeSkin
                  }
                  disabled={
                    isAnalyzing
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAnalyzing
                    ? camera.analyzingButtonText
                    : camera.analyzeButtonText}
                </button>

                <button
                  type="button"
                  onClick={
                    stopCamera
                  }
                  disabled={
                    isAnalyzing
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-700 transition hover:border-stone-500 disabled:opacity-50"
                >
                  {
                    camera.closeCameraText
                  }
                </button>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-lg text-center text-[11px] leading-5 text-stone-400">
              {camera.privacyText}
            </p>
          </>
        ) : cameraResult &&
          !finalResult ? (
          <QuestionnaireView
            cameraResult={cameraResult}
            answers={answers}
            setAnswers={setAnswers}
            onFinish={finishQuestionnaire}
            onRetake={tryAgain}
            complete={questionnaireComplete}
            content={questionnaire}
            resultsContent={results}
          />
        ) : finalResult ? (
          <ResultView
            result={
              finalResult
            }
            onTryAgain={
              tryAgain
            }
            products={
              products
            }
            productsLoading={
              productsLoading
            }
            content={
              results
            }
            productCardContent={
              productCardContent
            }
          />
        ) : null}
      </div>
    </main>
  );
}

// =================================
// QUESTIONNAIRE VIEW
// =================================

function QuestionnaireView({
  cameraResult,
  answers,
  setAnswers,
  onFinish,
  onRetake,
  complete,
  content,
  resultsContent,
}: {
  cameraResult: AnalysisResult;

  answers:
    QuestionnaireAnswers;

  setAnswers:
    React.Dispatch<
      React.SetStateAction<QuestionnaireAnswers>
    >;

  onFinish:
    () => void;

  onRetake:
    () => void;

  complete:
    boolean;

  content:
    QuestionnaireContent;

  resultsContent:
    ResultsContent;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
          {content.eyebrow}
        </p>

        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          {content.titleBefore}{" "}

          <span className="italic text-[#c78f86]">
            {
              content.highlight
            }
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
          {
            content.description
          }
        </p>
      </div>

      {/* CAMERA ESTIMATE */}
      <div className="mt-8 rounded-[24px] border border-stone-200 bg-[#f5e9e4] p-5 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">
          {
            content.cameraEstimateLabel
          }
        </p>

        <p className="mt-2 font-serif text-2xl">
          {
            cameraResult.tone
          }

          {" · "}

          <span className="italic text-[#b76f70]">
            {getUndertoneLabel(
              cameraResult.undertone,
              resultsContent,
            )}
          </span>
        </p>
      </div>

      {/* QUESTIONS */}
      <div className="mt-8 space-y-5">
        <QuestionCard
          number="01"
          question={
            content.questionOne
          }
          options={[
            {
              label:
                content.questionOneOptionOne,

              /*
                Do not change these
                internal values.
              */
              value: "Gold",
            },
            {
              label:
                content.questionOneOptionTwo,
              value: "Silver",
            },
            {
              label:
                content.questionOneOptionThree,
              value: "Both",
            },
          ]}
          value={
            answers.jewelry
          }
          onChange={(
            value,
          ) =>
            setAnswers(
              (current) => ({
                ...current,
                jewelry:
                  value,
              }),
            )
          }
        />

        <QuestionCard
          number="02"
          question={
            content.questionTwo
          }
          options={[
            {
              label:
                content.questionTwoOptionOne,
              value: "Tan",
            },
            {
              label:
                content.questionTwoOptionTwo,
              value: "Burn",
            },
            {
              label:
                content.questionTwoOptionThree,
              value: "Both",
            },
          ]}
          value={
            answers.sun
          }
          onChange={(
            value,
          ) =>
            setAnswers(
              (current) => ({
                ...current,
                sun: value,
              }),
            )
          }
        />

        <QuestionCard
          number="03"
          question={
            content.questionThree
          }
          options={[
            {
              label:
                content.questionThreeOptionOne,
              value: "Warm",
            },
            {
              label:
                content.questionThreeOptionTwo,
              value: "Cool",
            },
            {
              label:
                content.questionThreeOptionThree,
              value: "Both",
            },
          ]}
          value={
            answers.colors
          }
          onChange={(
            value,
          ) =>
            setAnswers(
              (current) => ({
                ...current,
                colors: value,
              }),
            )
          }
        />
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-500"
        >
          {content.retakeText}
        </button>

        <button
          type="button"
          onClick={onFinish}
          disabled={!complete}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {
            content.resultsButtonText
          }
        </button>
      </div>

      <p className="mx-auto mt-6 max-w-lg text-center text-[10px] leading-5 text-stone-400">
        {content.disclaimer}
      </p>
    </section>
  );
}

// =================================
// QUESTION CARD
// =================================

function QuestionCard({
  number,
  question,
  options,
  value,
  onChange,
}: {
  number: string;

  question: string;

  options: {
    label: string;
    value: string;
  }[];

  value: string;

  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-5 sm:p-6">
      <div className="flex gap-4">
        <span className="font-serif text-2xl italic text-[#c78f86]">
          {number}
        </span>

        <div className="flex-1">
          <h2 className="font-serif text-xl leading-snug sm:text-2xl">
            {question}
          </h2>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {options.map(
              (option) => {
                const selected =
                  value ===
                  option.value;

                return (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    onClick={() =>
                      onChange(
                        option.value,
                      )
                    }
                    className={`min-h-12 rounded-[16px] border px-4 text-xs transition ${
                      selected
                        ? "border-[#b76f70] bg-[#f5e9e4] text-[#8f5c56] shadow-sm"
                        : "border-stone-200 bg-[#fffaf7] text-stone-600 hover:border-[#d8aaa2]"
                    }`}
                  >
                    {
                      option.label
                    }
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================
// RESULT VIEW
// =================================

function ResultView({
  result,
  onTryAgain,
  products,
  productsLoading,
  content,
  productCardContent,
}: {
  result:
    AnalysisResult;

  onTryAgain:
    () => void;

  products:
    Product[];

  productsLoading:
    boolean;

  content:
    ResultsContent;

  productCardContent:
    ProductCardContent;
}) {
  const recommendedProducts =
    products.filter(
      (product) => {
        const toneMatch =
          product.skinTones?.includes(
            result.tone,
          ) ??
          false;

        const undertoneMatch =
          product.undertones?.includes(
            result.undertone,
          ) ??
          false;

        return (
          toneMatch &&
          undertoneMatch
        );
      },
    );

  const bestColors =
    getBestColors(
      result.undertone,
      content,
    );

  const position =
    getUndertonePosition(
      result.undertone,
    );

  const categories = [
  {
    name: content.foundationLabel,
    filter: "Foundation",
    symbol: "◌",
  },
  {
    name: content.blushLabel,
    filter: "Blush",
    symbol: "♡",
  },
  {
    name: content.lipstickLabel,
    filter: "Lipstick",
    symbol: "✦",
  },
  {
    name: content.bronzerLabel,
    filter: "Bronzer",
    symbol: "☼",
  },
];

  return (
    <section className="py-12 sm:py-16">
      {/* RESULT HEADER */}
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
          {content.eyebrow}
        </p>

        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          {content.titleBefore}{" "}

          <span className="italic text-[#c78f86]">
            {
              content.highlight
            }
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
          {
            content.description
          }
        </p>
      </div>

      {/* RESULT CARD */}
      <div className="mt-10 overflow-hidden rounded-[30px] border border-stone-200 bg-white">
        <div className="bg-[#f5e9e4] px-6 py-10 text-center sm:px-10">
          <div
            className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-sm"
            style={{
              backgroundColor:
                result.color,
            }}
          />

          <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
            {
              content.skinToneLabel
            }
          </p>

          <h2 className="mt-2 font-serif text-4xl uppercase tracking-[0.04em] sm:text-5xl">
            {result.tone}
          </h2>

          <p className="mt-3 font-serif text-3xl italic text-[#b76f70] sm:text-4xl">
            {getUndertoneLabel(
            result.undertone,
            content,
          )}
          </p>

          {/* UNDERTONE SCALE */}
          <div className="mx-auto mt-10 max-w-md">
            <div className="relative pt-6">
              <div className="h-[2px] w-full bg-gradient-to-r from-[#b7bfd7] via-[#d6c5bc] to-[#cf987c]" />

              <div
                className="absolute top-[16px] -translate-x-1/2"
                style={{
                  left: `${position}%`,
                }}
              >
                <div className="h-5 w-5 rounded-full border-4 border-white bg-[#211d1b] shadow-md" />
              </div>
            </div>

            <div className="mt-3 flex justify-between text-[9px] font-medium uppercase tracking-[0.14em] text-stone-500">
              <span>
                {content.coolLabel}
              </span>

              <span>
                {content.neutralLabel}
              </span>

              <span>
                {content.warmLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-center text-sm leading-7 text-stone-600">
            {result.message}
          </p>

          <div className="mt-7 rounded-[20px] bg-[#fffaf7] p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500">
                {
                  content.qualityLabel
                }
              </p>

              <p className="font-serif text-xl">
                {
                  result.confidence
                }
                %
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-[#c78f86] transition-all duration-700"
                style={{
                  width: `${result.confidence}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BEST COLORS */}
      <section className="mt-12">
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {
              content.bestColorsEyebrow
            }
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            {
              content.bestColorsTitleBefore
            }{" "}

            <span className="italic text-[#c78f86]">
              {
                content.bestColorsHighlight
              }
            </span>
          </h2>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {bestColors.map(
            (color) => (
              <div
                key={color}
                className="flex min-h-16 items-center justify-center rounded-[20px] border border-[#eadbd5] bg-[#f7ebe7] px-4 text-center font-serif text-lg"
              >
                {color}
              </div>
            ),
          )}
        </div>
      </section>

      {/* BEAUTY CATEGORIES */}
      <section className="mt-12">
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            {
              content.categoriesEyebrow
            }
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            {
              content.categoriesTitleBefore
            }{" "}

            <span className="italic text-[#c78f86]">
              {
                content.categoriesHighlight
              }
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
            {
              content.categoriesDescription
            }
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map(
            (category) => (
              <Link
                key={
                  category.name
                }
                href={`/picks?filter=${encodeURIComponent(
                  category.filter,
                )}`}
                className="group flex min-h-28 flex-col items-center justify-center rounded-[22px] border border-stone-200 bg-white p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#d8aaa2] hover:shadow-md"
              >
                <span className="text-xl text-[#b77b72]">
                  {
                    category.symbol
                  }
                </span>

                <span className="mt-3 font-serif text-xl">
                  {
                    category.name
                  }
                </span>

                <span className="mt-2 text-[9px] uppercase tracking-[0.14em] text-stone-400 transition group-hover:text-[#b76f70]">
                  {
                    content.categoryButtonText
                  }
                </span>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* PRODUCTS LOADING */}
      {productsLoading && (
        <section className="mt-12">
          <div className="rounded-[24px] border border-stone-200 bg-white p-8 text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              {
                content.loadingEyebrow
              }
            </p>

            <p className="mt-3 font-serif text-2xl">
              {
                content.loadingText
              }
            </p>
          </div>
        </section>
      )}

      {/* RECOMMENDED PRODUCTS */}
      {!productsLoading &&
        recommendedProducts.length >
          0 && (
          <section className="mt-12">
            <div className="text-center">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
                {
                  content.productsEyebrow
                }
              </p>

              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                {
                  content.productsTitleBefore
                }{" "}

                <span className="italic text-[#c78f86]">
                  {
                    content.productsHighlight
                  }
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                {
                  content.productsDescription
                }
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
              {recommendedProducts.map(
                (product) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                    shopButtonText={
                      productCardContent.shopButtonText
                    }
                    viewButtonText={
                      productCardContent.viewButtonText
                    }
                    viewAriaLabel={
                      productCardContent.viewAriaLabel
                    }
                  />
                ),
              )}
            </div>
          </section>
        )}

      {/* RESULT ACTIONS */}
      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={
            onTryAgain
          }
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-500"
        >
          {
            content.tryAgainText
          }
        </button>

        <Link
          href="/picks"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70]"
        >
          {
            content.explorePicksText
          }
        </Link>
      </div>

      <p className="mx-auto mt-7 max-w-lg text-center text-[10px] leading-5 text-stone-400">
        {
          content.finalDisclaimer
        }
      </p>
    </section>
  );
}

function getUndertoneLabel(
  undertone: string,
  content: ResultsContent,
) {
  switch (undertone) {
    case "Cool":
      return content.coolLabel;

    case "Neutral-Cool":
      return content.neutralCoolLabel;

    case "Neutral":
      return content.neutralLabel;

    case "Neutral-Warm":
      return content.neutralWarmLabel;

    case "Warm":
      return content.warmLabel;

    default:
      return undertone.replace("-", " ");
  }
}

// =================================
// UNDERTONE POSITION
// =================================

function getUndertonePosition(
  undertone: string,
) {
  switch (undertone) {
    case "Cool":
      return 4;

    case "Neutral-Cool":
      return 25;

    case "Neutral":
      return 50;

    case "Neutral-Warm":
      return 75;

    case "Warm":
      return 96;

    default:
      return 50;
  }
}

// =================================
// BEST COLORS
// =================================

function getBestColors(
  undertone: string,
  content: ResultsContent,
) {
  let colors = content.bestColorsNeutral;

  switch (undertone) {
    case "Warm":
      colors =
        content.bestColorsWarm;
      break;

    case "Neutral-Warm":
      colors =
        content.bestColorsNeutralWarm;
      break;

    case "Neutral-Cool":
      colors =
        content.bestColorsNeutralCool;
      break;

    case "Cool":
      colors =
        content.bestColorsCool;
      break;

    default:
      colors =
        content.bestColorsNeutral;
  }

  return colors
    .split(",")
    .map((color) => color.trim())
    .filter(Boolean);
}