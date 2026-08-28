import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DisclosurePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Transparency
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
            Affiliate Disclosure
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Transparency matters. Here is how affiliate links and partnerships
            may work on The Lizzy Edit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12">
          {/* AMAZON */}
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#b77b72]">
              Amazon Associates
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Amazon Affiliate Disclosure
            </h2>

            <p className="mt-5 text-base font-medium leading-7">
              As an Amazon Associate, I earn from qualifying purchases.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              This means that if you click an eligible Amazon link on The Lizzy
              Edit and make a qualifying purchase, I may receive a commission
              from Amazon.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              There is no additional cost to you for using an affiliate link.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Other Affiliate Programs
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The Lizzy Edit may participate in additional affiliate programs
              with retailers, brands or affiliate networks.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              When an affiliate link is used, The Lizzy Edit may receive a
              commission or referral fee if a purchase is made through that
              link.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Editorial Independence
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Affiliate relationships do not determine which products appear on
              The Lizzy Edit.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The goal is to share useful beauty recommendations, product
              discoveries and educational content that may help readers make
              more informed purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Product Prices & Availability
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Product prices, availability, promotions and product information
              can change at any time.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Always confirm the current price, ingredients, product details and
              retailer policies directly with the retailer before making a
              purchase.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Beauty & Skincare Information
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Content on The Lizzy Edit is intended for general beauty
              education and informational purposes.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Product experiences can vary from person to person, particularly
              with skincare. Recommendations on this website are not medical
              advice and should not replace advice from a qualified healthcare
              professional.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Sponsored Content
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              If The Lizzy Edit publishes sponsored or paid content in the
              future, that relationship will be disclosed clearly within the
              relevant content.
            </p>
          </section>

          {/* PHILOSOPHY */}
          <section className="relative overflow-hidden rounded-[28px] bg-[#211d1b] p-7 text-white sm:p-10">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#c78f86] opacity-20 blur-3xl" />

            <div className="relative">
              <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
                The Lizzy Edit
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">
                Recommendations should still feel personal — not promotional.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
                Affiliate links can help support the site, but the purpose of
                The Lizzy Edit is to curate, educate and help make beauty easier
                to navigate.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Questions
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              If you have questions about affiliate relationships or content on
              The Lizzy Edit, please use the contact information available on
              this website.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-flex text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
            >
              Learn more about The Lizzy Edit →
            </Link>
          </section>

          <div className="rounded-[24px] bg-[#f6eee9] p-6 text-xs leading-6 text-stone-500 sm:p-8">
            <p>
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}