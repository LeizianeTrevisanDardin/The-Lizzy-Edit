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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}