"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import ProductCard, { type Product } from "@/components/ProductCard";
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

const emptyAnswers: QuestionnaireAnswers = {
  jewelry: "",
  sun: "",
  colors: "",
};

export default function UndertoneAnalyzePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [cameraResult, setCameraResult] =
    useState<AnalysisResult | null>(null);

  const [finalResult, setFinalResult] =
    useState<AnalysisResult | null>(null);

  const [answers, setAnswers] =
    useState<QuestionnaireAnswers>(emptyAnswers);

  async function startCamera() {
    try {
      setCameraError("");
      setCameraResult(null);
      setFinalResult(null);
      setAnswers(emptyAnswers);
      setIsStarting(true);

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setCameraError(
        "We couldn't access your camera. Please allow camera access in your browser settings."
      );
    } finally {
      setIsStarting(false);
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function rgbToHex(
    r: number,
    g: number,
    b: number
  ) {
    return (
      "#" +
      [r, g, b]
        .map((value) =>
          Math.round(value)
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
    );
  }

  function analyzeSkin() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (
      !video ||
      !canvas ||
      video.videoWidth === 0
    ) {
      setCameraError(
        "Camera is not ready yet. Please try again."
      );
      return;
    }

    setIsAnalyzing(true);
    setCameraError("");

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      setCameraError(
        "We couldn't analyze the image. Please try again."
      );
      setIsAnalyzing(false);
      return;
    }

    /*
      Smaller temporary image for analysis.
      Nothing is uploaded or stored.
    */
    const width = 400;

    const height = Math.round(
      (video.videoHeight / video.videoWidth) *
        width
    );

    canvas.width = width;
    canvas.height = height;

    context.drawImage(
      video,
      0,
      0,
      width,
      height
    );

    /*
      Approximate sampling regions:
      forehead + both cheeks.
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

    regions.forEach((region) => {
      const x = Math.floor(
        width * region.x
      );

      const y = Math.floor(
        height * region.y
      );

      const regionWidth = Math.floor(
        width * region.width
      );

      const regionHeight = Math.floor(
        height * region.height
      );

      const imageData =
        context.getImageData(
          x,
          y,
          regionWidth,
          regionHeight
        );

      const data = imageData.data;

      for (
        let i = 0;
        i < data.length;
        i += 16
      ) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness =
          0.299 * r +
          0.587 * g +
          0.114 * b;

        /*
          Ignore very dark shadows,
          hair and very bright reflections.
        */
        if (
          brightness < 45 ||
          brightness > 245
        ) {
          continue;
        }

        const max = Math.max(
          r,
          g,
          b
        );

        const min = Math.min(
          r,
          g,
          b
        );

        if (max - min < 8) {
          continue;
        }

        colors.push({
          r,
          g,
          b,
        });
      }
    });

    if (colors.length < 50) {
      setCameraError(
        "We couldn't get a clear skin sample. Try facing a window with soft natural light and keep your face centered."
      );

      setIsAnalyzing(false);
      return;
    }

    const average = colors.reduce(
      (total, color) => {
        total.r += color.r;
        total.g += color.g;
        total.b += color.b;

        return total;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    const r =
      average.r / colors.length;

    const g =
      average.g / colors.length;

    const b =
      average.b / colors.length;

    const brightness =
      0.299 * r +
      0.587 * g +
      0.114 * b;

    /*
      SKIN TONE
    */
    let tone = "Medium";

    if (brightness >= 205) {
      tone = "Fair";
    } else if (brightness >= 180) {
      tone = "Light";
    } else if (brightness >= 155) {
      tone = "Light-Medium";
    } else if (brightness >= 125) {
      tone = "Medium";
    } else if (brightness >= 90) {
      tone = "Medium-Deep";
    } else {
      tone = "Deep";
    }

    /*
      CAMERA UNDERTONE ESTIMATE
    */
    const warmth = r - b;
    const redGreenBalance = r - g;

    let undertone = "Neutral";

    if (
      warmth > 45 &&
      redGreenBalance > 12
    ) {
      undertone = "Warm";
    } else if (
      warmth > 30 &&
      redGreenBalance > 7
    ) {
      undertone = "Neutral-Warm";
    } else if (warmth < 15) {
      undertone = "Cool";
    } else if (warmth < 25) {
      undertone = "Neutral-Cool";
    }

    /*
      Analysis quality estimate.
    */
    let confidence = 72;

    if (colors.length > 500) {
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
      90
    );

    const sampledColor =
      rgbToHex(r, g, b);

    setTimeout(() => {
      setCameraResult({
        tone,
        undertone,
        confidence,
        color: sampledColor,
        message:
          getResultMessage(
            undertone
          ),
      });

      setIsAnalyzing(false);

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      stopCamera();
    }, 650);
  }

  function getResultMessage(
    undertone: string
  ) {
    switch (undertone) {
      case "Warm":
        return "Your skin appears to lean warm, with golden or peachy characteristics.";

      case "Neutral-Warm":
        return "Your skin appears balanced with a subtle golden warmth.";

      case "Cool":
        return "Your skin appears to lean cool, with pink, rosy or bluish characteristics.";

      case "Neutral-Cool":
        return "Your skin appears balanced with a subtle cool or rosy quality.";

      default:
        return "Your skin appears to have a balanced mix of warm and cool characteristics.";
    }
  }

  function refineUndertone(
    cameraUndertone: string,
    questionnaire:
      QuestionnaireAnswers
  ) {
    /*
      Camera score:
      Cool          -2
      Neutral-Cool  -1
      Neutral        0
      Neutral-Warm   1
      Warm           2
    */
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
      Jewelry
    */
    if (
      questionnaire.jewelry ===
      "Gold"
    ) {
      score += 1;
    }

    if (
      questionnaire.jewelry ===
      "Silver"
    ) {
      score -= 1;
    }

    /*
      Sun response
    */
    if (
      questionnaire.sun ===
      "Tan"
    ) {
      score += 1;
    }

    if (
      questionnaire.sun ===
      "Burn"
    ) {
      score -= 1;
    }

    /*
      Clothing / flattering colors
    */
    if (
      questionnaire.colors ===
      "Warm"
    ) {
      score += 1;
    }

    if (
      questionnaire.colors ===
      "Cool"
    ) {
      score -= 1;
    }

    if (score >= 2) {
      return "Warm";
    }

    if (score >= 0.75) {
      return "Neutral-Warm";
    }

    if (score <= -2) {
      return "Cool";
    }

    if (score <= -0.75) {
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
        answers
      );

    setFinalResult({
      ...cameraResult,
      undertone: finalUndertone,
      message:
        getResultMessage(
          finalUndertone
        ),
    });
  }

  function tryAgain() {
    stopCamera();

    setCameraResult(null);
    setFinalResult(null);
    setAnswers(emptyAnswers);
    setCameraError("");
  }

  const questionnaireComplete =
    answers.jewelry !== "" &&
    answers.sun !== "" &&
    answers.colors !== "";

  useEffect(() => {
  async function loadProducts() {
    setProductsLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error loading undertone recommendations:",
        error
      );

      setProducts([]);
      setProductsLoading(false);
      return;
    }

    const mappedProducts: Product[] = (data ?? []).map(
      (product) => ({
        id: product.id,
        slug: product.slug,
        brand: product.brand,
        name: product.name,
        category: product.category,
        tags: product.tags ?? [],
        type: product.type ?? "",
        image: product.image_url ?? "",
        description: product.description ?? "",
        whyILikeIt: product.why_i_like_it ?? [],
        affiliateUrl: product.affiliate_url ?? undefined,
        featured: product.featured,
        homeTag: product.home_tag ?? undefined,
        skinTones: product.skin_tones ?? [],
        undertones: product.undertones ?? [],
        concerns: product.concerns ?? [],
      })
    );

    setProducts(mappedProducts);
    setProductsLoading(false);
  }

  loadProducts();
}, [supabase]);

  useEffect(() => {
    return () => {
      stream
        ?.getTracks()
        .forEach((track) =>
          track.stop()
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
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/undertone"
            className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500 transition hover:text-[#211d1b]"
          >
            ← Back
          </Link>

          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
            The Lizzy Edit
          </p>
        </div>

        {!cameraResult &&
        !finalResult ? (
          <>
            <section className="mt-10 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
                Skin Analysis
              </p>

              <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Let&apos;s find your{" "}
                <span className="italic text-[#c78f86]">
                  undertone.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-500 sm:text-base">
                Position your face
                inside the guide and
                use soft natural
                daylight for the best
                result.
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
                      Ready when you
                      are.
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-stone-300">
                      Your browser will
                      ask for permission
                      to use your front
                      camera.
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
                        ? "Opening Camera..."
                        : "Open Camera"}
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
                        Keep your face
                        centered and look
                        directly at the
                        camera.
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

            <section className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Natural daylight",
                "No beauty filters",
                "Minimal makeup",
              ].map((item) => (
                <div
                  key={item}
                  className="flex min-h-14 items-center gap-3 rounded-[18px] border border-stone-200 bg-white px-4"
                >
                  <span className="text-[#b77b72]">
                    ✓
                  </span>

                  <p className="text-xs text-stone-600">
                    {item}
                  </p>
                </div>
              ))}
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
                    ? "Analyzing..."
                    : "Analyze My Skin →"}
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
                  Close Camera
                </button>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-lg text-center text-[11px] leading-5 text-stone-400">
              Analysis happens
              temporarily in your
              browser. Your image is
              not uploaded or stored.
            </p>
          </>
        ) : cameraResult &&
          !finalResult ? (
          <QuestionnaireView
            cameraResult={
              cameraResult
            }
            answers={answers}
            setAnswers={
              setAnswers
            }
            onFinish={
              finishQuestionnaire
            }
            onRetake={
              tryAgain
            }
            complete={
              questionnaireComplete
            }
          />
        ) : finalResult ? (
          <ResultView
            result={finalResult}
            onTryAgain={tryAgain}
            products={products}
            productsLoading={productsLoading}
          />
        ) : null}
      </div>
    </main>
  );
}

