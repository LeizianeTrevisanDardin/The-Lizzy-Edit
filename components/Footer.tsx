export default function Footer() {
  return (
    <footer className="bg-[#211d1b] text-stone-300">

      {/* Top footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16">

        {/* Brand */}
        <div>
          <h2 className="font-serif text-3xl tracking-[0.12em] text-white">
            LIZZY
          </h2>

          <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-stone-500">
            The Beauty Edit
          </p>

          <p className="mt-5 max-w-xs text-sm leading-6 text-stone-400">
            Skincare, makeup and self-care recommendations curated by Beauty
            Advisor Lizzy Trevisan.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            Explore
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm text-stone-400">
            <a href="/skincare" className="transition hover:text-white">
              Skincare
            </a>

            <a href="/makeup" className="transition hover:text-white">
              Makeup
            </a>

            <a href="/self-care" className="transition hover:text-white">
              Self-Care
            </a>

            <a href="/picks" className="transition hover:text-white">
              Lizzy&apos;s Picks
            </a>
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            The Lizzy Edit
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm text-stone-400">
            <a href="/about" className="transition hover:text-white">
              About Lizzy
            </a>

            <a href="/beauty-guide" className="transition hover:text-white">
              Beauty Guide
            </a>

            <a href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="/disclosure" className="transition hover:text-white">
              Affiliate Disclosure
            </a>
          </div>
        </div>

        {/* Follow */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            Follow The Edit
          </p>

          <p className="mt-5 text-sm leading-6 text-stone-400">
            Beauty tips, new finds and Lizzy&apos;s latest recommendations.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              IG
            </a>

            <a
              href="#"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              TT
            </a>
          </div>
        </div>
      </div>

      {/* Affiliate */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs leading-5 text-stone-500 sm:px-6 lg:px-8">

          <p>
            As an Amazon Associate, I earn from qualifying purchases.
          </p>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[10px] text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

          <p>
            © {new Date().getFullYear()} The Lizzy Edit by Lizzy Trevisan.
          </p>

          <p>
            Beauty curated with intention ♡
          </p>

        </div>
      </div>

    </footer>
  );
}