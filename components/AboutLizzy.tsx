import Image from "next/image";
import Link from "next/link";

export default function AboutLizzy() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Lizzy photo */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-[36px] bg-[#ead7cf] shadow-lg lg:mx-0">
            <Image
              src="/images/Lizzy.png"
              alt="Lizzy Trevisan"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* subtle editorial overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 right-2 rounded-[24px] border border-white/70 bg-white/90 px-5 py-4 shadow-lg backdrop-blur-md sm:right-6 lg:-right-5">
            <p className="text-[9px] uppercase tracking-[0.24em] text-stone-500">
              Beauty Advisor
            </p>

            <p className="mt-1 font-serif text-xl">
              Curated by Lizzy ♡
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
            Hi, I&apos;m
          </p>

          <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
            Lizzy Trevisan
            <span className="ml-2 italic text-[#c78f86]">♡</span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
            I work with beauty every day and love helping people discover
            products that fit their skin, style and routine.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            The Lizzy Edit is where I share skincare, makeup and self-care
            finds I genuinely think are worth knowing about — from everyday
            essentials to products worth the splurge.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">♡</span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                Personal
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                Recommendations made with real routines in mind.
              </p>
            </div>

            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">✧</span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                Curated
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                Beauty finds selected with a Beauty Advisor&apos;s eye.
              </p>
            </div>

            <div className="rounded-[22px] border border-stone-200 bg-white/70 p-5">
              <span className="text-xl">◇</span>

              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                Simple
              </p>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                Less overwhelm and more products that make sense.
              </p>
            </div>
          </div>

          <Link
            href="/picks"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-black px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
          >
            Discover My Favorites →
          </Link>
        </div>
      </div>
    </section>
  );
}