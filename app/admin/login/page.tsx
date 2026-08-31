"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email or password is incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
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
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Sign in to manage your beauty products and content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-xs font-medium text-stone-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-medium text-stone-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                placeholder="••••••••"
              />
            </div>

            <div className="text-right">
              <Link
                href="/admin/forgot-password"
                className="text-xs text-stone-500 transition hover:text-[#b77b72]"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[#b77b72] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}