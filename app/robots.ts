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
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}