import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createClient } from "@/lib/supabase/server";

type PrivacySection = {
  title: string;
  paragraphs: string[];
};

const fallbackContent = {
  hero: {
    eyebrow: "The Lizzy Edit",
    title: "Privacy Policy",
    description:
      "This Privacy Policy explains how information may be collected, used and protected when you visit The Lizzy Edit.",
  },

  sections: [
    {
      title: "Information We Collect",
      paragraphs: [
        "The Lizzy Edit may collect limited information when you visit this website, such as browser type, device information, pages visited and general website usage data.",
        "If features such as email subscriptions, contact forms or other interactive services are added in the future, you may also choose to provide information such as your name or email address.",
      ],
    },
    {
      title: "How Information May Be Used",
      paragraphs: [
        "Information may be used to understand how visitors use the site, improve website content and performance, respond to messages and provide requested services.",
      ],
    },
    {
      title: "Cookies & Analytics",
      paragraphs: [
        "The Lizzy Edit may use cookies or similar technologies to support website functionality, remember preferences and understand site traffic.",
        "Third-party analytics or affiliate services may also use cookies or tracking technologies according to their own privacy policies.",
      ],
    },
    {
      title: "Affiliate Links",
      paragraphs: [
        "The Lizzy Edit may include affiliate links. When you click an affiliate link, the retailer or affiliate network may collect information about that visit in order to track qualifying purchases or referrals.",
      ],
    },
    {
      title: "Third-Party Websites",
      paragraphs: [
        "This website may contain links to third-party websites. The Lizzy Edit is not responsible for the privacy practices, content or policies of external websites.",
        "You should review the privacy policy of any third-party website you visit.",
      ],
    },
    {
      title: "Data Security",
      paragraphs: [
        "Reasonable efforts may be used to protect information associated with this website. However, no method of internet transmission or electronic storage can be guaranteed to be completely secure.",
      ],
    },
    {
      title: "Children's Privacy",
      paragraphs: [
        "The Lizzy Edit is intended for a general audience and is not specifically directed toward children under 13.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "This Privacy Policy may be updated from time to time as the website, services or applicable requirements change.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "If you have questions about this Privacy Policy, please contact The Lizzy Edit through the contact information provided on this website.",
      ],
    },
  ] as PrivacySection[],

  lastUpdated: "Last updated: August 2026",
};
export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Read The Lizzy Edit Privacy Policy and learn how website usage data, cookies, analytics, affiliate links and third-party services may be handled.",

  alternates: {
    canonical: "/privacy",
  },

  openGraph: {
    title: "Privacy Policy | The Lizzy Edit",

    description:
      "Read The Lizzy Edit Privacy Policy and learn how website usage data, cookies, analytics, affiliate links and third-party services may be handled.",

    url: "/privacy",

    type: "website",
  },
};

export default async function PrivacyPage() {
  const supabase = await createClient();

  const {
    data: contentData,
    error: contentError,
  } = await supabase
    .from("site_content")
    .select("content")
    .eq("page", "privacy")
    .eq("section", "page")
    .maybeSingle();

  if (contentError) {
    console.error(
      "Error loading Privacy content:",
      contentError,
    );
  }

  const savedContent =
    contentData?.content ?? {};

  const hero = {
    ...fallbackContent.hero,
    ...(savedContent.hero ?? {}),
  };

  const sections =
    savedContent.sections ??
    fallbackContent.sections;

  const lastUpdated =
    savedContent.lastUpdated ??
    fallbackContent.lastUpdated;

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="border-y border-stone-200 bg-[#f3e7e2]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            {hero.description}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12">
          {sections.map(
            (
              section: PrivacySection,
              index: number,
            ) => (
              <section key={`${index}-${section.title}`}>
                <h2 className="font-serif text-3xl">
                  {section.title}
                </h2>

                {section.paragraphs.map(
                  (
                    paragraph: string,
                    paragraphIndex: number,
                  ) => (
                    <p
                      key={`${paragraphIndex}-${paragraph}`}
                      className="mt-4 text-sm leading-7 text-stone-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </section>
            ),
          )}

          <div className="rounded-[24px] bg-[#f6eee9] p-6 text-xs leading-6 text-stone-500 sm:p-8">
            <p>
              {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}