"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email for the password reset link.");
    setLoading(false);
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
              Reset your password
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Enter your email and we’ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211d1b] px-6 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[#b77b72] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/admin/login"
              className="text-xs text-stone-500 transition hover:text-[#b77b72]"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}