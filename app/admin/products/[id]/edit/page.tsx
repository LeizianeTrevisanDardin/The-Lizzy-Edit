"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import CustomSelect from "@/components/CustomSelect";
import { createClient } from "@/lib/supabase/client";

const skinToneOptions = [
  "Fair",
  "Light",
  "Light-Medium",
  "Medium",
  "Medium-Deep",
  "Deep",
];

const undertoneOptions = [
  "Cool",
  "Neutral-Cool",
  "Neutral",
  "Neutral-Warm",
  "Warm",
];

const concernOptions = [
  "Dryness",
  "Sensitivity",
  "Breakouts",
  "Fine Lines",
  "Dark Spots",
  "Dullness",
];

const categoryOptions = [
  "Skincare",
  "Makeup",
  "Self-Care",
  "Fragrance",
];

type Product = {
  id: number;
  slug: string;
  brand: string;
  name: string;
  category: string;
  type: string | null;
  image_url: string | null;
  description: string | null;
  why_i_like_it: string[] | null;
  affiliate_url: string | null;
  featured: boolean;
  home_tag: string | null;
  skin_tones: string[] | null;
  undertones: string[] | null;
  concerns: string[] | null;
  tags: string[] | null;
  status: "draft" | "published";
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const supabase = useMemo(() => createClient(), []);

  const productId = params.id as string;

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [whyILikeIt, setWhyILikeIt] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [homeTag, setHomeTag] = useState("");
  const [tags, setTags] = useState("");

  const [skinTones, setSkinTones] = useState<string[]>([]);
  const [undertones, setUndertones] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);

  const [featured, setFeatured] = useState(false);

  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  const [currentImageUrl, setCurrentImageUrl] =
    useState<string | null>(null);

  const [newImage, setNewImage] =
    useState<File | null>(null);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  useEffect(() => {
    async function loadProduct() {
      setPageLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error || !data) {
        setError("Product could not be found.");
        setPageLoading(false);
        return;
      }

      const product = data as Product;

      setBrand(product.brand);
      setName(product.name);
      setCategory(product.category);
      setType(product.type ?? "");
      setDescription(product.description ?? "");
      setWhyILikeIt(
        (product.why_i_like_it ?? []).join("\n")
      );
      setAffiliateUrl(
        product.affiliate_url ?? ""
      );
      setHomeTag(product.home_tag ?? "");
      setTags(
        (product.tags ?? []).join(", ")
      );

      setSkinTones(
        product.skin_tones ?? []
      );

      setUndertones(
        product.undertones ?? []
      );

      setConcerns(
        product.concerns ?? []
      );

      setFeatured(product.featured);
      setStatus(product.status);
      setCurrentImageUrl(product.image_url);

      setPageLoading(false);
    }

    loadProduct();
  }, [productId, supabase]);

  function toggleValue(
    value: string,
    current: string[],
    setter: (values: string[]) => void
  ) {
    if (current.includes(value)) {
      setter(
        current.filter(
          (item) => item !== value
        )
      );
    } else {
      setter([...current, value]);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (!brand.trim() || !name.trim()) {
        throw new Error(
          "Brand and product name are required."
        );
      }

      let imageUrl = currentImageUrl;

      if (newImage) {
        const extension =
          newImage.name
            .split(".")
            .pop()
            ?.toLowerCase() || "jpg";

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `products/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("product-images")
            .upload(
              filePath,
              newImage,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (uploadError) {
          throw uploadError;
        }

        const { data } =
          supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const slug =
        createSlug(`${brand}-${name}`);

      const { error: updateError } =
        await supabase
          .from("products")
          .update({
            slug,
            brand: brand.trim(),
            name: name.trim(),
            category,
            type:
              type.trim() || null,

            image_url: imageUrl,

            description:
              description.trim() || null,

            why_i_like_it:
              whyILikeIt
                .split("\n")
                .map(
                  (item) =>
                    item.trim()
                )
                .filter(Boolean),

            affiliate_url:
              affiliateUrl.trim() ||
              null,

            featured,

            home_tag:
              homeTag.trim() ||
              null,

            skin_tones:
              skinTones,

            undertones,

            concerns,

            tags:
              tags
                .split(",")
                .map(
                  (item) =>
                    item.trim()
                )
                .filter(Boolean),

            status,
          })
          .eq("id", productId);

      if (updateError) {
        throw updateError;
      }

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating the product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      if (currentImageUrl) {
        const marker =
          "/storage/v1/object/public/product-images/";

        if (
          currentImageUrl.includes(
            marker
          )
        ) {
          const encodedPath =
            currentImageUrl.split(
              marker
            )[1];

          if (encodedPath) {
            const filePath =
              decodeURIComponent(
                encodedPath
              );

            const {
              error: storageError,
            } =
              await supabase.storage
                .from(
                  "product-images"
                )
                .remove([
                  filePath,
                ]);

            if (storageError) {
              console.error(
                "Could not delete product image:",
                storageError
              );

              throw new Error(
                "The product image could not be deleted. The product was not removed."
              );
            }
          }
        }
      }

      const {
        error: deleteError,
      } =
        await supabase
          .from("products")
          .delete()
          .eq("id", productId);

      if (deleteError) {
        throw deleteError;
      }

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting the product."
      );

      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <p className="text-sm text-stone-500">
          Loading product...
        </p>
      </main>
    );
  }

  if (error && !name) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-5">
        <div className="text-center">
          <h1 className="font-serif text-4xl">
            Product not found
          </h1>

          <Link
            href="/admin/products"
            className="mt-6 inline-block text-sm text-[#b77b72]"
          >
            ← Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-5 py-8 text-[#211d1b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/products"
          className="text-xs text-stone-500 transition hover:text-[#b77b72]"
        >
          ← Products
        </Link>

        <div className="mt-6 border-b border-stone-200 pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b77b72]">
            Catalog
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Edit Product
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Update your beauty recommendation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8 rounded-[28px] border border-stone-200 bg-white p-5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Brand">
              <input
                required
                value={brand}
                onChange={(event) =>
                  setBrand(
                    event.target.value
                  )
                }
                className="input"
              />
            </Field>

            <Field label="Product Name">
              <input
                required
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                className="input"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Category">
              <CustomSelect
                value={category}
                options={categoryOptions}
                onChange={setCategory}
              />
            </Field>

            <Field label="Type">
              <input
                value={type}
                onChange={(event) =>
                  setType(
                    event.target.value
                  )
                }
                className="input"
              />
            </Field>
          </div>

          <Field label="Product Image">
            {currentImageUrl && (
              <div className="mb-4 overflow-hidden rounded-2xl border border-stone-200 bg-[#fffaf7] p-3">
                <div className="relative h-44 w-full sm:h-56">
                  <Image
                    src={
                      currentImageUrl
                    }
                    alt={`${brand} ${name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 768px"
                    className="rounded-xl object-contain"
                  />
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) =>
                setNewImage(
                  event.target.files?.[0] ??
                    null
                )
              }
              className="block w-full rounded-2xl border border-stone-200 bg-[#fffaf7] p-3 text-sm"
            />

            <p className="mt-2 text-xs text-stone-400">
              Leave empty to keep the current image.
            </p>
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              className="input resize-none"
            />
          </Field>

          <Field label="Why I Like It">
            <textarea
              rows={5}
              value={whyILikeIt}
              onChange={(event) =>
                setWhyILikeIt(
                  event.target.value
                )
              }
              className="input resize-none"
            />

            <p className="mt-2 text-xs text-stone-400">
              Put one reason per line.
            </p>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Affiliate URL">
              <input
                type="url"
                value={affiliateUrl}
                onChange={(event) =>
                  setAffiliateUrl(
                    event.target.value
                  )
                }
                className="input"
              />
            </Field>

            <Field label="Home Tag">
              <input
                value={homeTag}
                onChange={(event) =>
                  setHomeTag(
                    event.target.value
                  )
                }
                className="input"
              />
            </Field>
          </div>

          <Field label="Tags">
            <input
              value={tags}
              onChange={(event) =>
                setTags(
                  event.target.value
                )
              }
              className="input"
            />

            <p className="mt-2 text-xs text-stone-400">
              Separate tags with commas.
            </p>
          </Field>

          <CheckboxGroup
            title="Skin Tones"
            options={skinToneOptions}
            selected={skinTones}
            onToggle={(option) =>
              toggleValue(
                option,
                skinTones,
                setSkinTones
              )
            }
          />

          <CheckboxGroup
            title="Undertones"
            options={undertoneOptions}
            selected={undertones}
            onToggle={(option) =>
              toggleValue(
                option,
                undertones,
                setUndertones
              )
            }
          />

          <CheckboxGroup
            title="Skin Concerns"
            options={concernOptions}
            selected={concerns}
            onToggle={(option) =>
              toggleValue(
                option,
                concerns,
                setConcerns
              )
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-stone-200 bg-[#fffaf7] px-4">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) =>
                  setFeatured(
                    event.target.checked
                  )
                }
                className="h-4 w-4 cursor-pointer accent-[#b77b72]"
              />

              <span className="text-sm">
                Featured product
              </span>
            </label>

            <Field label="Status">
              <CustomSelect
                value={
                  status === "draft"
                    ? "Draft"
                    : "Published"
                }
                options={[
                  "Draft",
                  "Published",
                ]}
                onChange={(value) =>
                  setStatus(
                    value.toLowerCase() as
                      | "draft"
                      | "published"
                  )
                }
              />
            </Field>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                setShowDeleteConfirm(
                  true
                )
              }
              disabled={
                saving ||
                deleting
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-red-200 px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Delete Product
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admin/products"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-200 px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-[#b77b72]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={
                  saving ||
                  deleting
                }
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#211d1b] px-8 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#b77b72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-stone-200 bg-white p-6 shadow-2xl sm:p-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-red-500">
              Delete Product
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#211d1b]">
              Are you sure?
            </h2>

            <p className="mt-4 text-sm leading-6 text-stone-500">
              This will permanently delete{" "}
              <span className="font-medium text-[#211d1b]">
                {brand} {name}
              </span>{" "}
              from your catalog.
            </p>

            <p className="mt-2 text-xs leading-5 text-stone-400">
              The product image stored in
              Supabase will also be removed.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(
                    false
                  )
                }
                disabled={deleting}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 px-6 text-[10px] font-medium uppercase tracking-[0.14em] transition hover:border-stone-400 disabled:opacity-60"
              >
                Keep Product
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-700 px-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-stone-700">
        {label}
      </span>

      <div className="mt-2">
        {children}
      </div>
    </label>
  );
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-stone-700">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active =
            selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                onToggle(option)
              }
              className={`min-h-10 rounded-full border px-4 text-xs transition ${
                active
                  ? "border-[#b77b72] bg-[#f7e8e4] text-[#8f5651]"
                  : "border-stone-200 bg-white text-stone-500 hover:border-[#b77b72]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}