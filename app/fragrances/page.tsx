import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PicksCTA from "@/components/PicksCTA";

const fragranceFamilies = [
  {
    title: "Fresh",
    description:
      "Clean, airy and easy to wear. Think citrus, green notes, soft musks and crisp compositions.",
    symbol: "◌",
  },
  {
    title: "Floral",
    description:
      "Romantic, feminine and versatile, from soft petals to richer white florals.",
    symbol: "✿",
  },
  {
    title: "Warm",
    description:
      "Comforting and sensual with amber, vanilla, spices and cozy woods.",
    symbol: "✦",
  },
  {
    title: "Gourmand",
    description:
      "Sweet and addictive scents inspired by vanilla, caramel, coffee and dessert-like notes.",
    symbol: "♡",
  },
  {
    title: "Woody",
    description:
      "Smooth, elegant and grounded with sandalwood, cedar, vetiver and deeper woods.",
    symbol: "◇",
  },
];

const wardrobe = [
  {
    title: "Everyday",
    description:
      "Easy, polished fragrances that feel effortless for work, errands and everyday life.",
    tag: "Easy Reach",
  },
  {
    title: "Date Night",
    description:
      "Warmer, sensual fragrances with a little more depth and presence.",
    tag: "After Dark",
  },
  {
    title: "Soft & Cozy",
    description:
      "Comforting musks, vanilla and skin scents for quiet days and evenings at home.",
    tag: "Comfort Scent",
  },
  {
    title: "Statement",
    description:
      "Fragrances with stronger projection and personality for when you want to be remembered.",
    tag: "Make an Entrance",
  },
];

const fragranceNotes = [
  {
    number: "01",
    title: "Top Notes",
    description:
      "The first impression of a fragrance. These notes are usually lighter and are the first thing you smell after spraying.",
  },
  {
    number: "02",
    title: "Heart Notes",
    description:
      "The character of the fragrance begins to develop here, often with florals, spices, fruits or aromatic notes.",
  },
  {
    number: "03",
    title: "Base Notes",
    description:
      "The notes that remain longest on the skin, often including woods, vanilla, amber and musk.",
  },
];

const fragranceTips = [
  "Give a fragrance time to dry down before deciding whether you love it.",
  "Test perfume on skin when possible because body chemistry can affect the scent.",
  "Projection and longevity do not always mean a fragrance is better.",
  "You do not need one signature scent — a small fragrance wardrobe can be more fun.",
];

