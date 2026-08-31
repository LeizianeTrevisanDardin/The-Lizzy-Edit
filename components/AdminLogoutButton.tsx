"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-600 transition hover:border-[#b77b72] hover:text-[#b77b72]"
    >
      Log Out
    </button>
  );
}