function QuestionnaireView({
  cameraResult,
  answers,
  setAnswers,
  onFinish,
  onRetake,
  complete,
}: {
  cameraResult: AnalysisResult;
  answers: QuestionnaireAnswers;
  setAnswers: React.Dispatch<
    React.SetStateAction<QuestionnaireAnswers>
  >;
  onFinish: () => void;
  onRetake: () => void;
  complete: boolean;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
          Quick Undertone Check
        </p>

        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Just a few{" "}
          <span className="italic text-[#c78f86]">
            quick questions.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
          Your answers help refine
          the estimate from your
          camera analysis.
        </p>
      </div>

      <div className="mt-8 rounded-[24px] border border-stone-200 bg-[#f5e9e4] p-5 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">
          Camera estimate
        </p>

        <p className="mt-2 font-serif text-2xl">
          {cameraResult.tone}
          {" · "}
          <span className="italic text-[#b76f70]">
            {
              cameraResult.undertone
            }
          </span>
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <QuestionCard
          number="01"
          question="Which jewelry tends to look best on you?"
          options={[
            {
              label: "Gold",
              value: "Gold",
            },
            {
              label: "Silver",
              value: "Silver",
            },
            {
              label: "Both",
              value: "Both",
            },
          ]}
          value={
            answers.jewelry
          }
          onChange={(value) =>
            setAnswers(
              (current) => ({
                ...current,
                jewelry: value,
              })
            )
          }
        />

        <QuestionCard
          number="02"
          question="What usually happens when you're in the sun?"
          options={[
            {
              label:
                "I tan easily",
              value: "Tan",
            },
            {
              label:
                "I burn easily",
              value: "Burn",
            },
            {
              label:
                "A little of both",
              value: "Both",
            },
          ]}
          value={answers.sun}
          onChange={(value) =>
            setAnswers(
              (current) => ({
                ...current,
                sun: value,
              })
            )
          }
        />

        <QuestionCard
          number="03"
          question="Which colors usually make you feel your best?"
          options={[
            {
              label:
                "Cream, camel & warm browns",
              value: "Warm",
            },
            {
              label:
                "White, grey & cool tones",
              value: "Cool",
            },
            {
              label:
                "Both seem to work",
              value: "Both",
            },
          ]}
          value={
            answers.colors
          }
          onChange={(value) =>
            setAnswers(
              (current) => ({
                ...current,
                colors: value,
              })
            )
          }
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-500"
        >
          Retake Photo
        </button>

        <button
          type="button"
          onClick={onFinish}
          disabled={!complete}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70] disabled:cursor-not-allowed disabled:opacity-40"
        >
          See My Results →
        </button>
      </div>

      <p className="mx-auto mt-6 max-w-lg text-center text-[10px] leading-5 text-stone-400">
        These questions are used
        only to refine your
        undertone estimate.
      </p>
    </section>
  );
}

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
    value: string
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
                        option.value
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
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  function ResultView({
    result,
    onTryAgain,
    products,
    productsLoading,
  }: {
    result: AnalysisResult;
    onTryAgain: () => void;
    products: Product[];
    productsLoading: boolean;
  }) {
  const recommendedProducts =
    products.filter(
      (product) => {
        const toneMatch =
          product.skinTones?.includes(
            result.tone
          ) ?? false;

        const undertoneMatch =
          product.undertones?.includes(
            result.undertone
          ) ?? false;

        return (
          toneMatch &&
          undertoneMatch
        );
      }
    );

  const bestColors =
    getBestColors(
      result.undertone
    );

  const position =
    getUndertonePosition(
      result.undertone
    );

  return (
    <section className="py-12 sm:py-16">
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
          Your Result
        </p>

        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          Your beauty{" "}
          <span className="italic text-[#c78f86]">
            profile.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
          Based on your camera
          analysis and your quick
          undertone check.
        </p>
      </div>

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
            Estimated Skin Tone
          </p>

          <h2 className="mt-2 font-serif text-4xl uppercase tracking-[0.04em] sm:text-5xl">
            {result.tone}
          </h2>

          <p className="mt-3 font-serif text-3xl italic text-[#b76f70] sm:text-4xl">
            {formatUndertone(
              result.undertone
            )}
          </p>

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
              <span>Cool</span>
              <span>Neutral</span>
              <span>Warm</span>
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
                Analysis Quality
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

      <section className="mt-12">
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Your Best Colors
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Shades that may{" "}
            <span className="italic text-[#c78f86]">
              flatter you.
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
            )
          )}
        </div>
      </section>

      <section className="mt-12">
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Beauty Categories
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Recommended{" "}
            <span className="italic text-[#c78f86]">
              for you.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
            These are great places
            to start when choosing
            colors for your
            undertone.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              name: "Foundation",
              symbol: "◌",
            },
            {
              name: "Blush",
              symbol: "♡",
            },
            {
              name: "Lipstick",
              symbol: "✦",
            },
            {
              name: "Bronzer",
              symbol: "☼",
            },
          ].map((category) => (
            <Link
              key={
                category.name
              }
              href={`/picks?filter=${encodeURIComponent(
                category.name
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
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {productsLoading && (
          <section className="mt-12">
            <div className="rounded-[24px] border border-stone-200 bg-white p-8 text-center">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
                Lizzy&apos;s Picks
              </p>

              <p className="mt-3 font-serif text-2xl">
                Finding your product matches...
              </p>
            </div>
          </section>
        )}

      {!productsLoading &&
        recommendedProducts.length > 0 && (
        <section className="mt-12">
          <div className="text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              Lizzy&apos;s Picks
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Products selected{" "}
              <span className="italic text-[#c78f86]">
                for your result.
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Beauty picks that may
              complement your
              estimated skin tone and
              undertone.
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
                />
              )
            )}
          </div>
        </section>
      )}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onTryAgain}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-500"
        >
          Try Again
        </button>

        <Link
          href="/picks"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70]"
        >
          Explore Beauty Picks →
        </Link>
      </div>

      <p className="mx-auto mt-7 max-w-lg text-center text-[10px] leading-5 text-stone-400">
        Skin tone, undertone, color
        and product recommendations
        are estimates and can be
        affected by lighting, camera
        settings, makeup and
        surrounding colors. Always
        check the brand&apos;s shade
        guide when selecting a
        specific shade.
      </p>
    </section>
  );
}

function getUndertonePosition(
  undertone: string
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

function formatUndertone(
  undertone: string
) {
  return undertone.replace(
    "-",
    " "
  );
}

function getBestColors(
  undertone: string
) {
  switch (undertone) {
    case "Warm":
      return [
        "Peach",
        "Coral",
        "Camel",
        "Bronze",
        "Terracotta",
        "Warm Red",
      ];

    case "Neutral-Warm":
      return [
        "Peach",
        "Warm Rose",
        "Coral",
        "Caramel",
        "Bronze",
        "Terracotta",
      ];

    case "Neutral-Cool":
      return [
        "Dusty Rose",
        "Mauve",
        "Berry",
        "Cool Taupe",
        "Plum",
        "Soft Pink",
      ];

    case "Cool":
      return [
        "Cool Pink",
        "Berry",
        "Blue Red",
        "Plum",
        "Silver",
        "Mauve",
      ];

    default:
      return [
        "Rose Beige",
        "Soft Peach",
        "Taupe",
        "Mauve",
        "Cocoa",
        "Champagne",
      ];
  }
}