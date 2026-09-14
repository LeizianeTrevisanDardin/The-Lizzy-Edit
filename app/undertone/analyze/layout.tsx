import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Undertone Analysis",

  description:
    "Use The Lizzy Edit undertone analysis tool to estimate your skin tone and undertone.",

  robots: {
    index: false,
    follow: true,
  },

  alternates: {
    canonical: "/undertone",
  },
};

export default function UndertoneAnalyzeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}