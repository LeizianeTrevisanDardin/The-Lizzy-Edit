"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#ead0c8] px-4 py-2 text-center text-[11px] tracking-[0.14em] text-stone-700">
        ✧ Beauty curated with love by a Beauty Advisor ♥
      </div>

      <header className="relative z-50 border-b border-stone-200 bg-[#fffaf7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8 lg:py-7">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="block">
            <h1 className="font-serif text-2xl tracking-[0.12em] sm:text-3xl">
              LIZZY
            </h1>

            <p className="text-[8px] uppercase tracking-[0.28em] text-stone-500 sm:text-[9px]">
              The Beauty Edit
            </p>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-wider lg:flex">
            <Link href="/" className="transition hover:opacity-50">
              Home
            </Link>

            <Link
              href="/skincare"
              className="transition hover:opacity-50"
            >
              Skincare
            </Link>

            <Link
              href="/makeup"
              className="transition hover:opacity-50"
            >
              Makeup
            </Link>

            <Link
              href="/self-care"
              className="transition hover:opacity-50"
            >
              Self-Care
            </Link>

            <Link
              href="/fragrances"
              className="transition hover:opacity-50"
            >
              Fragrances
            </Link>

            <Link
              href="/beauty-guide"
              className="transition hover:opacity-50"
            >
              Beauty Guide
            </Link>

            <Link
              href="/about"
              className="transition hover:opacity-50"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Picks */}
            <Link
              href="/picks"
              className="hidden rounded-full border border-stone-300 px-5 py-2 text-[10px] font-medium uppercase tracking-wide transition hover:bg-black hover:text-white sm:inline-flex"
            >
              My Picks
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 transition hover:bg-stone-100 lg:hidden"
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-[7px] h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-[14px] h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet navigation */}
        <div
          className={`overflow-hidden border-t border-stone-200 bg-[#fffaf7] transition-all duration-500 lg:hidden ${
            menuOpen
              ? "max-h-[650px] opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Home
            </Link>

            <Link
              href="/skincare"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Skincare
            </Link>

            <Link
              href="/makeup"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Makeup
            </Link>

            <Link
              href="/self-care"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Self-Care
            </Link>

            <Link
              href="/fragrances"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Fragrances
            </Link>

            <Link
              href="/beauty-guide"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              Beauty Guide
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
            >
              About Me
            </Link>

            <Link
              href="/picks"
              onClick={closeMenu}
              className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-black px-6 text-xs font-medium uppercase tracking-[0.15em] text-white"
            >
              Explore My Picks
            </Link>

            <div className="mt-6 flex gap-5 pb-2 text-[10px] uppercase tracking-[0.14em] text-stone-500">
              <Link href="/privacy" onClick={closeMenu}>
                Privacy
              </Link>

              <Link href="/disclosure" onClick={closeMenu}>
                Disclosure
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}