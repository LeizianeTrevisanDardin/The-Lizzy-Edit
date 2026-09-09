import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

const fallbackFooter = {
  brandTitle: "LIZZY",
  brandSubtitle: "The Beauty Edit",
  brandDescription:
    "Skincare, makeup and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",

  exploreTitle: "Explore",

  skincareText: "Skincare",
  skincareLink: "/skincare",

  makeupText: "Makeup",
  makeupLink: "/makeup",

  selfCareText: "Self-Care",
  selfCareLink: "/self-care",

  picksText: "Lizzy's Picks",
  picksLink: "/picks",

  aboutSectionTitle: "The Lizzy Edit",

  aboutText: "About Lizzy",
  aboutLink: "/about",

  beautyGuideText: "Beauty Guide",
  beautyGuideLink: "/beauty-guide",

  privacyText: "Privacy Policy",
  privacyLink: "/privacy",

  disclosureText: "Affiliate Disclosure",
  disclosureLink: "/disclosure",

  followTitle: "Follow The Edit",
  followDescription:
    "Beauty tips, new finds and Lizzy's latest recommendations.",

  instagramText: "IG",
  instagramLink: "#",

  tiktokText: "TT",
  tiktokLink: "#",

  affiliateText:
    "As an Amazon Associate, I earn from qualifying purchases.",

  copyrightText:
    "The Lizzy Edit by Lizzy Trevisan.",

  bottomText:
    "Beauty curated with intention ♡",
};

export default async function Footer() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "global")
    .eq("section", "footer")
    .maybeSingle();

  if (error) {
    console.error(
      "FOOTER CONTENT LOAD ERROR:",
      error,
    );
  }

  const footer = {
    ...fallbackFooter,
    ...(data?.content ?? {}),
  };

  return (
    <footer className="bg-[#211d1b] text-stone-300">
      {/* TOP FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16">
        {/* BRAND */}
        <div>
          <h2 className="font-serif text-3xl tracking-[0.12em] text-white">
            {footer.brandTitle}
          </h2>

          <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-stone-500">
            {footer.brandSubtitle}
          </p>

          <p className="mt-5 max-w-xs text-sm leading-6 text-stone-400">
            {footer.brandDescription}
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {footer.exploreTitle}
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm text-stone-400">
            <Link
              href={footer.skincareLink}
              className="transition hover:text-white"
            >
              {footer.skincareText}
            </Link>

            <Link
              href={footer.makeupLink}
              className="transition hover:text-white"
            >
              {footer.makeupText}
            </Link>

            <Link
              href={footer.selfCareLink}
              className="transition hover:text-white"
            >
              {footer.selfCareText}
            </Link>

            <Link
              href={footer.picksLink}
              className="transition hover:text-white"
            >
              {footer.picksText}
            </Link>
          </div>
        </div>

        {/* THE LIZZY EDIT */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {footer.aboutSectionTitle}
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm text-stone-400">
            <Link
              href={footer.aboutLink}
              className="transition hover:text-white"
            >
              {footer.aboutText}
            </Link>

            <Link
              href={footer.beautyGuideLink}
              className="transition hover:text-white"
            >
              {footer.beautyGuideText}
            </Link>

            <Link
              href={footer.privacyLink}
              className="transition hover:text-white"
            >
              {footer.privacyText}
            </Link>

            <Link
              href={footer.disclosureLink}
              className="transition hover:text-white"
            >
              {footer.disclosureText}
            </Link>
          </div>
        </div>

        {/* FOLLOW */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {footer.followTitle}
          </p>

          <p className="mt-5 text-sm leading-6 text-stone-400">
            {footer.followDescription}
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href={footer.instagramLink}
              aria-label="Instagram"
              target={
                footer.instagramLink.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                footer.instagramLink.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              {footer.instagramText}
            </a>

            <a
              href={footer.tiktokLink}
              aria-label="TikTok"
              target={
                footer.tiktokLink.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                footer.tiktokLink.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              {footer.tiktokText}
            </a>
          </div>
        </div>
      </div>

      {/* AFFILIATE */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs leading-5 text-stone-500 sm:px-6 lg:px-8">
          <p>{footer.affiliateText}</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[10px] text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()}{" "}
            {footer.copyrightText}
          </p>

          <p>
            {footer.bottomText}
          </p>
        </div>
      </div>
    </footer>
  );
}