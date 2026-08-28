import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      <section className="border-y border-stone-200 bg-[#f3e7e2]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            The Lizzy Edit
          </p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            This Privacy Policy explains how information may be collected,
            used and protected when you visit The Lizzy Edit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-3xl">
              Information We Collect
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The Lizzy Edit may collect limited information when you visit
              this website, such as browser type, device information, pages
              visited and general website usage data.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              If features such as email subscriptions, contact forms or other
              interactive services are added in the future, you may also choose
              to provide information such as your name or email address.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              How Information May Be Used
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Information may be used to understand how visitors use the site,
              improve website content and performance, respond to messages and
              provide requested services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Cookies & Analytics
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The Lizzy Edit may use cookies or similar technologies to support
              website functionality, remember preferences and understand site
              traffic.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Third-party analytics or affiliate services may also use cookies
              or tracking technologies according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Affiliate Links
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The Lizzy Edit may include affiliate links. When you click an
              affiliate link, the retailer or affiliate network may collect
              information about that visit in order to track qualifying
              purchases or referrals.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Third-Party Websites
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              This website may contain links to third-party websites. The Lizzy
              Edit is not responsible for the privacy practices, content or
              policies of external websites.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              You should review the privacy policy of any third-party website
              you visit.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Data Security
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Reasonable efforts may be used to protect information associated
              with this website. However, no method of internet transmission or
              electronic storage can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Children&apos;s Privacy
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              The Lizzy Edit is intended for a general audience and is not
              specifically directed toward children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Changes to This Policy
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              This Privacy Policy may be updated from time to time as the
              website, services or applicable requirements change.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl">
              Contact
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              If you have questions about this Privacy Policy, please contact
              The Lizzy Edit through the contact information provided on this
              website.
            </p>
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