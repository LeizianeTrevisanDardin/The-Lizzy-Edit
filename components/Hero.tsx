import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#f3d8d1] opacity-40 blur-3xl sm:h-96 sm:w-96" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* LEFT CONTENT */}
        <div className="relative z-10">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-xs">
            Beauty Advisor Curated
          </p>

          <h2 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Beauty that fits{" "}
            <span className="italic text-[#c78f86]">your</span> routine.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-6 text-stone-600 sm:text-base sm:leading-7 lg:text-lg">
            Skincare, makeup and self-care picks curated by a Beauty Advisor
            who works with beauty every day.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#picks"
              className="inline-flex min-h-12 items-center justify-center bg-black px-7 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
            >
              Explore My Picks →
            </a>

            <a
              href="#categories"
              className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/50 px-7 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] transition hover:-translate-y-1 hover:bg-white"
            >
              Explore Beauty
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-stone-200 pt-6 text-xs text-stone-600 sm:grid-cols-3">
            <div>
              <span className="mb-1 block text-lg">♡</span>
              Curated with intention
            </div>

            <div>
              <span className="mb-1 block text-lg">✧</span>
              Real recommendations
            </div>

            <div>
              <span className="mb-1 block text-lg">◇</span>
              Beauty finds you&apos;ll love
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative">
          <div className="absolute -inset-5 rounded-[36px] bg-[#ead5cf] opacity-30 blur-3xl sm:-inset-8" />

          <div className="relative overflow-hidden rounded-[28px] bg-[#f3e7e2] shadow-xl sm:rounded-[36px]">
            <Image
              src="/images/hero-beauty.png"
              alt="Curated skincare, makeup and beauty products"
              width={1920}
              height={1080}
              priority
              className="h-auto w-full object-contain"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
          </div>

          <div className="absolute -bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5">
            Beauty, curated the Lizzy way ✦
          </div>
        </div>
              </div>
            </section>
  );
}