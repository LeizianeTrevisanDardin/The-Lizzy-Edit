import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    "https://the-lizzy-edit.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/login",
        "/signup",
        "/undertone/analyze",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}