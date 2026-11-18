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

  fragrancesText: "Fragrances",
  fragrancesLink: "/fragrances",

  picksText: "Lizzy's Picks",
  picksLink: "/picks",

  aboutSectionTitle: "The Lizzy Edit",

  aboutText: "About Lizzy",
  aboutLink: "/about",

  beautyGuideText: "Beauty Guide",
  beautyGuideLink: "/beauty-guide",

  journalText: "Journal",
  journalLink: "/journal",

  privacyText: "Privacy Policy",
  privacyLink: "/privacy",

  disclosureText: "Affiliate Disclosure",
  disclosureLink: "/disclosure",

  followTitle: "Follow The Edit",
  followDescription:
    "Beauty tips, new finds and Lizzy's latest recommendations.",

  instagramText: "IG",
  instagramLink: "https://www.instagram.com/lizzy_trevisan/",

  tiktokText: "TT",
  tiktokLink: "https://www.tiktok.com/@lizzytrevisan",

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
              href={footer.fragrancesLink}
              className="transition hover:text-white"
            >
              {footer.fragrancesText}
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
              href={footer.journalLink}
              className="transition hover:text-white"
            >
              {footer.journalText}
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
            
            {footer.instagramLink && (
              <a
                href={footer.instagramLink}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c78f86] hover:bg-[#c78f86] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                  />
                </svg>
              </a>
            )}


            {/* TIKTOK */}
              {footer.tiktokLink && (
                <a
                  href={footer.tiktokLink}
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c78f86] hover:bg-[#c78f86]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.6 7.1a5.5 5.5 0 0 1-3.4-1.2v7.6a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v3.2a2.7 2.7 0 1 0 1.9 2.5V2h3.2a5.5 5.5 0 0 0 2.9 3.3v1.8Z" />
                  </svg>
                </a>
              )}
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