"use client";

import { useState } from "react";
import Link from "next/link";

type HeaderContent = {
  announcement: string;

  logoTitle: string;
  logoSubtitle: string;

  homeText: string;
  homeLink: string;

  skincareText: string;
  skincareLink: string;

  makeupText: string;
  makeupLink: string;

  selfCareText: string;
  selfCareLink: string;

  fragrancesText: string;
  fragrancesLink: string;

  beautyGuideText: string;
  beautyGuideLink: string;

  undertoneText: string;
  undertoneLink: string;

  aboutText: string;
  aboutLink: string;

  adminText: string;
  adminLink: string;

  picksText: string;
  picksLink: string;

  mobilePicksText: string;

  privacyText: string;
  privacyLink: string;

  disclosureText: string;
  disclosureLink: string;

  openMenuLabel: string;
  closeMenuLabel: string;
};

type HeaderClientProps = {
  content: HeaderContent;
};

export default function HeaderClient({
  content,
}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <>
      {/* ANNOUNCEMENT */}
      <div className="bg-[#ead0c8] px-4 py-2 text-center text-[11px] tracking-[0.14em] text-stone-700">
        {content.announcement}
      </div>

      <header className="relative z-50 border-b border-stone-200 bg-[#fffaf7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8 lg:py-7">
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="block"
          >
            <h1 className="font-serif text-2xl tracking-[0.12em] sm:text-3xl">
              {content.logoTitle}
            </h1>

            <p className="text-[8px] uppercase tracking-[0.28em] text-stone-500 sm:text-[9px]">
              {content.logoSubtitle}
            </p>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-wider lg:flex">
            <Link
              href={content.homeLink}
              className="transition hover:opacity-50"
            >
              {content.homeText}
            </Link>

            <Link
              href={content.skincareLink}
              className="transition hover:opacity-50"
            >
              {content.skincareText}
            </Link>

            <Link
              href={content.makeupLink}
              className="transition hover:opacity-50"
            >
              {content.makeupText}
            </Link>

            <Link
              href={content.selfCareLink}
              className="transition hover:opacity-50"
            >
              {content.selfCareText}
            </Link>

            <Link
              href={content.fragrancesLink}
              className="transition hover:opacity-50"
            >
              {content.fragrancesText}
            </Link>

            <Link
              href={content.beautyGuideLink}
              className="transition hover:opacity-50"
            >
              {content.beautyGuideText}
            </Link>

            <Link
              href={content.undertoneLink}
              className="transition hover:text-[#b77b72]"
            >
              {content.undertoneText}
            </Link>

            <Link
              href={content.aboutLink}
              className="transition hover:opacity-50"
            >
              {content.aboutText}
            </Link>

            <Link
              href={content.adminLink}
              className="text-stone-400 transition hover:text-[#b77b72]"
            >
              {content.adminText}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* DESKTOP PICKS */}
            <Link
              href={content.picksLink}
              className="hidden rounded-full border border-stone-300 px-5 py-2 text-[10px] font-medium uppercase tracking-wide transition hover:bg-black hover:text-white sm:inline-flex"
            >
              {content.picksText}
            </Link>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-label={
                menuOpen
                  ? content.closeMenuLabel
                  : content.openMenuLabel
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen(
                  (current) => !current,
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 transition hover:bg-stone-100 lg:hidden"
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen
                      ? "translate-y-[7px] rotate-45"
                      : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-[7px] h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen
                      ? "opacity-0"
                      : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-[14px] h-px w-5 bg-stone-900 transition duration-300 ${
                    menuOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET NAV */}
        <div
          className={`overflow-hidden border-t border-stone-200 bg-[#fffaf7] transition-all duration-500 lg:hidden ${
            menuOpen
              ? "max-h-[750px] opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-6">
            <MobileLink
              href={content.homeLink}
              onClick={closeMenu}
            >
              {content.homeText}
            </MobileLink>

            <MobileLink
              href={content.skincareLink}
              onClick={closeMenu}
            >
              {content.skincareText}
            </MobileLink>

            <MobileLink
              href={content.makeupLink}
              onClick={closeMenu}
            >
              {content.makeupText}
            </MobileLink>

            <MobileLink
              href={content.selfCareLink}
              onClick={closeMenu}
            >
              {content.selfCareText}
            </MobileLink>

            <MobileLink
              href={content.fragrancesLink}
              onClick={closeMenu}
            >
              {content.fragrancesText}
            </MobileLink>

            <MobileLink
              href={content.beautyGuideLink}
              onClick={closeMenu}
            >
              {content.beautyGuideText}
            </MobileLink>

            <MobileLink
              href={content.undertoneLink}
              onClick={closeMenu}
            >
              {content.undertoneText}
            </MobileLink>

            <MobileLink
              href={content.aboutLink}
              onClick={closeMenu}
            >
              {content.aboutText}
            </MobileLink>

            <Link
              href={content.adminLink}
              onClick={closeMenu}
              className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em] text-stone-500"
            >
              {content.adminText}
            </Link>

            <Link
              href={content.picksLink}
              onClick={closeMenu}
              className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-black px-6 text-xs font-medium uppercase tracking-[0.15em] text-white"
            >
              {content.mobilePicksText}
            </Link>

            <div className="mt-6 flex gap-5 pb-2 text-[10px] uppercase tracking-[0.14em] text-stone-500">
              <Link
                href={content.privacyLink}
                onClick={closeMenu}
              >
                {content.privacyText}
              </Link>

              <Link
                href={content.disclosureLink}
                onClick={closeMenu}
              >
                {content.disclosureText}
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

type MobileLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
};

function MobileLink({
  href,
  children,
  onClick,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-stone-200 py-4 text-sm font-medium uppercase tracking-[0.15em]"
    >
      {children}
    </Link>
  );
}