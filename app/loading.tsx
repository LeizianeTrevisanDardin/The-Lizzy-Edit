export default function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#fffaf7] text-[#211d1b]"
      aria-busy="true"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-[#b77b72]"
        aria-hidden="true"
      />
    </main>
  );
}