"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/app/data/products";

type AnalysisResult = {
  tone: string;
  undertone: string;
  confidence: number;
  color: string;
  message: string;
};

export default function UndertoneAnalyzePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function startCamera() {
    try {
      setCameraError("");
      setResult(null);
      setIsStarting(true);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
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

  function rgbToHex(r: number, g: number, b: number) {
    return (
      "#" +
      [r, g, b]
        .map((value) =>
          Math.round(value).toString(16).padStart(2, "0")
        )
        .join("")
    );
  }

  function analyzeSkin() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.videoWidth === 0) {
      setCameraError("Camera is not ready yet. Please try again.");
      return;
    }

    setIsAnalyzing(true);
    setCameraError("");

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      setCameraError("We couldn't analyze the image. Please try again.");
      setIsAnalyzing(false);
      return;
    }

    /*
      We only need a smaller temporary image for color analysis.
      This keeps processing fast, especially on mobile.
    */
    const width = 400;
    const height = Math.round(
      (video.videoHeight / video.videoWidth) * width
    );

    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    /*
      Approximate sampling regions.

      These correspond roughly to:
      - forehead
      - left cheek
      - right cheek

      We intentionally avoid the eyes, lips and hair as much as possible.
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
      const x = Math.floor(width * region.x);
      const y = Math.floor(height * region.y);
      const regionWidth = Math.floor(width * region.width);
      const regionHeight = Math.floor(height * region.height);

      const imageData = context.getImageData(
        x,
        y,
        regionWidth,
        regionHeight
      );

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness =
          0.299 * r +
          0.587 * g +
          0.114 * b;

        /*
          Remove pixels that are likely:
          - very dark shadows / hair
          - very bright reflections
        */
        if (brightness < 45 || brightness > 245) {
          continue;
        }

        /*
          Very broad skin-color candidate filter.

          This is intentionally permissive so it works across
          a wide range of skin tones.
        */
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        if (max - min < 8) {
          continue;
        }

        colors.push({ r, g, b });
      }
    });

    if (colors.length < 50) {
      setCameraError(
        "We couldn't get a clear skin sample. Try facing a window with soft natural light and keep your face centered."
      );
      setIsAnalyzing(false);
      return;
    }

    /*
      Average the selected skin pixels.
    */
    const average = colors.reduce(
      (total, color) => {
        total.r += color.r;
        total.g += color.g;
        total.b += color.b;
        return total;
      },
      { r: 0, g: 0, b: 0 }
    );

    const r = average.r / colors.length;
    const g = average.g / colors.length;
    const b = average.b / colors.length;

    const brightness =
      0.299 * r +
      0.587 * g +
      0.114 * b;

    /*
      SKIN TONE

      This is an estimate based primarily on luminance.
      We'll improve calibration later.
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
      UNDERTONE

      First-pass warm/cool estimate.

      Red vs blue and green balance gives us a basic
      temperature indication.

      This will later be combined with our questionnaire.
    */
    const warmth = r - b;
    const redGreenBalance = r - g;

    let undertone = "Neutral";

    if (warmth > 45 && redGreenBalance > 12) {
      undertone = "Warm";
    } else if (warmth > 30 && redGreenBalance > 7) {
      undertone = "Neutral-Warm";
    } else if (warmth < 15) {
      undertone = "Cool";
    } else if (warmth < 25) {
      undertone = "Neutral-Cool";
    }

    /*
      Basic confidence calculation.

      For now it uses sample quantity and reasonable
      brightness. We'll make this smarter later.
    */
    let confidence = 72;

    if (colors.length > 500) {
      confidence += 8;
    }

    if (brightness > 80 && brightness < 220) {
      confidence += 7;
    }

    confidence = Math.min(confidence, 90);

    const sampledColor = rgbToHex(r, g, b);

    setTimeout(() => {
      setResult({
        tone,
        undertone,
        confidence,
        color: sampledColor,
        message: getResultMessage(undertone),
      });

      setIsAnalyzing(false);

      /*
        We no longer need the captured pixels.
        Clear the temporary canvas immediately.
      */
      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }, 650);
  }

  function getResultMessage(undertone: string) {
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

  function tryAgain() {
    setResult(null);
    setCameraError("");
  }

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
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

        {!result ? (
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
                Position your face inside the guide and use soft natural
                daylight for the best result.
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
                      Ready when you are.
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-stone-300">
                      Your browser will ask for permission to use your front
                      camera.
                    </p>

                    <button
                      type="button"
                      onClick={startCamera}
                      disabled={isStarting}
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
                    stream ? "block" : "hidden"
                  }`}
                />

                {stream && (
                  <>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-[72%] w-[68%] rounded-[48%] border border-white/80 shadow-[0_0_0_999px_rgba(0,0,0,0.18)] sm:h-[78%] sm:w-[48%]" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-center text-white">
                      <p className="text-xs">
                        Keep your face centered and look directly at the
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
                  onClick={analyzeSkin}
                  disabled={isAnalyzing}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b76f70] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAnalyzing
                    ? "Analyzing..."
                    : "Analyze My Skin →"}
                </button>

                <button
                  type="button"
                  onClick={stopCamera}
                  disabled={isAnalyzing}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-700 transition hover:border-stone-500 disabled:opacity-50"
                >
                  Close Camera
                </button>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-lg text-center text-[11px] leading-5 text-stone-400">
              Analysis happens temporarily in your browser. Your image is not
              uploaded or stored.
            </p>
          </>
        ) : (
          <ResultView
            result={result}
            onTryAgain={tryAgain}
          />
        )}
      </div>
    </main>
  );
}

function ResultView({
  result,
  onTryAgain,
}: {
  result: AnalysisResult;
  onTryAgain: () => void;
}) {

const recommendedProducts = products.filter((product) => {
  const toneMatch =
    product.skinTones?.includes(result.tone) ?? false;

  const undertoneMatch =
    product.undertones?.includes(result.undertone) ?? false;

  return toneMatch && undertoneMatch;
});

  return (
    <section className="py-12 sm:py-16">
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
          Your Skin Analysis
        </p>

        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          Meet your{" "}
          <span className="italic text-[#c78f86]">
            undertone.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
          This is an estimate based on your camera image and current lighting.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-[30px] border border-stone-200 bg-white">
        <div className="bg-[#f5e9e4] px-6 py-10 text-center sm:px-10">
          <div
            className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-sm"
            style={{
              backgroundColor: result.color,
            }}
          />

          <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Estimated skin tone
          </p>

          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
            {result.tone}
          </h2>

          <div className="mx-auto my-6 h-px max-w-xs bg-stone-300" />

          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Estimated undertone
          </p>

          <p className="mt-2 font-serif text-3xl italic text-[#b76f70] sm:text-4xl">
            {result.undertone}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-center text-sm leading-7 text-stone-600">
            {result.message}
          </p>

          <div className="mt-7 rounded-[20px] bg-[#fffaf7] p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500">
                Analysis confidence
              </p>

              <p className="font-serif text-xl">
                {result.confidence}%
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
        </div>
      </div>

      {recommendedProducts.length > 0 && (
  <section className="mt-12">
    <div className="text-center">
      <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
        Selected for your result
      </p>

      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
        Recommended{" "}
        <span className="italic text-[#c78f86]">
          for you.
        </span>
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
        Beauty picks that may complement your estimated skin tone and
        undertone.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
      {recommendedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

    <p className="mt-4 text-center text-[10px] leading-5 text-stone-400">
      Product and shade recommendations are estimates. Always check the
      brand&apos;s shade guide when selecting a specific shade.
    </p>
  </section>
)}

      <p className="mx-auto mt-6 max-w-lg text-center text-[11px] leading-5 text-stone-400">
        Skin tone and undertone results are estimates and can be affected by
        lighting, camera settings, makeup and surrounding colors.
      </p>
    </section>
  );
}