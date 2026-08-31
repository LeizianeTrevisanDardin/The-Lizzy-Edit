"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-12 text-[#211d1b]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
              The Lizzy Edit
            </p>

            <h1 className="mt-3 font-serif text-4xl">
              Choose a new password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-medium text-stone-700">
                New password
              </label>

              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-stone-700">
                Confirm password
              </label>

              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[#b77b72] disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <div className="text-right">
            <Link
              href="/admin/forgot-password"
              className="text-xs text-stone-500 transition hover:text-[#b77b72]"
            >
              Forgot password?
            </Link>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}