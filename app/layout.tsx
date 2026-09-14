import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://the-lizzy-edit.vercel.app",
  ),

  title: {
    default:
      "The Lizzy Edit | Beauty by Lizzy Trevisan",
    template:
      "%s | The Lizzy Edit",
  },

  description:
    "Skincare, makeup and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",

  keywords: [
    "beauty",
    "skincare",
    "makeup",
    "self-care",
    "beauty recommendations",
    "beauty advisor",
    "skincare recommendations",
    "makeup recommendations",
  ],

  authors: [
    {
      name: "Lizzy Trevisan",
    },
  ],

  creator: "Lizzy Trevisan",

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://the-lizzy-edit.vercel.app",
    siteName: "The Lizzy Edit",
    title:
      "The Lizzy Edit | Beauty by Lizzy Trevisan",
    description:
      "Skincare, makeup and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "The Lizzy Edit | Beauty by Lizzy Trevisan",
    description:
      "Skincare, makeup and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Lizzy Edit",
  url: "https://the-lizzy-edit.vercel.app",
  description:
    "Skincare, makeup and self-care recommendations curated by Beauty Advisor Lizzy Trevisan.",
  publisher: {
    "@type": "Person",
    name: "Lizzy Trevisan",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lizzy Trevisan",
  url: "https://the-lizzy-edit.vercel.app/about",
  jobTitle: "Beauty Advisor",
  worksFor: {
    "@type": "Organization",
    name: "The Lizzy Edit",
  },
};

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
          <body>
            <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteJsonLd),
      }}
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personJsonLd),
      }}
    />

    {children}
      
      </body>
    </html>
  );
}