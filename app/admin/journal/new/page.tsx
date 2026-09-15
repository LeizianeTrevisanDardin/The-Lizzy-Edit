"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createSafeFileName(
  fileName: string,
) {
  const extension =
    fileName
      .split(".")
      .pop()
      ?.toLowerCase() || "jpg";

  return `${Date.now()}-${crypto.randomUUID()}.${extension}`;
}

export default function NewJournalPostPage() {
  const router = useRouter();

  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [category, setCategory] =
    useState("Beauty");

  const [excerpt, setExcerpt] =
    useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const imagePreview = useMemo(() => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(
      imageFile,
    );
  }, [imageFile]);

  const [imageAlt, setImageAlt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [productName, setProductName] =
    useState("");

  const [
    affiliateUrl,
    setAffiliateUrl,
  ] = useState("");

  const [status, setStatus] =
    useState<
      "draft" | "published"
    >("draft");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function handleTitleChange(
    value: string,
  ) {
    setTitle(value);

    if (!slug) {
      setSlug(
        createSlug(value),
      );
    }
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      setError(
        "Please choose an image file.",
      );

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Please choose an image smaller than 5 MB.",
      );

      return;
    }

    setError("");
    setImageFile(file);
  }

  async function uploadImage() {
    if (!imageFile) {
      return null;
    }

    const fileName =
      createSafeFileName(
        imageFile.name,
      );

    const filePath =
      `journal/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("product-images")
      .upload(
        filePath,
        imageFile,
        {
          cacheControl: "3600",
          upsert: false,
        },
      );

    if (uploadError) {
      throw new Error(
        `Image upload failed: ${uploadError.message}`,
      );
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return (
      publicUrlData.publicUrl ||
      null
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!title.trim()) {
        throw new Error(
          "Please add a title.",
        );
      }

      const finalSlug =
        slug.trim() ||
        createSlug(title);

      if (!finalSlug) {
        throw new Error(
          "Please add a valid slug.",
        );
      }

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Your session has expired. Please sign in again.",
        );
      }

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error(
          profileError.message,
        );
      }

      if (
        !profile ||
        profile.role !== "admin"
      ) {
        throw new Error(
          "You do not have permission to create journal posts.",
        );
      }

      const imageUrl =
        await uploadImage();

      const {
        error: insertError,
      } = await supabase
        .from("journal_posts")
        .insert({
          title:
            title.trim(),

          slug:
            finalSlug,

          category:
            category.trim() ||
            null,

          excerpt:
            excerpt.trim() ||
            null,

          image_url:
            imageUrl,

          image_alt:
            imageAlt.trim() ||
            null,

          content:
            content.trim() ||
            null,

          product_name:
            productName.trim() ||
            null,

          affiliate_url:
            affiliateUrl.trim() ||
            null,

          status,

          updated_at:
            new Date().toISOString(),
        });

      if (insertError) {
        if (
          insertError.code ===
          "23505"
        ) {
          throw new Error(
            "That slug already exists. Please choose another one.",
          );
        }

        throw new Error(
          insertError.message,
        );
      }

      router.push(
        "/admin/journal",
      );

      router.refresh();
    } catch (err) {
      if (
        err instanceof Error
      ) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong.",
        );
      }

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-stone-200 pb-8">
          <Link
            href="/admin/journal"
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#b77b72]"
          >
            ← Back to Journal
          </Link>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            The Lizzy Journal
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            New Post
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
            Create a beauty article, product feature or affiliate recommendation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Article
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Post Details
            </h2>

            <div className="mt-7 grid gap-5">
              <div>
                <label
                  htmlFor="title"
                  className="text-xs font-medium text-stone-700"
                >
                  Title
                </label>

                <input
                  id="title"
                  value={title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value,
                    )
                  }
                  required
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                  placeholder="My Favorite Foundation for Everyday Makeup"
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="text-xs font-medium text-stone-700"
                >
                  Slug
                </label>

                <input
                  id="slug"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      createSlug(
                        event.target.value,
                      ),
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                  placeholder="my-favorite-foundation"
                />

                <p className="mt-2 text-xs text-stone-400">
                  /journal/
                  {slug ||
                    "your-post-slug"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-xs font-medium text-stone-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                >
                  <option value="Beauty">
                    Beauty
                  </option>

                  <option value="Skincare">
                    Skincare
                  </option>

                  <option value="Makeup">
                    Makeup
                  </option>

                  <option value="Self-Care">
                    Self-Care
                  </option>

                  <option value="Fragrance">
                    Fragrance
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="text-xs font-medium text-stone-700"
                >
                  Short Description
                </label>

                <textarea
                  id="excerpt"
                  rows={4}
                  value={excerpt}
                  onChange={(event) =>
                    setExcerpt(
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#b77b72]"
                  placeholder="A short introduction that will appear on the Journal page."
                />
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Image
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Featured Image
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Upload the main image for your article.
            </p>

            <div className="mt-7 grid gap-6">
              <label
                htmlFor="journalImage"
                className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-stone-300 bg-[#fffaf7] px-6 py-10 text-center transition hover:border-[#b77b72]"
              >
                <span className="text-sm font-medium">
                  Choose Image
                </span>

                <span className="mt-2 text-xs text-stone-400">
                  JPG, PNG or WebP • Max 5 MB
                </span>

                <input
                  id="journalImage"
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div>
                  <p className="mb-3 text-xs font-medium text-stone-700">
                    Preview
                  </p>

                  <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#f5eee9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        imagePreview
                      }
                      alt="Journal preview"
                      className="max-h-[500px] w-full object-cover"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="truncate text-xs text-stone-400">
                      {
                        imageFile?.name
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setImageFile(
                          null,
                        )
                      }
                      className="text-xs font-medium text-[#b77b72] transition hover:text-[#211d1b]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="imageAlt"
                  className="text-xs font-medium text-stone-700"
                >
                  Image Description
                </label>

                <input
                  id="imageAlt"
                  value={imageAlt}
                  onChange={(event) =>
                    setImageAlt(
                      event.target.value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                  placeholder="Example: e.l.f. Halo Glow Liquid Filter on a vanity"
                />

                <p className="mt-2 text-xs leading-5 text-stone-400">
                  This description helps accessibility and search engines understand the image.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Writing
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Article Content
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Separate paragraphs with a blank line.
            </p>

            <textarea
              value={content}
              onChange={(event) =>
                setContent(
                  event.target.value,
                )
              }
              rows={14}
              className="mt-7 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 py-4 text-sm leading-7 outline-none transition focus:border-[#b77b72]"
              placeholder={`I've been using this product...\n\nWhat I like most about it is...\n\nFor me, it works especially well when...`}
            />
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Affiliate
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Featured Product
            </h2>

            <div className="mt-7 grid gap-5">
              <div>
                <label
                  htmlFor="productName"
                  className="text-xs font-medium text-stone-700"
                >
                  Product Name
                </label>

                <input
                  id="productName"
                  value={productName}
                  onChange={(event) =>
                    setProductName(
                      event.target.value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                  placeholder="e.l.f. Halo Glow Liquid Filter"
                />
              </div>

              <div>
                <label
                  htmlFor="affiliateUrl"
                  className="text-xs font-medium text-stone-700"
                >
                  Affiliate Link
                </label>

                <input
                  id="affiliateUrl"
                  type="url"
                  value={
                    affiliateUrl
                  }
                  onChange={(event) =>
                    setAffiliateUrl(
                      event.target.value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Publishing
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Status
            </h2>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "draft"
                    | "published",
                )
              }
              className="mt-6 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72] sm:max-w-xs"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </section>

          {error && (
            <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/journal"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72] hover:text-[#b77b72]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : status ===
                    "published"
                  ? "Publish Post"
                  : "Save Draft"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}