"use client";

import type {
  MouseEvent,
  ReactNode,
} from "react";

import { createClient } from "@/lib/supabase/client";

type AffiliateLinkProps = {
  href: string;
  productSlug?: string | null;
  productName?: string | null;
  sourcePage?: string;
  className?: string;
  children: ReactNode;
};

export default function AffiliateLink({
  href,
  productSlug,
  productName,
  sourcePage = "unknown",
  className,
  children,
}: AffiliateLinkProps) {
  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (!href) {
      event.preventDefault();
      return;
    }

    const supabase = createClient();

    void supabase
      .from("affiliate_clicks")
      .insert({
        product_slug:
          productSlug ?? null,

        product_name:
          productName ?? null,

        destination_url: href,

        source_page: sourcePage,
      })
      .then(({ error }) => {
        if (error) {
          console.error(
            "Affiliate click tracking error:",
            error,
          );
        }
      });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}