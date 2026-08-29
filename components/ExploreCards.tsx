import Link from "next/link";

type ExploreCardProps = {
  title: string;
  description: string;
  symbol?: string;
  filter: string;
};

export default function ExploreCard({
  title,
  description,
  symbol,
  filter,
}: ExploreCardProps) {
  return (
    <Link
      href={`/picks?filter=${encodeURIComponent(filter)}`}
      className="group relative min-h-[190px] overflow-hidden rounded-[24px] border border-stone-200 bg-white p-5 transition duration-500 hover:-translate-y-2 hover:shadow-lg sm:min-h-[220px] sm:p-6"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f1ddd6] opacity-50 blur-2xl transition duration-500 group-hover:scale-125" />

      <div className="relative flex h-full flex-col justify-between">
        {symbol && (
          <span className="text-2xl text-[#b77b72]">
            {symbol}
          </span>
        )}

        <div>
          <h3 className="font-serif text-2xl sm:text-3xl">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-stone-500 sm:text-sm">
            {description}
          </p>

          <span className="mt-4 inline-block text-sm transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}