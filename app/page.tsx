import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutLizzy from "@/components/AboutLizzy";
import LizzyPicks from "@/components/LizzyPicks";
import Footer from "@/components/Footer";

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