export default function FragrancePage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#211d1b]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-[#f3e7e2]">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-white/50 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#c78f86]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
              The Fragrance Edit
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Find a fragrance that feels{" "}
              <span className="italic text-[#c78f86]">
                like you.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              From soft everyday scents to unforgettable statement perfumes,
              discover fragrance recommendations, scent families and simple
              guides to help you find your next favorite.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#fragrance-families"
                className="inline-flex min-h-12 items-center justify-center bg-black px-7 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                Find Your Scent →
              </Link>

              <Link
                href="/picks"
                className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-white/40 px-7 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-white"
              >
                See My Picks
              </Link>
            </div>
          </div>

         {/* HERO IMAGE */}
            <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-[#d6b7ad]/30 blur-3xl" />

            <div className="relative mx-auto aspect-[4/5] max-w-[470px] overflow-hidden rounded-[34px] border border-white/60 bg-[#ead7d0] shadow-xl">
                <Image
                src="/images/fragrances.png"
                alt="Fragrance favorites curated by The Lizzy Edit"
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 90vw, 470px"
                className="object-cover object-center"
                />
            </div>
            </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
          Fragrance, made simpler
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Perfume is personal — and that&apos;s what makes it{" "}
          <span className="italic text-[#c78f86]">
            fun.
          </span>
        </h2>

        <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
          <p>
            Fragrance can completely change how you feel. Some scents feel
            clean and effortless, others warm and comforting, and some are
            made for those moments when you want to make an entrance.
          </p>

          <p>
            You do not need to know every perfume note or understand every
            fragrance category to find something you love.
          </p>

          <p>
            Start with the types of scents you naturally enjoy, then build
            from there.
          </p>
        </div>
      </section>

      {/* FRAGRANCE FAMILIES */}
      <section
        id="fragrance-families"
        className="bg-[#f6eee9]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Find your fragrance family
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              What do you naturally{" "}
              <span className="italic text-[#c78f86]">
                gravitate toward?
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              Fragrance families are a simple way to understand the overall
              personality of a perfume before you even smell it.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {fragranceFamilies.map((family) => (
              <article
                key={family.title}
                className="group rounded-[28px] border border-white/70 bg-white/70 p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              >
                <span className="text-2xl text-[#c78f86]">
                  {family.symbol}
                </span>

                <h3 className="mt-8 font-serif text-3xl">
                  {family.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {family.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FRAGRANCE WARDROBE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              The Fragrance Wardrobe
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              One scent does not have to do{" "}
              <span className="italic text-[#c78f86]">
                everything.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              Think of fragrance like clothing — different scents can fit
              different moods, seasons and moments.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {wardrobe.map((item) => (
              <article
                key={item.title}
                className="group rounded-[28px] border border-stone-200 bg-white p-6 transition duration-500 hover:-translate-y-2 hover:shadow-lg sm:p-7"
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                  {item.tag}
                </p>

                <h3 className="mt-4 font-serif text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PICKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
                Lizzy&apos;s Fragrance Picks
              </p>

              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                Scents worth{" "}
                <span className="italic text-[#c78f86]">
                  discovering.
                </span>
              </h2>
            </div>

            <Link
              href="/picks"
              className="inline-flex text-[10px] font-medium uppercase tracking-[0.16em] underline underline-offset-4"
            >
              See All Picks →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
            {
            name: "Everyday Scent",
            perfume: "Narciso Rodriguez For Her Pure Musc",
            type: "Fresh • Soft Musk",
            description:
                "Clean, soft and effortlessly feminine. A beautiful everyday musk that feels polished without being overpowering.",
            image: "/images/narciso.png",
            },
            {
            name: "Date Night",
            perfume: "Dior J’adore Eau de Parfum",
            type: "Floral • Elegant • Feminine",
            description:
                "Radiant, elegant and beautifully feminine. A sophisticated floral fragrance with a luminous, polished feel — perfect when you want something timeless and effortlessly chic.",
            image: "/images/dior.png",
            },
            {
            name: "Cozy Favorite",
            perfume: "Burberry Goddess Eau de Parfum",
            type: "Vanilla • Warm • Gourmand",
            description:
                "Warm, creamy and beautifully feminine. A sophisticated vanilla fragrance with a soft, comforting sweetness that feels cozy and elegant.",
            image: "/images/burberry.png",
            },
            {
            name: "Statement Fragrance",
            perfume: "Rabanne Million Gold For Her Parfum",
            type: "Floral • Warm • Sensual",
            description:
                "Bold, glamorous and effortlessly feminine. A rich floral fragrance with a warm, sensual finish for when you want your scent to make a statement.",
            image: "/images/pacco.png",
            },
        ].map((item) => (
            <article
            key={item.perfume}
            className="group overflow-hidden rounded-[28px] border border-stone-200 bg-[#fffaf7] transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
            {/* PRODUCT IMAGE */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ead7d0]">
                <Image
                src={item.image}
                alt={item.perfume}
                fill
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                />
            </div>

            {/* PRODUCT INFO */}
            <div className="p-5">
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
                {item.type}
                </p>

                <h3 className="mt-3 font-serif text-2xl">
                {item.name}
                </h3>

                <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-stone-500">
                {item.perfume}
                </p>

                <p className="mt-4 text-sm leading-6 text-stone-600">
                {item.description}
                </p>
            </div>
            </article>
        ))}
        </div>
        </div>
      </section>

      {/* HOW FRAGRANCE WORKS */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Fragrance 101
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Why perfume smells different after a few{" "}
            <span className="italic text-[#c78f86]">
              hours.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Perfumes develop in layers. What you smell immediately after
            spraying may be very different from the fragrance that remains
            later in the day.
          </p>
        </div>

        <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
          {fragranceNotes.map((note) => (
            <div
              key={note.number}
              className="grid gap-5 py-8 sm:grid-cols-[80px_180px_1fr] sm:items-start sm:gap-8 sm:py-10"
            >
              <span className="font-serif text-3xl text-[#c78f86]">
                {note.number}
              </span>

              <h3 className="font-serif text-3xl">
                {note.title}
              </h3>

              <p className="text-sm leading-7 text-stone-600 sm:text-base">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EDP VS EDT */}
      <section className="bg-[#f6eee9]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Good to know
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Eau de Parfum vs. Eau de{" "}
              <span className="italic text-[#c78f86]">
                Toilette.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] bg-white/70 p-6 sm:p-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#b77b72]">
                EDP
              </p>

              <h3 className="mt-3 font-serif text-3xl">
                Eau de Parfum
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                Often has a higher concentration of fragrance oils and may feel
                richer or last longer, although performance varies by formula.
              </p>
            </div>

            <div className="rounded-[28px] bg-white/70 p-6 sm:p-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
                EDT
              </p>

              <h3 className="mt-3 font-serif text-3xl">
                Eau de Toilette
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                Often feels lighter and fresher, making it a nice choice when
                you prefer a softer fragrance experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEAUTY NOTES */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
              Fragrance Notes
            </p>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              A few things I&apos;d tell a{" "}
              <span className="italic text-[#c78f86]">
                friend.
              </span>
            </h2>
          </div>

          <div className="divide-y divide-stone-300 border-y border-stone-300">
            {fragranceTips.map((tip, index) => (
              <div
                key={tip}
                className="grid grid-cols-[45px_1fr] gap-4 py-6 sm:grid-cols-[70px_1fr]"
              >
                <span className="font-serif text-xl text-[#c78f86]">
                  0{index + 1}
                </span>

                <p className="text-sm leading-7 text-stone-700 sm:text-base">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* FINAL NOTE */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="rounded-[30px] border border-stone-200 bg-white p-6 sm:p-10">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Lizzy&apos;s take
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            Wear the fragrance that makes you feel{" "}
            <span className="italic text-[#c78f86]">
              something.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Fragrance is one of the most personal parts of beauty. Trends and
            compliments are fun, but the perfume that matters most is the one
            you genuinely look forward to wearing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <PicksCTA
        eyebrow="Lizzy's Fragrance Picks"
        title="Looking for your next favorite fragrance?"
      />

      <Footer />
    </main>
  );
}