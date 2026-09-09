import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

const fallbackAbout = {
  image: "/images/Lizzy.png",
  imageAlt: "Lizzy Trevisan",

  badgeEyebrow: "Beauty Advisor",
  badgeText: "Curated by Lizzy ♡",

  eyebrow: "Hi, I'm",
  name: "Lizzy Trevisan",
  nameAccent: "♡",

  paragraphOne:
    "I work with beauty every day and love helping people discover products that fit their skin, style and routine.",

  paragraphTwo:
    "The Lizzy Edit is where I share skincare, makeup and self-care finds I genuinely think are worth knowing about — from everyday essentials to products worth the splurge.",

  cardOneIcon: "♡",
  cardOneTitle: "Personal",
  cardOneText:
    "Recommendations made with real routines in mind.",

  cardTwoIcon: "✧",
  cardTwoTitle: "Curated",
  cardTwoText:
    "Beauty finds selected with a Beauty Advisor's eye.",

  cardThreeIcon: "◇",
  cardThreeTitle: "Simple",
  cardThreeText:
    "Less overwhelm and more products that make sense.",

  buttonText: "Discover My Favorites →",
  buttonLink: "/picks",
};

export default async function AboutLizzy() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "home")
    .eq("section", "about")
    .maybeSingle();

  if (error) {
    console.error("HOME ABOUT LOAD ERROR:", error);
  }

  const savedAbout = data?.content ?? {};

  const about = {
    ...fallbackAbout,
    ...savedAbout,
  };

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Lizzy photo */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-[36px] bg-[#ead7cf] shadow-lg lg:mx-0">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 right-2 rounded-[24px] border border-white/70 bg-white/90 px-5 py-4 shadow-lg backdrop-blur-md sm:right-6 lg:-right-5">
            <p className="text-[9px] uppercase tracking-[0.24em] text-stone-500">
              {about.badgeEyebrow}
            </p>

            <p className="mt-1 font-serif text-xl">
              {about.badgeText}
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
            {about.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
            {about.name}
            <span className="ml-2 italic text-[#c78f86]">
              {about.nameAccent}
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
            {about.paragraphOne}
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            {about.paragraphTwo}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {/* CARD 1 */}
            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">
                {about.cardOneIcon}
              </span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                {about.cardOneTitle}
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                {about.cardOneText}
              </p>
            </div>

            {/* CARD 2 */}
            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">
                {about.cardTwoIcon}
              </span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                {about.cardTwoTitle}
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                {about.cardTwoText}
              </p>
            </div>

            {/* CARD 3 */}
            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">
                {about.cardThreeIcon}
              </span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                {about.cardThreeTitle}
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                {about.cardThreeText}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href={about.buttonLink}
              className="inline-flex min-h-12 items-center justify-center bg-black px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
            >
              {about.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}