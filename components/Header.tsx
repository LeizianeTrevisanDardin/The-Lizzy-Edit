import HeaderClient from "@/components/HeaderClient";

import { createClient } from "@/lib/supabase/server";

const fallbackHeader = {
  announcement:
    "✧ Beauty curated with love by a Beauty Advisor ♥",

  logoTitle: "LIZZY",
  logoSubtitle: "The Beauty Edit",

  homeText: "Home",
  homeLink: "/",

  skincareText: "Skincare",
  skincareLink: "/skincare",

  makeupText: "Makeup",
  makeupLink: "/makeup",

  selfCareText: "Self-Care",
  selfCareLink: "/self-care",

  fragrancesText: "Fragrances",
  fragrancesLink: "/fragrances",

  beautyGuideText: "Beauty Guide",
  beautyGuideLink: "/beauty-guide",

  undertoneText: "Find Your Undertone",
  undertoneLink: "/undertone",

  aboutText: "About",
  aboutLink: "/about",

  adminText: "Admin",
  adminLink: "/admin/login",

  picksText: "My Picks",
  picksLink: "/picks",

  mobilePicksText: "Explore My Picks",

  privacyText: "Privacy",
  privacyLink: "/privacy",

  disclosureText: "Disclosure",
  disclosureLink: "/disclosure",
};

export default async function Header() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "global")
    .eq("section", "header")
    .maybeSingle();

  if (error) {
    console.error(
      "HEADER CONTENT LOAD ERROR:",
      error,
    );
  }

  const savedHeader =
    data?.content ?? {};

  const header = {
    ...fallbackHeader,
    ...savedHeader,
  };

  return (
    <HeaderClient content={header} />
  );
}