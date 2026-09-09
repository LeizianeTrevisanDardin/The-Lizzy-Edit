export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] text-[#211d1b]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-[#b77b72]" />

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
          Loading The Lizzy Edit
        </p>
      </div>
    </main>
  );
}