import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      id: "skincare",
      title: "Skincare",
      description: "For every skin type & concern",
      image: "/images/skincare.png",
      href: "/skincare",
    },
    {
      id: "makeup",
      title: "Makeup",
      description: "From everyday to full glam",
      image: "/images/makeup.png",
      href: "/makeup",
    },
    {
      id: "self-care",
      title: "Self-Care",
      description: "Body, hair, fragrance & wellness",
      image: "/images/self-care.png",
      href: "/self-care",
    },
  ];

  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* HEADING */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500 sm:text-xs">
          Shop by category
        </p>

        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          What are{" "}
          <span className="italic text-[#c78f86]">you</span>{" "}
          looking for?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-stone-600 sm:text-base">
          Explore curated beauty recommendations designed to make your routine
          simpler, easier and more personal.
        </p>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* IMAGE */}
           <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={category.image}
              alt={`${category.title} beauty products`}
              fill
              quality={95}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
            />

              {/* Soft image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              {/* Category text over image */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/75">
                  The Lizzy Edit
                </p>

                <h3 className="mt-2 font-serif text-3xl sm:text-4xl">
                  {category.title}
                </h3>

                <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/85">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                    Explore
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/15 text-lg backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-black">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}