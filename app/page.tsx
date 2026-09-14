import type { Metadata } from "next";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutLizzy from "@/components/AboutLizzy";
import LizzyPicks from "@/components/LizzyPicks";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Beauty Recommendations by Lizzy Trevisan",

  description:
    "Discover curated skincare, makeup, self-care and beauty recommendations from Lizzy Trevisan at The Lizzy Edit.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Beauty Recommendations by Lizzy Trevisan",
    description:
      "Discover curated skincare, makeup, self-care and beauty recommendations from Lizzy Trevisan at The Lizzy Edit.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />
      <Hero />
      <Categories />
      <AboutLizzy />
      <LizzyPicks />
      <Footer />
    </main>
  );
}