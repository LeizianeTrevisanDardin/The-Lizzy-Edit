import Link from "next/link";

type PicksCTAProps = {
  eyebrow?: string;
  title?: string;
  href?: string;
  buttonText?: string;
};

export default function PicksCTA({
  eyebrow = "Lizzy's Beauty Picks",
  title = "Ready to discover products for your routine?",
  href = "/picks",
  buttonText = "Explore My Picks",
}: PicksCTAProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="relative overflow-hidden rounded-[30px] bg-[#211d1b] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#c78f86] opacity-20 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#d4a59d]">
              {eyebrow}
            </p>

            <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>

          <Link
            href={href}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-7 text-[10px] font-medium uppercase tracking-[0.15em] text-[#211d1b] transition duration-300 hover:-translate-y-1 hover:bg-[#f5e9e4]"
          >
            {buttonText} →
          </Link>
        </div>
      </div>
    </section>
  );
}