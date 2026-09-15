"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type JournalPost = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  image_url: string | null;
  image_alt: string | null;
  content: string | null;
  product_name: string | null;
  affiliate_url: string | null;
  status: "draft" | "published";
};

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

function getStoragePath(
  imageUrl: string | null,
) {
  if (!imageUrl) {
    return null;
  }

  const marker =
    "/storage/v1/object/public/product-images/";

  const index =
    imageUrl.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return decodeURIComponent(
    imageUrl.substring(
      index + marker.length,
    ),
  );
}

export default function EditJournalPostPage() {
  const router = useRouter();
  const params = useParams();

  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const rawId = params.id;

  const postId = Array.isArray(rawId)
    ? rawId[0]
    : rawId;

  const [pageLoading, setPageLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [category, setCategory] =
    useState("Beauty");

  const [excerpt, setExcerpt] =
    useState("");

  const [existingImageUrl, setExistingImageUrl] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imageAlt, setImageAlt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [productName, setProductName] =
    useState("");

  const [affiliateUrl, setAffiliateUrl] =
    useState("");

  const [status, setStatus] =
    useState<
      "draft" | "published"
    >("draft");

  const imagePreview =
    useMemo(() => {
      if (!imageFile) {
        return "";
      }

      return URL.createObjectURL(
        imageFile,
      );
    }, [imageFile]);

  useEffect(() => {
    async function loadPost() {
      if (!postId) {
        return;
      }

      setPageLoading(true);
      setError("");

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        router.push(
          "/admin/login",
        );
        return;
      }

      const {
        data: profile,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (
        !profile ||
        profile.role !== "admin"
      ) {
        router.push("/");
        return;
      }

      const {
        data,
        error: postError,
      } = await supabase
        .from("journal_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (postError || !data) {
        setError(
          "Journal post not found.",
        );

        setPageLoading(false);
        return;
      }

      const post =
        data as JournalPost;

      setTitle(
        post.title ?? "",
      );

      setSlug(
        post.slug ?? "",
      );

      setCategory(
        post.category ??
          "Beauty",
      );

      setExcerpt(
        post.excerpt ?? "",
      );

      setExistingImageUrl(
        post.image_url,
      );

      setImageAlt(
        post.image_alt ?? "",
      );

      setContent(
        post.content ?? "",
      );

      setProductName(
        post.product_name ?? "",
      );

      setAffiliateUrl(
        post.affiliate_url ?? "",
      );

      setStatus(
        post.status ?? "draft",
      );

      setPageLoading(false);
    }

    void loadPost();
  }, [
    postId,
    router,
    supabase,
  ]);

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

    if (
      file.size > maxSize
    ) {
      setError(
        "Please choose an image smaller than 5 MB.",
      );
      return;
    }

    setError("");
    setImageFile(file);
  }

  async function uploadNewImage() {
    if (!imageFile) {
      return existingImageUrl;
    }

    const fileName =
      createSafeFileName(
        imageFile.name,
      );

    const filePath =
      `journal/${fileName}`;

    const {
      error: uploadError,
    } =
      await supabase.storage
        .from(
          "product-images",
        )
        .upload(
          filePath,
          imageFile,
          {
            cacheControl:
              "3600",
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
    } =
      supabase.storage
        .from(
          "product-images",
        )
        .getPublicUrl(
          filePath,
        );

    return (
      publicUrlData.publicUrl ||
      null
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!postId) {
      return;
    }

    setSaving(true);
    setError("");

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

      const oldImageUrl =
        existingImageUrl;

      const newImageUrl =
        await uploadNewImage();

      const {
        error: updateError,
      } = await supabase
        .from("journal_posts")
        .update({
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
            newImageUrl,

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
        })
        .eq(
          "id",
          postId,
        );

      if (updateError) {
        if (
          updateError.code ===
          "23505"
        ) {
          throw new Error(
            "That slug already exists. Please choose another one.",
          );
        }

        throw new Error(
          updateError.message,
        );
      }

      /*
       * If the user replaced the image,
       * remove the old one from Storage.
       */
      if (
        imageFile &&
        oldImageUrl &&
        oldImageUrl !==
          newImageUrl
      ) {
        const oldPath =
          getStoragePath(
            oldImageUrl,
          );

        if (oldPath) {
          await supabase.storage
            .from(
              "product-images",
            )
            .remove([
              oldPath,
            ]);
        }
      }

      router.push(
        "/admin/journal",
      );

      router.refresh();
    } catch (err) {
      if (
        err instanceof Error
      ) {
        setError(
          err.message,
        );
      } else {
        setError(
          "Something went wrong.",
        );
      }

      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!postId) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this journal post? This cannot be undone.",
      );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const imagePath =
        getStoragePath(
          existingImageUrl,
        );

      const {
        error: deleteError,
      } = await supabase
        .from("journal_posts")
        .delete()
        .eq(
          "id",
          postId,
        );

      if (deleteError) {
        throw new Error(
          deleteError.message,
        );
      }

      /*
       * Delete the journal image too,
       * if it belongs to our Storage bucket.
       */
      if (imagePath) {
        await supabase.storage
          .from(
            "product-images",
          )
          .remove([
            imagePath,
          ]);
      }

      router.push(
        "/admin/journal",
      );

      router.refresh();
    } catch (err) {
      if (
        err instanceof Error
      ) {
        setError(
          err.message,
        );
      } else {
        setError(
          "Something went wrong.",
        );
      }

      setDeleting(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#fffaf7] px-5 py-16 text-[#211d1b]">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-stone-500">
            Loading journal post...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
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
              Edit Post
            </h1>
          </div>

          {status ===
            "published" && (
            <Link
              href={`/journal/${slug}`}
              target="_blank"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72] hover:text-[#b77b72]"
            >
              View Post →
            </Link>
          )}
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 space-y-8"
        >
          {/* POST DETAILS */}
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
                  onChange={(
                    event,
                  ) =>
                    setTitle(
                      event.target.value,
                    )
                  }
                  required
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
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
                  onChange={(
                    event,
                  ) =>
                    setSlug(
                      createSlug(
                        event.target
                          .value,
                      ),
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                />

                <p className="mt-2 text-xs text-stone-400">
                  /journal/{slug}
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
                  value={
                    category
                  }
                  onChange={(
                    event,
                  ) =>
                    setCategory(
                      event.target
                        .value,
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
                  onChange={(
                    event,
                  ) =>
                    setExcerpt(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#b77b72]"
                />
              </div>
            </div>
          </section>

          {/* IMAGE */}
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Image
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Featured Image
            </h2>

            <div className="mt-7 grid gap-6">
              {(imagePreview ||
                existingImageUrl) && (
                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#f5eee9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      imagePreview ||
                      existingImageUrl ||
                      ""
                    }
                    alt={
                      imageAlt ||
                      title
                    }
                    className="max-h-[500px] w-full object-cover"
                  />
                </div>
              )}

              <label
                htmlFor="journalImage"
                className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-stone-300 bg-[#fffaf7] px-6 py-8 text-center transition hover:border-[#b77b72]"
              >
                <span className="text-sm font-medium">
                  {existingImageUrl
                    ? "Replace Image"
                    : "Choose Image"}
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

              {imageFile && (
                <button
                  type="button"
                  onClick={() =>
                    setImageFile(
                      null,
                    )
                  }
                  className="justify-self-start text-xs font-medium text-[#b77b72]"
                >
                  Cancel new image
                </button>
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
                  onChange={(
                    event,
                  ) =>
                    setImageAlt(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                />
              </div>
            </div>
          </section>

          {/* CONTENT */}
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Writing
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Article Content
            </h2>

            <textarea
              value={content}
              onChange={(
                event,
              ) =>
                setContent(
                  event.target
                    .value,
                )
              }
              rows={14}
              className="mt-7 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 py-4 text-sm leading-7 outline-none transition focus:border-[#b77b72]"
            />
          </section>

          {/* AFFILIATE */}
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
                  value={
                    productName
                  }
                  onChange={(
                    event,
                  ) =>
                    setProductName(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
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
                  onChange={(
                    event,
                  ) =>
                    setAffiliateUrl(
                      event.target
                        .value,
                    )
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-stone-200 bg-[#fffaf7] px-4 text-sm outline-none transition focus:border-[#b77b72]"
                />
              </div>
            </div>
          </section>

          {/* STATUS */}
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#b77b72]">
              Publishing
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Status
            </h2>

            <select
              value={status}
              onChange={(
                event,
              ) =>
                setStatus(
                  event.target
                    .value as
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

          {/* SAVE */}
          <div className="flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/journal"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-7 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                deleting
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-7 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#b77b72] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>

          {/* DANGER ZONE */}
          <section className="rounded-[28px] border border-red-200 bg-red-50/50 p-6 sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-red-500">
              Danger Zone
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Delete Post
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
              Permanently delete this journal post and its uploaded image. This action cannot be undone.
            </p>

            <button
              type="button"
              disabled={
                deleting ||
                saving
              }
              onClick={
                handleDelete
              }
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-red-300 bg-white px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
            >
              {deleting
                ? "Deleting..."
                : "Delete Post"}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}